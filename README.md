# @tokiki/dsh-qwen-rag

English | [中文](README.zh.md)

A Qwen RAG knowledge base for DeepSeek Harness (DSH). It searches the current workspace (code and docs) and any document folders you add (Markdown, text, code, PDF, DOCX):

1. Qwen embeddings and SQLite FTS5 keyword search each retrieve candidates;
2. the two lists are fused with RRF;
3. a Qwen reranker reorders the fused list;
4. the plugin returns passages with `path:line` citations.

Pick one backend:

- **Alibaba Cloud Model Studio (default)**: `qwen3.7-text-embedding` + `qwen3.7-text-rerank` through the native DashScope API, with query/document typing and instructions.
- **OpenAI-compatible**: a local llama-server running the Qwen3-Embedding / Qwen3-Reranker GGUF files (nothing leaves the machine), or a hosted provider such as SiliconFlow.

Research notes (Chinese): [docs/research.zh.md](docs/research.zh.md).

## Install

You need DSH 0.2.1-rc.5 or newer (`engines.dsh: >=0.2.1-rc.5 <0.3.0`). The package has no native modules and runs no install scripts.

- **Plugin market:** add `https://raw.githubusercontent.com/Tokiki17/dsh-qwen-rag/main/market/index.json` under Plugins → Discover, then install "Qwen RAG knowledge base".
- **CLI:**

  ```bash
  dsh plugin --profile desktop add github:Tokiki17/dsh-qwen-rag
  ```

- **Local checkout:**

  ```bash
  dsh plugin --profile desktop add link:/path/to/dsh-qwen-rag
  ```

## Configure

Override the `qwen-rag` row in your profile's `cordis.patch.yml`.

- **Model Studio:** store `DASHSCOPE_API_KEY` in DSH credentials or in `<DSH home>/.env`. Set `dashscope.baseURL` to `https://dashscope-intl.aliyuncs.com` for Singapore.
- **Local llama-server:** run the script below, then set `backend: openai-compatible` and `openaiCompatible.preset: local`. Use `QWEN_RAG_EMBED_SIZE=4b` or `8b` for larger embedding models.

  ```bash
  brew install llama.cpp
  scripts/local-models.sh start
  ```

- **SiliconFlow:** set `openaiCompatible.preset: siliconflow` (Qwen3 4B models, key `SILICONFLOW_API_KEY`). For any other service, use `custom` with your own URLs and models.

The other settings are `approval`, `rerank`, `storageDir`, and the `index.*` and `search.*` groups; see [src/config.ts](src/config.ts) and the Chinese README.

## Local benchmark

Measured on an Apple M4 (16 GB, macOS 15.7) with Homebrew llama.cpp 0.8.0, the two 0.6B Q8_0 models and `QWEN_RAG_CTX=8192`. The corpus was 349 Markdown files (6.2 M characters, half Chinese) from the DSH docs.

- **First index:** 11,205 chunks in 24.3 min, about 7.7 chunks/s. Later runs only re-embed changed files.
- **Index size:** 58 MB.
- **Memory:** about 1.7 GB for the embedding server and 1.6 GB for the rerank server. With `QWEN_RAG_CTX=2048` each server uses about 1.0 GB.
- **Query latency:** 31–176 ms with fusion only, 1.3–2.0 s when reranking 15 candidates, and 2.8–3.8 s when reranking 30 (the default). Set `search.rerankCandidates: 15` or `rerank: false` for faster answers.

All five test queries returned the matching section first when rerank was on. Full numbers are in the Chinese README.

## Tools

| Tool | Purpose |
|---|---|
| `knowledge_search` | Hybrid search over the workspace and the named collections, returning cited passages |
| `knowledge_index` | Index the workspace (`target: "workspace"`), or create or update a named collection from `paths`; runs in the background when DSH jobs are available |
| `knowledge_status` | List collections, their counts, embedding model, staleness, and the active backend |
| `knowledge_remove` | Delete a collection's index, or only some files from it |

## Privacy

- The plugin never reads secrets (`.env*`, keys, `credentials`/`secrets` files), lockfiles, or binaries.
- It honours `.gitignore` and `.ragignore`, and it does not follow symlinks.
- With a remote backend, every `knowledge_index` call asks for approval and names the endpoint the text goes to.

## Develop

```bash
npm install
npm run check
QWEN_RAG_ENTRY=lib/index.js node --test test/plugin.test.ts
```

`lib/` is the bundled build output. Commit it, because git-source installs use the committed files.

## License

MIT. Licenses of the bundled third-party code are collected in `lib/THIRD_PARTY_NOTICES.md`.
