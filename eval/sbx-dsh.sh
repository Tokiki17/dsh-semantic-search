#!/bin/zsh
# Run DSH headless inside eval/sandbox.sb; the corpus is the current directory.
#   AGENT_BIN=eval/sbx-dsh.sh EVAL_SCRATCH=<folder holding DSH_HOME, corpora and notes> node eval/run.ts …
# DSH's own command sandbox cannot nest inside sandbox-exec, so it is switched off here and
# this profile does the confining instead.
here=${0:A:h}
repo=${here:h}
export DSH_PERMISSION_MODE=danger-full-access
exec sandbox-exec -f "$here/sandbox.sb" \
  -D HOME="$HOME" -D DOCUMENTS="$HOME/Documents" -D REPO="$repo" -D STORE="$repo/eval/.store" \
  -D SCRATCH="${EVAL_SCRATCH:?set EVAL_SCRATCH}" -D DSH_HOME="${DSH_HOME:?set DSH_HOME}" \
  -D AGENTS="${DSH_AGENTS_HOME:-$DSH_HOME/agents}" -D CORPUS="$PWD" \
  "${DSH_BIN:-/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh}" "$@"
