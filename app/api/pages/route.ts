import { defaultCmsData } from "@/lib/airfree-content";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    data: [
      { slug: "/", title: "AIRFREE Home", type: "homepage", status: "published" },
      { slug: "/resources", title: "Resources", type: "listing", status: "published" },
      ...defaultCmsData.platforms.map((platform) => ({
        slug: `/platforms/${platform.slug}`,
        title: platform.name,
        type: "platform",
        status: platform.status === "planned" ? "draft" : "published",
      })),
    ],
    editableIn: "/admin",
  });
}
