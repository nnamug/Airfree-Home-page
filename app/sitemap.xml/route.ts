import { defaultCmsData } from "@/lib/airfree-content";

export const dynamic = "force-static";

export function GET() {
  const baseUrl = "http://localhost:3000";
  const paths = [
    "",
    "/admin",
    "/resources",
    ...defaultCmsData.platforms.map((platform) => `/platforms/${platform.slug}`),
    ...defaultCmsData.blogPosts.map((post) => `/resources/${post.id}`),
  ];

  const urls = paths
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>${path === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.7"}</priority>
  </url>`,
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
