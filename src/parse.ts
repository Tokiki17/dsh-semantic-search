/**
 * File classification and text extraction. Plain text, Markdown and source
 * code are decoded directly; PDF (unpdf) and DOCX (mammoth) are loaded lazily
 * so the plugin activates without paying for them.
 */
import { basename, extname } from 'node:path'
import type { ParsedDocument } from './chunk.ts'

export type FileKind = 'markdown' | 'text' | 'html' | 'pdf' | 'docx'

const MARKDOWN = new Set(['.md', '.markdown', '.mdx', '.mdown', '.mkd'])
const HTML = new Set(['.html', '.htm', '.xhtml'])
const TEXT = new Set([
  '.txt', '.text', '.rst', '.adoc', '.asciidoc', '.org', '.tex', '.bib',
  '.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.svelte', '.astro',
  '.py', '.pyi', '.ipynb', '.go', '.rs', '.java', '.kt', '.kts', '.scala', '.sc', '.groovy', '.gradle', '.swift', '.m', '.mm',
  '.c', '.h', '.cc', '.cpp', '.cxx', '.hpp', '.hh', '.hxx', '.cs', '.fs', '.vb', '.rb', '.php', '.pl', '.pm', '.lua', '.dart',
  '.clj', '.cljs', '.ex', '.exs', '.erl', '.hrl', '.hs', '.ml', '.mli', '.r', '.jl', '.zig', '.nim', '.v', '.sol',
  '.sh', '.bash', '.zsh', '.fish', '.ps1', '.psm1', '.bat', '.cmd',
  '.sql', '.graphql', '.gql', '.proto', '.thrift', '.prisma',
  '.css', '.scss', '.sass', '.less', '.xml', '.xsd', '.plist',
  '.json', '.jsonc', '.json5', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.properties',
  '.cmake', '.mk', '.tf', '.hcl', '.nix', '.dockerfile', '.j2', '.tmpl', '.tpl', '.csv', '.tsv',
])
const TEXT_BASENAMES = new Set([
  'dockerfile', 'makefile', 'gnumakefile', 'justfile', 'rakefile', 'gemfile', 'procfile', 'vagrantfile',
  'brewfile', 'podfile', 'cmakelists.txt', 'license', 'copying', 'readme', 'changelog', 'authors', 'notice',
])
const LOCKFILES = new Set([
  'package-lock.json', 'npm-shrinkwrap.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lockb', 'bun.lock', 'cargo.lock',
  'poetry.lock', 'pipfile.lock', 'uv.lock', 'gemfile.lock', 'composer.lock', 'go.sum', 'flake.lock', 'podfile.lock',
  'packages.lock.json', 'mix.lock', 'pubspec.lock',
])

/** Files that commonly hold secrets are never read, whatever their extension. */
export function isSensitiveName(name: string): boolean {
  const lower = name.toLowerCase()
  return (
    /^\.env(\..*)?$/.test(lower) ||
    /^\.?(netrc|npmrc|pypirc|pgpass|htpasswd)$/.test(lower) ||
    /^id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/.test(lower) ||
    /\.(pem|key|p12|pfx|jks|keystore|kdbx|gpg|asc|age)$/.test(lower) ||
    /(^|[._-])(credentials?|secrets?)([._-]|$)/.test(lower)
  )
}

export function classifyFile(path: string, extraExtensions: readonly string[] = []): FileKind | undefined {
  const name = basename(path).toLowerCase()
  if (isSensitiveName(name) || LOCKFILES.has(name)) return undefined
  if (/\.min\.(js|css)$/.test(name) || name.endsWith('.map')) return undefined
  const ext = extname(name)
  if (MARKDOWN.has(ext)) return 'markdown'
  if (HTML.has(ext)) return 'html'
  if (ext === '.pdf') return 'pdf'
  if (ext === '.docx') return 'docx'
  if (TEXT.has(ext) || TEXT_BASENAMES.has(name)) return 'text'
  if (extraExtensions.some((extra) => normalizeExtension(extra) === ext)) return 'text'
  return undefined
}

function normalizeExtension(extension: string): string {
  const lower = extension.trim().toLowerCase()
  return lower.startsWith('.') ? lower : `.${lower}`
}

/** Plain-text files above this size are skipped even when `maxFileBytes` allows more (PDF/DOCX are exempt). */
export const MAX_TEXT_BYTES = 2 * 1024 * 1024

export class SkipFile extends Error {}

export async function parseFile(kind: FileKind, data: Uint8Array): Promise<ParsedDocument> {
  switch (kind) {
    case 'markdown':
      return { kind: 'markdown', text: decodeText(data) }
    case 'text':
      return { kind: 'text', text: decodeText(data) }
    case 'html':
      return { kind: 'text', text: htmlToText(decodeText(data)) }
    case 'pdf':
      return { kind: 'pages', pages: await pdfPages(data) }
    case 'docx':
      return { kind: 'text', text: await docxText(data) }
  }
}

function decodeText(data: Uint8Array): string {
  if (data.byteLength > MAX_TEXT_BYTES) throw new SkipFile(`larger than ${MAX_TEXT_BYTES} bytes`)
  const probe = data.subarray(0, 8000)
  if (probe.includes(0)) throw new SkipFile('binary content')
  return new TextDecoder('utf-8', { ignoreBOM: false }).decode(data)
}

export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style|noscript|template)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(br|\/p|\/div|\/li|\/tr|\/h[1-6]|\/section|\/article)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
}

async function pdfPages(data: Uint8Array): Promise<string[]> {
  const { extractText, getDocumentProxy } = await import('unpdf')
  const pdf = await getDocumentProxy(new Uint8Array(data))
  try {
    const { text } = await extractText(pdf, { mergePages: false })
    const pages = Array.isArray(text) ? text : [text]
    if (pages.every((page) => page.trim() === '')) throw new SkipFile('PDF has no extractable text (scanned images need OCR)')
    return pages
  } finally {
    await (pdf as unknown as { destroy?: () => Promise<void> }).destroy?.()
  }
}

async function docxText(data: Uint8Array): Promise<string> {
  const mammoth = await import('mammoth')
  const extract = (mammoth as unknown as { extractRawText: typeof import('mammoth').extractRawText }).extractRawText
    ?? (mammoth as unknown as { default: typeof import('mammoth') }).default.extractRawText
  const result = await extract({ buffer: Buffer.from(data.buffer, data.byteOffset, data.byteLength) })
  return result.value
}
