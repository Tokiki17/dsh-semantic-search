/**
 * OpenAI-compatible `/embeddings` plus Jina/Cohere-style `/rerank`. Covers the
 * plugin-managed llama-server running Qwen3-Embedding / Qwen3-Reranker GGUF
 * files, and hosted providers that serve the same open models (SiliconFlow).
 */
import { isLoopbackUrl, postJson } from '../http.ts'
import { parseEmbeddings, parseRerank } from './dashscope.ts'
import { qwen3Query, type Embedder, type Reranker } from './types.ts'

export interface OpenAICompatibleAccess {
  /** Short provider name used in error messages. */
  readonly name: string
  /** A fixed base URL, or a resolver for servers started on demand (always loopback). */
  readonly baseURL: string | ((signal: AbortSignal) => Promise<string>)
  readonly apiKey: () => Promise<string | undefined>
  readonly apiKeyEnv: string | undefined
  readonly timeoutMs: number
}

function access(settings: OpenAICompatibleAccess): {
  remote: boolean
  display: string
  base(signal: AbortSignal): Promise<string>
  key(): Promise<string | undefined>
} {
  const fixed = typeof settings.baseURL === 'string' ? settings.baseURL.replace(/\/+$/, '') : undefined
  const remote = fixed !== undefined && !isLoopbackUrl(fixed)
  const resolver = settings.baseURL
  return {
    remote,
    display: fixed ?? settings.name,
    base: async (signal) => fixed ?? (await (resolver as (signal: AbortSignal) => Promise<string>)(signal)).replace(/\/+$/, ''),
    async key() {
      const value = await settings.apiKey()
      if (!value && settings.apiKeyEnv && remote) {
        throw new Error(`${settings.name}: API key not found; save it in Plugins → Semantic Search → Configure, or set ${settings.apiKeyEnv} in DSH credentials or the harness home .env file.`)
      }
      return value
    },
  }
}

export function createOpenAICompatibleEmbedder(settings: OpenAICompatibleAccess & {
  readonly model: string
  readonly dimensions: number
  /** Send `dimensions` to the server; otherwise truncate client-side (Matryoshka). */
  readonly sendDimensions: boolean
  readonly batchSize: number
  /** `qwen3` wraps queries as `Instruct: …\nQuery:…`; `plain` sends them as-is. */
  readonly queryFormat: 'qwen3' | 'plain'
  readonly queryInstruct: string
}): Embedder {
  const { remote, display, base, key } = access(settings)
  const label = `${settings.name} embeddings`
  const embed = async (texts: readonly string[], signal: AbortSignal): Promise<Float32Array[]> => {
    const body: Record<string, unknown> = { model: settings.model, input: texts, encoding_format: 'float' }
    if (settings.sendDimensions) body.dimensions = settings.dimensions
    const response = await postJson({
      url: `${await base(signal)}/embeddings`,
      body,
      apiKey: await key(),
      signal,
      timeoutMs: settings.timeoutMs,
      label,
    })
    return parseEmbeddings(response, texts.length, settings.dimensions, label)
  }
  return {
    id: `openai-compatible|${settings.model}|${settings.dimensions}|${settings.queryFormat}`,
    dims: settings.dimensions,
    batchSize: settings.batchSize,
    remote,
    endpoint: `${display} (${settings.model})`,
    embedDocuments: embed,
    embedQuery: async (text, signal) => {
      const query = settings.queryFormat === 'qwen3' ? qwen3Query(settings.queryInstruct, text) : text
      return (await embed([query], signal))[0]!
    },
  }
}

export function createOpenAICompatibleReranker(settings: OpenAICompatibleAccess & {
  readonly model: string
  readonly rerankInstruct: string | undefined
}): Reranker {
  const { remote, display, base, key } = access(settings)
  const label = `${settings.name} rerank`
  return {
    id: `openai-compatible|${settings.model}`,
    remote,
    endpoint: `${display} (${settings.model})`,
    async rerank(query, documents, topN, signal) {
      const body: Record<string, unknown> = { model: settings.model, query, documents, top_n: Math.min(topN, documents.length), return_documents: false }
      if (settings.rerankInstruct) body.instruction = settings.rerankInstruct
      const response = await postJson({
        url: `${await base(signal)}/rerank`,
        body,
        apiKey: await key(),
        signal,
        timeoutMs: settings.timeoutMs,
        label,
      })
      return parseRerank(response, documents.length, label)
    },
  }
}
