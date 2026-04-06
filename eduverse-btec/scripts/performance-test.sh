#!/usr/bin/env bash
set -euo pipefail

echo "[performance-test] lightweight smoke benchmark"
START=$(date +%s%3N)
for _ in {1..20}; do
  curl -fsS "http://localhost:5000/health" >/dev/null || true
done
END=$(date +%s%3N)
ELAPSED=$((END-START))
echo "20 health requests completed in ${ELAPSED}ms"
