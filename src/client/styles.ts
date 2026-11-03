/** Page styles on DSH's design tokens, so light and dark themes follow the host. */
export const STYLES = `
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
`
