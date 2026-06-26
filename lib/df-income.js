import { getPublishedOfferingSnapshot } from "@/lib/portal-offering";

/**
 * Pitch deck slides for the DF Income / distressed multifamily note offering.
 * Public PNGs are under `/public/opportunities/distressed-multifamily-notes/` (legacy asset path; route was renamed but assets stay in place).
 * Order matches exported deck numbering 01–16.
 */
export const DF_INCOME_DECK_SLIDES = [
  {
    imageIndex: 1,
    name: "Cover — DF Income Product, distressed multifamily note offering",
    src: "/opportunities/distressed-multifamily-notes/slide-01.png",
  },
  {
    imageIndex: 2,
    name: "The opportunity — multifamily dislocation overview",
    src: "/opportunities/distressed-multifamily-notes/slide-02.png",
  },
  {
    imageIndex: 3,
    name: "Why now — market forces",
    src: "/opportunities/distressed-multifamily-notes/slide-03.png",
  },
  {
    imageIndex: 4,
    name: "Market inflection — supply cycle",
    src: "/opportunities/distressed-multifamily-notes/slide-04.png",
  },
  {
    imageIndex: 5,
    name: "Investment thesis — source, acquire, exit",
    src: "/opportunities/distressed-multifamily-notes/slide-05.png",
  },
  {
    imageIndex: 6,
    name: "Acquisition strategy — target basis",
    src: "/opportunities/distressed-multifamily-notes/slide-06.png",
  },
  {
    imageIndex: 7,
    name: "Exit strategy — multiple paths",
    src: "/opportunities/distressed-multifamily-notes/slide-07.png",
  },
  {
    imageIndex: 8,
    name: "Note acquisition process",
    src: "/opportunities/distressed-multifamily-notes/slide-08.png",
  },
  {
    imageIndex: 9,
    name: "Target markets",
    src: "/opportunities/distressed-multifamily-notes/slide-09.png",
  },
  {
    imageIndex: 10,
    name: "Headline terms — structure summary",
    src: "/opportunities/distressed-multifamily-notes/slide-10.png",
  },
  {
    imageIndex: 11,
    name: "Investor economics — note classes",
    src: "/opportunities/distressed-multifamily-notes/slide-11.png",
  },
  {
    imageIndex: 12,
    name: "Capital mechanics — callable line of credit",
    src: "/opportunities/distressed-multifamily-notes/slide-12.png",
  },
  {
    imageIndex: 13,
    name: "Leadership",
    src: "/opportunities/distressed-multifamily-notes/slide-13.png",
  },
  {
    imageIndex: 14,
    name: "Risk mitigation",
    src: "/opportunities/distressed-multifamily-notes/slide-14.png",
  },
  {
    imageIndex: 15,
    name: "The offer — why this investment",
    src: "/opportunities/distressed-multifamily-notes/slide-15.png",
  },
  {
    imageIndex: 16,
    name: "Important disclosures",
    src: "/opportunities/distressed-multifamily-notes/slide-16.png",
  },
];

/** Same PDF as CRM deck-delivery email (`public/lp-docs/df-income-product-deck.pdf` on crm). */
export const DF_INCOME_PRODUCT_DECK_PDF = {
  href: "/documents/df-income-product-deck.pdf",
  downloadFilename: "DiversyFund-DF-Income-Product-Deck.pdf",
};

/**
 * Optional: published portal offering UUID for DF Income / distressed multifamily notes.
 * When set with `PORTAL_DATABASE_URL`, live copy is loaded from diversyfund-portal.
 */
export function getDfIncomeOfferingId() {
  return (
    process.env.NEXT_PUBLIC_DF_INCOME_OFFERING_ID?.trim() ||
    process.env.NEXT_PUBLIC_DISTRESSED_MF_NOTES_OFFERING_ID?.trim() ||
    null
  );
}

/** @returns {import("@/lib/portal-offering").PortalOfferingSnapshot} */
export function getDfIncomeFallback() {
  return {
    id: "6fe7e2cf-7180-4d00-9eb4-d7e4d3be367e",
    name: "DF Income Product — Distressed Multifamily Note Offering",
    regulation: "D",
    rule: "506c",
    description: `**Promissory notes** offered by DiversyFund to fund discounted multifamily acquisitions and note strategies.

* **Eligible investors:** Accredited only. Regulation D, Rule 506(c).
* **Target capital raise:** $20 million (see Private Placement Memorandum).
* **Structure:** Debt in the form of promissory notes.
* **Minimum investment:** $1,000,000 (18% annual rate class), $250,000 (15% annual rate class), or $100,000 (12% annual rate class).
* **Deployment period:** 2 years from final close; wind-down up to 24 months thereafter (extendable in six-month increments).
* **Interest:** Stated annual rates are objectives, not guarantees; accrues on drawn capital per the PPM. Prior to deployment, committed capital may earn money-market interest as described in offering documents.

Review the investor presentation above, then continue in the portal for eligibility verification and subscription documents.`,
    contactEmailAddress: "invest@diversyfund.com",
    projectName: "Diversyfund, Inc",
    sponsor: {
      type: "entity",
      firstName: null,
      lastName: null,
      entityName: "Diversyfund, Inc",
    },
    investorClasses: [
      {
        id: "df-income-18",
        name: "18% annual rate (statutory minimum $1,000,000)",
        minimumInvestmentCents: 1_000_000_00,
        preferredReturnPercentage: 18,
      },
      {
        id: "df-income-15",
        name: "15% annual rate (statutory minimum $250,000)",
        minimumInvestmentCents: 250_000_00,
        preferredReturnPercentage: 15,
      },
      {
        id: "df-income-12",
        name: "12% annual rate (statutory minimum $100,000)",
        minimumInvestmentCents: 100_000_00,
        preferredReturnPercentage: 12,
      },
    ],
    documents: [],
  };
}

/**
 * @returns {Promise<{ snapshot: import("@/lib/portal-offering").PortalOfferingSnapshot; fromDatabase: boolean }>}
 */
export async function getDfIncomeOfferingForPage() {
  const id = getDfIncomeOfferingId();
  if (id) {
    const fromDb = await getPublishedOfferingSnapshot(id);
    if (fromDb) return { snapshot: fromDb, fromDatabase: true };
  }
  return { snapshot: getDfIncomeFallback(), fromDatabase: false };
}
