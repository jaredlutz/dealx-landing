import { NextResponse } from "next/server";
import { proxyCrmPublicJson } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

const SEND_PLANE_BASE = (
  process.env.SENDEDGE_API_BASE_URL?.trim() || "https://send.diversyfund.com"
).replace(/\/$/, "");

// SendEdge attribution tokens are `sp1.<job>.<exp>.<sig>`; legacy CRM replay tokens are not.
const isSendPlaneToken = (tid) => typeof tid === "string" && tid.startsWith("sp1.");

/**
 * Resolve a SendEdge per-email token to the contact the email was actually sent to,
 * so booking binds to that contact instead of whatever identity an OAuth session carries.
 * Returns { prefill } on success, null on any failure (tracking must never break booking).
 */
async function resolveSendPlanePrefill(tid) {
  try {
    const url = new URL(`${SEND_PLANE_BASE}/api/track/send-plane/resolve`);
    url.searchParams.set("tid", tid);
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.prefill && typeof data.prefill === "object" ? data : null;
  } catch {
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tid = searchParams.get("tid") ?? "";

  if (isSendPlaneToken(tid)) {
    const resolved = await resolveSendPlanePrefill(tid);
    return NextResponse.json(resolved ?? { prefill: null }, { status: 200 });
  }

  const query = Object.fromEntries(searchParams.entries());
  const result = await proxyCrmPublicJson("/api/track/prefill", { query });
  return NextResponse.json(result.data, { status: result.status });
}
