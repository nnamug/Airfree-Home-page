export const dynamic = "force-static";

export function GET() {
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "AIRFREE Local CMS API",
      version: "0.3.0",
      description:
        "Local-first API surface for the Airfree corporate website and CMS prototype.",
    },
    servers: [{ url: "http://localhost:3000" }],
    paths: {
      "/api/health": {
        get: {
          summary: "Service health and module status",
          responses: { "200": { description: "Operational status" } },
        },
      },
      "/api/content": {
        get: {
          summary: "Default CMS seed content",
          responses: { "200": { description: "CMS data payload" } },
        },
      },
      "/api/platforms": {
        get: {
          summary: "Infrastructure platform records",
          responses: { "200": { description: "Platform list" } },
        },
      },
      "/api/pages": {
        get: {
          summary: "Public page records",
          responses: { "200": { description: "Page list and publication status" } },
        },
      },
      "/api/media": {
        get: {
          summary: "Media metadata records",
          responses: { "200": { description: "Media list" } },
        },
        post: {
          summary: "Accept media metadata contract",
          responses: {
            "201": { description: "Media metadata accepted" },
            "415": { description: "Unsupported media contract content type" },
          },
        },
      },
      "/api/seo": {
        get: {
          summary: "SEO metadata",
          responses: { "200": { description: "SEO settings" } },
        },
        patch: {
          summary: "Validate SEO update contract",
          responses: { "200": { description: "SEO metadata merged" } },
        },
      },
      "/api/audit-logs": {
        get: {
          summary: "Audit log records",
          responses: { "200": { description: "Audit log list" } },
        },
      },
      "/api/leads": {
        get: {
          summary: "Seed lead records",
          responses: { "200": { description: "Lead list" } },
        },
        post: {
          summary: "Validate a new lead payload",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "inquiry"],
                  properties: {
                    name: { type: "string" },
                    company: { type: "string" },
                    email: { type: "string", format: "email" },
                    phone: { type: "string" },
                    inquiry: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Lead accepted by local contract" },
            "422": { description: "Missing required fields" },
          },
        },
      },
      "/api/auth/login": {
        post: {
          summary: "Start local admin login contract",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string", format: "email" },
                    role: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Local session created; MFA required" },
            "422": { description: "Email missing" },
          },
        },
      },
      "/api/auth/mfa/verify": {
        post: {
          summary: "Verify local MFA contract",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["sessionId", "code"],
                  properties: {
                    sessionId: { type: "string" },
                    code: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Local MFA accepted" },
            "422": { description: "Invalid MFA payload" },
          },
        },
      },
    },
  });
}
