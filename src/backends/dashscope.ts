/**
 * Alibaba Cloud Model Studio (DashScope) native API: text embedding with
 * `text_type` query/document and `instruct`, plus text rerank. The native
 * routes are used instead of the OpenAI-compatible ones because only they
 * accept the query/document distinction and instructions.
 */
import { postJson } from '../http.ts'
import { toUnitVector, type Backend, type Embedder, type RerankHit, type Reranker } from './types.ts'

export interface DashScopeSettings {
  readonly baseURL: string
  readonly apiKey: () => Promise<string | undefined>
  readonly apiKeyEnv: string
  readonly embeddingModel: string
  readonly rerankModel: string | undefined
  readonly dimensions: number
  readonly batchSize: number
  readonly queryInstruct: string
  readonly rerankInstruct: string | undefined
  readonly timeoutMs: number
}

const EMBED_PATH = '/api/v1/services/embeddings/text-embedding/text-embedding'
const RERANK_PATH = '/api/v1/services/rerank/text-rerank/text-rerank'

export function createDashScopeBackend(settings: DashScopeSettings): Backend {
  const base = settings.baseURL.replace(/\/+$/, '')
  const requireKey = async (): Promise<string> => {
    const key = await settings.apiKey()
    if (!key) {
      throw new Error(
        `DashScope API key not found: set ${settings.apiKeyEnv} in DSH credentials or in the harness home .env file, ` +
          'or switch the qwen-rag backend to openai-compatible (local llama-server).',
      )
    }
    return key
  }

  const embed = async (texts: readonly string[], textType: 'query' | 'document', signal: AbortSignal): Promise<Float32Array[]> => {
    const parameters: Record<string, unknown> = { dimension: settings.dimensions, text_type: textType, output_type: 'dense' }
    if (textType === 'query' && settings.queryInstruct) parameters.instruct = settings.queryInstruct
    const body = await postJson({
      url: base + EMBED_PATH,
      body: { model: settings.embeddingModel, input: { texts }, parameters },
      apiKey: await requireKey(),
      signal,
      timeoutMs: settings.timeoutMs,
      label: `DashScope ${settings.embeddingModel}`,
    })
    return parseEmbeddings(body, texts.length, settings.dimensions, `DashScope ${settings.embeddingModel}`)
  }

  const embedder: Embedder = {
    id: `dashscope|${settings.embeddingModel}|${settings.dimensions}`,
    dims: settings.dimensions,
    batchSize: settings.batchSize,
    remote: true,
    endpoint: `${base} (${settings.embeddingModel})`,
    embedDocuments: (texts, signal) => embed(texts, 'document', signal),
    embedQuery: async (text, signal) => (await embed([text], 'query', signal))[0]!,
  }

  const rerankModel = settings.rerankModel
  const reranker: Reranker | undefined = rerankModel === undefined ? undefined : {
    id: `dashscope|${rerankModel}`,
    async rerank(query, documents, topN, signal) {
      const parameters: Record<string, unknown> = { top_n: Math.min(topN, documents.length), return_documents: false }
      if (settings.rerankInstruct) parameters.instruct = settings.rerankInstruct
      const body = await postJson({
        url: base + RERANK_PATH,
        body: { model: rerankModel, input: { query, documents }, parameters },
        apiKey: await requireKey(),
        signal,
        timeoutMs: settings.timeoutMs,
        label: `DashScope ${rerankModel}`,
      })
      return parseRerank(body, documents.length, `DashScope ${rerankModel}`)
    },
  }

  return { embedder, reranker }
}

/** Accept both `output.embeddings` (documented) and top-level `embeddings` (seen in one example). */
export function parseEmbeddings(body: unknown, expected: number, dims: number, label: string): Float32Array[] {
  const record = body as { output?: { embeddings?: unknown }; embeddings?: unknown; data?: unknown }
  const list = (record?.output?.embeddings ?? record?.embeddings ?? record?.data) as
    | Array<{ embedding?: number[]; index?: number; text_index?: number }>
    | undefined
  if (!Array.isArray(list) || list.length !== expected) {
    throw new Error(`${label}: expected ${expected} embeddings, got ${Array.isArray(list) ? list.length : 'none'}`)
  }
  const out = new Array<Float32Array>(expected)
  list.forEach((item, position) => {
    const index = item.index ?? item.text_index ?? position
    if (!Number.isInteger(index) || index < 0 || index >= expected || out[index] !== undefined) {
      throw new Error(`${label}: embedding response has an invalid or duplicate index ${String(index)}`)
    }
    out[index] = toUnitVector(item.embedding ?? [], dims, label)
  })
  return out
}

/** Accept `output.results` (DashScope) and top-level `results` (Jina/Cohere/llama-server). */
export function parseRerank(body: unknown, count: number, label: string): RerankHit[] {
  const record = body as { output?: { results?: unknown }; results?: unknown }
  const list = (record?.output?.results ?? record?.results) as Array<{ index?: number; relevance_score?: number; score?: number }> | undefined
  if (!Array.isArray(list)) throw new Error(`${label}: rerank response has no results`)
  const hits: RerankHit[] = []
  for (const item of list) {
    const index = item.index
    const score = item.relevance_score ?? item.score
    if (!Number.isInteger(index) || index! < 0 || index! >= count || typeof score !== 'number' || !Number.isFinite(score)) {
      throw new Error(`${label}: malformed rerank result ${JSON.stringify(item).slice(0, 120)}`)
    }
    hits.push({ index: index!, score })
  }
  return hits.sort((a, b) => b.score - a.score)
}
