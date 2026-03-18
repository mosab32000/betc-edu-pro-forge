# Service Contracts (Draft)

## API Gateway
- `GET /health`
- `GET /v1/info`

## Auth Service
- `POST /auth/register`
- `POST /auth/login`

### Login Response
```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "user": { "id": "user-1", "email": "user@example.com", "role": "student" }
}
```

### Error model
```json
{
  "message": "Invalid credentials",
  "requestId": "uuid"
}
```
