/**
 * Integration with the real DSH tool registry (`@deepseek-ai/dsh-tools`) on a
 * real Cordis context: schemas reach the registry, arguments are validated
 * by DSH, the pre-execute gate asks for approval, and the tools run end to
 * end against a fake OpenAI-compatible embedding server.
 */
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { after, before, test } from 'node:test'
import { Context } from '@deepseek-ai/cordis'
import ToolRuntime from '@deepseek-ai/dsh-tools'
import { fakeServer, hashVector, tempDir } from './helpers.ts'

// PLUGIN_ENTRY=lib/index.js runs the same checks against the built bundle.
const plugin = await import(process.env.PLUGIN_ENTRY ? new URL(`../${process.env.PLUGIN_ENTRY}`, import.meta.url).href : '../src/index.ts')
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
    embedding: { source: 'custom', model: 'fake-embed', dimensions: 32 },
    rerank: { source: 'same', model: 'fake-rerank' },
    providers: { custom: { baseURL: `${server.url}/v1`, queryFormat: 'qwen3' } },
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
  assert.ok(sections.some((section) => section.name === 'tool:semantic-search'))

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

test('knowledge_index runs as a background job when the job service serves the agent', async () => {
  const { ctx, tools } = await boot({ approval: 'never' })
  const started: Array<{ kind: string; owner: unknown; progress: string[]; done: Promise<{ status: string; result?: string }> }> = []
  ctx.provide('jobs', {
    start(spec: { kind: string; owner: unknown; run(job: { updateProgress(line: string): void }): { done: Promise<{ status: string; result?: string }> } }) {
      const progress: string[] = []
      const { done } = spec.run({ updateProgress: (line) => progress.push(line) })
      started.push({ kind: spec.kind, owner: spec.owner, progress, done })
      return `job-${started.length}`
    },
  })
  const result = await tools.execute({
    callId: 'call-bg',
    name: 'knowledge_index',
    arguments: { target: 'workspace' },
    signal: new AbortController().signal,
    agent: { id: 'agent-1' },
  })
  assert.equal(result.isError, false, text(result))
  assert.match(text(result), /started in the background as job job-1/)
  assert.equal(started.length, 1)
  assert.equal(started[0]!.kind, 'knowledge-index')
  assert.equal(started[0]!.owner, 'agent-1')
  const outcome = await started[0]!.done
  assert.equal(outcome.status, 'completed')
  assert.match(outcome.result ?? '', /2 added/)
  assert.ok(started[0]!.progress.length > 0, 'progress lines reach the job')
})

test('with the default configuration the tools work by keyword and point to the setup page', async () => {
  const { call } = await boot({ embedding: undefined, rerank: undefined, providers: undefined, storageDir: join(dir.path, 'store-keyword'), approval: 'never' })
  const indexed = await call('knowledge_index', { target: 'workspace' })
  assert.equal(indexed.isError, false, text(indexed))
  assert.match(text(indexed), /stored for keyword search/)
  assert.match(text(indexed), /Plugins → Semantic Search → Configure/)
  const found = await call('knowledge_search', { query: 'gateway port' })
  assert.match(text(found), /docs\/api\.md:\d+.*keyword match order|keyword match order[\s\S]*docs\/api\.md/)
  const status = await call('knowledge_status', {})
  assert.match(text(status), /keyword search only/)
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

test('a 0.1.x qwen-rag store is moved to semantic-search on first start', () => {
  const home = join(dir.path, 'home')
  mkdirSync(join(home, 'qwen-rag', 'workspaces'), { recursive: true })
  writeFileSync(join(home, 'qwen-rag', 'workspaces', 'a.db'), '')
  assert.equal(plugin.defaultStorageDir(home), join(home, 'semantic-search'))
  assert.ok(existsSync(join(home, 'semantic-search', 'workspaces', 'a.db')))
  assert.equal(existsSync(join(home, 'qwen-rag')), false)
  assert.equal(plugin.defaultStorageDir(home), join(home, 'semantic-search'), 'idempotent')
})

test('the setup service matches its typert manifest and saves drafts, keys and tests', async () => {
  const { TYPERT } = await import(process.env.PLUGIN_ENTRY ? new URL('../lib/typert.js', import.meta.url).href : '../src/typert.ts')
  const stored = new Map<string, string>()
  const edits: Array<Record<string, unknown>> = []
  const { ctx } = await boot({ approval: 'never' })
  ctx.provide('credentials', {
    async resolve(ref: string) { return stored.has(ref) ? { value: stored.get(ref)! } : undefined },
    async describe(ref: string) { return { configured: stored.has(ref), source: stored.has(ref) ? 'store' : undefined, writable: true } },
    async set(ref: string, value: string) { stored.set(ref, value) },
    async unset(ref: string) { stored.delete(ref) },
  })
  const entry = { options: { id: 'semantic-search', name: '@tokiki/dsh-semantic-search', config: { embedding: { source: 'none' }, approval: 'never' } } }
  ctx.provide('configEditor', {
    entries: () => [entry],
    async edit(target: typeof entry, change: (current: Record<string, unknown>) => Record<string, unknown>) {
      assert.equal(target, entry)
      edits.push(change(structuredClone(entry.options.config) as Record<string, unknown>))
    },
  })
  const service = (ctx as unknown as { get(name: string): any }).get('semanticSearch')
  assert.ok(service, 'semanticSearch is provided')
  assert.deepEqual(Object.getOwnPropertyDescriptor(service, 'typertRemote')!.value.serviceKey, 'semanticSearch')
  for (const invocation of TYPERT.invocations) assert.equal(typeof service[invocation.method], 'function', invocation.method)
  const codec = (method: string) => TYPERT.invocations.find((invocation: { method: string }) => invocation.method === method)!

  const state = await service.getState()
  codec('getState').result.create().parse(state)
  assert.equal(state.canSave, true)
  assert.deepEqual(state.keys.map((key: { name: string }) => key.name).sort(), ['DASHSCOPE_API_KEY', 'SILICONFLOW_API_KEY'])

  const draft = {
    embedding: { source: 'custom', model: 'fake-embed', dimensions: 32 },
    rerank: { source: 'custom', model: 'fake-rerank' },
    providers: { custom: { baseURL: `${server.url}/v1`, queryFormat: 'qwen3' } },
  }
  codec('testModel').parameters[0].codec.create().parse({ role: 'embedding', draft })
  const embedding = await service.testModel({ role: 'embedding', draft })
  assert.equal(embedding.ok, true, embedding.detail)
  assert.match(embedding.detail, /32 dimensions/)
  const rerank = await service.testModel({ role: 'rerank', draft })
  assert.equal(typeof rerank.ok, 'boolean')
  const broken = await service.testModel({ role: 'embedding', draft: { ...draft, providers: {} , embedding: { source: 'custom', dimensions: 32 } } })
  assert.equal(broken.ok, false)

  await service.saveConfig({ draft: { ...draft, embedding: { ...draft.embedding, model: 'fake-embed' }, local: { githubMirror: '' } } })
  assert.equal(edits.length, 1)
  assert.deepEqual(edits[0]!.embedding, draft.embedding)
  assert.equal(edits[0]!.approval, 'never', 'fields outside the draft are kept')
  assert.deepEqual(edits[0]!.local, {}, 'empty strings are dropped so defaults apply')
  await assert.rejects(service.saveConfig({ draft: { embedding: { source: 'custom', dimensions: 32 }, rerank: { source: 'same' } } }), /baseURL|embedding\.model/)
  assert.equal(edits.length, 1, 'invalid drafts are never written')

  const key = await service.setKey({ name: 'DASHSCOPE_API_KEY', value: ' sk-test ' })
  assert.deepEqual([key.configured, stored.get('DASHSCOPE_API_KEY')], [true, 'sk-test'])
  assert.equal(JSON.stringify(await service.getState()).includes('sk-test'), false, 'state never carries key values')
  stored.set('DEEPSEEK_API_KEY', 'sk-main')
  await assert.rejects(service.setKey({ name: 'DEEPSEEK_API_KEY', value: 'x' }), /already holds a credential/)
  assert.equal(stored.get('DEEPSEEK_API_KEY'), 'sk-main', 'another plugin\'s key is never overwritten')
  assert.equal((await service.setKey({ name: 'MY_SERVICE_KEY', value: 'k' })).configured, true, 'a new custom key name can be created')
  await assert.rejects(service.clearKey({ name: 'DEEPSEEK_API_KEY' }), /not a key used by semantic search/)
  assert.equal((await service.clearKey({ name: 'DASHSCOPE_API_KEY' })).configured, false)

  assert.equal(service.rebuildStale().status, 'done', 'nothing stale')
})
