/**
 * Enumerate indexable files under source roots, honouring nested
 * `.gitignore` / `.ragignore` files and excluded directory names. Symlinks are
 * not followed, which keeps walks finite and inside the chosen roots.
 */
import { lstat, opendir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import ignore, { type Ignore } from 'ignore'
import { classifyFile, type FileKind } from './parse.ts'

export interface ScannedFile {
  readonly path: string
  readonly kind: FileKind
  readonly size: number
  readonly mtimeMs: number
}

export interface ScanOptions {
  readonly excludeDirs: readonly string[]
  readonly extraExtensions: readonly string[]
  readonly maxFiles: number
  readonly maxFileBytes: number
  readonly signal: AbortSignal
}

export interface ScanResult {
  readonly files: ScannedFile[]
  /** True when `maxFiles` cut the walk short (deletions must not be inferred). */
  readonly truncated: boolean
  /** Candidate files skipped for size. */
  readonly oversized: number
  /** Source roots that do not exist. */
  readonly missing: string[]
}

interface IgnoreLayer {
  readonly dir: string
  readonly rules: Ignore
}

const IGNORE_FILES = ['.gitignore', '.ragignore']

export async function scanSources(sources: readonly string[], options: ScanOptions): Promise<ScanResult> {
  const files: ScannedFile[] = []
  const seen = new Set<string>()
  const excluded = new Set(options.excludeDirs)
  const missing: string[] = []
  let oversized = 0
  let truncated = false

  const consider = (path: string, size: number, mtimeMs: number): void => {
    if (seen.has(path)) return
    const kind = classifyFile(path, options.extraExtensions)
    if (kind === undefined) return
    if (size > options.maxFileBytes) {
      oversized += 1
      return
    }
    if (files.length >= options.maxFiles) {
      truncated = true
      return
    }
    seen.add(path)
    files.push({ path, kind, size, mtimeMs })
  }

  const walk = async (dir: string, layers: readonly IgnoreLayer[]): Promise<void> => {
    if (options.signal.aborted) throw options.signal.reason
    if (truncated) return
    const local = await loadIgnore(dir)
    const active = local === undefined ? layers : [...layers, { dir, rules: local }]
    let handle
    try {
      handle = await opendir(dir)
    } catch {
      return
    }
    const entries: Array<{ name: string; isDir: boolean; isFile: boolean }> = []
    for await (const entry of handle) entries.push({ name: entry.name, isDir: entry.isDirectory(), isFile: entry.isFile() })
    entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    for (const entry of entries) {
      const path = join(dir, entry.name)
      if (entry.isDir) {
        if (excluded.has(entry.name) || isIgnored(active, path, true)) continue
        await walk(path, active)
      } else if (entry.isFile) {
        if (isIgnored(active, path, false)) continue
        try {
          const stats = await lstat(path)
          consider(path, stats.size, stats.mtimeMs)
        } catch {
          // Vanished between readdir and stat.
        }
      }
    }
  }

  for (const source of sources) {
    let stats
    try {
      stats = await lstat(source)
    } catch {
      missing.push(source)
      continue
    }
    if (stats.isDirectory()) await walk(source, [])
    else if (stats.isFile()) consider(source, stats.size, stats.mtimeMs)
  }
  return { files, truncated, oversized, missing }
}

async function loadIgnore(dir: string): Promise<Ignore | undefined> {
  let rules: Ignore | undefined
  for (const name of IGNORE_FILES) {
    let text: string
    try {
      text = await readFile(join(dir, name), 'utf8')
    } catch {
      continue
    }
    rules ??= ignore()
    rules.add(text)
  }
  return rules
}

function isIgnored(layers: readonly IgnoreLayer[], path: string, isDir: boolean): boolean {
  for (const layer of layers) {
    const rel = relative(layer.dir, path).split(sep).join('/')
    if (rel === '' || rel.startsWith('..')) continue
    if (layer.rules.ignores(isDir ? `${rel}/` : rel)) return true
  }
  return false
}

/** True when `path` equals `root` or lies below it. */
export function isWithin(root: string, path: string): boolean {
  return path === root || path.startsWith(root.endsWith(sep) ? root : root + sep)
}
