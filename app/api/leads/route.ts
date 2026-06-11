import { defaultCmsData } from "@/lib/airfree-content";

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  inquiry?: string;
};

export function GET() {
  return Response.json({
    data: defaultCmsData.leads,
    total: defaultCmsData.leads.length,
    note: "The local UI stores new leads in browser localStorage. This endpoint documents the production contract.",
  });
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.inquiry) {
    return Response.json(
      {
        error: "Missing required fields",
        required: ["name", "email", "inquiry"],
      },
      { status: 422 },
    );
  }

  return Response.json(
    {
      data: {
        id: `lead-${Date.now()}`,
        name: payload.name,
        company: payload.company ?? "",
        email: payload.email,
        phone: payload.phone ?? "",
        inquiry: payload.inquiry,
        status: "new",
        createdAt: new Date().toISOString(),
      },
      persisted: false,
      nextStep: "Wire this contract to PostgreSQL, D1, or the selected production database.",
    },
    { status: 201 },
  );
}
