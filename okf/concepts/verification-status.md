---
type: Status Report
title: Verification status
description: What has been verified for 0.2.0 (and earlier for 0.1.0), how, and what is still pending.
generated:
  by: process:doc-sync
  at: 2026-11-03T17:11:17+08:00
sources:
  - id: tests
    resource: ../../test/
    title: node --test suite
  - id: bench
    resource: ../../README.zh.md
    title: Chinese README, local benchmark section
---

# Verification status

State as of 2026-11-03, DSH 0.2.1-rc.5.

## Verified for 0.2.0

- Typecheck (host and client programs) and the `node --test` suite pass, also against the bundled `lib/`. Beyond the 0.1 coverage it checks model-source resolution, keyword-only indexing and search, the move of a 0.1 store, resumable downloads with mirror fallback and sha256 rejection, llama-server start/restart/idle-stop with a stand-in executable, and the setup service against its typert manifest (draft tests, config writes, key writes that never overwrite another credential).[^tests]
- With the real components: the plugin downloaded the llama.cpp b11765 macOS arm64 runtime from GitHub, reused the 0.1 cached 0.6B models, started both llama-servers, and returned correct embeddings and rerank order; unloading stopped the processes.
- In a throwaway `DSH_HOME` running `dsh web` from a packed tarball: the client module starts, the setup page renders on the bundle page, and two flows completed in the browser: a custom online service (a local fake server requiring a test key; key stored only in the credential file, connection tests passed, patch written) and local embedding with rerank off (runtime downloaded from the page, local test started llama-server inside DSH, saved, no server left after the reload).
- A throwaway headless profile still composes with the plugin installed.

## Verified for 0.1.0 (historical)

- Published at https://github.com/Tokiki17/dsh-qwen-rag (tag `v0.1.0`, commit `957690a`); the raw market index passed DSH's `parseMarketIndex`, and GitHub installs composed in a throwaway profile.
- Local benchmark on a 349-file Markdown corpus with Homebrew llama.cpp; numbers are in the README.[^bench]

## Pending

- DashScope and SiliconFlow sources against the real services: needs the user's API keys.
- A real model session in DSH that calls the tools: needs a DeepSeek login or `DEEPSEEK_API_KEY` in the test profile.
- The setup page's background rebuild of stale collections in a live host, background indexing through DSH's real jobs service, and installation through the Desktop plugin-market UI.
- Local runtime on Linux and Windows hardware.
- The 0.2.0 release itself: repository rename, tag, market index, npm publish and the dshopen listing.

[^tests]: node --test suite
[^bench]: Chinese README, local benchmark section
