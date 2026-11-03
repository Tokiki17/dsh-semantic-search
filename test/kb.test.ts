import assert from 'node:assert/strict'
import { mkdirSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import type { Backend, Reranker } from '../src/backends/types.ts'
import { DEFAULT_EXCLUDE_DIRS } from '../src/config.ts'
import { KnowledgeBase } from '../src/kb.ts'
import { fakeBackend, tempDir } from './helpers.ts'

const signal = new AbortController().signal

function makeKb(storageDir: string, backend: () => Backend, overrides: Partial<{ refreshBeforeSearch: boolean; rerank: boolean }> = {}) {
  return new KnowledgeBase({
    storageDir,
    backend,
    index: { chunkChars: 400, overlapChars: 50, maxFileBytes: 1 << 20, maxFiles: 1000, excludeDirs: DEFAULT_EXCLUDE_DIRS, extraExtensions: [] },
    search: { topK: 3, candidates: 20, rerankCandidates: 10, maxSnippetChars: 500, refreshBeforeSearch: overrides.refreshBeforeSearch ?? true, maxRefreshFiles: 5 },
    rerank: overrides.rerank ?? true,
  })
}

function project(root: string) {
  mkdirSync(join(root, '.git'), { recursive: true })
  mkdirSync(join(root, 'docs'), { recursive: true })
  mkdirSync(join(root, 'src'), { recursive: true })
  mkdirSync(join(root, 'node_modules', 'dep'), { recursive: true })
  mkdirSync(join(root, 'generated'), { recursive: true })
  writeFileSync(join(root, 'docs', 'deploy.md'), '# 部署\n\n## 配置向量检索\n\n在 config.yml 中设置 embedding 模型和 rerank 模型。\n')
  writeFileSync(join(root, 'docs', 'faq.md'), '# FAQ\n\nThe cache directory can be cleared safely.\n')
  writeFileSync(join(root, 'src', 'server.ts'), 'export function startServer(port: number) {\n  return listen(port)\n}\n')
  writeFileSync(join(root, 'node_modules', 'dep', 'index.js'), 'module.exports = 1\n')
  writeFileSync(join(root, 'generated', 'out.ts'), 'export const generated = true\n')
  writeFileSync(join(root, '.gitignore'), 'generated/\n')
  writeFileSync(join(root, '.env'), 'SECRET=should-never-be-indexed\n')
  writeFileSync(join(root, 'image.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0]))
}

test('workspace indexing is incremental and search cites workspace-relative paths', async () => {
  const dir = tempDir()
  const root = join(dir.path, 'proj')
  project(root)
  const backend = fakeBackend()
  const kb = makeKb(join(dir.path, 'store'), () => backend)
  try {
    const plan = kb.planIndex('workspace', undefined, join(root, 'src'))
    assert.equal(plan.ref.root, root, 'project root is the nearest .git ancestor')
    const first = await kb.index(plan, { signal })
    assert.equal(first.added, 3, 'deploy.md, faq.md, server.ts')
    assert.equal(first.removed, 0)

    const result = await kb.search('如何配置向量检索模型', { cwd: root, signal })
    assert.equal(result.hits[0]!.path, 'docs/deploy.md')
    assert.equal(result.hits[0]!.collection, 'workspace')
    assert.match(result.hits[0]!.heading, /配置向量检索/)
    assert.equal(result.ranking, 'fusion', 'no reranker configured')
    for (const hit of result.hits) assert.doesNotMatch(hit.text, /should-never-be-indexed|generated = true|module\.exports/)

    const second = await kb.index(kb.planIndex('workspace', undefined, root), { signal })
    assert.deepEqual([second.added, second.updated, second.unchanged], [0, 0, 3])

    // Modify one file, delete another; a search-time refresh picks both up.
    writeFileSync(join(root, 'docs', 'faq.md'), '# FAQ\n\nPurge the cache with dsh cache clear.\n')
    utimesSync(join(root, 'docs', 'faq.md'), new Date(), new Date(Date.now() + 5000))
    rmSync(join(root, 'src', 'server.ts'))
    const refreshed = await kb.search('purge cache', { cwd: root, signal })
    assert.ok(refreshed.notes.some((note) => /1 updated, 1 removed/.test(note)), refreshed.notes.join('\n'))
    assert.equal(refreshed.hits[0]!.path, 'docs/faq.md')
    assert.match(refreshed.hits[0]!.text, /dsh cache clear/)

    const [info] = kb.list(root)
    assert.equal(info!.name, 'workspace')
    assert.equal(info!.files, 2)
    assert.equal(info!.current, true)
    assert.equal(info!.stale, false)
  } finally {
    kb.close()
    dir.cleanup()
  }
})

test('named collections, reranking, staleness and removal', async () => {
  const dir = tempDir()
  const manuals = join(dir.path, 'manuals')
  mkdirSync(manuals)
  writeFileSync(join(manuals, 'router.md'), '# Router\n\nReset the router by holding the button for ten seconds.\n')
  writeFileSync(join(manuals, 'printer.txt'), 'Printer toner replacement guide.\nOpen the front cover first.\n')
  const reranker: Reranker = {
    id: 'reverse',
    async rerank(_query, documents, topN) {
      return documents.map((_, index) => ({ index, score: index })).reverse().slice(0, topN)
    },
  }
  let backend: Backend = fakeBackend({ reranker })
  const kb = makeKb(join(dir.path, 'store'), () => backend)
  try {
    assert.throws(() => kb.planIndex('Bad Name', [manuals], dir.path), /invalid collection name/)
    assert.throws(() => kb.planIndex('manuals', undefined, dir.path), /does not exist yet/)
    assert.throws(() => kb.planIndex('manuals', ['./nope'], dir.path), /path does not exist/)
    await kb.index(kb.planIndex('manuals', ['manuals'], dir.path), { signal, description: 'home device manuals' })

    const result = await kb.search('reset router', { cwd: dir.path, signal, collections: ['manuals'], topK: 2 })
    assert.equal(result.ranking, 'rerank')
    assert.equal(result.hits.length, 2)
    assert.ok(result.hits[0]!.path.endsWith('/manuals/printer.txt') || result.hits[0]!.path.endsWith('/manuals/router.md'))
    assert.ok(result.notes.length === 0, result.notes.join('\n'))

    // Without collections the missing workspace is reported but named collections still answer.
    const all = await kb.search('toner', { cwd: dir.path, signal })
    assert.ok(all.notes.some((note) => /not indexed yet/.test(note)))
    assert.deepEqual(all.searched, ['manuals'])

    backend = fakeBackend({ id: 'other|model|64' })
    const stale = await kb.search('toner', { cwd: dir.path, signal })
    assert.equal(stale.hits.length, 0)
    assert.ok(stale.notes.some((note) => /rebuild/.test(note)))
    assert.equal(kb.list(dir.path).find((info) => info.name === 'manuals')!.stale, true)

    const rebuilt = await kb.index(kb.planIndex('manuals', undefined, dir.path), { signal })
    assert.equal(rebuilt.added, 2, 'embedder change triggers a full rebuild')
    assert.equal((await kb.search('toner', { cwd: dir.path, signal })).hits.length > 0, true)

    const partial = await kb.remove('manuals', [join(manuals, 'printer.txt')], dir.path)
    assert.deepEqual(partial, { removedFiles: 1, deleted: false })
    const deleted = await kb.remove('manuals', undefined, dir.path)
    assert.equal(deleted.deleted, true)
    assert.equal(kb.list(dir.path).length, 0)
  } finally {
    kb.close()
    dir.cleanup()
  }
})

test('concurrent indexing of one collection is rejected', async () => {
  const dir = tempDir()
  const root = join(dir.path, 'proj')
  project(root)
  const kb = makeKb(join(dir.path, 'store'), () => fakeBackend())
  try {
    const plan = kb.planIndex('workspace', undefined, root)
    const first = kb.index(plan, { signal })
    await assert.rejects(kb.index(plan, { signal }), /already being indexed/)
    await first
  } finally {
    kb.close()
    dir.cleanup()
  }
})
