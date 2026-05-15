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

const ALLOWED_RANGES = new Set([
  "under_100k",
  "100k_250k",
  "250k_1m",
  "1m_plus",
  "prefer_not",
]);

// Email/password sign-ups must provide a social handle so sales has a discoverable
// profile to look up. LinkedIn sign-ups skip these fields entirely because the
// WorkOS user already has the LinkedIn identity linked.
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

function isValidEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * POST /api/insights-unlock
 *
 * Single endpoint for the **fully self-hosted** Insights & Education sign-up
 * gate. The visitor never leaves the article — the form is rendered inline by
 * `components/blog/InsightsUnlockCard.jsx` and submits straight here.
 *
 * Three terminal outcomes:
 *   - Brand-new visitor whose WorkOS user signs in immediately on the password
 *     auth call → unlock complete, returns `{ ok: true, status: "unlocked" }`.
 *   - Brand-new visitor whose WorkOS environment requires email verification
 *     (`email_verification_required`) → returns `{ ok: true, status:
 *     "verify_email", pendingAuthenticationToken, userId, email }` so the
 *     client can render the code-entry step. The follow-up POST goes to
 *     `/api/insights-unlock/verify` to actually finalize.
 *   - Visitor who already had an AuthKit session (LinkedIn returner /
 *     cross-device returner) and is just providing capital metadata → unlock
 *     complete, returns `{ ok: true, status: "unlocked" }`.
 *
 * The legacy `df-insights-unlocked-v1` localStorage flag remains the
 * client-side first-paint fast-path; WorkOS user metadata is the durable,
 * cross-device source of truth.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (isNonEmptyString(body.companyWebsite)) {
    // Honeypot — silent success so bots can't probe.
    return NextResponse.json({ ok: true, status: "unlocked" });
  }

  const {
    slug,
    firstName: rawFirstName,
    lastName: rawLastName,
    email: rawEmail,
    password,
    socialPlatform: rawSocialPlatform,
    socialHandle: rawSocialHandle,
    investmentRange,
    consentEmailPrivacy,
    consentMarketingEmail,
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

  let auth;
  try {
    auth = await withAuth({ ensureSignedIn: false });
  } catch (e) {
    console.warn("[insights-unlock] withAuth failed; treating as unauthenticated", e);
    auth = null;
  }
  const sessionUser = auth?.user ?? null;

  const clientId = process.env.WORKOS_CLIENT_ID;
  if (!clientId) {
    console.error("[insights-unlock] WORKOS_CLIENT_ID is not set");
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
      console.warn("[insights-unlock] createUser failed", e);
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
        // WorkOS auto-sends the verification email on this failure. Hand the
        // pending token back to the client so the gate can flip to the
        // code-entry step and post to `/api/insights-unlock/verify`.
        return NextResponse.json({
          ok: true,
          status: "verify_email",
          pendingAuthenticationToken: verification.pendingAuthenticationToken,
          emailVerificationId: verification.emailVerificationId,
          email: verification.email ?? email,
          userId: createdUser.id,
        });
      }
      console.error("[insights-unlock] authenticateWithPassword failed", e);
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
        [UNLOCK_METADATA_KEY]: "true",
        insightsInvestmentRange: investmentRange,
        insightsConsentMarketingEmail: Boolean(consentMarketingEmail) ? "true" : "false",
        insightsUnlockedAt: nowIso,
        insightsSocialPlatform: socialPlatform,
        insightsSocialHandle: socialHandle,
      },
    });
  } catch (e) {
    console.error("[insights-unlock] updateUser failed", e);
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
      logTag: "insights-unlock",
    });
  } catch (e) {
    console.error("[insights-unlock] saveSession failed", e);
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
      signupMethod: authResponse ? "password" : "linkedin_or_existing",
      consentTransactionalSms: false,
      consentMarketingSms: false,
      consentEmailPrivacy: true,
      consentMarketingEmail: Boolean(consentMarketingEmail),
      insightsSlug: safeSlug,
      submittedAt: nowIso,
    },
    logTag: "insights-unlock",
  });

  return NextResponse.json({
    ok: true,
    status: "unlocked",
    firstName: updatedUser.firstName || firstName,
    lastName: updatedUser.lastName || lastName,
    email: updatedUser.email || email,
  });
}
