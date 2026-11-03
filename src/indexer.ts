/**
 * Incremental indexing: scan sources, skip files whose size+mtime (then
 * sha256) are unchanged, embed changed files in batches, and replace each
 * file's chunks atomically. Deleted files are pruned unless the scan was
 * truncated by `maxFiles`.
 */
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import type { Embedder } from './backends/types.ts'
import { chunkDocument, embeddingInput, type Chunk } from './chunk.ts'
import { parseFile, SkipFile } from './parse.ts'
import { isWithin, scanSources, type ScannedFile } from './scan.ts'
import type { NewChunk, Store } from './store.ts'

export interface IndexOptions {
  readonly sources: readonly string[]
  readonly chunkChars: number
  readonly overlapChars: number
  readonly maxFileBytes: number
  readonly maxFiles: number
  readonly excludeDirs: readonly string[]
  readonly extraExtensions: readonly string[]
  /** Label used in embedding inputs and messages for a path (e.g. workspace-relative). */
  readonly label: (path: string) => string
  /** Stop before embedding anything when more files changed than this (search-time refresh). */
  readonly maxChanged?: number
  readonly rebuild?: boolean
  readonly signal: AbortSignal
  readonly progress?: (line: string) => void
}

export interface IndexStats {
  scanned: number
  added: number
  updated: number
  unchanged: number
  removed: number
  skipped: number
  chunks: number
  oversized: number
  truncated: boolean
  missing: string[]
  errors: string[]
  /** Set when `maxChanged` stopped the run before any write. */
  deferred?: number
  ms: number
}

interface Pending {
  readonly file: ScannedFile
  readonly sha256: string
  readonly existed: boolean
  readonly chunks: Chunk[]
}

const MAX_ERRORS = 20

export async function indexSources(store: Store, embedder: Embedder, options: IndexOptions): Promise<IndexStats> {
  const started = Date.now()
  const { signal } = options
  const stats: IndexStats = {
    scanned: 0, added: 0, updated: 0, unchanged: 0, removed: 0, skipped: 0, chunks: 0,
    oversized: 0, truncated: false, missing: [], errors: [], ms: 0,
  }
  const previousEmbedder = store.getMeta('embedder')
  const embedderChanged = previousEmbedder !== undefined && previousEmbedder !== embedder.id
  if (embedderChanged && options.maxChanged !== undefined) {
    // A search-time refresh never rebuilds; the caller reports the collection as stale.
    stats.deferred = Number.POSITIVE_INFINITY
    return finish(stats, started)
  }
  if (options.rebuild || embedderChanged) store.clear()
  // Record the embedder before the first write so a partial run is never mistaken for another model's vectors.
  if (previousEmbedder !== embedder.id) store.setMeta({ embedder: embedder.id, dims: String(embedder.dims) })

  const scan = await scanSources(options.sources, {
    excludeDirs: options.excludeDirs,
    extraExtensions: options.extraExtensions,
    maxFiles: options.maxFiles,
    maxFileBytes: options.maxFileBytes,
    signal,
  })
  stats.scanned = scan.files.length
  stats.oversized = scan.oversized
  stats.truncated = scan.truncated
  stats.missing = scan.missing

  const known = new Map(store.files().map((row) => [row.path, row]))
  const changed: ScannedFile[] = []
  for (const file of scan.files) {
    const row = known.get(file.path)
    if (row !== undefined && row.size === file.size && row.mtimeMs === file.mtimeMs) stats.unchanged += 1
    else changed.push(file)
  }
  const present = new Set(scan.files.map((file) => file.path))
  const gone = scan.truncated
    ? []
    : [...known.keys()].filter((path) => !present.has(path) && options.sources.some((source) => isWithin(source, path)))

  if (options.maxChanged !== undefined && changed.length + gone.length > options.maxChanged) {
    stats.deferred = changed.length + gone.length
    return finish(stats, started)
  }

  if (gone.length > 0) stats.removed = store.removeFiles(gone)

  const batchTarget = Math.max(embedder.batchSize * 4, 32)
  let pending: Pending[] = []
  let pendingChunks = 0
  let done = 0
  const flush = async (): Promise<void> => {
    if (pending.length === 0) return
    const inputs: string[] = []
    for (const item of pending) {
      for (const chunk of item.chunks) inputs.push(embeddingInput(options.label(item.file.path), chunk, options.chunkChars * 2))
    }
    const vectors: Float32Array[] = []
    for (let i = 0; i < inputs.length; i += embedder.batchSize) {
      if (signal.aborted) throw signal.reason
      vectors.push(...(await embedder.embedDocuments(inputs.slice(i, i + embedder.batchSize), signal)))
    }
    let offset = 0
    for (const item of pending) {
      const rows: NewChunk[] = item.chunks.map((chunk, index) => ({ chunk, vector: vectors[offset + index]! }))
      offset += item.chunks.length
      store.replaceFile(item.file.path, item.file.mtimeMs, item.file.size, item.sha256, rows)
      if (item.existed) stats.updated += 1
      else stats.added += 1
      stats.chunks += rows.length
    }
    pending = []
    pendingChunks = 0
    options.progress?.(`indexed ${stats.added + stats.updated}/${changed.length} changed files (${stats.chunks} chunks)`)
  }

  for (const file of changed) {
    if (signal.aborted) throw signal.reason
    done += 1
    const row = known.get(file.path)
    let data: Uint8Array
    try {
      data = await readFile(file.path)
    } catch (error) {
      noteError(stats, options.label(file.path), error)
      continue
    }
    const sha256 = createHash('sha256').update(data).digest('hex')
    if (row !== undefined && row.sha256 === sha256 && !embedderChanged && !options.rebuild) {
      store.touchFile(file.path, file.mtimeMs, file.size)
      stats.unchanged += 1
      continue
    }
    let chunks: Chunk[]
    try {
      chunks = chunkDocument(await parseFile(file.kind, data), options)
    } catch (error) {
      if (error instanceof SkipFile) stats.skipped += 1
      else noteError(stats, options.label(file.path), error)
      continue
    }
    if (chunks.length === 0) {
      // Keep an empty record so the file is not re-parsed until it changes.
      store.replaceFile(file.path, file.mtimeMs, file.size, sha256, [])
      stats.skipped += 1
      continue
    }
    pending.push({ file, sha256, existed: row !== undefined, chunks })
    pendingChunks += chunks.length
    if (pendingChunks >= batchTarget) await flush()
    else if (done % 200 === 0) options.progress?.(`parsed ${done}/${changed.length} changed files`)
  }
  await flush()

  store.setMeta({ embedder: embedder.id, dims: String(embedder.dims), updatedAt: new Date().toISOString() })
  return finish(stats, started)
}

function noteError(stats: IndexStats, label: string, error: unknown): void {
  if (stats.errors.length < MAX_ERRORS) stats.errors.push(`${label}: ${error instanceof Error ? error.message : String(error)}`)
}

function finish(stats: IndexStats, started: number): IndexStats {
  stats.ms = Date.now() - started
  return stats
}
