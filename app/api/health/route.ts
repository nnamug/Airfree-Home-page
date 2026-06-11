import { defaultCmsData } from "@/lib/airfree-content";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    status: "operational",
    service: "airfree-home-page",
    mode: "local-first",
    checkedAt: new Date().toISOString(),
    modules: {
      publicWebsite: "operational",
      localCms: "operational",
      contentApi: "operational",
      seoRoutes: "operational",
      database: "schema-ready",
      mediaStorage: "metadata-only",
      authentication: "planned",
      analytics: "planned",
    },
    counts: {
      platforms: defaultCmsData.platforms.length,
      mediaAssets: defaultCmsData.mediaAssets.length,
      blogPosts: defaultCmsData.blogPosts.length,
      seedLeads: defaultCmsData.leads.length,
    },
  });
}
