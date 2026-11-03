# dsh-semantic-search

A DeepSeek Harness (DSH) plugin bundle, "Semantic Search" (`@tokiki/dsh-semantic-search`, renamed from `@tokiki/dsh-qwen-rag` in 0.2): hybrid keyword + embedding + rerank search over the workspace and named collections, with a web setup page and plugin-managed local llama.cpp models. User docs: [README.md](README.md) / [README.zh.md](README.zh.md); design and research: [docs/research.zh.md](docs/research.zh.md); project knowledge: [okf/index.md](okf/index.md).

## Layout

- `src/` host plugin (`lib/index.js`); `src/local/` llama.cpp runtime, model downloads and llama-server processes; `src/service.ts` + `src/typert.ts` the `semanticSearch` RPC for the setup page (`lib/typert.js`).
- `src/client/` browser half (`lib/client.js`, React from the host), type-checked by its own `src/client/tsconfig.json`.

## Commands

```bash
npm install
npm run check                                        # tsc (host + client) + node --test + esbuild bundle to lib/
PLUGIN_ENTRY=lib/index.js node --test test/plugin.test.ts   # same integration test against the bundle
scripts/local-models.sh start|stop|status            # dev-only llama-server on :8081/:8082 for the benchmark
node scripts/bench-local.ts <folder> <tmp-store> "query"      # local backend benchmark
node scripts/market-index.mjs <release-commit>       # regenerate and validate market/index.json
```

## Rules that the code does not show

- Source runs directly on Node 24 type stripping: relative imports keep their `.ts` extension, and only erasable TypeScript syntax is allowed.
- `lib/` is committed build output. DSH installs git sources through pnpm with build scripts blocked, so rebuild (`npm run check`) and commit `lib/` with every source change.
- `@deepseek-ai/*` packages stay external and are listed as optional peer dependencies; the host supplies them. Do not bundle them or add native modules. The client bundle also leaves `react` to the host's module loader.
- The client's remote descriptors must mirror `src/typert.ts` (namespace, `invocation`, `parameters` even when empty); the DSH gateway rejects the client module otherwise, and the web boot only reports "failed" (the client logs the cause to the console).
- Release order: `npm run check` → commit and tag → `node scripts/market-index.mjs <that commit>` → commit `market/index.json`. The index pins a 40-hex commit that must already contain `lib/index.js`.
- Never read or log API keys. Credentials are resolved by name through the DSH `credentials` service with an environment fallback; error messages redact URLs. The setup page may only write credential names the config references or a name nothing holds yet.
- Test DSH integration in a throwaway `DSH_HOME`, never a real profile. `dsh web` caches client bundles per start and pnpm reuses an installed copy of the same version, so give each test install a unique version and restart the server.
- llama.cpp is pinned (`src/local/catalog.ts`) with per-asset sizes and sha256; update all of them together. llama-server is started with `GGML_METAL_BF16_DISABLE=1` (needed by Homebrew llama.cpp on macOS 15).

## Documentation

After a confirmed change to behavior, configuration, tools, commands or verification status, update the affected README sections, `docs/research.zh.md`, and the OKF bundle under `okf/` (concepts, coverage manifest, `log.md`) in the same change, then validate the bundle with the doc-sync skill's `validate_okf.py --doc-sync-profile`.
