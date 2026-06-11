type LoginPayload = {
  email?: string;
  role?: string;
};

export async function POST(request: Request) {
  let payload: LoginPayload;

  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.email) {
    return Response.json({ error: "Email is required" }, { status: 422 });
  }

  return Response.json({
    sessionId: `local-session-${Date.now()}`,
    email: payload.email,
    role: payload.role ?? "Viewer",
    mfaRequired: true,
    persisted: false,
    nextStep: "Verify MFA with POST /api/auth/mfa/verify.",
  });
}
