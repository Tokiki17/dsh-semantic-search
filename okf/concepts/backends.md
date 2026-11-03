---
type: Configuration Reference
title: Model sources and local models
description: How the embedding and rerank sources are chosen, their defaults, and how the plugin manages local llama.cpp models.
generated:
  by: process:doc-sync
  at: 2026-11-03T17:11:17+08:00
sources:
  - id: config
    resource: ../../src/config.ts
    title: Config schema and source resolution
  - id: local
    resource: ../../src/local/catalog.ts
    title: Pinned llama.cpp and model catalog
  - id: readme-zh
    resource: ../../README.zh.md
    title: Chinese README, configuration section
  - id: research
    resource: ../../docs/research.zh.md
    title: Research report, sections 2, 4 and 5
---

# Model sources and local models

The two model roles are configured separately:[^config]

- `embedding.source`: `none` (default, keyword search only), `local`, `dashscope`, `siliconflow` or `custom`.
- `rerank.source`: `off` (default; reranking did not raise accuracy in the agent evaluations and slowed searches), `same` (follows the embedding source, off when that is `none`), or one of the four model sources. A `custom` service without `rerank.model` leaves reranking off when followed implicitly.

`dashscope` uses the native Model Studio endpoints (query/document typing and instructions); the other sources use OpenAI-compatible `/embeddings` and Jina/Cohere-style `/rerank`. A role counts as remote unless its URL is a loopback address; the local source always is. Keys are read by credential name (`providers.*.apiKeyEnv`) from DSH credentials, then the environment.

For `local`, the plugin downloads a pinned llama.cpp release and the Qwen3 GGUF models (0.6B/4B/8B embedding, 0.6B rerank) with sha256 checks, resumable downloads and mirror ranking, reuses complete files from the 0.1 cache, and starts llama-server per role on demand with an idle stop.[^local] Its embedder id matches the 0.1 local preset, so 0.1 local indexes stay valid.

Defaults, the parameter table and examples are maintained in the Chinese README.[^readme-zh] Model scores, local sizing and other providers are in the research report.[^research]

[^config]: Config schema and source resolution
[^local]: Pinned llama.cpp and model catalog
[^readme-zh]: Chinese README, configuration section
[^research]: Research report, sections 2, 4 and 5
