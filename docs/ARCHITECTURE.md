# Integrated Education Platform - Architecture

Executive Summary

Architecture Style: Event-Driven Microservices with API Gateway Pattern
Deployment Model: Containerized (Docker) → Orchestrated (Kubernetes/Helm)
Data Strategy: Polyglot Persistence (PostgreSQL + MongoDB + Redis)
Security Model: Zero-Trust with JWT/OAuth2, RBAC, mTLS between services

Monorepo layout
- backend/
- frontend/
- mobile/
- common/
- infra/
- docs/

Naming Conventions
- PascalCase: Classes, Entities, Types
- camelCase: Functions, variables
- kebab-case: files and folders

Environments
- Development, Staging, Production

CI/CD
- GitHub Actions, CodeQL, Trivy, Docker image builds, deploy to staging automatically, production with manual approval

(Full architecture document to be expanded in docs/ - this skeleton covers the key design choices and pointers.)