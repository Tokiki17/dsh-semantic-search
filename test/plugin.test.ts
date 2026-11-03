/**
 * Integration with the real DSH tool registry (`@deepseek-ai/dsh-tools`) on a
 * real Cordis context: schemas reach the registry, arguments are validated
 * by DSH, the pre-execute gate asks for approval, and the tools run end to
 * end against a fake OpenAI-compatible embedding server.
 */
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { after, before, test } from 'node:test'
import { Context } from '@deepseek-ai/cordis'
import ToolRuntime from '@deepseek-ai/dsh-tools'
import { fakeServer, hashVector, tempDir } from './helpers.ts'

// QWEN_RAG_ENTRY=lib/index.js runs the same checks against the built bundle.
const plugin = await import(process.env.QWEN_RAG_ENTRY ? new URL(`../${process.env.QWEN_RAG_ENTRY}`, import.meta.url).href : '../src/index.ts')
let server: Awaited<ReturnType<typeof fakeServer>>
const dir = tempDir()
const sections: Array<{ name: string; text: string }> = []

before(async () => {
  server = await fakeServer((request) => {
    if (request.url === '/v1/embeddings') {
      const input = request.body.input as string[]
      return [200, { data: input.map((text, index) => ({ index, embedding: Array.from(hashVector(text, 32)) })) }]
    }
    const documents = request.body.documents as string[]
    return [200, { results: documents.map((_, index) => ({ index, relevance_score: 1 / (index + 1) })) }]
  })
  const root = join(dir.path, 'proj')
  mkdirSync(join(root, '.git'), { recursive: true })
  mkdirSync(join(root, 'docs'))
  writeFileSync(join(root, 'docs', 'ops.md'), '# 运维\n\n## 重启服务\n\n使用 systemctl restart harness 重启服务。\n')
  writeFileSync(join(root, 'docs', 'api.md'), '# API\n\nThe gateway listens on port 9443.\n')
  process.chdir(root)
})

after(async () => {
  await server.close()
  dir.cleanup()
})

async function boot(config: Record<string, unknown>) {
  const ctx = new Context()
  ctx.provide('systemPrompt', {
    section(section: { name: string; text: string }) {
      sections.push(section)
      return () => {}
    },
    getSectionOrder: () => 0,
    tools: () => () => {},
  })
  const mount = ctx.plugin.bind(ctx) as unknown as (plugin: unknown, config?: unknown) => Promise<unknown>
  await mount(ToolRuntime)
  await mount(plugin, {
    backend: 'openai-compatible',
    openaiCompatible: {
      preset: 'custom',
      embeddingBaseURL: `${server.url}/v1`,
      rerankBaseURL: `${server.url}/v1`,
      embeddingModel: 'fake-embed',
      rerankModel: 'fake-rerank',
      dimensions: 32,
      queryFormat: 'qwen3',
    },
    storageDir: join(dir.path, 'store'),
    ...config,
  })
  const tools = (ctx as unknown as { tools: { schemas(): Array<{ name: string }>; execute(input: unknown): Promise<any> } }).tools
  let n = 0
  const call = (name: string, args: unknown) => tools.execute({ callId: `call-${++n}`, name, arguments: args, signal: new AbortController().signal })
  return { ctx, tools, call }
}

const text = (result: any): string => result.content.map((block: { text?: string }) => block.text ?? '').join('')

test('registers four tools and a prompt section; tools run end to end', async () => {
  const { tools, call } = await boot({ approval: 'never' })
  const names = tools.schemas().map((schema) => schema.name).sort()
  assert.deepEqual(names, ['knowledge_index', 'knowledge_remove', 'knowledge_search', 'knowledge_status'])
  assert.ok(sections.some((section) => section.name === 'tool:qwen-rag'))

  const empty = await call('knowledge_search', { query: '重启' })
  assert.equal(empty.isError, false)
  assert.match(text(empty), /not indexed yet/)

  const indexed = await call('knowledge_index', { target: 'workspace' })
  assert.equal(indexed.isError, false, text(indexed))
  assert.match(text(indexed), /2 added/)

  const found = await call('knowledge_search', { query: '怎么重启服务', top_k: 1 })
  assert.equal(found.isError, false, text(found))
  assert.match(text(found), /\[1\] docs\/ops\.md:\d+(-\d+)? · workspace · § 运维 > 重启服务/)
  assert.match(text(found), /reranked/)
  assert.ok(server.requests.some((request) => request.url === '/v1/rerank'))
  const queryCall = server.requests.filter((request) => request.url === '/v1/embeddings').at(-1)!
  assert.match(queryCall.body.input[0], /^Instruct: .+\nQuery:怎么重启服务$/)

  const status = await call('knowledge_status', {})
  assert.match(text(status), /workspace \(current workspace\): 2 files/)

  const invalid = await call('knowledge_search', { top_k: 2 })
  assert.equal(invalid.isError, true, 'DSH validates required arguments before execute')

  const removed = await call('knowledge_remove', { collection: 'workspace' })
  assert.match(text(removed), /Deleted collection "workspace"/)
})

test('knowledge_index asks for approval before running', async () => {
  const { call } = await boot({ approval: 'always' })
  const result = await call('knowledge_index', { target: 'workspace' })
  // No approval service is mounted, so DSH turns the ask into a denial carrying our reason.
  assert.equal(result.isError, true)
  assert.match(text(result), /knowledge_index will read and index "workspace"/)
  const search = await call('knowledge_search', { query: 'port' })
  assert.equal(search.isError, false, 'search is never gated')
})
