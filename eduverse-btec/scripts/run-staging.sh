#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/infra/compose"

echo "[run-staging] starting staging-like stack..."
docker compose -f docker-compose.staging.yml up -d --build
