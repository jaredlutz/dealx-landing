import { NextResponse } from "next/server";
import { getWorkOS, withAuth } from "@workos-inc/authkit-nextjs";
import {
  emailVerificationRequiredFromError,
  forwardLeadWebhook,
  persistUserMetadata,
  syncAuthkitSession,
  workosErrorMessage,
} from "@/lib/insights-finalize";
import { isPasswordStrong } from "@/lib/password-strength";

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

function isValidEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

/**
 * POST /api/lead-signup
 *
 * Single endpoint for the **modal-hosted** WorkOS sign-up gate that powers the
 * "Download the IRA Investing Guide" lead-magnet flow AND the "See available
 * income investments" / "Review current opportunities" lead-capture flow.
 *
 * Mirrors `/api/insights-unlock` (same self-hosted sign-up + AuthKit session
 * machinery), but is intent-driven so the metadata + CRM source vary.
 *
 * When WorkOS requires email verification (`email_verification_required` on
 * `authenticateWithPassword`), this route returns `{ ok: true, status:
 * "verify_email", pendingAuthenticationToken, userId }`. The modal then flips
 * to a code-entry step and posts to `/api/lead-signup/verify` with the same
 * intent + capital metadata to actually finalize the sign-up.
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
    return NextResponse.json(
      { ok: false, message: "Unknown sign-up intent." },
      { status: 400 }
    );
  }
  const isIncomeInvestments = intent === "income-investments";

  const source = isNonEmptyString(body.source) ? body.source.trim().slice(0, 120) : "modal";

  const {
    firstName: rawFirstName,
    lastName: rawLastName,
    email: rawEmail,
    password,
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

  /** @type {Awaited<ReturnType<typeof withAuth>> | null} */
  let auth;
  try {
    auth = await withAuth({ ensureSignedIn: false });
  } catch (e) {
    console.warn("[lead-signup] withAuth failed; treating as unauthenticated", e);
    auth = null;
  }
  const sessionUser = auth?.user ?? null;

  const clientId = process.env.WORKOS_CLIENT_ID;
  if (!clientId) {
    console.error("[lead-signup] WORKOS_CLIENT_ID is not set");
    return NextResponse.json(
      { ok: false, message: "Sign-up is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  /** @type {string} */ let userId;
  /** @type {string} */ let firstName;
  /** @type {string} */ let lastName;
  /** @type {string} */ let email;
  /** @type {string | null} */ let socialPlatform = null;
  /** @type {string | null} */ let socialHandle = null;
  /** @type {import('@workos-inc/node').AuthenticationResponse | null} */ let authResponse = null;

  if (sessionUser) {
    userId = sessionUser.id;
    firstName = sessionUser.firstName || "";
    lastName = sessionUser.lastName || "";
    email = sessionUser.email;
  } else {
    if (!isNonEmptyString(rawFirstName)) {
      return NextResponse.json({ ok: false, message: "First name is required." }, { status: 400 });
    }
    if (!isNonEmptyString(rawLastName)) {
      return NextResponse.json({ ok: false, message: "Last name is required." }, { status: 400 });
    }
    if (!isValidEmail(rawEmail)) {
      return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
    }
    if (!isNonEmptyString(password) || !isPasswordStrong(password)) {
      return NextResponse.json(
        { ok: false, message: "Choose a stronger password (10+ chars, mixed character types, avoid common words)." },
        { status: 400 }
      );
    }
    const normalizedPlatform = typeof rawSocialPlatform === "string"
      ? rawSocialPlatform.trim().toLowerCase()
      : "";
    if (!ALLOWED_SOCIAL_PLATFORMS.has(normalizedPlatform)) {
      return NextResponse.json(
        { ok: false, message: "Select where we can find you online." },
        { status: 400 }
      );
    }
    if (!isNonEmptyString(rawSocialHandle)) {
      return NextResponse.json(
        { ok: false, message: "Enter your handle or profile URL." },
        { status: 400 }
      );
    }

    firstName = rawFirstName.trim();
    lastName = rawLastName.trim();
    email = rawEmail.trim().toLowerCase();
    socialPlatform = normalizedPlatform;
    socialHandle = rawSocialHandle.trim().slice(0, 200);

    /** @type {{ id: string }} */
    let createdUser;
    try {
      createdUser = await getWorkOS().userManagement.createUser({
        email,
        password,
        firstName,
        lastName,
        emailVerified: false,
      });
    } catch (e) {
      console.warn("[lead-signup] createUser failed", e);
      const message = workosErrorMessage(
        e,
        "We couldn't create your account. Please check your details and try again."
      );
      return NextResponse.json({ ok: false, message }, { status: 400 });
    }

    try {
      authResponse = await getWorkOS().userManagement.authenticateWithPassword({
        clientId,
        email,
        password,
      });
    } catch (e) {
      const verification = emailVerificationRequiredFromError(e);
      if (verification) {
        return NextResponse.json({
          ok: true,
          status: "verify_email",
          pendingAuthenticationToken: verification.pendingAuthenticationToken,
          emailVerificationId: verification.emailVerificationId,
          email: verification.email ?? email,
          userId: createdUser.id,
        });
      }
      console.error("[lead-signup] authenticateWithPassword failed", e);
      const message = workosErrorMessage(
        e,
        "Your account was created but auto sign-in failed. Please try again in a moment."
      );
      return NextResponse.json({ ok: false, message }, { status: 502 });
    }

    userId = authResponse.user.id;
    firstName = authResponse.user.firstName || firstName;
    lastName = authResponse.user.lastName || lastName;
    email = authResponse.user.email;
  }

  const nowIso = new Date().toISOString();
  let updatedUser;
  try {
    const baseMetadata = (sessionUser?.metadata ?? authResponse?.user?.metadata) ?? {};
    updatedUser = await persistUserMetadata({
      userId,
      baseMetadata,
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
    console.error("[lead-signup] updateUser failed", e);
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
      logTag: "lead-signup",
    });
  } catch (e) {
    console.error("[lead-signup] saveSession failed", e);
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
      signupMethod: authResponse ? "password" : "linkedin_or_existing",
      consentTransactionalSms: smsEligible ? Boolean(consentTransactionalSms) : false,
      consentMarketingSms: smsEligible ? Boolean(consentMarketingSms) : false,
      consentEmailPrivacy: true,
      consentMarketingEmail: Boolean(consentMarketingEmail),
      submittedAt: nowIso,
    },
    logTag: "lead-signup",
  });

  return NextResponse.json({
    ok: true,
    status: "unlocked",
    firstName: updatedUser.firstName || firstName,
    lastName: updatedUser.lastName || lastName,
    email: updatedUser.email || email,
  });
}
