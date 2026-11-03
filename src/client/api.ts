/**
 * Browser-side view of the host `semanticSearch` service: the remote
 * descriptors mounted on `ctx.remote`, the shapes the page reads, and a thin
 * call wrapper that turns `RemoteResult` failures into thrown errors.
 */

export const PACKAGE = '@tokiki/dsh-semantic-search'
export const NAMESPACE = 'semanticSearch'

export type EmbeddingSource = 'none' | 'local' | 'dashscope' | 'siliconflow' | 'custom'
export type RerankSource = 'same' | 'off' | Exclude<EmbeddingSource, 'none'>

export interface Draft {
  embedding: { source: EmbeddingSource; model?: string; dimensions: number }
  rerank: { source: RerankSource; model?: string }
  providers?: {
    dashscope?: { baseURL?: string; apiKeyEnv?: string }
    siliconflow?: { baseURL?: string; apiKeyEnv?: string }
    custom?: { baseURL?: string; rerankBaseURL?: string; apiKeyEnv?: string; queryFormat?: 'qwen3' | 'plain'; sendDimensions?: boolean }
  }
  local?: { ctx?: number; downloadSource?: 'auto' | 'huggingface' | 'hf-mirror' | 'modelscope'; githubMirror?: string }
}

export interface KeyStatus {
  name: string
  configured: boolean
  source?: string
  writable: boolean
}

export interface ModelState {
  id: string
  role: 'embedding' | 'rerank'
  label: string
  size: number
  dims?: number
  memoryMB: number
  downloaded: boolean
  path?: string
}

export interface DownloadState {
  status: 'idle' | 'running' | 'done' | 'failed' | 'cancelled'
  item?: string
  target?: string
  received: number
  total: number
  source?: string
  bytesPerSecond: number
  error?: string
}

export interface RebuildState {
  status: 'idle' | 'running' | 'done' | 'failed'
  done: number
  total: number
  current?: string
  error?: string
}

export interface State {
  config: {
    embedding: { source: EmbeddingSource; model?: string; dimensions: number }
    rerank: { source: RerankSource; model?: string }
    providers: {
      dashscope: { baseURL: string; apiKeyEnv: string }
      siliconflow: { baseURL: string; apiKeyEnv: string }
      custom: { baseURL?: string; rerankBaseURL?: string; apiKeyEnv?: string; queryFormat: 'qwen3' | 'plain'; sendDimensions: boolean }
    }
    local: { ctx: number; idleStopMinutes: number; downloadSource: string; githubMirror: string }
  }
  active: string
  error?: string
  keys: KeyStatus[]
  canSave: boolean
  canStoreKeys: boolean
  storageDir: string
  local: {
    runtime: { tag: string; installed: boolean; supported: boolean; size?: number }
    hardware: { platform: string; arch: string; supported: boolean; totalMemoryMB: number; freeDiskMB?: number }
    models: ModelState[]
    disk: { runtimeBytes: number; modelBytes: number }
    servers: Array<{ role: string; model: string; ready: boolean }>
    download: DownloadState
  }
  collections: Array<{ name: string; root?: string; chunks: number; files: number; stale: boolean }>
  rebuild: RebuildState
}

export interface TestResult {
  ok: boolean
  ms: number
  detail: string
}

export interface SemanticSearchApi {
  getState(): Promise<State>
  testModel(request: { role: 'embedding' | 'rerank'; draft: Draft }): Promise<TestResult>
  saveConfig(request: { draft: Draft }): Promise<{ saved: boolean }>
  setKey(request: { name: string; value: string }): Promise<KeyStatus>
  clearKey(request: { name: string }): Promise<KeyStatus>
  startDownload(request: { model: string }): Promise<DownloadState>
  cancelDownload(): Promise<DownloadState>
  removeModel(request: { model: string }): Promise<{ removed: boolean }>
  rebuildStale(): Promise<RebuildState>
}

type RemoteResult<T> = { ok: true; value: T } | { ok: false; error: { code?: string; message: string } }
type RawRemote = { [K in keyof SemanticSearchApi]: (...args: Parameters<SemanticSearchApi[K]>) => Promise<RemoteResult<Awaited<ReturnType<SemanticSearchApi[K]>>>> }

// The host validates every payload against the ./typert manifest; the browser side passes values through.
const passThrough = { parse: (value: unknown) => value }
const codec = (type: string) => ({ mode: 'strict', typeSymbol: `${PACKAGE}#${type}`, schema: passThrough, create: () => passThrough })
const request = (type: string) => [{ name: 'request', wire: 'request', source: 'json', codec: codec(type) }]

const DESCRIPTORS = [
    { method: 'getState', parameters: [], result: codec('SemanticSearchState') },
    { method: 'testModel', parameters: request('TestModelRequest'), result: codec('TestResult') },
    { method: 'saveConfig', parameters: request('SaveConfigRequest'), result: codec('SaveResult') },
    { method: 'setKey', parameters: request('SetKeyRequest'), result: codec('KeyStatus') },
    { method: 'clearKey', parameters: request('KeyRequest'), result: codec('KeyStatus') },
    { method: 'startDownload', parameters: request('ModelRequest'), result: codec('DownloadState') },
    { method: 'cancelDownload', parameters: [], result: codec('DownloadState') },
    { method: 'removeModel', parameters: request('ModelRequest'), result: codec('RemoveResult') },
    { method: 'rebuildStale', parameters: [], result: codec('RebuildState') },
]

/** Same shape as the host manifest's invocations, which the gateway matches by namespace and method. */
export const REMOTE_CONTRIBUTION = {
  package: PACKAGE,
  descriptors: DESCRIPTORS.map((descriptor) => ({
    id: `${PACKAGE}#${NAMESPACE}/${descriptor.method}`,
    service: NAMESPACE,
    namespace: NAMESPACE,
    invocation: { kind: 'direct' },
    ...descriptor,
  })),
}

/** Wrap the mounted remote so callers await plain values and catch real errors. */
export function wrapRemote(raw: RawRemote): SemanticSearchApi {
  const unwrap = async <T>(result: Promise<RemoteResult<T>>): Promise<T> => {
    const settled = await result
    if (!settled.ok) throw new Error(settled.error.message || settled.error.code || 'request failed')
    return settled.value
  }
  return {
    getState: () => unwrap(raw.getState()),
    testModel: (body) => unwrap(raw.testModel(body)),
    saveConfig: (body) => unwrap(raw.saveConfig(body)),
    setKey: (body) => unwrap(raw.setKey(body)),
    clearKey: (body) => unwrap(raw.clearKey(body)),
    startDownload: (body) => unwrap(raw.startDownload(body)),
    cancelDownload: () => unwrap(raw.cancelDownload()),
    removeModel: (body) => unwrap(raw.removeModel(body)),
    rebuildStale: () => unwrap(raw.rebuildStale()),
  }
}
