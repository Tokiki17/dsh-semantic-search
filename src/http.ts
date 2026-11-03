/**
 * Small JSON-over-HTTP helper shared by the embedding and rerank backends:
 * per-request timeout fused with the caller's signal, bounded retry on
 * transient failures, and error messages that never echo the API key.
 */

export class BackendError extends Error {
  readonly status: number | undefined
  readonly code: string
  constructor(message: string, code: string, status?: number) {
    super(message)
    this.name = 'BackendError'
    this.code = code
    this.status = status
  }
}

export interface PostJsonOptions {
  readonly url: string
  readonly body: unknown
  readonly apiKey?: string | undefined
  readonly signal: AbortSignal
  readonly timeoutMs: number
  /** Extra attempts after the first for 429 / 5xx / network failures. */
  readonly retries?: number
  readonly label: string
}

const RETRYABLE = new Set([408, 409, 425, 429, 500, 502, 503, 504])

export async function postJson(options: PostJsonOptions): Promise<unknown> {
  const retries = options.retries ?? 2
  let attempt = 0
  for (;;) {
    try {
      return await postOnce(options)
    } catch (error) {
      if (options.signal.aborted) throw options.signal.reason ?? error
      const retryable = error instanceof BackendError && (error.code === 'network' || (error.status !== undefined && RETRYABLE.has(error.status)))
      if (!retryable || attempt >= retries) throw error
      attempt += 1
      await delay(400 * 2 ** (attempt - 1), options.signal)
    }
  }
}

async function postOnce(options: PostJsonOptions): Promise<unknown> {
  const timeout = AbortSignal.timeout(options.timeoutMs)
  const signal = AbortSignal.any([options.signal, timeout])
  const headers: Record<string, string> = { 'content-type': 'application/json', accept: 'application/json' }
  if (options.apiKey) headers.authorization = `Bearer ${options.apiKey}`
  let response: Response
  try {
    response = await fetch(options.url, { method: 'POST', headers, body: JSON.stringify(options.body), signal, redirect: 'error' })
  } catch (error) {
    if (options.signal.aborted) throw options.signal.reason ?? error
    if (timeout.aborted) throw new BackendError(`${options.label}: request to ${redactUrl(options.url)} timed out after ${options.timeoutMs} ms`, 'timeout')
    throw new BackendError(`${options.label}: cannot reach ${redactUrl(options.url)} (${describeCause(error)})`, 'network')
  }
  const text = await response.text()
  if (!response.ok) {
    throw new BackendError(`${options.label}: HTTP ${response.status} from ${redactUrl(options.url)}: ${summarizeBody(text)}`, 'http', response.status)
  }
  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new BackendError(`${options.label}: ${redactUrl(options.url)} returned non-JSON: ${summarizeBody(text)}`, 'protocol', response.status)
  }
}

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    const onAbort = () => {
      clearTimeout(timer)
      reject(signal.reason)
    }
    signal.addEventListener('abort', onAbort, { once: true })
  })
}

function describeCause(error: unknown): string {
  const cause = (error as { cause?: { code?: string; message?: string } } | undefined)?.cause
  return cause?.code ?? cause?.message ?? (error instanceof Error ? error.message : String(error))
}

/** Drop credentials and query strings from a URL before it reaches a message. */
export function redactUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`
  } catch {
    return '<invalid url>'
  }
}

function summarizeBody(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length > 300 ? `${flat.slice(0, 300)}…` : flat || '<empty body>'
}

/** True when the URL points at this machine, so indexing sends nothing off-host. */
export function isLoopbackUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^\[|\]$/g, '')
    return host === 'localhost' || host.endsWith('.localhost') || host === '::1' || /^127(\.\d{1,3}){3}$/.test(host)
  } catch {
    return false
  }
}
