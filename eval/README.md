# Retrieval evaluation

Does adding semantic search to a coding agent improve accuracy, speed and token use? This folder holds the question set, a resident search daemon, a minimal MCP server, the runner and the scorer. None of it ships in the plugin.

```bash
node eval/daemon.ts <repo> 8790                      # index <repo> with local Qwen3 0.6B, serve searches (rerank on)
EVAL_RERANK=off node eval/daemon.ts <repo> 8791      # same store, rerank off
AGENT_BIN=<codex> node eval/run.ts <repo> eval/runs/<name> --reps 2 --jobs 4 [--configs A,B,C,D,E]
node eval/score.ts eval/runs/<name> [--overrides overrides.json]
```

| Config | Setup |
|---|---|
| A | Agent's own tools only (Codex: read-only shell with rg) |
| B | A + `knowledge_search` MCP tool, no instructions |
| C | B + routing instructions (the planned companion skill) |
| D | C with rerank off |
| E | D, but semantic search only for docs and paraphrased questions |

`questions.json` has 20 questions in four groups of five: A exact identifiers or literal strings, B code behaviour without names, C doc facts, D paraphrased or colloquial wording. Each question has reference answers and keypoints. Keypoint scoring is automatic. Answers that miss a keypoint are reviewed by hand, and the corrected scores go in an overrides file.

## Results 2026-11-03 (RogueReborn, Codex)

**Setup:**
- Repository: RogueReborn at 54 commits, 325 indexed text files, 3,068 chunks (Rust 23k lines, C 18k, Python 11k, GDScript 11k, Markdown 5k lines, mostly Chinese).
- Agent: Codex CLI 0.150.1 running `gpt-5.6-sol` at medium reasoning effort, with `--ignore-user-config` and a read-only sandbox.
- Search: Qwen3-Embedding 0.6B Q8_0 for embeddings; Qwen3-Reranker 0.6B Q8_0 reranking 15 candidates; top 6 results, snippets capped at 900 characters.
- Runs: 2 per question and config, 200 runs in total.
- Claude Code was not measured: its headless CLI was not logged in on this machine.

**Accuracy:** every one of the 200 answers was correct after manual review. The questions did not separate the configurations.

**Noise level:** the same question in config A varied by 3.8 s and 20% in tokens between its two runs. Config B never called the tool, so its gap from A is noise too; it reached +13% in uncached tokens.

Mean change from A:

| Group | Config | Time | Total tokens | Uncached tokens | Searches per run |
|---|---|---|---|---|---|
| A exact | C | +13% | +32% | +37% | 0.2 |
| | D | +11% | +25% | −19% | 0.3 |
| | E | +3% | +12% | +38% | 0.1 |
| B code behaviour | C | +18% | +22% | +7% | 1.0 |
| | D | +3% | +54% | +17% | 1.0 |
| | E | −6% | +19% | +22% | 0.3 |
| C doc facts | C | +11% | −19% | −46% | 1.0 |
| | D | −7% | −3% | −45% | 1.0 |
| | E | −1% | −3% | −22% | 1.0 |
| D paraphrased | C | +3% | −24% | −45% | 1.0 |
| | D | −16% | −14% | −34% | 1.0 |
| | E | −12% | −13% | −21% | 0.6 |
| All | C | +11% | −1% | −22% | 0.8 |
| | D | −3% | +14% | −25% | 0.8 |
| | E | −4% | +2% | −3% | 0.5 |

**Findings:**
- **Codex does not use an MCP tool on its own.** It defers MCP tools behind a tool catalog; in config B it called the tool 0 times in 40 runs. The tool needs instructions (a skill or AGENTS.md text) to matter, and it needs `default_tools_approval_mode = "approve"` to run under `approval_policy = "never"`.
- **Docs and paraphrased questions gain.** One search replaced about two rg-and-read rounds, and uncached tokens fell 34–46%, beyond the noise. With rerank off (D), time also fell 7–16%.
- **Code questions lose.** For code behaviour the agent still ran rg as often as before and added the search on top, so total tokens rose 19–54%. A rule that kept semantic search off code (E) removed most of the time cost but not the token cost.
- **Rerank costs time without raising accuracy here.** It made the median search about 3.0 s, compared with about 0.03 s without it.
- **Not a Pareto improvement overall.** With accuracy tied, semantic search wins on docs and paraphrased questions and loses on code questions. In this repository and agent, a strict Pareto gain needs routing that sends only doc questions to semantic search, with rerank off.

**Limits:**
- 10 runs per cell.
- Accuracy hit the ceiling, so harder questions or a larger repository are needed to measure any accuracy gain.
- One agent and one model.
- AGENTS.md in the target repository is loaded in every configuration.

## Results 2026-11-03 (RogueReborn, DSH)

**Setup:**
- Same question set and repository.
- Agent: DSH 0.2.1-rc.5 headless (`dsh --profile eval-* headless --json`), model `deepseek-flash`, all profiles in a throwaway `DSH_HOME`.
- Plugin: P and Q reach resident llama-server processes (`scripts/local-models.sh`) through the custom source, so their embedder id matches the existing index.
- Runs: 2 per question and config; A, P and Q on all 20 questions, R on the 10 doc and paraphrase questions. 140 runs in total.

| Config | Setup |
|---|---|
| A | headless profile, no plugin |
| P | released 0.2.0: the prompt says to search first for code and docs; rerank on, 30 candidates |
| Q | working-tree plugin: docs-first prompt, code questions go to file search; rerank off |
| R | Q plus an explicit routing rule in AGENTS.md (`DSH_AGENTS_HOME`) |

**Accuracy:** every answer was correct after manual review.

**Noise is larger than with Codex:**
- DeepSeek used about 15 tool calls per question, against Codex's 3.
- Means are pulled by a few long runs: one A run took 209 s with a background grep job.
- P and Q swung by ±25–35% from A even in groups where they never searched, so read medians and treat smaller changes as noise.

**Tool use:**
- P called `knowledge_search` once in 40 runs; Q called it 3 times in 40.
- Both prompts did reach the model: asked to quote them, the agent did.
- R called it in 16 of 20 runs.

Change from A on the doc and paraphrase questions (median / mean):

| Group | Config | Time | Total tokens | Tool calls |
|---|---|---|---|---|
| C doc facts | R | −32% / −26% | −48% / −55% | 7.8 vs 14.5 |
| D paraphrased | R | −14% / −13% | +45% / +22% | 15.8 vs 15.0 |

**Findings:**
- **With the plugin's prompt alone, DeepSeek in DSH barely uses semantic search,** under both the 0.2.0 wording and the docs-first wording. The plugin has almost no effect, positive or negative, until a project or user instruction asks for it.
- **When used for doc facts, it is a clear Pareto gain:** same accuracy, about a third faster, half the tokens, half the tool calls. The gain exceeds what Codex showed, because DeepSeek's grep-and-read exploration is longer.
- **Paraphrased questions are mixed.** The search ran, but the agent kept exploring with grep afterwards (D3 used 23–26 tool calls), so time fell slightly while tokens rose.

## Results 2026-11-03 (DSH, plugin-side steering)

The plugin gained `search.enforce`:
- `docs`: refuses the first grep of indexed docs in a turn and points to `knowledge_search`.
- `prefetch`: searches each user message and attaches the document hits.

Two more configurations measured them, under the same setup as above:

| Config | Setup |
|---|---|
| G | working tree, `enforce: docs` |
| F | working tree, `enforce: prefetch` |

A and R also got two more runs on the doc and paraphrase questions, for 4 runs per question.

**Accuracy:** every answer was correct.

**G: the gate fired, but nothing was gained.**
- The gate fired 37 times in 40 runs, and the model called `knowledge_search` 1.0 times per run.
- It then kept grep-ing. On doc facts, median time was +18% and tokens +4%; on paraphrased questions, tokens were +33%.

**F: mixed.**
- The prefetched hits were attached and read.
- On doc facts, tokens were −8% at the median and −21% on the mean.
- On paraphrased questions, time was +94% and tokens +81% at the median.

**R: a real gain on doc facts.** With 4 runs per question, R against A on the doc and paraphrase questions:

| Group | Time | Total tokens | Tool calls |
|---|---|---|---|
| C doc facts | −25% median; per question 0.74 (95% CI 0.64–0.85) | −25% median; per question 0.71 (CI 0.57–0.82) | 8.6 vs 14.3 |
| D paraphrased | −31% median; per question 0.80 (CI 0.61–1.03) | −13% median; per question 0.98 (CI 0.70–1.30) | 14.4 vs 16.6 |

The per-question figure is the mean of per-question median ratios, with a bootstrap over questions. On doc facts all five questions got faster and cheaper, which is a Pareto gain. Paraphrased questions came out neutral.

**Conclusions:**
- **The same instruction works from AGENTS.md but not from the plugin.** In the plugin's system-prompt section (Q) it is ignored, and forcing the tool call (G) or attaching hits (F) does not change how the model explores. Written in the agent instructions (R), it does.
- **Default stays off.** `search.enforce` defaults to `off`; `remind`, `docs` and `prefetch` remain opt-in. The README recommends the AGENTS.md routing rule instead.
- **Next test:** have the plugin contribute that rule through the agent-instructions channel rather than its system-prompt section.

## Results 2026-11-03 (DSH, routing rule from the plugin)

**What I does:** `search.instructions` makes the plugin deliver the routing rule the way DSH delivers AGENTS.md: a user-role `<system-reminder>` message with form `instructions`, once per agent, when the workspace has a semantic index.

**Runs:**
- Config I (working tree, `instructions: true`, `enforce: off`): all 20 questions, 4 runs each.
- A and R: brought to 4 runs on the code questions too.

**Accuracy:** every answer was correct after review.

Per-question ratio against A (mean of per-question median ratios, with a bootstrapped 95% CI):

| Group | R time | R tokens | I time | I tokens |
|---|---|---|---|---|
| A exact | 0.86 [0.54–1.15] | 0.80 [0.65–0.98] | 1.02 [0.56–1.58] | 1.25 [0.87–1.80] |
| B code behaviour | 0.85 [0.67–1.09] | 0.72 [0.59–0.86] | 0.92 [0.66–1.17] | 1.01 [0.74–1.28] |
| C doc facts | 0.74 [0.64–0.85] | 0.71 [0.57–0.82] | 0.78 [0.67–0.94] | 0.84 [0.67–1.02] |
| D paraphrased | 0.80 [0.60–1.00] | 0.98 [0.70–1.29] | 0.78 [0.57–1.09] | 0.75 [0.59–0.90] |

**Findings:**
- **I captures most of R's gain on doc and paraphrased questions without any user setup.** Doc facts are faster, and paraphrased questions use fewer tokens; both changes exceed the noise.
- **On code questions I is within noise.** A exact leans toward more tokens, but its interval includes 1.
- **R also helped on code questions.** Its rule's "use grep and read directly" half shortened exploration: B tokens 0.72. The plugin's rule, though identical in text, did not reproduce this.
- **`search.instructions` now defaults to on.** It only acts once a semantic index exists, that is, after the user has chosen a model and built one. The AGENTS.md rule stays the stronger option and is still recommended.

**Limits:**
- The rule is sent once per agent and is not re-sent after compaction.
- Results come from one repository and one model.
