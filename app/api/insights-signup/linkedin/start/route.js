import { NextResponse } from "next/server";
import { getWorkOS } from "@workos-inc/authkit-nextjs";
import { getWorkOsRedirectUri } from "@/lib/workos-redirect-uri";

export const dynamic = "force-dynamic";

/**
 * GET /api/insights-signup/linkedin/start?from=/insights-education/<slug>
 *
 * Kicks off a WorkOS-managed LinkedIn OAuth flow by deep-linking past the
 * AuthKit hosted chooser into the project-level **LinkedIn OAuth** provider
 * configured in the WorkOS dashboard (Authentication → Social → LinkedIn).
 *
 * Because LinkedIn is enabled at the WorkOS project level — same surface as
 * Google/Microsoft/GitHub/Apple — we pass `provider: "LinkedInOAuth"` to
 * `getAuthorizationUrl` and WorkOS routes the visitor straight to LinkedIn's
 * OAuth confirmation page. No `connection_id`, no per-app env var, no
 * intermediate WorkOS-hosted UI page.
 *
 * The redirect URI is the standard AuthKit `/callback` route, which exchanges
 * the code, calls `saveSession`, and redirects back to `returnPathname` (we
 * encode it into `state` using the same base64url shape `getSignUpUrl({
 * returnTo })` emits so AuthKit's `handleAuth` decodes it correctly).
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
  const fromRaw = url.searchParams.get("from") ?? "/insights-education";
  const returnPathname = fromRaw.startsWith("/") ? fromRaw : "/insights-education";

  const state = btoa(JSON.stringify({ returnPathname }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const authorizationUrl = getWorkOS().userManagement.getAuthorizationUrl({
    provider: "LinkedInOAuth",
    clientId,
    redirectUri,
    state,
  });

  return NextResponse.redirect(authorizationUrl, { status: 302 });
}
