/**
 * Shared config for the "Invest with an IRA" lead-magnet flow.
 *
 * The home page CTA + modal capture leads here: visitors submit the standard
 * investment-interest form with `source: "home-ira-guide"`, then the modal's
 * success state offers the PDF download referenced below. Drop a real PDF
 * at `public/documents/diversyfund-ira-investing-guide.pdf` to update the
 * download payload — see `scripts/generate-ira-guide.ts` for the placeholder.
 */
export const IRA_GUIDE_PDF_PATH = "/documents/diversyfund-ira-investing-guide.pdf";
export const IRA_GUIDE_DOWNLOAD_FILENAME = "diversyfund-ira-investing-guide.pdf";
export const IRA_GUIDE_TITLE = "Invest with an IRA — DiversyFund Guide";
export const IRA_GUIDE_DESCRIPTION =
  "How to hold private real-estate income inside a self-directed IRA: custodian mechanics, funding paths, eligibility, and the questions to bring to the conversation.";
export const IRA_GUIDE_SOURCE = "home-ira-guide";

/** Description used in the modal success state. */
export const IRA_GUIDE_SUCCESS_BLURB =
  "Your guide is ready. We'll also email a copy so you can revisit it on your schedule.";
