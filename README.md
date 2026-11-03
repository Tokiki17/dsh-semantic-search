# Semantic Search (@tokiki/dsh-semantic-search)

English | [中文](README.zh.md)

Semantic search for DeepSeek Harness (DSH). It searches the current workspace (code and docs) and any document folders you add (Markdown, text, code, PDF, DOCX), and returns passages with `path:line` citations:

1. embedding recall and SQLite FTS5 keyword recall run side by side;
2. the two lists are fused with RRF;
3. a rerank model reorders the fused list.

It works right after installation: by default no model is used and search is keyword-only. For search by meaning, open **Plugins → Semantic Search** and pick where the two models come from, in three steps:

- **Embedding model**: local Qwen3-Embedding 0.6B / 4B / 8B (the plugin downloads llama.cpp and the model and runs them on this machine; nothing leaves it), Alibaba Cloud Model Studio, SiliconFlow, or any OpenAI-compatible service.
- **Rerank model**: follows the embedding source by default; you can pick another source or turn it off.
- Online services only need a key, which is stored in DSH credentials. Local models need one click on **Download**; everything else is configured for you.

Research notes (Chinese): [docs/research.zh.md](docs/research.zh.md).

## Install

You need DSH 0.2.1-rc.5 or newer (`engines.dsh: >=0.2.1-rc.5 <0.3.0`). The package has no native modules and runs no install scripts.

- **Plugin market (recommended):** add `https://raw.githubusercontent.com/Tokiki17/dsh-semantic-search/main/market/index.json` under Plugins → Discover, then install "Semantic Search".
- **CLI:**

  ```bash
  dsh plugin --profile desktop add github:Tokiki17/dsh-semantic-search
  ```

- **Local checkout:**

  ```bash
  dsh plugin --profile desktop add link:/path/to/dsh-semantic-search
  ```

Before you use the CLI:

- The `dsh` command is not on your PATH by default. Install it from the macOS menu bar with **DeepSeek Harness → Manage dsh Command…** (this creates `/usr/local/bin/dsh`), or run it by its full path, `"/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"`.
- Desktop creates the `desktop` profile itself. Open Desktop once, then quit it completely before you run the command; otherwise `dsh` refuses with "Open DeepSeek Harness Desktop once to initialize its profile, then fully quit it".

The plugin is added to the profile's `dsh.profile.bundles`; reopen Desktop to load it.

**Upgrading from 0.1 (`@tokiki/dsh-qwen-rag`):** uninstall the old package, install this one, and choose the model sources again on the setup page; the old `qwen-rag` row is no longer read. Existing indexes move from `<DSH home>/qwen-rag/` to `<DSH home>/semantic-search/` on first start, and 0.6B models downloaded to `~/.cache/dsh-qwen-rag/models/` are reused.

## Configure

Use the setup page under **Plugins → Semantic Search**. Each online source has a **Test connection** button that sends one real request; after a model change the page offers to rebuild stale collections in the background. Downloaded local models and their disk use are listed at the bottom, with a delete button. Models live in `<DSH home>/semantic-search/models/`; uninstalling the plugin does not delete them.

You can also override the `semantic-search` row in the profile's `cordis.patch.yml`:

```yaml
- id: semantic-search
  name: '@tokiki/dsh-semantic-search'
  config:
    embedding:
      source: local              # none (default) | local | dashscope | siliconflow | custom
      model: qwen3-embedding-0.6b
    rerank:
      source: same               # same (default) | off | local | dashscope | siliconflow | custom
```

| Source | Embedding model | Rerank model | Key credential |
|---|---|---|---|
| `local` | `qwen3-embedding-0.6b` (or `-4b`, `-8b`) | `qwen3-reranker-0.6b` | none |
| `dashscope` | `qwen3.7-text-embedding` | `qwen3.7-text-rerank` | `DASHSCOPE_API_KEY` |
| `siliconflow` | `Qwen/Qwen3-Embedding-4B` | `Qwen/Qwen3-Reranker-4B` | `SILICONFLOW_API_KEY` |
| `custom` | `embedding.model` required | enabled when `rerank.model` is set | `providers.custom.apiKeyEnv` |

The local backend downloads the pinned llama.cpp release b11765 (macOS, Linux and Windows builds, sha256-verified, resumable, fastest mirror first) and starts llama-server on a random loopback port only when needed; it stops after 10 idle minutes. Only macOS has been tested on real hardware. The other settings (`local.*`, `approval`, `storageDir`, `index.*`, `search.*`) are described in the Chinese README and [src/config.ts](src/config.ts).

## Local benchmark

Measured on an Apple M4 (16 GB, macOS 15.7) with Homebrew llama.cpp 0.8.0 (0.2.0 uses its own llama.cpp b11765 download; not re-measured), the two 0.6B Q8_0 models and a context of 8192. The corpus was 349 Markdown files (6.2 M characters, half Chinese) from the DSH docs.

- **First index:** 11,205 chunks in 24.3 min, about 7.7 chunks/s. Later runs only re-embed changed files.
- **Index size:** 58 MB.
- **Memory:** about 1.7 GB for the embedding server and 1.6 GB for the rerank server. With `local.ctx: 2048` each server uses about 1.0 GB.
- **Query latency:** 31–176 ms with fusion only, 1.3–2.0 s when reranking 15 candidates, and 2.8–3.8 s when reranking 30 (the default). Set `search.rerankCandidates: 15` or turn reranking off for faster answers.

All five test queries returned the matching section first when rerank was on. Full numbers are in the Chinese README.

## Tools

| Tool | Purpose |
|---|---|
| `knowledge_search` | Hybrid search over the workspace and the named collections, returning cited passages |
| `knowledge_index` | Index the workspace (`target: "workspace"`), or create or update a named collection from `paths`; runs in the background when DSH jobs are available |
| `knowledge_status` | List collections, their counts, embedding model, staleness, and the active models |
| `knowledge_remove` | Delete a collection's index, or only some files from it |

The plugin's system prompt tells the model to search first for questions about documents and for paraphrased wording, and to use file search for code. Measured in DSH with `deepseek-flash` ([eval/README.md](eval/README.md)):
- From the prompt alone, the model rarely called `knowledge_search`.
- Forcing the call (`search.enforce: docs`) or attaching hits (`prefetch`) did not help, so `search.enforce` is off by default.
- What helped was the routing rule delivered as agent instructions. `search.instructions` (on by default, active once a semantic index exists) sends it the way DSH sends AGENTS.md. Doc-fact questions then took about 0.78× the time, paraphrased ones about 0.75× the tokens, and code questions were unchanged within noise.
- The same rule written in the project's or the user's `AGENTS.md` did slightly better. The rule text is in the Chinese README.

## Privacy

- The plugin never reads secrets (`.env*`, keys, `credentials`/`secrets` files), lockfiles, or binaries.
- It honours `.gitignore` and `.ragignore`, and it does not follow symlinks.
- With an online embedding model, every `knowledge_index` call asks for approval, names the endpoint the text goes to, and estimates the file and token count. With an online rerank model, queries and candidate passages go to that service.
- Keys are kept in DSH credentials, never in configuration files; the setup page shows only whether a key is set and cannot overwrite credentials other plugins stored.

## Develop

```bash
npm install
npm run check
PLUGIN_ENTRY=lib/index.js node --test test/plugin.test.ts
```

`lib/` is the bundled build output. Commit it, because git-source installs use the committed files.

## License

MIT. Licenses of the bundled third-party code are collected in `lib/THIRD_PARTY_NOTICES.md`.
