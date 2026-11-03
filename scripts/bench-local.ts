/**
 * Benchmark the local llama-server backend end to end with the real indexer
 * and search path. Usage:
 *   node scripts/bench-local.ts <folder> <storage-dir> [query ...]
 * Requires `scripts/local-models.sh start`.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { createOpenAICompatibleBackend } from '../src/backends/openai-compat.ts'
import { DEFAULT_EXCLUDE_DIRS, DEFAULT_QUERY_INSTRUCT, resolveOpenAICompatible } from '../src/config.ts'
import { KnowledgeBase } from '../src/kb.ts'

const [folder, storageDir, ...queries] = process.argv.slice(2)
if (!folder || !storageDir) {
  console.error('usage: node scripts/bench-local.ts <folder> <storage-dir> [query ...]')
  process.exit(2)
}

const preset = resolveOpenAICompatible({ preset: 'local' })
const backend = createOpenAICompatibleBackend({
  name: 'llama-server',
  ...preset,
  apiKey: async () => undefined,
  queryInstruct: DEFAULT_QUERY_INSTRUCT,
  rerankInstruct: undefined,
  timeoutMs: 120000,
})
const kb = new KnowledgeBase({
  storageDir,
  backend: () => backend,
  index: { chunkChars: 1200, overlapChars: 150, maxFileBytes: 20 << 20, maxFiles: 20000, excludeDirs: DEFAULT_EXCLUDE_DIRS, extraExtensions: [] },
  search: { topK: 5, candidates: 50, rerankCandidates: 30, maxSnippetChars: 160, refreshBeforeSearch: false, maxRefreshFiles: 50 },
  rerank: true,
})

const rss = (): string => {
  const out: string[] = []
  for (const name of ['embedding', 'rerank']) {
    try {
      const pid = readFileSync(join(homedir(), '.cache/dsh-qwen-rag/run', `${name}.pid`), 'utf8').trim()
      const kb = Number(execFileSync('ps', ['-o', 'rss=', '-p', pid], { encoding: 'utf8' }).trim())
      out.push(`${name} ${(kb / 1024).toFixed(0)} MB`)
    } catch {
      out.push(`${name} ?`)
    }
  }
  return out.join(', ')
}

const signal = new AbortController().signal
console.log(`before: ${rss()}`)
let peak = ''
const timer = setInterval(() => {
  peak = rss()
}, 2000)
const stats = await kb.index(kb.planIndex('bench', [folder], process.cwd()), {
  signal,
  progress: (line) => process.stderr.write(`\r${line}        `),
})
clearInterval(timer)
process.stderr.write('\n')
const chars = stats.chunks
console.log(`indexed ${stats.added} files, ${chars} chunks in ${(stats.ms / 1000).toFixed(1)} s (${(stats.chunks / (stats.ms / 1000)).toFixed(1)} chunks/s); skipped ${stats.skipped}; errors ${stats.errors.length}`)
console.log(`during indexing: ${peak}`)

for (const query of queries) {
  const started = performance.now()
  const result = await kb.search(query, { cwd: process.cwd(), signal, collections: ['bench'] })
  const ms = performance.now() - started
  console.log(`\nQ: ${query}  (${ms.toFixed(0)} ms, ${result.ranking})`)
  for (const hit of result.hits) console.log(`  ${hit.score.toFixed(3)}  ${hit.path}:${hit.location}  ${hit.heading.slice(0, 60)}`)
  for (const note of result.notes) console.log(`  note: ${note}`)
}
console.log(`\nafter: ${rss()}`)
kb.close()
