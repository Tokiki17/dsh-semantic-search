/**
 * OpenAI-compatible `/embeddings` plus Jina/Cohere-style `/rerank`. Covers a
 * local llama-server running Qwen3-Embedding / Qwen3-Reranker GGUF files, and
 * hosted providers that serve the same open models (e.g. SiliconFlow).
 */
import { isLoopbackUrl, postJson } from '../http.ts'
import { parseEmbeddings, parseRerank } from './dashscope.ts'
import { qwen3Query, type Backend, type Embedder, type Reranker } from './types.ts'

export interface OpenAICompatibleSettings {
  readonly name: string
  readonly embeddingBaseURL: string
  readonly rerankBaseURL: string | undefined
  readonly apiKey: () => Promise<string | undefined>
  readonly apiKeyEnv: string | undefined
  readonly embeddingModel: string
  readonly rerankModel: string | undefined
  readonly dimensions: number
  /** Send `dimensions` to the server; otherwise truncate client-side (Matryoshka). */
  readonly sendDimensions: boolean
  readonly batchSize: number
  /** `qwen3` wraps queries as `Instruct: …\nQuery:…`; `plain` sends them as-is. */
  readonly queryFormat: 'qwen3' | 'plain'
  readonly queryInstruct: string
  readonly rerankInstruct: string | undefined
  readonly timeoutMs: number
}

export function createOpenAICompatibleBackend(settings: OpenAICompatibleSettings): Backend {
  const embeddingBase = settings.embeddingBaseURL.replace(/\/+$/, '')
  const remote = !isLoopbackUrl(embeddingBase)
  const key = async (): Promise<string | undefined> => {
    const value = await settings.apiKey()
    if (!value && settings.apiKeyEnv && remote) {
      throw new Error(`${settings.name}: API key not found; set ${settings.apiKeyEnv} in DSH credentials or the harness home .env file.`)
    }
    return value
  }

  const embed = async (texts: readonly string[], signal: AbortSignal): Promise<Float32Array[]> => {
    const body: Record<string, unknown> = { model: settings.embeddingModel, input: texts, encoding_format: 'float' }
    if (settings.sendDimensions) body.dimensions = settings.dimensions
    const response = await postJson({
      url: `${embeddingBase}/embeddings`,
      body,
      apiKey: await key(),
      signal,
      timeoutMs: settings.timeoutMs,
      label: `${settings.name} embeddings`,
    })
    return parseEmbeddings(response, texts.length, settings.dimensions, `${settings.name} embeddings`)
  }

  const embedder: Embedder = {
    id: `openai-compatible|${settings.embeddingModel}|${settings.dimensions}|${settings.queryFormat}`,
    dims: settings.dimensions,
    batchSize: settings.batchSize,
    remote,
    endpoint: `${embeddingBase} (${settings.embeddingModel})`,
    embedDocuments: embed,
    embedQuery: async (text, signal) => {
      const query = settings.queryFormat === 'qwen3' ? qwen3Query(settings.queryInstruct, text) : text
      return (await embed([query], signal))[0]!
    },
  }

  const rerankBase = settings.rerankBaseURL?.replace(/\/+$/, '')
  const rerankModel = settings.rerankModel
  const reranker: Reranker | undefined = rerankBase === undefined || rerankModel === undefined ? undefined : {
    id: `openai-compatible|${rerankModel}`,
    async rerank(query, documents, topN, signal) {
      const body: Record<string, unknown> = { model: rerankModel, query, documents, top_n: Math.min(topN, documents.length), return_documents: false }
      if (settings.rerankInstruct) body.instruction = settings.rerankInstruct
      const response = await postJson({
        url: `${rerankBase}/rerank`,
        body,
        apiKey: await key(),
        signal,
        timeoutMs: settings.timeoutMs,
        label: `${settings.name} rerank`,
      })
      return parseRerank(response, documents.length, `${settings.name} rerank`)
    },
  }

  return { embedder, reranker }
}
