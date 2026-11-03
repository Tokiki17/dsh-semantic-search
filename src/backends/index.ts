/**
 * Build the embedder and reranker for the resolved configuration. The two
 * roles are independent: each picks its own source, endpoint and model.
 */
import type { ResolvedEmbedding, ResolvedModels, ResolvedRerank } from '../config.ts'
import { createDashScopeEmbedder, createDashScopeReranker } from './dashscope.ts'
import { createOpenAICompatibleEmbedder, createOpenAICompatibleReranker, type OpenAICompatibleAccess } from './openai-compat.ts'
import type { Backend, Embedder, LocalModels, Reranker } from './types.ts'

export interface BackendDeps {
  readonly apiKey: (env: string | undefined) => () => Promise<string | undefined>
  /** Plugin-managed llama-server; required when a role uses the `local` source. */
  readonly local: LocalModels | undefined
  readonly queryInstruct: string
  readonly rerankInstruct: string | undefined
  readonly timeoutMs: number
}

const PROVIDER_NAMES = { local: 'local llama-server', dashscope: 'DashScope', siliconflow: 'SiliconFlow', custom: 'custom service' } as const

export function createBackend(models: ResolvedModels, deps: BackendDeps): Backend {
  return {
    embedder: models.embedding === undefined ? undefined : createEmbedder(models.embedding, deps),
    reranker: models.rerank === undefined ? undefined : createReranker(models.rerank, deps),
  }
}

export function createEmbedder(resolved: ResolvedEmbedding, deps: BackendDeps): Embedder {
  if (resolved.protocol === 'dashscope') {
    return createDashScopeEmbedder({
      baseURL: resolved.baseURL!,
      apiKey: deps.apiKey(resolved.apiKeyEnv),
      apiKeyEnv: resolved.apiKeyEnv!,
      timeoutMs: deps.timeoutMs,
      model: resolved.model,
      dimensions: resolved.dimensions,
      batchSize: resolved.batchSize,
      queryInstruct: deps.queryInstruct,
    })
  }
  return createOpenAICompatibleEmbedder({
    ...openAIAccess(resolved, 'embedding', deps),
    model: resolved.model,
    dimensions: resolved.dimensions,
    sendDimensions: resolved.sendDimensions,
    batchSize: resolved.batchSize,
    queryFormat: resolved.queryFormat,
    queryInstruct: deps.queryInstruct,
  })
}

export function createReranker(resolved: ResolvedRerank, deps: BackendDeps): Reranker {
  if (resolved.protocol === 'dashscope') {
    return createDashScopeReranker({
      baseURL: resolved.baseURL!,
      apiKey: deps.apiKey(resolved.apiKeyEnv),
      apiKeyEnv: resolved.apiKeyEnv!,
      timeoutMs: deps.timeoutMs,
      model: resolved.model,
      rerankInstruct: deps.rerankInstruct,
    })
  }
  return createOpenAICompatibleReranker({ ...openAIAccess(resolved, 'rerank', deps), model: resolved.model, rerankInstruct: deps.rerankInstruct })
}

function openAIAccess(resolved: ResolvedEmbedding | ResolvedRerank, role: 'embedding' | 'rerank', deps: BackendDeps): OpenAICompatibleAccess {
  const name = PROVIDER_NAMES[resolved.source]
  let baseURL: OpenAICompatibleAccess['baseURL']
  if (resolved.source === 'local') {
    const local = deps.local
    baseURL = async (signal) => {
      if (local === undefined) throw new Error('local models are not available in this host')
      return local.baseURL(role, resolved.model, signal)
    }
  } else {
    baseURL = resolved.baseURL!
  }
  return { name, baseURL, apiKey: deps.apiKey(resolved.apiKeyEnv), apiKeyEnv: resolved.apiKeyEnv, timeoutMs: deps.timeoutMs }
}
