import { NextResponse } from "next/server";
import { getWorkOS } from "@workos-inc/authkit-nextjs";
import {
  forwardLeadWebhook,
  persistUserMetadata,
  syncAuthkitSession,
  workosErrorMessage,
} from "@/lib/insights-finalize";

export const dynamic = "force-dynamic";

const ALLOWED_INTENTS = new Set(["ira-download", "income-investments"]);

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

const ALLOWED_TIMELINES = new Set([
  "now",
  "1_3m",
  "3_6m",
  "6_12m",
  "exploring",
]);

const ALLOWED_GOALS = new Set([
  "income",
  "preservation",
  "growth",
  "diversification",
]);

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

/**
 * POST /api/lead-signup/verify
 *
 * Second step of the email-verification sign-up flow for the modal-hosted
 * lead-magnet sign-up. The visitor hit `email_verification_required` on the
 * initial `/api/lead-signup` POST and is now submitting the one-time code
 * WorkOS emailed them, plus the same intent / capital metadata the modal
 * already collected.
 *
 * Body shape:
 *   {
 *     intent, source,
 *     code, pendingAuthenticationToken,
 *     socialPlatform, socialHandle,
 *     investmentRange,
 *     // income-investments only:
 *     investmentTimeline?, primaryGoal?, phone?,
 *     consentEmailPrivacy, consentMarketingEmail?,
 *     consentTransactionalSms?, consentMarketingSms?,
 *     companyWebsite? // honeypot
 *   }
 */
export async function POST(request) {
  /** @type {Record<string, any>} */
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (isNonEmptyString(body.companyWebsite)) {
    return NextResponse.json({ ok: true, status: "unlocked" });
  }

  const intent = isNonEmptyString(body.intent) ? body.intent.trim() : "";
  if (!ALLOWED_INTENTS.has(intent)) {
    return NextResponse.json({ ok: false, message: "Unknown sign-up intent." }, { status: 400 });
  }
  const isIncomeInvestments = intent === "income-investments";

  const source = isNonEmptyString(body.source) ? body.source.trim().slice(0, 120) : "modal";

  const {
    code,
    pendingAuthenticationToken,
    socialPlatform: rawSocialPlatform,
    socialHandle: rawSocialHandle,
    investmentRange,
    investmentTimeline: rawTimeline,
    primaryGoal: rawGoal,
    phone: rawPhone,
    consentEmailPrivacy,
    consentMarketingEmail,
    consentTransactionalSms,
    consentMarketingSms,
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

  /** @type {string | null} */ let investmentTimeline = null;
  /** @type {string | null} */ let primaryGoal = null;
  /** @type {string | null} */ let phone = null;
  if (isIncomeInvestments) {
    if (!isNonEmptyString(rawTimeline) || !ALLOWED_TIMELINES.has(rawTimeline.trim())) {
      return NextResponse.json({ ok: false, message: "Select your investment timeline." }, { status: 400 });
    }
    if (!isNonEmptyString(rawGoal) || !ALLOWED_GOALS.has(rawGoal.trim())) {
      return NextResponse.json({ ok: false, message: "Select your primary goal." }, { status: 400 });
    }
    investmentTimeline = rawTimeline.trim();
    primaryGoal = rawGoal.trim();
    if (isNonEmptyString(rawPhone)) {
      const trimmedPhone = rawPhone.trim().slice(0, 40);
      const phoneDigits = digitsOnly(trimmedPhone);
      if (phoneDigits.length > 0 && phoneDigits.length < 10) {
        return NextResponse.json(
          { ok: false, message: "Enter a complete phone number (10+ digits) or leave it blank." },
          { status: 400 }
        );
      }
      phone = phoneDigits.length >= 10 ? trimmedPhone : null;
    }
  }

  const clientId = process.env.WORKOS_CLIENT_ID;
  if (!clientId) {
    console.error("[lead-signup/verify] WORKOS_CLIENT_ID is not set");
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
    console.warn("[lead-signup/verify] authenticateWithEmailVerification failed", e);
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
        insightsInvestmentRange: investmentRange,
        leadSignupSource: source,
        leadSignupIntent: intent,
        leadSignupAt: nowIso,
        insightsSocialPlatform: socialPlatform,
        insightsSocialHandle: socialHandle,
        investmentTimeline,
        primaryGoal,
        phone,
      },
    });
  } catch (e) {
    console.error("[lead-signup/verify] updateUser failed", e);
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
      logTag: "lead-signup/verify",
    });
  } catch (e) {
    console.error("[lead-signup/verify] saveSession failed", e);
    return NextResponse.json(
      { ok: false, message: "We couldn't finish signing you in. Please try again." },
      { status: 502 }
    );
  }

  const smsEligible = isIncomeInvestments && Boolean(phone);
  await forwardLeadWebhook({
    webhookEnv: {
      url: process.env.INVESTMENT_INTEREST_WEBHOOK_URL,
      secret: process.env.INVESTMENT_INTEREST_WEBHOOK_SECRET,
    },
    payload: {
      type: "investment_interest",
      source: `${intent}:${source}`,
      intent,
      workosUserId: userId,
      firstName: updatedUser.firstName || firstName,
      lastName: updatedUser.lastName || lastName,
      email: updatedUser.email || email,
      phone,
      investmentRange,
      investmentTimeline,
      primaryGoal,
      socialPlatform,
      socialHandle,
      signupMethod: "password_email_verification",
      consentTransactionalSms: smsEligible ? Boolean(consentTransactionalSms) : false,
      consentMarketingSms: smsEligible ? Boolean(consentMarketingSms) : false,
      consentEmailPrivacy: true,
      consentMarketingEmail: Boolean(consentMarketingEmail),
      submittedAt: nowIso,
    },
    logTag: "lead-signup/verify",
  });

  return NextResponse.json({
    ok: true,
    status: "unlocked",
    firstName: updatedUser.firstName || firstName,
    lastName: updatedUser.lastName || lastName,
    email: updatedUser.email || email,
  });
}
