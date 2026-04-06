#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[ci-local] structure check"
node scripts/check-structure.mjs

echo "[ci-local] quality guard"
python scripts/ai_quality_guard.py --strict

echo "[ci-local] ai tests"
PYTHONPATH=ai-service python -m unittest ai-service/tests/test_vector_memory.py ai-service/tests/test_privacy.py

echo "[ci-local] completed"
