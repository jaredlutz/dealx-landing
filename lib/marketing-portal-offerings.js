/**
 * Production portal deep links for marketing opportunity pages.
 * Intentionally absolute so local dev (`NEXT_PUBLIC_PORTAL_URL`) still sends investors to the live offering.
 */
export const MARKETING_PORTAL_BASE = "https://portal.diversyfund.com";

/** DF Income / distressed multifamily notes (legacy notes product) */
export const MARKETING_PORTAL_DF_INCOME_OFFERING_URL = `${MARKETING_PORTAL_BASE}/offerings/6fe7e2cf-7180-4d00-9eb4-d7e4d3be367e`;

/** Distressed Income Fund, LLC — preferred-equity Units */
export const MARKETING_PORTAL_DISTRESSED_INCOME_FUND_OFFERING_URL = `${MARKETING_PORTAL_BASE}/offerings/e1395420-3a02-492d-bfa0-5c4e3c901134`;

/** Sign-up on production portal with post-auth redirect to an offering path (e.g. `/offerings/<uuid>`). */
export function marketingPortalSignUpUrl(redirectPath) {
  const path = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
  return `${MARKETING_PORTAL_BASE}/sign-up?redirect_url=${encodeURIComponent(path)}`;
}

/** Offering page — subscription documents card (PPM, subscription agreement, preview). */
export function marketingPortalOfferingDocumentsUrl(offeringId) {
  return `${MARKETING_PORTAL_BASE}/offerings/${offeringId}#signature`;
}
