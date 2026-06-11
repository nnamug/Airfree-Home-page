import { defaultCmsData } from "@/lib/airfree-content";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    data: defaultCmsData.auditLogs,
    total: defaultCmsData.auditLogs.length,
    note: "Local admin actions append audit logs in browser localStorage. Production should persist immutable audit records server-side.",
  });
}
