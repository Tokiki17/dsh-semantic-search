---
type: Coverage Manifest
title: Coverage manifest
description: Maps each project concern to its authoritative source, OKF concept, status and known gaps.
generated:
  by: process:doc-sync
  at: 2026-11-04T20:00:00+08:00
---

# Coverage manifest

| Concern | Authoritative source | Concept | Status | Gaps |
|---|---|---|---|---|
| Install, configure, upgrade from 0.1 and 0.2.0, tools, privacy | [README.zh.md](../../README.zh.md), [README.md](../../README.md) | [Model sources](backends.md) | current (0.2.1) | — |
| Plugin structure, retrieval pipeline, setup page | [src/](../../src/index.ts), [docs/research.zh.md](../../docs/research.zh.md) §6 | [Architecture](architecture.md) | current | DSH web UI APIs are undocumented upstream |
| Model sources, local runtime and downloads | [src/config.ts](../../src/config.ts), [src/local/](../../src/local/catalog.ts), [docs/research.zh.md](../../docs/research.zh.md) §4 | [Model sources](backends.md) | current | Linux/Windows local runtime not tested on hardware |
| Model choice, local sizing, other providers | [docs/research.zh.md](../../docs/research.zh.md) §2, §4, §5 | [Model sources](backends.md) | current | 4B/8B local sizes are estimates, not measured |
| Measured local performance | [README.zh.md](../../README.zh.md) local benchmark section | [Verification status](verification-status.md) | historical (0.1, Homebrew llama.cpp) | not re-measured with the bundled b11765 runtime |
| Whether models use the tool; search steering | [eval/README.md](../../eval/README.md), [src/enforce.ts](../../src/enforce.ts), [docs/research.zh.md](../../docs/research.zh.md) §8 | [Architecture](architecture.md), [Verification status](verification-status.md) | current (released in 0.2.1) | Claude Code and models other than deepseek-flash not measured |
| Accuracy on large corpora (grep vs semantic search) | [eval/README.md](../../eval/README.md) | [Verification status](verification-status.md) | current (evaluation; not a shipped feature) | one model; 0.6B embedding only |
| Token ledger: where DSH run tokens go | [eval/README.md](../../eval/README.md) token ledger section, [eval/ledger.ts](../../eval/ledger.ts) | [Product direction](direction.md) | current (2026-11-04 eval runs) | Q&A runs only; per-call sizes approximate (log caps results at 8,192 characters) |
| Product direction: retrieval-augmented context layer and roadmap | [docs/research.zh.md](../../docs/research.zh.md) §9 | [Product direction](direction.md) | planned, not implemented; P0 ledger and hook check done | ledger covers Q&A eval runs only (no real sessions, no build/test output); no task-level evaluation or prototype yet; plugin access to `dsh-session-query` untested; naming and data boundary undecided |
| What has and has not been verified | — | [Verification status](verification-status.md) | current | cloud sources and a real model session are pending |
| Build, test, release commands and repo rules | [AGENTS.md](../../AGENTS.md) | — | current | — |
| Market and npm distribution | [scripts/market-index.mjs](../../scripts/market-index.mjs), [market/index.json](../../market/index.json) | [Verification status](verification-status.md) | 0.1.0 published; 0.2.0 pending release | npm publish and dshopen listing pending |
