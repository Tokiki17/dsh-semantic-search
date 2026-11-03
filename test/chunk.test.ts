import assert from 'node:assert/strict'
import { test } from 'node:test'
import { chunkDocument, embeddingInput } from '../src/chunk.ts'

const options = { chunkChars: 120, overlapChars: 40 }

test('markdown is split by heading with heading paths and line ranges', () => {
  const text = [
    '# Guide', // 1
    'Intro paragraph.', // 2
    '', // 3
    '## Install', // 4
    'Run the installer.', // 5
    '```sh', // 6
    '# not a heading', // 7
    '```', // 8
    '### Config', // 9
    'Edit config.yml.', // 10
  ].join('\n')
  const chunks = chunkDocument({ kind: 'markdown', text }, options)
  assert.deepEqual(chunks.map((chunk) => chunk.heading), ['Guide', 'Guide > Install', 'Guide > Install > Config'])
  assert.deepEqual(chunks.map((chunk) => [chunk.startLine, chunk.endLine]), [[1, 2], [4, 8], [9, 10]])
  assert.match(chunks[1]!.text, /# not a heading/)
})

test('long text is packed into bounded chunks that overlap', () => {
  const paragraphs = Array.from({ length: 12 }, (_, i) => `Paragraph ${i} ${'word '.repeat(6)}`.trim())
  const chunks = chunkDocument({ kind: 'text', text: paragraphs.join('\n\n') }, { chunkChars: 120, overlapChars: 60 })
  assert.ok(chunks.length > 2)
  for (const chunk of chunks) assert.ok(chunk.text.length <= 200, `chunk too long: ${chunk.text.length}`)
  // Each chunk after the first starts inside the previous one (overlap) or right after it.
  for (let i = 1; i < chunks.length; i++) assert.ok(chunks[i]!.startLine <= chunks[i - 1]!.endLine + 2)
  assert.ok(chunks.some((chunk, i) => i > 0 && chunk.startLine <= chunks[i - 1]!.endLine), 'expected at least one overlapping chunk')
  assert.equal(chunks.at(-1)!.endLine, paragraphs.length * 2 - 1)
})

test('oversized blocks are split by lines and pages keep their number', () => {
  const block = Array.from({ length: 30 }, (_, i) => `line ${i} of a very long code block`).join('\n')
  const chunks = chunkDocument({ kind: 'pages', pages: ['', block] }, options)
  assert.ok(chunks.length > 1)
  assert.ok(chunks.every((chunk) => chunk.page === 2))
  assert.ok(chunks.every((chunk) => chunk.text.length <= options.chunkChars))
})

test('blank documents produce no chunks and embedding input carries location', () => {
  assert.deepEqual(chunkDocument({ kind: 'text', text: '\n  \n' }, options), [])
  const [chunk] = chunkDocument({ kind: 'markdown', text: '# T\nbody' }, options)
  assert.equal(embeddingInput('docs/a.md', chunk!, 1000), 'docs/a.md\nT\n\n# T\nbody')
})
