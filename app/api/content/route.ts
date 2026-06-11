import {
  adminModules,
  architectureLayers,
  brand,
  defaultCmsData,
  metrics,
  navigation,
  platforms,
} from "@/lib/airfree-content";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    ...defaultCmsData,
    brand,
    navigation,
    metrics,
    platforms,
    architectureLayers,
    adminModules,
    cmsEntities: [
      "pages",
      "sections",
      "components",
      "media",
      "users",
      "roles",
      "permissions",
      "menus",
      "social_links",
      "animations",
      "statistics",
      "testimonials",
      "blogs",
      "seo_metadata",
      "audit_logs",
      "settings",
      "leads",
    ],
  });
}
