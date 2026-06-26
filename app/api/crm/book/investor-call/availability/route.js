import { NextResponse } from "next/server";
import { proxyCrmPublicJson } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = await proxyCrmPublicJson("/api/book/investor-call/availability", { query });
  return NextResponse.json(result.data, { status: result.status });
}
