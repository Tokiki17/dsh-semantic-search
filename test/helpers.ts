import { createServer, type IncomingMessage, type Server } from 'node:http'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Backend, Embedder, Reranker } from '../src/backends/types.ts'
import { toUnitVector } from '../src/backends/types.ts'

export function tempDir(prefix = 'semantic-search-test-'): { path: string; cleanup(): void } {
  const path = mkdtempSync(join(tmpdir(), prefix))
  return { path, cleanup: () => rmSync(path, { recursive: true, force: true }) }
}

/** Hashed bag of character bigrams: texts sharing words land close together. */
export function hashVector(text: string, dims = 64): Float32Array {
  const raw = new Array<number>(dims).fill(0)
  const chars = Array.from(text.toLowerCase().replace(/\s+/g, ' '))
  for (let i = 0; i + 1 < chars.length; i++) {
    let h = 2166136261
    for (const c of chars[i]! + chars[i + 1]!) h = Math.imul(h ^ c.codePointAt(0)!, 16777619)
    raw[Math.abs(h) % dims]! += 1
  }
  raw[0]! += 1e-3
  return toUnitVector(raw, dims, 'hash')
}

export function fakeBackend(options: { id?: string; remote?: boolean; reranker?: Reranker | undefined } = {}): Backend & { calls: { documents: number; queries: number } } {
  const calls = { documents: 0, queries: 0 }
  const embedder: Embedder = {
    id: options.id ?? 'fake|hash|64',
    dims: 64,
    batchSize: 4,
    remote: options.remote ?? false,
    endpoint: 'fake',
    async embedDocuments(texts) {
      calls.documents += texts.length
      return texts.map((text) => hashVector(text))
    },
    async embedQuery(text) {
      calls.queries += 1
      return hashVector(text)
    },
  }
  return { embedder, reranker: options.reranker, calls }
}

export interface Recorded {
  method: string
  url: string
  headers: IncomingMessage['headers']
  body: any
}

/** Minimal JSON HTTP server; `handler` returns [status, body]. */
export async function fakeServer(handler: (request: Recorded) => [number, unknown] | Promise<[number, unknown]>): Promise<{ url: string; requests: Recorded[]; close(): Promise<void> }> {
  const requests: Recorded[] = []
  const server: Server = createServer(async (req, res) => {
    let raw = ''
    for await (const chunk of req) raw += chunk
    const recorded: Recorded = { method: req.method ?? '', url: req.url ?? '', headers: req.headers, body: raw ? JSON.parse(raw) : undefined }
    requests.push(recorded)
    const [status, body] = await handler(recorded)
    res.writeHead(status, { 'content-type': 'application/json' })
    res.end(typeof body === 'string' ? body : JSON.stringify(body))
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address() as { port: number }
  return {
    url: `http://127.0.0.1:${address.port}`,
    requests,
    close: () => new Promise((resolve) => server.close(() => resolve())),
  }
}
