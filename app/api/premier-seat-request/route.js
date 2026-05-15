import { NextResponse } from "next/server";
import { postJsonWebhook } from "@/lib/forward-webhook";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function splitName(fullName) {
  const t = fullName.trim();
  const i = t.indexOf(" ");
  if (i === -1) return { firstName: t, lastName: "" };
  return { firstName: t.slice(0, i).trim(), lastName: t.slice(i + 1).trim() };
}

function normalizeUtm(v) {
  if (!isNonEmptyString(v)) return undefined;
  return v.trim().slice(0, 120);
}

/** utm_campaign=client → client confirmation copy; all other traffic → prospect. */
function audienceFromCampaign(utmCampaign) {
  const c = (utmCampaign || "").trim().toLowerCase();
  return c === "client" ? "client" : "prospect";
}

/**
 * POST /api/premier-seat-request
 * Forwards to df-crm: PREMIER_PROGRAM_WEBHOOK_URL (+ PREMIER_PROGRAM_WEBHOOK_SECRET).
 * Legacy: PREMIER_SEAT_REQUEST_WEBHOOK_URL / PREMIER_SEAT_REQUEST_WEBHOOK_SECRET still honored if new vars unset.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (isNonEmptyString(body.companyWebsite)) {
    return NextResponse.json({ ok: true, audience: "prospect" });
  }

  const {
    fullName,
    email,
    phone,
    investmentRange,
    howHeard,
    consentTransactionalSms,
    consentEmailPrivacy,
    consentMarketingEmail,
    utm_campaign: utmCampaign,
    utm_source: utmSource,
    utm_medium: utmMedium,
    intakeVariant,
  } = body;

  if (consentEmailPrivacy !== true) {
    return NextResponse.json(
      { ok: false, message: "Please confirm the Privacy Policy acknowledgment to submit this form." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(fullName)) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, message: "Valid email is required." }, { status: 400 });
  }
  if (!isNonEmptyString(phone)) {
    return NextResponse.json({ ok: false, message: "Phone is required." }, { status: 400 });
  }
  if (!isNonEmptyString(investmentRange)) {
    return NextResponse.json({ ok: false, message: "Investment range is required." }, { status: 400 });
  }
  if (!isNonEmptyString(howHeard)) {
    return NextResponse.json({ ok: false, message: "Please tell us how you heard about the program." }, { status: 400 });
  }

  const phoneDigits = String(phone).replace(/\D/g, "");
  const hasPhone = phoneDigits.length >= 10;
  if (!hasPhone) {
    return NextResponse.json({ ok: false, message: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!consentTransactionalSms) {
    return NextResponse.json(
      { ok: false, message: "SMS consent is required when a phone number is provided." },
      { status: 400 }
    );
  }

  const { firstName, lastName } = splitName(fullName);
  const uc = normalizeUtm(utmCampaign);
  const us = normalizeUtm(utmSource);
  const um = normalizeUtm(utmMedium);
  const audience = audienceFromCampaign(uc);

  const variant =
    typeof intakeVariant === "string" && intakeVariant.trim()
      ? intakeVariant.trim().slice(0, 80)
      : "premier_seat";

  const payload = {
    type: "premier_seat_request",
    source: "fixed-note-lp",
    intakeVariant: variant,
    fullName: fullName.trim(),
    firstName,
    lastName,
    email: email.trim().toLowerCase(),
    phone: String(phone).trim(),
    investmentRange: investmentRange.trim(),
    howHeard: howHeard.trim(),
    consentTransactionalSms: Boolean(consentTransactionalSms),
    consentEmailPrivacy: true,
    consentMarketingEmail: Boolean(consentMarketingEmail),
    utm_campaign: uc,
    utm_source: us,
    utm_medium: um,
    audienceBucket: audience,
    submittedAt: new Date().toISOString(),
  };

  const url =
    process.env.PREMIER_PROGRAM_WEBHOOK_URL?.trim() || process.env.PREMIER_SEAT_REQUEST_WEBHOOK_URL?.trim();
  const secret =
    process.env.PREMIER_PROGRAM_WEBHOOK_SECRET?.trim() ||
    process.env.PREMIER_SEAT_REQUEST_WEBHOOK_SECRET?.trim();

  if (url) {
    const result = await postJsonWebhook(url, secret, payload);
    if (!result.skipped && !result.ok) {
      console.error("[premier-seat-request] CRM webhook failed", result.status);
      return NextResponse.json(
        { ok: false, message: "We could not submit your request. Please try again later." },
        { status: 502 }
      );
    }
  } else {
    console.info("[premier-seat-request] PREMIER_PROGRAM_WEBHOOK_URL unset", {
      ...payload,
      email: "[redacted]",
      phone: "[redacted]",
    });
  }

  return NextResponse.json({ ok: true, audience });
}
