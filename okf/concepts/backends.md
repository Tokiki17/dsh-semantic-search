---
type: Configuration Reference
title: Embedding and rerank backends
description: The two selectable backends, their presets, and where their configuration and sizing guidance live.
generated:
  by: process:doc-sync
  at: 2026-11-03T14:44:13+08:00
sources:
  - id: config
    resource: ../../src/config.ts
    title: Config schema and presets
  - id: readme-zh
    resource: ../../README.zh.md
    title: Chinese README, configuration section
  - id: research
    resource: ../../docs/research.zh.md
    title: Research report, sections 2, 4 and 5
---

# Embedding and rerank backends

`backend` selects one of two implementations:[^config]

- `dashscope` (default): Alibaba Cloud Model Studio native endpoints with `qwen3.7-text-embedding` and `qwen3.7-text-rerank`, query/document typing and instructions. The key comes from the credential named by `dashscope.apiKeyEnv`.
- `openai-compatible`: `/embeddings` plus a Jina/Cohere-style `/rerank`. Presets are `local` (llama-server on `127.0.0.1:8081` and `:8082`, started by [scripts/local-models.sh](../../scripts/local-models.sh)), `siliconflow` (Qwen3 4B models), and `custom`.

A backend is treated as remote unless its embedding URL is a loopback address; remote backends trigger the indexing approval under the default `approval: remote`.

Configuration examples and the parameter table are maintained in the Chinese README.[^readme-zh] Model scores, per-machine local sizing, and other providers are maintained in the research report;[^research] measured local resource use is in the README's local benchmark section.

[^config]: Config schema and presets
[^readme-zh]: Chinese README, configuration section
[^research]: Research report, sections 2, 4 and 5
