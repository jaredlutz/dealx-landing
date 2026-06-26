import { NextResponse } from "next/server";
import { proxyCrmJson } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const tid = new URL(request.url).searchParams.get("tid")?.trim();
  if (!tid) {
    return NextResponse.json({ error: "missing_tid" }, { status: 400 });
  }
  const result = await proxyCrmJson("/api/public/marketing-site/df-income-materials-bootstrap", {
    query: { tid },
  });
  return NextResponse.json(result.data, { status: result.status });
}
