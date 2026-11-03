---
type: Architecture
title: Plugin architecture and retrieval pipeline
description: How the qwen-rag Cordis plugin registers tools, stores collections and answers a search.
generated:
  by: process:doc-sync
  at: 2026-11-03T14:44:13+08:00
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
---

# Plugin architecture and retrieval pipeline

The package is one DSH bundle whose [cordis.patch.yml](../../cordis.patch.yml) inserts a single plugin row, `qwen-rag`. The entry registers four static tools (`knowledge_search`, `knowledge_index`, `knowledge_status`, `knowledge_remove`), one static system-prompt section, and a `tools/pre-execute` gate that asks for approval before `knowledge_index` sends text to a remote backend.[^entry]

Each collection is one SQLite database (`node:sqlite`, no native addon) under `<DSH home>/qwen-rag/`: the workspace collection is keyed by the nearest `.git` ancestor, and named collections live in `collections/<name>.db`. Directories are created `0700` and database files `0600`.[^store]

A search runs dense recall (brute-force cosine over a cached Float32 matrix) and FTS5 BM25 recall over a CJK-bigram projection, fuses them with RRF (k=60), reranks the shortlist with the configured reranker, and returns passages cited as `path:line` or `path p.N`. Rerank input is capped at twice `index.chunkChars`, the same cap as the embedding input. Indexing is incremental (mtime/size, then sha256), records the embedder id per collection, and marks collections built with a different embedder as stale.[^kb]

The design rationale and the comparison with MCP or skill-based integration are in the research report.[^research]

[^entry]: Plugin entry
[^store]: SQLite store
[^kb]: Knowledge base orchestration
[^research]: Research report, sections 1 and 6
