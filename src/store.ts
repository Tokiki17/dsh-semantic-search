/**
 * One SQLite database per collection (node:sqlite, no native addon). Chunks
 * carry their normalized embedding as a Float32 BLOB; a contentless FTS5
 * table holds a CJK-bigram projection of the same text for keyword recall.
 */
import { closeSync, mkdirSync, openSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync, type StatementSync } from 'node:sqlite'
import type { Chunk } from './chunk.ts'

export interface FileRow {
  readonly id: number
  readonly path: string
  readonly mtimeMs: number
  readonly size: number
  readonly sha256: string
}

export interface ChunkRow {
  readonly id: number
  readonly path: string
  readonly text: string
  readonly heading: string
  readonly startLine: number
  readonly endLine: number
  readonly page: number | undefined
}

export interface VectorMatrix {
  readonly ids: Int32Array
  readonly data: Float32Array
  readonly dims: number
}

export interface NewChunk {
  readonly chunk: Chunk
  readonly vector: Float32Array
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS files (
  id INTEGER PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  mtime_ms REAL NOT NULL,
  size INTEGER NOT NULL,
  sha256 TEXT NOT NULL,
  indexed_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS chunks (
  id INTEGER PRIMARY KEY,
  file_id INTEGER NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  ord INTEGER NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  page INTEGER,
  heading TEXT NOT NULL,
  text TEXT NOT NULL,
  vec BLOB NOT NULL
);
CREATE INDEX IF NOT EXISTS chunks_by_file ON chunks(file_id);
CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(body, content='', contentless_delete=1, tokenize='unicode61 remove_diacritics 2');
`

export class Store {
  readonly path: string
  private readonly db: DatabaseSync
  private generation = 0
  private cached: { generation: number; matrix: VectorMatrix } | undefined
  private readonly statements = new Map<string, StatementSync>()

  private constructor(path: string, db: DatabaseSync) {
    this.path = path
    this.db = db
  }

  static open(path: string): Store {
    if (path !== ':memory:') {
      mkdirSync(dirname(path), { recursive: true, mode: 0o700 })
      // Create the file owner-only; SQLite gives its -wal/-shm files the same mode.
      closeSync(openSync(path, 'a', 0o600))
    }
    const db = new DatabaseSync(path)
    db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;')
    db.exec(SCHEMA)
    return new Store(path, db)
  }

  close(): void {
    this.statements.clear()
    this.db.close()
  }

  private prepare(sql: string): StatementSync {
    let statement = this.statements.get(sql)
    if (statement === undefined) {
      statement = this.db.prepare(sql)
      this.statements.set(sql, statement)
    }
    return statement
  }

  getMeta(key: string): string | undefined {
    const row = this.prepare('SELECT value FROM meta WHERE key = ?').get(key) as { value: string } | undefined
    return row?.value
  }

  setMeta(entries: Record<string, string>): void {
    const statement = this.prepare('INSERT INTO meta(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    this.transaction(() => {
      for (const [key, value] of Object.entries(entries)) statement.run(key, value)
    })
  }

  allMeta(): Record<string, string> {
    const rows = this.prepare('SELECT key, value FROM meta').all() as Array<{ key: string; value: string }>
    return Object.fromEntries(rows.map((row) => [row.key, row.value]))
  }

  files(): FileRow[] {
    const rows = this.prepare('SELECT id, path, mtime_ms, size, sha256 FROM files').all() as Array<{
      id: number; path: string; mtime_ms: number; size: number; sha256: string
    }>
    return rows.map((row) => ({ id: row.id, path: row.path, mtimeMs: row.mtime_ms, size: row.size, sha256: row.sha256 }))
  }

  counts(): { files: number; chunks: number } {
    const files = (this.prepare('SELECT count(*) AS n FROM files').get() as { n: number }).n
    const chunks = (this.prepare('SELECT count(*) AS n FROM chunks').get() as { n: number }).n
    return { files, chunks }
  }

  touchFile(path: string, mtimeMs: number, size: number): void {
    this.prepare('UPDATE files SET mtime_ms = ?, size = ? WHERE path = ?').run(mtimeMs, size, path)
  }

  /** Atomically replace every chunk of one file. */
  replaceFile(path: string, mtimeMs: number, size: number, sha256: string, chunks: readonly NewChunk[]): void {
    this.transaction(() => {
      this.deleteFileRows(path)
      const fileId = Number(
        this.prepare('INSERT INTO files(path, mtime_ms, size, sha256, indexed_at) VALUES (?, ?, ?, ?, ?)')
          .run(path, mtimeMs, size, sha256, new Date().toISOString()).lastInsertRowid,
      )
      const insertChunk = this.prepare(
        'INSERT INTO chunks(file_id, ord, start_line, end_line, page, heading, text, vec) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      )
      const insertFts = this.prepare('INSERT INTO chunks_fts(rowid, body) VALUES (?, ?)')
      for (const { chunk, vector } of chunks) {
        const id = insertChunk.run(
          fileId, chunk.ord, chunk.startLine, chunk.endLine, chunk.page ?? null, chunk.heading, chunk.text,
          new Uint8Array(vector.buffer, vector.byteOffset, vector.byteLength),
        ).lastInsertRowid
        insertFts.run(id, ftsBody(path, chunk))
      }
    })
    this.generation += 1
  }

  removeFiles(paths: Iterable<string>): number {
    let removed = 0
    this.transaction(() => {
      for (const path of paths) removed += this.deleteFileRows(path)
    })
    if (removed > 0) this.generation += 1
    return removed
  }

  clear(): void {
    this.transaction(() => {
      this.db.exec('DELETE FROM chunks_fts; DELETE FROM chunks; DELETE FROM files;')
    })
    this.generation += 1
  }

  private deleteFileRows(path: string): number {
    const file = this.prepare('SELECT id FROM files WHERE path = ?').get(path) as { id: number } | undefined
    if (file === undefined) return 0
    const ids = this.prepare('SELECT id FROM chunks WHERE file_id = ?').all(file.id) as Array<{ id: number }>
    const deleteFts = this.prepare('DELETE FROM chunks_fts WHERE rowid = ?')
    for (const { id } of ids) deleteFts.run(id)
    this.prepare('DELETE FROM chunks WHERE file_id = ?').run(file.id)
    this.prepare('DELETE FROM files WHERE id = ?').run(file.id)
    return 1
  }

  /** Every chunk vector as one row-major matrix, cached until the next write through this handle. */
  vectors(dims: number): VectorMatrix {
    if (this.cached?.generation === this.generation && this.cached.matrix.dims === dims) return this.cached.matrix
    const rows = this.prepare('SELECT id, vec FROM chunks ORDER BY id').all() as Array<{ id: number; vec: Uint8Array }>
    const ids = new Int32Array(rows.length)
    const data = new Float32Array(rows.length * dims)
    let n = 0
    for (const row of rows) {
      if (row.vec.byteLength !== dims * 4) continue
      ids[n] = row.id
      data.set(new Float32Array(row.vec.buffer.slice(row.vec.byteOffset, row.vec.byteOffset + row.vec.byteLength)), n * dims)
      n += 1
    }
    const matrix = { ids: ids.subarray(0, n), data: data.subarray(0, n * dims), dims }
    this.cached = { generation: this.generation, matrix }
    return matrix
  }

  /** BM25 over the bigram projection; `match` must already be a safe FTS5 expression. */
  keyword(match: string, limit: number): Array<{ id: number; rank: number }> {
    return this.prepare('SELECT rowid AS id, bm25(chunks_fts) AS rank FROM chunks_fts WHERE chunks_fts MATCH ? ORDER BY rank LIMIT ?')
      .all(match, limit) as Array<{ id: number; rank: number }>
  }

  chunks(ids: readonly number[]): Map<number, ChunkRow> {
    const out = new Map<number, ChunkRow>()
    const statement = this.prepare(
      'SELECT c.id, f.path, c.text, c.heading, c.start_line, c.end_line, c.page FROM chunks c JOIN files f ON f.id = c.file_id WHERE c.id = ?',
    )
    for (const id of ids) {
      const row = statement.get(id) as
        | { id: number; path: string; text: string; heading: string; start_line: number; end_line: number; page: number | null }
        | undefined
      if (row === undefined) continue
      out.set(id, {
        id: row.id, path: row.path, text: row.text, heading: row.heading,
        startLine: row.start_line, endLine: row.end_line, page: row.page ?? undefined,
      })
    }
    return out
  }

  private transaction(body: () => void): void {
    this.db.exec('BEGIN IMMEDIATE')
    try {
      body()
      this.db.exec('COMMIT')
    } catch (error) {
      this.db.exec('ROLLBACK')
      throw error
    }
  }
}

function ftsBody(path: string, chunk: Chunk): string {
  return toSearchText(`${path}\n${chunk.heading}\n${chunk.text}`)
}

const CJK_RUN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu

/**
 * Rewrite CJK runs as overlapping bigrams so `unicode61` can match two-character
 * words; other text passes through for the tokenizer's own word splitting.
 */
export function toSearchText(text: string): string {
  return text.replace(CJK_RUN, (run) => {
    const chars = Array.from(run)
    if (chars.length === 1) return ` ${run} `
    const grams: string[] = []
    for (let i = 0; i + 1 < chars.length; i++) grams.push(chars[i]! + chars[i + 1]!)
    return ` ${grams.join(' ')} `
  })
}

/** Build an OR query of quoted tokens from free text, or undefined when nothing is searchable. */
export function toMatchExpression(query: string, maxTokens = 48): string | undefined {
  const tokens = new Set<string>()
  for (const match of toSearchText(query).toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)) {
    const token = match[0]
    const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(token)
    if (!cjk && token.length < 2) continue
    tokens.add(token)
    if (tokens.size >= maxTokens) break
  }
  if (tokens.size === 0) return undefined
  // A lone CJK character only occurs inside indexed bigrams, so match it as a prefix.
  return [...tokens].map((token) => `"${token.replaceAll('"', '""')}"${Array.from(token).length === 1 ? '*' : ''}`).join(' OR ')
}
