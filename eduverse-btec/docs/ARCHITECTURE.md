# Eduverse Monorepo Production Architecture

## 1. Monorepo Topology

- `/backend/`: Node/Express microservices.
- `/frontend/`: Next.js web app.
- `/mobile/`: React Native app scaffold.
- `/common/`: shared TypeScript models/DTOs/utilities.
- `/infra/`: Docker/Compose/K8s/CI/Security artifacts.
- `/docs/`: architecture, API contracts, runbooks.

## 2. Naming & Coding Standards

- **PascalCase**: entities/components (`User`, `Course`, `AssignmentCard`).
- **camelCase**: functions and variables (`getCourseById`, `tokenExpiresAt`).
- **kebab-case**: files/folders (`auth-service`, `rate-limit.config.ts`).

## 3. Backend Microservices (layered)

Each service follows strict layering:

- `src/api/`: routes/controllers/middleware.
- `src/domain/`: entities/use-cases/repositories/value objects.
- `src/infrastructure/`: DB access, cache, external integrations, messaging.
- `src/app/`: framework bootstrap.

Services scaffolded:

1. `api-gateway`
2. `auth-service`
3. `courses-service`
4. `grading-service`
5. `ai-orchestration-service`
6. `cultural-service`
7. `blockchain-service`
8. `notification-service`

## 4. Data Strategy (Polyglot)

- **PostgreSQL**: academic records, enrollment, grading, BTEC rubrics, token governance, financial/subscription records.
- **MongoDB**: cultural content, XR scenes, plagiarism/text-analysis outputs.
- **Redis**: sessions, caching, rate limiting, transient queues.

## 5. Environments

- **Development**: local docker compose and mocked integrations.
- **Staging**: production-like topology + seeded anonymized data.
- **Production**: hardened security profile, managed databases, autoscaling.

Configuration policy:
- `.env.development`, `.env.staging`, `.env.production` (or external secrets manager in production).

## 6. Security Architecture

- API Gateway applies JWT/OAuth2 verification, RBAC, CORS, rate limiting, request IDs.
- Service-to-service authentication planned via mTLS/shared secrets.
- PII protection with prompt redaction in AI path.
- Security headers + centralized error handling + audit events.

## 7. CI/CD & Git Workflow

- Branch model: `main`, `develop`, `feature/*`, `hotfix/*`.
- PR policy:
  - minimum 2 reviewers for substantial changes.
  - hotfix bypass allowed with successful mandatory tests.
- Pipelines included:
  - backend/frontend/mobile CI
  - staging deployment
  - production deployment (manual approval expected)
  - security scan
  - e2e tests

## 8. API Contracts (high level)

- Auth: register, login, refresh, logout, reset password, MFA.
- Courses: course/module/assignment/submission CRUD.
- Grading: enrollment/progress/BTEC rubric grading/transcripts.
- AI: analysis, plagiarism, feedback, memory, autonomous agent.
- Cultural: tours/sites/artifacts/maps/XR feeds.
- Blockchain: NFT certificates, Petra token, governance proposals/votes.
- Notifications/Analytics: messaging preferences, events, KPI dashboards.

## 9. Release Plan

1. Staging/UAT.
2. Pilot release for limited institutions.
3. Observability-based stabilization.
4. Gradual national rollout.
5. Global expansion tracks.

## 10. Quality Tooling

- `.editorconfig` enforces cross-language formatting rules.
- `.prettierrc` defines formatting baseline for TS/JS/JSON/Markdown.
- `.husky/pre-commit` runs structural and AI quality checks.
- `scripts/ai_quality_guard.py` performs AI-inspired static heuristic checks before merge.