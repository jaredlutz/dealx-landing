import { NextResponse } from "next/server";
import { proxyCrmJson } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = await proxyCrmJson(
    "/api/public/marketing-site/shareholder-next-chapter-materials-video-event",
    { method: "POST", body }
  );
  return NextResponse.json(result.data, { status: result.status });
}
