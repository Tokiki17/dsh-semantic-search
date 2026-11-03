# @tokiki/dsh-qwen-rag

[English](README.md) | 中文

给 DeepSeek Harness（DSH）用的 Qwen RAG 知识库插件。它对当前工作区（代码和文档）以及你指定的文档文件夹（Markdown、文本、代码、PDF、DOCX）做混合检索：

1. Qwen embedding 向量召回和 SQLite FTS5 关键词召回同时进行；
2. 两路结果用 RRF 融合；
3. 再由 Qwen reranker 重排；
4. 返回带 `path:line` 引用的片段。

后端二选一：

- **百炼云端**（默认）：`qwen3.7-text-embedding` + `qwen3.7-text-rerank`，走 DashScope 原生接口，支持 query/document 区分和 instruct。
- **OpenAI 兼容**：本地 llama-server 跑 Qwen3-Embedding / Qwen3-Reranker GGUF，数据不出本机；硅基流动等托管服务也走这个后端。

调研报告：[docs/research.zh.md](docs/research.zh.md)。

## 安装

要求 DSH 0.2.1-rc.5 或更新（`engines.dsh: >=0.2.1-rc.5 <0.3.0`）。插件不依赖任何原生模块，安装时也不运行构建脚本。

- **插件市场**（推荐）：在 DSH 的插件页「发现」里添加索引源 `https://raw.githubusercontent.com/Tokiki17/dsh-qwen-rag/main/market/index.json`，然后安装「Qwen RAG 知识库」。
- **命令行**：

  ```bash
  dsh plugin --profile desktop add github:Tokiki17/dsh-qwen-rag
  ```

- **本地开发**：

  ```bash
  dsh plugin --profile desktop add link:/path/to/dsh-qwen-rag
  ```

用命令行安装前，有两点要注意：

- `dsh` 命令默认不在 PATH 里。可以在 macOS 菜单栏「DeepSeek Harness → 管理 dsh 命令…」里安装它（会创建 `/usr/local/bin/dsh`），也可以直接用完整路径 `"/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"`。
- `desktop` profile 由 Desktop 自己创建。要先打开过一次 Desktop，并且在运行命令时把它完全退出；否则 `dsh` 会拒绝执行，并提示 “Open DeepSeek Harness Desktop once to initialize its profile, then fully quit it”。

安装后插件会自动加入 profile 的 `dsh.profile.bundles`，重新打开 Desktop 即可生效。

## 配置

在 profile 的 `cordis.patch.yml` 里按 id `qwen-rag` 覆盖配置。

### 百炼云端（默认）

把密钥存进 DSH 凭据，变量名为 `DASHSCOPE_API_KEY`。也可以写进 DSH home（默认 `~/.dsh`）下的 `.env`：

```dotenv
DASHSCOPE_API_KEY=sk-...
```

可选的覆盖项：

```yaml
- id: qwen-rag
  name: '@tokiki/dsh-qwen-rag'
  config:
    backend: dashscope
    dashscope:
      baseURL: https://dashscope.aliyuncs.com   # 新加坡用 https://dashscope-intl.aliyuncs.com
      embeddingModel: qwen3.7-text-embedding     # 低成本可换 qwen3.7-text-embedding-flash
      rerankModel: qwen3.7-text-rerank
      dimensions: 1024
```

### 本地 llama-server（数据不出本机）

```bash
brew install llama.cpp
scripts/local-models.sh start        # 下载约 1.3 GB 的 0.6B 模型，启动 :8081 embedding 和 :8082 rerank
scripts/local-models.sh status
```

```yaml
- id: qwen-rag
  name: '@tokiki/dsh-qwen-rag'
  config:
    backend: openai-compatible
    openaiCompatible:
      preset: local
```

换更大的 embedding 模型：`QWEN_RAG_EMBED_SIZE=4b scripts/local-models.sh start`。如果维度也改了，要同时设置 `openaiCompatible.dimensions`（4B 最高 2560，8B 最高 4096；也可以保持 1024，由插件在客户端截断）。

### 硅基流动或其他 OpenAI 兼容服务

```yaml
- id: qwen-rag
  name: '@tokiki/dsh-qwen-rag'
  config:
    backend: openai-compatible
    openaiCompatible:
      preset: siliconflow        # 默认 Qwen/Qwen3-Embedding-4B + Qwen/Qwen3-Reranker-4B，密钥 SILICONFLOW_API_KEY
      # preset: custom
      # embeddingBaseURL: https://example.com/v1
      # rerankBaseURL: https://example.com/v1
      # embeddingModel: ...
      # rerankModel: ...
      # apiKeyEnv: MY_API_KEY
      # queryFormat: qwen3      # 用 Qwen3 系 embedding 时设为 qwen3
```

### 常用参数

| 字段 | 默认值 | 说明 |
|---|---|---|
| `approval` | `remote` | `knowledge_index` 什么时候请求批准：`remote` 只在数据离开本机时；`always` 每次都问；`never` 从不问 |
| `rerank` | `true` | 关闭后直接按混合融合的顺序返回 |
| `storageDir` | `<DSH home>/qwen-rag` | 索引存放位置，每个集合一个 SQLite 文件 |
| `index.chunkChars` / `index.overlapChars` | 1200 / 150 | 片段长度和片段间的重叠长度（字符） |
| `index.maxFileBytes` / `index.maxFiles` | 20 MB / 20000 | 单个文件大小上限和文件数上限（纯文本文件另有 2 MB 上限） |
| `index.excludeDirs` | `node_modules`、`.git`、`dist` 等 | 不扫描的目录名 |
| `search.topK` | 8 | 默认返回的片段数 |
| `search.rerankCandidates` | 30 | 送去 rerank 的候选数；本地后端嫌慢可以调到 15 |
| `search.refreshBeforeSearch` / `search.maxRefreshFiles` | `true` / 50 | 搜索前自动增量刷新，变化的文件超过上限时只给提示 |

完整配置见 [src/config.ts](src/config.ts)。

## 模型怎么用它

| 工具 | 作用 |
|---|---|
| `knowledge_search({query, collections?, top_k?})` | 默认搜当前工作区加所有命名集合，返回 `[n] path:line · 集合 · § 标题 · score` 和原文片段 |
| `knowledge_index({target, paths?, description?, rebuild?, background?})` | `target: "workspace"` 索引当前项目（遵守 `.gitignore`）；其他名字会用 `paths` 新建或更新一个命名集合。有 jobs 服务时在后台运行 |
| `knowledge_status({})` | 列出集合、文件数和片段数、所用模型、是否过期、最近更新时间，以及当前后端 |
| `knowledge_remove({collection, paths?})` | 删除整个集合的索引，或其中部分文件的索引；不会动磁盘上的原文件 |

插件还会在系统提示词里加一段静态说明：先检索再回答，并引用 `path:line`。

示例对话：

- 「把 ~/Documents/manuals 建成知识库 manuals」：模型会调用 `knowledge_index({target: "manuals", paths: ["~/Documents/manuals"]})`。
- 「这个项目的部署流程是什么？」：模型会调用 `knowledge_search`，然后根据检索结果回答并附上引用。

## 隐私与安全

- 永远不读这些文件：`.env*`、私钥（`id_rsa`、`*.pem`、`*.key` 等）、名字带 `credentials`/`secrets` 的文件、lockfile、`*.min.js`、二进制文件。
- 遵守各级目录的 `.gitignore`，也可以用 `.ragignore` 额外排除；不跟随符号链接。
- 后端是云端时，`knowledge_index` 每次都会请求批准，并说明内容会发送到哪个地址。DSH 处于 `danger-full-access` 模式时直接放行。headless 或审批策略为 `never` 时会被拒绝；这种情况下请改用本地后端，或把 `approval` 设为 `never`。
- 已经批准过的集合在搜索前会自动增量刷新，变化的文件会重新计算向量（云端后端下即重新上传）。不想这样可以关闭 `search.refreshBeforeSearch`。
- 索引文件只有当前用户能读写。

## 本地后端实测

<!-- bench:begin -->
测试环境：Apple M4、16 GB 内存、macOS 15.7，Homebrew llama.cpp 0.8.0，Qwen3-Embedding-0.6B Q8_0 + Qwen3-Reranker-0.6B Q8_0，`QWEN_RAG_CTX=8192`。语料是 DSH 源码仓库 `docs/` 下的 349 个 Markdown 文件，中英各半，共 620 万字符。测试用 `scripts/bench-local.ts`，测试日期 2026-11-03。

| 项目 | 结果 |
|---|---|
| 首次建索引 | 349 个文件切成 11205 个片段，用时 24.3 分钟（约 7.7 片段/秒、4300 字符/秒），0 错误 |
| 索引大小 | 58 MB（向量 1024 维，加原文和 FTS 索引） |
| 常驻内存 | embedding 进程约 1.7 GB，rerank 进程约 1.6 GB |
| 单次查询（top 8） | 只做混合召回 31–176 ms；rerank 15 个候选 1.3–2.0 s；rerank 30 个候选（默认）2.8–3.8 s |
| 检索质量 | 5 个测试查询（中文 3 个、英文 2 个）开启 rerank 后，排第一的都是对应主题的章节，例如「工具调用前的审批是怎么实现的」命中 `subsystems/approval.zh.md` 的「审批请求」一节 |

建索引只在第一次慢，之后只处理变化的文件。查询延迟基本都花在 rerank 上：嫌慢可以把 `search.rerankCandidates` 调到 15，或者直接设 `rerank: false`，只用混合召回。

内存紧张时可以缩小批大小，例如 `QWEN_RAG_CTX=2048 scripts/local-models.sh start`。实测单个进程约 1.0 GB（4096 时约 1.25 GB）。插件送进模型的最长输入是 2400 字符，纯中文实测最多约 1.7k token，2048 足够。
<!-- bench:end -->

## 开发

```bash
npm install
npm run check        # tsc --noEmit + node --test + esbuild 打包到 lib/
QWEN_RAG_ENTRY=lib/index.js node --test test/plugin.test.ts   # 用同一套测试检查打包产物
node scripts/bench-local.ts <folder> <tmp-store> "查询1" "query 2"   # 本地后端基准
node scripts/market-index.mjs <release-commit>   # 生成 market/index.json，并用 DSH 自带的解析器校验
```

`lib/` 是打包产物，需要提交到仓库，因为 git 源安装直接使用仓库里的文件。发布流程：`npm run check`，提交并打 tag，然后用这个 commit 生成 `market/index.json`，再提交一次。

## 许可

MIT。打包进 `lib/` 的第三方依赖（unpdf/pdf.js、mammoth、ignore 等）的许可证汇总在 `lib/THIRD_PARTY_NOTICES.md`。
