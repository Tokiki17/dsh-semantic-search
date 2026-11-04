# Update log

## 2026-11-04

- Published 0.2.1 (tag `v0.2.1`, market index at `a69cc2e`) and verified the remote market index and a GitHub install in a throwaway profile. Updated the verification concept and the distribution coverage row.
- 0.2.1 release: search steering (`search.instructions` on, `search.enforce` off), rerank off by default with 15 candidates, and the `Store.open` lock fix. Added upgrade notes from 0.2.0 to both READMEs; updated the verification concept and coverage rows.
- P0 of the new direction: added `eval/ledger.ts` and its results (exploration steps, not large outputs, dominate tokens), and recorded the DSH hook findings (`tools/post-execute` can replace output; built-in spill policy and pruner). Lowered tool-output offloading in the roadmap. Updated the direction concept and coverage manifest.
- Revised the product direction: from a semantic search tool to a retrieval-augmented context layer for DSH (memory, tool-output offloading, experience retrieval, dependency docs, repository map; document search kept). Rewrote research §9 and the direction concept, and updated the index and coverage row.
- Accuracy evaluation on Kubernetes docs and Chinese novels, with an eval-only tool budget plugin and a `sandbox-exec` wrapper that hides answer keys from the agent (`eval/budget-plugin`, `eval/sandbox.sb`, `eval/sbx-dsh.sh`, `eval/cite.ts`). Updated the verification concept.
- Recorded the next direction, conversation memory (raw-turn retrieval over past sessions and compacted context), with its evidence: our accuracy evaluation and the community memory benchmark. Added the direction concept and coverage rows.

## 2026-11-03

- Second-repository evaluation (TileFillerBoardGenerator, baseline R): `search.instructions` now re-sends the rule when compaction removes it; rerank is off by default and `search.rerankCandidates` defaults to 15; `Store.open` sets `busy_timeout` before WAL. Updated the architecture and verification concepts.

- Retrieval evaluation (`eval/`) on RogueReborn with Codex and DSH.
  - The system prompt now routes doc and paraphrase questions to `knowledge_search` and code to file search.
  - Added `search.enforce` (`off` by default; `remind`, `docs`, `prefetch`).
  - Added `search.instructions` (on by default), which sends the routing rule as an agent-instructions message.
  - Recorded the results in the architecture, verification and coverage concepts.

- 0.2.0: renamed to Semantic Search (`@tokiki/dsh-semantic-search`, row `semantic-search`); split the model roles into `embedding.source` / `rerank.source` with a keyword-only default; added plugin-managed local llama.cpp models, the `semanticSearch` setup service and the web setup page. Rewrote the architecture, model sources, coverage and verification concepts accordingly.

- Published 0.1.0 to GitHub (tag `v0.1.0`) and verified the remote market index and GitHub installs.
- Created the bundle: architecture, backends, verification status and coverage manifest concepts.
- Recorded the measured local llama-server benchmark and the verification boundary for the 0.1.0 release candidate.
