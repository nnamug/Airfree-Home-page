import { defaultCmsData } from "@/lib/airfree-content";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    data: defaultCmsData.platforms,
    total: defaultCmsData.platforms.length,
    editableIn: "/admin",
  });
}
