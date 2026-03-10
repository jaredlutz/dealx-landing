/**
 * Portal URL for redirects to diversyfund-portal (sign-up, sign-in, onboarding).
 * Set NEXT_PUBLIC_PORTAL_URL in .env.local to override.
 */
export function getPortalUrl() {
  return process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.diversyfund.com";
}

export function getSignUpUrl(redirectPath = "/onboarding") {
  const base = getPortalUrl();
  return `${base}/sign-up?redirect_url=${encodeURIComponent(redirectPath)}`;
}

export function getSignInUrl(redirectPath = "/") {
  const base = getPortalUrl();
  return `${base}/sign-in?redirect_url=${encodeURIComponent(redirectPath)}`;
}
