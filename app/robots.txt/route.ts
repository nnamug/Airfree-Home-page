export const dynamic = "force-static";

export function GET() {
  return new Response(`User-agent: *
Allow: /
Disallow: /admin

Sitemap: http://localhost:3000/sitemap.xml
`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
