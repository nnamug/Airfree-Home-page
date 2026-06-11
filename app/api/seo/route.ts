import { defaultCmsData } from "@/lib/airfree-content";

export function GET() {
  return Response.json({
    data: defaultCmsData.seo,
    generatedRoutes: ["/sitemap.xml", "/robots.txt"],
    editableIn: "/admin",
  });
}

export async function PATCH(request: Request) {
  const payload = await request.json();

  return Response.json({
    data: {
      ...defaultCmsData.seo,
      ...payload,
    },
    persisted: false,
    nextStep: "Persist SEO updates to the production seo_metadata table.",
  });
}
