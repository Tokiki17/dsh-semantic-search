import assert from 'node:assert/strict'
import { test } from 'node:test'
import z from '@deepseek-ai/schemastery'
import { createBackend } from '../src/backends/index.ts'
import { createDashScopeEmbedder, createDashScopeReranker } from '../src/backends/dashscope.ts'
import { createOpenAICompatibleEmbedder, createOpenAICompatibleReranker } from '../src/backends/openai-compat.ts'
import { qwen3Query } from '../src/backends/types.ts'
import { Config, resolveModels } from '../src/config.ts'
import { isLoopbackUrl } from '../src/http.ts'
import { fakeServer } from './helpers.ts'

const signal = new AbortController().signal
const vec = (n: number, seed: number) => Array.from({ length: n }, (_, i) => Math.sin(i + seed))

test('DashScope native requests carry text_type, instruct and dimension; responses are normalized', async () => {
  const server = await fakeServer((request) => {
    if (request.url.includes('/text-embedding/')) {
      const texts = request.body.input.texts as string[]
      // Return out of order to prove the index field is honoured.
      return [200, { output: { embeddings: texts.map((_, i) => ({ index: i, embedding: vec(8, i) })).reverse() }, usage: { total_tokens: 3 } }]
    }
    return [200, { output: { results: [{ index: 1, relevance_score: 0.2 }, { index: 0, relevance_score: 0.9 }] } }]
  })
  try {
    const access = { baseURL: `${server.url}/`, apiKey: async () => 'sk-test', apiKeyEnv: 'DASHSCOPE_API_KEY', timeoutMs: 5000 }
    const backend = {
      embedder: createDashScopeEmbedder({ ...access, model: 'qwen3.7-text-embedding', dimensions: 8, batchSize: 10, queryInstruct: 'Find docs' }),
      reranker: createDashScopeReranker({ ...access, model: 'qwen3.7-text-rerank', rerankInstruct: undefined }),
    }
    const docs = await backend.embedder.embedDocuments(['a', 'b'], signal)
    assert.equal(docs.length, 2)
    const expected = vec(8, 1)
    const norm = Math.hypot(...expected)
    assert.ok(Math.abs(docs[1]![0]! - expected[0]! / norm) < 1e-6)
    assert.ok(Math.abs(Math.hypot(...docs[0]!) - 1) < 1e-5)
    await backend.embedder.embedQuery('q', signal)
    const hits = await backend.reranker!.rerank('q', ['x', 'y'], 2, signal)
    assert.deepEqual(hits.map((hit) => hit.index), [0, 1])

    const [docRequest, queryRequest, rerankRequest] = server.requests
    assert.equal(docRequest!.url, '/api/v1/services/embeddings/text-embedding/text-embedding')
    assert.equal(docRequest!.headers.authorization, 'Bearer sk-test')
    assert.deepEqual(docRequest!.body.parameters, { dimension: 8, text_type: 'document', output_type: 'dense' })
    assert.deepEqual(queryRequest!.body.parameters, { dimension: 8, text_type: 'query', output_type: 'dense', instruct: 'Find docs' })
    assert.equal(rerankRequest!.url, '/api/v1/services/rerank/text-rerank/text-rerank')
    assert.deepEqual(rerankRequest!.body, { model: 'qwen3.7-text-rerank', input: { query: 'q', documents: ['x', 'y'] }, parameters: { top_n: 2, return_documents: false } })
    assert.equal(backend.embedder.remote, true)
  } finally {
    await server.close()
  }
})

test('DashScope without a key fails with guidance and never sends a request', async () => {
  const server = await fakeServer(() => [200, {}])
  try {
    const embedder = createDashScopeEmbedder({
      baseURL: server.url, apiKey: async () => undefined, apiKeyEnv: 'DASHSCOPE_API_KEY', timeoutMs: 5000,
      model: 'm', dimensions: 8, batchSize: 10, queryInstruct: '',
    })
    await assert.rejects(embedder.embedQuery('q', signal), /DASHSCOPE_API_KEY/)
    assert.equal(server.requests.length, 0)
  } finally {
    await server.close()
  }
})

test('OpenAI-compatible backend wraps Qwen3 queries, truncates dimensions and retries 503', async () => {
  let failures = 1
  const server = await fakeServer((request) => {
    if (request.url === '/v1/embeddings') {
      if (failures-- > 0) return [503, { error: 'loading model' }]
      const input = request.body.input as string[]
      return [200, { data: input.map((_, index) => ({ index, embedding: vec(16, index) })) }]
    }
    return [200, { results: [{ index: 0, relevance_score: 0.5 }] }]
  })
  try {
    const access = { name: 'llama-server', baseURL: `${server.url}/v1`, apiKey: async () => undefined, apiKeyEnv: undefined, timeoutMs: 5000 }
    const backend = {
      embedder: createOpenAICompatibleEmbedder({
        ...access, model: 'qwen3-embedding-0.6b', dimensions: 8, sendDimensions: false, batchSize: 16, queryFormat: 'qwen3', queryInstruct: 'Find docs',
      }),
      reranker: createOpenAICompatibleReranker({ ...access, model: 'qwen3-reranker-0.6b', rerankInstruct: undefined }),
    }
    const query = await backend.embedder.embedQuery('how to install', signal)
    assert.equal(query.length, 8)
    const embeddingCalls = server.requests.filter((request) => request.url === '/v1/embeddings')
    assert.equal(embeddingCalls.length, 2, 'first attempt 503, second succeeds')
    assert.deepEqual(embeddingCalls[1]!.body.input, [qwen3Query('Find docs', 'how to install')])
    assert.equal(embeddingCalls[1]!.body.dimensions, undefined)
    assert.equal(backend.embedder.remote, false)
    assert.equal(embeddingCalls[1]!.headers.authorization, undefined)

    await backend.reranker!.rerank('q', ['only'], 5, signal)
    const rerank = server.requests.at(-1)!
    assert.equal(rerank.url, '/v1/rerank')
    assert.equal(rerank.body.top_n, 1)
  } finally {
    await server.close()
  }
})

test('HTTP errors surface status and body without the key', async () => {
  const server = await fakeServer(() => [401, { message: 'Invalid API-key provided.' }])
  try {
    const embedder = createOpenAICompatibleEmbedder({
      name: 'siliconflow', baseURL: `${server.url}/v1`, apiKey: async () => 'sk-secret-value', apiKeyEnv: 'SILICONFLOW_API_KEY', timeoutMs: 5000,
      model: 'm', dimensions: 8, sendDimensions: true, batchSize: 16, queryFormat: 'plain', queryInstruct: '',
    })
    await assert.rejects(embedder.embedDocuments(['a'], signal), (error: Error) => {
      assert.match(error.message, /HTTP 401/)
      assert.match(error.message, /Invalid API-key/)
      assert.doesNotMatch(error.message, /sk-secret-value/)
      return true
    })
    assert.equal(server.requests[0]!.body.dimensions, 8)
  } finally {
    await server.close()
  }
})

const config = (value: unknown): Config => new (Config as unknown as z<Config>)(value as Config)

test('the default configuration has no models: keyword search only', () => {
  const models = resolveModels(config({}))
  assert.deepEqual(models, { embedding: undefined, rerank: undefined })
})

test('rerank is off by default, can follow the embedding source, or use its own source', () => {
  const plain = resolveModels(config({ embedding: { source: 'local' } }))
  assert.equal(plain.rerank, undefined)

  const local = resolveModels(config({ embedding: { source: 'local' }, rerank: { source: 'same' } }))
  assert.equal(local.embedding!.model, 'qwen3-embedding-0.6b')
  assert.equal(local.embedding!.queryFormat, 'qwen3')
  assert.equal(local.embedding!.baseURL, undefined, 'the local server manager supplies the URL')
  assert.deepEqual([local.rerank!.source, local.rerank!.model], ['local', 'qwen3-reranker-0.6b'])

  const mixed = resolveModels(config({ embedding: { source: 'local', model: 'qwen3-embedding-4b' }, rerank: { source: 'dashscope' } }))
  assert.equal(mixed.embedding!.model, 'qwen3-embedding-4b')
  assert.deepEqual([mixed.rerank!.protocol, mixed.rerank!.model, mixed.rerank!.apiKeyEnv], ['dashscope', 'qwen3.7-text-rerank', 'DASHSCOPE_API_KEY'])

  const silicon = resolveModels(config({ embedding: { source: 'siliconflow', dimensions: 2048 }, rerank: { source: 'off' } }))
  assert.deepEqual([silicon.embedding!.model, silicon.embedding!.dimensions, silicon.embedding!.sendDimensions], ['Qwen/Qwen3-Embedding-4B', 2048, true])
  assert.equal(silicon.rerank, undefined)
})

test('custom sources need a base URL and model; an implicit custom rerank without a model is off', () => {
  assert.throws(() => resolveModels(config({ embedding: { source: 'custom', model: 'm' } })), /providers\.custom\.baseURL/)
  assert.throws(() => resolveModels(config({ embedding: { source: 'custom' }, providers: { custom: { baseURL: 'https://x/v1' } } })), /embedding\.model/)
  const implicit = resolveModels(config({ embedding: { source: 'custom', model: 'm' }, providers: { custom: { baseURL: 'https://x/v1' } } }))
  assert.equal(implicit.rerank, undefined)
  assert.throws(() => resolveModels(config({ embedding: { source: 'none' }, rerank: { source: 'custom' }, providers: { custom: { baseURL: 'https://x/v1' } } })), /rerank\.model/)
  const split = resolveModels(config({
    embedding: { source: 'custom', model: 'e' }, rerank: { source: 'custom', model: 'r' },
    providers: { custom: { baseURL: 'https://x/v1', rerankBaseURL: 'https://y/v1', apiKeyEnv: 'MY_KEY' } },
  }))
  assert.deepEqual([split.embedding!.baseURL, split.rerank!.baseURL, split.rerank!.apiKeyEnv], ['https://x/v1', 'https://y/v1', 'MY_KEY'])
})

test('local roles resolve their URL through the local model manager on first use', async () => {
  const server = await fakeServer((request) => request.url === '/v1/embeddings'
    ? [200, { data: (request.body.input as string[]).map((_, index) => ({ index, embedding: vec(1024, index) })) }]
    : [200, { results: [{ index: 0, relevance_score: 1 }] }])
  const started: string[] = []
  try {
    const backend = createBackend(resolveModels(config({ embedding: { source: 'local' }, rerank: { source: 'same' } })), {
      apiKey: () => async () => undefined,
      local: { async baseURL(role, model) { started.push(`${role}:${model}`); return `${server.url}/v1/` } },
      queryInstruct: 'q', rerankInstruct: undefined, timeoutMs: 5000,
    })
    assert.equal(backend.embedder!.id, 'openai-compatible|qwen3-embedding-0.6b|1024|qwen3', 'same id as 0.1.x local indexes')
    assert.equal(backend.embedder!.remote, false)
    assert.deepEqual(started, [], 'nothing starts until a request is made')
    await backend.embedder!.embedQuery('x', signal)
    await backend.reranker!.rerank('x', ['a'], 1, signal)
    assert.deepEqual(started, ['embedding:qwen3-embedding-0.6b', 'rerank:qwen3-reranker-0.6b'])
  } finally {
    await server.close()
  }
})

test('loopback detection is strict', () => {
  assert.equal(isLoopbackUrl('http://localhost:8081/v1'), true)
  assert.equal(isLoopbackUrl('http://[::1]:8081'), true)
  assert.equal(isLoopbackUrl('http://127.0.0.1.example.com'), false)
  assert.equal(isLoopbackUrl('https://api.siliconflow.cn/v1'), false)
})
