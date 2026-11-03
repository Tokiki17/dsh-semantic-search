/**
 * Steering document searches to knowledge_search (`search.enforce`).
 *
 * Models given only a prompt hint rarely call knowledge_search: DeepSeek in DSH
 * called it 1–3 times in 40 runs, and grep-ing the docs instead cost about twice
 * the tokens and tool calls on doc questions (eval/README.md). Code searches are
 * left alone, because there the extra search only added tokens.
 *
 * - `remind`: after a grep of the docs, attach a note pointing to knowledge_search.
 * - `docs`: refuse the first grep of indexed docs in a turn with that pointer; grep works normally afterwards.
 * - `prefetch`: search each user message and attach the document hits before the model's first step.
 *
 * Separately, `search.instructions` delivers a routing rule the way DSH delivers
 * AGENTS.md: a user-role `<system-reminder>` message with form `instructions`,
 * once per agent, before its first user message. The same rule written in AGENTS.md
 * changed behaviour where the plugin's system-prompt section did not.
 *
 * `search.enforce` is off by default: measured in DSH with deepseek-flash, neither
 * `docs` nor `prefetch` beat no steering (the model kept grep-ing after the search).
 * The routing rule did help on doc and paraphrased questions, both in AGENTS.md and
 * through `search.instructions`, which is on by default (eval/README.md).
 */
import { createUserMessage, type UserMessage } from '@deepseek-ai/dsh-llm'
import type { EnforceMode } from './config.ts'
import type { SearchHit } from './kb.ts'

/** Documentation paths: doc folders, prose extensions, README-style names. */
const DOC_TARGET = /(^|[\s/'"=*{,])(docs?|okf|notes?|manuals?|wiki)(\/|\b)|\.(md|markdown|mdx|txt|rst|adoc|org|pdf|docx|html?)\b|\b(README|CHANGELOG|AGENTS)\b/i
/** CJK text in a pattern: code identifiers are ASCII, so this is a prose search. */
const CJK = /[぀-ヿ㐀-鿿豈-﫿가-힯]/
const SHELL_SEARCH = /(^|[\s;|&(])(rg|grep|egrep|fgrep|ag|ack|git\s+grep)\s/

const SOURCE_KIND = 'semantic-search'

export const ROUTING_RULE =
  'This workspace is indexed for semantic search. For any question about the docs (design decisions, progress notes, findings, measurements, ' +
  'documents added to a collection) or worded in a paraphrased or colloquial way, call `knowledge_search` first, then read the cited path:line to confirm. ' +
  'For exact identifiers, error text, file names and code behaviour, use grep and read directly.'

export function instructionsText(): string {
  return `<system-reminder>\nInstructions from: semantic-search plugin\n\n${ROUTING_RULE}\n</system-reminder>`
}

const POINTER =
  'This looks like a search of the documentation, which is indexed for semantic search. ' +
  'Call knowledge_search with the question in natural language first, then read the cited path:line; ' +
  'grep and read work normally for code and once you have searched.'

/** Is this tool call a text search over documentation (as opposed to code or reading one known file)? */
export function isDocSearch(tool: string, args: unknown): boolean {
  const input = (args ?? {}) as Record<string, unknown>
  const text = (key: string) => (typeof input[key] === 'string' ? (input[key] as string) : '')
  switch (tool) {
    case 'grep':
      return DOC_TARGET.test(`${text('path')} ${text('include')} ${text('glob')}`) || CJK.test(text('pattern'))
    case 'glob':
      return DOC_TARGET.test(`${text('pattern')} ${text('path')}`)
    case 'bash': {
      const command = text('command')
      return SHELL_SEARCH.test(command) && (DOC_TARGET.test(command) || CJK.test(command))
    }
    default:
      return false
  }
}

/** Document-like hits only: prose files in the workspace, anything from a named collection. */
export function docHits(hits: readonly SearchHit[]): SearchHit[] {
  return hits.filter((hit) => hit.collection !== 'workspace' || DOC_TARGET.test(hit.path))
}

export function renderPrefetch(hits: readonly SearchHit[], maxChars = 400): string {
  const lines = [
    `knowledge_search ran on this message and found ${hits.length} document passages. Read the cited lines before relying on them; ignore them if they are unrelated.`,
  ]
  hits.forEach((hit, index) => {
    const where = hit.location.startsWith('p.') ? `${hit.path} ${hit.location}` : `${hit.path}:${hit.location}`
    const snippet = hit.text.length > maxChars ? `${hit.text.slice(0, maxChars)}…` : hit.text
    lines.push('', `[${index + 1}] ${where}${hit.heading ? ` § ${hit.heading}` : ''}`, snippet)
  })
  return lines.join('\n')
}

interface TurnState {
  searched: boolean
  steered: boolean
}

interface AgentLike {
  readonly id?: unknown
}
interface PreStepPayload {
  agent: AgentLike
  messages: UserMessage[]
  signal: AbortSignal
}
type PreStepDecision = { kind: 'reject' } | { kind: 'enter'; messages: UserMessage[]; startsRequestSeries?: true }
interface Exec {
  readonly name: string
  readonly arguments?: unknown
  readonly agent?: AgentLike
}
type PreDecision = { kind: 'allow' } | { kind: 'deny'; reason: string } | { kind: string; [key: string]: unknown }
type PostDecision = { kind: string; additionalContexts?: UserMessage[]; [key: string]: unknown }

interface Hooks {
  on(event: 'agent/pre-step', listener: (payload: PreStepPayload, next: () => Promise<PreStepDecision>) => Promise<PreStepDecision>): void
  on(event: 'tools/pre-execute', listener: (exec: Exec, next: () => Promise<PreDecision>) => Promise<PreDecision>): void
  on(event: 'tools/post-execute', listener: (exec: Exec, result: unknown, next: () => Promise<PostDecision>) => Promise<PostDecision>): void
}

export interface EnforceDeps {
  readonly mode: EnforceMode
  /** Deliver ROUTING_RULE as an instructions message (search.instructions). */
  readonly instructions?: boolean
  readonly searchTool: string
  readonly prefetchTopK: number
  /** Whether the agent's working directory has a non-empty semantic index (or a named collection exists). */
  readonly indexed: (agent: AgentLike, signal: AbortSignal) => Promise<boolean>
  readonly search: (query: string, agent: AgentLike, topK: number, signal: AbortSignal) => Promise<readonly SearchHit[]>
  readonly log?: (line: string) => void
}

export function installEnforcement(ctx: unknown, deps: EnforceDeps): void {
  if (deps.mode === 'off' && !deps.instructions) return
  const hooks = ctx as Hooks
  const instructed = new WeakSet<AgentLike>()
  const turns = new WeakMap<AgentLike, TurnState>()
  const state = (agent: AgentLike): TurnState => {
    let turn = turns.get(agent)
    if (turn === undefined) turns.set(agent, (turn = { searched: false, steered: false }))
    return turn
  }

  hooks.on('agent/pre-step', async (payload, next) => {
    const decision = await next()
    const users = payload.messages.filter((message) => message.source.kind === 'user')
    if (users.length === 0) return decision
    // A new user message opens a new turn for steering purposes.
    const turn = { searched: false, steered: false }
    turns.set(payload.agent, turn)
    if (decision.kind !== 'enter') return decision
    let entered: PreStepDecision = decision
    if (deps.instructions && !instructed.has(payload.agent)) {
      instructed.add(payload.agent)
      const indexed = await deps.indexed(payload.agent, AbortSignal.any([payload.signal, AbortSignal.timeout(5000)])).catch(() => false)
      if (indexed) {
        const rule = createUserMessage({
          content: [{ type: 'text', text: instructionsText() }],
          source: { kind: SOURCE_KIND, form: 'instructions' },
        } as unknown as Parameters<typeof createUserMessage>[0])
        entered = { ...decision, messages: [rule as UserMessage, ...decision.messages] }
      }
    }
    if (deps.mode !== 'prefetch') return entered
    const query = users
      .flatMap((message) => message.content)
      .map((block) => ((block as { type?: string; text?: string }).type === 'text' ? (block as { text: string }).text : ''))
      .join('\n')
      .trim()
    if (query.length < 4) return entered
    try {
      const signal = AbortSignal.any([payload.signal, AbortSignal.timeout(10000)])
      if (!(await deps.indexed(payload.agent, signal))) return entered
      const hits = docHits(await deps.search(query.slice(0, 2000), payload.agent, deps.prefetchTopK * 2, signal)).slice(0, deps.prefetchTopK)
      if (hits.length === 0) return entered
      turn.searched = true
      const notice = createUserMessage({
        content: [{ type: 'text', text: renderPrefetch(hits) }],
        source: { kind: SOURCE_KIND, form: 'notice', summary: `knowledge_search: ${hits.length} passages` },
      } as unknown as Parameters<typeof createUserMessage>[0])
      return { ...entered, messages: [...entered.messages, notice as UserMessage] }
    } catch (error) {
      if (payload.signal.aborted) throw error
      deps.log?.(`semantic-search: prefetch skipped (${error instanceof Error ? error.message : String(error)})`)
      return entered
    }
  })

  if (deps.mode === 'off') return

  hooks.on('tools/pre-execute', async (exec, next) => {
    const decision = await next()
    if (exec.agent === undefined) return decision
    const turn = state(exec.agent)
    if (exec.name === deps.searchTool) {
      turn.searched = true
      return decision
    }
    if (deps.mode !== 'docs' || decision.kind !== 'allow' || turn.searched || turn.steered || !isDocSearch(exec.name, exec.arguments)) return decision
    turn.steered = true // once per turn: never trap the model in a loop
    if (!(await deps.indexed(exec.agent, AbortSignal.timeout(5000)).catch(() => false))) return decision
    return { kind: 'deny', reason: POINTER }
  })

  if (deps.mode === 'remind') {
    hooks.on('tools/post-execute', async (exec, _result, next) => {
      const downstream = await next()
      if (exec.agent === undefined) return downstream
      const turn = state(exec.agent)
      if (turn.searched || turn.steered || !isDocSearch(exec.name, exec.arguments)) return downstream
      turn.steered = true
      if (!(await deps.indexed(exec.agent, AbortSignal.timeout(5000)).catch(() => false))) return downstream
      const note = createUserMessage({
        content: [{ type: 'text', text: POINTER }],
        source: { kind: SOURCE_KIND, form: 'notice', summary: 'knowledge_search available for the docs' },
      } as unknown as Parameters<typeof createUserMessage>[0])
      return { ...downstream, additionalContexts: [note as UserMessage, ...(downstream.additionalContexts ?? [])] }
    })
  }
}
