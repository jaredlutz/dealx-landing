import { NextResponse } from "next/server";
import { getWorkOS } from "@workos-inc/authkit-nextjs";
import { getWorkOsRedirectUri } from "@/lib/workos-redirect-uri";

export const dynamic = "force-dynamic";

/**
 * GET /api/insights-signup/google/start?from=/book/df-income
 *
 * WorkOS-managed Google OAuth — same deep-link pattern as LinkedIn.
 */
export async function GET(request) {
  const clientId = process.env.WORKOS_CLIENT_ID;
  const redirectUri = getWorkOsRedirectUri();
  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { ok: false, message: "Sign-up is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  const fromRaw = url.searchParams.get("from") ?? "/book/df-income";
  const returnPathname = fromRaw.startsWith("/") ? fromRaw : "/book/df-income";

  const state = btoa(JSON.stringify({ returnPathname }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const authorizationUrl = getWorkOS().userManagement.getAuthorizationUrl({
    provider: "GoogleOAuth",
    clientId,
    redirectUri,
    state,
  });

  return NextResponse.redirect(authorizationUrl, { status: 302 });
}
