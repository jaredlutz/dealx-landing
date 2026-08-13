import { completeOAuthCallback } from "@/lib/auth/completeOAuthCallback";

export const dynamic = "force-dynamic";

/**
 * WorkOS AuthKit callback. Default `handleAuth({ returnPathname: "/admin" })`
 * returns raw JSON when a multi-org user must pick an organization — that is
 * the Google/LinkedIn book-LP failure. Complete org selection here and return
 * to the public path encoded in `state`.
 */
export async function GET(request) {
  return completeOAuthCallback(request);
}
