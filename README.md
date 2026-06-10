# AIRFREE Corporate Website

This workspace contains a deployable Airfree corporate website foundation built on the bundled Sites vinext starter.

## What Is Included

- Public enterprise homepage for AIRFREE.
- Superadmin dashboard at `/admin`.
- CMS-style content registry in `lib/airfree-content.ts`.
- JSON content endpoint at `/api/content`.
- Drizzle schema for users, roles, permissions, pages, sections, components, media, SEO, leads, and audit logs.
- Sites hosting bindings for D1 (`DB`) and R2 (`MEDIA_BUCKET`).

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

## Production Path

The current build is a strong implementation foundation. To make it a fully operational CMS, connect the content registry and forms to the D1 schema, store media bytes in R2/S3-compatible storage, add authenticated admin routes, and enforce RBAC in route handlers.
