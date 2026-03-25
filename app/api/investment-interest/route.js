import { NextResponse } from "next/server";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * POST /api/investment-interest
 * Body: JSON from InvestmentInterestModal.
 * Optional: forward to CRM/middleware via INVESTMENT_INTEREST_WEBHOOK_URL (server-only).
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
    source,
    firstName,
    lastName,
    email,
    phone,
    investmentRange,
    accreditedInvestor,
    comments,
    consentTransactionalSms,
    consentMarketingSms,
  } = body;

  if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName)) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!isNonEmptyString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, message: "Valid email is required." }, { status: 400 });
  }
  if (!isNonEmptyString(investmentRange)) {
    return NextResponse.json({ ok: false, message: "Investment range is required." }, { status: 400 });
  }
  if (!isNonEmptyString(accreditedInvestor)) {
    return NextResponse.json({ ok: false, message: "Accredited investor status is required." }, { status: 400 });
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
    type: "investment_interest",
    source: typeof source === "string" ? source : "unknown",
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    phone: hasPhone ? phone.trim() : undefined,
    investmentRange,
    accreditedInvestor,
    comments: isNonEmptyString(comments) ? comments.trim() : undefined,
    consentTransactionalSms: Boolean(consentTransactionalSms),
    consentMarketingSms: Boolean(consentMarketingSms),
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.INVESTMENT_INTEREST_WEBHOOK_URL;
  if (webhook) {
    let timer;
    try {
      const headers = { "Content-Type": "application/json" };
      const secret = process.env.INVESTMENT_INTEREST_WEBHOOK_SECRET;
      if (secret) {
        headers.Authorization = `Bearer ${secret}`;
      }
      const ac = new AbortController();
      timer = setTimeout(() => ac.abort(), 12_000);
      const res = await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: ac.signal,
      });
      if (!res.ok) {
        console.error("[investment-interest] Webhook failed", res.status, await res.text().catch(() => ""));
        return NextResponse.json(
          { ok: false, message: "We could not complete your request. Please try again later." },
          { status: 502 }
        );
      }
    } catch (e) {
      console.error("[investment-interest] Webhook error", e);
      return NextResponse.json(
        { ok: false, message: "We could not complete your request. Please try again later." },
        { status: 502 }
      );
    } finally {
      if (timer) clearTimeout(timer);
    }
  } else {
    console.info("[investment-interest] submission (configure INVESTMENT_INTEREST_WEBHOOK_URL to forward)", {
      ...payload,
      email: "[redacted]",
    });
  }

  return NextResponse.json({ ok: true });
}
