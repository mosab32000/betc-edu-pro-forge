#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[bootstrap] validating root files..."
node scripts/check-structure.mjs
python scripts/ai_quality_guard.py --strict

echo "[bootstrap] monorepo baseline checks complete."
