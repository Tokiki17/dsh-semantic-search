---
type: Coverage Manifest
title: Coverage manifest
description: Maps each project concern to its authoritative source, OKF concept, status and known gaps.
generated:
  by: process:doc-sync
  at: 2026-11-03T14:44:13+08:00
---

# Coverage manifest

| Concern | Authoritative source | Concept | Status | Gaps |
|---|---|---|---|---|
| Install, configure, tools, privacy | [README.zh.md](../../README.zh.md), [README.md](../../README.md) | [Backends](backends.md) | current | — |
| Plugin structure and retrieval pipeline | [src/](../../src/index.ts), [docs/research.zh.md](../../docs/research.zh.md) §6 | [Architecture](architecture.md) | current | — |
| Model choice, local sizing, other providers | [docs/research.zh.md](../../docs/research.zh.md) §2, §4, §5 | [Backends](backends.md) | current | 4B/8B local sizes are estimates, not measured |
| Measured local performance | [README.zh.md](../../README.zh.md) local benchmark section | [Verification status](verification-status.md) | current | single machine only |
| What has and has not been verified | — | [Verification status](verification-status.md) | current | cloud backends and a real model session are pending |
| Build, test, release commands and repo rules | [AGENTS.md](../../AGENTS.md) | — | current | — |
| Market distribution | [scripts/market-index.mjs](../../scripts/market-index.mjs), `market/index.json` | [Verification status](verification-status.md) | pending publish | GitHub repository not created yet |
