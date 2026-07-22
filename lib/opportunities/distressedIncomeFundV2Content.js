/**
 * Content for /opportunities/distressed-income-fund/v/2 — investment-thesis LP layout,
 * Distressed Income Fund offering copy, single CTA: Invest now.
 */

export const DISTRESSED_INCOME_FUND_V2 = {
  routeKey: "opportunities-distressed-income-fund-v2",
  pageTitle: "Distressed Income Fund",
  ctaLabel: "Invest now",
  hero: {
    badgeBefore: "For accredited investors · ",
    badgeAccent: "Reg D 506(c)",
    badgeAfter: " · $100K minimum",
    titleBefore: "Earn 12–18% target annual income from multifamily — bought at ",
    titleAccent: "distressed prices",
    titleAfter: "",
    body: "Commercial real estate loans are maturing at the worst possible time. Rising rates and tighter lending have left thousands of owners unable to refinance — and willing to sell at a discount. This fund provides the preferred equity capital that lets all-cash buyers close those deals and pay you income.",
    disclaimer:
      "Available to accredited investors under Regulation D, Rule 506(c). This is not an offer. Investments involve risk, including possible loss of principal.",
    glance: {
      title: "Offering at a glance",
      rows: [
        { label: "Target annual rates", value: "12% – 18%", highlight: true },
        { label: "Minimum investment", value: "$100,000" },
        { label: "Target raise", value: "$35,000,000" },
        { label: "Structure", value: "Preferred equity units" },
        { label: "Commitment period", value: "2 years + ext." },
        { label: "Distributions", value: "Quarterly", highlight: true },
      ],
    },
  },
  trust: [
    { value: "$35M", label: "Target raise" },
    { value: "12–18%", label: "Target rates by class" },
    { value: "2 yr", label: "Commitment period" },
    { value: "$100K+", label: "Minimum by class" },
    { value: "Accredited", label: "Reg D 506(c)" },
  ],
  sections: [
    {
      kind: "capitalWorks",
      eyebrow: "How your capital works",
      title: "You are the bank — without a bank ahead of you",
      intro:
        "There is no senior lender in this structure. The Fund's capital acts as the sponsor's acquisition line of credit — the money that buys the buildings.",
      processSteps: [
        {
          title: "You invest",
          body: "Your capital enters the Fund as preferred units with a contractual target rate.",
        },
        {
          title: "The Fund funds acquisitions",
          body: "Deployed as a line of credit to acquisition entities buying multifamily from forced sellers — cash purchases, below market.",
        },
        {
          title: "You get paid first",
          body: "Your quarterly income is paid before the sponsor earns anything on its own position.",
        },
      ],
      features: [
        {
          title: "First-priority capital",
          body: "No bank sits above you. The Fund's position is the senior capital in each acquisition — the position banks usually keep for themselves.",
        },
        {
          title: "Below-market basis",
          body: "Cash buyers move fast, and forced sellers pay for speed. Acquisitions target discounts to recent trades or replacement cost — your margin of safety is built in at purchase.",
        },
        {
          title: "Sponsor paid last",
          body: "DiversyFund's return comes after your target rate is satisfied. If a deal underperforms, the sponsor's economics absorb it first.",
        },
      ],
      footnote:
        "Target rates are non-compounded and accrue while capital is deployed; undeployed capital earns money-market yields. Principal is at risk; see the Private Placement Memorandum for the complete structure, waterfall, and risk factors.",
    },
    {
      kind: "investClasses",
      eyebrow: "Invest",
      title: "Choose your class. Invest today.",
      intro:
        "Three classes, one structure. Every class holds the same first-priority position — the rate rises with commitment size.",
      classes: [
        {
          name: "Class A-3",
          rate: "12",
          minimum: "$100,000",
          targetIncome: "$12,000",
          distributions: "Quarterly",
        },
        {
          name: "Class A-2",
          rate: "15",
          minimum: "$250,000",
          targetIncome: "$37,500",
          distributions: "Quarterly",
          featured: true,
          tag: "Most selected",
        },
        {
          name: "Class A-1",
          rate: "18",
          minimum: "$1,000,000",
          targetIncome: "$180,000",
          distributions: "Quarterly",
        },
      ],
      footnote:
        "$1,000 per unit · 2-year commitment period, extendable up to two one-year periods · Target rates accrue while capital is deployed · See the Private Placement Memorandum for complete fee disclosure and escrow instructions. Investing takes about 10 minutes: verify accreditation, sign, and fund via wire or ACH.",
    },
    {
      kind: "strategyStory",
      eyebrow: "Why this works right now",
      title: "Forced sellers. Cash buyers. Your capital in between.",
      paragraphs: [
        {
          text: "$950 billion in commercial real estate loans written at 3–4% are maturing into a 7%+ refinancing market. Owners who can't refinance don't get to wait — they sell, and they sell to whoever can close. ",
          emphasis: "Cash closes.",
        },
        "That's the entire strategy: your capital gives the sponsor the speed of a cash buyer, the sponsor buys quality multifamily below market, and the discount at purchase — not leverage — is what drives your rate. When values merely return to normal, the position is covered.",
      ],
      research: "The research: The Maturity Wall · The Coupon Reset · Where Rents Go From Here",
      quote:
        "We don't buy distressed buildings. We buy good buildings from distressed sellers — for cash, at a discount. The distress is theirs. The discount is yours.",
      attribution: "Craig Cecilio, Co-Founder & CEO",
    },
    {
      kind: "split",
      eyebrow: "Structure & terms",
      title: "How the fund is structured.",
      intro:
        "Share classes, accrual mechanics, and reporting — complete economics and risks are in the PPM and Operating Agreement.",
      terms: [
        {
          title: "Share classes",
          body: "Three Classes (A-1, A-2, A-3) with stated Target Rates of 18%, 15%, and 12% respectively. Target Rates are non-compounding objectives — not guarantees. Minimums and full economics are in the PPM.",
        },
        {
          title: "When return accrues",
          body: "Target Rates accrue only on capital deployed in Fund Investments. Undeployed capital may earn money-market yields as described in offering documents.",
        },
        {
          title: "Commitment period",
          body: "Two years from final close, extendable up to two additional one-year periods at the Manager's discretion.",
        },
        {
          title: "Reporting",
          body: "Quarterly portfolio and capital-account reporting, plus audited annual statements and tax reporting.",
        },
      ],
      panelTitle: "What's in the portal",
      whatsInside: [
        "Full offering summary and investor presentation",
        "Class terms, minimums, and Target Rate mechanics",
        "Accreditation verification for Rule 506(c)",
        "Subscription documents and capital account setup",
        "Key offering documents and PPM access",
      ],
    },
    {
      kind: "markets",
      eyebrow: "Target markets",
      title: "Growth markets in the strategy.",
      intro: "Geographic focus for sourcing discounted multifamily opportunities.",
      items: [
        "Florida",
        "Charleston, SC",
        "Raleigh / Charlotte, NC",
        "San Antonio, TX",
        "Houston, TX",
        "Dallas, TX",
        "Salt Lake City, UT",
        "Phoenix, AZ",
        "Las Vegas, NV",
        "San Diego, CA",
      ],
    },
  ],
  ctaBand: {
    titleLine1: "Ready to",
    titleLine2: "invest?",
    body: "Continue in the portal to verify eligibility and review subscription documents. Illustrative only; not an offer. Complete terms and risks are in the PPM.",
  },
  footer:
    "DiversyFund offerings are available only to accredited investors under Regulation D, Rule 506(c). This page is for informational purposes and is not an offer to sell securities. Target Rates are stated as objectives (simple, non-compounding) — not guarantees. Past performance is not indicative of future results. Investments involve risk, including possible loss of principal. Review the Private Placement Memorandum before investing.",
};
