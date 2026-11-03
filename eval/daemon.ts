/**
 * Evaluation-only search daemon: keeps one KnowledgeBase and the local
 * llama-server processes resident, so every agent run gets warm searches.
 *
 *   node eval/daemon.ts <repo> [port]        index <repo> (incremental), then serve
 *
 * POST /search {"query": "...", "top_k": 6} → rendered passages (text/plain).
 */
import { createServer } from 'node:http'
import { join } from 'node:path'
import { createBackend } from '../src/backends/index.ts'
import type { Backend } from '../src/backends/types.ts'
import { Config, resolveModels } from '../src/config.ts'
import { KnowledgeBase, type SearchResult } from '../src/kb.ts'
import { LocalManager } from '../src/local/index.ts'

const root = process.argv[2]
const port = Number(process.argv[3] ?? 8790)
if (!root) throw new Error('usage: node eval/daemon.ts <repo> [port]')

const storageDir = process.env.EVAL_STORE ?? join(import.meta.dirname, '.store')
const config = new (Config as unknown as new (value: unknown) => Config)({
  storageDir,
  embedding: { source: 'local', model: process.env.EVAL_EMBEDDING ?? 'qwen3-embedding-0.6b' },
  rerank: { source: process.env.EVAL_RERANK ?? 'same' },
  local: { idleStopMinutes: 0 },
  search: { topK: 6, rerankCandidates: 15, maxSnippetChars: 900, refreshBeforeSearch: false },
})

const local = new LocalManager({ dir: storageDir, ctx: config.local.ctx, idleStopMinutes: 0, downloadSource: 'auto' })
for (const id of [local.runtime().installed ? undefined : resolveModels(config).embedding?.model].filter(Boolean) as string[]) {
  local.startDownload(id)
  while (local.progress().status === 'running') await new Promise((resolve) => setTimeout(resolve, 500))
  if (local.progress().status !== 'done') throw new Error(`runtime download: ${local.progress().error}`)
}

let backend: Backend | undefined
const kb = new KnowledgeBase({
  storageDir,
  backend: () => (backend ??= createBackend(resolveModels(config), { apiKey: () => async () => undefined, local: local.servers, queryInstruct: config.queryInstruct, timeoutMs: config.requestTimeoutMs })),
  index: config.index,
  search: config.search,
})

const started = Date.now()
const stats = await kb.index(kb.planIndex('workspace', undefined, root), {
  signal: new AbortController().signal,
  progress: (line) => console.error(`[index] ${line}`),
})
console.error(`[index] ${stats.scanned} scanned, ${stats.added + stats.updated} embedded, ${stats.unchanged} unchanged, ${stats.chunks} chunks in ${((Date.now() - started) / 1000).toFixed(0)} s`)
// Warm both servers before the first agent arrives.
await kb.search('warm up', { cwd: root, signal: new AbortController().signal })

createServer((request, response) => {
  let body = ''
  request.on('data', (chunk) => (body += chunk))
  request.on('end', async () => {
    try {
      const { query, top_k } = JSON.parse(body) as { query: string; top_k?: number }
      const t = Date.now()
      const result = await kb.search(String(query), { cwd: root, signal: AbortSignal.timeout(120000), ...(top_k ? { topK: top_k } : {}) })
      console.error(`[search] ${Date.now() - t} ms ${JSON.stringify(query)}`)
      response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end(render(result))
    } catch (error) {
      response.writeHead(500).end(error instanceof Error ? error.message : String(error))
    }
  })
}).listen(port, '127.0.0.1', () => console.error(`[daemon] listening on 127.0.0.1:${port}`))

function render(result: SearchResult): string {
  if (result.hits.length === 0) return 'No passages found.'
  return result.hits
    .map((hit, index) => `[${index + 1}] ${hit.path}:${hit.location}${hit.heading ? ` § ${hit.heading}` : ''}\n${hit.text}`)
    .join('\n\n')
}
