#!/usr/bin/env bash
set -euo pipefail

echo "[setup-full] إعداد كامل لمنصة BETC – النسخة المحسنة"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  cp .env.example .env
fi

append_if_missing() {
  local key="$1"
  local value="$2"
  if ! grep -q "^${key}=" .env; then
    echo "${key}=${value}" >> .env
  fi
}

append_if_missing "JWT_SECRET" "$(openssl rand -hex 64)"
append_if_missing "SESSION_SECRET" "$(openssl rand -hex 64)"
append_if_missing "ENCRYPTION_KEY" "$(openssl rand -hex 32)"
append_if_missing "WEB3_PROVIDER" "https://mainnet.infura.io/v3/${INFURA_KEY:-replace_me}"
append_if_missing "CDN_ENDPOINT" "https://cdn.jcloud.gov.jo"

echo "[setup-full] Running local quality gates..."
node scripts/check-structure.mjs
python scripts/ai_quality_guard.py --strict
PYTHONPATH=ai-service python -m unittest ai-service/tests/test_vector_memory.py ai-service/tests/test_privacy.py

echo "[setup-full] done"
