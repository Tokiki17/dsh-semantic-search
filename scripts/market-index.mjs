// Generate market/index.json for the DSH plugin market from package.json, the
// locale metadata and a release commit, then validate it with DSH's own
// parser. Usage: node scripts/market-index.mjs [commit] [index-url]
// The commit defaults to HEAD and must contain the built lib/ directory.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const pkg = JSON.parse(read('package.json'))
const en = JSON.parse(read('locale/en.json')).meta
const zh = JSON.parse(read('locale/zh.json')).meta
const commit = process.argv[2] ?? execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
const indexUrl = process.argv[3] ?? 'https://raw.githubusercontent.com/Tokiki17/dsh-qwen-rag/main/market/index.json'
const committedAt = Number(execFileSync('git', ['show', '-s', '--format=%ct', commit], { cwd: root, encoding: 'utf8' }).trim())
const tracked = execFileSync('git', ['ls-tree', '-r', '--name-only', commit, 'lib/index.js'], { cwd: root, encoding: 'utf8' }).trim()
if (tracked !== 'lib/index.js') throw new Error(`commit ${commit} does not contain lib/index.js; build and commit lib/ first`)
const repoUrl = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')

const index = {
  format: 1,
  title: { en: 'Tokiki DSH plugins', zh: 'Tokiki 的 DSH 插件' },
  description: { en: 'Community plugins for DeepSeek Harness.', zh: 'DeepSeek Harness 社区插件。' },
  plugins: [
    {
      name: pkg.name,
      title: { en: en.title, zh: zh.title },
      description: { en: en.description, zh: zh.description },
      icon: `data:image/svg+xml;base64,${Buffer.from(read('icon.svg')).toString('base64')}`,
      author: 'Tokiki',
      homepage: repoUrl,
      repository: { url: repoUrl },
      metadata: { keywords: pkg.keywords },
      versions: [
        {
          version: pkg.version,
          publishTimestamp: committedAt,
          source: { type: 'git', url: repoUrl, commit },
          engines: { dsh: pkg.engines.dsh },
        },
      ],
    },
  ],
}

parseMarketIndex(index, indexUrl)
writeFileSync(new URL('market/index.json', root), `${JSON.stringify(index, null, 2)}\n`)
console.log(`market/index.json -> ${pkg.name}@${pkg.version} at ${commit}`)
