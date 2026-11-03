import assert from 'node:assert/strict'
import { test } from 'node:test'
import { docHits, installEnforcement, isDocSearch, type EnforceDeps } from '../src/enforce.ts'
import type { SearchHit } from '../src/kb.ts'

test('isDocSearch separates doc searches from code searches and reads', () => {
  assert.equal(isDocSearch('grep', { pattern: 'Seamless', path: 'docs' }), true)
  assert.equal(isDocSearch('grep', { pattern: 'x', include: '*.md' }), true)
  assert.equal(isDocSearch('grep', { pattern: '核心耗时' }), true)
  assert.equal(isDocSearch('grep', { pattern: 'roll_em', path: 'core/rogue-rules/src' }), false)
  assert.equal(isDocSearch('glob', { pattern: 'docs/**/*.md' }), true)
  assert.equal(isDocSearch('glob', { pattern: 'core/**/*.rs' }), false)
  assert.equal(isDocSearch('bash', { command: 'grep -rn "headless" --include=*.md . | head' }), true)
  assert.equal(isDocSearch('bash', { command: 'rg -n "存档" core' }), true)
  assert.equal(isDocSearch('bash', { command: 'grep -rn "fn chase" core/rogue-rules/src --include=*.rs' }), false)
  assert.equal(isDocSearch('bash', { command: "sed -n '1,40p' docs/m2-progress.md" }), false)
  assert.equal(isDocSearch('read', { file_path: 'docs/m2-progress.md' }), false)
})

test('docHits keeps prose files and named collections', () => {
  const hit = (collection: string, path: string) => ({ collection, path, location: '1-2', heading: '', score: 1, text: 't' }) as SearchHit
  assert.deepEqual(
    docHits([hit('workspace', 'src/a.ts'), hit('workspace', 'docs/a.md'), hit('manuals', 'guide.pdf')]).map((h) => h.path),
    ['docs/a.md', 'guide.pdf'],
  )
})

type Listener = (...args: any[]) => Promise<any>
function harness(mode: EnforceDeps['mode'], overrides: Partial<EnforceDeps> = {}) {
  const listeners = new Map<string, Listener>()
  const searches: string[] = []
  installEnforcement({ on: (event: string, listener: Listener) => listeners.set(event, listener) }, {
    mode,
    searchTool: 'knowledge_search',
    prefetchTopK: 2,
    indexed: async () => true,
    search: async (query) => {
      searches.push(query)
      return [
        { collection: 'workspace', path: 'src/x.rs', location: '1-3', heading: '', score: 1, text: 'code' },
        { collection: 'workspace', path: 'docs/save.md', location: '10-12', heading: 'Saves', score: 0.9, text: 'Seamless save 0.75 ms' },
      ]
    },
    ...overrides,
  })
  const agent = {}
  const user = (text: string) => ({ id: 'u', role: 'user', content: [{ type: 'text', text }], source: { kind: 'user' } })
  const preStep = (messages: unknown[]) =>
    listeners.get('agent/pre-step')!({ agent, messages, turn: 1, step: 1, signal: new AbortController().signal }, async () => ({ kind: 'enter', messages }))
  const preExec = (name: string, args: unknown) => listeners.get('tools/pre-execute')!({ name, arguments: args, agent }, async () => ({ kind: 'allow' }))
  const postExec = (name: string, args: unknown) => listeners.get('tools/post-execute')!({ name, arguments: args, agent }, {}, async () => ({ kind: 'accept' }))
  return { listeners, searches, user, preStep, preExec, postExec }
}

test('docs mode refuses the first doc grep of a turn, then steps aside', async () => {
  const h = harness('docs')
  await h.preStep([h.user('核心耗时实测里存档多大？')])
  assert.equal((await h.preExec('grep', { pattern: 'roll_em', path: 'core' })).kind, 'allow')
  const denied = await h.preExec('grep', { pattern: 'Seamless', path: 'docs' })
  assert.equal(denied.kind, 'deny')
  assert.match(denied.reason, /knowledge_search/)
  assert.equal((await h.preExec('grep', { pattern: 'Seamless', path: 'docs' })).kind, 'allow')
  // A new user message re-arms it; a knowledge_search call satisfies it.
  await h.preStep([h.user('另一个问题')])
  assert.equal((await h.preExec('knowledge_search', { query: 'q' })).kind, 'allow')
  assert.equal((await h.preExec('grep', { pattern: '存档', path: 'docs' })).kind, 'allow')
  assert.equal(h.listeners.has('tools/post-execute'), false)
})

test('docs mode stays out of the way without a semantic index', async () => {
  const h = harness('docs', { indexed: async () => false })
  await h.preStep([h.user('问题')])
  assert.equal((await h.preExec('grep', { pattern: '存档', path: 'docs' })).kind, 'allow')
})

test('prefetch mode attaches document hits to a new user message only', async () => {
  const h = harness('prefetch')
  const entered = await h.preStep([h.user('一次 Seamless 存档要多久？')])
  assert.equal(entered.messages.length, 2)
  const notice = entered.messages[1]
  assert.equal(notice.source.kind, 'semantic-search')
  assert.match(notice.content[0].text, /docs\/save\.md:10-12 § Saves/)
  assert.doesNotMatch(notice.content[0].text, /src\/x\.rs/)
  assert.deepEqual(h.searches, ['一次 Seamless 存档要多久？'])
  // Tool-result steps carry no user message: nothing is searched or attached.
  const later = await h.preStep([])
  assert.equal(later.messages.length, 0)
  assert.equal(h.searches.length, 1)
  // Prefetch counts as the turn's search, and prefetch mode never refuses grep.
  assert.equal((await h.preExec('grep', { pattern: '存档', path: 'docs' })).kind, 'allow')
})

test('remind mode adds one note after a doc grep', async () => {
  const h = harness('remind')
  await h.preStep([h.user('问题')])
  assert.equal((await h.preExec('grep', { pattern: '存档', path: 'docs' })).kind, 'allow')
  const first = await h.postExec('grep', { pattern: '存档', path: 'docs' })
  assert.equal(first.additionalContexts.length, 1)
  assert.match(first.additionalContexts[0].content[0].text, /knowledge_search/)
  const second = await h.postExec('grep', { pattern: '存档', path: 'docs' })
  assert.equal(second.additionalContexts, undefined)
})

test('off mode installs nothing', () => {
  const h = harness('off')
  assert.equal(h.listeners.size, 0)
})

test('instructions deliver the routing rule once per agent, before its first message', async () => {
  const h = harness('off', { instructions: true })
  const first = await h.preStep([h.user('问题一')])
  assert.equal(first.messages.length, 2)
  assert.equal(first.messages[0].source.form, 'instructions')
  assert.match(first.messages[0].content[0].text, /^<system-reminder>\nInstructions from: semantic-search plugin/)
  assert.match(first.messages[0].content[0].text, /call `knowledge_search` first/)
  assert.equal(first.messages[1].content[0].text, '问题一')
  const second = await h.preStep([h.user('问题二')])
  assert.equal(second.messages.length, 1)
  assert.equal(h.listeners.has('tools/pre-execute'), false)
})

test('instructions are skipped without a semantic index', async () => {
  const h = harness('off', { instructions: true, indexed: async () => false })
  const entered = await h.preStep([h.user('问题')])
  assert.equal(entered.messages.length, 1)
})
