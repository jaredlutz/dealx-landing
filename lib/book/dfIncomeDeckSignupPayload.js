/**
 * Shared deck signup payload builder + CRM error formatting for Df2026DeckLeadSignupForm.
 */

export function formatDeckSignupValidationError(data) {
  if (data?.error === "missing_identity") {
    return "We need your email or phone to send materials. Please try again.";
  }
  if (data?.error === "email_required") {
    return "We need your email to send materials. Please try again.";
  }
  if (data?.error === "Invalid body" && data?.details?.fieldErrors) {
    const fieldErrors = data.details.fieldErrors;
    const messages = Object.entries(fieldErrors).flatMap(([field, errs]) =>
      (errs ?? []).map((msg) => {
        if (field === "lastName") return "Please enter your last name.";
        if (field === "firstName") return "Please enter your first name.";
        if (field === "email") return "Please enter a valid email address.";
        if (field === "investmentRange") return "Please select an investment range.";
        if (field === "consentEmailPrivacy") return "Please confirm the Privacy Policy acknowledgment.";
        return msg;
      })
    );
    if (messages.length) return messages[0];
  }
  return data?.message || data?.error || "Something went wrong. Please try again.";
}

/** @returns {Record<string, unknown>} */
export function buildOAuthDeckSignupBody({
  source,
  investmentRange,
  consentEmailPrivacy,
  consentMarketingEmail,
  companyWebsite,
  firstName,
  lastName,
  email,
  phone,
  sessionFirstName,
  sessionUserId,
}) {
  const body = {
    source,
    investmentRange,
    consentEmailPrivacy,
    consentMarketingEmail,
    companyWebsite: companyWebsite || undefined,
    signupMethod: "oauth_or_existing",
    firstName: (firstName || sessionFirstName || "").trim(),
    lastName: (lastName || "").trim(),
    email: (email || "").trim(),
  };
  if (sessionUserId) body.workosUserId = sessionUserId;
  if (phone?.trim()) body.phone = phone.trim();
  return body;
}

/** Sample payloads for contract / smoke checks (not live submissions). */
export const DECK_SIGNUP_CONTRACT_SAMPLES = {
  email_direct: {
    source: "book-df-income",
    signupMethod: "email_direct",
    firstName: "Jane",
    lastName: "Investor",
    email: "jane.investor@example.com",
    investmentRange: "100k_250k",
    consentEmailPrivacy: true,
    consentMarketingEmail: false,
  },
  oauth_or_existing: {
    source: "book-df-income",
    signupMethod: "oauth_or_existing",
    firstName: "Jane",
    lastName: "",
    email: "jane.investor@gmail.com",
    investmentRange: "100k_250k",
    consentEmailPrivacy: true,
    consentMarketingEmail: false,
    workosUserId: "user_test_oauth",
  },
};
