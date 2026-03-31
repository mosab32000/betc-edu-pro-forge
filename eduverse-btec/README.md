# EduverseAI - Production Monorepo

This repository now follows a production-oriented monorepo shape:

- `backend/` (microservices + legacy service)
- `frontend/` (Next.js web)
- `mobile/` (React Native scaffold)
- `common/` (shared contracts/types)
- `infra/` (compose, CI, security policies)
- `docs/` (architecture and operations)

Primary architecture document: `docs/ARCHITECTURE.md`.


Additional architecture docs:
- `docs/IMPLEMENTATION-STATUS.md`
- `docs/api/service-contracts.md`
- `docs/architecture/sequence-diagrams.md`
- `docs/QUALITY-GUARD.md`


Root config files added:
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `.npmrc`

Automation scripts:
- `scripts/bootstrap.sh`
- `scripts/validate-env.sh`
- `scripts/run-dev.sh`
- `scripts/run-staging.sh`
- `scripts/ci-local.sh`
