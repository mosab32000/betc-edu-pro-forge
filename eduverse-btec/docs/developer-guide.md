# Developer Guide

## Local startup
1. Run core data stores from `infra/compose/docker-compose.dev.yml`.
2. Start backend services by workspace package.
3. Run frontend and mobile apps.

## Add new service
1. Create `/backend/services/<service-name>/src/{api,domain,infrastructure,app}`.
2. Define domain entities and use-cases first.
3. Expose controllers/routes only after use-case contracts stabilize.

## Quality gates
- lint + typecheck
- unit tests
- integration tests
- security checks
