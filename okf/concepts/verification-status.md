---
type: Status Report
title: Verification status
description: What has been verified for the 0.1.0 release candidate, how, and what is still pending.
generated:
  by: process:doc-sync
  at: 2026-11-03T15:30:00+08:00
sources:
  - id: tests
    resource: ../../test/
    title: node --test suite
  - id: bench
    resource: ../../README.zh.md
    title: Chinese README, local benchmark section
---

# Verification status

State as of 2026-11-03, DSH Desktop 0.2.1-rc.5.

## Verified

- Typecheck and the `node --test` suite pass, including the plugin integration test on a real Cordis context and DSH `ToolRuntime`, run against both `src/` and the bundled `lib/`. It covers tool schemas, end-to-end index and search through a fake OpenAI-compatible server, DSH argument validation, the approval gate, the background-job path with a stand-in job service, and owner-only database files.[^tests]
- In a throwaway `DSH_HOME` headless profile: `link:` and pinned `git+file` installs pass the compatibility check, the bundle composes, and a model request carries the four `knowledge_*` tools and the prompt section.
- The bundle loads in DSH's Electron Node runtime, where FTS5 contentless delete works.
- The local llama-server backend indexes and searches a 349-file Markdown corpus; numbers are in the README benchmark section.[^bench]
- Published at https://github.com/Tokiki17/dsh-qwen-rag with tag `v0.1.0` on the release commit `957690a`. The raw `market/index.json` on `main` passes DSH's own `parseMarketIndex`, and both `github:Tokiki17/dsh-qwen-rag` and the index's pinned `git+https` source install and compose in a throwaway profile.

## Pending

- DashScope and SiliconFlow backends against the real services: needs the user's API keys.
- A real model session in DSH that calls the tools: needs a DeepSeek login or `DEEPSEEK_API_KEY` in the test profile.
- Background indexing through DSH's real jobs service, and installation through the Desktop plugin-market UI.

[^tests]: node --test suite
[^bench]: Chinese README, local benchmark section
