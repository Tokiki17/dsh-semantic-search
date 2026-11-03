# Qwen RAG 在 DeepSeek Harness（DSH）中的应用调研

调研日期：2026-11-03。对象：本机 DeepSeek Harness Desktop 0.2.1-rc.5（`com.deepseek.dsh`）。

## 结论

DSH 0.2.1-rc.5 的内置包和官方按需目录里都没有 embedding、向量检索、rerank 或知识库能力。现有的检索只有三种：`grep`/`glob` 这类文件搜索、基于 SQLite FTS5 的会话历史搜索（`dsh-experimental-session-search`），以及 web 搜索。所以「对项目代码、文档和个人资料做语义检索」是空白，适合用插件补上。

最合适的形态是原生 Cordis 工具插件，也就是本仓库的 `@tokiki/dsh-qwen-rag`：

- 检索：Qwen 系 embedding 加 SQLite FTS5 关键词召回，用 RRF 融合，再交给 Qwen 系 reranker 重排。
- 后端二选一：阿里云百炼（DashScope），或 OpenAI 兼容服务（本地 llama-server、硅基流动等）。
- 存储：DSH 自带 Node 24 的 `node:sqlite`，不需要任何原生依赖。插件管理器底层的 pnpm 11 默认拦截构建脚本，零原生依赖正好避开这个问题。
- 和 DSH 的集成：审批（`tools/pre-execute` 返回 `ask`）、凭据（`ctx.credentials`）、后台任务（`ctx.jobs`）、插件市场（git 源索引）都走 DSH 自己的链路。

## 一、DSH 插件机制（与本插件相关的部分）

以下内容读取自 app.asar 内各包的 README 和编译产物，以 0.2.1-rc.5 为准。

| 主题 | 机制 | 本插件的用法 |
|---|---|---|
| 包形态 | npm 包；`package.json` 的 `dsh.bundle.patch` 指向 `cordis.patch.yml`，用 `- insert:` 插入插件行；`engines.dsh` 决定版本兼容 | `engines.dsh: ">=0.2.1-rc.5 <0.3.0"` |
| 插件入口 | 导出 `name`、`inject`、`Config`（schemastery）、`apply(ctx, config)` | `inject: ['tools', 'systemPrompt']`，其余服务用 `ctx.get()` 按需取 |
| 依赖解析 | 运行时按「peerDependencies 里声明的包名」把 `@deepseek-ai/*` 解析到宿主自带的那一份 | `@deepseek-ai/*` 只声明为 peer；unpdf、mammoth、ignore 打包进 `lib/` |
| 工具 | `ctx.tools.register(defineTool({...}))`；参数先由 DSH 校验，再交给工具执行；schema 会自动进入系统提示词 | 注册 4 个工具，schema 保持静态，不破坏 KV cache |
| 审批 | `tools/pre-execute` waterfall 返回 `{kind:'ask'}`，DSH 交给审批服务处理；在 `never` 策略或无人值守时会拒绝 | 只有 `knowledge_index` 的数据离开本机时才问；`danger-full-access` 模式直接放行 |
| 凭据 | `ctx.credentials.resolve(name)`；先查凭据存储，再查环境变量、项目 `.env`、DSH home 的 `.env` | `DASHSCOPE_API_KEY` / `SILICONFLOW_API_KEY` |
| 后台任务 | `ctx.jobs.start({kind,label,owner,run})`，结束时自动通知会话 | 建索引默认在后台运行 |
| 工作目录 | `ctx.workingDirectory.ensure(agent, signal)` | 取最近的 `.git` 祖先作为工作区根目录 |
| 安装分发 | 插件管理器支持 npm、git、`link:` 三种 spec；市场索引（format 1）支持 `git` 源，必须固定到 40 位 commit | 用 GitHub 仓库加 `market/index.json`，不需要 npm 账号 |

DSH 官方实现也在用这些模式：`dsh-tool-session-query`（工具插件）、`dsh-experimental-session-search`（bundle 包）、`dsh-tool-workflow`（后台任务）、`dsh-plugin-manager`（审批）。

## 二、Qwen RAG 组件全景

### 2.1 开源模型（Apache-2.0，可本地运行）

| 模型 | 规格 | 中文 C-MTEB | MMTEB | MTEB 英文 v2 |
|---|---|---|---|---|
| Qwen3-Embedding-0.6B | 1024 维（MRL 可裁到 32），32K 上下文 | 66.33 | 64.33 | 70.70 |
| Qwen3-Embedding-4B | 2560 维 | 72.27 | 69.45 | 74.60 |
| Qwen3-Embedding-8B | 4096 维 | 73.84 | 70.58 | 75.22 |

| 重排模型 | CMTEB-R | MMTEB-R | MTEB-Code |
|---|---|---|---|
| Qwen3-Reranker-0.6B | 71.31 | 66.36 | 73.42 |
| Qwen3-Reranker-4B | 75.94 | 72.74 | 81.20 |
| Qwen3-Reranker-8B | 77.45 | 72.94 | 81.22 |

用法要点：

- 查询端要拼成 `Instruct: {任务}\nQuery:{query}`，文档端不加指令。不加指令检索效果会降 1–5%，指令建议用英文写。
- 重排模型的原理是 yes/no 判别，以 "yes" 的概率作为分数。
- 多模态检索有 Qwen3-VL-Embedding/Reranker（2B/8B，2026-01 发布，MMEB-V2 77.8），本插件暂不纳入。

### 2.2 阿里云百炼（DashScope）托管模型

| 模型 | 维度 | 批大小 | 价格（元/千 token） | 备注 |
|---|---|---|---|---|
| qwen3.7-text-embedding | 256–2560（默认 1024） | 20 | 0.0005 | 201 种语言，本插件默认 |
| qwen3.7-text-embedding-flash | 256–1024 | 20 | 0.000125 | 低成本 |
| text-embedding-v4 | 64–2048 | 10 | 0.0005 | 100+ 种语言 |
| qwen3.7-text-rerank | — | 500 篇文档 | 未查到 | 单条 30k token，本插件默认 |
| qwen3-rerank | — | 500 篇文档 | 未查到 | 单条 4k token |

- `text_type`（query/document）、`instruct` 和稀疏向量 `output_type` 只有 DashScope 原生接口支持，OpenAI 兼容接口不支持。所以插件走原生的 `/api/v1/services/embeddings/text-embedding/text-embedding` 和 `/api/v1/services/rerank/text-rerank/text-rerank`。
- 新文档给的域名是 `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com`，插件默认用 `https://dashscope.aliyuncs.com`，两者都可以配置；新加坡地域用 `dashscope-intl`。
- gte-rerank 已于 2026-05-30 下线。

### 2.3 Qwen-Agent 的 RAG 思路

Qwen-Agent 的做法是：

- 用关键词检索、向量检索和混合检索三类 searcher 召回；
- 对超长文档另外提供「并行文档问答」方案，作者称在 1M token 规模的单针测试中胜过原生长上下文；
- 检索能力以工具的形式交给 agent 调用。

本插件借用其中的混合检索和工具化思路，不依赖它的 Python 代码。

## 三、集成方案对比

| 方案 | 优点 | 缺点 | 结论 |
|---|---|---|---|
| **原生 Cordis 工具插件**（本仓库） | 直接接入 DSH 的审批、凭据、后台任务、工作目录和插件市场；进程内运行，没有额外服务；PTC 模式下自动可用 | 要跟着 DSH 的 API 版本走（用 `engines.dsh` 声明兼容范围） | ✅ 采用 |
| MCP server + `dsh-mcp-client` | 跟 DSH 版本无关，别的 agent 也能用 | 要多跑一个进程；拿不到 DSH 的审批、凭据和后台任务，工作区根目录要另外传 | 以后可以加一个 MCP 封装作为补充 |
| Skill + 脚本 | 最轻，只放提示词和脚本 | 模型只能通过 bash 调用，没有结构化结果，也没有审批和后台任务 | 不适合 |

## 四、本地部署推荐配置

| 机器 | 推荐组合 | 内存（两个进程合计） |
|---|---|---|
| 8 GB Mac，或只有 CPU 的服务器 | Embedding-0.6B Q8_0 + Reranker-0.6B Q8_0，`QWEN_RAG_CTX=2048` | 实测约 2.0 GB |
| 16 GB Mac（本机 M4） | 默认 0.6B + 0.6B（`QWEN_RAG_CTX=8192`）；追求质量可换 Embedding-4B Q4_K_M（`QWEN_RAG_EMBED_SIZE=4b`） | 0.6B 组合实测约 3.2 GB；换 4B embedding 估算约 5.5–6 GB |
| 24–32 GB Mac | Embedding-4B + Reranker-4B（社区 GGUF） | 估算约 8–9 GB |
| 32 GB 以上，或 12 GB 以上显存 | 8B 组合 | 估算 12 GB 以上 |

0.6B 模型单个进程的常驻内存随批大小变化（本机 M4、llama.cpp 0.8.0 实测）：`-c/-b/-ub` 为 8192 时约 1.6 GB，4096 时约 1.25 GB，2048 时约 1.0 GB。插件送进模型的最长输入是 2 × `index.chunkChars` = 2400 字符；从 DSH 文档里抽样实测，纯中文最多约 1.7k token，所以 2048 已经够用。4B、8B 的数字是按权重大小加上随隐藏层变大的批缓冲推算的，没有实测。

启动方式见 `scripts/local-models.sh`。

- embedding 进程用 `--embedding --pooling last`，rerank 进程用 `--rerank --pooling rank`，两者都要加 `-c N -b N -ub N`（脚本里由 `QWEN_RAG_CTX` 控制，默认 8192）。
- 本机踩到的坑：Homebrew 的 llama.cpp 0.8.0 在 macOS 15 上编译 bfloat Metal 着色器会失败，报 `constexpr function never produces a constant expression`。设置 `GGML_METAL_BF16_DISABLE=1` 即可解决，脚本里已默认设置。

本机实测数据在 [README.zh.md](../README.zh.md#本地后端实测)。

## 五、其他云端提供商

**托管同款 Qwen3 开源模型的平台：**

| 平台 | 提供的模型 | 价格（2026-10/11 抓取，以控制台为准） |
|---|---|---|
| 硅基流动 | Qwen3-Embedding 和 Qwen3-Reranker 的 0.6B/4B/8B | Reranker-8B 约 $0.04/百万 token（国际站）；BGE-M3 免费 |
| OpenRouter | Qwen3-Embedding 的 0.6B/4B/8B | 8B 约 $0.01/百万 token |
| Nebius / Novita / Fireworks | Qwen3-Embedding-8B | 约 $0.01 / $0.07 / $0.10 每百万 token |

**其他厂商的同类模型：**

| 厂商 | 能力 |
|---|---|
| 火山方舟 Doubao-embedding | ¥0.5/百万 token，中英双语，4K 上下文 |
| Google gemini-embedding-001 | MTEB 英文 v2 得分 73.30 |
| OpenAI text-embedding-3 | small 版 $0.02/百万 token |
| Voyage | voyage-4 系列；rerank-2.5 $0.05/百万 token |
| Cohere | Embed v4 $0.12/百万 token；Rerank 4 Pro |
| ZeroEntropy zerank-2 | 第三方 ELO 排行第一，但许可证是 CC-BY-NC |

第三方的重排排行榜（agentset，测试方法未核实，不针对中文）上，Cohere Rerank 4 Pro 的 ELO 是 1629，Voyage rerank-2.5 是 1544，Qwen3-Reranker-8B 是 1473。但 Qwen 系在中文和代码场景的官方分数很高。对以中文为主的个人知识库，百炼或 Qwen3 系仍是首选。

这些服务大多用 OpenAI 兼容的 `/embeddings` 加 Jina/Cohere 风格的 `/rerank` 接口，所以插件的 `openai-compatible` 后端能直接对接它们。内置的预设有 `local`（llama-server）和 `siliconflow`；其他服务用 `custom` 预设配置。

## 六、插件设计要点

1. **混合检索**：
   - 每个集合分别做两路召回：向量召回取 top 50（暴力余弦，向量矩阵缓存在内存里），关键词召回取 top 50（FTS5 BM25）。
   - 两路结果用 RRF（k=60）融合；有多个集合时，再把各集合的融合结果合在一起取 top 30 交给 reranker，最终返回 top 8。
   - reranker 不可用时，退回融合排序，并在结果里注明。
2. **中文关键词召回**：FTS5 的 `unicode61` 分词器不切中文，`trigram` 分词器又匹配不到两个字的词。插件的做法是把中日韩文字的连续片段改写成重叠的二元组（bigram）再入索引，查询时同样改写；单个汉字用前缀匹配。
3. **切分**：Markdown 先按标题切，并记录标题路径；代码和普通文本按空行分成段落块，再打包到 1200 字符左右，块之间重叠 150 字符；PDF 按页切。切出的每块都记下行号或页码，用于 `path:line` 引用。
4. **增量更新**：先比较 mtime 和文件大小，再比较 sha256，内容没变的文件不重新计算向量。被删除的文件会被清理，但扫描因 `maxFiles` 截断时不清理。搜索前会自动刷新少量变化的文件（默认最多 50 个），超出上限时只提示用户手动更新。
5. **一致性**：每个集合记录建库时用的 embedder 标识（后端、模型、维度、查询格式）。标识对不上的集合会被标为过期，不会把不同模型的向量混在一起比较；显式建索引时会自动全量重建。
6. **隐私**：
   - `.env`、私钥、`credentials`/`secrets` 这类文件、lockfile 和二进制文件一律不读。
   - 遵守 `.gitignore`；`.ragignore` 也能用来排除文件。
   - 不跟随符号链接。
   - 云端后端下，建索引前会走审批。
7. **KV cache**：工具 schema 和提示词段都是静态的。集合列表不写进提示词，模型需要时调用 `knowledge_status` 获取。

## 七、已知限制

- 向量检索是暴力扫描，向量常驻内存。例如 5 万个片段、1024 维约占 200 MB。更大的语料需要换 sqlite-vec 或 int8 量化，目前未实现。
- 扫描版 PDF 没有 OCR；`.doc`、`.pptx`、`.xlsx` 暂不支持。
- 后台建索引依赖 DSH 的 jobs 服务；进程退出后任务不会续跑，但已经写入的文件会保留，下次运行增量补齐。
- 搜索前的自动刷新在云端后端下也会上传变化的文件内容。这个集合在首次建索引时已经批准过；如需关闭，设置 `search.refreshBeforeSearch: false`。

## 来源

- QwenLM/Qwen3-Embedding：https://github.com/QwenLM/Qwen3-Embedding
- Qwen3 Embedding 博客：https://qwenlm.github.io/blog/qwen3-embedding/
- Qwen3-Embedding GGUF：https://huggingface.co/Qwen/Qwen3-Embedding-0.6B-GGUF
- ggml-org Qwen3-Reranker GGUF：https://huggingface.co/ggml-org/Qwen3-Reranker-0.6B-Q8_0-GGUF
- Qwen3-VL-Embedding：https://github.com/QwenLM/Qwen3-VL-Embedding
- 百炼向量模型：https://help.aliyun.com/zh/model-studio/embedding
- 百炼文本向量同步接口：https://help.aliyun.com/zh/model-studio/text-embedding-synchronous-api
- 百炼文本排序：https://help.aliyun.com/zh/model-studio/text-rerank-api
- Model Studio 模型总览：https://www.alibabacloud.com/help/en/model-studio/embedding-rerank-model/
- Qwen-Agent：https://github.com/QwenLM/Qwen-Agent
- SiliconFlow Qwen3-Reranker-8B：https://www.siliconflow.com/models/qwen3-reranker-8b
- OpenRouter Qwen3-Embedding-8B：https://openrouter.ai/qwen/qwen3-embedding-8b
- cloudprice Qwen3-Embedding-8B：https://cloudprice.net/models/alibaba-qwen3-embedding-8b
- 火山方舟模型价格：https://ark.volcengine.com/region:cn-beijing/docs/82379/1099320?lang=zh
- agentset 重排排行榜：https://agentset.ai/rerankers
- premai 2026 embedding 排名：https://www.premai.io/blog/best-embedding-models-for-rag-2026-ranked-by-mteb-score-cost-and-self-hosting/
