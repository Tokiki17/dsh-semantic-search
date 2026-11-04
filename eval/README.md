# Retrieval evaluation

Does adding semantic search to a coding agent improve accuracy, speed and token use? This folder holds the question set, a resident search daemon, a minimal MCP server, the runner and the scorer. None of it ships in the plugin.

```bash
node eval/daemon.ts <repo> 8790                      # index <repo> with local Qwen3 0.6B, serve searches (rerank on)
EVAL_RERANK=off node eval/daemon.ts <repo> 8791      # same store, rerank off
AGENT_BIN=<codex> node eval/run.ts <repo> eval/runs/<name> --reps 2 --jobs 4 [--configs A,B,C,D,E]
node eval/score.ts eval/runs/<name> [--overrides overrides.json]
# other question sets and long multi-question tasks (DSH)
EVAL_QUESTIONS=eval/questions-tfbg.json node eval/run.ts <repo> eval/runs/<name> --harness dsh --configs CR,CJ --bundles "B1,A2,C1,D2;…"
DSH_HOME=<home> EVAL_QUESTIONS=eval/questions-tfbg.json node eval/compaction.ts eval/runs/<name> "B1,A2,C1,D2;…"
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
- The rule was sent once per agent and lost after compaction; it is now re-sent (see the TileFillerBoardGenerator results below).
- Results come from one repository and one model.

## Results 2026-11-03 (TileFillerBoardGenerator, DSH, baseline R)

**Setup:**
- Second repository: TileFillerBoardGenerator at `0a336ea` (a `git archive` snapshot), .NET + Python, about 30k lines, 54 Markdown files, mostly Chinese; 159 indexed files, 2,054 chunks. Questions: [questions-tfbg.json](questions-tfbg.json), same four groups.
- Agent: DSH 0.2.1-rc.5 headless, `deepseek-flash`, throwaway `DSH_HOME`.
- Baseline is R: the routing rule in AGENTS.md (`DSH_AGENTS_HOME`), plugin `search.instructions: false`, rerank off.

### Experiment 1: the plugin's rule after compaction

`search.instructions` now checks the session's visible surface before every step and sends the rule again when it is missing, the way DSH's agent-instructions plugin re-sends AGENTS.md. The released version (fc04142) sent it once per agent, so compaction removed it.

Compaction was forced with `compaction-basic` at `thresholdRatio: 0.02` (about 21k tokens) and `retainTokens: 6000`. Each task asked four questions in one turn (code questions first, then doc and paraphrased ones), 5 tasks × 3 runs per config:

| Config | Setup |
|---|---|
| CR | R |
| CI1 | plugin rule as released in fc04142 (sent once) |
| CJ | plugin rule re-sent when missing (current) |

| Config | Compactions per run | Rule sends after compaction | `knowledge_search` after compaction | Time vs CR | Tokens vs CR | Accuracy |
|---|---|---|---|---|---|---|
| CR | 9.2 | 2.1 | 0 | 1 | 1 | 0.99 |
| CI1 | 10.5 | 0 | 0 | 1.28 [0.99–1.62] | 0.97 [0.83–1.11] | 0.99 |
| CJ | 8.0 | 2.1 | 0 | 1.06 [0.86–1.27] | 0.91 [0.69–1.14] | 0.99 |

Ratios are the mean of per-task median ratios against CR, with a bootstrapped 95% CI.

**Findings:**
- **The re-send works.** After compaction, CJ re-sent the rule exactly as often as DSH re-sent AGENTS.md in CR; CI1 never did.
- **It made no measurable difference to behaviour here.** In every config the model ran all of its `knowledge_search` calls before the first compaction: it planned the four searches up front. CJ landed closer to CR than CI1 did, but every interval includes 1.
- The change is kept because it is correct and it also fixes two edge cases: a resumed session (`--session-id`, a new agent object) no longer gets a duplicate rule, and an index that appears mid-session is picked up at the next user message.
- **A real bug surfaced.** One run's index check failed with SQLite `database is locked` after 11 ms: `Store.open` switched to WAL before setting `busy_timeout`, so concurrent processes opening the store (several sessions starting at once) could fail immediately. That is the likely reason the rule was missing from one pilot run. Fixed in `src/store.ts` (busy_timeout first; a 12-process test failed 3 of 60 opens before and 0 after), and a failed index check is now retried on the next step.

### Experiment 2: rerank candidates

R (rerank off) against R15 and R30 (Qwen3-Reranker 0.6B on, 15 or 30 candidates): 20 questions × 3 runs per config.

| Group | R15 time | R15 tokens | R30 time | R30 tokens |
|---|---|---|---|---|
| A exact | 0.80 [0.71–0.87] | 0.81 [0.66–0.95] | 1.04 [0.90–1.18] | 1.13 [0.81–1.54] |
| B code behaviour | 1.20 [0.79–1.69] | 1.13 [0.93–1.35] | 1.28 [0.72–2.16] | 1.11 [0.83–1.40] |
| C doc facts | 1.50 [1.16–1.95] | 0.95 [0.71–1.19] | 2.03 [1.57–2.59] | 1.27 [1.04–1.54] |
| D paraphrased | 1.34 [1.14–1.55] | 1.31 [1.13–1.47] | 1.60 [1.22–1.91] | 1.18 [0.87–1.44] |
| All | 1.21 [1.02–1.42] | 1.05 [0.92–1.18] | 1.49 [1.20–1.80] | 1.17 [1.02–1.32] |

**Accuracy:** R 60/60, R15 59.5/60, R30 59/60. The three partial answers were all D4, which gave the right mechanism but missed the concrete case (7x9 area 38, 281 short). The passage holding it never appeared in any config's search results, R's included; R's runs found it by grep afterwards. So the misses are not caused by reranking.

**Findings:**
- **Reranking made doc and paraphrased questions slower without improving accuracy.** Doc facts took 1.5× (15 candidates) and 2.0× (30) the time of no rerank. The A-group gain for R15 sits in a group that almost never searched (0.1 searches per run), so it is noise.
- **Fewer candidates are cheaper:** R30 against R15 is slower in every group that searches.
- **Defaults changed:** `rerank.source` now defaults to `off`, and `search.rerankCandidates` to 15 for those who turn it on. On both repositories rerank off was faster with equal accuracy.

**Limits:** 3 runs per cell; one model; in experiment 1 the forced threshold is far below real use, so compaction is much more frequent than it would be.

## Results 2026-11-04 (accuracy on large corpora, DSH, sandboxed)

The earlier repositories were too small to separate the configs on accuracy: every config answered almost everything. Two larger corpora, each with 20 questions written for it, test whether semantic search finds answers that grep and the model's memory miss.

**Corpora:**
- **K8s docs:** kubernetes/website at `8f6d976`, `content/en/docs` and `content/zh-cn/docs` (sparse checkout): 3,414 Markdown files, 44 MB; 3,420 indexed files, 53,181 chunks, indexed in 85 minutes with local Qwen3-Embedding 0.6B. Questions: [questions-k8s.json](questions-k8s.json), on feature gates and fields added in 1.33–1.37, so that the model is less likely to know them. Categories: exact (the name is in the question), paraphrase (the feature is described without its name), detail (versions, defaults, steps), absent (the gate or field does not exist; the right answer says so).
- **Chinese novels:** 14 public-domain books from Project Gutenberg (ids 24079, 24139, 24154, 25237, 25243, 25248, 25348, 26738, 26871, 27104, 27108, 27216, 27328, 27331), one Markdown file per book with `## 第N回` headings: about 2.2 million characters, 2,349 chunks. Questions: [questions-novels.json](questions-novels.json), asked in traditional characters (N19 and N20 repeat N04 and N09 in simplified characters). Keypoints accept both scripts.

**Configs** (`deepseek-flash`, DSH 0.2.1-rc.5 headless):

| Config | Setup |
|---|---|
| XA | No plugin: DSH's own grep, read and bash |
| XR | R: the plugin with rerank off, routing rule in AGENTS.md |
| XRR | R with rerank on (Qwen3-Reranker 0.6B, 15 candidates) |

Each config also loads [budget-plugin](budget-plugin/), an eval-only bundle that refuses tool calls after `EVAL_TOOL_BUDGET` of them in a run and tells the model to answer from what it has. Budget 0 is a closed-book run. Budget 5 is tight enough that finding the right file early matters. Unlimited runs show whether the configs differ when the agent can keep searching.

### Isolation

The first closed-book screening was invalid. The agent was free to read the whole disk, and several runs found and read `eval/questions-*.json` or the scratch folder with the corpora. Those runs are kept in `runs/invalid-leaked/`. A re-check of earlier results found no such read in RogueReborn's 600 runs and one in TileFillerBoardGenerator's 225: `tfbg-rerank/B3-R30-2` grepped `questions-tfbg.json`.

All runs here go through [sbx-dsh.sh](sbx-dsh.sh), which starts DSH under macOS `sandbox-exec` with [sandbox.sb](sandbox.sb):
- **Readable:** the corpus, DSH's home and the plugin build.
- **Unreadable:** the rest of `~/Documents` (this repository's `eval/`, `docs/`, `okf/`, sources and Markdown included), the scratch folder, and the Claude and Codex transcripts.
- **Writable:** only DSH's home and the index store.

The rules deny `file-read-data` rather than `file-read*`, so path resolution still works. The wrapper sets `DSH_PERMISSION_MODE=danger-full-access`, because DSH's own seatbelt cannot nest inside another sandbox. The outer sandbox takes its place.

```bash
AGENT_BIN=eval/sbx-dsh.sh EVAL_SCRATCH=<scratch> DSH_HOME=<home> DSH_AGENTS_HOME_R=<rule dir> \
  EVAL_QUESTIONS=eval/questions-k8s.json EVAL_TOOL_BUDGET=5 \
  node eval/run.ts <corpus> eval/runs/acc-k8s-b5 --harness dsh --reps 3 --jobs 2 --configs XA,XR,XRR
EVAL_QUESTIONS=eval/questions-k8s.json node eval/score.ts eval/runs/acc-k8s-b5 --overrides eval/overrides-k8s-b5.json
EVAL_QUESTIONS=eval/questions-k8s.json node eval/cite.ts <corpus> eval/runs/acc-k8s-b5
```

### Closed book (budget 0, XA, 2 runs per question)

| Corpus | Mean score | Memory-resistant questions (closed-book score < 0.5) |
|---|---|---|
| Novels | 0.21 | 17 of 20 |
| K8s | 0.49 | 10 of 20 |

On the novels the model knew only well-known facts (N13, Han Yu and Lu Qi in 斬鬼傳) and the two questions it could answer by refusing or guessing the obvious. On K8s it knew older gates partly and new ones not at all.

### Accuracy

Budget 5, 3 runs per question (60 per config); unlimited, 2 runs (40 per config). Scores after manual review: [overrides-novels-b5.json](overrides-novels-b5.json), [overrides-novels-free.json](overrides-novels-free.json), [overrides-k8s-b5.json](overrides-k8s-b5.json). The overrides fix answers that were right but worded differently from the keypoints, for example 「姓花名棟」 for 花棟.

| Corpus | Budget | Config | Accuracy | Memory-resistant subset | Median s | Median tokens |
|---|---|---|---|---|---|---|
| Novels | 5 | XA | 0.950 | 0.941 | 10 | 47k |
| | | XR | 0.968 | 0.962 | 9 | 55k |
| | | XRR | 0.988 | 0.985 | 24 | 56k |
| | unlimited | XA / XR / XRR | 1.000 / 1.000 / 1.000 | 1.000 | 11 / 8 / 27 | 66k / 59k / 56k |
| K8s | 5 | XA | 0.892 | 0.839 | 11 | 38k |
| | | XR | 0.939 | 0.900 | 9 | 40k |
| | | XRR | 0.953 | 0.939 | 10 | 40k |
| | unlimited | XA / XR / XRR | 1.000 / 1.000 / 1.000 | 1.000 | 10 / 11 / 11 | 52k / 59k / 71k |

Accuracy difference against XA at budget 5 (mean of per-question differences, bootstrapped 95% CI):

| Corpus | XR − XA | XRR − XA |
|---|---|---|
| Novels | +0.018 [−0.050, +0.107] | +0.038 [−0.025, +0.121] |
| K8s | +0.047 [−0.019, +0.114] | +0.061 [+0.017, +0.114] |

Time against XA (mean of per-question median ratios):

| Corpus | Budget | XR | XRR |
|---|---|---|---|
| Novels | 5 | 0.93 [0.82–1.03] | 2.67 [2.12–3.28] |
| Novels | unlimited | 0.85 [0.74–0.95] | 2.47 [1.91–3.04] |
| K8s | 5 | 0.90 [0.75–1.07] | 0.98 [0.87–1.11] |
| K8s | unlimited | 1.04 [0.79–1.31] | 0.93 [0.80–1.07] |

**Findings:**
- **With enough tool calls, grep alone answers everything.** Every config scored 1.000 on both corpora without a budget. Semantic search did not make an answer reachable that grep could not reach.
- **Under a tight budget, semantic search helps a little.** At 5 calls, XR and XRR are ahead of XA on both corpora, most clearly on the memory-resistant questions. The difference is significant only for XRR on K8s. Most of XA's misses are honest: it found the right file, ran out of calls before reading the version line, and said so.
- **Rerank costs a lot of time on the novels and little on K8s.** On the novels, XRR took about 2.5 times as long as XA for a small accuracy gain. Book passages are long, so scoring 15 of them is slow. K8s chunks are shorter, and the ranking was already good without rerank.
- **Search targeting on the novels.** Counting `knowledge_search` calls whose results included the book that held the answer:
  - XR: the right book ranked first in 69 of 82 calls.
  - XRR: the right book ranked first in 81 of 83 calls.
  - Most of XR's misses came from paraphrase questions: the model rewrote a traditional-script question into a simplified query, and the embedding then ranked another book first. In those runs grep found the answer afterwards.
- **On K8s the model searched little.** Most K8s questions name a gate or field, and the routing rule sends exact identifiers to grep. XR averaged 0.4 `knowledge_search` calls per run, and even a paraphrase question (K02) was often answered by grepping keywords.
- **Questions about things that do not exist cost XA most.** On K05 and K16, unlimited XA spent a median of 55 s and 342k tokens proving a negative with repeated greps. XR and XRR spent 24–28 s and 76–83k tokens. That is two questions, so treat it as a lead, not a result.
- **Citations.** [cite.ts](cite.ts) checks every `path:line` the final answer cites: a citation counts as supported when a keypoint appears within 5 lines of it. With the plugin, more answers cite a location: on the novels at budget 5, 27 of 60 XA answers cited one, against 44 for XR and 51 for XRR. The share of citations that were supported stayed between 0.70 and 0.92 in every config. Search results carry `path:line`, which makes citing easy, but it does not make the cited line more often right.

**Limits:**
- One model, and 2–3 runs per question.
- The questions were written by the same person who chose the corpora.
- Budget 5 is an artificial setting, chosen to make retrieval quality matter.
- The 0.6B embedding is the smallest local model; a larger one may rank the novels better.
- The machine is a 16 GB Apple Silicon laptop. Four parallel jobs (four DSH processes, the two llama-servers, the K8s store and a desktop session) coincided with a kernel panic, so the K8s unlimited half ran with 2 jobs.
