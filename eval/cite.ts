/**
 * Check the citations in each run's final answer against the corpus.
 *
 *   EVAL_QUESTIONS=<file> node eval/cite.ts <repo> <out-dir>
 *
 * A citation is `path:line` or `path:start-end` (also `path` line N with a
 * fullwidth colon). It counts as supported when the file exists under <repo>
 * and some keypoint alternative of the question appears within ±5 lines of the
 * cited range. Writes cite.json next to the runs and prints, per config, the
 * share of runs whose answer cites at least one supporting location.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, normalize } from 'node:path'

const [repo, outDir] = process.argv.slice(2)
if (!repo || !outDir) throw new Error('usage: EVAL_QUESTIONS=<file> node eval/cite.ts <repo> <out-dir>')
const { questions } = JSON.parse(readFileSync(process.env.EVAL_QUESTIONS ?? join(import.meta.dirname, 'questions.json'), 'utf8')) as {
  questions: Array<{ id: string; keypoints: string[][] }>
}
const byId = new Map(questions.map((q) => [q.id, q]))
const files = new Map<string, string[] | undefined>()
const lines = (path: string) => {
  if (!files.has(path)) {
    const full = join(repo, normalize(path).replace(/^(\.\.\/)+/, ''))
    files.set(path, existsSync(full) ? readFileSync(full, 'utf8').split('\n') : undefined)
  }
  return files.get(path)
}

const CITE = /([\w\-./㐀-鿿]+\.(?:md|txt|rst|ya?ml|json))\s*[:：]\s*(?:L|第)?(\d+)(?:\s*[-–~～]\s*(\d+))?/g
interface Row { run: string; config: string; cited: number; supported: number }
const rows: Row[] = []
for (const name of readdirSync(outDir).filter((file) => file.endsWith('.jsonl')).sort()) {
  const [id, config] = name.replace(/\.jsonl$/, '').split('-')
  const q = byId.get(id!)
  if (q === undefined) continue
  const final = readFileSync(join(outDir, name), 'utf8').split('\n').flatMap((line) => {
    try { const e = JSON.parse(line); return e.type === 'final' ? [String(e.text)] : [] } catch { return [] }
  }).join('\n')
  const alternatives = q.keypoints.flat().map((alt) => alt.toLowerCase())
  let cited = 0
  let supported = 0
  for (const match of final.matchAll(CITE)) {
    cited++
    const text = lines(match[1]!.replace(/^`|`$/g, ''))
    if (text === undefined) continue
    const start = Number(match[2])
    const end = match[3] ? Number(match[3]) : start
    const window = text.slice(Math.max(0, start - 6), end + 5).join('\n').toLowerCase()
    if (alternatives.some((alt) => window.includes(alt))) supported++
  }
  rows.push({ run: name.replace(/\.jsonl$/, ''), config: config!, cited, supported })
}
writeFileSync(join(outDir, 'cite.json'), JSON.stringify(rows, null, 2))
console.log('config\truns\twith citation\twith a supported citation\tsupported / cited')
for (const config of [...new Set(rows.map((r) => r.config))]) {
  const set = rows.filter((r) => r.config === config)
  const cited = set.reduce((sum, r) => sum + r.cited, 0)
  const supported = set.reduce((sum, r) => sum + r.supported, 0)
  console.log(`${config}\t${set.length}\t${set.filter((r) => r.cited > 0).length}\t${set.filter((r) => r.supported > 0).length}\t${cited ? (supported / cited).toFixed(2) : '-'}`)
}
