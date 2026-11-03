/**
 * Knowledge-base façade used by the tools: resolves collections on disk,
 * serializes indexing per collection, and runs hybrid search
 * (dense + keyword → RRF → rerank) across one or more collections.
 */
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import type { Backend } from './backends/types.ts'
import { indexSources, type IndexStats } from './indexer.ts'
import { denseTopK, reciprocalRankFusion } from './retrieve.ts'
import { Store, toMatchExpression, type ChunkRow } from './store.ts'

export const WORKSPACE = 'workspace'
const NAME_PATTERN = /^[a-z0-9][a-z0-9_-]{0,63}$/

export interface KnowledgeBaseOptions {
  readonly storageDir: string
  readonly backend: () => Backend
  readonly index: {
    readonly chunkChars: number
    readonly overlapChars: number
    readonly maxFileBytes: number
    readonly maxFiles: number
    readonly excludeDirs: readonly string[]
    readonly extraExtensions: readonly string[]
  }
  readonly search: {
    readonly topK: number
    readonly candidates: number
    readonly rerankCandidates: number
    readonly maxSnippetChars: number
    readonly refreshBeforeSearch: boolean
    readonly maxRefreshFiles: number
  }
  readonly rerank: boolean
}

export interface CollectionRef {
  /** `workspace` or a named collection. */
  readonly name: string
  readonly kind: 'workspace' | 'named'
  readonly dbPath: string
  /** Workspace root for `workspace` collections. */
  readonly root: string | undefined
}

export interface CollectionInfo {
  readonly name: string
  readonly kind: 'workspace' | 'named'
  readonly root: string | undefined
  readonly description: string
  readonly sources: string[]
  readonly files: number
  readonly chunks: number
  readonly embedder: string | undefined
  readonly stale: boolean
  readonly updatedAt: string | undefined
  readonly current: boolean
}

export interface SearchHit {
  readonly collection: string
  readonly path: string
  readonly location: string
  readonly heading: string
  readonly score: number
  readonly text: string
}

export interface SearchResult {
  readonly hits: SearchHit[]
  readonly ranking: 'rerank' | 'fusion'
  readonly searched: string[]
  readonly notes: string[]
}

interface Candidate {
  readonly ref: CollectionRef
  readonly store: Store
  readonly id: number
  readonly fused: number
}

export class KnowledgeBase {
  private readonly options: KnowledgeBaseOptions
  private readonly stores = new Map<string, Store>()
  private readonly locks = new Map<string, Promise<unknown>>()

  constructor(options: KnowledgeBaseOptions) {
    this.options = options
  }

  close(): void {
    for (const store of this.stores.values()) store.close()
    this.stores.clear()
  }

  /** Resolve `workspace` (relative to `cwd`) or a collection name. */
  ref(name: string, cwd: string): CollectionRef {
    if (name === WORKSPACE) {
      const root = projectRoot(cwd)
      const id = createHash('sha256').update(root).digest('hex').slice(0, 16)
      return { name: WORKSPACE, kind: 'workspace', dbPath: join(this.options.storageDir, 'workspaces', `${id}.db`), root }
    }
    if (!NAME_PATTERN.test(name)) {
      throw new Error(`invalid collection name ${JSON.stringify(name)}: use lowercase letters, digits, "-" or "_" (max 64), or "workspace"`)
    }
    return { name, kind: 'named', dbPath: join(this.options.storageDir, 'collections', `${name}.db`), root: undefined }
  }

  private open(ref: CollectionRef): Store {
    let store = this.stores.get(ref.dbPath)
    if (store === undefined) {
      store = Store.open(ref.dbPath)
      this.stores.set(ref.dbPath, store)
    }
    return store
  }

  private exists(ref: CollectionRef): boolean {
    return this.stores.has(ref.dbPath) || existsSync(ref.dbPath)
  }

  /** Run `body` while holding the collection's write lock; concurrent writers fail fast. */
  private async exclusive<T>(ref: CollectionRef, body: () => Promise<T>): Promise<T> {
    if (this.locks.has(ref.dbPath)) throw new Error(`collection "${ref.name}" is already being indexed; wait for that run to finish`)
    const run = body()
    this.locks.set(ref.dbPath, run)
    try {
      return await run
    } finally {
      this.locks.delete(ref.dbPath)
    }
  }

  isIndexing(ref: CollectionRef): boolean {
    return this.locks.has(ref.dbPath)
  }

  /** Validate an index request without touching the disk, so tools can fail before going to the background. */
  planIndex(name: string, paths: readonly string[] | undefined, cwd: string): { ref: CollectionRef; sources: string[] } {
    const ref = this.ref(name, cwd)
    if (ref.kind === 'workspace') {
      if (paths !== undefined && paths.length > 0) throw new Error('the workspace collection always covers the whole project root; pass a collection name to index other paths')
      return { ref, sources: [ref.root!] }
    }
    const existing = this.exists(ref) ? readSources(this.open(ref)) : []
    const added = (paths ?? []).map((path) => resolvePath(path, cwd))
    for (const path of added) {
      if (!existsSync(path)) throw new Error(`path does not exist: ${path}`)
    }
    const sources = [...new Set([...existing, ...added])]
    if (sources.length === 0) throw new Error(`collection "${name}" does not exist yet; pass paths (folders or files) to create it`)
    return { ref, sources }
  }

  async index(
    plan: { ref: CollectionRef; sources: string[] },
    request: { description?: string; rebuild?: boolean; signal: AbortSignal; progress?: (line: string) => void },
  ): Promise<IndexStats> {
    const { ref, sources } = plan
    return this.exclusive(ref, async () => {
      const store = this.open(ref)
      const { embedder } = this.options.backend()
      const meta: Record<string, string> = { name: ref.name, kind: ref.kind, sources: JSON.stringify(sources) }
      if (ref.root !== undefined) meta.root = ref.root
      if (request.description !== undefined) meta.description = request.description
      store.setMeta(meta)
      return indexSources(store, embedder, {
        ...this.options.index,
        sources,
        label: (path) => displayPath(ref, sources, path),
        rebuild: request.rebuild ?? false,
        signal: request.signal,
        ...(request.progress !== undefined ? { progress: request.progress } : {}),
      })
    })
  }

  list(cwd: string): CollectionInfo[] {
    const current = this.ref(WORKSPACE, cwd)
    const infos: CollectionInfo[] = []
    const embedderId = safeEmbedderId(this.options.backend)
    for (const kind of ['workspaces', 'collections'] as const) {
      const dir = join(this.options.storageDir, kind)
      let names: string[]
      try {
        names = readdirSync(dir).filter((name) => name.endsWith('.db')).sort()
      } catch {
        continue
      }
      for (const file of names) {
        const dbPath = join(dir, file)
        const store = this.stores.get(dbPath) ?? this.open({ name: file, kind: 'named', dbPath, root: undefined })
        const meta = store.allMeta()
        const counts = store.counts()
        infos.push({
          name: kind === 'workspaces' ? (dbPath === current.dbPath ? WORKSPACE : `${WORKSPACE}:${meta.root ?? '?'}`) : file.slice(0, -3),
          kind: kind === 'workspaces' ? 'workspace' : 'named',
          root: meta.root,
          description: meta.description ?? '',
          sources: parseSources(meta.sources),
          files: counts.files,
          chunks: counts.chunks,
          embedder: meta.embedder,
          stale: meta.embedder !== undefined && embedderId !== undefined && meta.embedder !== embedderId,
          updatedAt: meta.updatedAt,
          current: dbPath === current.dbPath,
        })
      }
    }
    return infos
  }

  async remove(name: string, paths: readonly string[] | undefined, cwd: string): Promise<{ removedFiles: number; deleted: boolean }> {
    const ref = this.ref(name, cwd)
    if (!this.exists(ref)) throw new Error(`collection "${name}" does not exist`)
    return this.exclusive(ref, async () => {
      if (paths !== undefined && paths.length > 0) {
        const store = this.open(ref)
        const targets = paths.map((path) => resolvePath(path, ref.root ?? cwd))
        const doomed = store.files().map((row) => row.path).filter((path) => targets.some((target) => path === target || path.startsWith(target + sep)))
        const removedFiles = store.removeFiles(doomed)
        if (ref.kind === 'named') {
          const remaining = readSources(store).filter((source) => !targets.includes(source))
          store.setMeta({ sources: JSON.stringify(remaining) })
        }
        return { removedFiles, deleted: false }
      }
      const store = this.stores.get(ref.dbPath)
      const removedFiles = store?.counts().files ?? 0
      store?.close()
      this.stores.delete(ref.dbPath)
      for (const suffix of ['', '-wal', '-shm']) rmSync(ref.dbPath + suffix, { force: true })
      return { removedFiles, deleted: true }
    })
  }

  async search(
    query: string,
    request: { collections?: readonly string[]; topK?: number; cwd: string; signal: AbortSignal },
  ): Promise<SearchResult> {
    const notes: string[] = []
    const backend = this.options.backend()
    const { embedder } = backend
    const refs = this.searchTargets(request.collections, request.cwd, notes)
    const usable: Array<{ ref: CollectionRef; store: Store }> = []
    for (const ref of refs) {
      const store = this.open(ref)
      const id = store.getMeta('embedder')
      if (id === undefined || store.counts().chunks === 0) {
        notes.push(`collection "${ref.name}" is empty; run knowledge_index first`)
        continue
      }
      if (id !== embedder.id) {
        notes.push(`collection "${ref.name}" was built with ${id} but the current backend is ${embedder.id}; rebuild it with knowledge_index (rebuild: true)`)
        continue
      }
      if (this.isIndexing(ref)) {
        notes.push(`collection "${ref.name}" is being indexed right now; results may be incomplete`)
      } else if (this.options.search.refreshBeforeSearch) {
        await this.refresh(ref, store, request.signal, notes)
      }
      usable.push({ ref, store })
    }
    if (usable.length === 0) return { hits: [], ranking: 'fusion', searched: [], notes }

    const queryVector = await embedder.embedQuery(query, request.signal)
    const match = toMatchExpression(query)
    const { candidates } = this.options.search
    const pool: Candidate[] = []
    for (const { ref, store } of usable) {
      const dense = denseTopK(store.vectors(embedder.dims), queryVector, candidates).map((hit) => hit.id)
      let keyword: number[] = []
      if (match !== undefined) {
        try {
          keyword = store.keyword(match, candidates).map((hit) => hit.id)
        } catch (error) {
          notes.push(`keyword search skipped for "${ref.name}": ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      for (const hit of reciprocalRankFusion([dense, keyword]).slice(0, candidates)) {
        pool.push({ ref, store, id: hit.id, fused: hit.score })
      }
    }
    pool.sort((a, b) => b.fused - a.fused)

    const topK = Math.max(1, Math.min(request.topK ?? this.options.search.topK, 50))
    const rows = loadRows(pool.slice(0, Math.max(topK, this.options.search.rerankCandidates)))
    const shortlist = pool.filter((candidate) => rows.has(candidate)).slice(0, Math.max(topK, this.options.search.rerankCandidates))
    // Same cap as the embedding input, so one long-line chunk cannot overflow the reranker's context.
    const docLimit = this.options.index.chunkChars * 2
    const docs = shortlist.map((candidate) => {
      const row = rows.get(candidate)!
      const body = row.text.length > docLimit ? row.text.slice(0, docLimit) : row.text
      return row.heading ? `${row.heading}\n${body}` : body
    })

    let ranking: SearchResult['ranking'] = 'fusion'
    let ordered: Array<{ candidate: Candidate; score: number }> = shortlist.map((candidate) => ({ candidate, score: candidate.fused }))
    if (this.options.rerank && backend.reranker !== undefined && shortlist.length > 1) {
      try {
        const hits = await backend.reranker.rerank(query, docs, topK, request.signal)
        ordered = hits.map((hit) => ({ candidate: shortlist[hit.index]!, score: hit.score }))
        ranking = 'rerank'
      } catch (error) {
        if (request.signal.aborted) throw error
        notes.push(`rerank unavailable, results ordered by hybrid fusion: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    const hits = ordered.slice(0, topK).map(({ candidate, score }): SearchHit => {
      const row = rows.get(candidate)!
      const sources = parseSources(candidate.store.getMeta('sources'))
      return {
        collection: candidate.ref.name,
        path: displayPath(candidate.ref, sources, row.path),
        location: row.page !== undefined ? `p.${row.page}` : row.startLine === row.endLine ? `${row.startLine}` : `${row.startLine}-${row.endLine}`,
        heading: row.heading,
        score: Math.round(score * 10000) / 10000,
        text: truncate(row.text, this.options.search.maxSnippetChars),
      }
    })
    return { hits, ranking, searched: usable.map(({ ref }) => ref.name), notes }
  }

  private searchTargets(names: readonly string[] | undefined, cwd: string, notes: string[]): CollectionRef[] {
    if (names !== undefined && names.length > 0) {
      const refs: CollectionRef[] = []
      for (const name of new Set(names)) {
        const ref = this.ref(name, cwd)
        if (this.exists(ref)) refs.push(ref)
        else notes.push(name === WORKSPACE ? `the workspace ${ref.root} is not indexed yet; call knowledge_index with target "workspace" to build it` : `collection "${name}" does not exist`)
      }
      return refs
    }
    const refs: CollectionRef[] = []
    const workspace = this.ref(WORKSPACE, cwd)
    if (this.exists(workspace)) refs.push(workspace)
    else notes.push(`the workspace ${workspace.root} is not indexed yet; call knowledge_index with target "workspace" to build it`)
    const dir = join(this.options.storageDir, 'collections')
    try {
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.db')).sort()) refs.push(this.ref(file.slice(0, -3), cwd))
    } catch {
      // No named collections yet.
    }
    return refs
  }

  private async refresh(ref: CollectionRef, store: Store, signal: AbortSignal, notes: string[]): Promise<void> {
    const sources = ref.kind === 'workspace' ? [ref.root!] : readSources(store)
    try {
      await this.exclusive(ref, async () => {
        const stats = await indexSources(store, this.options.backend().embedder, {
          ...this.options.index,
          sources,
          label: (path) => displayPath(ref, sources, path),
          maxChanged: this.options.search.maxRefreshFiles,
          signal,
        })
        if (stats.deferred !== undefined) {
          notes.push(`collection "${ref.name}" has ${stats.deferred} changed files, more than the refresh limit; run knowledge_index to update it`)
        } else if (stats.added + stats.updated + stats.removed > 0) {
          notes.push(`refreshed "${ref.name}": ${stats.added} added, ${stats.updated} updated, ${stats.removed} removed`)
        }
      })
    } catch (error) {
      if (signal.aborted) throw error
      notes.push(`could not refresh "${ref.name}": ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

function loadRows(shortlist: readonly Candidate[]): Map<Candidate, ChunkRow> {
  const byStore = new Map<Store, Candidate[]>()
  for (const candidate of shortlist) {
    const list = byStore.get(candidate.store) ?? []
    list.push(candidate)
    byStore.set(candidate.store, list)
  }
  const rows = new Map<Candidate, ChunkRow>()
  for (const [store, list] of byStore) {
    const found = store.chunks(list.map((candidate) => candidate.id))
    for (const candidate of list) {
      const row = found.get(candidate.id)
      if (row !== undefined) rows.set(candidate, row)
    }
  }
  return rows
}

function readSources(store: Store): string[] {
  return parseSources(store.getMeta('sources'))
}

function parseSources(value: string | undefined): string[] {
  if (value === undefined) return []
  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

function safeEmbedderId(backend: () => Backend): string | undefined {
  try {
    return backend().embedder.id
  } catch {
    return undefined
  }
}

/** Nearest ancestor holding `.git`, else `cwd` itself. */
export function projectRoot(cwd: string): string {
  let dir = resolve(cwd)
  for (;;) {
    if (existsSync(join(dir, '.git'))) return dir
    const parent = dirname(dir)
    if (parent === dir) return resolve(cwd)
    dir = parent
  }
}

export function resolvePath(path: string, cwd: string): string {
  const expanded = path === '~' ? homedir() : path.startsWith('~/') ? join(homedir(), path.slice(2)) : path
  return resolve(cwd, expanded)
}

/** Workspace paths are shown relative to the root; collection paths relative to their source folder. */
export function displayPath(ref: CollectionRef, sources: readonly string[], path: string): string {
  if (ref.root !== undefined) return relative(ref.root, path) || path
  const home = homedir()
  for (const source of sources) {
    if (path.startsWith(source + sep) && isDirectory(source)) {
      const base = source.startsWith(home + sep) ? `~${source.slice(home.length)}` : source
      return `${base}/${relative(source, path)}`
    }
  }
  return path.startsWith(home + sep) ? `~${path.slice(home.length)}` : path
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text
}
