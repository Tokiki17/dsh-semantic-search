---
type: Architecture
title: Plugin architecture and retrieval pipeline
description: How the semantic-search plugin registers tools, stores collections, answers a search and serves its setup page.
generated:
  by: process:doc-sync
  at: 2026-11-03T17:11:17+08:00
sources:
  - id: research
    resource: ../../docs/research.zh.md
    title: Research report, sections 1 and 6
  - id: entry
    resource: ../../src/index.ts
    title: Plugin entry
  - id: kb
    resource: ../../src/kb.ts
    title: Knowledge base orchestration
  - id: store
    resource: ../../src/store.ts
    title: SQLite store
  - id: service
    resource: ../../src/service.ts
    title: Setup service and typert manifest
  - id: client
    resource: ../../src/client/index.tsx
    title: Browser half
---

# Plugin architecture and retrieval pipeline

The package is one DSH bundle whose [cordis.patch.yml](../../cordis.patch.yml) inserts a single plugin row, `semantic-search`. The entry registers four static tools (`knowledge_search`, `knowledge_index`, `knowledge_status`, `knowledge_remove`), one static system-prompt section, and a `tools/pre-execute` gate that asks for approval, with a file and token estimate, before `knowledge_index` sends text to an online embedding service.[^entry]

Each collection is one SQLite database (`node:sqlite`, no native addon) under `<DSH home>/semantic-search/` (moved from `qwen-rag/` on first start): the workspace collection is keyed by the nearest `.git` ancestor, and named collections live in `collections/<name>.db`. Directories are created `0700` and database files `0600`.[^store]

A search runs dense recall (brute-force cosine over a cached Float32 matrix) and FTS5 BM25 recall over a CJK-bigram projection, fuses them with RRF (k=60), reranks the shortlist when a rerank model is configured, and returns passages cited as `path:line` or `path p.N`. Without an embedding model, or for a collection built with another model, only keyword recall runs. Indexing is incremental (mtime/size, then sha256) and records the embedder id per collection (`keyword-only` when built without vectors).[^kb]

The setup page is the package's browser half (`./client`): it renders on the bundle's Plugins page through the `plugins.bundle.config` slot and calls the host `semanticSearch` service through the `./typert` manifest. That service reports state, tests a draft configuration with real requests, saves it with DSH's config editor (which hot-reloads the plugin), stores keys in DSH credentials, drives local model downloads, and rebuilds stale collections.[^service][^client]

The design rationale and the comparison with MCP or skill-based integration are in the research report.[^research]

[^entry]: Plugin entry
[^store]: SQLite store
[^kb]: Knowledge base orchestration
[^service]: Setup service and typert manifest
[^client]: Browser half
[^research]: Research report, sections 1 and 6
