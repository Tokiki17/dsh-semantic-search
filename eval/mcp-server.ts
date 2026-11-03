/**
 * Evaluation-only MCP stdio server: one `knowledge_search` tool that forwards
 * to eval/daemon.ts. Hand-rolled JSON-RPC (newline-delimited), no SDK.
 */
import { createInterface } from 'node:readline'

const DAEMON = process.env.EVAL_DAEMON ?? 'http://127.0.0.1:8790'

const INSTRUCTIONS = [
  'knowledge_search is a semantic + keyword hybrid search over this repository (code and Chinese/English docs), reranked.',
  'Use it when you do not know the identifier or the exact wording: conceptual questions ("where/how is X handled", design rationale, what the docs say), paraphrased or cross-language questions.',
  'For an exact identifier, error string, file name or literal text, use Grep instead; it is faster and exact.',
  'Results are path:line passages; read the cited lines before relying on them.',
].join(' ')

const TOOL = {
  name: 'knowledge_search',
  description:
    'Semantic + keyword search over this repository\'s code and docs (any language), reranked. Best for conceptual or paraphrased questions when the identifier or exact wording is unknown; use Grep for exact identifiers or strings. Returns up to 6 passages as path:line with snippets.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Natural-language question or keywords, in any language.' },
      top_k: { type: 'integer', minimum: 1, maximum: 12, description: 'Passages to return (default 6).' },
    },
    required: ['query'],
  },
}

const send = (message: unknown) => process.stdout.write(`${JSON.stringify(message)}\n`)

createInterface({ input: process.stdin }).on('line', async (line) => {
  if (line.trim() === '') return
  const message = JSON.parse(line) as { id?: number | string; method: string; params?: Record<string, unknown> }
  if (message.id === undefined) return // notifications
  const reply = (result: unknown) => send({ jsonrpc: '2.0', id: message.id, result })
  switch (message.method) {
    case 'initialize':
      reply({
        protocolVersion: message.params?.protocolVersion ?? '2025-06-18',
        capabilities: { tools: {} },
        serverInfo: { name: 'semantic-search-eval', version: '0.0.1' },
        instructions: INSTRUCTIONS,
      })
      return
    case 'tools/list':
      reply({ tools: [TOOL] })
      return
    case 'tools/call': {
      const args = (message.params?.arguments ?? {}) as { query?: string; top_k?: number }
      try {
        const response = await fetch(`${DAEMON}/search`, { method: 'POST', body: JSON.stringify(args) })
        const text = await response.text()
        reply({ content: [{ type: 'text', text }], isError: !response.ok })
      } catch (error) {
        reply({ content: [{ type: 'text', text: `search failed: ${String(error)}` }], isError: true })
      }
      return
    }
    case 'ping':
      reply({})
      return
    default:
      send({ jsonrpc: '2.0', id: message.id, error: { code: -32601, message: `unknown method ${message.method}` } })
  }
})
