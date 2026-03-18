# API Overview

## Backend
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/subscriptions/plans`
- `POST /api/subscriptions/subscribe`
- `GET /api/subscriptions/current`
- `GET /api/analytics/kpis`
- `GET /api/analytics/executive-report`

## AI Service
- `POST /chat/`
- `POST /feedback/`
- `POST /memory/upsert`
- `POST /memory/query`
- `POST /agent/run`
- `GET /audit/events`

## Security Notes
- JWT required for protected backend endpoints.
- Role-based access applies to analytics management APIs.
- PII redaction is applied to AI chat payloads before model inference.
