/**
 * Plugin configuration (Schemastery, so DSH's config editor and generated
 * docs can read it) and the pure resolution step that fills backend presets.
 */
import z from '@deepseek-ai/schemastery'

export type BackendKind = 'dashscope' | 'openai-compatible'
export type Preset = 'local' | 'siliconflow' | 'custom'
export type QueryFormat = 'qwen3' | 'plain'
export type ApprovalMode = 'remote' | 'always' | 'never'

export interface Config {
  backend: BackendKind
  dashscope: {
    baseURL: string
    apiKeyEnv: string
    embeddingModel: string
    rerankModel: string
    dimensions: number
    batchSize: number
  }
  openaiCompatible: {
    preset: Preset
    embeddingBaseURL?: string
    rerankBaseURL?: string
    apiKeyEnv?: string
    embeddingModel?: string
    rerankModel?: string
    dimensions?: number
    sendDimensions?: boolean
    batchSize?: number
    queryFormat?: QueryFormat
  }
  queryInstruct: string
  rerankInstruct: string
  rerank: boolean
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
  }
}

export const DEFAULT_QUERY_INSTRUCT = 'Given a search query, retrieve relevant passages from documents and source code that answer the query'
export const DEFAULT_EXCLUDE_DIRS = [
  '.git', '.hg', '.svn', 'node_modules', '.pnpm-store', 'bower_components', 'dist', 'build', 'out', 'target', 'coverage',
  '.next', '.nuxt', '.turbo', '.cache', '.parcel-cache', '.venv', 'venv', '__pycache__', '.mypy_cache', '.pytest_cache',
  '.tox', '.gradle', '.idea', '.dsh', 'DerivedData', 'Pods',
]

export const Config: z<Config> = z.object({
  backend: z.union(['dashscope', 'openai-compatible'] as const).default('dashscope')
    .description('Embedding/rerank backend: Alibaba Cloud Model Studio (dashscope) or an OpenAI-compatible server (local llama-server, SiliconFlow, …).'),
  dashscope: z.object({
    baseURL: z.string().default('https://dashscope.aliyuncs.com')
      .description('DashScope origin. Singapore: https://dashscope-intl.aliyuncs.com; workspace domain: https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com'),
    apiKeyEnv: z.string().default('DASHSCOPE_API_KEY').description('Credential name resolved through DSH credentials, then the environment / harness .env.'),
    embeddingModel: z.string().default('qwen3.7-text-embedding'),
    rerankModel: z.string().default('qwen3.7-text-rerank'),
    dimensions: z.natural().min(64).max(4096).default(1024),
    batchSize: z.natural().min(1).max(20).default(10),
  }).default({}),
  openaiCompatible: z.object({
    preset: z.union(['local', 'siliconflow', 'custom'] as const).default('local')
      .description('local = llama-server on 127.0.0.1:8081 (embedding) and :8082 (rerank); siliconflow = api.siliconflow.cn Qwen3 4B models.'),
    embeddingBaseURL: z.string().description('Overrides the preset, e.g. http://127.0.0.1:8081/v1'),
    rerankBaseURL: z.string().description('Overrides the preset; leave the preset value or set rerank: false to skip reranking.'),
    apiKeyEnv: z.string(),
    embeddingModel: z.string(),
    rerankModel: z.string(),
    dimensions: z.natural().min(32).max(4096),
    sendDimensions: z.boolean(),
    batchSize: z.natural().min(1).max(256),
    queryFormat: z.union(['qwen3', 'plain'] as const).description('qwen3 wraps queries as "Instruct: …\\nQuery:…" for Qwen3-Embedding.'),
  }).default({ preset: 'local' }),
  queryInstruct: z.string().default(DEFAULT_QUERY_INSTRUCT).description('English task instruction for query embeddings.'),
  rerankInstruct: z.string().default('').description('Optional rerank instruction (empty = provider default).'),
  rerank: z.boolean().default(true),
  approval: z.union(['remote', 'always', 'never'] as const).default('remote')
    .description('When knowledge_index asks for approval: remote = only when document text leaves this machine.'),
  storageDir: z.string().description('Index storage directory; default <DSH home>/qwen-rag.'),
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
    rerankCandidates: z.natural().min(1).max(200).default(30),
    maxSnippetChars: z.natural().min(200).default(1500),
    refreshBeforeSearch: z.boolean().default(true),
    maxRefreshFiles: z.natural().default(50),
    timeoutMs: z.natural().min(1000).default(180000),
  }).default({}),
}) as z<Config>

export interface OpenAICompatiblePresetValues {
  embeddingBaseURL: string
  rerankBaseURL: string | undefined
  apiKeyEnv: string | undefined
  embeddingModel: string
  rerankModel: string | undefined
  dimensions: number
  sendDimensions: boolean
  batchSize: number
  queryFormat: QueryFormat
}

export const PRESETS: Record<Exclude<Preset, 'custom'>, OpenAICompatiblePresetValues> = {
  local: {
    embeddingBaseURL: 'http://127.0.0.1:8081/v1',
    rerankBaseURL: 'http://127.0.0.1:8082/v1',
    apiKeyEnv: undefined,
    embeddingModel: 'qwen3-embedding-0.6b',
    rerankModel: 'qwen3-reranker-0.6b',
    dimensions: 1024,
    sendDimensions: false,
    batchSize: 16,
    queryFormat: 'qwen3',
  },
  siliconflow: {
    embeddingBaseURL: 'https://api.siliconflow.cn/v1',
    rerankBaseURL: 'https://api.siliconflow.cn/v1',
    apiKeyEnv: 'SILICONFLOW_API_KEY',
    embeddingModel: 'Qwen/Qwen3-Embedding-4B',
    rerankModel: 'Qwen/Qwen3-Reranker-4B',
    dimensions: 1024,
    sendDimensions: true,
    batchSize: 16,
    queryFormat: 'qwen3',
  },
}

/** Fill preset values under explicit overrides; `custom` requires the embedding URL and model. */
export function resolveOpenAICompatible(config: Config['openaiCompatible']): OpenAICompatiblePresetValues {
  const preset = config.preset === 'custom' ? undefined : PRESETS[config.preset]
  const embeddingBaseURL = config.embeddingBaseURL ?? preset?.embeddingBaseURL
  const embeddingModel = config.embeddingModel ?? preset?.embeddingModel
  if (!embeddingBaseURL || !embeddingModel) {
    throw new Error('qwen-rag: openaiCompatible.preset "custom" requires embeddingBaseURL and embeddingModel')
  }
  return {
    embeddingBaseURL,
    rerankBaseURL: config.rerankBaseURL ?? preset?.rerankBaseURL,
    apiKeyEnv: config.apiKeyEnv ?? preset?.apiKeyEnv,
    embeddingModel,
    rerankModel: config.rerankModel ?? preset?.rerankModel,
    dimensions: config.dimensions ?? preset?.dimensions ?? 1024,
    sendDimensions: config.sendDimensions ?? preset?.sendDimensions ?? false,
    batchSize: config.batchSize ?? preset?.batchSize ?? 16,
    queryFormat: config.queryFormat ?? preset?.queryFormat ?? 'plain',
  }
}

/** Validate a POSIX-style credential / environment variable name. */
export function assertCredentialName(name: string): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error(`qwen-rag: invalid credential name ${JSON.stringify(name)}`)
  return name
}
