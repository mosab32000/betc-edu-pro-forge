# EduverseAI - قلعة BTEC (Production SaaS Edition)

هذا الإصدار يرفع المشروع من scaffold أولي إلى **قاعدة إنتاجية قابلة للتوسع** تشمل:
- Frontend SaaS UX (Pricing / Analytics / Agent console)
- Backend APIs آمنة (JWT + RBAC + Validation)
- AI Service مع **Vector Memory** و **Autonomous Agent**
- عقود ذكية قابلة للتكامل
- وثائق تنفيذية وتجارية وتشغيلية ضمن `docs/`

## Quick Start
```bash
docker compose up -d --build
```

## Key Endpoints
- Backend:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/subscriptions/plans`
  - `POST /api/subscriptions/subscribe`
  - `GET /api/analytics/kpis`
- AI Service:
  - `POST /memory/upsert`
  - `POST /memory/query`
  - `POST /agent/run`

## Documentation
- Architecture report: `docs/architecture/production-architecture.md`
- Roadmap: `docs/roadmap/execution-plan.md`
- API overview: `docs/api/openapi-overview.md`
- Pricing model: `docs/product/pricing-model.md`
- Ops/Security runbook: `docs/runbooks/ops-and-security.md`
- Wireframes: `docs/wireframes/saas-wireframes.md`
