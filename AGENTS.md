# dsh-qwen-rag

A DeepSeek Harness (DSH) plugin bundle: Qwen embedding + rerank RAG over the workspace and named collections. User docs: [README.md](README.md) / [README.zh.md](README.zh.md); design and research: [docs/research.zh.md](docs/research.zh.md); project knowledge: [okf/index.md](okf/index.md).

## Commands

```bash
npm install
npm run check                                        # tsc --noEmit + node --test + esbuild bundle to lib/
QWEN_RAG_ENTRY=lib/index.js node --test test/plugin.test.ts   # same integration test against the bundle
scripts/local-models.sh start|stop|status            # local llama-server backend on :8081/:8082
node scripts/bench-local.ts <folder> <tmp-store> "query"      # local backend benchmark
node scripts/market-index.mjs <release-commit>       # regenerate and validate market/index.json
```

## Rules that the code does not show

- Source runs directly on Node 24 type stripping: relative imports keep their `.ts` extension, and only erasable TypeScript syntax is allowed.
- `lib/` is committed build output. DSH installs git sources through pnpm with build scripts blocked, so rebuild (`npm run check`) and commit `lib/` with every source change.
- `@deepseek-ai/*` packages stay external and are listed as optional peer dependencies; the host supplies them. Do not bundle them or add native modules.
- Release order: `npm run check` → commit and tag → `node scripts/market-index.mjs <that commit>` → commit `market/index.json`. The index pins a 40-hex commit that must already contain `lib/index.js`.
- Never read or log API keys. Credentials are resolved by name through the DSH `credentials` service with an environment fallback; error messages redact URLs.
- Test DSH integration in a throwaway `DSH_HOME`, never a real profile.
- Homebrew llama.cpp on macOS 15 needs `GGML_METAL_BF16_DISABLE=1`; `scripts/local-models.sh` sets it.

## Documentation

After a confirmed change to behavior, configuration, tools, commands or verification status, update the affected README sections, `docs/research.zh.md`, and the OKF bundle under `okf/` (concepts, coverage manifest, `log.md`) in the same change, then validate the bundle with the doc-sync skill's `validate_okf.py --doc-sync-profile`.
