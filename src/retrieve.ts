/** Pure ranking helpers: brute-force cosine top-k and reciprocal rank fusion. */
import type { VectorMatrix } from './store.ts'

export interface Scored {
  readonly id: number
  readonly score: number
}

/** Cosine top-k over unit vectors (dot product), highest first. */
export function denseTopK(matrix: VectorMatrix, query: Float32Array, k: number): Scored[] {
  const { ids, data, dims } = matrix
  if (query.length !== dims || ids.length === 0 || k <= 0) return []
  const top: Scored[] = []
  let floor = Number.NEGATIVE_INFINITY
  for (let row = 0; row < ids.length; row++) {
    const base = row * dims
    let dot = 0
    for (let i = 0; i < dims; i++) dot += data[base + i]! * query[i]!
    if (top.length < k) {
      top.push({ id: ids[row]!, score: dot })
      if (top.length === k) {
        top.sort((a, b) => b.score - a.score)
        floor = top[k - 1]!.score
      }
    } else if (dot > floor) {
      top[k - 1] = { id: ids[row]!, score: dot }
      top.sort((a, b) => b.score - a.score)
      floor = top[k - 1]!.score
    }
  }
  return top.sort((a, b) => b.score - a.score)
}

/** Reciprocal rank fusion: score = Σ 1 / (k + rank), rank starting at 1. */
export function reciprocalRankFusion(lists: ReadonlyArray<readonly number[]>, k = 60): Scored[] {
  const scores = new Map<number, number>()
  for (const list of lists) {
    list.forEach((id, index) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + index + 1))
    })
  }
  return [...scores].map(([id, score]) => ({ id, score })).sort((a, b) => b.score - a.score || a.id - b.id)
}
