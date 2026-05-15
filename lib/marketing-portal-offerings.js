/**
 * Production portal deep links for marketing opportunity pages.
 * Intentionally absolute so local dev (`NEXT_PUBLIC_PORTAL_URL`) still sends investors to the live offering.
 */
export const MARKETING_PORTAL_BASE = "https://portal.diversyfund.com";

/** DF Income / distressed multifamily notes */
export const MARKETING_PORTAL_DF_INCOME_OFFERING_URL = `${MARKETING_PORTAL_BASE}/offerings/6fe7e2cf-7180-4d00-9eb4-d7e4d3be367e`;

/** Sign-up on production portal with post-auth redirect to an offering path (e.g. `/offerings/<uuid>`). */
export function marketingPortalSignUpUrl(redirectPath) {
  const path = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
  return `${MARKETING_PORTAL_BASE}/sign-up?redirect_url=${encodeURIComponent(path)}`;
}
