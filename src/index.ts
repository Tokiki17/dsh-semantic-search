/**
 * DSH plugin entry: registers knowledge_search / knowledge_index /
 * knowledge_status / knowledge_remove, a short system-prompt section, and a
 * pre-execute gate that asks before document text is uploaded to a remote
 * embedding service.
 */
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import { resolveDshHome } from '@deepseek-ai/dsh-home-paths'
import { defineTool, type PreToolDecision, type ToolExecution } from '@deepseek-ai/dsh-tools'
import { createDashScopeBackend } from './backends/dashscope.ts'
import { createOpenAICompatibleBackend } from './backends/openai-compat.ts'
import type { Backend } from './backends/types.ts'
import { assertCredentialName, Config, resolveOpenAICompatible } from './config.ts'
import type { IndexStats } from './indexer.ts'
import { KnowledgeBase, WORKSPACE, resolvePath, type CollectionInfo, type SearchResult } from './kb.ts'

export { Config }
export const name = 'qwen-rag'
export const inject = ['tools', 'systemPrompt']

const TOOL_SEARCH = 'knowledge_search'
const TOOL_INDEX = 'knowledge_index'
const TOOL_STATUS = 'knowledge_status'
const TOOL_REMOVE = 'knowledge_remove'

const PROMPT = [
  'Knowledge base: `knowledge_search` runs hybrid semantic + keyword search (Qwen embedding and rerank) over the indexed current workspace and named document collections.',
  'Before answering questions about this project\'s code or docs, or about documents the user has added to a collection, search first and cite passages as path:line (or path p.N for PDFs).',
  'If the workspace is not indexed yet, offer to index it with `knowledge_index`; use `knowledge_status` to list collections.',
].join(' ')

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

  let cachedBackend: Backend | undefined
  const backend = (): Backend => {
    if (cachedBackend !== undefined) return cachedBackend
    const rerankInstruct = config.rerankInstruct || undefined
    if (config.backend === 'dashscope') {
      const d = config.dashscope
      cachedBackend = createDashScopeBackend({
        baseURL: d.baseURL,
        apiKey: apiKey(d.apiKeyEnv),
        apiKeyEnv: d.apiKeyEnv,
        embeddingModel: d.embeddingModel,
        rerankModel: d.rerankModel || undefined,
        dimensions: d.dimensions,
        batchSize: d.batchSize,
        queryInstruct: config.queryInstruct,
        rerankInstruct,
        timeoutMs: config.requestTimeoutMs,
      })
    } else {
      const o = resolveOpenAICompatible(config.openaiCompatible)
      cachedBackend = createOpenAICompatibleBackend({
        name: config.openaiCompatible.preset === 'local' ? 'llama-server' : config.openaiCompatible.preset,
        embeddingBaseURL: o.embeddingBaseURL,
        rerankBaseURL: o.rerankBaseURL,
        apiKey: apiKey(o.apiKeyEnv),
        apiKeyEnv: o.apiKeyEnv,
        embeddingModel: o.embeddingModel,
        rerankModel: o.rerankModel,
        dimensions: o.dimensions,
        sendDimensions: o.sendDimensions,
        batchSize: o.batchSize,
        queryFormat: o.queryFormat,
        queryInstruct: config.queryInstruct,
        rerankInstruct,
        timeoutMs: config.requestTimeoutMs,
      })
    }
    return cachedBackend
  }

  const storageDir = config.storageDir ? resolvePath(config.storageDir, homedir()) : join(resolveDshHome(), 'qwen-rag')
  const kb = new KnowledgeBase({
    storageDir,
    backend,
    index: config.index,
    search: config.search,
    rerank: config.rerank,
  })
  ctx.effect(() => () => kb.close(), 'qwen-rag stores')

  const cwdOf = async (exec: { agent?: ToolExecution['agent']; signal: AbortSignal }): Promise<string> => {
    const workingDirectory = optional<WorkingDirectory>('workingDirectory')
    if (exec.agent !== undefined && workingDirectory !== undefined) return workingDirectory.ensure(exec.agent, exec.signal)
    return process.cwd()
  }

  ctx.systemPrompt.section({ name: 'tool:qwen-rag', order: 9000, text: PROMPT })

  // Ask before knowledge_index sends document text off this machine.
  ctx.on('tools/pre-execute', async (exec: ToolExecution, next: () => Promise<PreToolDecision>): Promise<PreToolDecision> => {
    const decision = await next()
    if (decision.kind !== 'allow' || exec.name !== TOOL_INDEX || config.approval === 'never') return decision
    let remote: boolean
    let endpoint: string
    try {
      const { embedder } = backend()
      remote = embedder.remote
      endpoint = embedder.endpoint
    } catch {
      return decision
    }
    if (config.approval === 'remote' && !remote) return decision
    const mode = optional<SandboxPolicy>('sandboxPolicy')?.resolve({ session: (exec.agent as { session?: unknown } | undefined)?.session }).mode
    if (mode === 'danger-full-access') return decision
    const target = (exec.arguments as { target?: unknown } | undefined)?.target
    const what = typeof target === 'string' ? target : 'the requested files'
    return {
      kind: 'ask',
      reason: remote
        ? `knowledge_index will upload the text of "${what}" to ${endpoint} to compute embeddings.`
        : `knowledge_index will read and index "${what}".`,
      displayReason: {
        en: remote
          ? `Index "${what}" by sending its text to ${endpoint} for embedding?`
          : `Index "${what}" into the local knowledge base?`,
        zh: remote
          ? `要索引「${what}」吗？文件内容会发送到 ${endpoint} 计算向量。`
          : `要把「${what}」索引进本地知识库吗？`,
      },
    }
  })

  ctx.tools.register(defineTool({
    name: TOOL_SEARCH,
    description:
      'Search the knowledge base (current workspace index plus named document collections) with hybrid semantic + keyword retrieval and Qwen reranking. Returns cited passages (path:line or path p.N).',
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
                (stats) => ({ status: 'completed' as const, detail: summary(stats), result: renderIndex(label, stats) }),
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
          ctx.logger?.debug?.(`qwen-rag: background job unavailable (${String(error)}), indexing in the foreground`)
        }
      }
      return renderIndex(label, await run(exec.signal))
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
        const current = backend()
        active = `${current.embedder.id} at ${current.embedder.endpoint}${current.reranker && config.rerank ? `; rerank ${current.reranker.id}` : '; rerank off'}`
      } catch (error) {
        active = `misconfigured (${error instanceof Error ? error.message : String(error)})`
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

function renderSearch(query: string, result: SearchResult): string {
  const lines: string[] = []
  if (result.hits.length === 0) {
    lines.push(`No passages found for ${JSON.stringify(query)}.`)
  } else {
    lines.push(`${result.hits.length} passages for ${JSON.stringify(query)} (${result.ranking === 'rerank' ? 'reranked' : 'hybrid fusion order'}; searched: ${result.searched.join(', ')}):`)
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

function renderIndex(label: string, stats: IndexStats): string {
  const lines = [
    `Indexed ${label} in ${(stats.ms / 1000).toFixed(1)} s: ${stats.scanned} files scanned, ${stats.added} added, ${stats.updated} updated, ` +
      `${stats.unchanged} unchanged, ${stats.removed} removed, ${stats.skipped} skipped; ${stats.chunks} chunks embedded.`,
  ]
  if (stats.oversized > 0) lines.push(`${stats.oversized} files exceeded index.maxFileBytes and were skipped.`)
  if (stats.truncated) lines.push('Stopped at index.maxFiles; some files were not indexed and deletions were not pruned.')
  if (stats.missing.length > 0) lines.push(`Missing sources: ${stats.missing.join(', ')}`)
  if (stats.errors.length > 0) lines.push('Errors:', ...stats.errors.map((error) => `- ${error}`))
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
        `${info.stale ? ', STALE (embedding model changed; rebuild)' : ''}; updated ${info.updatedAt ?? 'never'}; ${where}` +
        `${info.description ? `; ${info.description}` : ''}`,
    )
  }
  return lines.join('\n')
}

export { WORKSPACE }
