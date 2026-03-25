import { NextResponse } from "next/server";
import { postJsonWebhook } from "@/lib/forward-webhook";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Forwards to df-crm (configure CRM_CONTACT_FORM_URL to the CRM ingest route).
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

  const { firstName, lastName, email, phone, message, consentMarketingSms } = body;

  if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName)) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, message: "Valid email is required." }, { status: 400 });
  }
  if (!isNonEmptyString(message)) {
    return NextResponse.json({ ok: false, message: "Message is required." }, { status: 400 });
  }

  const phoneDigits = String(phone || "").replace(/\D/g, "");
  const hasPhone = phoneDigits.length >= 10;
  if (hasPhone && !consentMarketingSms) {
    return NextResponse.json(
      { ok: false, message: "SMS marketing consent is required when a mobile number is provided." },
      { status: 400 }
    );
  }

  const payload = {
    type: "general_contact",
    source: "fixed-note-lp",
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    phone: hasPhone ? String(phone).trim() : undefined,
    message: message.trim(),
    consentMarketingSms: Boolean(consentMarketingSms),
    submittedAt: new Date().toISOString(),
  };

  const url = process.env.CRM_CONTACT_FORM_URL;
  const secret = process.env.CRM_CONTACT_FORM_SECRET;

  if (url) {
    const result = await postJsonWebhook(url, secret, payload);
    if (!result.skipped && !result.ok) {
      console.error("[contact] CRM webhook failed", result.status);
      return NextResponse.json(
        { ok: false, message: "We could not submit your message. Please try again later." },
        { status: 502 }
      );
    }
  } else {
    console.info("[contact] CRM_CONTACT_FORM_URL unset", {
      ...payload,
      email: "[redacted]",
    });
  }

  return NextResponse.json({ ok: true });
}
