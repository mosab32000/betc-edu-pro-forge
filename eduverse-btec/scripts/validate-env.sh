#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

required_vars=(NODE_ENV FRONTEND_URL API_GATEWAY_URL AI_SERVICE_URL)

if [[ ! -f .env ]]; then
  echo "[validate-env] .env not found. Copy from .env.example first."
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

for var in "${required_vars[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    echo "[validate-env] Missing required variable: $var"
    exit 1
  fi
done

echo "[validate-env] environment is valid."
