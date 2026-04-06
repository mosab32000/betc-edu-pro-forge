#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/infra/compose"

echo "[run-dev] starting development stack..."
docker compose -f docker-compose.dev.yml up -d --build
