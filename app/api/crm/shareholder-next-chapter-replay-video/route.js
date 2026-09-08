import { NextResponse } from "next/server";
import { proxyCrmStream } from "@/lib/crm-proxy";

export const dynamic = "force-dynamic";

/** Same-origin video stream — proxies CRM (S3 hosted replay or Zoom) with Range support. */
export async function GET(request) {
  const tid = new URL(request.url).searchParams.get("tid")?.trim();
  const range = request.headers.get("range");

  const result = await proxyCrmStream(
    "/api/public/marketing-site/shareholder-next-chapter-replay-video",
    { query: tid ? { tid } : {}, rangeHeader: range }
  );

  if (!result.ok || !result.body) {
    return NextResponse.json(result.data ?? { error: "replay_unavailable" }, {
      status: result.status || 502,
    });
  }

  const headers = new Headers();
  headers.set("Content-Type", result.headers.get("content-type") ?? "video/mp4");
  headers.set("Accept-Ranges", result.headers.get("accept-ranges") ?? "bytes");
  headers.set("Cache-Control", "private, max-age=3600");

  for (const name of ["content-length", "content-range"]) {
    const value = result.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new NextResponse(result.body, {
    status: result.status,
    headers,
  });
}
