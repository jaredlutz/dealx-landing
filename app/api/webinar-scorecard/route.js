import { NextResponse } from "next/server";
import { postJsonWebhook } from "@/lib/forward-webhook";
import { DF_WEBSITE_SOURCE } from "@/lib/site-source";
import {
  WEBINAR_SCORECARD_FLOW,
  WEBINAR_SCORECARD_QUESTIONNAIRE_SOURCE,
  computeScorecardQualified,
  parseScorecardAnswers,
  scoreWebinarScorecardAnswers,
} from "@/lib/webinar-scorecard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimStr(v, max = 320) {
  if (typeof v !== "string") return "";
  const t = v.trim();
  return t.length > max ? t.slice(0, max) : t;
}

function readBody(input) {
  if (!input || typeof input !== "object") return null;
  const email = trimStr(input.email).toLowerCase();
  const firstName = trimStr(input.firstName, 120);
  const lastName = trimStr(input.lastName, 120);
  const phoneRaw = trimStr(input.phone, 40);
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const consentEmail = input.consentEmail === true;
  return { email, firstName, lastName, phoneRaw, phoneDigits, consentEmail };
}

/**
 * POST /api/webinar-scorecard
 * Forwards completed scorecard submissions to df-crm's existing
 * `/api/lp/vsl-investor-questionnaire` endpoint (configured via
 * `WEBINAR_SCORECARD_WEBHOOK_URL`). When the CRM is reachable we pass through
 * the canonical { scorePct, tier, insights, qualified, contactId } result so
 * the same scoring and CRM tags are applied as the on-CRM funnel. When the
 * URL is unset (e.g. local dev without df-crm running) we score locally with
 * the mirrored rubric so the UI can still complete the flow.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body?.companyWebsite === "string" && body.companyWebsite.trim()) {
    return NextResponse.json({
      ok: true,
      qualified: false,
      scorePct: 0,
      tier: "low",
      insights: [],
      showInvestorCallBooking: false,
    });
  }

  const contact = readBody(body);
  if (!contact) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(contact.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!contact.firstName) {
    return NextResponse.json({ ok: false, error: "First name is required." }, { status: 400 });
  }
  if (!contact.consentEmail) {
    return NextResponse.json(
      { ok: false, error: "Email consent is required to submit the scorecard." },
      { status: 400 }
    );
  }
  if (contact.phoneRaw && contact.phoneDigits.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Phone number needs at least 10 digits (or leave it blank)." },
      { status: 400 }
    );
  }

  const answers = parseScorecardAnswers(body);
  if (!answers) {
    return NextResponse.json(
      { ok: false, error: "Please answer every scorecard question before submitting." },
      { status: 400 }
    );
  }

  const url = process.env.WEBINAR_SCORECARD_WEBHOOK_URL?.trim();
  const secret = process.env.WEBINAR_SCORECARD_WEBHOOK_SECRET?.trim();

  const eventSlug =
    typeof body?.eventSlug === "string" && body.eventSlug.trim()
      ? body.eventSlug.trim().slice(0, 120)
      : null;
  const source = eventSlug
    ? `${DF_WEBSITE_SOURCE}:live-event:${eventSlug}`
    : `${DF_WEBSITE_SOURCE}:webinar-registration`;

  const payload = {
    flow: WEBINAR_SCORECARD_FLOW,
    questionnaireSource: WEBINAR_SCORECARD_QUESTIONNAIRE_SOURCE,
    email: contact.email,
    consentEmail: true,
    firstName: contact.firstName || null,
    lastName: contact.lastName || null,
    phone: contact.phoneRaw || null,
    ...answers,
    source,
    eventSlug,
    submittedAt: new Date().toISOString(),
  };

  // Local fallback score so the UI always has something to render, and so the
  // response matches the df-crm rubric when the CRM is unreachable.
  const localScore = scoreWebinarScorecardAnswers(answers);
  const localQualified = computeScorecardQualified(answers, localScore.tier);

  if (url) {
    try {
      const headers = { "Content-Type": "application/json" };
      if (secret) headers.Authorization = `Bearer ${secret}`;
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), 12_000);
      let res;
      try {
        res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
          signal: ac.signal,
        });
      } finally {
        clearTimeout(timer);
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok && data && data.ok) {
        return NextResponse.json({
          ok: true,
          contactId: data.contactId ?? null,
          qualified: typeof data.qualified === "boolean" ? data.qualified : localQualified,
          scorePct: typeof data.scorePct === "number" ? data.scorePct : localScore.scorePct,
          tier: typeof data.tier === "string" ? data.tier : localScore.tier,
          insights: Array.isArray(data.insights) && data.insights.length ? data.insights : localScore.insights,
          showInvestorCallBooking: Boolean(data.showInvestorCallBooking),
        });
      }
      console.error("[webinar-scorecard] CRM forward failed", res.status, data?.error);
    } catch (err) {
      console.error("[webinar-scorecard] CRM forward error", err);
    }
    // CRM unreachable / errored — fall through to local response so the user
    // still gets their summary and we can recover from logs.
  } else {
    console.info("[webinar-scorecard] WEBINAR_SCORECARD_WEBHOOK_URL unset; serving local score", {
      ...payload,
      email: "[redacted]",
      phone: "[redacted]",
    });
  }

  // Optional secondary forward (kept for parity with other LP webhooks) — the
  // primary path above is the canonical one. This is intentionally a no-op
  // when only the primary URL is set.
  if (url && process.env.WEBINAR_SCORECARD_SHADOW_URL) {
    void postJsonWebhook(process.env.WEBINAR_SCORECARD_SHADOW_URL, secret, payload);
  }

  return NextResponse.json({
    ok: true,
    contactId: null,
    qualified: localQualified,
    scorePct: localScore.scorePct,
    tier: localScore.tier,
    insights: localScore.insights,
    showInvestorCallBooking: false,
  });
}
