// Evaluation only (eval/README.md): a hard tool-call budget per agent, so accuracy can be
// compared when the model cannot keep searching until it finds the answer.
// EVAL_TOOL_BUDGET=<n> allows n tool calls (0: none, for closed-book screening); later calls are
// refused with a request to answer. Unset: no limit.
export const name = 'eval-tool-budget'

export function apply(ctx) {
  const raw = process.env.EVAL_TOOL_BUDGET
  const budget = Number(raw)
  if (raw === undefined || raw === '' || !(budget >= 0)) return
  const used = new WeakMap()
  ctx.on('tools/pre-execute', async (exec, next) => {
    const decision = await next()
    if (exec.agent === undefined || decision.kind !== 'allow') return decision
    const count = (used.get(exec.agent) ?? 0) + 1
    used.set(exec.agent, count)
    if (count <= budget) return decision
    return { kind: 'deny', reason: `Tool budget of ${budget} calls is used up. Answer now from what you have already found; say what you could not verify.` }
  })
}
