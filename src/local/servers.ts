/**
 * Plugin-managed llama-server processes, one per role (embedding, rerank).
 * A server starts on the first request that needs it, listens on a free
 * loopback port, and stops after an idle period or when the plugin unloads.
 */
import { spawn, type ChildProcess } from 'node:child_process'
import { closeSync, mkdirSync, openSync, readFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { join } from 'node:path'
import type { LocalModels } from '../backends/types.ts'
import type { ModelRole } from './catalog.ts'

export interface LocalServersOptions {
  /** Absolute path of the llama-server executable; throws when the runtime is not installed. */
  readonly binary: () => string
  /** Absolute path of a downloaded model file; throws when it is missing. */
  readonly modelPath: (id: string) => string
  readonly ctx: number
  /** 0 keeps servers running until the plugin unloads. */
  readonly idleStopMinutes: number
  readonly logDir: string
  readonly startTimeoutMs?: number
}

export interface ServerInfo {
  readonly role: ModelRole
  readonly model: string
  readonly pid: number | undefined
  readonly port: number
  readonly ready: boolean
  readonly startedAt: number
  readonly lastUsedAt: number
}

interface Running {
  readonly role: ModelRole
  readonly model: string
  readonly port: number
  readonly child: ChildProcess
  readonly startedAt: number
  readonly ready: Promise<string>
  settled: boolean
  lastUsedAt: number
}

export class LocalServers implements LocalModels {
  private readonly options: LocalServersOptions
  private readonly running = new Map<ModelRole, Running>()
  private readonly pending = new Map<ModelRole, { model: string; server: Promise<Running> }>()
  private readonly sweeper: NodeJS.Timeout | undefined
  private readonly onExit = () => this.stopAll()

  constructor(options: LocalServersOptions) {
    this.options = options
    if (options.idleStopMinutes > 0) {
      this.sweeper = setInterval(() => this.stopIdle(), Math.min(60000, options.idleStopMinutes * 30000))
      this.sweeper.unref()
    }
    process.once('exit', this.onExit)
  }

  async baseURL(role: ModelRole, model: string, signal: AbortSignal): Promise<string> {
    let server = this.running.get(role)
    if (server !== undefined && server.model !== model) {
      this.stop(role)
      server = undefined
    }
    if (server === undefined) {
      // Concurrent first requests share one launch.
      let launch = this.pending.get(role)
      if (launch === undefined || launch.model !== model) {
        const started = this.start(role, model)
        launch = { model, server: started }
        this.pending.set(role, launch)
        started.then((value) => this.running.set(role, value), () => {}).finally(() => {
          if (this.pending.get(role)?.server === started) this.pending.delete(role)
        })
      }
      server = await launch.server
      this.running.set(role, server)
    }
    server.lastUsedAt = Date.now()
    const url = await abortable(server.ready, signal)
    server.lastUsedAt = Date.now()
    return url
  }

  list(): ServerInfo[] {
    return [...this.running.values()].map((server) => ({
      role: server.role,
      model: server.model,
      pid: server.child.pid,
      port: server.port,
      ready: server.settled,
      startedAt: server.startedAt,
      lastUsedAt: server.lastUsedAt,
    }))
  }

  stop(role: ModelRole): boolean {
    const server = this.running.get(role)
    if (server === undefined) return false
    this.running.delete(role)
    if (server.child.exitCode === null && server.child.signalCode === null) server.child.kill()
    return true
  }

  stopAll(): void {
    for (const role of [...this.running.keys()]) this.stop(role)
  }

  dispose(): void {
    clearInterval(this.sweeper)
    process.off('exit', this.onExit)
    this.stopAll()
  }

  private stopIdle(): void {
    const limit = this.options.idleStopMinutes * 60000
    for (const server of [...this.running.values()]) {
      if (server.settled && Date.now() - server.lastUsedAt > limit) this.stop(server.role)
    }
  }

  private async start(role: ModelRole, model: string): Promise<Running> {
    const binary = this.options.binary()
    const modelPath = this.options.modelPath(model)
    const port = await freePort()
    const ctx = String(this.options.ctx)
    const args = [
      '--host', '127.0.0.1', '--port', String(port), '-m', modelPath, '--alias', model,
      '-c', ctx, '-b', ctx, '-ub', ctx,
      ...(role === 'embedding' ? ['--embedding', '--pooling', 'last'] : ['--rerank', '--pooling', 'rank']),
    ]
    mkdirSync(this.options.logDir, { recursive: true, mode: 0o700 })
    const logPath = join(this.options.logDir, `${role}.log`)
    const log = openSync(logPath, 'w', 0o600)
    let child: ChildProcess
    try {
      child = spawn(binary, args, {
        stdio: ['ignore', log, log],
        windowsHide: true,
        // Homebrew-era Metal BF16 kernels crash some macOS 15 setups; F16 is as fast for these models.
        env: { ...process.env, GGML_METAL_BF16_DISABLE: '1' },
      })
    } finally {
      closeSync(log)
    }
    const server: Running = {
      role, model, port, child, startedAt: Date.now(), lastUsedAt: Date.now(), settled: false,
      ready: waitHealthy(`http://127.0.0.1:${port}`, child, logPath, this.options.startTimeoutMs ?? 120000),
    }
    server.ready.then(
      () => { server.settled = true },
      () => {
        if (this.running.get(role) === server) this.running.delete(role)
        if (child.exitCode === null) child.kill()
      },
    )
    child.on('exit', () => {
      if (this.running.get(role) === server) this.running.delete(role)
    })
    return server
  }
}

async function waitHealthy(origin: string, child: ChildProcess, logPath: string, timeoutMs: number): Promise<string> {
  const deadline = Date.now() + timeoutMs
  let exited: string | undefined
  child.once('error', (error) => { exited = error.message })
  child.once('exit', (code, signal) => { exited = `exited with ${signal ?? `code ${code}`}` })
  while (Date.now() < deadline) {
    if (exited !== undefined) throw new Error(`llama-server ${exited}${logTail(logPath)}`)
    try {
      const response = await fetch(`${origin}/health`, { signal: AbortSignal.timeout(2000) })
      if (response.ok) return `${origin}/v1`
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`llama-server did not become ready within ${Math.round(timeoutMs / 1000)} s${logTail(logPath)}`)
}

function logTail(path: string): string {
  try {
    const lines = readFileSync(path, 'utf8').trim().split('\n').slice(-8)
    return lines.length > 0 && lines[0] !== '' ? `; last log lines:\n${lines.join('\n')}` : ''
  } catch {
    return ''
  }
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer()
    probe.once('error', reject)
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address() as { port: number }
      probe.close(() => resolve(port))
    })
  })
}

function abortable<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(signal.reason)
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(signal.reason)
    signal.addEventListener('abort', onAbort, { once: true })
    promise.then(
      (value) => { signal.removeEventListener('abort', onAbort); resolve(value) },
      (error) => { signal.removeEventListener('abort', onAbort); reject(error) },
    )
  })
}
