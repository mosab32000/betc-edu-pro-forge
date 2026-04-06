#!/usr/bin/env bash
set -euo pipefail

echo "[healthcheck] verifying local service endpoints"
for url in "http://localhost:5000/health" "http://localhost:8000/health"; do
  echo "checking $url"
  curl -fsS "$url" >/dev/null || echo "warning: $url not reachable"
done
