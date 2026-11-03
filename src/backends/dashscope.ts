/**
 * Alibaba Cloud Model Studio (DashScope) native API: text embedding with
 * `text_type` query/document and `instruct`, plus text rerank. The native
 * routes are used instead of the OpenAI-compatible ones because only they
 * accept the query/document distinction and instructions.
 */
import { postJson } from '../http.ts'
import { toUnitVector, type Embedder, type RerankHit, type Reranker } from './types.ts'

export interface DashScopeAccess {
  readonly baseURL: string
  readonly apiKey: () => Promise<string | undefined>
  readonly apiKeyEnv: string
  readonly timeoutMs: number
}

const EMBED_PATH = '/api/v1/services/embeddings/text-embedding/text-embedding'
const RERANK_PATH = '/api/v1/services/rerank/text-rerank/text-rerank'

function access(settings: DashScopeAccess): { base: string; requireKey(): Promise<string> } {
  return {
    base: settings.baseURL.replace(/\/+$/, ''),
    async requireKey() {
      const key = await settings.apiKey()
      if (!key) {
        throw new Error(
          `DashScope API key not found: save it in Plugins → Semantic Search → Configure, or set ${settings.apiKeyEnv} ` +
            'in DSH credentials or the harness home .env file.',
        )
      }
      return key
    },
  }
}

export function createDashScopeEmbedder(settings: DashScopeAccess & {
  readonly model: string
  readonly dimensions: number
  readonly batchSize: number
  readonly queryInstruct: string
}): Embedder {
  const { base, requireKey } = access(settings)
  const label = `DashScope ${settings.model}`
  const embed = async (texts: readonly string[], textType: 'query' | 'document', signal: AbortSignal): Promise<Float32Array[]> => {
    const parameters: Record<string, unknown> = { dimension: settings.dimensions, text_type: textType, output_type: 'dense' }
    if (textType === 'query' && settings.queryInstruct) parameters.instruct = settings.queryInstruct
    const body = await postJson({
      url: base + EMBED_PATH,
      body: { model: settings.model, input: { texts }, parameters },
      apiKey: await requireKey(),
      signal,
      timeoutMs: settings.timeoutMs,
      label,
    })
    return parseEmbeddings(body, texts.length, settings.dimensions, label)
  }
  return {
    id: `dashscope|${settings.model}|${settings.dimensions}`,
    dims: settings.dimensions,
    batchSize: settings.batchSize,
    remote: true,
    endpoint: `${base} (${settings.model})`,
    embedDocuments: (texts, signal) => embed(texts, 'document', signal),
    embedQuery: async (text, signal) => (await embed([text], 'query', signal))[0]!,
  }
}

export function createDashScopeReranker(settings: DashScopeAccess & { readonly model: string; readonly rerankInstruct: string | undefined }): Reranker {
  const { base, requireKey } = access(settings)
  const label = `DashScope ${settings.model}`
  return {
    id: `dashscope|${settings.model}`,
    remote: true,
    endpoint: `${base} (${settings.model})`,
    async rerank(query, documents, topN, signal) {
      const parameters: Record<string, unknown> = { top_n: Math.min(topN, documents.length), return_documents: false }
      if (settings.rerankInstruct) parameters.instruct = settings.rerankInstruct
      const body = await postJson({
        url: base + RERANK_PATH,
        body: { model: settings.model, input: { query, documents }, parameters },
        apiKey: await requireKey(),
        signal,
        timeoutMs: settings.timeoutMs,
        label,
      })
      return parseRerank(body, documents.length, label)
    },
  }
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
