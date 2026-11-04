---
type: Decision
title: "Product direction: a retrieval-augmented context layer for DSH"
description: Why the product moves from a semantic search tool to a context layer that injects what grep cannot reach, and the planned modules and order.
generated:
  by: process:doc-sync
  at: 2026-11-04T16:00:00+08:00
sources:
  - id: research
    resource: ../../docs/research.zh.md
    title: Research notes, §9 (product direction and roadmap)
  - id: eval
    resource: ../../eval/README.md
    title: Retrieval evaluation results
  - id: benchmark
    resource: https://github.com/Ornn8/memory-system-benchmark
    title: 大肥鱼 memory-system benchmark (2026-11-01)
---

# Product direction: a retrieval-augmented context layer for DSH

Revised 2026-11-04 by the project owner. It replaces the same day's earlier decision that conversation memory alone was the next focus; memory is now one module of the new direction. The full reasoning, module list and roadmap are in [docs/research.zh.md](../../docs/research.zh.md) §9.

**Goal:** use RAG to make DSH task execution faster, more capable and cheaper in tokens, in any scenario.

**Decision:** the product is a retrieval-augmented context layer, not a search tool the model has to choose to call. The plugin decides what to put into context and when, delivered through the agent-instructions channel, so that the agent explores less, rereads less and forgets less.

**Why:**
- In our evaluation ([eval/README.md](../../eval/README.md)), grep with unlimited tool calls answered every question on large corpora. Semantic search mainly saved time and tokens on doc questions.
- Given only a tool, the model rarely used it, and forcing the call or prefetching hits did not help. Only rules sent through the agent-instructions channel changed its behaviour.
- On code questions the search added tokens, because the agent kept grep-ing anyway.
- Tokens go mostly into exploration: about 15 tool calls per question for DeepSeek against 3 for Codex.
- The community memory benchmark shows that retrieving raw turns beats summarizing them first.

**Principle:** use retrieval where the agent has no other way to get the information, inject it in small amounts, and do not lead with what grep already covers.

**Planned modules**, in priority order (only the last exists today):
1. Conversation and project memory, after compaction and across sessions.
2. Tool-output offloading: large outputs go into an index, and only a summary and location go into context.
3. Experience retrieval: past solutions to similar tasks, and past fixes for the same error.
4. Version-matched dependency docs.
5. A compact repository map, replacing embedding search over code.
6. Workspace document search, as it is now.

**Roadmap:**
- **P0:** measure where tokens go in real DSH sessions, and move evaluation from Q&A to multi-step tasks.
- **P1:** offloading and memory, on shared storage. This first needs a check of whether `tools/post-execute` can replace tool output; so far it is only known to append.
- **P2:** experience retrieval and dependency docs.
- **P3:** the repository map, and further work on document search.

**Open questions:** whether to rename the product again; whether to change DSH itself if the hooks cannot replace output; and the data boundary for stored turns and command output (proposed: local only, per project).

**Status:** planned. None of modules 1–5 is implemented or measured.
