import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createDashScopeBackend } from '../src/backends/dashscope.ts'
import { createOpenAICompatibleBackend } from '../src/backends/openai-compat.ts'
import { qwen3Query } from '../src/backends/types.ts'
import { resolveOpenAICompatible } from '../src/config.ts'
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
    const backend = createDashScopeBackend({
      baseURL: `${server.url}/`, apiKey: async () => 'sk-test', apiKeyEnv: 'DASHSCOPE_API_KEY',
      embeddingModel: 'qwen3.7-text-embedding', rerankModel: 'qwen3.7-text-rerank', dimensions: 8, batchSize: 10,
      queryInstruct: 'Find docs', rerankInstruct: undefined, timeoutMs: 5000,
    })
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
    const backend = createDashScopeBackend({
      baseURL: server.url, apiKey: async () => undefined, apiKeyEnv: 'DASHSCOPE_API_KEY', embeddingModel: 'm', rerankModel: undefined,
      dimensions: 8, batchSize: 10, queryInstruct: '', rerankInstruct: undefined, timeoutMs: 5000,
    })
    await assert.rejects(backend.embedder.embedQuery('q', signal), /DASHSCOPE_API_KEY/)
    assert.equal(server.requests.length, 0)
    assert.equal(backend.reranker, undefined)
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
    const backend = createOpenAICompatibleBackend({
      name: 'llama-server', embeddingBaseURL: `${server.url}/v1`, rerankBaseURL: `${server.url}/v1`, apiKey: async () => undefined,
      apiKeyEnv: undefined, embeddingModel: 'qwen3-embedding-0.6b', rerankModel: 'qwen3-reranker-0.6b', dimensions: 8,
      sendDimensions: false, batchSize: 16, queryFormat: 'qwen3', queryInstruct: 'Find docs', rerankInstruct: undefined, timeoutMs: 5000,
    })
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
    const backend = createOpenAICompatibleBackend({
      name: 'siliconflow', embeddingBaseURL: `${server.url}/v1`, rerankBaseURL: undefined, apiKey: async () => 'sk-secret-value',
      apiKeyEnv: 'SILICONFLOW_API_KEY', embeddingModel: 'm', rerankModel: undefined, dimensions: 8, sendDimensions: true,
      batchSize: 16, queryFormat: 'plain', queryInstruct: '', rerankInstruct: undefined, timeoutMs: 5000,
    })
    await assert.rejects(backend.embedder.embedDocuments(['a'], signal), (error: Error) => {
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

test('presets resolve and loopback detection is strict', () => {
  const local = resolveOpenAICompatible({ preset: 'local' })
  assert.equal(local.embeddingBaseURL, 'http://127.0.0.1:8081/v1')
  assert.equal(local.queryFormat, 'qwen3')
  const custom = resolveOpenAICompatible({ preset: 'siliconflow', embeddingModel: 'Qwen/Qwen3-Embedding-8B', dimensions: 2048 })
  assert.equal(custom.embeddingModel, 'Qwen/Qwen3-Embedding-8B')
  assert.equal(custom.dimensions, 2048)
  assert.equal(custom.apiKeyEnv, 'SILICONFLOW_API_KEY')
  assert.throws(() => resolveOpenAICompatible({ preset: 'custom' }), /requires embeddingBaseURL/)
  assert.equal(isLoopbackUrl('http://localhost:8081/v1'), true)
  assert.equal(isLoopbackUrl('http://[::1]:8081'), true)
  assert.equal(isLoopbackUrl('http://127.0.0.1.example.com'), false)
  assert.equal(isLoopbackUrl('https://api.siliconflow.cn/v1'), false)
})
