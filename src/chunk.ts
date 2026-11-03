/**
 * Split parsed documents into retrieval chunks that keep source line ranges
 * (or PDF page numbers) for citations. Markdown is split by heading first;
 * everything else packs blank-line-separated blocks up to `chunkChars`.
 */

export interface Chunk {
  readonly ord: number
  readonly text: string
  /** 1-based inclusive line range within the file (or within the page for PDFs). */
  readonly startLine: number
  readonly endLine: number
  /** Markdown heading path such as "Install > Config"; empty when none. */
  readonly heading: string
  /** 1-based PDF page; undefined for line-addressed documents. */
  readonly page: number | undefined
}

export interface ChunkOptions {
  readonly chunkChars: number
  readonly overlapChars: number
}

export type ParsedDocument =
  | { readonly kind: 'markdown' | 'text'; readonly text: string }
  | { readonly kind: 'pages'; readonly pages: readonly string[] }

interface Block {
  /** 0-based inclusive line indexes. */
  readonly start: number
  readonly end: number
  readonly size: number
}

export function chunkDocument(doc: ParsedDocument, options: ChunkOptions): Chunk[] {
  const out: Chunk[] = []
  if (doc.kind === 'pages') {
    doc.pages.forEach((page, index) => {
      packLines(splitLines(page), 0, undefined, '', index + 1, options, out)
    })
  } else if (doc.kind === 'markdown') {
    chunkMarkdown(splitLines(doc.text), options, out)
  } else {
    packLines(splitLines(doc.text), 0, undefined, '', undefined, options, out)
  }
  return out
}

function splitLines(text: string): string[] {
  return text.replace(/\r\n?/g, '\n').split('\n')
}

function chunkMarkdown(lines: string[], options: ChunkOptions, out: Chunk[]): void {
  const stack: string[] = []
  let sectionStart = 0
  let heading = ''
  let fence: string | undefined
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line)
    if (fenceMatch) {
      const marker = fenceMatch[1]!
      if (fence === undefined) fence = marker[0]!.repeat(marker.length)
      else if (marker.startsWith(fence)) fence = undefined
      continue
    }
    if (fence !== undefined) continue
    const headingMatch = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line)
    if (!headingMatch) continue
    packLines(lines, sectionStart, i, heading, undefined, options, out)
    const level = headingMatch[1]!.length
    stack.length = Math.min(stack.length, level - 1)
    stack[level - 1] = headingMatch[2]!.trim()
    heading = stack.filter(Boolean).join(' > ')
    sectionStart = i
  }
  packLines(lines, sectionStart, lines.length, heading, undefined, options, out)
}

/** Pack lines [from, to) into chunks; blocks are runs of non-blank lines. */
function packLines(
  lines: readonly string[],
  from: number,
  to: number | undefined,
  heading: string,
  page: number | undefined,
  options: ChunkOptions,
  out: Chunk[],
): void {
  const end = to ?? lines.length
  const blocks = splitBlocks(lines, from, end, options.chunkChars)
  let i = 0
  while (i < blocks.length) {
    let j = i
    let size = blocks[i]!.size
    while (j + 1 < blocks.length && size + 1 + blocks[j + 1]!.size <= options.chunkChars) {
      j += 1
      size += 1 + blocks[j]!.size
    }
    emit(lines, blocks[i]!.start, blocks[j]!.end, heading, page, out)
    if (j + 1 >= blocks.length) break
    // Carry trailing blocks of this chunk into the next one, never the whole chunk.
    let k = j + 1
    let carried = 0
    while (k - 1 > i && carried + blocks[k - 1]!.size <= options.overlapChars) {
      k -= 1
      carried += blocks[k]!.size + 1
    }
    i = k
  }
}

function splitBlocks(lines: readonly string[], from: number, to: number, maxChars: number): Block[] {
  const blocks: Block[] = []
  let start = -1
  let size = 0
  const flush = (endExclusive: number) => {
    if (start < 0) return
    blocks.push(...splitOversize(lines, start, endExclusive - 1, size, maxChars))
    start = -1
    size = 0
  }
  for (let i = from; i < to; i++) {
    const line = lines[i]!
    if (line.trim() === '') {
      flush(i)
      continue
    }
    if (start < 0) start = i
    size += (size === 0 ? 0 : 1) + line.length
  }
  flush(to)
  return blocks
}

/** Break a block larger than `maxChars` into line windows; a single long line stays whole and is cut at emit. */
function splitOversize(lines: readonly string[], start: number, end: number, size: number, maxChars: number): Block[] {
  if (size <= maxChars) return [{ start, end, size }]
  const parts: Block[] = []
  let partStart = start
  let partSize = 0
  for (let i = start; i <= end; i++) {
    const length = lines[i]!.length
    if (partSize > 0 && partSize + 1 + length > maxChars) {
      parts.push({ start: partStart, end: i - 1, size: partSize })
      partStart = i
      partSize = 0
    }
    partSize += (partSize === 0 ? 0 : 1) + length
  }
  parts.push({ start: partStart, end, size: Math.min(partSize, maxChars) })
  return parts
}

const MAX_EMIT_CHARS = 16000

function emit(lines: readonly string[], start: number, end: number, heading: string, page: number | undefined, out: Chunk[]): void {
  let text = lines.slice(start, end + 1).join('\n').trim()
  if (text === '') return
  if (text.length > MAX_EMIT_CHARS) text = text.slice(0, MAX_EMIT_CHARS)
  out.push({ ord: out.length, text, startLine: start + 1, endLine: end + 1, heading, page })
}

/**
 * Text sent to the embedding model for one chunk: location context first so
 * that file names and section titles contribute to the vector.
 */
export function embeddingInput(label: string, chunk: Chunk, maxChars: number): string {
  const header = chunk.heading ? `${label}\n${chunk.heading}\n\n` : `${label}\n\n`
  const body = chunk.text.length > maxChars ? chunk.text.slice(0, maxChars) : chunk.text
  return header + body
}
