type MfaPayload = {
  sessionId?: string;
  code?: string;
};

export async function POST(request: Request) {
  let payload: MfaPayload;

  try {
    payload = (await request.json()) as MfaPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.sessionId || !payload.code || payload.code.length < 4) {
    return Response.json(
      {
        error: "A sessionId and 4+ character MFA code are required",
      },
      { status: 422 },
    );
  }

  return Response.json({
    authenticated: true,
    sessionId: payload.sessionId,
    tokenType: "local-development-token",
    expiresIn: 3600,
    persisted: false,
  });
}
