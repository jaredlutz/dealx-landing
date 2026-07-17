/** /collateral/summary — teaser for DF Income product deck. Single CTA: download. */

export const SUMMARY_LP = {
  routeKey: "collateral-summary",
  documentSlug: "product-deck",
  pageTitle: "Investment Summary | DiversyFund",
  downloadLabel: "Download the summary",
  downloadFilename: "DiversyFund-DF-Income-Product-Deck.pdf",
  eyebrow: "",
  heroTitleBefore: "Investment",
  heroAccent: "Summary",
  heroTitleAfter: ".",
  heroUrgent: "",
  heroSupport:
    "Structure, rate classes, and how capital deploys — in one download for accredited investors.",
  heroSub: "Instant download · No form · Accredited · Reg D 506(c)",
  trust: [
    { value: "$20M", label: "Target capital raise" },
    { value: "12–18%", label: "Target annual rate classes" },
    { value: "2 yr", label: "Defined term" },
    { value: "$100K+", label: "Minimum by class" },
    { value: "506(c)", label: "Accredited only" },
  ],
  sections: [
    {
      kind: "snapshot",
      eyebrow: "At a glance",
      title: "What the summary covers.",
      intro: "High-level offering framing. Full detail, risks, and subscription terms are in the deck and PPM.",
      showDownload: true,
      items: [
        { label: "Structure", value: "Promissory notes funding discounted multifamily debt strategies" },
        { label: "Eligibility", value: "Accredited investors · Regulation D, Rule 506(c)" },
        { label: "Income classes", value: "Three stated annual rate classes tied to commitment size" },
        { label: "Term", value: "2-year deployment framing with orderly wind-down per offering docs" },
        { label: "Distributions", value: "Interest accrues on drawn capital; timing per the PPM" },
        { label: "Cash before deploy", value: "Undeployed capital may earn money-market interest as described in docs" },
      ],
    },
    {
      kind: "cards",
      id: "classes",
      eyebrow: "Income classes",
      title: "Pick your rate class.",
      intro:
        "Stated annual rates are objectives, not guarantees, and accrue on drawn capital as described in the Private Placement Memorandum.",
      showDownload: true,
      items: [
        {
          pct: "12",
          pctSuffix: "%",
          title: "Minimum $100,000",
          body: "Entry class for accredited investors allocating to the defined fixed-income structure.",
        },
        {
          pct: "15",
          pctSuffix: "%",
          title: "Minimum $250,000",
          hold: "Most common ask",
          body: "Mid commitment class — same offering structure, higher stated rate class.",
        },
        {
          pct: "18",
          pctSuffix: "%",
          title: "Minimum $1,000,000",
          body: "Largest commitment class. Full economics and risk factors are in the deck and PPM.",
        },
      ],
    },
    {
      kind: "pillars",
      eyebrow: "Why this summary exists",
      title: "Income, structure, and the window.",
      intro: "Three pillars the deck is built to communicate clearly.",
      items: [
        {
          title: "Target passive income",
          body: "Rate classes designed for allocators seeking defined income mechanics — not operator day-to-day work.",
        },
        {
          title: "Backed by today's market",
          body: "Discounted multifamily debt and distressed note opportunities created by the rate and credit cycle.",
        },
        {
          title: "Cycle-tested platform",
          body: "A team that has operated through multiple market cycles — process and disclosure before commitment.",
        },
      ],
    },
    {
      kind: "split",
      eyebrow: "Inside the download",
      title: "What you get in the investor deck.",
      intro:
        "Use the summary to orient before a deeper read of the business plan or PPM. This page does not replace offering documents.",
      terms: [
        {
          title: "Offering overview",
          body: "How DF Income is structured as a debt offering and who it is built for.",
        },
        {
          title: "Rate class mechanics",
          body: "Commitment tiers, stated rates as objectives, and how interest relates to drawn capital.",
        },
        {
          title: "Strategy context",
          body: "Why discounted multifamily debt is the acquisition thesis in this market.",
        },
        {
          title: "Next documents",
          body: "How the summary sits alongside the business plan, thesis, and PPM in due diligence.",
        },
      ],
      panelTitle: "What's inside the download",
      whatsInside: [
        "Product overview and positioning",
        "Income class summary (12% / 15% / 18%)",
        "Strategy and market context slides",
        "Term, eligibility, and risk framing",
        "Pointers to full offering documents",
      ],
    },
  ],
  ctaBand: {
    titleLine1: "Get the full",
    titleLine2: "investor summary.",
    body: "Instant download — no form. Illustrative only; not an offer. Complete terms and risks are in the PPM.",
  },
  footer:
    "DiversyFund offerings are available only to accredited investors under Regulation D, Rule 506(c). This page is for informational purposes and is not an offer to sell securities. Stated annual rates are objectives, not guarantees. Past performance is not indicative of future results. Investments involve risk, including possible loss of principal. Review the Private Placement Memorandum before investing.",
};
