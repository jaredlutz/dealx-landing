import { NextResponse } from "next/server";
import { proxyCrmJson } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

/** POST — CRM deck capture + materialsTid (email, OAuth return, returning contacts). */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await proxyCrmJson("/api/public/marketing-site/df-income-deck-signup", {
    method: "POST",
    body,
  });
  return NextResponse.json(result.data, { status: result.status });
}
