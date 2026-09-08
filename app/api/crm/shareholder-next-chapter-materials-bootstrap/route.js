import { NextResponse } from "next/server";
import { proxyCrmJson } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const tid = new URL(request.url).searchParams.get("tid")?.trim();
  const result = await proxyCrmJson(
    "/api/public/marketing-site/shareholder-next-chapter-materials-bootstrap",
    { query: tid ? { tid } : {} }
  );
  return NextResponse.json(result.data, { status: result.status });
}
