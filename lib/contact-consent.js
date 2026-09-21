/**
 * Mobile / marketing disclosure aligned with diversyfund.com/contact-us/
 * (append link to /privacy-policy in the UI).
 */
export const CONTACT_SMS_MARKETING_DISCLOSURE_BEFORE_LINK =
  "By providing your mobile number, you agree to receive recurring automated marketing messages from DiversyFund. Consent is not a condition of purchase. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help. Your information will be handled in accordance with our ";

/** Same legal content as above, split for the Contact page disclaimer block (institutional layout). */
export const CONTACT_PAGE_SMS_PARAGRAPH_1 =
  "By providing your mobile number, you agree to receive recurring automated marketing messages from DiversyFund.";

export const CONTACT_PAGE_SMS_PARAGRAPH_2 =
  "Consent is not a condition of purchase. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help.";

/** Trailing clause before the Privacy Policy link (matches disclosure string). */
export const CONTACT_PAGE_PRIVACY_LEAD_IN =
  "Your information will be handled in accordance with our ";

/** Checkbox label when phone is provided; full legal text is shown below the submit button. */
export const CONTACT_SMS_MARKETING_CHECKBOX_SUMMARY =
  "I agree to receive recurring automated marketing text messages at the number provided, as described in the notice below.";

/* -------------------------------------------------------------------------- */
/* A2P 10DLC — verbatim opt-in copy (Joel Ebstein / fit-ai.ai).               */
/* Three SEPARATE checkboxes, each unchecked by default and NONE required to  */
/* submit. Marketing and transactional SMS consent are kept distinct; SMS     */
/* consent is not bundled with email/voice. Terms of Service + Privacy Policy */
/* links live in the form FOOTER (below the checkboxes), never inside a box.  */
/* -------------------------------------------------------------------------- */

/** 1) Marketing SMS opt-in (voluntary). */
export const A2P_SMS_MARKETING_CHECKBOX =
  "I consent to receive marketing text messages from DiversyFund, Inc. at the phone number provided. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.";

/** 2) Non-marketing / transactional SMS opt-in (voluntary, separate from marketing). */
export const A2P_SMS_TRANSACTIONAL_CHECKBOX =
  "I consent to receive non-marketing text messages from DiversyFund, Inc. for appointment information confirmation and reminder messages to investors once they have booked an appointment with DiversyFund, Inc. Frequency may vary, message & data rates may apply. Text HELP for assistance, reply STOP to opt out.";

/** 3) Electronic disclosure / e-signature consent (voluntary). */
export const A2P_ESIGN_DISCLOSURE_CHECKBOX =
  "I agree by electronic signatures to the electronic disclosure consent: the Terms of Services and Privacy Policy of this website.";
