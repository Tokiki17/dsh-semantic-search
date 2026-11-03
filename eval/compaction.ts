/**
 * Read the bundled long-task runs (run.ts --bundles) together with their DSH
 * session logs, and report what happened around compaction:
 *
 *   DSH_HOME=<home> EVAL_QUESTIONS=<file> node eval/compaction.ts <out-dir> "<bundles>"
 *
 * Per run: compactions, routing-rule deliveries (plugin instructions or the
 * AGENTS.md block that carries "Search routing"), knowledge_search calls and doc
 * searches before and after the first compaction, tool calls, wall time, tokens,
 * and keypoint accuracy per sub-question (keypoints matched against the whole answer).
 */
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { isDocSearch } from '../src/enforce.ts'

const [outDir, bundleSpec] = process.argv.slice(2)
const home = process.env.DSH_HOME
if (!outDir || !bundleSpec || !home) throw new Error('usage: DSH_HOME=<home> node eval/compaction.ts <out-dir> "<bundles>"')
const { questions } = JSON.parse(readFileSync(process.env.EVAL_QUESTIONS ?? join(import.meta.dirname, 'questions.json'), 'utf8')) as {
  questions: Array<{ id: string; keypoints: string[][] }>
}
const byId = new Map(questions.map((q) => [q.id, q]))
const bundles = bundleSpec.split(';').map((group) => group.split(','))

const sessionDirs = readdirSync(join(home, 'sessions')).map((dir) => join(home, 'sessions', dir))
const sessionLog = (id: string) => {
  for (const dir of sessionDirs) {
    const file = join(dir, id, 'session.v4.jsonl.zstd')
    if (existsSync(file)) return execFileSync('zstd', ['-dc', file], { encoding: 'utf8', maxBuffer: 1 << 30 }) // multi-frame: node:zlib reads only the first
  }
  return undefined
}

interface Row {
  run: string
  config: string
  compactions: number
  rules: number
  rulesAfter: number
  searchBefore: number
  searchAfter: number
  docBefore: number
  docAfter: number
  tools: number
  ms: number
  tokens: number
  score: number
}
const rows: Row[] = []
for (const name of readdirSync(outDir).filter((file) => /^L\d+-.+\.jsonl$/.test(file)).sort()) {
  const [bundle, config] = name.replace(/\.jsonl$/, '').split('-')
  const events = readFileSync(join(outDir, name), 'utf8').split('\n').filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)] } catch { return [] }
  })
  const sessionId = events.find((e) => e.type === 'session')?.sessionId as string | undefined
  const answer = String(events.find((e) => e.type === 'final')?.text ?? '').toLowerCase()
  const ms = Number(events.find((e) => e.type === 'eval.timing')?.ms ?? 0)
  const tokens = events.filter((e) => e.type === 'status' && e.usage).reduce((sum, e) => sum + (e.usage.totalTokens ?? 0), 0)
  const ids = bundles[Number(bundle!.slice(1)) - 1]!
  const score = ids.reduce((sum, id) => {
    const q = byId.get(id)!
    return sum + q.keypoints.filter((group) => group.some((alt) => answer.includes(alt.toLowerCase()))).length / q.keypoints.length
  }, 0) / ids.length
  const row: Row = { run: name.replace(/\.jsonl$/, ''), config: config!, compactions: 0, rules: 0, rulesAfter: 0, searchBefore: 0, searchAfter: 0, docBefore: 0, docAfter: 0, tools: 0, ms, tokens, score }
  const log = sessionId === undefined ? undefined : sessionLog(sessionId)
  for (const line of log?.split('\n') ?? []) {
    if (!line) continue
    const event = JSON.parse(line)
    const after = row.compactions > 0
    switch (event.type) {
      case 'compaction/start':
        row.compactions++
        break
      case 'user/message': {
        const source = event.data?.source ?? {}
        const text = JSON.stringify(event.data?.content ?? '')
        const rule = (source.kind === 'semantic-search' && source.form === 'instructions') || (source.kind === 'agent-instructions' && text.includes('Search routing'))
        if (rule) {
          row.rules++
          if (after) row.rulesAfter++
        }
        break
      }
      case 'tool/call': {
        row.tools++
        const tool = event.data?.name as string
        let args: unknown = {}
        try { args = JSON.parse(event.data?.arguments ?? '{}') } catch {}
        if (tool === 'knowledge_search') after ? row.searchAfter++ : row.searchBefore++
        else if (isDocSearch(tool, args)) after ? row.docAfter++ : row.docBefore++
        break
      }
    }
  }
  rows.push(row)
}

writeFileSync(join(outDir, 'compaction.json'), JSON.stringify(rows, null, 2))
console.log('run\tcompact\trules(after)\tks before/after\tdoc grep before/after\ttools\ttime s\ttokens k\tscore')
for (const r of rows) {
  console.log(`${r.run}\t${r.compactions}\t${r.rules}(${r.rulesAfter})\t${r.searchBefore}/${r.searchAfter}\t${r.docBefore}/${r.docAfter}\t${r.tools}\t${(r.ms / 1000).toFixed(0)}\t${(r.tokens / 1000).toFixed(0)}\t${r.score.toFixed(2)}`)
}
const configs = [...new Set(rows.map((r) => r.config))]
const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted.length === 0 ? 0 : sorted.length % 2 ? sorted[(sorted.length - 1) / 2]! : (sorted[sorted.length / 2 - 1]! + sorted[sorted.length / 2]!) / 2
}
console.log('\nconfig\truns\tcompact\trules after\tks after\tdoc grep after\ttools (median)\ttime s (median)\ttokens k (median)\tscore')
for (const config of configs) {
  const set = rows.filter((r) => r.config === config)
  const mean = (pick: (r: Row) => number) => (set.reduce((sum, r) => sum + pick(r), 0) / set.length).toFixed(2)
  console.log(`${config}\t${set.length}\t${mean((r) => r.compactions)}\t${mean((r) => r.rulesAfter)}\t${mean((r) => r.searchAfter)}\t${mean((r) => r.docAfter)}\t${median(set.map((r) => r.tools))}\t${(median(set.map((r) => r.ms)) / 1000).toFixed(0)}\t${(median(set.map((r) => r.tokens)) / 1000).toFixed(0)}\t${mean((r) => r.score)}`)
}
