/**
 * Pinned downloads for the plugin-managed local backend: one llama.cpp
 * release (prebuilt llama-server per platform) and the Qwen3 GGUF models,
 * each with its exact size and sha256.
 */

export const LLAMA_CPP_TAG = 'b11765'

export interface RuntimeAsset {
  readonly name: string
  readonly size: number
  readonly sha256: string
}

/** Keyed by `${process.platform}-${process.arch}`; CPU/Metal builds only. */
export const RUNTIME_ASSETS: Readonly<Record<string, RuntimeAsset>> = {
  'darwin-arm64': { name: `llama-${LLAMA_CPP_TAG}-bin-macos-arm64.tar.gz`, size: 16084594, sha256: '411350ac7aa943907db7867b3b3a112166f60d7dc9748c7f7528f3e5f223a4f2' },
  'darwin-x64': { name: `llama-${LLAMA_CPP_TAG}-bin-macos-x64.tar.gz`, size: 11808231, sha256: 'ed384b64e52bf9a70d1e15f6511876d1b466cc664b929d8eed2fc0aa154512c6' },
  'linux-x64': { name: `llama-${LLAMA_CPP_TAG}-bin-ubuntu-x64.tar.gz`, size: 22233565, sha256: '2a8d3b1c1777dcddeff1aa626979d7a7b3ea8ae1358f488763874aa95093cdee' },
  'linux-arm64': { name: `llama-${LLAMA_CPP_TAG}-bin-ubuntu-arm64.tar.gz`, size: 17960716, sha256: '7efcca5df39c18ab66131c6a6a7325f20a84a18330dae244fbcbe9ebcce2d2b3' },
  'win32-x64': { name: `llama-${LLAMA_CPP_TAG}-bin-win-cpu-x64.zip`, size: 23958401, sha256: '51188c5e887e49507a4df0baf57b0ac842df3f97e7c92950209e3b0e13b04548' },
  'win32-arm64': { name: `llama-${LLAMA_CPP_TAG}-bin-win-cpu-arm64.zip`, size: 12598037, sha256: '823962f00d7d35cb9b15fdb475a745a50c17ef5240c24a3b9a36785790f292f4' },
}

export function runtimeAsset(platform: string = process.platform, arch: string = process.arch): RuntimeAsset | undefined {
  return RUNTIME_ASSETS[`${platform}-${arch}`]
}

export function runtimeUrls(asset: RuntimeAsset, githubMirror: string | undefined): string[] {
  const direct = `https://github.com/ggml-org/llama.cpp/releases/download/${LLAMA_CPP_TAG}/${asset.name}`
  return githubMirror ? [`${githubMirror.replace(/\/*$/, '/')}${direct}`, direct] : [direct]
}

export type ModelRole = 'embedding' | 'rerank'

export interface LocalModel {
  /** Model name used in config (`embedding.model` / `rerank.model`) and requests. */
  readonly id: string
  readonly role: ModelRole
  readonly label: string
  /** Hugging Face repo; ModelScope mirrors the same path. */
  readonly repo: string
  readonly file: string
  readonly size: number
  readonly sha256: string
  /** Native embedding width (Matryoshka: any smaller `dimensions` works). */
  readonly dims: number | undefined
  /** Approximate resident memory of its llama-server at ctx 8192 (measured for 0.6B, estimated otherwise). */
  readonly memoryMB: number
}

export const LOCAL_MODELS: readonly LocalModel[] = [
  {
    id: 'qwen3-embedding-0.6b', role: 'embedding', label: 'Qwen3-Embedding 0.6B (Q8_0)',
    repo: 'Qwen/Qwen3-Embedding-0.6B-GGUF', file: 'Qwen3-Embedding-0.6B-Q8_0.gguf',
    size: 639150592, sha256: '06507c7b42688469c4e7298b0a1e16deff06caf291cf0a5b278c308249c3e439', dims: 1024, memoryMB: 1700,
  },
  {
    id: 'qwen3-embedding-4b', role: 'embedding', label: 'Qwen3-Embedding 4B (Q4_K_M)',
    repo: 'Qwen/Qwen3-Embedding-4B-GGUF', file: 'Qwen3-Embedding-4B-Q4_K_M.gguf',
    size: 2496703776, sha256: '2b0cf8f17b4c723c27303015383c27ec4bf2d8314bb677d05e920dd70bb0f16b', dims: 2560, memoryMB: 3800,
  },
  {
    id: 'qwen3-embedding-8b', role: 'embedding', label: 'Qwen3-Embedding 8B (Q4_K_M)',
    repo: 'Qwen/Qwen3-Embedding-8B-GGUF', file: 'Qwen3-Embedding-8B-Q4_K_M.gguf',
    size: 4676804928, sha256: '3fcd3febec8b3fd64435204db75bf0dd73b91e8d0661e0331acfe7e7c3120b85', dims: 4096, memoryMB: 6400,
  },
  {
    id: 'qwen3-reranker-0.6b', role: 'rerank', label: 'Qwen3-Reranker 0.6B (Q8_0)',
    repo: 'ggml-org/Qwen3-Reranker-0.6B-Q8_0-GGUF', file: 'qwen3-reranker-0.6b-q8_0.gguf',
    size: 639153184, sha256: '22c9979ce4fbcdc5acdc310c6641c32797eff1aa980b8f7a2db8a8ea23429a48', dims: undefined, memoryMB: 1600,
  },
]

export function localModel(id: string): LocalModel | undefined {
  return LOCAL_MODELS.find((model) => model.id === id)
}

export type ModelHost = 'huggingface' | 'hf-mirror' | 'modelscope'

export function modelUrl(model: LocalModel, host: ModelHost): string {
  switch (host) {
    case 'huggingface':
      return `https://huggingface.co/${model.repo}/resolve/main/${model.file}`
    case 'hf-mirror':
      return `https://hf-mirror.com/${model.repo}/resolve/main/${model.file}`
    case 'modelscope':
      return `https://modelscope.cn/models/${model.repo}/resolve/master/${model.file}`
  }
}
