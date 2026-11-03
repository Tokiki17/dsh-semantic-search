/**
 * The `semanticSearch` host service behind the setup page: reports the
 * configuration, key status, local runtime/models and collections; tests a
 * draft configuration with real requests; saves it through DSH's config
 * editor; stores keys in DSH credentials; downloads local models; and
 * rebuilds collections made stale by a model change. Exposed to the web
 * client through the `./typert` manifest.
 */
import z from '@deepseek-ai/schemastery'
import { createEmbedder, createReranker, type BackendDeps } from './backends/index.ts'
import type { Backend } from './backends/types.ts'
import { assertCredentialName, Config, resolveModels } from './config.ts'
import type { KnowledgeBase } from './kb.ts'
import type { DownloadState, LocalManager } from './local/index.ts'

export const SERVICE_KEY = 'semanticSearch'
export const ROW_ID = 'semantic-search'

/** What the setup page edits; every other field keeps its current value. */
export interface Draft {
  embedding: Config['embedding']
  rerank: Config['rerank']
  providers?: {
    dashscope?: Partial<Config['providers']['dashscope']>
    siliconflow?: Partial<Config['providers']['siliconflow']>
    custom?: Partial<Config['providers']['custom']>
  }
  local?: Partial<Pick<Config['local'], 'ctx' | 'downloadSource' | 'githubMirror'>>
}

export interface KeyStatus {
  readonly name: string
  readonly configured: boolean
  readonly source: string | undefined
  readonly writable: boolean
}

export interface RebuildState {
  readonly status: 'idle' | 'running' | 'done' | 'failed'
  readonly done: number
  readonly total: number
  readonly current: string | undefined
  readonly error: string | undefined
}

export interface TestResult {
  readonly ok: boolean
  readonly ms: number
  readonly detail: string
}

interface Credentials {
  resolve(ref: string): Promise<{ value: string } | undefined>
  describe(ref: string): Promise<{ configured: boolean; source?: string; writable: boolean }>
  set(ref: string, value: string): Promise<void>
  unset(ref: string): Promise<void>
}
interface ConfigEntry {
  readonly options: { id?: string; name?: string; config?: unknown }
}
interface ConfigEditor {
  entries(): ConfigEntry[]
  edit(entry: ConfigEntry, change: (current: Record<string, unknown>) => Record<string, unknown>): Promise<void>
}

export interface ServiceDeps {
  readonly config: Config
  readonly storageDir: string
  readonly kb: KnowledgeBase
  readonly local: LocalManager
  readonly backend: () => Backend
  readonly backendDeps: Omit<BackendDeps, 'local'>
  readonly optional: <T>(name: string) => T | undefined
  readonly describeBackend: (backend: Backend) => string
}

const IDLE_REBUILD: RebuildState = { status: 'idle', done: 0, total: 0, current: undefined, error: undefined }

export function createService(deps: ServiceDeps) {
  const { config, kb, local } = deps
  let rebuild: RebuildState = IDLE_REBUILD
  const rebuildAbort = new AbortController()

  const credentials = () => deps.optional<Credentials>('credentials')
  const keyNames = (current: Config): string[] => [
    ...new Set([current.providers.dashscope.apiKeyEnv, current.providers.siliconflow.apiKeyEnv, current.providers.custom.apiKeyEnv].filter((name): name is string => !!name)),
  ]

  const service = {
    async getState() {
      let active: string
      let error: string | undefined
      try {
        active = deps.describeBackend(deps.backend())
      } catch (caught) {
        active = 'misconfigured'
        error = caught instanceof Error ? caught.message : String(caught)
      }
      const keys: KeyStatus[] = []
      for (const name of keyNames(config)) {
        const info = await credentials()?.describe(name).catch(() => undefined)
        keys.push({ name, configured: info?.configured ?? Boolean(process.env[name]), source: info?.source ?? (process.env[name] ? 'environment' : undefined), writable: info?.writable ?? false })
      }
      const collections = kb.list(process.cwd()).map((info) => ({ name: info.name, root: info.root, chunks: info.chunks, files: info.files, stale: info.stale }))
      return {
        config: {
          embedding: config.embedding,
          rerank: config.rerank,
          providers: config.providers,
          local: { ctx: config.local.ctx, idleStopMinutes: config.local.idleStopMinutes, downloadSource: config.local.downloadSource, githubMirror: config.local.githubMirror ?? '' },
        },
        active,
        error,
        keys,
        canSave: editorEntry() !== undefined,
        canStoreKeys: credentials() !== undefined,
        storageDir: deps.storageDir,
        local: {
          runtime: local.runtime(),
          hardware: local.hardware(),
          models: local.models(),
          disk: local.diskUsage(),
          servers: local.serverList(),
          download: local.progress(),
        },
        collections,
        rebuild,
      }
    },

    /** One real embedding or rerank request with the draft configuration (keys come from credentials). */
    async testModel(request: { role: 'embedding' | 'rerank'; draft: Draft }): Promise<TestResult> {
      const started = Date.now()
      const signal = AbortSignal.timeout(180000)
      try {
        const models = resolveModels(mergeDraft(config, request.draft))
        const backendDeps: BackendDeps = { ...deps.backendDeps, local: local.servers }
        if (request.role === 'embedding') {
          if (models.embedding === undefined) return { ok: true, ms: 0, detail: 'keyword search only' }
          const embedder = createEmbedder(models.embedding, backendDeps)
          const vector = await embedder.embedQuery('semantic search connection test', signal)
          return { ok: true, ms: Date.now() - started, detail: `${embedder.endpoint}: ${vector.length} dimensions` }
        }
        if (models.rerank === undefined) return { ok: true, ms: 0, detail: 'rerank off' }
        const reranker = createReranker(models.rerank, backendDeps)
        const hits = await reranker.rerank('How do I restart the service?', ['The cache lives in ~/.cache.', 'Run systemctl restart app to restart the service.'], 2, signal)
        const ok = hits[0]?.index === 1
        return { ok, ms: Date.now() - started, detail: ok ? `${reranker.endpoint}: ranked the relevant passage first` : `${reranker.endpoint}: answered, but ranked the passages unexpectedly` }
      } catch (caught) {
        return { ok: false, ms: Date.now() - started, detail: caught instanceof Error ? caught.message : String(caught) }
      }
    },

    /** Persist the draft into the profile patch; DSH then reloads this plugin with it. */
    async saveConfig(request: { draft: Draft }): Promise<{ saved: boolean }> {
      const next = mergeDraft(config, request.draft)
      resolveModels(next) // Reject incomplete custom sources before writing anything.
      const editor = deps.optional<ConfigEditor>('configEditor')
      const entry = editorEntry()
      if (editor === undefined || entry === undefined) throw new Error('this DSH host cannot edit plugin configuration; edit the semantic-search row in cordis.patch.yml instead')
      await editor.edit(entry, (current) => applyDraft(current, request.draft))
      return { saved: true }
    },

    async setKey(request: { name: string; value: string }): Promise<KeyStatus> {
      const name = allowedKey(request.name)
      const value = request.value.trim()
      if (value === '') throw new Error('the key is empty')
      const store = credentials()
      if (store === undefined) throw new Error('DSH credentials are not available in this host')
      await store.set(name, value)
      const info = await store.describe(name)
      return { name, configured: info.configured, source: info.source, writable: info.writable }
    },

    async clearKey(request: { name: string }): Promise<KeyStatus> {
      const name = allowedKey(request.name)
      const store = credentials()
      if (store === undefined) throw new Error('DSH credentials are not available in this host')
      await store.unset(name)
      const info = await store.describe(name)
      return { name, configured: info.configured, source: info.source, writable: info.writable }
    },

    startDownload(request: { model: string }): DownloadState {
      return local.startDownload(request.model)
    },

    cancelDownload(): DownloadState {
      local.cancelDownload()
      return local.progress()
    },

    async removeModel(request: { model: string }): Promise<{ removed: boolean }> {
      return { removed: await local.removeModel(request.model) }
    },

    /** Re-index, in the background, every collection whose vectors came from another model. */
    rebuildStale(): RebuildState {
      if (rebuild.status === 'running') return rebuild
      const stale = kb.list(process.cwd()).filter((info) => info.stale)
      rebuild = { ...IDLE_REBUILD, status: stale.length === 0 ? 'done' : 'running', total: stale.length }
      if (stale.length === 0) return rebuild
      void (async () => {
        for (const info of stale) {
          rebuild = { ...rebuild, current: info.name }
          const plan = info.kind === 'workspace' ? kb.planIndex('workspace', undefined, info.root!) : kb.planIndex(info.name, undefined, process.cwd())
          await kb.index(plan, { rebuild: true, signal: rebuildAbort.signal })
          rebuild = { ...rebuild, done: rebuild.done + 1 }
        }
      })().then(
        () => { rebuild = { ...rebuild, status: 'done', current: undefined } },
        (caught: unknown) => { rebuild = { ...rebuild, status: 'failed', error: caught instanceof Error ? caught.message : String(caught) } },
      )
      return rebuild
    },
  }

  function editorEntry(): ConfigEntry | undefined {
    return deps.optional<ConfigEditor>('configEditor')?.entries().find((entry) => entry.options.id === ROW_ID)
  }

  function allowedKey(name: string): string {
    assertCredentialName(name)
    // Only the key names this plugin's providers reference; the page cannot overwrite unrelated credentials.
    const allowed = new Set([...keyNames(config), 'DASHSCOPE_API_KEY', 'SILICONFLOW_API_KEY'])
    if (!allowed.has(name)) throw new Error(`"${name}" is not a key used by semantic search; set providers.*.apiKeyEnv first`)
    return name
  }

  // Bind for the typert gateway: it validates `typertRemote` and calls methods positionally.
  Object.defineProperty(service, 'typertRemote', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: { service, serviceKey: SERVICE_KEY, namespace: SERVICE_KEY },
  })
  return { service, dispose: () => rebuildAbort.abort(new Error('plugin unloaded')) }
}

export type SemanticSearchService = ReturnType<typeof createService>['service']

/** The draft over the raw (unresolved) profile config: model roles replaced, provider fields merged. */
export function applyDraft(current: Record<string, unknown>, draft: Draft): Record<string, unknown> {
  const next: Record<string, unknown> = { ...current, embedding: compact(draft.embedding), rerank: compact(draft.rerank) }
  if (draft.providers !== undefined) {
    const providers = { ...(current.providers as Record<string, Record<string, unknown>> | undefined) }
    for (const [name, value] of Object.entries(draft.providers)) {
      if (value !== undefined) providers[name] = compact({ ...providers[name], ...value })
    }
    next.providers = providers
  }
  if (draft.local !== undefined) next.local = compact({ ...(current.local as Record<string, unknown> | undefined), ...draft.local })
  return next
}

/** Resolve the draft against the running config, for tests before saving. */
export function mergeDraft(config: Config, draft: Draft): Config {
  const raw = applyDraft(structuredClone(config) as unknown as Record<string, unknown>, draft)
  return new (Config as unknown as z<Config>)(raw as unknown as Config)
}

/** Drop empty strings and undefined so cleared fields fall back to their defaults. */
function compact<T extends object>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== '')) as T
}
