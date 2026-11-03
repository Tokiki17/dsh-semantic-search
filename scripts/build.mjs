// Bundle src/ into lib/ as ESM. DSH packages stay external (the host provides
// them through peer resolution); unpdf, mammoth, ignore and zod are bundled so the
// installed package has no runtime dependencies and no install scripts.
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { build } from 'esbuild'

rmSync(new URL('../lib', import.meta.url), { recursive: true, force: true })
const result = await build({
  entryPoints: ['src/index.ts', 'src/typert.ts'],
  outdir: 'lib',
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'node',
  target: 'node24',
  external: ['@deepseek-ai/*'],
  chunkNames: 'chunks/[name]-[hash]',
  legalComments: 'none',
  metafile: true,
  banner: { js: "import { createRequire as __semanticSearchCreateRequire } from 'node:module'; const require = __semanticSearchCreateRequire(import.meta.url);" },
  logLevel: 'warning',
})
const outputs = Object.entries(result.metafile.outputs).filter(([file]) => file.endsWith('.js'))
for (const [file, info] of outputs) console.log(`${file}  ${(info.bytes / 1024).toFixed(1)} KiB`)

// Collect the licenses of every bundled third-party package into one notice file.
const packages = new Map()
for (const input of Object.keys(result.metafile.inputs)) {
  const match = /node_modules\/((?:@[^/]+\/)?[^/]+)\//.exec(input)
  if (match) packages.set(match[1], join('node_modules', match[1]))
}
const sections = []
for (const [name, dir] of [...packages].sort()) {
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
  const licenseFile = readdirSync(dir).find((file) => /^(licen[cs]e|copying)(\.|$)/i.test(file))
  const text = licenseFile ? readFileSync(join(dir, licenseFile), 'utf8').trim() : `License: ${pkg.license ?? 'see package'}`
  sections.push(`## ${name}@${pkg.version} (${pkg.license ?? 'unknown'})\n\n${text}`)
  const extra = join(dir, 'dist', 'licenses')
  if (existsSync(extra)) {
    for (const file of readdirSync(extra).sort()) sections.push(`## ${name} bundles ${file}\n\n${readFileSync(join(extra, file), 'utf8').trim()}`)
  }
}
writeFileSync('lib/THIRD_PARTY_NOTICES.md', `# Third-party notices\n\nlib/ bundles the following packages.\n\n${sections.join('\n\n')}\n`)
console.log(`lib/THIRD_PARTY_NOTICES.md  ${packages.size} packages`)
