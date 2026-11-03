/**
 * Resumable, verified downloads: probe mirrors and try the fastest first,
 * append to `<dest>.part` with HTTP Range, fall over to the next mirror on
 * errors or stalls, and only rename into place after the size and sha256
 * match the pinned values.
 */
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { mkdir, open, rename, rm, stat } from 'node:fs/promises'
import { dirname } from 'node:path'
import { redactUrl } from '../http.ts'

export interface DownloadSpec {
  /** Candidate URLs in preference order; all must serve identical bytes. */
  readonly urls: readonly string[]
  readonly dest: string
  readonly size: number
  readonly sha256: string
  readonly signal: AbortSignal
  readonly onProgress?: (received: number, url: string) => void
  /** Abort a mirror that sends nothing for this long. */
  readonly stallMs?: number
  readonly fetch?: typeof fetch
}

/** Download `spec.dest` unless it is already complete; returns the URL that served the last bytes. */
export async function download(spec: DownloadSpec): Promise<string | undefined> {
  if ((await sizeOf(spec.dest)) === spec.size) return undefined
  await mkdir(dirname(spec.dest), { recursive: true, mode: 0o700 })
  const part = `${spec.dest}.part`
  const failures: string[] = []
  for (const url of spec.urls) {
    try {
      await fetchInto(url, part, spec)
    } catch (error) {
      if (spec.signal.aborted) throw spec.signal.reason ?? error
      failures.push(`${redactUrl(url)}: ${error instanceof Error ? error.message : String(error)}`)
      continue
    }
    if ((await sizeOf(part)) === spec.size && (await sha256File(part)) === spec.sha256) {
      await rename(part, spec.dest)
      return url
    }
    // Corrupt or mismatched bytes: never resume from them.
    await rm(part, { force: true })
    failures.push(`${redactUrl(url)}: size or sha256 does not match the pinned file`)
  }
  throw new Error(`download failed for ${spec.dest.split(/[\\/]/).pop()}:\n${failures.join('\n')}`)
}

async function fetchInto(url: string, part: string, spec: DownloadSpec): Promise<void> {
  const doFetch = spec.fetch ?? fetch
  let offset = (await sizeOf(part)) ?? 0
  if (offset > spec.size) {
    await rm(part, { force: true })
    offset = 0
  }
  if (offset === spec.size) return
  const stall = new AbortController()
  const signal = AbortSignal.any([spec.signal, stall.signal])
  let timer: NodeJS.Timeout | undefined
  const arm = () => {
    clearTimeout(timer)
    timer = setTimeout(() => stall.abort(new Error(`no data for ${Math.round((spec.stallMs ?? 30000) / 1000)} s`)), spec.stallMs ?? 30000)
  }
  arm()
  try {
    const response = await doFetch(url, { headers: offset > 0 ? { range: `bytes=${offset}-` } : {}, redirect: 'follow', signal })
    if (offset > 0 && response.status === 200) offset = 0 // Range ignored: start over.
    else if (response.status !== 200 && response.status !== 206) throw new Error(`HTTP ${response.status}`)
    if (response.body === null) throw new Error('empty response body')
    const file = await open(part, offset > 0 ? 'a' : 'w', 0o600)
    let received = offset
    let reported = 0
    try {
      for await (const chunk of response.body as unknown as AsyncIterable<Uint8Array>) {
        arm()
        await file.write(chunk)
        received += chunk.byteLength
        if (received > spec.size) throw new Error('server sent more bytes than expected')
        if (received - reported >= 1 << 20 || received === spec.size) {
          reported = received
          spec.onProgress?.(received, url)
        }
      }
    } finally {
      await file.close()
    }
    if (received !== spec.size) throw new Error(`connection closed at ${received} of ${spec.size} bytes`)
  } catch (error) {
    throw stall.signal.aborted && !spec.signal.aborted ? stall.signal.reason : error
  } finally {
    clearTimeout(timer)
  }
}

/** Order URLs by the throughput of a small ranged request; unreachable ones go last. */
export async function rankBySpeed(urls: readonly string[], options: { signal: AbortSignal; bytes?: number; timeoutMs?: number; fetch?: typeof fetch }): Promise<string[]> {
  if (urls.length < 2) return [...urls]
  const bytes = options.bytes ?? 512 * 1024
  const doFetch = options.fetch ?? fetch
  const timed = await Promise.all(urls.map(async (url, order) => {
    const signal = AbortSignal.any([options.signal, AbortSignal.timeout(options.timeoutMs ?? 8000)])
    const started = performance.now()
    try {
      const response = await doFetch(url, { headers: { range: `bytes=0-${bytes - 1}` }, redirect: 'follow', signal })
      if (response.status !== 206 && response.status !== 200) return { url, order, speed: -1 }
      let received = 0
      for await (const chunk of response.body as unknown as AsyncIterable<Uint8Array>) {
        received += chunk.byteLength
        if (received >= bytes) break
      }
      return { url, order, speed: received / Math.max(1, performance.now() - started) }
    } catch {
      return { url, order, speed: -1 }
    }
  }))
  if (options.signal.aborted) throw options.signal.reason
  return timed.sort((a, b) => b.speed - a.speed || a.order - b.order).map((item) => item.url)
}

export async function sha256File(path: string): Promise<string> {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(path)) hash.update(chunk as Buffer)
  return hash.digest('hex')
}

export async function sizeOf(path: string): Promise<number | undefined> {
  try {
    return (await stat(path)).size
  } catch {
    return undefined
  }
}
