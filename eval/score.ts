/**
 * Score the runs written by eval/run.ts (Codex or DSH headless JSON events).
 *
 *   node eval/score.ts <out-dir> [--overrides overrides.json]
 *
 * Accuracy: each question lists keypoint groups; a group counts when the
 * final answer contains any of its alternatives (case-insensitive). The run's
 * score is the fraction of groups met. overrides.json ({"A1-B-1": 0.5, …})
 * replaces a score after a manual review. Prints per-run rows, then per
 * category and overall means for each configuration.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({ allowPositionals: true, options: { overrides: { type: 'string' } } })
const outDir = positionals[0]
if (!outDir) throw new Error('usage: node eval/score.ts <out-dir> [--overrides file]')

interface Question { id: string; category: string; keypoints: string[][] }
const { questions } = JSON.parse(readFileSync(process.env.EVAL_QUESTIONS ?? join(import.meta.dirname, 'questions.json'), 'utf8')) as { questions: Question[] }
const byId = new Map(questions.map((q) => [q.id, q]))
const overrides: Record<string, number> = values.overrides && existsSync(values.overrides) ? JSON.parse(readFileSync(values.overrides, 'utf8')) : {}

interface Row {
  run: string; id: string; category: string; config: string
  score: number; missed: string[]; ms: number
  input: number; cached: number; output: number; total: number
  shell: number; search: number; answer: string
}
const rows: Row[] = []
for (const file of readdirSync(outDir).filter((name) => name.endsWith('.jsonl')).sort()) {
  const run = file.replace(/\.jsonl$/, '')
  const [id, config] = run.split('-')
  const q = byId.get(id!)
  if (!q) continue
  let answer = ''
  let ms = 0
  let input = 0, cached = 0, output = 0, shell = 0, search = 0
  for (const line of readFileSync(join(outDir, file), 'utf8').split('\n')) {
    if (!line.startsWith('{')) continue
    const event = JSON.parse(line)
    if (event.type === 'item.completed') {
      const item = event.item
      if (item.type === 'agent_message') answer = item.text
      else if (item.type === 'command_execution') shell++
      else if (item.type === 'mcp_tool_call') search++
    } else if (event.type === 'turn.completed') {
      input += event.usage.input_tokens
      cached += event.usage.cached_input_tokens
      output += event.usage.output_tokens + (event.usage.reasoning_output_tokens ?? 0)
    } else if (event.type === 'final') answer = event.text // DSH headless
    else if (event.type === 'tool_call') {
      if (event.tool === 'knowledge_search') search++
      else shell++
    } else if (event.type === 'status' && event.phase === 'step_end' && event.usage) {
      // DSH: inputTokens excludes cache reads; totalTokens = input + cache reads + output.
      input += event.usage.inputTokens + event.usage.cacheReadTokens
      cached += event.usage.cacheReadTokens
      output += event.usage.outputTokens
    } else if (event.type === 'eval.timing') ms = event.ms
  }
  const text = answer.toLowerCase()
  const missed = q.keypoints.filter((group) => !group.some((alt) => text.includes(alt.toLowerCase()))).map((group) => group[0]!)
  const auto = (q.keypoints.length - missed.length) / q.keypoints.length
  rows.push({ run, id: id!, category: q.category, config: config!, score: overrides[run] ?? auto, missed, ms, input, cached, output, total: input + output, shell, search, answer })
}

const mean = (xs: number[]) => (xs.length === 0 ? NaN : xs.reduce((a, b) => a + b, 0) / xs.length)
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  return s.length === 0 ? NaN : s.length % 2 ? s[(s.length - 1) / 2]! : (s[s.length / 2 - 1]! + s[s.length / 2]!) / 2
}
const summarize = (subset: Row[]) => ({
  n: subset.length,
  accuracy: mean(subset.map((r) => r.score)),
  medianSeconds: median(subset.map((r) => r.ms / 1000)),
  meanSeconds: mean(subset.map((r) => r.ms / 1000)),
  medianTokens: median(subset.map((r) => r.total)),
  meanTokens: mean(subset.map((r) => r.total)),
  meanUncached: mean(subset.map((r) => r.input - r.cached + r.output)),
  shell: mean(subset.map((r) => r.shell)),
  search: mean(subset.map((r) => r.search)),
})

const groups: Record<string, Record<string, ReturnType<typeof summarize>>> = {}
for (const category of [...new Set(questions.map((q) => q.category)), 'all']) {
  for (const config of [...new Set(rows.map((r) => r.config))]) {
    const subset = rows.filter((r) => r.config === config && (category === 'all' || r.category === category))
    ;(groups[category] ??= {})[config] = summarize(subset)
  }
}

console.log('run\tscore\tmissed\tsec\ttokens\tshell\tsearch')
for (const r of rows) console.log(`${r.run}\t${r.score.toFixed(2)}\t${r.missed.join('|')}\t${(r.ms / 1000).toFixed(0)}\t${r.total}\t${r.shell}\t${r.search}`)
console.log('\ncategory\tconfig\tn\taccuracy\tmedian s\tmean s\tmedian tokens\tmean tokens\tmean uncached\tshell\tsearch')
for (const [category, configs] of Object.entries(groups)) {
  for (const [config, s] of Object.entries(configs)) {
    console.log([category, config, s.n, s.accuracy.toFixed(3), s.medianSeconds.toFixed(1), s.meanSeconds.toFixed(1), Math.round(s.medianTokens), Math.round(s.meanTokens), Math.round(s.meanUncached), s.shell.toFixed(1), s.search.toFixed(1)].join('\t'))
  }
}
writeFileSync(join(outDir, 'scores.json'), JSON.stringify({ rows, groups }, null, 2))
