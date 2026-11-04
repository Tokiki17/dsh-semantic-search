---
type: Decision
title: "Next direction: conversation memory"
description: Why the plugin's next focus moves from workspace document search to raw-turn retrieval over past sessions and compacted context.
generated:
  by: process:doc-sync
  at: 2026-11-04T14:00:00+08:00
sources:
  - id: research
    resource: ../../docs/research.zh.md
    title: Research notes, §9 (next direction)
  - id: eval
    resource: ../../eval/README.md
    title: Retrieval evaluation, large-corpus accuracy results
  - id: benchmark
    resource: https://github.com/Ornn8/memory-system-benchmark
    title: 大肥鱼 memory-system benchmark (2026-11-01)
---

# Next direction: conversation memory

Decided 2026-11-04 by the project owner. The full reasoning and plan are in [docs/research.zh.md](../../docs/research.zh.md) §9.

**Decision:** the plugin's next focus is conversation memory. It will retrieve original turns from earlier sessions, and from context that compaction removed. Workspace document search stays as it is.

**Why:**
- **Our evaluation ([eval/README.md](../../eval/README.md)):** on Kubernetes docs and 14 Chinese novels, an agent with grep and unlimited tool calls answered every question, with or without the plugin. Semantic search helped a little at a 5-call budget and mainly saves time and tokens on doc questions.
- **The community memory benchmark:** a raw-turn retrieval baseline ("Qwen RAG": embed 40, rerank to 10, in time order, plus the last six turns) passed 574 of 687 shared questions. Memory plugins that summarize first scored at most 402. The losses are what summaries drop: corrections, hypotheticals, who said what, relative dates, and facts spread over many chats.
- **Both point the same way:** keeping the original text and retrieving it beats summarizing it, but retrieval adds little when the agent can read the original text itself. The gap is text the agent cannot grep. That covers past sessions, which DSH stores as zstd event logs, and turns already compacted out of the context. DSH's own `dsh-experimental-session-search` covers these with keyword search only.

**Open questions:**
- Whether to inject retrieved turns automatically. The model rarely calls search on its own, and it has no grep to fall back on for past turns.
- Which turns to index: user messages and final replies first.
- How to index session logs incrementally.

**Status:** planned. Nothing is implemented. The first step is a prototype that indexes DSH session logs as a collection. It will be scored on the benchmark's public sample (one fictional person, 360 turns, 108 questions) and on our own sessions.
