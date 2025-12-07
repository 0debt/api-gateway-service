# API Gateway - 0debt

Kong-based, DB-less gateway to front 0debt microservices with JWT auth, per-plan rate limiting, and CORS.

## 📁 Project structure

```
api-gateway/
├── .github/
│   └── workflows/
│       └── deploy.yaml   # Build & push image + trigger Coolify
├── Dockerfile            # Kong image with declarative config
├── kong.yaml             # Declarative services, routes, and plugins
├── .gitignore
└── README.md
```

## ⚙️ Key configuration

- `kong.yaml` defines services, routes, and JWT/rate-limiting/CORS plugins.
- `Dockerfile` copies `kong.yaml` as a template and replaces `{vault://env/JWT_SECRET}` at runtime via `JWT_SECRET`.
- `deploy.yaml` builds and pushes the multi-arch image to GHCR and triggers the Coolify webhook.

### Environment variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Injected at startup to validate tokens | Yes |

## 🚀 Quick start

Build and run locally:

```
docker build -t api-gateway .
docker run -p 8000:8000 -e JWT_SECRET=super-secret api-gateway
```

Kong is exposed at `http://localhost:8000`.

## 📋 Services and routes

| Path | Service | Notes |
|------|---------|-------|
| `/auth` | users-service | Public (no JWT) |
| `/users` | users-service | JWT protected |
| `/api/groups` | groups-service | JWT protected |
| `/expenses`, `/balances` | expenses-service | JWT protected |
| `/v1/budgets`, `/v1/health`, `/v1/internal/users` | analytics-service | JWT protected |
| `/notifications`, `/preferences` | notifications-service | JWT protected |

## 🔒 Security and limits

- **JWT**: required on all routes except `/auth`; use `Authorization: Bearer <token>`.
- **Rate limiting** per plan:
  - Free: 60/min, 500/hour.
  - Pro: 1000/min, 10000/hour.
  - Enterprise: 5000/min, 50000/hour.
- **CORS**: allowed origins `http://localhost:3000`, `https://www.0debt.xyz`, `https://0debt.xyz`; methods `GET, POST, PUT, DELETE, PATCH, OPTIONS`; exposed headers `X-RateLimit-Remaining-Minute` and `X-RateLimit-Remaining-Hour`.

## 📝 Notes

- Declarative (DB-less) configuration, no database needed.
- Plan consumers can be managed externally; the gateway enforces the configured policies.
