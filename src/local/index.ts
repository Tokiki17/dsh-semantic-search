/**
 * Local backend management: installs the pinned llama.cpp runtime, downloads
 * Qwen3 GGUF models (reusing files from the 0.1.x cache), reports progress
 * to the setup page, and owns the llama-server processes.
 */
import { execFile } from 'node:child_process'
import { existsSync, readdirSync, statSync, statfsSync } from 'node:fs'
import { mkdir, rename, rm } from 'node:fs/promises'
import { homedir, totalmem } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { LLAMA_CPP_TAG, LOCAL_MODELS, localModel, modelUrl, runtimeAsset, runtimeUrls, type LocalModel, type ModelHost } from './catalog.ts'
import { download, rankBySpeed } from './download.ts'
import { LocalServers, type ServerInfo } from './servers.ts'

export { LOCAL_MODELS, localModel } from './catalog.ts'

const run = promisify(execFile)

export interface LocalManagerOptions {
  /** Plugin storage root; the runtime goes to `bin/`, models to `models/`, logs to `logs/`. */
  readonly dir: string
  readonly ctx: number
  readonly idleStopMinutes: number
  readonly downloadSource: 'auto' | ModelHost
  readonly githubMirror: string | undefined
  /** Folders holding model files from earlier installs (default: the 0.1.x cache). */
  readonly legacyModelDirs?: readonly string[]
  readonly fetch?: typeof fetch
}

export interface ModelState {
  readonly id: string
  readonly role: LocalModel['role']
  readonly label: string
  readonly size: number
  readonly dims: number | undefined
  readonly memoryMB: number
  readonly downloaded: boolean
  readonly path: string | undefined
}

export interface DownloadState {
  readonly status: 'idle' | 'running' | 'done' | 'failed' | 'cancelled'
  /** What is being fetched now: `runtime` or a model id. */
  readonly item: string | undefined
  /** Model id the task was started for. */
  readonly target: string | undefined
  readonly received: number
  readonly total: number
  readonly source: string | undefined
  readonly bytesPerSecond: number
  readonly error: string | undefined
}

export interface Hardware {
  readonly platform: string
  readonly arch: string
  readonly supported: boolean
  readonly totalMemoryMB: number
  readonly freeDiskMB: number | undefined
}

const IDLE: DownloadState = { status: 'idle', item: undefined, target: undefined, received: 0, total: 0, source: undefined, bytesPerSecond: 0, error: undefined }

export class LocalManager {
  readonly servers: LocalServers
  private readonly options: LocalManagerOptions
  private state: DownloadState = IDLE
  private task: AbortController | undefined

  constructor(options: LocalManagerOptions) {
    this.options = options
    this.servers = new LocalServers({
      binary: () => this.requireBinary(),
      modelPath: (id) => this.requireModel(id),
      ctx: options.ctx,
      idleStopMinutes: options.idleStopMinutes,
      logDir: join(options.dir, 'logs'),
    })
  }

  dispose(): void {
    this.task?.abort(new Error('plugin unloaded'))
    this.servers.dispose()
  }

  private get runtimeDir(): string {
    return join(this.options.dir, 'bin', LLAMA_CPP_TAG)
  }

  private get modelsDir(): string {
    return join(this.options.dir, 'models')
  }

  /** The installed llama-server, or undefined. */
  binary(): string | undefined {
    const name = process.platform === 'win32' ? 'llama-server.exe' : 'llama-server'
    return findFile(this.runtimeDir, name, 3)
  }

  private requireBinary(): string {
    const binary = this.binary()
    if (binary === undefined) throw new Error(`the local model runtime (llama.cpp ${LLAMA_CPP_TAG}) is not installed; download a model in Plugins → Semantic Search → Configure`)
    return binary
  }

  /** Downloaded file for a model id: the plugin's own copy first, then a complete legacy copy. */
  modelPath(id: string): string | undefined {
    const model = localModel(id)
    if (model === undefined) return undefined
    const dirs = [this.modelsDir, ...(this.options.legacyModelDirs ?? [join(homedir(), '.cache', 'dsh-qwen-rag', 'models')])]
    for (const dir of dirs) {
      const path = join(dir, model.file)
      if (fileSize(path) === model.size) return path
    }
    return undefined
  }

  private requireModel(id: string): string {
    if (localModel(id) === undefined) throw new Error(`unknown local model "${id}"; choose one of ${LOCAL_MODELS.map((model) => model.id).join(', ')}`)
    const path = this.modelPath(id)
    if (path === undefined) throw new Error(`local model ${id} is not downloaded yet; download it in Plugins → Semantic Search → Configure`)
    return path
  }

  models(): ModelState[] {
    return LOCAL_MODELS.map((model) => {
      const path = this.modelPath(model.id)
      return {
        id: model.id, role: model.role, label: model.label, size: model.size, dims: model.dims, memoryMB: model.memoryMB,
        downloaded: path !== undefined, path,
      }
    })
  }

  runtime(): { tag: string; installed: boolean; supported: boolean; size: number | undefined } {
    const asset = runtimeAsset()
    return { tag: LLAMA_CPP_TAG, installed: this.binary() !== undefined, supported: asset !== undefined, size: asset?.size }
  }

  hardware(): Hardware {
    let freeDiskMB: number | undefined
    try {
      const target = existsSync(this.options.dir) ? this.options.dir : homedir()
      const stats = statfsSync(target)
      freeDiskMB = Math.floor((stats.bavail * stats.bsize) / (1 << 20))
    } catch {
      freeDiskMB = undefined
    }
    return {
      platform: process.platform,
      arch: process.arch,
      supported: runtimeAsset() !== undefined,
      totalMemoryMB: Math.round(totalmem() / (1 << 20)),
      freeDiskMB,
    }
  }

  /** Disk used by the plugin's own runtime and model files (legacy copies are not counted). */
  diskUsage(): { runtimeBytes: number; modelBytes: number } {
    return { runtimeBytes: dirSize(join(this.options.dir, 'bin')), modelBytes: dirSize(this.modelsDir) }
  }

  progress(): DownloadState {
    return this.state
  }

  /** Start fetching the runtime (if needed) and one model in the background; poll `progress()`. */
  startDownload(id: string): DownloadState {
    const model = localModel(id)
    if (model === undefined) throw new Error(`unknown local model "${id}"`)
    if (this.state.status === 'running') throw new Error(`a download is already running (${this.state.target})`)
    const asset = runtimeAsset()
    if (asset === undefined) throw new Error(`no prebuilt llama.cpp runtime for ${process.platform}-${process.arch}`)
    const needRuntime = this.binary() === undefined
    const needModel = this.modelPath(id) === undefined
    const total = (needRuntime ? asset.size : 0) + (needModel ? model.size : 0)
    const controller = new AbortController()
    this.task = controller
    this.state = { ...IDLE, status: 'running', target: id, total }
    void this.fetchAll(model, needRuntime, needModel, controller.signal).then(
      () => { this.state = { ...this.state, status: 'done', item: undefined, received: this.state.total, bytesPerSecond: 0 } },
      (error: unknown) => {
        this.state = controller.signal.aborted
          ? { ...this.state, status: 'cancelled', bytesPerSecond: 0 }
          : { ...this.state, status: 'failed', bytesPerSecond: 0, error: error instanceof Error ? error.message : String(error) }
      },
    ).finally(() => {
      if (this.task === controller) this.task = undefined
    })
    return this.state
  }

  cancelDownload(): boolean {
    if (this.task === undefined) return false
    this.task.abort(new Error('cancelled'))
    return true
  }

  /** Delete the plugin's copy of a model; legacy copies are left alone. */
  async removeModel(id: string): Promise<boolean> {
    const model = localModel(id)
    if (model === undefined) throw new Error(`unknown local model "${id}"`)
    if (this.state.status === 'running' && this.state.target === id) throw new Error('the model is being downloaded; cancel the download first')
    for (const server of this.servers.list()) if (server.model === id) this.servers.stop(server.role)
    const path = join(this.modelsDir, model.file)
    const existed = existsSync(path) || existsSync(`${path}.part`)
    await rm(path, { force: true })
    await rm(`${path}.part`, { force: true })
    return existed
  }

  serverList(): ServerInfo[] {
    return this.servers.list()
  }

  private async fetchAll(model: LocalModel, needRuntime: boolean, needModel: boolean, signal: AbortSignal): Promise<void> {
    let base = 0
    const track = (item: string) => {
      const started = Date.now()
      let first: number | undefined
      return (received: number, url: string) => {
        first ??= received
        const seconds = (Date.now() - started) / 1000
        this.state = {
          ...this.state, item, received: base + received, source: new URL(url).host,
          bytesPerSecond: seconds > 0.5 ? Math.round((received - first) / seconds) : 0,
        }
      }
    }
    if (needRuntime) {
      const asset = runtimeAsset()!
      this.state = { ...this.state, item: 'runtime' }
      const urls = await rankBySpeed(runtimeUrls(asset, this.options.githubMirror), { signal, ...this.fetchOption() })
      const archive = join(this.options.dir, 'downloads', asset.name)
      await download({ urls, dest: archive, size: asset.size, sha256: asset.sha256, signal, onProgress: track('runtime'), ...this.fetchOption() })
      await this.extractRuntime(archive)
      base += asset.size
    }
    if (needModel) {
      this.state = { ...this.state, item: model.id }
      const hosts: ModelHost[] = this.options.downloadSource === 'auto' ? ['huggingface', 'hf-mirror', 'modelscope'] : [this.options.downloadSource]
      const urls = await rankBySpeed(hosts.map((host) => modelUrl(model, host)), { signal, ...this.fetchOption() })
      await download({ urls, dest: join(this.modelsDir, model.file), size: model.size, sha256: model.sha256, signal, onProgress: track(model.id), ...this.fetchOption() })
    }
  }

  private fetchOption(): { fetch?: typeof fetch } {
    return this.options.fetch === undefined ? {} : { fetch: this.options.fetch }
  }

  /** Unpack into a fresh directory, then swap it into place; the verified archive is removed afterwards. */
  private async extractRuntime(archive: string): Promise<void> {
    const staging = `${this.runtimeDir}.staging`
    await rm(staging, { recursive: true, force: true })
    await mkdir(staging, { recursive: true, mode: 0o700 })
    // bsdtar/GNU tar keep the dylib symlinks; Windows 10+ ships bsdtar as tar.exe, which also reads .zip.
    await run('tar', ['-xf', archive, '-C', staging], { windowsHide: true })
    const name = process.platform === 'win32' ? 'llama-server.exe' : 'llama-server'
    if (findFile(staging, name, 3) === undefined) throw new Error(`the llama.cpp archive does not contain ${name}`)
    await rm(this.runtimeDir, { recursive: true, force: true })
    await rename(staging, this.runtimeDir)
    await rm(archive, { force: true })
  }
}

function findFile(dir: string, name: string, depth: number): string | undefined {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return undefined
  }
  for (const entry of entries) if (entry.isFile() && entry.name === name) return join(dir, name)
  if (depth <= 0) return undefined
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const found = findFile(join(dir, entry.name), name, depth - 1)
    if (found !== undefined) return found
  }
  return undefined
}

function fileSize(path: string): number | undefined {
  try {
    return statSync(path).size
  } catch {
    return undefined
  }
}

function dirSize(dir: string): number {
  let total = 0
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return 0
  }
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) total += dirSize(path)
    else if (entry.isFile()) total += fileSize(path) ?? 0
  }
  return total
}
