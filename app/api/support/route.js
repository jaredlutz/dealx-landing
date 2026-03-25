import { NextResponse } from "next/server";
import { postJsonWebhook } from "@/lib/forward-webhook";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Forwards to diversyfund-portal (configure PORTAL_SUPPORT_FORM_URL to the portal ingest route).
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (isNonEmptyString(body.companyWebsite)) {
    return NextResponse.json({ ok: true });
  }

  const {
    name,
    email,
    phone,
    category,
    message,
    consentTransactionalSms,
    consentMarketingSms,
  } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return NextResponse.json({ ok: false, message: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, message: "Invalid email." }, { status: 400 });
  }
  if (!isNonEmptyString(category)) {
    return NextResponse.json({ ok: false, message: "Topic is required." }, { status: 400 });
  }

  const phoneDigits = String(phone || "").replace(/\D/g, "");
  const hasPhone = phoneDigits.length >= 10;
  if (hasPhone && !consentTransactionalSms) {
    return NextResponse.json(
      { ok: false, message: "Transactional SMS consent is required when a phone number is provided." },
      { status: 400 }
    );
  }

  const payload = {
    type: "investor_support",
    source: "fixed-note-lp",
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: hasPhone ? String(phone).trim() : undefined,
    category,
    message: message.trim(),
    consentTransactionalSms: Boolean(consentTransactionalSms),
    consentMarketingSms: Boolean(consentMarketingSms),
    submittedAt: new Date().toISOString(),
  };

  const url = process.env.PORTAL_SUPPORT_FORM_URL;
  const secret = process.env.PORTAL_SUPPORT_FORM_SECRET;

  if (url) {
    const result = await postJsonWebhook(url, secret, payload);
    if (!result.skipped && !result.ok) {
      console.error("[support] portal webhook failed", result.status);
      return NextResponse.json(
        { ok: false, message: "We could not submit your request. Please try again later." },
        { status: 502 }
      );
    }
  } else {
    console.info("[support] PORTAL_SUPPORT_FORM_URL unset", {
      ...payload,
      email: "[redacted]",
    });
  }

  return NextResponse.json({ ok: true });
}
