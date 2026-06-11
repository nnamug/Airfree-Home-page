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
    },
  });
}
