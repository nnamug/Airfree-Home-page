export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: "AIRFREE Local CMS API",
    version: "0.2.0",
    status: "local-prototype",
    endpoints: [
      {
        method: "GET",
        path: "/api/health",
        description: "Returns local service health, module status, and content counts.",
      },
      {
        method: "GET",
        path: "/api/content",
        description: "Returns the default CMS content model used to seed the local browser CMS.",
      },
      {
        method: "GET",
        path: "/api/platforms",
        description: "Returns infrastructure platform records.",
      },
      {
        method: "GET",
        path: "/api/leads",
        description: "Returns seed lead records and the production persistence note.",
      },
      {
        method: "POST",
        path: "/api/leads",
        description: "Validates a lead payload and returns the production persistence contract.",
      },
      {
        method: "GET",
        path: "/api/openapi.json",
        description: "Returns OpenAPI 3.1 documentation for the local API surface.",
      },
      {
        method: "GET",
        path: "/sitemap.xml",
        description: "Returns generated XML sitemap entries for homepage, platform pages, and resources.",
      },
      {
        method: "GET",
        path: "/robots.txt",
        description: "Returns crawler policy for the local website.",
      },
    ],
    plannedProductionEndpoints: [
      "POST /api/leads",
      "GET /api/pages",
      "POST /api/pages",
      "PATCH /api/pages/:id",
      "POST /api/media",
      "PATCH /api/seo/:id",
      "GET /api/audit-logs",
      "POST /api/auth/login",
      "POST /api/auth/mfa/verify",
    ],
  });
}
