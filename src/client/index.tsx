/**
 * Browser half of Semantic Search: mounts the `semanticSearch` remote and
 * renders the setup page on the bundle's page in Plugins
 * (`plugins.bundle.config`, keyed by the package name), with a one-line
 * summary on its card.
 */
import { PACKAGE, REMOTE_CONTRIBUTION, wrapRemote, type SemanticSearchApi } from './api.ts'
import { translator } from './i18n.ts'
import { SetupPage, SummaryLine } from './page.tsx'
import { STYLES } from './styles.ts'

interface ClientContext {
  remote?: { $mount(contribution: unknown): Promise<() => void> }
  slots: {
    inject(slot: string, body: () => () => void): () => void
    register(entry: { name: string; key: string }, render: (props: { view?: string }) => unknown): () => void
  }
  get(name: string): any
  effect(body: () => () => void, label?: string): void
}

export const name = PACKAGE
export const inject = ['remote', 'slots']

export async function apply(ctx: ClientContext): Promise<void> {
  try {
    await mount(ctx)
  } catch (error) {
    // The web boot only reports "failed"; keep the cause visible in the console.
    console.error('[semantic-search] client failed to start', error)
    throw error
  }
}

async function mount(ctx: ClientContext): Promise<void> {
  if (ctx.remote === undefined || typeof ctx.remote.$mount !== 'function') return
  const unmount = await ctx.remote.$mount(REMOTE_CONTRIBUTION)
  ctx.effect(() => () => unmount(), 'semantic-search: remote')
  const raw = ctx.get('remote.semanticSearch')
  if (raw === undefined) return
  const api: SemanticSearchApi = wrapRemote(raw)
  ctx.effect(() => installStyles(), 'semantic-search: styles')

  const language = (): string | undefined => {
    try {
      return ctx.get('locale')?.getSnapshot?.().active ?? document.documentElement.lang ?? navigator.language
    } catch {
      return navigator.language
    }
  }
  ctx.effect(() => ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register(
    { name: 'plugins.bundle.config', key: PACKAGE },
    ({ view }) => {
      const t = translator(language())
      return view === 'summary' ? <SummaryLine api={api} t={t} /> : <SetupPage api={api} t={t} />
    },
  )), 'semantic-search: plugin page')
}

function installStyles(): () => void {
  const element = document.createElement('style')
  element.dataset.owner = PACKAGE
  element.textContent = STYLES
  document.head.appendChild(element)
  return () => element.remove()
}
