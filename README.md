# API Gateway - 0debt

API Gateway built with Kong Gateway for the 0debt application. This gateway centralizes routing, authentication, rate limiting, and CORS for the platform's microservices.

## 🏗️ Architecture

This API Gateway acts as a single entry point for the following microservices:

- **users-service** - User management and authentication
- **groups-service** - Group management
- **expenses-service** - Expense and balance management
- **analytics-service** - Analytics and budgets

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- `JWT_SECRET` environment variable configured

## 📋 Configured Routes

| Route | Service | Description |
|------|---------|-------------|
| `/auth` | users-service | Authentication (public) |
| `/users` | users-service | User management (protected) |
| `/groups` | groups-service | Group management (protected) |
| `/expenses` | expenses-service | Expense management (protected) |
| `/balances` | expenses-service | Balance queries (protected) |
| `/budgets` | analytics-service | Analytics and budgets (protected) |

## 🔒 Security

### JWT Authentication

- All routes except `/auth` require a valid JWT token
- The JWT secret is configured via the `JWT_SECRET` environment variable
- The `Authorization: Bearer <token>` header must be included in protected requests

### Rate Limiting

The gateway implements rate limits based on the user's plan:

**Free Plan:**
- 60 requests per minute
- 500 requests per hour

**Pro Plan:**
- 1000 requests per minute
- 10000 requests per hour

**Enterprise Plan:**
- 5000 request per minute
- 50000 request per hour

Response headers include information about the limits:
- `X-RateLimit-Remaining-Minute`
- `X-RateLimit-Remaining-Hour`

### CORS

Configured to allow requests from:
- `http://localhost:3000` (development)
- `https://www.0debt.xyz` (production)
- `https://0debt.xyz` (production)

Allowed methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret for validating JWT tokens | Yes |

## 📁 Project Structure

```
api-gateway/
├── docker-compose.yaml  # Docker Compose configuration
├── kong.yaml            # Kong declarative configuration
└── README.md            # This file
```

## 📝 Notes

- The `notifications-service` is not exposed in the gateway as its communication is primarily internal (called by `users-service`) and asynchronous (listening to Redis)
- The configuration is declarative (DB-less mode), so it doesn't require a database
- Consumers (plans) are created dynamically by the `users-service` when a user registers
