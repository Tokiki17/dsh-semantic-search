/**
 * The three-step setup page: embedding source, rerank source (following the
 * embedding source unless changed), then save. Keys go straight to DSH
 * credentials; local models are downloaded with live progress.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Draft, EmbeddingSource, KeyStatus, ModelState, RerankSource, SemanticSearchApi, State, TestResult } from './api.ts'
import { formatBytes, type MessageKey, type Translate } from './i18n.ts'

type OnlineSource = 'dashscope' | 'siliconflow' | 'custom'
type ModelSource = 'local' | OnlineSource

const DEFAULT_MODELS: Record<Exclude<ModelSource, 'custom'>, { embedding: string; rerank: string }> = {
  local: { embedding: 'qwen3-embedding-0.6b', rerank: 'qwen3-reranker-0.6b' },
  dashscope: { embedding: 'qwen3.7-text-embedding', rerank: 'qwen3.7-text-rerank' },
  siliconflow: { embedding: 'Qwen/Qwen3-Embedding-4B', rerank: 'Qwen/Qwen3-Reranker-4B' },
}
const LOW_MEMORY_MB = 12 * 1024
const mb = (value: number): number => value * 1024 * 1024
const BIG_MODEL_MEMORY_MB = 32 * 1024

export function SetupPage({ api, t }: { api: SemanticSearchApi; t: Translate }) {
  const [state, setState] = useState<State | undefined>()
  const [loadError, setLoadError] = useState<string | undefined>()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft | undefined>()
  const [rerankChanged, setRerankChanged] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ ok: boolean; text: string } | undefined>()

  const refresh = useCallback(async (): Promise<State | undefined> => {
    try {
      const next = await api.getState()
      setState(next)
      setLoadError(undefined)
      return next
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : String(error))
      return undefined
    }
  }, [api])

  useEffect(() => {
    void refresh().then((loaded) => {
      if (loaded === undefined) return
      setDraft(draftFrom(loaded))
      setRerankChanged(loaded.config.rerank.source !== 'same')
    })
  }, [refresh])

  // Poll while a download or rebuild runs.
  const busy = state?.local.download.status === 'running' || state?.rebuild.status === 'running'
  useEffect(() => {
    if (!busy) return
    const timer = setInterval(() => void refresh(), 1000)
    return () => clearInterval(timer)
  }, [busy, refresh])

  if (state === undefined || draft === undefined) {
    return <div className="ss-page"><p className="ss-muted">{loadError === undefined ? t('loading') : t('loadFailed', { error: loadError })}</p></div>
  }

  const update = (change: (current: Draft) => Draft) => setDraft((current) => (current === undefined ? current : change(current)))

  const save = async () => {
    setSaving(true)
    setSaveMessage(undefined)
    try {
      const usesLocal = draft.embedding.source === 'local' || draft.rerank.source === 'local'
      const toSave: Draft = usesLocal && state.local.hardware.totalMemoryMB < LOW_MEMORY_MB ? { ...draft, local: { ...draft.local, ctx: 2048 } } : draft
      await api.saveConfig({ draft: toSave })
      // The host reloads the plugin with the new config; wait for the new service to answer.
      let reloaded: State | undefined
      for (let attempt = 0; attempt < 20 && reloaded === undefined; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, attempt === 0 ? 300 : 500))
        reloaded = await refresh()
      }
      setSaveMessage({ ok: true, text: t('saved') })
    } catch (error) {
      setSaveMessage({ ok: false, text: t('saveFailed', { error: error instanceof Error ? error.message : String(error) }) })
    } finally {
      setSaving(false)
    }
  }

  const steps: MessageKey[] = ['step.embedding', 'step.rerank', 'step.done']
  return (
    <div className="ss-page">
      <p className="ss-muted">{t('intro')}</p>
      <p className="ss-status">{state.error === undefined ? t('status.active', { value: summarize(draftFrom(state), t).join(' · ') }) : t('status.error', { error: state.error })}</p>
      <ol className="ss-steps">
        {steps.map((key, index) => (
          <li key={key} className={index === step ? 'ss-step ss-current' : index < step ? 'ss-step ss-past' : 'ss-step'}>
            <button type="button" className="ss-link" onClick={() => setStep(index)}>{index + 1}. {t(key)}</button>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <EmbeddingStep api={api} t={t} state={state} draft={draft} update={update} refresh={refresh} />
      ) : step === 1 ? (
        <RerankStep api={api} t={t} state={state} draft={draft} update={update} refresh={refresh} changed={rerankChanged} setChanged={setRerankChanged} />
      ) : (
        <DoneStep t={t} state={state} draft={draft} api={api} refresh={refresh} />
      )}

      <div className="ss-actions">
        {step > 0 ? <button type="button" className="ss-btn" onClick={() => setStep(step - 1)}>{t('back')}</button> : null}
        {step < 2 ? (
          <button type="button" className="ss-btn ss-primary" onClick={() => setStep(draft.embedding.source === 'none' && step === 0 ? 2 : step + 1)}>{t('next')}</button>
        ) : (
          <button type="button" className="ss-btn ss-primary" disabled={saving || !state.canSave} onClick={() => void save()}>{saving ? t('saving') : t('save')}</button>
        )}
      </div>
      {step === 2 && !state.canSave ? <p className="ss-warn">{t('cannotSave')}</p> : null}
      {saveMessage !== undefined ? <p className={saveMessage.ok ? 'ss-ok' : 'ss-error'}>{saveMessage.text}</p> : null}
      {saveMessage?.ok ? <StaleCollections api={api} t={t} state={state} refresh={refresh} /> : null}

      <DiskSection api={api} t={t} state={state} refresh={refresh} />
    </div>
  )
}

/** One line for the plugin card. */
export function SummaryLine({ api, t }: { api: SemanticSearchApi; t: Translate }) {
  const [state, setState] = useState<State | undefined>()
  useEffect(() => {
    api.getState().then(setState, () => {})
  }, [api])
  if (state === undefined) return null
  const draft = draftFrom(state)
  return <span>{summarize(draft, t).join(' · ')}</span>
}

interface StepProps {
  api: SemanticSearchApi
  t: Translate
  state: State
  draft: Draft
  update: (change: (current: Draft) => Draft) => void
  refresh: () => Promise<State | undefined>
}

function EmbeddingStep({ api, t, state, draft, update, refresh }: StepProps) {
  const source = draft.embedding.source
  const choose = (next: EmbeddingSource, model?: string) =>
    update((current) => ({
      ...current,
      embedding: {
        ...current.embedding,
        source: next,
        ...(model !== undefined ? { model } : { model: undefined }),
        // Built-in sources use the standard 1024 dimensions; only a custom service keeps a chosen width.
        dimensions: next === 'custom' ? current.embedding.dimensions : 1024,
      },
      // A rerank that follows the embedding source must not keep a model name from the previous source.
      rerank: current.rerank.source === 'same' && next !== current.embedding.source ? { source: 'same' } : current.rerank,
    }))
  return (
    <section className="ss-section">
      <p className="ss-muted">{t('embedding.hint')}</p>
      <Choice selected={source === 'none'} onSelect={() => choose('none')} title={t('source.none')} description={t('source.none.desc')} />
      <Choice selected={source === 'local'} onSelect={() => choose('local', draft.embedding.model?.startsWith('qwen3-embedding-') ? draft.embedding.model : 'qwen3-embedding-0.6b')} title={t('source.local')} description={t('source.local.desc')}>
        <LocalModels api={api} t={t} state={state} role="embedding" selected={draft.embedding.model ?? 'qwen3-embedding-0.6b'} onSelect={(model) => choose('local', model)} refresh={refresh} />
      </Choice>
      {(['dashscope', 'siliconflow', 'custom'] as const).map((online) => (
        <Choice key={online} selected={source === online} onSelect={() => choose(online)} title={t(`source.${online}`)} description={t(`source.${online}.desc`)}>
          <OnlineFields api={api} t={t} state={state} draft={draft} update={update} refresh={refresh} source={online} role="embedding" />
        </Choice>
      ))}
      {source !== 'none' ? <TestButton api={api} t={t} draft={draft} role="embedding" local={source === 'local'} /> : null}
    </section>
  )
}

function RerankStep({ api, t, state, draft, update, refresh, changed, setChanged }: StepProps & { changed: boolean; setChanged: (value: boolean) => void }) {
  const embeddingSource = draft.embedding.source
  if (embeddingSource === 'none') return <section className="ss-section"><p className="ss-muted">{t('rerank.noneEmbedding')}</p></section>
  const followed: ModelSource = embeddingSource
  const choose = (next: RerankSource, model?: string) => update((current) => ({ ...current, rerank: { source: next, ...(model !== undefined ? { model } : {}) } }))
  const sameModel = followed === 'custom' ? draft.rerank.model : DEFAULT_MODELS[followed].rerank

  if (!changed) {
    return (
      <section className="ss-section">
        <p className="ss-muted">{t('rerank.hint')}</p>
        <div className="ss-choice ss-selected">
          <strong>{t('rerank.same', { source: t(`source.${followed}`) })}</strong>
          {followed === 'custom' ? (
            <>
              <Field label={t('model.label')} value={draft.rerank.model ?? ''} onChange={(model) => choose('same', model || undefined)} />
              {!draft.rerank.model ? <p className="ss-muted">{t('rerank.customNoModel')}</p> : null}
            </>
          ) : (
            <p className="ss-muted">{t(followed === 'local' ? 'rerank.sameLocal' : 'rerank.sameModel', { model: sameModel ?? '' })}</p>
          )}
        </div>
        {followed !== 'custom' || draft.rerank.model ? <TestButton api={api} t={t} draft={draft} role="rerank" local={followed === 'local'} /> : null}
        <button type="button" className="ss-link" onClick={() => { setChanged(true); choose('off') }}>{t('rerank.change')}</button>
      </section>
    )
  }

  const source = draft.rerank.source
  const rerankModel = state.local.models.find((model) => model.role === 'rerank')
  return (
    <section className="ss-section">
      <p className="ss-muted">{t('rerank.hint')}</p>
      <button type="button" className="ss-link" onClick={() => { setChanged(false); choose('same') }}>{t('rerank.keepSame')}</button>
      <Choice selected={source === 'off'} onSelect={() => choose('off')} title={t('source.off')} description={t('source.off.desc')} />
      <Choice selected={source === 'local'} onSelect={() => choose('local', 'qwen3-reranker-0.6b')} title={t('source.local')} description={t('source.local.desc')}>
        <LocalModels api={api} t={t} state={state} role="rerank" selected="qwen3-reranker-0.6b" onSelect={(model) => choose('local', model)} refresh={refresh} />
        {embeddingSource !== 'local' && rerankModel !== undefined ? <p className="ss-muted">{t('local.mixedMemory', { memory: formatBytes(mb(rerankModel.memoryMB)) })}</p> : null}
      </Choice>
      {(['dashscope', 'siliconflow', 'custom'] as const).map((online) => (
        <Choice key={online} selected={source === online} onSelect={() => choose(online)} title={t(`source.${online}`)} description={t(`source.${online}.desc`)}>
          <OnlineFields api={api} t={t} state={state} draft={draft} update={update} refresh={refresh} source={online} role="rerank" />
        </Choice>
      ))}
      {source !== 'off' && source !== 'same' ? <TestButton api={api} t={t} draft={draft} role="rerank" local={source === 'local'} /> : null}
    </section>
  )
}

function DoneStep({ t, state, draft }: { t: Translate; state: State; draft: Draft; api: SemanticSearchApi; refresh: () => Promise<State | undefined> }) {
  return (
    <section className="ss-section">
      <ul className="ss-summary">{summarize(draft, t).map((line) => <li key={line}>{line}</li>)}</ul>
      {state.local.hardware.totalMemoryMB < LOW_MEMORY_MB && (draft.embedding.source === 'local' || draft.rerank.source === 'local')
        ? <p className="ss-muted">{t('local.lowMemory', { memory: formatBytes(mb(state.local.hardware.totalMemoryMB)) })}</p>
        : null}
      <p className="ss-muted">{t('done.next')}</p>
    </section>
  )
}

function StaleCollections({ api, t, state, refresh }: { api: SemanticSearchApi; t: Translate; state: State; refresh: () => Promise<State | undefined> }) {
  const stale = state.collections.filter((collection) => collection.stale)
  const { rebuild } = state
  if (rebuild.status === 'running') return <p className="ss-muted">{t('stale.running', { done: rebuild.done, total: rebuild.total, current: rebuild.current ?? '' })}</p>
  if (rebuild.status === 'failed') return <p className="ss-error">{t('stale.failed', { error: rebuild.error ?? '' })}</p>
  if (stale.length === 0) return rebuild.status === 'done' && rebuild.total > 0 ? <p className="ss-ok">{t('stale.done')}</p> : null
  const remote = state.config.embedding.source !== 'local' && state.config.embedding.source !== 'none'
  return (
    <div className="ss-callout">
      <p>{t('stale', { count: stale.length })}{remote ? ` ${t('stale.remoteNote')}` : ''}</p>
      <button type="button" className="ss-btn" onClick={() => void api.rebuildStale().then(() => refresh())}>{t('stale.rebuild')}</button>
    </div>
  )
}

function Choice({ selected, onSelect, title, description, children }: { selected: boolean; onSelect: () => void; title: string; description: string; children?: ReactNode }) {
  return (
    <div className={selected ? 'ss-choice ss-selected' : 'ss-choice'}>
      <label className="ss-choice-head">
        <input type="radio" checked={selected} onChange={onSelect} />
        <span><strong>{title}</strong><span className="ss-muted ss-block">{description}</span></span>
      </label>
      {selected && children !== undefined ? <div className="ss-choice-body">{children}</div> : null}
    </div>
  )
}

function LocalModels({ api, t, state, role, selected, onSelect, refresh }: {
  api: SemanticSearchApi; t: Translate; state: State; role: 'embedding' | 'rerank'; selected: string; onSelect: (model: string) => void; refresh: () => Promise<State | undefined>
}) {
  const { hardware, runtime, download } = state.local
  const [error, setError] = useState<string | undefined>()
  if (!hardware.supported) return <p className="ss-warn">{t('local.unsupported', { platform: `${hardware.platform}-${hardware.arch}` })}</p>
  const models = state.local.models.filter((model) => model.role === role)
  const start = async (model: ModelState) => {
    setError(undefined)
    try {
      await api.startDownload({ model: model.id })
      await refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught))
    }
  }
  return (
    <div className="ss-models">
      {models.map((model) => {
        const needed = model.size + (runtime.installed ? 0 : runtime.size ?? 0)
        const noDisk = hardware.freeDiskMB !== undefined && mb(hardware.freeDiskMB) < needed * 1.1
        const recommended = model.id.endsWith('0.6b')
        const active = download.target === model.id
        return (
          <div key={model.id} className={selected === model.id ? 'ss-model ss-selected' : 'ss-model'}>
            <label className="ss-choice-head">
              <input type="radio" checked={selected === model.id} onChange={() => onSelect(model.id)} />
              <span>
                <strong>{model.label}</strong>
                {recommended ? <span className="ss-tag">{t('local.recommended')}</span> : null}
                {model.memoryMB * 1.5 > hardware.totalMemoryMB || (!recommended && hardware.totalMemoryMB < BIG_MODEL_MEMORY_MB) ? <span className="ss-tag ss-tag-dim">{t('local.big')}</span> : null}
                <span className="ss-muted ss-block">{t('local.size', { size: formatBytes(model.size) })} · {t('local.memory', { memory: formatBytes(mb(model.memoryMB)) })}</span>
              </span>
            </label>
            <div className="ss-model-action">
              {model.downloaded && !runtime.installed && active && download.status === 'running' ? (
                <Progress t={t} state={state} onCancel={() => void api.cancelDownload().then(() => refresh())} />
              ) : model.downloaded && !runtime.installed ? (
                <>
                  <span className="ss-ok">{t('local.downloaded')}</span>
                  <button type="button" className="ss-btn" disabled={download.status === 'running'} onClick={() => void start(model)}>
                    {t('local.downloadRuntime', { size: formatBytes(runtime.size ?? 0) })}
                  </button>
                </>
              ) : model.downloaded ? (
                <span className="ss-ok">{t('local.downloaded')}</span>
              ) : active && download.status === 'running' ? (
                <Progress t={t} state={state} onCancel={() => void api.cancelDownload().then(() => refresh())} />
              ) : (
                <>
                  <button type="button" className="ss-btn" disabled={noDisk || download.status === 'running'} onClick={() => void start(model)}>{t('local.download')}</button>
                  {noDisk ? <span className="ss-warn">{t('local.noDisk', { free: formatBytes(mb(hardware.freeDiskMB ?? 0)) })}</span> : null}
                  {active && download.status === 'failed' ? <span className="ss-error">{t('local.failed', { error: download.error ?? '' })}</span> : null}
                </>
              )}
            </div>
          </div>
        )
      })}
      {!runtime.installed && runtime.size !== undefined ? <p className="ss-muted">{t('local.runtime', { size: formatBytes(runtime.size) })}</p> : null}
      {error !== undefined ? <p className="ss-error">{error}</p> : null}
    </div>
  )
}

function Progress({ t, state, onCancel }: { t: Translate; state: State; onCancel: () => void }) {
  const { download } = state.local
  const percent = download.total > 0 ? Math.floor((download.received / download.total) * 100) : 0
  return (
    <div className="ss-progress">
      <div className="ss-bar"><div className="ss-bar-fill" style={{ width: `${percent}%` }} /></div>
      <span className="ss-muted">
        {download.source === undefined ? t('local.preparing') : t('local.downloading', { percent, speed: formatBytes(download.bytesPerSecond), source: download.source })}
      </span>
      <button type="button" className="ss-link" onClick={onCancel}>{t('local.cancel')}</button>
    </div>
  )
}

function OnlineFields({ api, t, state, draft, update, refresh, source, role }: StepProps & { source: OnlineSource; role: 'embedding' | 'rerank' }) {
  const custom = draft.providers?.custom ?? {}
  const setCustom = (patch: NonNullable<NonNullable<Draft['providers']>['custom']>) =>
    update((current) => ({ ...current, providers: { ...current.providers, custom: { ...current.providers?.custom, ...patch } } }))
  const modelValue = role === 'embedding' ? draft.embedding.model : draft.rerank.model
  const setModel = (model: string) => update((current) => role === 'embedding'
    ? { ...current, embedding: { ...current.embedding, model: model || undefined } }
    : { ...current, rerank: { ...current.rerank, model: model || undefined } })
  const keyName = source === 'custom' ? custom.apiKeyEnv : state.config.providers[source].apiKeyEnv
  return (
    <div className="ss-fields">
      {source === 'custom' ? (
        <>
          <Field label={t('custom.baseURL')} value={custom.baseURL ?? ''} placeholder="https://example.com/v1" onChange={(baseURL) => setCustom({ baseURL })} />
          {role === 'rerank' ? <Field label={t('custom.rerankBaseURL')} value={custom.rerankBaseURL ?? ''} onChange={(rerankBaseURL) => setCustom({ rerankBaseURL })} /> : null}
          <Field label={t('custom.keyName')} value={custom.apiKeyEnv ?? ''} placeholder="MY_API_KEY" onChange={(apiKeyEnv) => setCustom({ apiKeyEnv })} />
        </>
      ) : null}
      <Field
        label={t('model.label')}
        value={modelValue ?? ''}
        placeholder={source === 'custom' ? '' : t('model.default', { model: DEFAULT_MODELS[source][role] })}
        onChange={setModel}
      />
      {source === 'custom' && role === 'embedding' ? (
        <>
          <Field label={t('custom.dimensions')} value={String(draft.embedding.dimensions)} onChange={(value) => update((current) => ({ ...current, embedding: { ...current.embedding, dimensions: Number(value) || 1024 } }))} />
          <label className="ss-check">
            <input type="checkbox" checked={custom.queryFormat === 'qwen3'} onChange={(event) => setCustom({ queryFormat: event.target.checked ? 'qwen3' : 'plain' })} />
            {t('custom.qwen3')}
          </label>
        </>
      ) : null}
      {keyName ? <KeyField api={api} t={t} state={state} name={keyName} refresh={refresh} /> : null}
    </div>
  )
}

function KeyField({ api, t, state, name, refresh }: { api: SemanticSearchApi; t: Translate; state: State; name: string; refresh: () => Promise<State | undefined> }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [status, setStatus] = useState(state.keys.find((key) => key.name === name))
  useEffect(() => {
    const known = state.keys.find((key) => key.name === name)
    setStatus((previous) => known ?? (previous?.name === name ? previous : undefined))
  }, [state, name])
  const run = async (action: () => Promise<KeyStatus>) => {
    setError(undefined)
    try {
      // A new custom key name is not in the saved config yet, so keep the status this call returned.
      setStatus(await action())
      setValue('')
      await refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught))
    }
  }
  return (
    <div className="ss-key">
      <span className="ss-label">{t('key.label', { name })}</span>
      <span className={status?.configured ? 'ss-ok' : 'ss-muted'}>{status?.configured ? t('key.configured', { source: status.source ?? '' }) : t('key.missing')}</span>
      {state.canStoreKeys ? (
        <div className="ss-row">
          <input className="ss-input" type="password" autoComplete="off" value={value} placeholder={t('key.placeholder')} onChange={(event) => setValue(event.target.value)} />
          <button type="button" className="ss-btn" disabled={value.trim() === ''} onClick={() => void run(() => api.setKey({ name, value }))}>{t('key.save')}</button>
          {status?.configured && status.source !== 'environment' ? <button type="button" className="ss-link" onClick={() => void run(() => api.clearKey({ name }))}>{t('key.clear')}</button> : null}
        </div>
      ) : null}
      <span className="ss-muted">{t('key.storeOnly')}</span>
      {error !== undefined ? <span className="ss-error">{error}</span> : null}
    </div>
  )
}

function TestButton({ api, t, draft, role, local }: { api: SemanticSearchApi; t: Translate; draft: Draft; role: 'embedding' | 'rerank'; local: boolean }) {
  const [result, setResult] = useState<TestResult | 'running' | undefined>()
  const latest = useRef(draft)
  latest.current = draft
  useEffect(() => setResult(undefined), [draft, role])
  return (
    <div className="ss-test">
      <button type="button" className="ss-btn" disabled={result === 'running'} onClick={() => {
        setResult('running')
        api.testModel({ role, draft: latest.current }).then(setResult, (error: unknown) => setResult({ ok: false, ms: 0, detail: error instanceof Error ? error.message : String(error) }))
      }}>{result === 'running' ? t('testing') : t('test')}</button>
      {result === 'running' && local ? <span className="ss-muted">{t('test.localStart')}</span> : null}
      {result !== undefined && result !== 'running'
        ? <span className={result.ok ? 'ss-ok' : 'ss-error'}>{result.ok ? t('test.ok', { ms: result.ms, detail: result.detail }) : t('test.fail', { detail: result.detail })}</span>
        : null}
    </div>
  )
}

function DiskSection({ api, t, state, refresh }: { api: SemanticSearchApi; t: Translate; state: State; refresh: () => Promise<State | undefined> }) {
  const downloaded = state.local.models.filter((model) => model.downloaded)
  const ownBytes = useMemo(() => state.local.disk.modelBytes, [state])
  if (!state.local.hardware.supported) return null
  return (
    <details className="ss-disk">
      <summary>{t('disk.title')} · {formatBytes(state.local.disk.runtimeBytes + ownBytes)}</summary>
      {state.local.runtime.installed ? <p>{t('disk.runtime', { tag: state.local.runtime.tag, size: formatBytes(state.local.disk.runtimeBytes) })}</p> : null}
      {downloaded.length === 0 ? <p className="ss-muted">{t('disk.none')}</p> : (
        <ul>
          {downloaded.map((model) => (
            <li key={model.id}>
              {model.label} · {formatBytes(model.size)}{model.path !== undefined && !model.path.startsWith(state.storageDir) ? ` ${t('disk.legacy')}` : ''}
              {' '}
              <button type="button" className="ss-link" onClick={() => void api.removeModel({ model: model.id }).then(() => refresh())}>{t('disk.delete')}</button>
            </li>
          ))}
        </ul>
      )}
      <p className="ss-muted">{t('disk.note', { dir: `${state.storageDir}/models` })}</p>
    </details>
  )
}

function Field({ label, value, placeholder, onChange }: { label: string; value: string; placeholder?: string; onChange: (value: string) => void }) {
  return (
    <label className="ss-field">
      <span className="ss-label">{label}</span>
      <input className="ss-input" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function draftFrom(state: State): Draft {
  const { config } = state
  return {
    embedding: { ...config.embedding },
    rerank: { ...config.rerank },
    providers: { custom: { ...config.providers.custom } },
  }
}

function summarize(draft: Draft, t: Translate): string[] {
  const describe = (source: string, model: string | undefined, role: 'embedding' | 'rerank'): string => {
    const label = t(`source.${source}` as MessageKey)
    const fallback = source in DEFAULT_MODELS ? DEFAULT_MODELS[source as Exclude<ModelSource, 'custom'>][role] : undefined
    const name = model ?? fallback
    return name ? `${label} ${name}` : label
  }
  const embedding = draft.embedding.source === 'none' ? t('summary.keyword') : describe(draft.embedding.source, draft.embedding.model, 'embedding')
  let rerank: string
  if (draft.embedding.source === 'none' && draft.rerank.source === 'same') rerank = t('summary.off')
  else if (draft.rerank.source === 'off') rerank = t('summary.off')
  else if (draft.rerank.source === 'same') {
    const source = draft.embedding.source as ModelSource
    rerank = source === 'custom' && !draft.rerank.model ? t('summary.off') : describe(source, draft.rerank.model, 'rerank')
  } else rerank = describe(draft.rerank.source, draft.rerank.model, 'rerank')
  return [t('summary.embedding', { value: embedding }), t('summary.rerank', { value: rerank })]
}
