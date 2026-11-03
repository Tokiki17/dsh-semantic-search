# 语义检索（@tokiki/dsh-semantic-search）

[English](README.md) | 中文

给 DeepSeek Harness（DSH）用的语义检索插件。它对当前工作区（代码和文档）以及你指定的文档文件夹（Markdown、文本、代码、PDF、DOCX）做检索，并返回带 `path:line` 引用的片段：

1. 向量召回和 SQLite FTS5 关键词召回同时进行；
2. 两路结果用 RRF 融合；
3. 再由重排模型重排。

装好就能用：默认不使用任何模型，只做关键词检索。需要按意思检索时，在「插件 → 语义检索」页面分三步选择两个模型的来源：

- **向量模型**：本地 Qwen3-Embedding 0.6B / 4B / 8B（插件自动下载 llama.cpp 和模型并在本机运行，数据不出本机）、阿里云百炼、硅基流动，或任意 OpenAI 兼容服务。
- **重排模型**：默认沿用向量模型的来源，也可以单独换一个来源，或者不使用。
- 在线服务只需填 Key，Key 只存进 DSH 凭据库；本地模型点「下载」即可，其余配置自动完成。

调研报告：[docs/research.zh.md](docs/research.zh.md)。

## 安装

要求 DSH 0.2.1-rc.5 或更新（`engines.dsh: >=0.2.1-rc.5 <0.3.0`）。插件不依赖任何原生模块，安装时也不运行构建脚本。

- **插件市场**（推荐）：在 DSH 的插件页「发现」里添加索引源 `https://raw.githubusercontent.com/Tokiki17/dsh-semantic-search/main/market/index.json`，然后安装「语义检索」。
- **命令行**：

  ```bash
  dsh plugin --profile desktop add github:Tokiki17/dsh-semantic-search
  ```

- **本地开发**：

  ```bash
  dsh plugin --profile desktop add link:/path/to/dsh-semantic-search
  ```

用命令行安装前，有两点要注意：

- `dsh` 命令默认不在 PATH 里。可以在 macOS 菜单栏「DeepSeek Harness → 管理 dsh 命令…」里安装它（会创建 `/usr/local/bin/dsh`），也可以直接用完整路径 `"/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"`。
- `desktop` profile 由 Desktop 自己创建。要先打开过一次 Desktop，并且在运行命令时把它完全退出；否则 `dsh` 会拒绝执行，并提示 “Open DeepSeek Harness Desktop once to initialize its profile, then fully quit it”。

安装后插件会自动加入 profile 的 `dsh.profile.bundles`，重新打开 Desktop 即可生效。

### 从 0.1（`@tokiki/dsh-qwen-rag`）升级

0.2 改了包名和配置结构。先卸载旧包、安装新包，再在配置页重新选择模型来源（旧的 `qwen-rag` 配置行不会被读取，可以删掉）。

- 已建好的索引会保留：首次启动时，`<DSH home>/qwen-rag/` 会自动改名为 `<DSH home>/semantic-search/`。
- 用 0.1 本地后端时下载到 `~/.cache/dsh-qwen-rag/models/` 的 0.6B 模型会被直接复用，不用重新下载。
- 0.1 的本地后端建的索引，换成 0.2 的本地 0.6B 向量模型后仍然有效，不需要重建。

## 配置

推荐在「插件 → 语义检索」页面配置：

1. **向量模型**：选择来源。本地模型会标出下载大小和运行内存，按机器内存给出推荐；在线服务填 Key 后可以点「测试连接」，会发一次真实请求。
2. **重排模型**：默认与向量模型同一来源，直接点「下一步」即可；需要不同来源时点「换一个来源」。
3. **完成**：保存后插件按新配置重新加载。如果换了向量模型，页面会提示有几个知识库需要重建，并提供「后台重建」按钮。

页面底部的「本地模型与磁盘」列出已下载的模型和占用空间，可以删除。模型存放在 `<DSH home>/semantic-search/models/`，卸载插件不会自动删除。

也可以手写 profile 的 `cordis.patch.yml`，按 id `semantic-search` 覆盖配置：

```yaml
- id: semantic-search
  name: '@tokiki/dsh-semantic-search'
  config:
    embedding:
      source: local              # none（默认，只用关键词）| local | dashscope | siliconflow | custom
      model: qwen3-embedding-0.6b
    rerank:
      source: same               # same（默认，沿用向量模型来源）| off | local | dashscope | siliconflow | custom
```

### 各来源的默认模型和 Key

| 来源 | 向量模型 | 重排模型 | Key 的凭据名 |
|---|---|---|---|
| `local` | `qwen3-embedding-0.6b`（可选 `-4b`、`-8b`） | `qwen3-reranker-0.6b` | 不需要 |
| `dashscope` | `qwen3.7-text-embedding` | `qwen3.7-text-rerank` | `DASHSCOPE_API_KEY` |
| `siliconflow` | `Qwen/Qwen3-Embedding-4B` | `Qwen/Qwen3-Reranker-4B` | `SILICONFLOW_API_KEY` |
| `custom` | 必须填写 `embedding.model` | 填写 `rerank.model` 才启用 | `providers.custom.apiKeyEnv`（无鉴权可不填） |

Key 按凭据名从 DSH 凭据库读取，找不到时再读环境变量或 `<DSH home>/.env`。百炼新加坡地域把 `providers.dashscope.baseURL` 设为 `https://dashscope-intl.aliyuncs.com`。

### 常用参数

| 字段 | 默认值 | 说明 |
|---|---|---|
| `embedding.dimensions` | 1024 | 向量维度；Qwen3 系模型支持截断到更小的维度 |
| `providers.custom.baseURL` / `rerankBaseURL` | — | 自定义服务的 `/v1` 地址；重排接口不同时再填 `rerankBaseURL` |
| `providers.custom.queryFormat` | `plain` | 自定义服务跑的是 Qwen3-Embedding 时设为 `qwen3`，查询会加指令前缀 |
| `local.ctx` | 8192 | 本地模型的上下文和批大小；2048 时每个进程约省 0.6 GB 内存 |
| `local.idleStopMinutes` | 10 | 本地模型空闲多少分钟后自动停止（0 表示一直运行） |
| `local.downloadSource` | `auto` | 模型下载源：`auto` 先测速再选最快的，也可固定为 `huggingface`、`hf-mirror`、`modelscope` |
| `local.githubMirror` | — | llama.cpp 预编译包的下载镜像前缀 |
| `approval` | `remote` | `knowledge_index` 什么时候请求批准：`remote` 只在数据离开本机时；`always` 每次都问；`never` 从不问 |
| `storageDir` | `<DSH home>/semantic-search` | 索引、本地运行时和模型的存放位置 |
| `index.chunkChars` / `index.overlapChars` | 1200 / 150 | 片段长度和片段间的重叠长度（字符） |
| `index.maxFileBytes` / `index.maxFiles` | 20 MB / 20000 | 单个文件大小上限和文件数上限（纯文本文件另有 2 MB 上限） |
| `search.topK` | 8 | 默认返回的片段数 |
| `search.rerankCandidates` | 30 | 送去重排的候选数；本地模型嫌慢可以调到 15 |
| `search.refreshBeforeSearch` / `search.maxRefreshFiles` | `true` / 50 | 搜索前自动增量刷新，变化的文件超过上限时只给提示 |
| `search.enforce` | `off` | 是否引导模型用 `knowledge_search` 查文档：`remind` 在模型 grep 文档后提醒一次；`docs` 在每轮第一次 grep 已索引的文档时拒绝并指向 `knowledge_search`；`prefetch` 对每条用户消息先检索，把文档命中附给模型。实测都没有比不引导更好，见下文「让模型用起来」 |
| `search.instructions` | `true` | 工作区有语义索引时，插件像 DSH 加载 AGENTS.md 那样，给每个 agent 发一条路由规则：文档和换说法的问题先用 `knowledge_search`，代码用 grep。实测能让文档类问题更快、更省 |

完整配置见 [src/config.ts](src/config.ts)。

### 本地模型怎么运行

选了本地来源后，插件会自己完成这些事：

- 下载固定版本的 llama.cpp 预编译包（b11765；macOS arm64/x64、Linux x64/arm64、Windows x64/arm64），以及对应的 Qwen3 GGUF 模型。每个文件都校验 sha256，支持断点续传，下载失败会换下一个源。
- 第一次检索或建索引时才启动 llama-server，只监听 127.0.0.1 的随机端口；空闲 10 分钟或插件卸载时停止。首次启动约需 10–20 秒。
- 实测只在 macOS（Apple M4）上跑过；Linux 和 Windows 的预编译包已接入，但未实机验证。

`scripts/local-models.sh` 仍保留，只作开发和基准测试用。

## 模型怎么用它

| 工具 | 作用 |
|---|---|
| `knowledge_search({query, collections?, top_k?})` | 默认搜当前工作区加所有命名集合，返回 `[n] path:line · 集合 · § 标题 · score` 和原文片段 |
| `knowledge_index({target, paths?, description?, rebuild?, background?})` | `target: "workspace"` 索引当前项目（遵守 `.gitignore`）；其他名字会用 `paths` 新建或更新一个命名集合。有 jobs 服务时在后台运行 |
| `knowledge_status({})` | 列出集合、文件数和片段数、所用模型、是否过期、最近更新时间，以及当前模型配置 |
| `knowledge_remove({collection, paths?})` | 删除整个集合的索引，或其中部分文件的索引；不会动磁盘上的原文件 |

插件还会在系统提示词里加一段静态说明：文档类问题（设计、决策、进度记录、实测数据、已加入集合的资料）和换了说法的问题先用 `knowledge_search`，引用 `path:line`；代码和精确的标识符、报错原文、文件名用文件搜索。没有配置向量模型时，工具照常工作，只按关键词检索，并在结果里提示去配置页设置模型。

### 让模型用起来

在 DSH 里用 `deepseek-flash` 实测（RogueReborn 仓库，20 道题，每题跑 4 次，见 [eval/README.md](eval/README.md)）：

- 只靠插件的系统提示词，模型几乎不调用 `knowledge_search`，40 次里只有 1–3 次。
- 插件强制调用（`search.enforce: docs`）或预先附上命中（`prefetch`）都没有收益：模型搜完照样继续 grep。所以 `search.enforce` 默认关闭。
- 有效的是把路由规则放进 agent 指令通道：
  - 插件默认开启的 `search.instructions`：文档事实类问题耗时降到约 0.78 倍，换说法问题的 token 降到约 0.75 倍，代码问题基本不变。
  - 把同一条规则写进项目的 `AGENTS.md` 或 `~/.agents/AGENTS.md`，效果更好：文档事实类问题耗时约 0.74 倍、token 约 0.71 倍，代码问题的 token 也少了约 20–28%。想要更好的效果，可以再加上这条：

```markdown
This workspace is indexed for semantic search. For any question about the docs (design decisions, progress notes, findings, measurements) or worded in a paraphrased or colloquial way, call `knowledge_search` first, then read the cited path:line to confirm. For exact identifiers, error text, file names and code behaviour, use grep and read directly.
```

示例对话：

- 「把 ~/Documents/manuals 建成知识库 manuals」：模型会调用 `knowledge_index({target: "manuals", paths: ["~/Documents/manuals"]})`。
- 「这个项目的部署流程是什么？」：模型会调用 `knowledge_search`，然后根据检索结果回答并附上引用。

## 隐私与安全

- 永远不读这些文件：`.env*`、私钥（`id_rsa`、`*.pem`、`*.key` 等）、名字带 `credentials`/`secrets` 的文件、lockfile、`*.min.js`、二进制文件。
- 遵守各级目录的 `.gitignore`，也可以用 `.ragignore` 额外排除；不跟随符号链接。
- 向量模型在云端时，`knowledge_index` 每次都会请求批准，说明内容会发送到哪个地址，并估算大约多少个文件、多少 token（按服务商价格计费，插件不内置价格）。DSH 处于 `danger-full-access` 模式时直接放行。headless 或审批策略为 `never` 时会被拒绝；这种情况下请改用本地模型，或把 `approval` 设为 `never`。
- 重排模型在云端时，检索的问题和候选片段会发送给重排服务。
- 已经批准过的集合在搜索前会自动增量刷新，变化的文件会重新计算向量（云端时即重新上传）。不想这样可以关闭 `search.refreshBeforeSearch`。
- Key 只存在 DSH 凭据库，不写进配置文件；配置页只显示「已配置」，不会回显 Key。配置页不能覆盖其他插件已经保存的凭据。
- 索引文件只有当前用户能读写。

## 本地后端实测

<!-- bench:begin -->
测试环境：Apple M4、16 GB 内存、macOS 15.7，Homebrew llama.cpp 0.8.0（0.2.0 起插件改用自带下载的 llama.cpp b11765，数字未重测），Qwen3-Embedding-0.6B Q8_0 + Qwen3-Reranker-0.6B Q8_0，`QWEN_RAG_CTX=8192`。语料是 DSH 源码仓库 `docs/` 下的 349 个 Markdown 文件，中英各半，共 620 万字符。测试用 `scripts/bench-local.ts`，测试日期 2026-11-03。

| 项目 | 结果 |
|---|---|
| 首次建索引 | 349 个文件切成 11205 个片段，用时 24.3 分钟（约 7.7 片段/秒、4300 字符/秒），0 错误 |
| 索引大小 | 58 MB（向量 1024 维，加原文和 FTS 索引） |
| 常驻内存 | embedding 进程约 1.7 GB，rerank 进程约 1.6 GB |
| 单次查询（top 8） | 只做混合召回 31–176 ms；rerank 15 个候选 1.3–2.0 s；rerank 30 个候选（默认）2.8–3.8 s |
| 检索质量 | 5 个测试查询（中文 3 个、英文 2 个）开启 rerank 后，排第一的都是对应主题的章节，例如「工具调用前的审批是怎么实现的」命中 `subsystems/approval.zh.md` 的「审批请求」一节 |

建索引只在第一次慢，之后只处理变化的文件。查询延迟基本都花在 rerank 上：嫌慢可以把 `search.rerankCandidates` 调到 15，或者在配置页把重排模型设为「不使用」，只用混合召回。

内存紧张时可以缩小批大小（配置项 `local.ctx: 2048`；内存小于 12 GB 的机器，配置页保存时会自动这样设置）。实测单个进程约 1.0 GB（4096 时约 1.25 GB）。插件送进模型的最长输入是 2400 字符，纯中文实测最多约 1.7k token，2048 足够。
<!-- bench:end -->
## 开发

```bash
npm install
npm run check        # tsc（宿主端 + 网页端）+ node --test + esbuild 打包到 lib/
PLUGIN_ENTRY=lib/index.js node --test test/plugin.test.ts   # 用同一套测试检查打包产物
node scripts/bench-local.ts <folder> <tmp-store> "查询1" "query 2"   # 本地后端基准（需先 scripts/local-models.sh start）
node scripts/market-index.mjs <release-commit>   # 生成 market/index.json，并用 DSH 自带的解析器校验
```

`lib/` 是打包产物，需要提交到仓库，因为 git 源安装直接使用仓库里的文件。发布流程：`npm run check`，提交并打 tag，然后用这个 commit 生成 `market/index.json`，再提交一次。

## 许可

MIT。打包进 `lib/` 的第三方依赖（unpdf/pdf.js、mammoth、ignore、zod 等）的许可证汇总在 `lib/THIRD_PARTY_NOTICES.md`。
