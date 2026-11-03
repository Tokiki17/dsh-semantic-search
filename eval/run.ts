/**
 * Run the question set through a headless coding agent in two configurations:
 *   A  the harness's own search tools only (Claude Code: Read/Grep/Glob; Codex: read-only shell)
 *   B  the same plus the knowledge_search MCP tool (eval/mcp-server.ts → eval/daemon.ts)
 *   C  B plus routing instructions (what the companion skill would say)
 *   D  C against a daemon with rerank off (EVAL_DAEMON_FAST, default :8791)
 *   E  D with docs-only routing: rg for any code question
 *
 * DSH (--harness dsh) maps the configs to profiles under $DSH_HOME instead:
 *   A  eval-a: headless profile, no plugin
 *   P  eval-p: the released 0.2.0 plugin (prompt searches first for code and docs, rerank on)
 *   Q  eval-q: the working-tree plugin (docs-first prompt, rerank off)
 *   R  eval-r: Q plus an explicit routing rule in $DSH_AGENTS_HOME_R/AGENTS.md
 *   G  eval-g: working-tree plugin with search.enforce: docs (first doc grep of a turn refused)
 *   F  eval-f: working-tree plugin with search.enforce: prefetch (document hits attached to each message)
 *   I  eval-i: working-tree plugin with search.instructions: true (routing rule as an instructions message)
 *   (Q and R pin search.enforce: off, so they match the build they were measured with.)
 *
 *   node eval/run.ts <repo> <out-dir> [--harness codex|claude|dsh] [--reps N] [--jobs N] [--model M] [--effort E] [--only A1,B2] [--configs A,B]
 *
 * Each run is saved as JSON event lines in <out-dir>/<id>-<config>-<rep>.jsonl,
 * followed by a {"type":"eval.timing"} line with the wall-clock time.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    reps: { type: 'string', default: '1' },
    jobs: { type: 'string', default: '3' },
    harness: { type: 'string', default: 'codex' },
    model: { type: 'string' },
    effort: { type: 'string', default: 'medium' },
    only: { type: 'string' },
    configs: { type: 'string', default: 'A,B,C' },
  },
})
const [repo, outDir] = positionals.map((path) => resolve(path))
if (!repo || !outDir) throw new Error('usage: node eval/run.ts <repo> <out-dir> [options]')
const BIN = process.env.AGENT_BIN ?? (values.harness === 'claude' ? 'claude' : values.harness === 'dsh' ? 'dsh' : 'codex')
const MCP_ARGS = [join(import.meta.dirname, 'mcp-server.ts')]

const { questions } = JSON.parse(readFileSync(join(import.meta.dirname, 'questions.json'), 'utf8')) as { questions: Array<{ id: string; question: string }> }
const only = values.only?.split(',')
mkdirSync(outDir, { recursive: true })

const mcpConfig = (config: string) => {
  const file = join(outDir, `mcp-${config}.json`)
  const servers = config !== 'A' ? { sem: { command: process.execPath, args: [join(import.meta.dirname, 'mcp-server.ts')] } } : {}
  writeFileSync(file, JSON.stringify({ mcpServers: servers }))
  return file
}

const ROUTING = [
  'This repository has a semantic search tool, knowledge_search (MCP server "sem"; load it from the deferred tool catalog if needed).',
  'Routing: for an exact identifier, error text, file name or other literal string, use rg directly.',
  'For a conceptual question, behaviour described without names, what the docs say, or paraphrased / cross-language wording, call knowledge_search first, then read the cited path:line to confirm.',
].join(' ')

const ROUTING_DOCS = [
  'This repository has a semantic search tool, knowledge_search (MCP server "sem"; load it from the deferred tool catalog if needed).',
  'Use rg for anything about code, including behaviour described without names, and for exact identifiers or strings.',
  'Call knowledge_search first only for questions about the docs (design decisions, progress notes, findings, measurements) or wording that is paraphrased or colloquial, then read the cited path:line to confirm.',
].join(' ')
const FAST = process.env.EVAL_DAEMON_FAST ?? 'http://127.0.0.1:8791'

const PROMPT_TAIL = '\n\n请在当前仓库中查找答案。回答简洁，给出依据的文件路径和行号。只读，不要修改任何文件。'

interface Job { id: string; config: string; rep: number; question: string }
const jobs: Job[] = []
for (let rep = 1; rep <= Number(values.reps); rep++) {
  for (const q of questions) {
    if (only && !only.includes(q.id)) continue
    for (const config of values.configs!.split(',')) jobs.push({ id: q.id, config, rep, question: q.question })
  }
}

const runOne = (job: Job) => new Promise<void>((done) => {
  const file = join(outDir, `${job.id}-${job.config}-${job.rep}.jsonl`)
  if (existsSync(file)) return done()
  const prompt = job.question + PROMPT_TAIL
  const args = values.harness === 'dsh'
    ? ['--profile', `eval-${job.config.toLowerCase()}`, 'headless', '--json', prompt]
    : values.harness === 'claude'
    ? [
        '-p', prompt,
        '--output-format', 'stream-json', '--verbose',
        '--model', values.model ?? 'sonnet',
        '--tools', 'Read,Grep,Glob',
        '--no-session-persistence',
        ...(job.config === 'C' ? ['--append-system-prompt', ROUTING] : []),
        '--strict-mcp-config', '--mcp-config', mcpConfig(job.config),
        ...(job.config !== 'A' ? ['--allowedTools', 'mcp__sem__knowledge_search'] : []),
      ]
    : [
        'exec', '--json', '--ephemeral', '--ignore-user-config', '--skip-git-repo-check',
        '-s', 'read-only', '-C', repo,
        ...(values.model ? ['-m', values.model] : []),
        '-c', `model_reasoning_effort="${values.effort}"`,
        '-c', 'approval_policy="never"',
        ...(job.config !== 'A'
          ? ['-c', `mcp_servers.sem.command=${JSON.stringify(process.execPath)}`, '-c', `mcp_servers.sem.args=${JSON.stringify(MCP_ARGS)}`, '-c', 'mcp_servers.sem.default_tools_approval_mode="approve"']
          : []),
        ...(job.config === 'C' || job.config === 'D' ? ['-c', `developer_instructions=${JSON.stringify(ROUTING)}`] : []),
        ...(job.config === 'E' ? ['-c', `developer_instructions=${JSON.stringify(ROUTING_DOCS)}`] : []),
        ...(job.config === 'D' || job.config === 'E' ? ['-c', `mcp_servers.sem.env={EVAL_DAEMON=${JSON.stringify(FAST)}}`] : []),
        prompt,
      ]
  const started = Date.now()
  const env = job.config === 'R' && process.env.DSH_AGENTS_HOME_R ? { ...process.env, DSH_AGENTS_HOME: process.env.DSH_AGENTS_HOME_R } : process.env
  const child = spawn(BIN, args, { cwd: repo, env, stdio: ['ignore', 'pipe', 'pipe'] })
  let out = ''
  let err = ''
  child.stdout.on('data', (chunk) => (out += chunk))
  child.stderr.on('data', (chunk) => (err += chunk))
  child.on('close', (code) => {
    const timing = JSON.stringify({ type: 'eval.timing', ms: Date.now() - started, exit: code })
    writeFileSync(code === 0 ? file : `${file}.failed`, `${out}\n${timing}\n${err ? `${JSON.stringify({ type: 'stderr', text: err.slice(-4000) })}\n` : ''}`)
    console.error(`${job.id}-${job.config}-${job.rep}: exit ${code} in ${((Date.now() - started) / 1000).toFixed(0)} s`)
    done()
  })
})

const queue = [...jobs]
await Promise.all(Array.from({ length: Number(values.jobs) }, async () => {
  for (let job = queue.shift(); job; job = queue.shift()) await runOne(job)
}))
