/**
 * Host-face Typert manifest for the `semanticSearch` service, exported as
 * `./typert` so dsh-typert-loader registers it and the web client can call
 * `semanticSearch/<method>`. Hand-written in the shape the typert generator
 * emits; strict codecs carry both `schema` (older hosts) and `create()`.
 */
import { z } from 'zod'

const PACKAGE = '@tokiki/dsh-semantic-search'
const SERVICE = 'semanticSearch'

const strictCodec = (name: string, schema: z.ZodType) => ({ mode: 'strict', typeSymbol: `${PACKAGE}#${name}`, schema, create: () => schema })

const modelSource = ['local', 'dashscope', 'siliconflow', 'custom'] as const
const text = z.string().max(2048)

export const draftSchema = z.object({
  embedding: z.object({
    source: z.enum(['none', ...modelSource]),
    model: text.optional(),
    dimensions: z.number().int().min(32).max(4096),
    batchSize: z.number().int().min(1).max(256).optional(),
  }),
  rerank: z.object({
    source: z.enum(['same', 'off', ...modelSource]),
    model: text.optional(),
  }),
  providers: z.object({
    dashscope: z.object({ baseURL: text.optional(), apiKeyEnv: text.optional() }).optional(),
    siliconflow: z.object({ baseURL: text.optional(), apiKeyEnv: text.optional() }).optional(),
    custom: z.object({
      baseURL: text.optional(),
      rerankBaseURL: text.optional(),
      apiKeyEnv: text.optional(),
      queryFormat: z.enum(['qwen3', 'plain']).optional(),
      sendDimensions: z.boolean().optional(),
    }).optional(),
  }).optional(),
  local: z.object({
    ctx: z.number().int().min(1024).max(32768).optional(),
    downloadSource: z.enum(['auto', 'huggingface', 'hf-mirror', 'modelscope']).optional(),
    githubMirror: text.optional(),
  }).optional(),
})

const keyStatus = z.object({ name: z.string(), configured: z.boolean(), source: z.string().optional(), writable: z.boolean() })
const downloadState = z.looseObject({ status: z.enum(['idle', 'running', 'done', 'failed', 'cancelled']), received: z.number(), total: z.number() })
const rebuildState = z.looseObject({ status: z.enum(['idle', 'running', 'done', 'failed']), done: z.number(), total: z.number() })
const stateSchema = z.looseObject({
  config: z.looseObject({}),
  active: z.string(),
  keys: z.array(keyStatus),
  canSave: z.boolean(),
  canStoreKeys: z.boolean(),
  storageDir: z.string(),
  local: z.looseObject({ download: downloadState }),
  collections: z.array(z.looseObject({ name: z.string(), stale: z.boolean() })),
  rebuild: rebuildState,
})

interface Method {
  readonly name: string
  readonly signature: string
  readonly summary: string
  readonly request?: { readonly type: string; readonly schema: z.ZodType }
  readonly result: { readonly type: string; readonly schema: z.ZodType }
}

const METHODS: readonly Method[] = [
  { name: 'getState', signature: 'getState(): Promise<SemanticSearchState>', summary: 'Configuration, key status, local models and collections.', result: { type: 'SemanticSearchState', schema: stateSchema } },
  {
    name: 'testModel', signature: 'testModel(request: TestModelRequest): Promise<TestResult>', summary: 'Send one real embedding or rerank request with a draft configuration.',
    request: { type: 'TestModelRequest', schema: z.object({ role: z.enum(['embedding', 'rerank']), draft: draftSchema }) },
    result: { type: 'TestResult', schema: z.object({ ok: z.boolean(), ms: z.number(), detail: z.string() }) },
  },
  {
    name: 'saveConfig', signature: 'saveConfig(request: SaveConfigRequest): Promise<SaveResult>', summary: 'Write the draft into the profile patch; the plugin reloads with it.',
    request: { type: 'SaveConfigRequest', schema: z.object({ draft: draftSchema }) },
    result: { type: 'SaveResult', schema: z.object({ saved: z.boolean() }) },
  },
  {
    name: 'setKey', signature: 'setKey(request: SetKeyRequest): Promise<KeyStatus>', summary: 'Store a provider API key in DSH credentials.',
    request: { type: 'SetKeyRequest', schema: z.object({ name: z.string().max(128), value: z.string().min(1).max(4096) }) },
    result: { type: 'KeyStatus', schema: keyStatus },
  },
  {
    name: 'clearKey', signature: 'clearKey(request: KeyRequest): Promise<KeyStatus>', summary: 'Remove a stored provider API key.',
    request: { type: 'KeyRequest', schema: z.object({ name: z.string().max(128) }) },
    result: { type: 'KeyStatus', schema: keyStatus },
  },
  {
    name: 'startDownload', signature: 'startDownload(request: ModelRequest): DownloadState', summary: 'Download the local runtime (if needed) and a model in the background.',
    request: { type: 'ModelRequest', schema: z.object({ model: z.string().max(128) }) },
    result: { type: 'DownloadState', schema: downloadState },
  },
  { name: 'cancelDownload', signature: 'cancelDownload(): DownloadState', summary: 'Cancel the running download.', result: { type: 'DownloadState', schema: downloadState } },
  {
    name: 'removeModel', signature: 'removeModel(request: ModelRequest): Promise<RemoveResult>', summary: 'Delete a downloaded local model.',
    request: { type: 'ModelRequest', schema: z.object({ model: z.string().max(128) }) },
    result: { type: 'RemoveResult', schema: z.object({ removed: z.boolean() }) },
  },
  { name: 'rebuildStale', signature: 'rebuildStale(): RebuildState', summary: 'Rebuild collections whose vectors came from another model.', result: { type: 'RebuildState', schema: rebuildState } },
]

export const TYPERT = {
  package: PACKAGE,
  face: 'host',
  schemas: [],
  invocations: METHODS.map((method) => ({
    id: `${PACKAGE}#${SERVICE}/${method.name}`,
    service: SERVICE,
    namespace: SERVICE,
    method: method.name,
    invocation: { kind: 'direct' },
    parameters: method.request === undefined ? [] : [{ name: 'request', wire: 'request', source: 'json', codec: strictCodec(method.request.type, method.request.schema) }],
    result: strictCodec(method.result.type, method.result.schema),
  })),
  model: {
    services: [
      {
        key: SERVICE,
        exportName: 'SemanticSearchService',
        description: 'Semantic Search setup service (ctx.semanticSearch): model sources, keys, local models and collections.',
        summary: 'Semantic Search setup service.',
        tags: [],
        jsDoc: '/** Semantic Search setup service (ctx.semanticSearch). */',
        members: METHODS.map((method) => ({ kind: 'method', name: method.name, signature: method.signature, summary: method.summary })),
        types: [],
      },
    ],
    events: [],
    objects: [],
  },
}

export default TYPERT
