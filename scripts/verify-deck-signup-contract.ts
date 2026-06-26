#!/usr/bin/env bun
/**
 * Contract smoke for DF Income deck signup payloads.
 *
 * Usage:
 *   bun run scripts/verify-deck-signup-contract.ts
 *   CRM_API_BASE_URL=... CRM_BOOK_PROXY_SECRET=... bun run scripts/verify-deck-signup-contract.ts --live
 */

import { DECK_SIGNUP_CONTRACT_SAMPLES } from "../lib/book/dfIncomeDeckSignupPayload.js";

const live = process.argv.includes("--live");
const base =
  process.env.CRM_API_BASE_URL?.replace(/\/$/, "") || "https://crm.diversyfund.com";
const secret = process.env.CRM_BOOK_PROXY_SECRET?.trim() || "";

function assertOAuthSampleShape() {
  const sample = DECK_SIGNUP_CONTRACT_SAMPLES.oauth_or_existing;
  if (!sample.firstName?.trim()) throw new Error("oauth sample missing firstName");
  if (!sample.email?.trim()) throw new Error("oauth sample missing email");
  if (!sample.investmentRange) throw new Error("oauth sample missing investmentRange");
  if (sample.consentEmailPrivacy !== true) throw new Error("oauth sample missing consent");
  if (sample.lastName !== "") throw new Error("oauth sample should model empty Google lastName");
}

async function postSample(name, body) {
  const res = await fetch(`${base}/api/public/marketing-site/df-income-deck-signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { name, status: res.status, data };
}

async function main() {
  assertOAuthSampleShape();
  console.log("✓ Local contract samples look valid");

  if (!live) {
    console.log("Pass --live with CRM_API_BASE_URL + CRM_BOOK_PROXY_SECRET to hit CRM.");
    return;
  }

  if (!secret) {
    console.error("CRM_BOOK_PROXY_SECRET required for --live");
    process.exit(1);
  }

  const oauth = await postSample("oauth_or_existing", DECK_SIGNUP_CONTRACT_SAMPLES.oauth_or_existing);
  if (oauth.data.error === "Invalid body") {
    console.error("OAuth sample rejected with Invalid body:", oauth.data.details);
    process.exit(1);
  }
  console.log(`✓ oauth_or_existing → HTTP ${oauth.status} (${oauth.data.error ?? "ok"})`);

  const emailMissingLast = {
    ...DECK_SIGNUP_CONTRACT_SAMPLES.email_direct,
    lastName: "",
  };
  const email = await postSample("email_direct", emailMissingLast);
  if (email.data.error !== "Invalid body") {
    console.error("Expected email_direct without lastName to fail validation");
    process.exit(1);
  }
  console.log("✓ email_direct without lastName correctly rejected");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
