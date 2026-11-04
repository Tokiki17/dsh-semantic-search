// Token ledger over DSH headless run logs (eval/runs/**/*.jsonl): where do the tokens of a run go?
//
//   node eval/ledger.ts [runs-dir] [--json out.json] [--exclude invalid-leaked]
//
// Each DSH step reports exact usage. A step's prompt is inputTokens + cacheReadTokens + cacheWriteTokens.
// The growth between two consecutive prompts, minus the previous step's output, is what the tool results
// of that step added; it is split among the step's tool calls by their logged result length (the log
// caps results at 8192 characters, so per-call sizes inside one step are approximate, step totals are not).
// A block added at step k is re-sent in every later step, so its carried cost is size × (steps after k).
// Only aggregate numbers are printed; no result text is written out.
import fs from 'node:fs'
import path from 'node:path'

interface Usage { inputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number; totalTokens: number }
interface Call { tool: string; input: Record<string, unknown>; chars: number; step: number; kind: string }
interface Run { file: string; group: string; config: string; steps: Usage[]; calls: Call[] }

const args = process.argv.slice(2)
const root = args.find((a) => !a.startsWith('--')) ?? 'eval/runs'
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : undefined
const exclude = new Set(['invalid-leaked', ...(args.includes('--exclude') ? args[args.indexOf('--exclude') + 1].split(',') : [])])

function files(dir: string): string[] {
  const out: string[] = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (exclude.has(e.name)) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...files(p))
    else if (e.name.endsWith('.jsonl')) out.push(p)
  }
  return out
}

/** Coarse purpose of a call, so bash can be split into reading, searching, listing and the rest. */
function kind(tool: string, input: Record<string, unknown>): string {
  if (tool !== 'bash') return tool
  const cmd = String(input.command ?? input.cmd ?? '').trim()
  const first = cmd.replace(/^(cd [^&;]+(&&|;)\s*)+/, '').split(/[\s|;&]/)[0]
  if (/^(cat|sed|head|tail|less|nl|awk)$/.test(first)) return 'bash:read'
  if (/^(rg|grep|ag|ack|git)$/.test(first)) return first === 'git' ? 'bash:git' : 'bash:search'
  if (/^(ls|find|tree|fd|du|wc|stat|file)$/.test(first)) return 'bash:list'
  if (/^(python3?|node|cargo|dotnet|npm|make|go|pytest)$/.test(first)) return 'bash:run'
  return 'bash:other'
}

function parse(file: string): Run | undefined {
  const rel = path.relative(root, file)
  const group = rel.split(path.sep)[0]
  const base = path.basename(file, '.jsonl')
  const config = base.split('-').slice(1, -1).join('-') || base
  const steps: Usage[] = []
  const calls: Call[] = []
  const byId = new Map<string, Call>()
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line) continue
    let e: Record<string, unknown>
    try { e = JSON.parse(line) } catch { continue }
    if (e.type === 'status' && e.phase === 'step_end' && e.usage) steps.push(e.usage as Usage)
    else if (e.type === 'tool_call') {
      const input = (e.input ?? {}) as Record<string, unknown>
      const c: Call = { tool: String(e.tool), input, chars: 0, step: steps.length, kind: kind(String(e.tool), input) }
      calls.push(c); byId.set(String(e.callId), c)
    } else if (e.type === 'tool_result') {
      const c = byId.get(String(e.callId))
      if (c) c.chars = String(e.result ?? '').length
    }
  }
  return steps.length ? { file: rel, group, config, steps, calls } : undefined
}

const prompt = (u: Usage) => u.inputTokens + u.cacheReadTokens + u.cacheWriteTokens

interface Acc {
  runs: number; steps: number; total: number; promptSum: number; uncached: number; cacheRead: number; output: number
  base: number; baseCarried: number; outputCarried: number; resultAdded: number; resultCarried: number; other: number; compactions: number
  byKind: Map<string, { calls: number; added: number; carried: number }>
  rereadCalls: number; rereadAdded: number; rereadCarried: number; dupCalls: number; readCalls: number
}
const acc = (): Acc => ({ runs: 0, steps: 0, total: 0, promptSum: 0, uncached: 0, cacheRead: 0, output: 0, base: 0, baseCarried: 0, outputCarried: 0, resultAdded: 0, resultCarried: 0, other: 0, compactions: 0, byKind: new Map(), rereadCalls: 0, rereadAdded: 0, rereadCarried: 0, dupCalls: 0, readCalls: 0 })

function readKey(c: Call): string | undefined {
  if (c.kind === 'read') return String(c.input.file_path ?? c.input.path ?? '')
  if (c.kind === 'bash:read') {
    const m = String(c.input.command ?? '').match(/(\/[^\s'"|;&]+\.[A-Za-z0-9]+)/)
    return m?.[1]
  }
  return undefined
}

function add(a: Acc, r: Run): void {
  const n = r.steps.length
  a.runs++; a.steps += n
  for (const u of r.steps) { a.total += u.totalTokens; a.promptSum += prompt(u); a.uncached += u.inputTokens + u.cacheWriteTokens; a.cacheRead += u.cacheReadTokens; a.output += u.outputTokens }
  // The first prompt (system prompt, tool schemas, instructions, user message) is re-sent in every step until a compaction.
  let segStart = 0
  const seen = new Map<string, number>()
  const sigs = new Set<string>()
  for (const c of r.calls) {
    const sig = c.tool + JSON.stringify(c.input)
    if (sigs.has(sig)) a.dupCalls++
    sigs.add(sig)
  }
  for (let k = 0; k < n; k++) {
    if (k === 0 || prompt(r.steps[k]) < prompt(r.steps[k - 1])) {
      if (k > 0) a.compactions++
      segStart = k
      a.base += prompt(r.steps[k])
      continue
    }
    a.baseCarried += prompt(r.steps[segStart])
    const prev = r.steps[k - 1]
    const growth = prompt(r.steps[k]) - prompt(prev)
    const out = Math.min(prev.outputTokens, growth)
    let segEnd = n
    for (let j = k + 1; j < n; j++) if (prompt(r.steps[j]) < prompt(r.steps[j - 1])) { segEnd = j; break }
    const later = segEnd - k // this step and every later one in the segment re-send the block
    a.outputCarried += out * later
    const added = growth - out
    const stepCalls = r.calls.filter((c) => c.step === k)
    const chars = stepCalls.reduce((s, c) => s + c.chars, 0)
    if (!stepCalls.length || chars === 0) { a.other += added * later; continue }
    for (const c of stepCalls) {
      const share = added * (c.chars / chars)
      a.resultAdded += share; a.resultCarried += share * later
      const b = a.byKind.get(c.kind) ?? { calls: 0, added: 0, carried: 0 }
      b.calls++; b.added += share; b.carried += share * later
      a.byKind.set(c.kind, b)
      const key = readKey(c)
      if (key !== undefined) {
        a.readCalls++
        if (seen.has(key)) { a.rereadCalls++; a.rereadAdded += share; a.rereadCarried += share * later }
        seen.set(key, k)
      }
    }
  }
}

const runs = files(root).map(parse).filter((r): r is Run => r !== undefined)
const all = acc()
const groups = new Map<string, Acc>()
for (const r of runs) {
  add(all, r)
  const g = groups.get(r.group) ?? acc(); add(g, r); groups.set(r.group, g)
}

const pct = (x: number, t: number) => (t ? (100 * x / t).toFixed(1) + '%' : '-')
const k = (x: number) => (x / 1000).toFixed(1) + 'k'
console.log(`runs ${all.runs}, steps ${all.steps} (${(all.steps / all.runs).toFixed(1)} per run), compactions ${all.compactions}`)
console.log(`total tokens ${k(all.total)}: prompt ${pct(all.promptSum, all.total)} (uncached ${pct(all.uncached, all.total)}, cache read ${pct(all.cacheRead, all.total)}), output ${pct(all.output, all.total)}`)
console.log(`\nprompt tokens by origin (summed over every step that re-sends them):`)
const P = all.promptSum
console.log(`  first prompt of a segment, re-sent every step: ${pct(all.base + all.baseCarried, P)}`)
console.log(`  tool results:                                 ${pct(all.resultCarried, P)}  (added once: ${k(all.resultAdded / all.runs)} per run)`)
console.log(`  earlier model output (thinking, calls, text):  ${pct(all.outputCarried, P)}`)
console.log(`  other growth (reminders, no-result steps):     ${pct(all.other, P)}`)
console.log(`\ntool results by kind (share of all prompt tokens, calls, mean tokens added per call):`)
for (const [kd, b] of [...all.byKind].sort((x, y) => y[1].carried - x[1].carried)) {
  console.log(`  ${kd.padEnd(18)} ${pct(b.carried, P).padStart(6)}  ${String(b.calls).padStart(6)} calls  ${Math.round(b.added / b.calls).toString().padStart(6)} tok/call`)
}
console.log(`\nre-reads: ${all.rereadCalls} of ${all.readCalls} file reads hit a file already read in the run; they carry ${pct(all.rereadCarried, P)} of prompt tokens`)
console.log(`identical repeated calls (same tool and arguments): ${all.dupCalls}`)
console.log(`\nby run group: runs, steps/run, tokens/run, tool-result share, first-prompt share`)
for (const [g, a] of [...groups].sort()) {
  console.log(`  ${g.padEnd(20)} ${String(a.runs).padStart(4)} ${(a.steps / a.runs).toFixed(1).padStart(6)} ${k(a.total / a.runs).padStart(8)} ${pct(a.resultCarried, a.promptSum).padStart(7)} ${pct(a.base + a.baseCarried, a.promptSum).padStart(7)}`)
}
if (jsonOut) {
  const ser = (a: Acc) => ({ ...a, byKind: Object.fromEntries(a.byKind) })
  fs.writeFileSync(jsonOut, JSON.stringify({ all: ser(all), groups: Object.fromEntries([...groups].map(([g, a]) => [g, ser(a)])) }, null, 2))
}
