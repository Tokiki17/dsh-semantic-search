window.__ModuleLoader__.load({ id: "@tokiki/dsh-semantic-search", factory: (require) => { var module = { exports: {} }, exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);

// src/client/api.ts
var PACKAGE = "@tokiki/dsh-semantic-search";
var NAMESPACE = "semanticSearch";
var passThrough = { parse: (value) => value };
var codec = (type) => ({ mode: "strict", typeSymbol: `${PACKAGE}#${type}`, schema: passThrough, create: () => passThrough });
var request = (type) => [{ name: "request", wire: "request", source: "json", codec: codec(type) }];
var DESCRIPTORS = [
  { method: "getState", parameters: [], result: codec("SemanticSearchState") },
  { method: "testModel", parameters: request("TestModelRequest"), result: codec("TestResult") },
  { method: "saveConfig", parameters: request("SaveConfigRequest"), result: codec("SaveResult") },
  { method: "setKey", parameters: request("SetKeyRequest"), result: codec("KeyStatus") },
  { method: "clearKey", parameters: request("KeyRequest"), result: codec("KeyStatus") },
  { method: "startDownload", parameters: request("ModelRequest"), result: codec("DownloadState") },
  { method: "cancelDownload", parameters: [], result: codec("DownloadState") },
  { method: "removeModel", parameters: request("ModelRequest"), result: codec("RemoveResult") },
  { method: "rebuildStale", parameters: [], result: codec("RebuildState") }
];
var REMOTE_CONTRIBUTION = {
  package: PACKAGE,
  descriptors: DESCRIPTORS.map((descriptor) => ({
    id: `${PACKAGE}#${NAMESPACE}/${descriptor.method}`,
    service: NAMESPACE,
    namespace: NAMESPACE,
    invocation: { kind: "direct" },
    ...descriptor
  }))
};
function wrapRemote(raw) {
  const unwrap = async (result) => {
    const settled = await result;
    if (!settled.ok) throw new Error(settled.error.message || settled.error.code || "request failed");
    return settled.value;
  };
  return {
    getState: () => unwrap(raw.getState()),
    testModel: (body) => unwrap(raw.testModel(body)),
    saveConfig: (body) => unwrap(raw.saveConfig(body)),
    setKey: (body) => unwrap(raw.setKey(body)),
    clearKey: (body) => unwrap(raw.clearKey(body)),
    startDownload: (body) => unwrap(raw.startDownload(body)),
    cancelDownload: () => unwrap(raw.cancelDownload()),
    removeModel: (body) => unwrap(raw.removeModel(body)),
    rebuildStale: () => unwrap(raw.rebuildStale())
  };
}

// src/client/i18n.ts
var zh = {
  "title": "\u8BED\u4E49\u68C0\u7D22\u8BBE\u7F6E",
  "intro": "\u5206\u4E09\u6B65\u9009\u62E9\u5411\u91CF\u6A21\u578B\u548C\u91CD\u6392\u6A21\u578B\u7684\u6765\u6E90\u3002\u5728\u7EBF\u670D\u52A1\u53EA\u9700\u586B Key\uFF1B\u672C\u5730\u6A21\u578B\u7531\u63D2\u4EF6\u4E0B\u8F7D\u548C\u8FD0\u884C\uFF0C\u6570\u636E\u4E0D\u51FA\u672C\u673A\u3002",
  "step.embedding": "\u5411\u91CF\u6A21\u578B",
  "step.rerank": "\u91CD\u6392\u6A21\u578B",
  "step.done": "\u5B8C\u6210",
  "embedding.hint": "\u5411\u91CF\u6A21\u578B\u628A\u6587\u6863\u548C\u95EE\u9898\u8F6C\u6210\u5411\u91CF\uFF0C\u7528\u6765\u6309\u610F\u601D\u627E\u76F8\u8FD1\u7684\u6BB5\u843D\u3002",
  "rerank.hint": "\u91CD\u6392\u6A21\u578B\u7ED9\u5019\u9009\u6BB5\u843D\u9010\u4E00\u6253\u5206\uFF0C\u628A\u6700\u76F8\u5173\u7684\u6392\u5728\u524D\u9762\u3002",
  "source.none": "\u6682\u4E0D\u4F7F\u7528\u6A21\u578B",
  "source.none.desc": "\u53EA\u7528\u5173\u952E\u8BCD\u68C0\u7D22\uFF0C\u96F6\u914D\u7F6E\u3001\u96F6\u4E0B\u8F7D\u3002\u4EE5\u540E\u968F\u65F6\u53EF\u4EE5\u518D\u52A0\u6A21\u578B\u3002",
  "source.local": "\u672C\u5730\u6A21\u578B",
  "source.local.desc": "\u63D2\u4EF6\u4E0B\u8F7D llama.cpp \u548C Qwen3 \u6A21\u578B\u5E76\u5728\u672C\u673A\u8FD0\u884C\uFF0C\u6570\u636E\u4E0D\u51FA\u672C\u673A\u3002",
  "source.dashscope": "\u963F\u91CC\u4E91\u767E\u70BC",
  "source.dashscope.desc": "qwen3.7-text-embedding / qwen3.7-text-rerank\uFF0C\u6309\u91CF\u8BA1\u8D39\u3002",
  "source.siliconflow": "\u7845\u57FA\u6D41\u52A8",
  "source.siliconflow.desc": "Qwen3-Embedding-4B / Qwen3-Reranker-4B\uFF0C\u6309\u91CF\u8BA1\u8D39\u3002",
  "source.custom": "\u81EA\u5B9A\u4E49\u670D\u52A1",
  "source.custom.desc": "\u4EFB\u610F OpenAI \u517C\u5BB9\u7684 /embeddings \u4E0E /rerank \u63A5\u53E3\u3002",
  "source.off": "\u4E0D\u4F7F\u7528\u91CD\u6392",
  "source.off.desc": "\u76F4\u63A5\u6309\u6DF7\u5408\u53EC\u56DE\u7684\u987A\u5E8F\u8FD4\u56DE\uFF0C\u901F\u5EA6\u6700\u5FEB\u3002",
  "local.recommended": "\u63A8\u8350",
  "local.size": "\u4E0B\u8F7D {size}",
  "local.memory": "\u8FD0\u884C\u7EA6\u5360 {memory} \u5185\u5B58",
  "local.downloaded": "\u5DF2\u4E0B\u8F7D",
  "local.download": "\u4E0B\u8F7D",
  "local.downloading": "\u4E0B\u8F7D\u4E2D {percent}% \xB7 {speed}/s \xB7 \u6765\u81EA {source}",
  "local.preparing": "\u6B63\u5728\u9009\u62E9\u6700\u5FEB\u7684\u4E0B\u8F7D\u6E90\u2026",
  "local.runtime": "\u9996\u6B21\u4E0B\u8F7D\u4F1A\u9644\u5E26 llama.cpp \u8FD0\u884C\u65F6\uFF08{size}\uFF09\u3002",
  "local.downloadRuntime": "\u4E0B\u8F7D llama.cpp \u8FD0\u884C\u65F6\uFF08{size}\uFF09",
  "local.cancel": "\u53D6\u6D88",
  "local.failed": "\u4E0B\u8F7D\u5931\u8D25\uFF1A{error}",
  "local.noDisk": "\u78C1\u76D8\u5269\u4F59 {free}\uFF0C\u7A7A\u95F4\u4E0D\u8DB3\u3002",
  "local.unsupported": "\u8FD9\u53F0\u673A\u5668\uFF08{platform}\uFF09\u6CA1\u6709\u53EF\u7528\u7684 llama.cpp \u9884\u7F16\u8BD1\u5305\uFF0C\u8BF7\u9009\u62E9\u5728\u7EBF\u670D\u52A1\u3002",
  "local.lowMemory": "\u5185\u5B58\u8F83\u5C0F\uFF08{memory}\uFF09\uFF0C\u4FDD\u5B58\u65F6\u4F1A\u628A\u672C\u5730\u6A21\u578B\u7684\u6279\u5927\u5C0F\u8BBE\u4E3A 2048\uFF0C\u4EE5\u51CF\u5C11\u5185\u5B58\u5360\u7528\u3002",
  "local.big": "\u9002\u5408 32 GB \u4EE5\u4E0A\u5185\u5B58",
  "local.mixedMemory": "\u91CD\u6392\u5728\u672C\u673A\u8FD0\u884C\u3001\u5411\u91CF\u5728\u4E91\u7AEF\uFF1A\u672C\u673A\u4F1A\u5E38\u9A7B\u4E00\u4E2A\u7EA6 {memory} \u7684\u91CD\u6392\u8FDB\u7A0B\uFF08\u7A7A\u95F2 10 \u5206\u949F\u540E\u81EA\u52A8\u505C\u6B62\uFF09\u3002",
  "key.label": "API Key\uFF08{name}\uFF09",
  "key.placeholder": "\u7C98\u8D34 Key \u540E\u70B9\u4FDD\u5B58",
  "key.save": "\u4FDD\u5B58 Key",
  "key.clear": "\u79FB\u9664",
  "key.configured": "\u5DF2\u914D\u7F6E\uFF08{source}\uFF09",
  "key.missing": "\u672A\u914D\u7F6E",
  "key.storeOnly": "Key \u53EA\u4FDD\u5B58\u5728 DSH \u51ED\u636E\u5E93\uFF0C\u4E0D\u4F1A\u5199\u8FDB\u914D\u7F6E\u6587\u4EF6\u3002",
  "model.label": "\u6A21\u578B",
  "model.default": "\u9ED8\u8BA4\uFF1A{model}",
  "custom.baseURL": "\u63A5\u53E3\u5730\u5740\uFF08\u4EE5 /v1 \u7ED3\u5C3E\uFF09",
  "custom.rerankBaseURL": "\u91CD\u6392\u63A5\u53E3\u5730\u5740\uFF08\u4E0E\u4E0A\u9762\u4E0D\u540C\u65F6\u586B\u5199\uFF09",
  "custom.keyName": "\u51ED\u636E\u540D\uFF08\u65E0\u9274\u6743\u53EF\u7559\u7A7A\uFF09",
  "custom.dimensions": "\u5411\u91CF\u7EF4\u5EA6",
  "custom.qwen3": "\u6A21\u578B\u662F Qwen3-Embedding\uFF08\u67E5\u8BE2\u52A0\u6307\u4EE4\u524D\u7F00\uFF09",
  "test": "\u6D4B\u8BD5\u8FDE\u63A5",
  "testing": "\u6D4B\u8BD5\u4E2D\u2026",
  "test.ok": "\u53EF\u7528 \xB7 {ms} ms \xB7 {detail}",
  "test.fail": "\u5931\u8D25\uFF1A{detail}",
  "test.localStart": "\u9996\u6B21\u542F\u52A8\u672C\u5730\u6A21\u578B\u7EA6\u9700 10\u201320 \u79D2\u3002",
  "rerank.same": "\u4E0E\u5411\u91CF\u6A21\u578B\u76F8\u540C\uFF1A{source}",
  "rerank.sameModel": "\u5C06\u4F7F\u7528 {model}\uFF0CKey \u6CBF\u7528\u4E0A\u4E00\u6B65\u3002",
  "rerank.sameLocal": "\u5C06\u4F7F\u7528 {model}\uFF0C\u4E0E\u5411\u91CF\u6A21\u578B\u4E00\u6837\u5728\u672C\u673A\u8FD0\u884C\u3002",
  "rerank.change": "\u6362\u4E00\u4E2A\u6765\u6E90",
  "rerank.keepSame": "\u6CBF\u7528\u5411\u91CF\u6A21\u578B\u7684\u6765\u6E90",
  "rerank.noneEmbedding": "\u6CA1\u6709\u4F7F\u7528\u5411\u91CF\u6A21\u578B\u65F6\uFF0C\u91CD\u6392\u6A21\u578B\u540C\u6837\u5173\u95ED\u3002\u53EA\u7528\u5173\u952E\u8BCD\u68C0\u7D22\u3002",
  "rerank.customNoModel": "\u81EA\u5B9A\u4E49\u670D\u52A1\u6CA1\u6709\u586B\u5199\u91CD\u6392\u6A21\u578B\uFF0C\u9ED8\u8BA4\u4E0D\u4F7F\u7528\u91CD\u6392\uFF1B\u9700\u8981\u7684\u8BDD\u8BF7\u6362\u4E00\u4E2A\u6765\u6E90\u6216\u586B\u5199\u6A21\u578B\u540D\u3002",
  "next": "\u4E0B\u4E00\u6B65",
  "back": "\u4E0A\u4E00\u6B65",
  "save": "\u4FDD\u5B58\u5E76\u542F\u7528",
  "saving": "\u4FDD\u5B58\u4E2D\u2026",
  "saved": "\u5DF2\u4FDD\u5B58\uFF0C\u63D2\u4EF6\u5DF2\u6309\u65B0\u914D\u7F6E\u91CD\u65B0\u52A0\u8F7D\u3002",
  "saveFailed": "\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",
  "cannotSave": "\u5F53\u524D DSH \u4E0D\u652F\u6301\u4ECE\u9875\u9762\u4FDD\u5B58\u63D2\u4EF6\u914D\u7F6E\uFF0C\u8BF7\u5728 cordis.patch.yml \u91CC\u6309 id semantic-search \u4FEE\u6539\u3002",
  "summary.embedding": "\u5411\u91CF\uFF1A{value}",
  "summary.rerank": "\u91CD\u6392\uFF1A{value}",
  "summary.keyword": "\u53EA\u7528\u5173\u952E\u8BCD\u68C0\u7D22",
  "summary.off": "\u4E0D\u4F7F\u7528",
  "done.next": "\u63A5\u4E0B\u6765\u5728\u5BF9\u8BDD\u91CC\u8BF4\u300C\u628A\u5F53\u524D\u9879\u76EE\u5EFA\u6210\u77E5\u8BC6\u5E93\u300D\uFF0C\u6216\u300C\u628A ~/Documents/manuals \u5EFA\u6210\u77E5\u8BC6\u5E93 manuals\u300D\u3002",
  "stale": "{count} \u4E2A\u77E5\u8BC6\u5E93\u662F\u7528\u522B\u7684\u5411\u91CF\u6A21\u578B\u5EFA\u7684\uFF0C\u9700\u8981\u91CD\u5EFA\u624D\u80FD\u505A\u8BED\u4E49\u68C0\u7D22\u3002",
  "stale.rebuild": "\u540E\u53F0\u91CD\u5EFA",
  "stale.running": "\u91CD\u5EFA\u4E2D {done}/{total}\uFF1A{current}",
  "stale.done": "\u91CD\u5EFA\u5B8C\u6210\u3002",
  "stale.failed": "\u91CD\u5EFA\u5931\u8D25\uFF1A{error}",
  "stale.remoteNote": "\u5728\u7EBF\u670D\u52A1\u4F1A\u6309\u6587\u4EF6\u5185\u5BB9\u8BA1\u8D39\u3002",
  "disk.title": "\u672C\u5730\u6A21\u578B\u4E0E\u78C1\u76D8",
  "disk.runtime": "llama.cpp {tag}\uFF1A{size}",
  "disk.none": "\u8FD8\u6CA1\u6709\u4E0B\u8F7D\u4EFB\u4F55\u672C\u5730\u6A21\u578B\u3002",
  "disk.delete": "\u5220\u9664",
  "disk.legacy": "\uFF08\u590D\u7528 0.1 \u7248\u7F13\u5B58\uFF09",
  "disk.note": "\u6A21\u578B\u5B58\u653E\u5728 {dir}\u3002\u5378\u8F7D\u63D2\u4EF6\u4E0D\u4F1A\u81EA\u52A8\u5220\u9664\u5B83\u4EEC\u3002",
  "status.active": "\u5F53\u524D\uFF1A{value}",
  "status.error": "\u914D\u7F6E\u6709\u8BEF\uFF1A{error}",
  "loading": "\u52A0\u8F7D\u4E2D\u2026",
  "reconnecting": "\u63D2\u4EF6\u6B63\u5728\u91CD\u65B0\u52A0\u8F7D\u2026",
  "loadFailed": "\u65E0\u6CD5\u8BFB\u53D6\u63D2\u4EF6\u72B6\u6001\uFF1A{error}"
};
var en = {
  "title": "Semantic Search setup",
  "intro": "Choose where the embedding and rerank models come from, in three steps. Online services only need a key; local models are downloaded and run by the plugin, and nothing leaves this machine.",
  "step.embedding": "Embedding model",
  "step.rerank": "Rerank model",
  "step.done": "Finish",
  "embedding.hint": "The embedding model turns documents and questions into vectors so passages can be found by meaning.",
  "rerank.hint": "The rerank model scores each candidate passage and puts the most relevant first.",
  "source.none": "No model for now",
  "source.none.desc": "Keyword search only: nothing to configure or download. You can add models any time.",
  "source.local": "Local models",
  "source.local.desc": "The plugin downloads llama.cpp and Qwen3 models and runs them on this machine; nothing leaves it.",
  "source.dashscope": "Alibaba Cloud Model Studio",
  "source.dashscope.desc": "qwen3.7-text-embedding / qwen3.7-text-rerank, billed per use.",
  "source.siliconflow": "SiliconFlow",
  "source.siliconflow.desc": "Qwen3-Embedding-4B / Qwen3-Reranker-4B, billed per use.",
  "source.custom": "Custom service",
  "source.custom.desc": "Any OpenAI-compatible /embeddings and /rerank API.",
  "source.off": "No reranking",
  "source.off.desc": "Return results in hybrid fusion order; fastest.",
  "local.recommended": "Recommended",
  "local.size": "Download {size}",
  "local.memory": "Uses about {memory} of memory",
  "local.downloaded": "Downloaded",
  "local.download": "Download",
  "local.downloading": "Downloading {percent}% \xB7 {speed}/s \xB7 from {source}",
  "local.preparing": "Picking the fastest download source\u2026",
  "local.runtime": "The first download includes the llama.cpp runtime ({size}).",
  "local.downloadRuntime": "Download the llama.cpp runtime ({size})",
  "local.cancel": "Cancel",
  "local.failed": "Download failed: {error}",
  "local.noDisk": "Only {free} of disk space left; not enough.",
  "local.unsupported": "No prebuilt llama.cpp runtime exists for this machine ({platform}); choose an online service.",
  "local.lowMemory": "This machine has little memory ({memory}); saving sets the local batch size to 2048 to use less.",
  "local.big": "For 32 GB of memory or more",
  "local.mixedMemory": "Rerank runs locally while embeddings are in the cloud: a rerank process of about {memory} stays resident (it stops after 10 idle minutes).",
  "key.label": "API key ({name})",
  "key.placeholder": "Paste the key, then save",
  "key.save": "Save key",
  "key.clear": "Remove",
  "key.configured": "Configured ({source})",
  "key.missing": "Not configured",
  "key.storeOnly": "The key is kept in DSH credentials, never in configuration files.",
  "model.label": "Model",
  "model.default": "Default: {model}",
  "custom.baseURL": "Base URL (ending in /v1)",
  "custom.rerankBaseURL": "Rerank base URL (only when different)",
  "custom.keyName": "Credential name (empty for no authentication)",
  "custom.dimensions": "Vector dimensions",
  "custom.qwen3": "The model is Qwen3-Embedding (prefix queries with an instruction)",
  "test": "Test connection",
  "testing": "Testing\u2026",
  "test.ok": "Works \xB7 {ms} ms \xB7 {detail}",
  "test.fail": "Failed: {detail}",
  "test.localStart": "A local model takes about 10\u201320 s to start the first time.",
  "rerank.same": "Same as the embedding model: {source}",
  "rerank.sameModel": "Uses {model} with the key from the previous step.",
  "rerank.sameLocal": "Uses {model}, running on this machine like the embedding model.",
  "rerank.change": "Use another source",
  "rerank.keepSame": "Follow the embedding source",
  "rerank.noneEmbedding": "Without an embedding model, reranking is off too: keyword search only.",
  "rerank.customNoModel": "No rerank model is set for the custom service, so reranking stays off; choose another source or enter a model name.",
  "next": "Next",
  "back": "Back",
  "save": "Save and enable",
  "saving": "Saving\u2026",
  "saved": "Saved; the plugin reloaded with the new configuration.",
  "saveFailed": "Save failed: {error}",
  "cannotSave": "This DSH cannot save plugin configuration from the page; edit the semantic-search row in cordis.patch.yml.",
  "summary.embedding": "Embedding: {value}",
  "summary.rerank": "Rerank: {value}",
  "summary.keyword": "keyword search only",
  "summary.off": "off",
  "done.next": 'Next, ask in a conversation: "index this project as a knowledge base", or "index ~/Documents/manuals as the collection manuals".',
  "stale": "{count} collections were built with another embedding model and need a rebuild for semantic search.",
  "stale.rebuild": "Rebuild in the background",
  "stale.running": "Rebuilding {done}/{total}: {current}",
  "stale.done": "Rebuild finished.",
  "stale.failed": "Rebuild failed: {error}",
  "stale.remoteNote": "Online services bill for the uploaded text.",
  "disk.title": "Local models and disk",
  "disk.runtime": "llama.cpp {tag}: {size}",
  "disk.none": "No local models downloaded yet.",
  "disk.delete": "Delete",
  "disk.legacy": "(reused from the 0.1 cache)",
  "disk.note": "Models are stored in {dir}. Uninstalling the plugin does not delete them.",
  "status.active": "Now: {value}",
  "status.error": "Configuration problem: {error}",
  "loading": "Loading\u2026",
  "reconnecting": "The plugin is reloading\u2026",
  "loadFailed": "Cannot read the plugin state: {error}"
};
function translator(language) {
  const table = language?.toLowerCase().startsWith("zh") ? zh : en;
  return (key, values) => format(table[key], values);
}
function format(template, values) {
  return values === void 0 ? template : template.replace(/\{(\w+)\}/g, (match, name2) => name2 in values ? String(values[name2]) : match);
}
function formatBytes(bytes) {
  if (bytes <= 0) return "0 MB";
  if (bytes >= 1 << 30) return `${(bytes / (1 << 30)).toFixed(1)} GB`;
  if (bytes >= 1 << 20) return `${Math.round(bytes / (1 << 20))} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

// src/client/page.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_MODELS = {
  local: { embedding: "qwen3-embedding-0.6b", rerank: "qwen3-reranker-0.6b" },
  dashscope: { embedding: "qwen3.7-text-embedding", rerank: "qwen3.7-text-rerank" },
  siliconflow: { embedding: "Qwen/Qwen3-Embedding-4B", rerank: "Qwen/Qwen3-Reranker-4B" }
};
var LOW_MEMORY_MB = 12 * 1024;
var mb = (value) => value * 1024 * 1024;
var BIG_MODEL_MEMORY_MB = 32 * 1024;
function SetupPage({ api, t }) {
  const [state, setState] = (0, import_react.useState)();
  const [loadError, setLoadError] = (0, import_react.useState)();
  const [step, setStep] = (0, import_react.useState)(0);
  const [draft, setDraft] = (0, import_react.useState)();
  const [rerankChanged, setRerankChanged] = (0, import_react.useState)(false);
  const [saving, setSaving] = (0, import_react.useState)(false);
  const [saveMessage, setSaveMessage] = (0, import_react.useState)();
  const refresh = (0, import_react.useCallback)(async () => {
    try {
      const next = await api.getState();
      setState(next);
      setLoadError(void 0);
      return next;
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : String(error));
      return void 0;
    }
  }, [api]);
  (0, import_react.useEffect)(() => {
    void refresh().then((loaded) => {
      if (loaded === void 0) return;
      setDraft(draftFrom(loaded));
      setRerankChanged(loaded.config.rerank.source !== "same");
    });
  }, [refresh]);
  const busy = state?.local.download.status === "running" || state?.rebuild.status === "running";
  (0, import_react.useEffect)(() => {
    if (!busy) return;
    const timer = setInterval(() => void refresh(), 1e3);
    return () => clearInterval(timer);
  }, [busy, refresh]);
  if (state === void 0 || draft === void 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ss-page", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: loadError === void 0 ? t("loading") : t("loadFailed", { error: loadError }) }) });
  }
  const update = (change) => setDraft((current) => current === void 0 ? current : change(current));
  const save = async () => {
    setSaving(true);
    setSaveMessage(void 0);
    try {
      const usesLocal = draft.embedding.source === "local" || draft.rerank.source === "local";
      const toSave = usesLocal && state.local.hardware.totalMemoryMB < LOW_MEMORY_MB ? { ...draft, local: { ...draft.local, ctx: 2048 } } : draft;
      await api.saveConfig({ draft: toSave });
      let reloaded;
      for (let attempt = 0; attempt < 20 && reloaded === void 0; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, attempt === 0 ? 300 : 500));
        reloaded = await refresh();
      }
      setSaveMessage({ ok: true, text: t("saved") });
    } catch (error) {
      setSaveMessage({ ok: false, text: t("saveFailed", { error: error instanceof Error ? error.message : String(error) }) });
    } finally {
      setSaving(false);
    }
  };
  const steps = ["step.embedding", "step.rerank", "step.done"];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-page", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("intro") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-status", children: state.error === void 0 ? t("status.active", { value: summarize(draftFrom(state), t).join(" \xB7 ") }) : t("status.error", { error: state.error }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "ss-steps", children: steps.map((key, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: index === step ? "ss-step ss-current" : index < step ? "ss-step ss-past" : "ss-step", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "ss-link", onClick: () => setStep(index), children: [
      index + 1,
      ". ",
      t(key)
    ] }) }, key)) }),
    step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmbeddingStep, { api, t, state, draft, update, refresh }) : step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RerankStep, { api, t, state, draft, update, refresh, changed: rerankChanged, setChanged: setRerankChanged }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoneStep, { t, state, draft, api, refresh }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-actions", children: [
      step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn", onClick: () => setStep(step - 1), children: t("back") }) : null,
      step < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn ss-primary", onClick: () => setStep(draft.embedding.source === "none" && step === 0 ? 2 : step + 1), children: t("next") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn ss-primary", disabled: saving || !state.canSave, onClick: () => void save(), children: saving ? t("saving") : t("save") })
    ] }),
    step === 2 && !state.canSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-warn", children: t("cannotSave") }) : null,
    saveMessage !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: saveMessage.ok ? "ss-ok" : "ss-error", children: saveMessage.text }) : null,
    saveMessage?.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaleCollections, { api, t, state, refresh }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiskSection, { api, t, state, refresh })
  ] });
}
function SummaryLine({ api, t }) {
  const [state, setState] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    api.getState().then(setState, () => {
    });
  }, [api]);
  if (state === void 0) return null;
  const draft = draftFrom(state);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: summarize(draft, t).join(" \xB7 ") });
}
function EmbeddingStep({ api, t, state, draft, update, refresh }) {
  const source = draft.embedding.source;
  const choose = (next, model) => update((current) => ({
    ...current,
    embedding: {
      ...current.embedding,
      source: next,
      ...model !== void 0 ? { model } : { model: void 0 },
      // Built-in sources use the standard 1024 dimensions; only a custom service keeps a chosen width.
      dimensions: next === "custom" ? current.embedding.dimensions : 1024
    },
    // A rerank that follows the embedding source must not keep a model name from the previous source.
    rerank: current.rerank.source === "same" && next !== current.embedding.source ? { source: "same" } : current.rerank
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "ss-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("embedding.hint") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, { selected: source === "none", onSelect: () => choose("none"), title: t("source.none"), description: t("source.none.desc") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, { selected: source === "local", onSelect: () => choose("local", draft.embedding.model?.startsWith("qwen3-embedding-") ? draft.embedding.model : "qwen3-embedding-0.6b"), title: t("source.local"), description: t("source.local.desc"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalModels, { api, t, state, role: "embedding", selected: draft.embedding.model ?? "qwen3-embedding-0.6b", onSelect: (model) => choose("local", model), refresh }) }),
    ["dashscope", "siliconflow", "custom"].map((online) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, { selected: source === online, onSelect: () => choose(online), title: t(`source.${online}`), description: t(`source.${online}.desc`), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnlineFields, { api, t, state, draft, update, refresh, source: online, role: "embedding" }) }, online)),
    source !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestButton, { api, t, draft, role: "embedding", local: source === "local" }) : null
  ] });
}
function RerankStep({ api, t, state, draft, update, refresh, changed, setChanged }) {
  const embeddingSource = draft.embedding.source;
  if (embeddingSource === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "ss-section", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("rerank.noneEmbedding") }) });
  const followed = embeddingSource;
  const choose = (next, model) => update((current) => ({ ...current, rerank: { source: next, ...model !== void 0 ? { model } : {} } }));
  const sameModel = followed === "custom" ? draft.rerank.model : DEFAULT_MODELS[followed].rerank;
  if (!changed) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "ss-section", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("rerank.hint") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-choice ss-selected", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("rerank.same", { source: t(`source.${followed}`) }) }),
        followed === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("model.label"), value: draft.rerank.model ?? "", onChange: (model) => choose("same", model || void 0) }),
          !draft.rerank.model ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("rerank.customNoModel") }) : null
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t(followed === "local" ? "rerank.sameLocal" : "rerank.sameModel", { model: sameModel ?? "" }) })
      ] }),
      followed !== "custom" || draft.rerank.model ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestButton, { api, t, draft, role: "rerank", local: followed === "local" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-link", onClick: () => {
        setChanged(true);
        choose("off");
      }, children: t("rerank.change") })
    ] });
  }
  const source = draft.rerank.source;
  const rerankModel = state.local.models.find((model) => model.role === "rerank");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "ss-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("rerank.hint") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-link", onClick: () => {
      setChanged(false);
      choose("same");
    }, children: t("rerank.keepSame") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, { selected: source === "off", onSelect: () => choose("off"), title: t("source.off"), description: t("source.off.desc") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Choice, { selected: source === "local", onSelect: () => choose("local", "qwen3-reranker-0.6b"), title: t("source.local"), description: t("source.local.desc"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalModels, { api, t, state, role: "rerank", selected: "qwen3-reranker-0.6b", onSelect: (model) => choose("local", model), refresh }),
      embeddingSource !== "local" && rerankModel !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("local.mixedMemory", { memory: formatBytes(mb(rerankModel.memoryMB)) }) }) : null
    ] }),
    ["dashscope", "siliconflow", "custom"].map((online) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, { selected: source === online, onSelect: () => choose(online), title: t(`source.${online}`), description: t(`source.${online}.desc`), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnlineFields, { api, t, state, draft, update, refresh, source: online, role: "rerank" }) }, online)),
    source !== "off" && source !== "same" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestButton, { api, t, draft, role: "rerank", local: source === "local" }) : null
  ] });
}
function DoneStep({ t, state, draft }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "ss-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "ss-summary", children: summarize(draft, t).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line)) }),
    state.local.hardware.totalMemoryMB < LOW_MEMORY_MB && (draft.embedding.source === "local" || draft.rerank.source === "local") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("local.lowMemory", { memory: formatBytes(mb(state.local.hardware.totalMemoryMB)) }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("done.next") })
  ] });
}
function StaleCollections({ api, t, state, refresh }) {
  const stale = state.collections.filter((collection) => collection.stale);
  const { rebuild } = state;
  if (rebuild.status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("stale.running", { done: rebuild.done, total: rebuild.total, current: rebuild.current ?? "" }) });
  if (rebuild.status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-error", children: t("stale.failed", { error: rebuild.error ?? "" }) });
  if (stale.length === 0) return rebuild.status === "done" && rebuild.total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-ok", children: t("stale.done") }) : null;
  const remote = state.config.embedding.source !== "local" && state.config.embedding.source !== "none";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-callout", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
      t("stale", { count: stale.length }),
      remote ? ` ${t("stale.remoteNote")}` : ""
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn", onClick: () => void api.rebuildStale().then(() => refresh()), children: t("stale.rebuild") })
  ] });
}
function Choice({ selected, onSelect, title, description, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: selected ? "ss-choice ss-selected" : "ss-choice", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "ss-choice-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", checked: selected, onChange: onSelect }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-muted ss-block", children: description })
      ] })
    ] }),
    selected && children !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ss-choice-body", children }) : null
  ] });
}
function LocalModels({ api, t, state, role, selected, onSelect, refresh }) {
  const { hardware, runtime, download } = state.local;
  const [error, setError] = (0, import_react.useState)();
  if (!hardware.supported) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-warn", children: t("local.unsupported", { platform: `${hardware.platform}-${hardware.arch}` }) });
  const models = state.local.models.filter((model) => model.role === role);
  const start = async (model) => {
    setError(void 0);
    try {
      await api.startDownload({ model: model.id });
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-models", children: [
    models.map((model) => {
      const needed = model.size + (runtime.installed ? 0 : runtime.size ?? 0);
      const noDisk = hardware.freeDiskMB !== void 0 && mb(hardware.freeDiskMB) < needed * 1.1;
      const recommended = model.id.endsWith("0.6b");
      const active = download.target === model.id;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: selected === model.id ? "ss-model ss-selected" : "ss-model", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "ss-choice-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", checked: selected === model.id, onChange: () => onSelect(model.id) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: model.label }),
            recommended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-tag", children: t("local.recommended") }) : null,
            model.memoryMB * 1.5 > hardware.totalMemoryMB || !recommended && hardware.totalMemoryMB < BIG_MODEL_MEMORY_MB ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-tag ss-tag-dim", children: t("local.big") }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ss-muted ss-block", children: [
              t("local.size", { size: formatBytes(model.size) }),
              " \xB7 ",
              t("local.memory", { memory: formatBytes(mb(model.memoryMB)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ss-model-action", children: model.downloaded && !runtime.installed && active && download.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { t, state, onCancel: () => void api.cancelDownload().then(() => refresh()) }) : model.downloaded && !runtime.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-ok", children: t("local.downloaded") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn", disabled: download.status === "running", onClick: () => void start(model), children: t("local.downloadRuntime", { size: formatBytes(runtime.size ?? 0) }) })
        ] }) : model.downloaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-ok", children: t("local.downloaded") }) : active && download.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { t, state, onCancel: () => void api.cancelDownload().then(() => refresh()) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn", disabled: noDisk || download.status === "running", onClick: () => void start(model), children: t("local.download") }),
          noDisk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-warn", children: t("local.noDisk", { free: formatBytes(mb(hardware.freeDiskMB ?? 0)) }) }) : null,
          active && download.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-error", children: t("local.failed", { error: download.error ?? "" }) }) : null
        ] }) })
      ] }, model.id);
    }),
    !runtime.installed && runtime.size !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("local.runtime", { size: formatBytes(runtime.size) }) }) : null,
    error !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-error", children: error }) : null
  ] });
}
function Progress({ t, state, onCancel }) {
  const { download } = state.local;
  const percent = download.total > 0 ? Math.floor(download.received / download.total * 100) : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-progress", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ss-bar", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ss-bar-fill", style: { width: `${percent}%` } }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-muted", children: download.source === void 0 ? t("local.preparing") : t("local.downloading", { percent, speed: formatBytes(download.bytesPerSecond), source: download.source }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-link", onClick: onCancel, children: t("local.cancel") })
  ] });
}
function OnlineFields({ api, t, state, draft, update, refresh, source, role }) {
  const custom = draft.providers?.custom ?? {};
  const setCustom = (patch) => update((current) => ({ ...current, providers: { ...current.providers, custom: { ...current.providers?.custom, ...patch } } }));
  const modelValue = role === "embedding" ? draft.embedding.model : draft.rerank.model;
  const setModel = (model) => update((current) => role === "embedding" ? { ...current, embedding: { ...current.embedding, model: model || void 0 } } : { ...current, rerank: { ...current.rerank, model: model || void 0 } });
  const keyName = source === "custom" ? custom.apiKeyEnv : state.config.providers[source].apiKeyEnv;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-fields", children: [
    source === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("custom.baseURL"), value: custom.baseURL ?? "", placeholder: "https://example.com/v1", onChange: (baseURL) => setCustom({ baseURL }) }),
      role === "rerank" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("custom.rerankBaseURL"), value: custom.rerankBaseURL ?? "", onChange: (rerankBaseURL) => setCustom({ rerankBaseURL }) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("custom.keyName"), value: custom.apiKeyEnv ?? "", placeholder: "MY_API_KEY", onChange: (apiKeyEnv) => setCustom({ apiKeyEnv }) })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Field,
      {
        label: t("model.label"),
        value: modelValue ?? "",
        placeholder: source === "custom" ? "" : t("model.default", { model: DEFAULT_MODELS[source][role] }),
        onChange: setModel
      }
    ),
    source === "custom" && role === "embedding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("custom.dimensions"), value: String(draft.embedding.dimensions), onChange: (value) => update((current) => ({ ...current, embedding: { ...current.embedding, dimensions: Number(value) || 1024 } })) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "ss-check", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: custom.queryFormat === "qwen3", onChange: (event) => setCustom({ queryFormat: event.target.checked ? "qwen3" : "plain" }) }),
        t("custom.qwen3")
      ] })
    ] }) : null,
    keyName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyField, { api, t, state, name: keyName, refresh }) : null
  ] });
}
function KeyField({ api, t, state, name: name2, refresh }) {
  const [value, setValue] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)();
  const [status, setStatus] = (0, import_react.useState)(state.keys.find((key) => key.name === name2));
  (0, import_react.useEffect)(() => {
    const known = state.keys.find((key) => key.name === name2);
    setStatus((previous) => known ?? (previous?.name === name2 ? previous : void 0));
  }, [state, name2]);
  const run = async (action) => {
    setError(void 0);
    try {
      setStatus(await action());
      setValue("");
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-key", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-label", children: t("key.label", { name: name2 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: status?.configured ? "ss-ok" : "ss-muted", children: status?.configured ? t("key.configured", { source: status.source ?? "" }) : t("key.missing") }),
    state.canStoreKeys ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "ss-input", type: "password", autoComplete: "off", value, placeholder: t("key.placeholder"), onChange: (event) => setValue(event.target.value) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn", disabled: value.trim() === "", onClick: () => void run(() => api.setKey({ name: name2, value })), children: t("key.save") }),
      status?.configured && status.source !== "environment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-link", onClick: () => void run(() => api.clearKey({ name: name2 })), children: t("key.clear") }) : null
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-muted", children: t("key.storeOnly") }),
    error !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-error", children: error }) : null
  ] });
}
function TestButton({ api, t, draft, role, local }) {
  const [result, setResult] = (0, import_react.useState)();
  const latest = (0, import_react.useRef)(draft);
  latest.current = draft;
  (0, import_react.useEffect)(() => setResult(void 0), [draft, role]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ss-test", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-btn", disabled: result === "running", onClick: () => {
      setResult("running");
      api.testModel({ role, draft: latest.current }).then(setResult, (error) => setResult({ ok: false, ms: 0, detail: error instanceof Error ? error.message : String(error) }));
    }, children: result === "running" ? t("testing") : t("test") }),
    result === "running" && local ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-muted", children: t("test.localStart") }) : null,
    result !== void 0 && result !== "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: result.ok ? "ss-ok" : "ss-error", children: result.ok ? t("test.ok", { ms: result.ms, detail: result.detail }) : t("test.fail", { detail: result.detail }) }) : null
  ] });
}
function DiskSection({ api, t, state, refresh }) {
  const downloaded = state.local.models.filter((model) => model.downloaded);
  const ownBytes = (0, import_react.useMemo)(() => state.local.disk.modelBytes, [state]);
  if (!state.local.hardware.supported) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: "ss-disk", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
      t("disk.title"),
      " \xB7 ",
      formatBytes(state.local.disk.runtimeBytes + ownBytes)
    ] }),
    state.local.runtime.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("disk.runtime", { tag: state.local.runtime.tag, size: formatBytes(state.local.disk.runtimeBytes) }) }) : null,
    downloaded.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("disk.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: downloaded.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
      model.label,
      " \xB7 ",
      formatBytes(model.size),
      model.path !== void 0 && !model.path.startsWith(state.storageDir) ? ` ${t("disk.legacy")}` : "",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ss-link", onClick: () => void api.removeModel({ model: model.id }).then(() => refresh()), children: t("disk.delete") })
    ] }, model.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ss-muted", children: t("disk.note", { dir: `${state.storageDir}/models` }) })
  ] });
}
function Field({ label, value, placeholder, onChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "ss-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ss-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "ss-input", value, placeholder, onChange: (event) => onChange(event.target.value) })
  ] });
}
function draftFrom(state) {
  const { config } = state;
  return {
    embedding: { ...config.embedding },
    rerank: { ...config.rerank },
    providers: { custom: { ...config.providers.custom } }
  };
}
function summarize(draft, t) {
  const describe = (source, model, role) => {
    const label = t(`source.${source}`);
    const fallback = source in DEFAULT_MODELS ? DEFAULT_MODELS[source][role] : void 0;
    const name2 = model ?? fallback;
    return name2 ? `${label} ${name2}` : label;
  };
  const embedding = draft.embedding.source === "none" ? t("summary.keyword") : describe(draft.embedding.source, draft.embedding.model, "embedding");
  let rerank;
  if (draft.embedding.source === "none" && draft.rerank.source === "same") rerank = t("summary.off");
  else if (draft.rerank.source === "off") rerank = t("summary.off");
  else if (draft.rerank.source === "same") {
    const source = draft.embedding.source;
    rerank = source === "custom" && !draft.rerank.model ? t("summary.off") : describe(source, draft.rerank.model, "rerank");
  } else rerank = describe(draft.rerank.source, draft.rerank.model, "rerank");
  return [t("summary.embedding", { value: embedding }), t("summary.rerank", { value: rerank })];
}

// src/client/styles.ts
var STYLES = `
.ss-page { display: flex; flex-direction: column; gap: 12px; color: var(--dsw-alias-label-primary); font-size: 13px; line-height: 1.5; max-width: 760px; }
.ss-page p { margin: 0; }
.ss-muted { color: var(--dsw-alias-label-secondary); }
.ss-block { display: block; }
.ss-status { color: var(--dsw-alias-label-tertiary); font-size: 12px; word-break: break-word; }
.ss-ok { color: var(--dsw-alias-state-success-primary); }
.ss-warn { color: var(--dsw-alias-state-warn-primary); }
.ss-error { color: var(--dsw-alias-state-error-primary); word-break: break-word; }
.ss-steps { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; flex-wrap: wrap; }
.ss-step .ss-link { color: var(--dsw-alias-label-tertiary); font-weight: 500; }
.ss-step.ss-past .ss-link { color: var(--dsw-alias-label-secondary); }
.ss-step.ss-current .ss-link { color: var(--dsw-alias-brand-primary); }
.ss-section { display: flex; flex-direction: column; gap: 8px; }
.ss-choice, .ss-model { border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px; padding: 10px 12px; background: var(--dsw-alias-bg-layer-1); }
.ss-choice.ss-selected { border-color: var(--dsw-alias-brand-primary); }
.ss-choice-head { display: flex; gap: 8px; align-items: flex-start; cursor: pointer; }
.ss-choice-head input { margin-top: 3px; }
.ss-choice-body { margin: 10px 0 2px 24px; display: flex; flex-direction: column; gap: 8px; }
.ss-models { display: flex; flex-direction: column; gap: 6px; }
.ss-model { display: flex; justify-content: space-between; gap: 12px; align-items: center; flex-wrap: wrap; padding: 8px 10px; background: var(--dsw-alias-bg-layer-2); }
.ss-model.ss-selected { border-color: var(--dsw-alias-brand-primary); }
.ss-model-action { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.ss-tag { margin-left: 6px; padding: 0 6px; border-radius: 6px; font-size: 11px; color: var(--dsw-alias-brand-primary); border: 1px solid var(--dsw-alias-brand-primary); }
.ss-tag-dim { color: var(--dsw-alias-label-tertiary); border-color: var(--dsw-alias-border-l2); }
.ss-fields, .ss-key { display: flex; flex-direction: column; gap: 6px; }
.ss-field { display: flex; flex-direction: column; gap: 4px; }
.ss-label { font-size: 12px; color: var(--dsw-alias-label-secondary); }
.ss-row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.ss-input { min-width: 0; flex: 1; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font: inherit; }
.ss-input:focus { outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dsw-alias-brand-primary)); outline-offset: 0; }
.ss-check { display: flex; gap: 6px; align-items: center; }
.ss-btn { padding: 5px 12px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font: inherit; cursor: pointer; }
.ss-btn:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }
.ss-btn:disabled { opacity: 0.5; cursor: default; }
.ss-btn.ss-primary { background: var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary)); border-color: transparent; color: var(--dsw-alias-label-primary-foreground, #fff); }
.ss-link { border: none; background: none; padding: 0; color: var(--dsw-alias-brand-primary); font: inherit; cursor: pointer; text-align: left; }
.ss-actions { display: flex; gap: 8px; justify-content: flex-end; }
.ss-test { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.ss-progress { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; min-width: 220px; }
.ss-bar { width: 140px; height: 6px; border-radius: 3px; background: var(--dsw-alias-border-l2); overflow: hidden; }
.ss-bar-fill { height: 100%; background: var(--dsw-alias-brand-primary); transition: width 0.3s; }
.ss-summary { margin: 0; padding-left: 18px; }
.ss-callout { display: flex; gap: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--dsw-alias-state-warn-primary); }
.ss-disk { border-top: 1px solid var(--dsw-alias-border-l1); padding-top: 10px; }
.ss-disk summary { cursor: pointer; color: var(--dsw-alias-label-secondary); }
.ss-disk ul { margin: 6px 0; padding-left: 18px; }
`;

// src/client/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var name = PACKAGE;
var inject = ["remote", "slots"];
async function apply(ctx) {
  try {
    await mount(ctx);
  } catch (error) {
    console.error("[semantic-search] client failed to start", error);
    throw error;
  }
}
async function mount(ctx) {
  if (ctx.remote === void 0 || typeof ctx.remote.$mount !== "function") return;
  const unmount = await ctx.remote.$mount(REMOTE_CONTRIBUTION);
  ctx.effect(() => () => unmount(), "semantic-search: remote");
  const raw = ctx.get("remote.semanticSearch");
  if (raw === void 0) return;
  const api = wrapRemote(raw);
  ctx.effect(() => installStyles(), "semantic-search: styles");
  const language = () => {
    try {
      return ctx.get("locale")?.getSnapshot?.().active ?? document.documentElement.lang ?? navigator.language;
    } catch {
      return navigator.language;
    }
  };
  ctx.effect(() => ctx.slots.inject("plugins.bundle.config", () => ctx.slots.register(
    { name: "plugins.bundle.config", key: PACKAGE },
    ({ view }) => {
      const t = translator(language());
      return view === "summary" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SummaryLine, { api, t }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SetupPage, { api, t });
    }
  )), "semantic-search: plugin page");
}
function installStyles() {
  const element = document.createElement("style");
  element.dataset.owner = PACKAGE;
  element.textContent = STYLES;
  document.head.appendChild(element);
  return () => element.remove();
}
return module.exports } });
