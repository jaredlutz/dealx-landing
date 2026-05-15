import { NextResponse } from "next/server";
import { getWorkOS } from "@workos-inc/authkit-nextjs";
import {
  forwardLeadWebhook,
  persistUserMetadata,
  syncAuthkitSession,
  workosErrorMessage,
} from "@/lib/insights-finalize";

export const dynamic = "force-dynamic";

const ALLOWED_RANGES = new Set([
  "under_100k",
  "100k_250k",
  "250k_1m",
  "1m_plus",
  "prefer_not",
]);

const ALLOWED_SOCIAL_PLATFORMS = new Set([
  "linkedin",
  "x",
  "instagram",
  "facebook",
  "other",
]);

const UNLOCK_METADATA_KEY = "insightsUnlocked";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * POST /api/insights-unlock/verify
 *
 * Second step of the email-verification sign-up flow. The visitor saw
 * `status: "verify_email"` come back from `/api/insights-unlock`, was prompted
 * for the one-time code WorkOS just emailed them, and is now finalizing the
 * sign-up.
 *
 * `authenticateWithEmailVerification` succeeds in two ways at once:
 *   1. It marks the user's email as verified.
 *   2. It returns the same `accessToken` / `refreshToken` / `user` payload as
 *      `authenticateWithPassword` would have if verification weren't required.
 *
 * From there the rest of the flow is identical to the happy path in the main
 * route — write the metadata, save the AuthKit cookie, fan out to the CRM
 * webhook.
 *
 * Body shape:
 *   {
 *     code,                          // 6-digit one-time code from email
 *     pendingAuthenticationToken,    // returned by /api/insights-unlock
 *     slug,
 *     socialPlatform, socialHandle,  // re-sent — optional but recorded
 *     investmentRange,
 *     consentEmailPrivacy, consentMarketingEmail?,
 *     companyWebsite?               // honeypot
 *   }
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (isNonEmptyString(body.companyWebsite)) {
    return NextResponse.json({ ok: true, status: "unlocked" });
  }

  const {
    code,
    pendingAuthenticationToken,
    slug,
    socialPlatform: rawSocialPlatform,
    socialHandle: rawSocialHandle,
    investmentRange,
    consentEmailPrivacy,
    consentMarketingEmail,
  } = body;

  if (!isNonEmptyString(code)) {
    return NextResponse.json(
      { ok: false, message: "Enter the verification code from your email." },
      { status: 400 }
    );
  }
  if (!isNonEmptyString(pendingAuthenticationToken)) {
    return NextResponse.json(
      { ok: false, message: "Verification session expired. Please start sign-up again." },
      { status: 400 }
    );
  }
  if (consentEmailPrivacy !== true) {
    return NextResponse.json(
      { ok: false, message: "Please confirm the Privacy Policy acknowledgment to continue." },
      { status: 400 }
    );
  }
  if (!isNonEmptyString(investmentRange) || !ALLOWED_RANGES.has(investmentRange)) {
    return NextResponse.json({ ok: false, message: "Select an investment range." }, { status: 400 });
  }

  const clientId = process.env.WORKOS_CLIENT_ID;
  if (!clientId) {
    console.error("[insights-unlock/verify] WORKOS_CLIENT_ID is not set");
    return NextResponse.json(
      { ok: false, message: "Sign-up is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const normalizedPlatform = typeof rawSocialPlatform === "string"
    ? rawSocialPlatform.trim().toLowerCase()
    : "";
  const socialPlatform = ALLOWED_SOCIAL_PLATFORMS.has(normalizedPlatform) ? normalizedPlatform : null;
  const socialHandle = isNonEmptyString(rawSocialHandle) ? rawSocialHandle.trim().slice(0, 200) : null;

  /** @type {import('@workos-inc/node').AuthenticationResponse} */
  let authResponse;
  try {
    authResponse = await getWorkOS().userManagement.authenticateWithEmailVerification({
      clientId,
      code: String(code).trim(),
      pendingAuthenticationToken: pendingAuthenticationToken.trim(),
    });
  } catch (e) {
    console.warn("[insights-unlock/verify] authenticateWithEmailVerification failed", e);
    const message = workosErrorMessage(
      e,
      "That code didn't work. Please double-check it or request a new one."
    );
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  const userId = authResponse.user.id;
  const firstName = authResponse.user.firstName || "";
  const lastName = authResponse.user.lastName || "";
  const email = authResponse.user.email;

  const nowIso = new Date().toISOString();
  let updatedUser;
  try {
    updatedUser = await persistUserMetadata({
      userId,
      baseMetadata: authResponse.user.metadata ?? {},
      patch: {
        [UNLOCK_METADATA_KEY]: "true",
        insightsInvestmentRange: investmentRange,
        insightsConsentMarketingEmail: Boolean(consentMarketingEmail) ? "true" : "false",
        insightsUnlockedAt: nowIso,
        insightsSocialPlatform: socialPlatform,
        insightsSocialHandle: socialHandle,
      },
    });
  } catch (e) {
    console.error("[insights-unlock/verify] updateUser failed", e);
    return NextResponse.json(
      { ok: false, message: "We couldn't save your response. Please try again." },
      { status: 502 }
    );
  }

  try {
    await syncAuthkitSession({
      request,
      authResponse,
      updatedUser,
      logTag: "insights-unlock/verify",
    });
  } catch (e) {
    console.error("[insights-unlock/verify] saveSession failed", e);
    return NextResponse.json(
      { ok: false, message: "We couldn't finish signing you in. Please try again." },
      { status: 502 }
    );
  }

  const safeSlug = isNonEmptyString(slug) ? slug.trim().slice(0, 120) : "unknown";

  await forwardLeadWebhook({
    webhookEnv: {
      url: process.env.INVESTMENT_INTEREST_WEBHOOK_URL,
      secret: process.env.INVESTMENT_INTEREST_WEBHOOK_SECRET,
    },
    payload: {
      type: "investment_interest",
      source: `insights-gate:${safeSlug}`,
      workosUserId: userId,
      firstName: updatedUser.firstName || firstName,
      lastName: updatedUser.lastName || lastName,
      email: updatedUser.email || email,
      investmentRange,
      socialPlatform,
      socialHandle,
      signupMethod: "password_email_verification",
      consentTransactionalSms: false,
      consentMarketingSms: false,
      consentEmailPrivacy: true,
      consentMarketingEmail: Boolean(consentMarketingEmail),
      insightsSlug: safeSlug,
      submittedAt: nowIso,
    },
    logTag: "insights-unlock/verify",
  });

  return NextResponse.json({
    ok: true,
    status: "unlocked",
    firstName: updatedUser.firstName || firstName,
    lastName: updatedUser.lastName || lastName,
    email: updatedUser.email || email,
  });
}
