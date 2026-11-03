#!/bin/sh
# Run Qwen3 embedding + rerank models locally with llama.cpp's llama-server,
# matching the qwen-rag `openaiCompatible.preset: local` defaults.
#
#   scripts/local-models.sh download   fetch the GGUF files (skips existing ones)
#   scripts/local-models.sh start      download if needed, then start both servers
#   scripts/local-models.sh stop       stop both servers
#   scripts/local-models.sh status     show health and resident memory
#
# Environment:
#   QWEN_RAG_EMBED_SIZE   0.6b (default, ~0.64 GB) | 4b (~2.5 GB) | 8b (~4.7 GB)
#   QWEN_RAG_EMBED_GGUF / QWEN_RAG_RERANK_GGUF   use your own GGUF file paths instead
#   QWEN_RAG_MODELS_DIR   default ~/.cache/dsh-qwen-rag/models
#   QWEN_RAG_EMBED_PORT / QWEN_RAG_RERANK_PORT   default 8081 / 8082
#   QWEN_RAG_CTX          per-server context and batch size, default 8192
set -eu

# Homebrew llama.cpp 0.8.0 fails to compile its bfloat Metal shaders on macOS 15
# ("constexpr function never produces a constant expression"); the models used
# here are Q8_0/Q4_K_M, so disabling BF16 kernels costs nothing.
export GGML_METAL_BF16_DISABLE=${GGML_METAL_BF16_DISABLE:-1}

MODELS_DIR=${QWEN_RAG_MODELS_DIR:-"$HOME/.cache/dsh-qwen-rag/models"}
RUN_DIR="$MODELS_DIR/../run"
EMBED_PORT=${QWEN_RAG_EMBED_PORT:-8081}
RERANK_PORT=${QWEN_RAG_RERANK_PORT:-8082}
CTX=${QWEN_RAG_CTX:-8192}

case "${QWEN_RAG_EMBED_SIZE:-0.6b}" in
  0.6b|0.6B) EMBED_REPO=Qwen/Qwen3-Embedding-0.6B-GGUF; EMBED_NAME=Qwen3-Embedding-0.6B-Q8_0.gguf ;;
  4b|4B) EMBED_REPO=Qwen/Qwen3-Embedding-4B-GGUF; EMBED_NAME=Qwen3-Embedding-4B-Q4_K_M.gguf ;;
  8b|8B) EMBED_REPO=Qwen/Qwen3-Embedding-8B-GGUF; EMBED_NAME=Qwen3-Embedding-8B-Q4_K_M.gguf ;;
  *) echo "unknown QWEN_RAG_EMBED_SIZE: $QWEN_RAG_EMBED_SIZE (use 0.6b, 4b or 8b)" >&2; exit 2 ;;
esac
RERANK_REPO=ggml-org/Qwen3-Reranker-0.6B-Q8_0-GGUF
RERANK_NAME=qwen3-reranker-0.6b-q8_0.gguf

EMBED_GGUF=${QWEN_RAG_EMBED_GGUF:-"$MODELS_DIR/$EMBED_NAME"}
RERANK_GGUF=${QWEN_RAG_RERANK_GGUF:-"$MODELS_DIR/$RERANK_NAME"}

need_llama() {
  if ! command -v llama-server >/dev/null 2>&1; then
    echo "llama-server not found. Install llama.cpp first, e.g. 'brew install llama.cpp'." >&2
    exit 1
  fi
}

fetch() { # repo file destination
  if [ -s "$3" ]; then return 0; fi
  mkdir -p "$(dirname "$3")"
  echo "downloading $1/$2 ..."
  curl -fL --retry 3 -o "$3.part" "https://huggingface.co/$1/resolve/main/$2"
  mv "$3.part" "$3"
}

download() {
  [ -n "${QWEN_RAG_EMBED_GGUF:-}" ] || fetch "$EMBED_REPO" "$EMBED_NAME" "$EMBED_GGUF"
  [ -n "${QWEN_RAG_RERANK_GGUF:-}" ] || fetch "$RERANK_REPO" "$RERANK_NAME" "$RERANK_GGUF"
}

healthy() { curl -fsS "http://127.0.0.1:$1/health" >/dev/null 2>&1; }

launch() { # name port args...
  name=$1 port=$2
  shift 2
  if healthy "$port"; then echo "$name already running on :$port"; return 0; fi
  mkdir -p "$RUN_DIR"
  nohup llama-server --host 127.0.0.1 --port "$port" "$@" >"$RUN_DIR/$name.log" 2>&1 &
  echo $! >"$RUN_DIR/$name.pid"
  i=0
  until healthy "$port"; do
    i=$((i + 1))
    if [ "$i" -gt 120 ] || ! kill -0 "$(cat "$RUN_DIR/$name.pid")" 2>/dev/null; then
      echo "$name failed to start; see $RUN_DIR/$name.log" >&2
      tail -20 "$RUN_DIR/$name.log" >&2
      exit 1
    fi
    sleep 0.5
  done
  echo "$name ready on http://127.0.0.1:$port/v1 (pid $(cat "$RUN_DIR/$name.pid"))"
}

start() {
  need_llama
  download
  launch embedding "$EMBED_PORT" -m "$EMBED_GGUF" --alias qwen3-embedding --embedding --pooling last -c "$CTX" -b "$CTX" -ub "$CTX"
  launch rerank "$RERANK_PORT" -m "$RERANK_GGUF" --alias qwen3-reranker --rerank --pooling rank -c "$CTX" -b "$CTX" -ub "$CTX"
}

stop() {
  for name in embedding rerank; do
    pidfile="$RUN_DIR/$name.pid"
    if [ -f "$pidfile" ] && kill "$(cat "$pidfile")" 2>/dev/null; then echo "stopped $name"; fi
    rm -f "$pidfile"
  done
}

status() {
  for pair in "embedding:$EMBED_PORT" "rerank:$RERANK_PORT"; do
    name=${pair%%:*} port=${pair##*:}
    pid=$(cat "$RUN_DIR/$name.pid" 2>/dev/null || true)
    if healthy "$port"; then
      rss=$( [ -n "$pid" ] && ps -o rss= -p "$pid" 2>/dev/null | awk '{printf "%.0f MB", $1/1024}' || true)
      echo "$name: healthy on :$port${pid:+ (pid $pid, RSS ${rss:-?})}"
    else
      echo "$name: not running on :$port"
    fi
  done
}

case "${1:-start}" in
  download) download ;;
  start) start ;;
  stop) stop ;;
  status) status ;;
  *) echo "usage: $0 [download|start|stop|status]" >&2; exit 2 ;;
esac
