/** Backend contracts: every embedder returns L2-normalized vectors of `dims` length. */

export interface Embedder {
  /** Stable identity stored with each collection; a change makes old vectors stale. */
  readonly id: string
  readonly dims: number
  /** Max texts per request. */
  readonly batchSize: number
  /** True when requests leave this machine (document text is uploaded). */
  readonly remote: boolean
  /** Human-readable endpoint for status output (no credentials). */
  readonly endpoint: string
  embedDocuments(texts: readonly string[], signal: AbortSignal): Promise<Float32Array[]>
  embedQuery(text: string, signal: AbortSignal): Promise<Float32Array>
}

export interface RerankHit {
  /** Position in the input `documents` array. */
  readonly index: number
  readonly score: number
}

export interface Reranker {
  readonly id: string
  /** True when queries and candidate passages leave this machine. */
  readonly remote: boolean
  readonly endpoint: string
  rerank(query: string, documents: readonly string[], topN: number, signal: AbortSignal): Promise<RerankHit[]>
}

/** Either role may be absent: no embedder means keyword-only search, no reranker means fusion order. */
export interface Backend {
  readonly embedder: Embedder | undefined
  readonly reranker: Reranker | undefined
}

/** Embedder id recorded for collections built without vectors. */
export const KEYWORD_ONLY = 'keyword-only'

/** Supplies the base URL of a plugin-managed local model server, starting it on demand. */
export interface LocalModels {
  baseURL(role: 'embedding' | 'rerank', model: string, signal: AbortSignal): Promise<string>
}

/** Truncate (Matryoshka) and L2-normalize one raw embedding. */
export function toUnitVector(raw: readonly number[], dims: number, label: string): Float32Array {
  if (!Array.isArray(raw) || raw.length < dims) {
    throw new Error(`${label}: expected an embedding with at least ${dims} dimensions, got ${Array.isArray(raw) ? raw.length : typeof raw}`)
  }
  const out = new Float32Array(dims)
  let norm = 0
  for (let i = 0; i < dims; i++) {
    const value = Number(raw[i])
    if (!Number.isFinite(value)) throw new Error(`${label}: embedding contains a non-finite value`)
    out[i] = value
    norm += value * value
  }
  norm = Math.sqrt(norm)
  if (norm === 0) throw new Error(`${label}: embedding is all zeros (is the server running an embedding model with --embedding?)`)
  for (let i = 0; i < dims; i++) out[i] = out[i]! / norm
  return out
}

/** Qwen3-Embedding query prompt; documents are embedded without an instruction. */
export function qwen3Query(instruct: string, query: string): string {
  return `Instruct: ${instruct}\nQuery:${query}`
}
