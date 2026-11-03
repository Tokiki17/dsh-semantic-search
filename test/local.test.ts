import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, readFileSync, truncateSync, writeFileSync } from 'node:fs'
import { createServer, type Server } from 'node:http'
import { join } from 'node:path'
import { test } from 'node:test'
import { localModel } from '../src/local/catalog.ts'
import { download, rankBySpeed } from '../src/local/download.ts'
import { LocalManager } from '../src/local/index.ts'
import { LocalServers } from '../src/local/servers.ts'
import { tempDir } from './helpers.ts'

const signal = new AbortController().signal
const payload = Buffer.from(Array.from({ length: 300_000 }, (_, i) => (i * 31) % 251))
const digest = createHash('sha256').update(payload).digest('hex')

/** Serves `payload` at /ok (with Range), half of it then a dropped connection at /drop, bad bytes at /bad, 500 at /down. */
async function mirror(): Promise<{ url: string; hits: string[]; close(): Promise<void> }> {
  const hits: string[] = []
  let dropped = false
  const server: Server = createServer((req, res) => {
    hits.push(`${req.url} ${req.headers.range ?? ''}`.trim())
    if (req.url === '/down') {
      res.writeHead(500).end()
      return
    }
    const body = req.url === '/bad' ? Buffer.alloc(payload.length, 7) : payload
    const range = /bytes=(\d+)-(\d*)/.exec(req.headers.range ?? '')
    const start = range ? Number(range[1]) : 0
    const end = range && range[2] ? Number(range[2]) + 1 : body.length
    res.writeHead(range ? 206 : 200, { 'content-length': end - start })
    if (req.url === '/drop' && !dropped) {
      dropped = true
      res.write(body.subarray(start, start + 100_000))
      setTimeout(() => res.destroy(), 20)
      return
    }
    res.end(body.subarray(start, end))
  })
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address() as { port: number }
  return { url: `http://127.0.0.1:${port}`, hits, close: () => new Promise((resolve) => server.close(() => resolve())) }
}

test('downloads fall over between mirrors, resume with Range and verify sha256', async () => {
  const dir = tempDir()
  const server = await mirror()
  try {
    const dest = join(dir.path, 'm', 'model.gguf')
    const progress: number[] = []
    const used = await download({
      urls: [`${server.url}/down`, `${server.url}/drop`, `${server.url}/ok`],
      dest, size: payload.length, sha256: digest, signal, onProgress: (received) => progress.push(received),
    })
    assert.equal(used, `${server.url}/ok`)
    assert.deepEqual(readFileSync(dest), payload)
    assert.ok(server.hits.includes('/ok bytes=100000-'), `resumed after the dropped mirror: ${server.hits.join(', ')}`)
    assert.equal(progress.at(-1), payload.length)
    assert.equal(existsSync(`${dest}.part`), false)

    assert.equal(await download({ urls: [`${server.url}/down`], dest, size: payload.length, sha256: digest, signal }), undefined, 'complete files are kept')

    const bad = join(dir.path, 'bad.gguf')
    await assert.rejects(download({ urls: [`${server.url}/bad`], dest: bad, size: payload.length, sha256: digest, signal }), /sha256 does not match/)
    assert.equal(existsSync(`${bad}.part`), false, 'mismatched bytes are discarded, never resumed')
  } finally {
    await server.close()
    dir.cleanup()
  }
})

test('mirror ranking puts unreachable sources last', async () => {
  const server = await mirror()
  try {
    const ranked = await rankBySpeed([`${server.url}/down`, `${server.url}/ok`], { signal, bytes: 1024 })
    assert.deepEqual(ranked, [`${server.url}/ok`, `${server.url}/down`])
  } finally {
    await server.close()
  }
})

/** A stand-in llama-server: serves /health and /v1/embeddings on --port and records its arguments. */
function fakeLlamaServer(dir: string): string {
  const path = join(dir, 'llama-server')
  writeFileSync(path, `#!/usr/bin/env node
const http = require('node:http')
const args = process.argv.slice(2)
const port = Number(args[args.indexOf('--port') + 1])
require('node:fs').appendFileSync(${JSON.stringify(join(dir, 'args.log'))}, JSON.stringify({ args, bf16: process.env.GGML_METAL_BF16_DISABLE }) + '\\n')
http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' })
  res.end(req.url === '/health' ? '{"status":"ok"}' : JSON.stringify({ data: [{ index: 0, embedding: [1, 0] }] }))
}).listen(port, '127.0.0.1')
`)
  chmodSync(path, 0o755)
  return path
}

test('local servers start once per role on loopback, restart for another model and stop when idle', { skip: process.platform === 'win32' }, async () => {
  const dir = tempDir()
  const binary = fakeLlamaServer(dir.path)
  const servers = new LocalServers({
    binary: () => binary,
    modelPath: (id) => join(dir.path, `${id}.gguf`),
    ctx: 2048,
    idleStopMinutes: 0.03,
    logDir: join(dir.path, 'logs'),
  })
  try {
    const [a, b] = await Promise.all([
      servers.baseURL('embedding', 'qwen3-embedding-0.6b', signal),
      servers.baseURL('embedding', 'qwen3-embedding-0.6b', signal),
    ])
    assert.equal(a, b, 'concurrent first requests share one server')
    assert.match(a, /^http:\/\/127\.0\.0\.1:\d+\/v1$/)
    assert.equal(servers.list().length, 1)
    const logged = readFileSync(join(dir.path, 'args.log'), 'utf8').trim().split('\n').map((line) => JSON.parse(line))
    assert.equal(logged.length, 1)
    assert.deepEqual(logged[0].args.slice(logged[0].args.indexOf('-c'), logged[0].args.indexOf('-c') + 2), ['-c', '2048'])
    assert.ok(logged[0].args.includes('--embedding'))
    assert.equal(logged[0].bf16, '1')

    const rerank = await servers.baseURL('rerank', 'qwen3-reranker-0.6b', signal)
    assert.notEqual(rerank, a)
    assert.ok(readFileSync(join(dir.path, 'args.log'), 'utf8').includes('--rerank'))

    const pid = servers.list().find((server) => server.role === 'embedding')!.pid!
    const other = await servers.baseURL('embedding', 'qwen3-embedding-4b', signal)
    assert.notEqual(other, a)
    await waitFor(() => !alive(pid), 'the old embedding server is stopped when the model changes')

    await waitFor(() => servers.list().length === 0, 'idle servers stop after idleStopMinutes')
  } finally {
    servers.dispose()
    dir.cleanup()
  }
})

test('a server that exits during startup reports its log', { skip: process.platform === 'win32' }, async () => {
  const dir = tempDir()
  const binary = join(dir.path, 'llama-server')
  writeFileSync(binary, '#!/bin/sh\necho "error: failed to load model" >&2\nexit 3\n')
  chmodSync(binary, 0o755)
  const servers = new LocalServers({ binary: () => binary, modelPath: () => 'x.gguf', ctx: 2048, idleStopMinutes: 0, logDir: join(dir.path, 'logs') })
  try {
    await assert.rejects(servers.baseURL('embedding', 'm', signal), /exited with code 3[\s\S]*failed to load model/)
    assert.equal(servers.list().length, 0)
  } finally {
    servers.dispose()
    dir.cleanup()
  }
})

test('the manager reuses complete model files from the 0.1.x cache and reports what is missing', () => {
  const dir = tempDir()
  try {
    const legacy = join(dir.path, 'legacy')
    mkdirSync(legacy)
    const model = localModel('qwen3-reranker-0.6b')!
    writeFileSync(join(legacy, model.file), '')
    truncateSync(join(legacy, model.file), model.size) // sparse file of the pinned size
    writeFileSync(join(legacy, localModel('qwen3-embedding-0.6b')!.file), 'partial')
    const manager = new LocalManager({ dir: join(dir.path, 'store'), ctx: 2048, idleStopMinutes: 0, downloadSource: 'auto', githubMirror: undefined, legacyModelDirs: [legacy] })
    try {
      const states = Object.fromEntries(manager.models().map((state) => [state.id, state.downloaded]))
      assert.deepEqual(states, { 'qwen3-embedding-0.6b': false, 'qwen3-embedding-4b': false, 'qwen3-embedding-8b': false, 'qwen3-reranker-0.6b': true })
      assert.equal(manager.modelPath('qwen3-reranker-0.6b'), join(legacy, model.file))
      assert.equal(manager.runtime().installed, false)
      assert.ok(manager.hardware().totalMemoryMB > 0)
      assert.throws(() => manager.startDownload('nope'), /unknown local model/)
      assert.equal(manager.progress().status, 'idle')
    } finally {
      manager.dispose()
    }
  } finally {
    dir.cleanup()
  }
})

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

async function waitFor(check: () => boolean, message: string, timeoutMs = 5000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (!check()) {
    if (Date.now() > deadline) assert.fail(message)
    await new Promise((resolve) => setTimeout(resolve, 25))
  }
}
