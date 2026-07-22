import { getPublishedOfferingSnapshot } from "@/lib/portal-offering";

/** Portal offering UUID — Distressed Income Fund, LLC (preferred-equity Units). */
export const DISTRESSED_INCOME_FUND_OFFERING_ID =
  "e1395420-3a02-492d-bfa0-5c4e3c901134";

/**
 * Pitch deck slides for Distressed Income Fund, LLC.
 * PNGs under `/public/opportunities/distressed-income-fund/` (exported from investor presentation).
 */
export const DISTRESSED_INCOME_FUND_DECK_SLIDES = [
  {
    imageIndex: 1,
    name: "Cover — Distressed Income Fund, LLC",
    src: "/opportunities/distressed-income-fund/slide-01.png",
  },
  {
    imageIndex: 2,
    name: "The opportunity",
    src: "/opportunities/distressed-income-fund/slide-02.png",
  },
  {
    imageIndex: 3,
    name: "Why now",
    src: "/opportunities/distressed-income-fund/slide-03.png",
  },
  {
    imageIndex: 4,
    name: "Market context",
    src: "/opportunities/distressed-income-fund/slide-04.png",
  },
  {
    imageIndex: 5,
    name: "Investment thesis",
    src: "/opportunities/distressed-income-fund/slide-05.png",
  },
  {
    imageIndex: 6,
    name: "Acquisition strategy",
    src: "/opportunities/distressed-income-fund/slide-06.png",
  },
  {
    imageIndex: 7,
    name: "Fund structure",
    src: "/opportunities/distressed-income-fund/slide-07.png",
  },
  {
    imageIndex: 8,
    name: "Investor economics",
    src: "/opportunities/distressed-income-fund/slide-08.png",
  },
  {
    imageIndex: 9,
    name: "Class terms",
    src: "/opportunities/distressed-income-fund/slide-09.png",
  },
  {
    imageIndex: 10,
    name: "Capital deployment",
    src: "/opportunities/distressed-income-fund/slide-10.png",
  },
  {
    imageIndex: 11,
    name: "Target markets",
    src: "/opportunities/distressed-income-fund/slide-11.png",
  },
  {
    imageIndex: 12,
    name: "Leadership",
    src: "/opportunities/distressed-income-fund/slide-12.png",
  },
  {
    imageIndex: 13,
    name: "Risk considerations",
    src: "/opportunities/distressed-income-fund/slide-13.png",
  },
  {
    imageIndex: 14,
    name: "The offer",
    src: "/opportunities/distressed-income-fund/slide-14.png",
  },
  {
    imageIndex: 15,
    name: "Important disclosures",
    src: "/opportunities/distressed-income-fund/slide-15.png",
  },
];

export const DISTRESSED_INCOME_FUND_PRODUCT_DECK_PDF = {
  href: "/documents/distressed-income-fund-investor-presentation.pdf",
  downloadFilename: "DiversyFund-Distressed-Income-Fund-Investor-Presentation.pdf",
};

export function getDistressedIncomeFundOfferingId() {
  return (
    process.env.NEXT_PUBLIC_DISTRESSED_INCOME_FUND_OFFERING_ID?.trim() ||
    DISTRESSED_INCOME_FUND_OFFERING_ID
  );
}

/** @returns {import("@/lib/portal-offering").PortalOfferingSnapshot} */
export function getDistressedIncomeFundFallback() {
  return {
    id: DISTRESSED_INCOME_FUND_OFFERING_ID,
    name: "Distressed Income Fund, LLC",
    regulation: "D",
    rule: "506c",
    description: `**Units of membership interest** in Distressed Income Fund, LLC (Manager: DiversyFund, Inc.) to fund preferred equity investments in special purpose entities acquiring multifamily and other real estate at a discount to market value.

* **Eligible investors:** Accredited only. Regulation D, Rule 506(c).
* **Target capital raise:** Up to $35 million (see Private Placement Memorandum).
* **Structure:** Preferred-equity Units at $1,000 per Unit across three Classes.
* **Minimum investment:** Class A-1 — $1,000,000 (18% Target Rate); Class A-2 — $250,000 (15% Target Rate); Class A-3 — $100,000 (12% Target Rate).
* **Commitment period:** 2 years from final close (extendable up to two additional one-year periods at the Manager's discretion).
* **Target Rates:** Non-compounded; accrue only while capital is deployed in Fund Investments (see PPM). Undeployed capital may earn money-market yields as described in offering documents.

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
        id: "dif-a1",
        name: "Class A-1 — 18% Target Rate",
        minimumInvestmentCents: 1_000_000_00,
        preferredReturnPercentage: 18,
      },
      {
        id: "dif-a2",
        name: "Class A-2 — 15% Target Rate",
        minimumInvestmentCents: 250_000_00,
        preferredReturnPercentage: 15,
      },
      {
        id: "dif-a3",
        name: "Class A-3 — 12% Target Rate",
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
export async function getDistressedIncomeFundOfferingForPage() {
  const id = getDistressedIncomeFundOfferingId();
  if (id) {
    const fromDb = await getPublishedOfferingSnapshot(id);
    if (fromDb) return { snapshot: fromDb, fromDatabase: true };
  }
  return { snapshot: getDistressedIncomeFundFallback(), fromDatabase: false };
}
