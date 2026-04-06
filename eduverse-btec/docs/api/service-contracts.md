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


## Courses Service (via backend)
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses` (ADMIN/INSTRUCTOR)
- `PATCH /api/courses/:id` (ADMIN/INSTRUCTOR)
- `DELETE /api/courses/:id` (ADMIN)

## AI Bridge (via backend)
- `POST /api/ai/chat` (tries ai-service first, falls back safely on errors)
