---
type: Status Report
title: Verification status
description: What has been verified for 0.2.1 and 0.2.0 (and earlier for 0.1.0), how, and what is still pending.
generated:
  by: process:doc-sync
  at: 2026-11-04T20:00:00+08:00
sources:
  - id: eval
    resource: ../../eval/README.md
    title: Retrieval evaluation
  - id: tests
    resource: ../../test/
    title: node --test suite
  - id: bench
    resource: ../../README.zh.md
    title: Chinese README, local benchmark section
---

# Verification status

State as of 2026-11-04, DSH 0.2.1-rc.5.

## Verified for 0.2.0

- Typecheck (host and client programs) and the `node --test` suite pass, also against the bundled `lib/`. Beyond the 0.1 coverage it checks model-source resolution, keyword-only indexing and search, the move of a 0.1 store, resumable downloads with mirror fallback and sha256 rejection, llama-server start/restart/idle-stop with a stand-in executable, and the setup service against its typert manifest (draft tests, config writes, key writes that never overwrite another credential).[^tests]
- With the real components: the plugin downloaded the llama.cpp b11765 macOS arm64 runtime from GitHub, reused the 0.1 cached 0.6B models, started both llama-servers, and returned correct embeddings and rerank order; unloading stopped the processes.
- In a throwaway `DSH_HOME` running `dsh web` from a packed tarball: the client module starts, the setup page renders on the bundle page, and two flows completed in the browser: a custom online service (a local fake server requiring a test key; key stored only in the credential file, connection tests passed, patch written) and local embedding with rerank off (runtime downloaded from the page, local test started llama-server inside DSH, saved, no server left after the reload).
- A throwaway headless profile still composes with the plugin installed.

## Retrieval evaluation (behind the 0.2.1 defaults)

On 2026-11-03, 20 questions over the RogueReborn repository were run against Codex (200 runs) and DSH with `deepseek-flash` (260 runs); every answer was correct in every configuration. Measured from the time and token use:[^eval]
- Without instructions the tool is rarely used.
- With 4 runs per question in DSH, a routing rule in `AGENTS.md` gives a Pareto gain on doc-fact questions in DSH: per question 0.74× time and 0.71× tokens.
- Paraphrased questions break even.
- Code questions cost 19–54% more tokens when routed to search.
- Rerank adds about 3 s per search with no accuracy gain on these questions.
- `search.enforce: docs` and `prefetch` were not better than no steering.
- The rule sent by the plugin through `search.instructions` captured most of the `AGENTS.md` gain: doc facts at 0.78× time, paraphrased questions at 0.75× tokens, code questions within noise.

A second repository (TileFillerBoardGenerator, DSH, baseline: the `AGENTS.md` rule) was measured on the same day:[^eval]
- With compaction forced every ~21k tokens, the re-sent plugin rule came back as often as DSH's AGENTS.md; the model made all its searches before the first compaction in every config, so no behaviour change was measurable.
- Rerank on made doc-fact questions 1.5× (15 candidates) to 2.0× (30) slower with no accuracy gain; rerank is now off by default (`rerank.source: off`) and `search.rerankCandidates` defaults to 15 when it is on.
- Concurrent store opens could fail with `database is locked`; fixed by setting `busy_timeout` before switching to WAL (covered by a 12-process test).

Accuracy on two large corpora (2026-11-04, DSH, agent sandboxed so it cannot read answer keys): Kubernetes docs (3,414 files, 53k chunks) and 14 Chinese novels (2.2M characters), 20 questions each, with an eval-only tool budget:[^eval]
- Unlimited tool calls: grep alone (XA), the plugin (XR) and the plugin with rerank (XRR) all scored 1.000 on both corpora.
- At 5 tool calls: XA 0.950 / 0.892 (novels / K8s), XR 0.968 / 0.939, XRR 0.988 / 0.953; only XRR on K8s is significantly ahead of XA. Rerank took about 2.5× XA's time on the novels and about the same on K8s.
- The first, unsandboxed closed-book screening read the answer keys and was discarded; earlier repositories had 1 such run in 825.

Not covered: Claude Code (its CLI was not logged in on this machine), embedding models larger than 0.6B, and DSH models other than `deepseek-flash`.

## Verified for 0.1.0 (historical)

- Published at https://github.com/Tokiki17/dsh-qwen-rag (tag `v0.1.0`, commit `957690a`); the raw market index passed DSH's `parseMarketIndex`, and GitHub installs composed in a throwaway profile.
- Local benchmark on a 349-file Markdown corpus with Homebrew llama.cpp; numbers are in the README.[^bench]

## Pending

- DashScope and SiliconFlow sources against the real services: needs the user's API keys.
- A real model session in DSH that calls the tools: needs a DeepSeek login or `DEEPSEEK_API_KEY` in the test profile.
- The setup page's background rebuild of stale collections in a live host, background indexing through DSH's real jobs service, and installation through the Desktop plugin-market UI.
- Local runtime on Linux and Windows hardware.
- GPU/NPU builds for Windows and Linux x64: the catalog pins only llama.cpp's CPU builds there (`win-cpu-x64`, `ubuntu-x64`). Release b11765 also ships Vulkan, SYCL (Intel GPU), OpenVINO (Intel CPU/GPU/NPU), CUDA and ROCm builds. Plan: add Vulkan with sizes and sha256 in `src/local/catalog.ts`, try it first and fall back to CPU, and offer SYCL/OpenVINO as an acceleration choice on the setup page. Needs real hardware, e.g. a 64 GB Intel Core Ultra (358H-class) laptop; whether OpenVINO runs the embedding and rerank models on the NPU is unverified.
- npm publish and the dshopen listing (0.2.0 and 0.2.1 were released as git tags with the market index only).

[^tests]: node --test suite
[^bench]: Chinese README, local benchmark section
[^eval]: Retrieval evaluation
