/**
 * DSH plugin entry: registers knowledge_search / knowledge_index /
 * knowledge_status / knowledge_remove, a short system-prompt section, and a
 * pre-execute gate that asks before document text is uploaded to a remote
 * embedding service.
 */
import { existsSync, renameSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import { resolveDshHome } from '@deepseek-ai/dsh-home-paths'
import { defineTool, type PreToolDecision, type ToolExecution } from '@deepseek-ai/dsh-tools'
import { createBackend } from './backends/index.ts'
import type { Backend } from './backends/types.ts'
import { assertCredentialName, Config, resolveModels } from './config.ts'
import type { IndexStats } from './indexer.ts'
import { KnowledgeBase, WORKSPACE, resolvePath, type CollectionInfo, type SearchResult } from './kb.ts'
import { LocalManager } from './local/index.ts'
import { installEnforcement } from './enforce.ts'
import { createService, SERVICE_KEY } from './service.ts'
import { TYPERT } from './typert.ts'

export { Config }
export const name = 'semantic-search'
export const inject = ['tools', 'systemPrompt']

const TOOL_SEARCH = 'knowledge_search'
const TOOL_INDEX = 'knowledge_index'
const TOOL_STATUS = 'knowledge_status'
const TOOL_REMOVE = 'knowledge_remove'

const PROMPT = [
  'Knowledge base: `knowledge_search` runs hybrid semantic + keyword search over the indexed current workspace and named document collections.',
  'Search it first for questions about documents (design notes, decisions, progress records, findings, measurements, and anything the user added to a collection) and for paraphrased or colloquial wording; read the cited path:line (or path p.N for PDFs) before relying on it.',
  'For code, including behaviour described without names, and for exact identifiers, error text or file names, use the file search tools instead: they are exact and cheaper.',
  'If the workspace is not indexed yet, offer to index it with `knowledge_index`; use `knowledge_status` to list collections.',
].join(' ')

interface TypertRegistry {
  getPackage(name: string, face: string): unknown
  register(manifest: unknown): unknown
}
interface Credentials {
  resolve(ref: string): Promise<{ value: string } | undefined>
}
interface WorkingDirectory {
  ensure(agent: NonNullable<ToolExecution['agent']>, signal: AbortSignal): Promise<string>
}
interface SandboxPolicy {
  resolve(request: { session?: unknown }): { mode?: string }
}
interface JobHandle {
  updateProgress(line: string): void
}
interface Jobs {
  start(spec: {
    kind: string
    label: string
    owner: unknown
    toolCall?: { callId: string; rootCallId: string }
    run(job: JobHandle): { cancel(reason?: string): void; done: Promise<{ status: 'completed' | 'killed' | 'failed'; detail?: string; result?: string }> }
  }): string
}

export function apply(ctx: Context, config: Config): void {
  const optional = <T>(service: string): T | undefined => (ctx as unknown as { get(name: string): T | undefined }).get(service)

  const apiKey = (env: string | undefined) => async (): Promise<string | undefined> => {
    if (env === undefined) return undefined
    assertCredentialName(env)
    const credentials = optional<Credentials>('credentials')
    const hit = await credentials?.resolve(env).catch(() => undefined)
    return hit?.value || process.env[env] || undefined
  }

  const storageDir = config.storageDir ? resolvePath(config.storageDir, homedir()) : defaultStorageDir(resolveDshHome())
  // Nothing is downloaded or started until a local model is requested.
  const local = new LocalManager({
    dir: storageDir,
    ctx: config.local.ctx,
    idleStopMinutes: config.local.idleStopMinutes,
    downloadSource: config.local.downloadSource,
    githubMirror: config.local.githubMirror || undefined,
  })
  ctx.effect(() => () => local.dispose(), 'semantic-search local models')

  let cachedBackend: Backend | undefined
  const backend = (): Backend => {
    cachedBackend ??= createBackend(resolveModels(config), {
      apiKey,
      local: local.servers,
      queryInstruct: config.queryInstruct,
      rerankInstruct: config.rerankInstruct || undefined,
      timeoutMs: config.requestTimeoutMs,
    })
    return cachedBackend
  }

  const kb = new KnowledgeBase({ storageDir, backend, index: config.index, search: config.search })
  ctx.effect(() => () => kb.close(), 'semantic-search stores')

  // Setup page RPC (`semanticSearch/*`); the ./typert manifest is normally registered by dsh-typert-loader.
  const setup = createService({
    config,
    storageDir,
    kb,
    local,
    backend,
    backendDeps: { apiKey, queryInstruct: config.queryInstruct, rerankInstruct: config.rerankInstruct || undefined, timeoutMs: config.requestTimeoutMs },
    optional,
    describeBackend,
  })
  ctx.effect(() => () => setup.dispose(), 'semantic-search setup')
  ;(ctx as unknown as { provide(name: string, value: unknown): void }).provide(SERVICE_KEY, setup.service)
  ;(ctx as unknown as { inject(deps: string[], body: (inner: { typert: TypertRegistry }) => void): void }).inject(['typert'], (inner) => {
    // Hot installs from a file: entry are outside the loader's package scan, so register the manifest here.
    const entry = (ctx as unknown as { fiber?: { entry?: { options: { name?: string } } } }).fiber?.entry
    if (inner.typert.getPackage(TYPERT.package, 'host') || (entry !== undefined && !entry.options.name?.startsWith('file:'))) return
    inner.typert.register(TYPERT)
  })

  const cwdOf = async (exec: { agent?: ToolExecution['agent']; signal: AbortSignal }): Promise<string> => {
    const workingDirectory = optional<WorkingDirectory>('workingDirectory')
    if (exec.agent !== undefined && workingDirectory !== undefined) return workingDirectory.ensure(exec.agent, exec.signal)
    return process.cwd()
  }

  ctx.systemPrompt.section({ name: 'tool:semantic-search', order: 9000, text: PROMPT })

  // Ask before knowledge_index sends document text off this machine.
  ctx.on('tools/pre-execute', async (exec: ToolExecution, next: () => Promise<PreToolDecision>): Promise<PreToolDecision> => {
    const decision = await next()
    if (decision.kind !== 'allow' || exec.name !== TOOL_INDEX || config.approval === 'never') return decision
    let remote = false
    let endpoint = ''
    try {
      const { embedder } = backend()
      remote = embedder?.remote ?? false
      endpoint = embedder?.endpoint ?? ''
    } catch {
      return decision
    }
    if (config.approval === 'remote' && !remote) return decision
    const mode = optional<SandboxPolicy>('sandboxPolicy')?.resolve({ session: (exec.agent as { session?: unknown } | undefined)?.session }).mode
    if (mode === 'danger-full-access') return decision
    const args = (exec.arguments ?? {}) as { target?: unknown; paths?: unknown; rebuild?: unknown }
    const what = typeof args.target === 'string' ? args.target : 'the requested files'
    // Rough size of what would be uploaded: ~3.5 UTF-8 bytes per token across mixed Chinese and English text.
    let size = { en: '', zh: '' }
    if (remote && typeof args.target === 'string') {
      try {
        const paths = Array.isArray(args.paths) ? args.paths.filter((path): path is string => typeof path === 'string') : undefined
        const plan = kb.planIndex(args.target, paths, await cwdOf(exec))
        const { files, bytes } = await kb.estimate(plan, args.rebuild === true, exec.signal)
        const tokens = formatTokens(bytes / 3.5)
        size = { en: ` About ${files} files, roughly ${tokens} tokens, billed by the provider.`, zh: `约 ${files} 个文件、${tokens} token，按服务商价格计费。` }
      } catch {
        // The tool itself reports invalid targets; the prompt just goes without an estimate.
      }
    }
    return {
      kind: 'ask',
      reason: remote
        ? `knowledge_index will upload the text of "${what}" to ${endpoint} to compute embeddings.${size.en}`
        : `knowledge_index will read and index "${what}".`,
      displayReason: {
        en: remote
          ? `Index "${what}" by sending its text to ${endpoint} for embedding?${size.en}`
          : `Index "${what}" into the local knowledge base?`,
        zh: remote
          ? `要索引「${what}」吗？文件内容会发送到 ${endpoint} 计算向量。${size.zh}`
          : `要把「${what}」索引进本地知识库吗？`,
      },
    }
  })

  ctx.tools.register(defineTool({
    name: TOOL_SEARCH,
    description:
      'Search the knowledge base (current workspace index plus named document collections) with hybrid semantic + keyword retrieval and reranking. Returns cited passages (path:line or path p.N).',
    parameters: {
      query: { type: 'string', required: true, description: 'Natural-language question or keywords, in any language.' },
      collections: {
        type: 'array',
        items: { type: 'string' },
        description: 'Limit to these collections ("workspace" = current project). Default: the current workspace plus every named collection.',
      },
      top_k: { type: 'integer', description: 'Number of passages to return (1-50, default from plugin config).' },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          ranking: { type: 'string', required: true },
          searched: { type: 'array', items: { type: 'string' }, required: true },
          notes: { type: 'array', items: { type: 'string' }, required: true },
          hits: {
            type: 'array',
            required: true,
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                collection: { type: 'string', required: true },
                path: { type: 'string', required: true },
                location: { type: 'string', required: true },
                heading: { type: 'string', required: true },
                score: { type: 'number', required: true },
                text: { type: 'string', required: true },
              },
            },
          },
        },
      },
      render: (args, value) => [{ type: 'text', text: renderSearch(args.query, value as SearchResult) }],
    },
    timeoutMs: config.search.timeoutMs,
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const query = args.query.trim()
      if (query === '') throw new Error('query must be a non-empty string')
      const result = await kb.search(query, {
        cwd: await cwdOf(exec),
        signal: exec.signal,
        ...(args.collections !== undefined ? { collections: args.collections } : {}),
        ...(args.top_k !== undefined ? { topK: args.top_k } : {}),
      })
      return { ...result, hits: result.hits.map((hit) => ({ ...hit })) }
    },
  }))

  // Steer document searches to knowledge_search (search.enforce); code searches are left alone.
  installEnforcement(ctx, {
    mode: config.search.enforce,
    instructions: config.search.instructions,
    searchTool: TOOL_SEARCH,
    prefetchTopK: config.search.prefetchTopK,
    async indexed(agent, signal) {
      try {
        if (backend().embedder === undefined) return false
      } catch {
        return false
      }
      const cwd = await cwdOf({ agent: agent as ToolExecution['agent'], signal })
      return kb.list(cwd).some((info) => info.chunks > 0 && !info.stale && (info.current || info.kind !== 'workspace'))
    },
    async search(query, agent, topK, signal) {
      const cwd = await cwdOf({ agent: agent as ToolExecution['agent'], signal })
      return (await kb.search(query, { cwd, signal, topK })).hits
    },
    log: (line) => ctx.logger?.debug?.(line),
  })

  ctx.tools.register(defineTool({
    name: TOOL_INDEX,
    description:
      'Build or incrementally update a knowledge-base collection. target "workspace" indexes the current project (respects .gitignore); any other name creates/updates a named collection from `paths` (folders or files: Markdown, text, code, PDF, DOCX). Runs as a background job when available.',
    parameters: {
      target: { type: 'string', required: true, description: '"workspace" or a collection name (lowercase letters, digits, - or _).' },
      paths: {
        type: 'array',
        items: { type: 'string' },
        description: 'Folders or files to add to a named collection (absolute, ~/…, or relative to the working directory). Omit to refresh its existing sources.',
      },
      description: { type: 'string', description: 'Short description stored with a named collection.' },
      rebuild: { type: 'boolean', description: 'Drop existing vectors and re-embed everything.' },
      background: { type: 'boolean', description: 'Run as a background job (default true when the job service is available).' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value as string }],
    },
    async execute(args, exec) {
      const cwd = await cwdOf(exec)
      const plan = kb.planIndex(args.target, args.paths, cwd)
      if (kb.isIndexing(plan.ref)) throw new Error(`collection "${plan.ref.name}" is already being indexed`)
      const run = (signal: AbortSignal, progress?: (line: string) => void) =>
        kb.index(plan, {
          signal,
          ...(args.description !== undefined ? { description: args.description } : {}),
          ...(args.rebuild !== undefined ? { rebuild: args.rebuild } : {}),
          ...(progress !== undefined ? { progress } : {}),
        })
      const label = plan.ref.kind === 'workspace' ? `workspace ${plan.ref.root}` : `collection "${plan.ref.name}"`
      const keywordOnly = backend().embedder === undefined

      const jobs = optional<Jobs>('jobs')
      if (args.background !== false && jobs !== undefined && exec.agent !== undefined) {
        try {
          const jobId = jobs.start({
            kind: 'knowledge-index',
            label: `index ${label}`,
            owner: (exec.agent as { id: unknown }).id,
            toolCall: { callId: exec.callId, rootCallId: exec.rootCallId },
            run(job) {
              const controller = new AbortController()
              const done = run(controller.signal, (line) => job.updateProgress(line)).then(
                (stats) => ({ status: 'completed' as const, detail: summary(stats), result: renderIndex(label, stats, keywordOnly) }),
                (error: unknown) => controller.signal.aborted
                  ? { status: 'killed' as const }
                  : { status: 'failed' as const, detail: error instanceof Error ? error.message : String(error) },
              )
              return { cancel: (reason) => controller.abort(reason), done }
            },
          })
          return `Indexing ${label} started in the background as job ${jobId}. You will be notified when it finishes; check progress with job_output or stop it with job_kill.`
        } catch (error) {
          // No job controller serves this agent: fall through to a foreground run.
          ctx.logger?.debug?.(`semantic-search: background job unavailable (${String(error)}), indexing in the foreground`)
        }
      }
      return renderIndex(label, await run(exec.signal), keywordOnly)
    },
  }))

  ctx.tools.register(defineTool({
    name: TOOL_STATUS,
    description: 'List knowledge-base collections with file/chunk counts, embedding model, staleness and last update, plus the active backend.',
    parameters: {},
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value as string }],
    },
    isConcurrencySafe: () => true,
    async execute(_args, exec) {
      const cwd = await cwdOf(exec)
      let active: string
      try {
        active = describeBackend(backend())
      } catch (error) {
        active = `misconfigured (${error instanceof Error ? error.message : String(error)}); fix it in Plugins → Semantic Search → Configure`
      }
      return renderStatus(kb.list(cwd), active, storageDir)
    },
  }))

  ctx.tools.register(defineTool({
    name: TOOL_REMOVE,
    description: 'Delete a knowledge-base collection, or only the given files/folders from it. Source files on disk are never touched.',
    parameters: {
      collection: { type: 'string', required: true, description: '"workspace" or a collection name.' },
      paths: { type: 'array', items: { type: 'string' }, description: 'Only remove these files/folders from the index.' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value as string }],
    },
    async execute(args, exec) {
      const result = await kb.remove(args.collection, args.paths, await cwdOf(exec))
      return result.deleted
        ? `Deleted collection "${args.collection}" (${result.removedFiles} files were indexed).`
        : `Removed ${result.removedFiles} files from collection "${args.collection}".`
    },
  }))
}

/** Pick `<home>/semantic-search`, moving a 0.1.x `<home>/qwen-rag` store there on first start. */
export function defaultStorageDir(home: string): string {
  const dir = join(home, 'semantic-search')
  const legacy = join(home, 'qwen-rag')
  if (!existsSync(dir) && existsSync(legacy)) {
    try {
      renameSync(legacy, dir)
    } catch {
      return legacy
    }
  }
  return dir
}

function formatTokens(tokens: number): string {
  if (tokens >= 1e6) return `${(tokens / 1e6).toFixed(1)}M`
  if (tokens >= 1e3) return `${Math.round(tokens / 1e3)}k`
  return String(Math.max(1, Math.round(tokens)))
}

function describeBackend(backend: Backend): string {
  const embedding = backend.embedder === undefined
    ? 'keyword search only (no embedding model; configure one in Plugins → Semantic Search → Configure for semantic search)'
    : `embedding ${backend.embedder.id} at ${backend.embedder.endpoint}`
  const rerank = backend.reranker === undefined ? 'rerank off' : `rerank ${backend.reranker.id} at ${backend.reranker.endpoint}`
  return `${embedding}; ${rerank}`
}

function renderSearch(query: string, result: SearchResult): string {
  const lines: string[] = []
  if (result.hits.length === 0) {
    lines.push(`No passages found for ${JSON.stringify(query)}.`)
  } else {
    const order = result.ranking === 'rerank' ? 'reranked' : result.ranking === 'fusion' ? 'hybrid fusion order' : 'keyword match order'
    lines.push(`${result.hits.length} passages for ${JSON.stringify(query)} (${order}; searched: ${result.searched.join(', ')}):`)
    result.hits.forEach((hit, index) => {
      const where = hit.location.startsWith('p.') ? `${hit.path} ${hit.location}` : `${hit.path}:${hit.location}`
      lines.push('', `[${index + 1}] ${where} · ${hit.collection}${hit.heading ? ` · § ${hit.heading}` : ''} · score ${hit.score}`, hit.text)
    })
  }
  if (result.notes.length > 0) lines.push('', 'Notes:', ...result.notes.map((note) => `- ${note}`))
  return lines.join('\n')
}

function summary(stats: IndexStats): string {
  return `${stats.added} added, ${stats.updated} updated, ${stats.removed} removed, ${stats.chunks} chunks`
}

function renderIndex(label: string, stats: IndexStats, keywordOnly: boolean): string {
  const lines = [
    `Indexed ${label} in ${(stats.ms / 1000).toFixed(1)} s: ${stats.scanned} files scanned, ${stats.added} added, ${stats.updated} updated, ` +
      `${stats.unchanged} unchanged, ${stats.removed} removed, ${stats.skipped} skipped; ${stats.chunks} chunks ${keywordOnly ? 'stored for keyword search' : 'embedded'}.`,
  ]
  if (stats.oversized > 0) lines.push(`${stats.oversized} files exceeded index.maxFileBytes and were skipped.`)
  if (stats.truncated) lines.push('Stopped at index.maxFiles; some files were not indexed and deletions were not pruned.')
  if (stats.missing.length > 0) lines.push(`Missing sources: ${stats.missing.join(', ')}`)
  if (stats.errors.length > 0) lines.push('Errors:', ...stats.errors.map((error) => `- ${error}`))
  if (keywordOnly) lines.push('No embedding model is configured, so search matches keywords only. For semantic search, set up models in Plugins → Semantic Search → Configure, then rebuild.')
  return lines.join('\n')
}

function renderStatus(infos: CollectionInfo[], active: string, storageDir: string): string {
  const lines = [`Backend: ${active}`, `Storage: ${storageDir}`]
  if (infos.length === 0) {
    lines.push('No collections yet. Index the current project with knowledge_index { target: "workspace" }.')
    return lines.join('\n')
  }
  for (const info of infos) {
    const where = info.kind === 'workspace' ? info.root ?? '' : info.sources.join(', ')
    lines.push(
      `- ${info.name}${info.current ? ' (current workspace)' : ''}: ${info.files} files, ${info.chunks} chunks` +
        `${info.stale ? ', STALE (embedding model changed; rebuild for semantic search)' : ''}; updated ${info.updatedAt ?? 'never'}; ${where}` +
        `${info.description ? `; ${info.description}` : ''}`,
    )
  }
  return lines.join('\n')
}

export { WORKSPACE }
