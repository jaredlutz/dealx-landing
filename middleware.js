import { NextResponse } from "next/server";
import { authkit, handleAuthkitHeaders } from "@workos-inc/authkit-nextjs";

// Public form submissions use Next.js API routes (/api/support, /api/contact), which forward server-side
// to portal / CRM URLs from env. No browser CORS and no secrets in the client.

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const isAdminPath =
    pathname.startsWith("/admin") || pathname === "/callback";

  // Only run WorkOS auth for admin routes; public site bypasses auth entirely
  if (!isAdminPath) {
    return NextResponse.next();
  }

  const { session, headers: authkitHeaders, authorizationUrl } = await authkit(request, {
    redirectUri: process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
  });
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
