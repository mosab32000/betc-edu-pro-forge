# API Documentation for betc-edu-pro-forge

## Introduction
This API provides a set of endpoints for interacting with the backend services of the betc-edu-pro-forge application. 

- **Base URL**: `https://api.betcedu.com/v1`

## Authentication
Authentication is required for accessing most of the API endpoints. The following methods are supported:

1. **Token-Based Authentication**
   - Obtain a token by sending a POST request to the `/auth/login` endpoint with your credentials.
   - The token must be included in the `Authorization` header for all subsequent requests.

### Token Generation Example
```http
POST /auth/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

### Response Example
```json
{
  "token": "your_jwt_token"
}
```

## API Endpoints

### 1. User Endpoints

- **GET /users**
  - Retrieve all users.
  
- **GET /users/{id}**
  - Retrieve a user by ID.

- **POST /users**
  - Create a new user.
  
- **PUT /users/{id}**
  - Update user information.

- **DELETE /users/{id}**
  - Delete a user.

### 2. Course Endpoints

- **GET /courses**
  - Retrieve all courses.
  
- **GET /courses/{id}**
  - Retrieve a course by ID.

- **POST /courses**
  - Create a new course.
  
- **PUT /courses/{id}**
  - Update course information.

- **DELETE /courses/{id}**
  - Delete a course.

## Error Handling
The API returns standard HTTP status codes to indicate the success or failure of a request. Common error responses include:

- **400 Bad Request**: The request was invalid.
- **401 Unauthorized**: Authentication failed or user does not have permission.
- **404 Not Found**: The requested resource was not found.
- **500 Internal Server Error**: A generic error occurred on the server.

### Error Response Example
```json
{
  "error": {
    "code": 404,
    "message": "User not found"
  }
}
```

## Examples
### Example of Creating a User
```http
POST /users
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "username": "newuser",
  "password": "newpassword",
  "email": "newuser@example.com"
}
```

### Example Response
```json
{
  "id": 123,
  "username": "newuser",
  "email": "newuser@example.com"
}
```

## Changelog
- **2026-04-04**: Initial documentation creation.