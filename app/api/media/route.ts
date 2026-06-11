import { defaultCmsData } from "@/lib/airfree-content";

export function GET() {
  return Response.json({
    data: defaultCmsData.mediaAssets,
    total: defaultCmsData.mediaAssets.length,
    note: "Local uploads are stored in browser localStorage as data URLs. Production should use S3, R2, MinIO, or equivalent object storage.",
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return Response.json(
      { error: "Send media metadata as JSON for this local contract" },
      { status: 415 },
    );
  }

  const payload = await request.json();

  return Response.json(
    {
      data: {
        id: `media-${Date.now()}`,
        ...payload,
        status: payload.status ?? "active",
      },
      persisted: false,
      nextStep: "Store bytes in object storage and metadata in the production database.",
    },
    { status: 201 },
  );
}
