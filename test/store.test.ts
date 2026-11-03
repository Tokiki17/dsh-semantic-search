import assert from 'node:assert/strict'
import { statSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { Store, toMatchExpression, toSearchText } from '../src/store.ts'
import { denseTopK, reciprocalRankFusion } from '../src/retrieve.ts'
import { hashVector, tempDir } from './helpers.ts'

const chunk = (text: string, ord = 0) => ({ ord, text, startLine: 1, endLine: 1, heading: '', page: undefined })

test('CJK text becomes overlapping bigrams; other text passes through', () => {
  assert.equal(toSearchText('向量检索 knowledge_search').trim().replace(/\s+/g, ' '), '向量 量检 检索 knowledge_search')
  assert.equal(toMatchExpression('如何 配置 a "x"'), '"如何" OR "配置"')
  assert.equal(toMatchExpression('书'), '"书"*')
  assert.equal(toMatchExpression('!!'), undefined)
})

test('store replaces, searches and prunes chunks', () => {
  const store = Store.open(':memory:')
  try {
    store.replaceFile('/r/a.md', 1, 10, 'h1', [
      { chunk: chunk('向量检索使用 Qwen3 嵌入模型'), vector: hashVector('向量检索使用 Qwen3 嵌入模型') },
      { chunk: chunk('rerank improves precision', 1), vector: hashVector('rerank improves precision') },
    ])
    store.replaceFile('/r/b.md', 1, 10, 'h2', [{ chunk: chunk('部署说明与配置文件'), vector: hashVector('部署说明与配置文件') }])
    assert.deepEqual(store.counts(), { files: 2, chunks: 3 })

    const hits = store.keyword(toMatchExpression('检索')!, 10)
    assert.equal(hits.length, 1)
    assert.equal(store.chunks([hits[0]!.id]).get(hits[0]!.id)!.path, '/r/a.md')
    assert.equal(store.keyword(toMatchExpression('配置')!, 10).length, 1)
    assert.equal(store.keyword(toMatchExpression('RERANK')!, 10).length, 1)

    const matrix = store.vectors(64)
    assert.equal(matrix.ids.length, 3)
    const top = denseTopK(matrix, hashVector('部署配置'), 1)
    assert.equal(store.chunks([top[0]!.id]).get(top[0]!.id)!.path, '/r/b.md')

    // Replacing a file drops its old chunks and FTS rows.
    store.replaceFile('/r/a.md', 2, 11, 'h3', [{ chunk: chunk('completely new text'), vector: hashVector('completely new text') }])
    assert.equal(store.keyword(toMatchExpression('检索')!, 10).length, 0)
    assert.equal(store.vectors(64).ids.length, 2)

    assert.equal(store.removeFiles(['/r/b.md', '/r/missing.md']), 1)
    assert.deepEqual(store.counts(), { files: 1, chunks: 1 })
    store.setMeta({ embedder: 'x' })
    assert.equal(store.getMeta('embedder'), 'x')
  } finally {
    store.close()
  }
})

test('dense top-k and reciprocal rank fusion order results', () => {
  const vectors = [hashVector('alpha beta'), hashVector('gamma delta'), hashVector('alpha gamma')]
  const data = new Float32Array(64 * 3)
  vectors.forEach((vector, i) => data.set(vector, i * 64))
  const top = denseTopK({ ids: Int32Array.from([10, 20, 30]), data, dims: 64 }, hashVector('alpha beta'), 2)
  assert.equal(top[0]!.id, 10)
  assert.equal(top.length, 2)

  const fused = reciprocalRankFusion([[1, 2, 3], [3, 1]])
  assert.deepEqual(fused.map((hit) => hit.id), [1, 3, 2])
})

test('database files are readable by the owner only', () => {
  const dir = tempDir()
  try {
    const path = join(dir.path, 'nested', 'c.db')
    const store = Store.open(path)
    store.replaceFile('/r/a.md', 1, 10, 'h1', [{ chunk: chunk('secret notes'), vector: hashVector('secret notes') }])
    for (const file of [path, `${path}-wal`]) assert.equal(statSync(file).mode & 0o777, 0o600, file)
    assert.equal(statSync(join(dir.path, 'nested')).mode & 0o777, 0o700)
    store.close()
  } finally {
    dir.cleanup()
  }
})

test('processes opening a new store at the same moment wait for each other instead of failing', async () => {
  const { spawn } = await import('node:child_process')
  const dir = tempDir()
  const path = join(dir.path, 'shared.db')
  const script = `import { Store } from ${JSON.stringify(new URL('../src/store.ts', import.meta.url).href)}; Store.open(process.argv[1]).close()`
  const exits = await Promise.all(
    Array.from({ length: 12 }, () => new Promise<number | null>((resolve) => {
      const child = spawn(process.execPath, ['--input-type=module', '-e', script, path], { stdio: 'ignore' })
      child.on('close', resolve)
    })),
  )
  dir.cleanup()
  assert.deepEqual(exits, Array(12).fill(0))
})
