import { NextResponse } from "next/server";
import { authkit, handleAuthkitHeaders } from "@workos-inc/authkit-nextjs";

// Public form submissions use Next.js API routes (/api/support, /api/contact), which forward
// server-side to portal / CRM URLs from env. No browser CORS and no secrets in the client.
//
// AuthKit middleware runs on:
//   - /admin and /callback         (existing admin auth, identical behavior — login redirect on miss)
//   - /insights-education/*        (self-hosted sign-up gate — middleware sets session headers so
//                                   `withAuth({ ensureSignedIn: false })` can read the WorkOS
//                                   user in API routes that the gate UI calls)
//   - /api/insights-signup/*       (status read /me + LinkedIn deep-link redirector that
//                                   uses WorkOS's built-in `provider: "LinkedInOAuth"`, no
//                                   per-app connection id needed; the LinkedIn deep-link is
//                                   ALSO used by the modal-hosted lead-signup form)
//   - /api/insights-unlock(/*)     (self-hosted sign-up + capital finalizer for the Insights
//                                   gate — creates the WorkOS user, authenticates with
//                                   password, writes the AuthKit session via `saveSession`,
//                                   and persists capital metadata. When WorkOS requires
//                                   email verification, the flow splits into a code-entry
//                                   step that posts to `/api/insights-unlock/verify`, plus
//                                   `/api/insights-unlock/resend` to re-send the code)
//   - /api/lead-signup(/*)         (modal-hosted sign-up gate for IRA download + Income
//                                   Investments flows — same WorkOS sign-up machinery as
//                                   /api/insights-unlock, including `/verify` + `/resend`
//                                   subroutes for the email verification step)
//
// `AuthKitProvider` (the client provider) is intentionally NOT mounted on the public root layout.
// We only need server-side session reads on insights routes, which middleware enables.

function shouldRunAuthkit(pathname) {
  if (pathname.startsWith("/admin")) return true;
  if (pathname === "/callback") return true;
  if (pathname.startsWith("/insights-education")) return true;
  if (pathname.startsWith("/api/insights-signup")) return true;
  if (pathname === "/api/insights-unlock" || pathname.startsWith("/api/insights-unlock/")) return true;
  if (pathname === "/api/lead-signup" || pathname.startsWith("/api/lead-signup/")) return true;
  return false;
}

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (!shouldRunAuthkit(pathname)) {
    return NextResponse.next();
  }

  const { session, headers: authkitHeaders, authorizationUrl } = await authkit(request, {
    redirectUri: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
  });

  // Admin is the only "protected" surface — public insights routes pass through unauthenticated
  // and let the in-page gate component prompt for sign-up.
  const isAdminProtected =
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    pathname !== "/callback";
  if (isAdminProtected && !session.user) {
    return handleAuthkitHeaders(request, authkitHeaders, {
      redirect: authorizationUrl ?? "/admin/login",
    });
  }
  return handleAuthkitHeaders(request, authkitHeaders);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
