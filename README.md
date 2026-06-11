# AIRFREE Corporate Website

This workspace contains a deployable Airfree corporate website foundation built on the bundled Sites vinext starter.

## What Is Included

- Public enterprise homepage for AIRFREE.
- Superadmin dashboard at `/admin`.
- CMS-style content registry in `lib/airfree-content.ts`.
- JSON content endpoint at `/api/content`.
- Drizzle schema for users, roles, permissions, pages, sections, components, media, SEO, leads, and audit logs.
- Localhost/GitHub-oriented source with Docker and Nginx scaffolding.

## Local Commands

```bash
npm install
npm run build
npm run dev
```

## Core Surfaces

- `/` - Corporate website and infrastructure platform gateway.
- `/admin` - Superadmin control center prototype.
- `/api/content` - Structured content payload used by the site.
- `/platforms/[slug]` - Infrastructure platform detail pages.
- `/resources` - Public resource listing.
- `/api/health` - Service/module health endpoint.
- `/api/docs` - Local API documentation.
- `/api/pages` - Page records and publication status.
- `/api/media` - Media metadata contract.
- `/api/seo` - SEO settings contract.
- `/api/audit-logs` - Audit log contract.
- `/api/openapi.json` - OpenAPI 3.1 contract.
- `/api/auth/login` - Local Superadmin login contract.
- `/api/auth/mfa/verify` - Local MFA verification contract.
- `/sitemap.xml` - Generated sitemap.
- `/robots.txt` - Crawler policy.

## Production Path

The current build is a strong implementation foundation. To make it a fully operational CMS, connect the content registry and forms to the D1 schema, store media bytes in R2/S3-compatible storage, add authenticated admin routes, and enforce RBAC in route handlers.

## Docker

```bash
docker compose up --build
```

Nginx reverse proxy scaffolding lives in `deploy/nginx/airfree-home.conf`.
