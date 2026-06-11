# AIRFREE Production Readiness

## Current State

The application is a local-first corporate website and CMS prototype. It has a
public website, Superadmin UI, local CMS persistence, API contracts, security
headers, SEO routes, database schema, and Docker/Nginx deployment scaffolding.
It also includes local authentication/MFA contracts and browser-side admin
session handling for development.

## Required Production Services

- PostgreSQL or D1 for durable CMS records.
- Redis for cache, sessions, and rate-limit counters.
- S3-compatible object storage for image, video, document, icon, logo, and animation uploads.
- Auth provider or application auth service for Superadmin login.
- MFA verification for privileged roles.
- Analytics ingestion service.
- Audit log persistence.
- Monitoring and alerting.

## Security Controls To Enforce Server-Side

- JWT or secure HTTP-only session cookies.
- MFA for Superadmin and Administrator roles.
- Server-side RBAC checks before all admin mutations.
- CSRF protection for cookie-authenticated forms.
- API rate limiting.
- Upload validation and virus scanning.
- WAF rules for admin and API routes.
- Immutable audit logs for all create, update, delete, publish, and rollback actions.

## Deployment Path

1. Configure production environment variables.
2. Run migrations from `drizzle/`.
3. Build with `npm run build`.
4. Run with Docker Compose or deploy behind Nginx.
5. Put TLS termination and WAF in front of the Nginx or platform ingress.
6. Monitor `/api/health`.

## Current Health Endpoint

`GET /api/health` returns local service status and module readiness.

## Local Auth Contracts

- `POST /api/auth/login`
- `POST /api/auth/mfa/verify`

These endpoints validate request/response shape for production auth but do not
issue real server-side sessions yet.
