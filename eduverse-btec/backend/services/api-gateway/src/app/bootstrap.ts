import { createServer } from './server.ts'
import { environment } from '../infrastructure/config/environment.ts'

export function bootstrap() {
  const app = createServer()
  app.listen(environment.port, () => {
    console.log(`api-gateway listening on ${environment.port}`)
  })
  return app
}
