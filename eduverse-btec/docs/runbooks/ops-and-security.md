# Ops & Security Runbook

## Backups
- PostgreSQL: daily full backups + 15-minute WAL archiving.
- Redis: snapshot every 6 hours for non-critical cache state.

## Incident Severity Matrix
- Sev-1: platform outage > 5 min.
- Sev-2: major feature degradation.
- Sev-3: non-critical bug.

## Security Controls
- TLS termination at ingress.
- Secrets from vault provider (no plaintext in repo).
- Quarterly penetration testing and dependency audits.
