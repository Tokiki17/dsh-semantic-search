# Update log

## 2026-11-03

- Retrieval evaluation (`eval/`) on RogueReborn with Codex and DSH.
  - The system prompt now routes doc and paraphrase questions to `knowledge_search` and code to file search.
  - Added `search.enforce` (`off` by default; `remind`, `docs`, `prefetch`).
  - Added `search.instructions` (on by default), which sends the routing rule as an agent-instructions message.
  - Recorded the results in the architecture, verification and coverage concepts.

- 0.2.0: renamed to Semantic Search (`@tokiki/dsh-semantic-search`, row `semantic-search`); split the model roles into `embedding.source` / `rerank.source` with a keyword-only default; added plugin-managed local llama.cpp models, the `semanticSearch` setup service and the web setup page. Rewrote the architecture, model sources, coverage and verification concepts accordingly.

- Published 0.1.0 to GitHub (tag `v0.1.0`) and verified the remote market index and GitHub installs.
- Created the bundle: architecture, backends, verification status and coverage manifest concepts.
- Recorded the measured local llama-server benchmark and the verification boundary for the 0.1.0 release candidate.
