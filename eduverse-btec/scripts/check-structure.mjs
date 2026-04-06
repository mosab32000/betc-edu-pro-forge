import { existsSync } from 'node:fs'

const requiredPaths = [
  'backend/services/api-gateway/src/app/server.ts',
  'backend/services/auth-service/src/app/server.ts',
  'docs/ARCHITECTURE.md',
  'infra/compose/docker-compose.dev.yml',
  'frontend/src/app/page.tsx',
  'mobile/src/app/index.tsx',
  'common/src/types/user.ts'
]

const missing = requiredPaths.filter((path) => !existsSync(path))

if (missing.length > 0) {
  console.error('Missing required files:\n' + missing.map((p) => `- ${p}`).join('\n'))
  process.exit(1)
}

console.log('Structure check passed')
