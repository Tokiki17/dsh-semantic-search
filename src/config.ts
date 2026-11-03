/**
 * Plugin configuration (Schemastery, so DSH's config editor and generated
 * docs can read it) and the pure step that resolves the two model roles —
 * embedding and rerank — into concrete endpoints and models.
 */
import z from '@deepseek-ai/schemastery'

export type EmbeddingSource = 'none' | 'local' | 'dashscope' | 'siliconflow' | 'custom'
export type RerankSource = 'same' | 'off' | Exclude<EmbeddingSource, 'none'>
export type ModelSource = Exclude<EmbeddingSource, 'none'>
export type QueryFormat = 'qwen3' | 'plain'
export type ApprovalMode = 'remote' | 'always' | 'never'
export type DownloadSource = 'auto' | 'huggingface' | 'hf-mirror' | 'modelscope'

export interface Config {
  embedding: {
    source: EmbeddingSource
    model?: string
    dimensions: number
    batchSize?: number
  }
  rerank: {
    source: RerankSource
    model?: string
  }
  providers: {
    dashscope: { baseURL: string; apiKeyEnv: string }
    siliconflow: { baseURL: string; apiKeyEnv: string }
    custom: {
      baseURL?: string
      rerankBaseURL?: string
      apiKeyEnv?: string
      queryFormat: QueryFormat
      sendDimensions: boolean
    }
  }
  local: {
    ctx: number
    idleStopMinutes: number
    downloadSource: DownloadSource
    githubMirror?: string
  }
  queryInstruct: string
  rerankInstruct: string
  approval: ApprovalMode
  storageDir?: string
  requestTimeoutMs: number
  index: {
    chunkChars: number
    overlapChars: number
    maxFileBytes: number
    maxFiles: number
    extraExtensions: string[]
    excludeDirs: string[]
  }
  search: {
    topK: number
    candidates: number
    rerankCandidates: number
    maxSnippetChars: number
    refreshBeforeSearch: boolean
    maxRefreshFiles: number
    timeoutMs: number
    enforce: EnforceMode
    prefetchTopK: number
    instructions: boolean
  }
}

/** How strongly the plugin steers document searches to knowledge_search (see src/enforce.ts). */
export type EnforceMode = 'off' | 'remind' | 'docs' | 'prefetch'

export const DEFAULT_QUERY_INSTRUCT = 'Given a search query, retrieve relevant passages from documents and source code that answer the query'
export const DEFAULT_EXCLUDE_DIRS = [
  '.git', '.hg', '.svn', 'node_modules', '.pnpm-store', 'bower_components', 'dist', 'build', 'out', 'target', 'coverage',
  '.next', '.nuxt', '.turbo', '.cache', '.parcel-cache', '.venv', 'venv', '__pycache__', '.mypy_cache', '.pytest_cache',
  '.tox', '.gradle', '.idea', '.dsh', 'DerivedData', 'Pods',
]

const MODEL_SOURCES = ['local', 'dashscope', 'siliconflow', 'custom'] as const

export const Config: z<Config> = z.object({
  embedding: z.object({
    source: z.union(['none', ...MODEL_SOURCES] as const).default('none')
      .description('Embedding model source. none = keyword search only (no model, nothing leaves the machine).'),
    model: z.string().description('Model name; default depends on the source (local: qwen3-embedding-0.6b, 4b or 8b).'),
    dimensions: z.natural().min(32).max(4096).default(1024),
    batchSize: z.natural().min(1).max(256),
  }).default({ source: 'none' }),
  rerank: z.object({
    // Off by default: in the agent evaluations (eval/README.md) reranking never raised accuracy and slowed doc questions.
    source: z.union(['same', 'off', ...MODEL_SOURCES] as const).default('off')
      .description('Rerank model source. off (default) = hybrid fusion order; same = the embedding source (off when that is none).'),
    model: z.string().description('Model name; default depends on the source.'),
  }).default({ source: 'off' }),
  providers: z.object({
    dashscope: z.object({
      baseURL: z.string().default('https://dashscope.aliyuncs.com')
        .description('DashScope origin. Singapore: https://dashscope-intl.aliyuncs.com'),
      apiKeyEnv: z.string().default('DASHSCOPE_API_KEY').description('Credential name resolved through DSH credentials, then the environment / harness .env.'),
    }).default({}),
    siliconflow: z.object({
      baseURL: z.string().default('https://api.siliconflow.cn/v1'),
      apiKeyEnv: z.string().default('SILICONFLOW_API_KEY'),
    }).default({}),
    custom: z.object({
      baseURL: z.string().description('OpenAI-compatible base URL serving /embeddings (and /rerank), e.g. https://example.com/v1'),
      rerankBaseURL: z.string().description('Base URL for /rerank when it differs from baseURL.'),
      apiKeyEnv: z.string().description('Credential name; leave empty for servers without authentication.'),
      queryFormat: z.union(['qwen3', 'plain'] as const).default('plain')
        .description('qwen3 wraps queries as "Instruct: …\\nQuery:…" for Qwen3-Embedding.'),
      sendDimensions: z.boolean().default(false).description('Send `dimensions` to the server instead of truncating client-side.'),
    }).default({}),
  }).default({}),
  local: z.object({
    ctx: z.natural().min(1024).max(32768).default(8192).description('llama-server context and batch size; 2048 saves memory.'),
    idleStopMinutes: z.natural().default(10).description('Stop local model servers after this many idle minutes (0 = keep running).'),
    downloadSource: z.union(['auto', 'huggingface', 'hf-mirror', 'modelscope'] as const).default('auto')
      .description('Where model files come from; auto picks the fastest.'),
    githubMirror: z.string().description('Prefix for llama.cpp release downloads, e.g. https://ghproxy.example/'),
  }).default({}),
  queryInstruct: z.string().default(DEFAULT_QUERY_INSTRUCT).description('English task instruction for query embeddings.'),
  rerankInstruct: z.string().default('').description('Optional rerank instruction (empty = provider default).'),
  approval: z.union(['remote', 'always', 'never'] as const).default('remote')
    .description('When knowledge_index asks for approval: remote = only when document text leaves this machine.'),
  storageDir: z.string().description('Index storage directory; default <DSH home>/semantic-search.'),
  requestTimeoutMs: z.natural().min(1000).default(60000),
  index: z.object({
    chunkChars: z.natural().min(200).max(8000).default(1200),
    overlapChars: z.natural().max(2000).default(150),
    maxFileBytes: z.natural().min(1024).default(20 * 1024 * 1024),
    maxFiles: z.natural().min(1).default(20000),
    extraExtensions: z.array(z.string()).default([]),
    excludeDirs: z.array(z.string()).default(DEFAULT_EXCLUDE_DIRS),
  }).default({}),
  search: z.object({
    topK: z.natural().min(1).max(50).default(8),
    candidates: z.natural().min(5).max(500).default(50),
    rerankCandidates: z.natural().min(1).max(200).default(15),
    maxSnippetChars: z.natural().min(200).default(1500),
    refreshBeforeSearch: z.boolean().default(true),
    maxRefreshFiles: z.natural().default(50),
    timeoutMs: z.natural().min(1000).default(180000),
    enforce: z.union(['off', 'remind', 'docs', 'prefetch'] as const).default('off')
      .description('Steer document searches to knowledge_search: off; remind (note after a grep of the docs); docs (refuse the first grep of indexed docs in a turn, pointing to knowledge_search); prefetch (search each user message and attach document hits).'),
    prefetchTopK: z.natural().min(1).max(20).default(5).description('Passages attached per user message in prefetch mode.'),
    instructions: z.boolean().default(true).description('Deliver the docs-first routing rule as an agent-instructions message (like AGENTS.md) once per agent, when the workspace is indexed.'),
  }).default({}),
}) as z<Config>

/** Wire protocol of a resolved model endpoint. */
export type Protocol = 'dashscope' | 'openai'

export interface ResolvedEmbedding {
  readonly source: ModelSource
  readonly protocol: Protocol
  /** Undefined for `local`: the local server manager supplies it on demand. */
  readonly baseURL: string | undefined
  readonly apiKeyEnv: string | undefined
  readonly model: string
  readonly dimensions: number
  readonly sendDimensions: boolean
  readonly batchSize: number
  readonly queryFormat: QueryFormat
}

export interface ResolvedRerank {
  readonly source: ModelSource
  readonly protocol: Protocol
  readonly baseURL: string | undefined
  readonly apiKeyEnv: string | undefined
  readonly model: string
}

export interface ResolvedModels {
  readonly embedding: ResolvedEmbedding | undefined
  readonly rerank: ResolvedRerank | undefined
}

/** Built-in defaults per source; `custom` has none and needs explicit models. */
export const SOURCE_DEFAULTS = {
  local: { embeddingModel: 'qwen3-embedding-0.6b', rerankModel: 'qwen3-reranker-0.6b', batchSize: 16, queryFormat: 'qwen3', sendDimensions: false },
  dashscope: { embeddingModel: 'qwen3.7-text-embedding', rerankModel: 'qwen3.7-text-rerank', batchSize: 10, queryFormat: 'plain', sendDimensions: true },
  siliconflow: { embeddingModel: 'Qwen/Qwen3-Embedding-4B', rerankModel: 'Qwen/Qwen3-Reranker-4B', batchSize: 16, queryFormat: 'qwen3', sendDimensions: true },
} as const satisfies Record<Exclude<ModelSource, 'custom'>, unknown>

/** Resolve both roles; throws with a field name when a `custom` source is incomplete. */
export function resolveModels(config: Config): ResolvedModels {
  const embeddingSource = config.embedding.source
  const embedding = embeddingSource === 'none' ? undefined : resolveEmbedding(config, embeddingSource)

  let rerankSource = config.rerank.source
  let implicit = false
  if (rerankSource === 'same') {
    if (embeddingSource === 'none') return { embedding, rerank: undefined }
    rerankSource = embeddingSource
    implicit = true
  }
  if (rerankSource === 'off') return { embedding, rerank: undefined }
  const rerankModel = config.rerank.model || (rerankSource === 'custom' ? undefined : SOURCE_DEFAULTS[rerankSource].rerankModel)
  if (rerankModel === undefined) {
    // A custom service may not serve /rerank; following it implicitly simply turns rerank off.
    if (implicit) return { embedding, rerank: undefined }
    throw new Error('semantic-search: rerank.source "custom" requires rerank.model')
  }
  const endpoint = endpointOf(config, rerankSource, 'rerank')
  return { embedding, rerank: { source: rerankSource, ...endpoint, model: rerankModel } }
}

function resolveEmbedding(config: Config, source: ModelSource): ResolvedEmbedding {
  const endpoint = endpointOf(config, source, 'embedding')
  if (source === 'custom') {
    if (!config.embedding.model) throw new Error('semantic-search: embedding.source "custom" requires embedding.model')
    return {
      source, ...endpoint, model: config.embedding.model, dimensions: config.embedding.dimensions,
      sendDimensions: config.providers.custom.sendDimensions, batchSize: config.embedding.batchSize ?? 16,
      queryFormat: config.providers.custom.queryFormat,
    }
  }
  const defaults = SOURCE_DEFAULTS[source]
  return {
    source, ...endpoint, model: config.embedding.model || defaults.embeddingModel, dimensions: config.embedding.dimensions,
    sendDimensions: defaults.sendDimensions, batchSize: config.embedding.batchSize ?? defaults.batchSize, queryFormat: defaults.queryFormat,
  }
}

function endpointOf(config: Config, source: ModelSource, role: 'embedding' | 'rerank'): { protocol: Protocol; baseURL: string | undefined; apiKeyEnv: string | undefined } {
  switch (source) {
    case 'local':
      return { protocol: 'openai', baseURL: undefined, apiKeyEnv: undefined }
    case 'dashscope':
      return { protocol: 'dashscope', baseURL: config.providers.dashscope.baseURL, apiKeyEnv: config.providers.dashscope.apiKeyEnv }
    case 'siliconflow':
      return { protocol: 'openai', baseURL: config.providers.siliconflow.baseURL, apiKeyEnv: config.providers.siliconflow.apiKeyEnv }
    case 'custom': {
      const custom = config.providers.custom
      const baseURL = role === 'rerank' ? custom.rerankBaseURL || custom.baseURL : custom.baseURL
      if (!baseURL) throw new Error('semantic-search: the custom source requires providers.custom.baseURL')
      return { protocol: 'openai', baseURL, apiKeyEnv: custom.apiKeyEnv || undefined }
    }
  }
}

/** Validate a POSIX-style credential / environment variable name. */
export function assertCredentialName(name: string): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error(`semantic-search: invalid credential name ${JSON.stringify(name)}`)
  return name
}
