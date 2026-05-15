/** Shared tier and list copy for `/premier-program` and `/premier-program/in-person`. */

export const PREMIER_TIERS = [
  {
    name: "The Circle",
    commitment: "$100,000",
    statedAnnual: "12%",
    quarterlyIndicative: "$3,000",
    math: "($100,000 × 12%) ÷ 4",
    narrative:
      "Minimum allocation for sponsor-led multifamily income—stated economics, documented discipline, and a steady reporting cadence alongside acquisition execution.",
    perks: [
      "A named senior relationship manager as your primary interface",
      "Business-day response from a senior team member within twenty-four hours on ordinary requests",
      "Monthly letter on portfolio developments, underwriting, and sponsor judgment",
      "Quarterly live session with senior leadership when scheduled",
      "Quarterly distributions in accordance with the operative offering and governing terms",
      "Visibility on select pipeline and new opportunities when capacity permits",
    ],
  },
  {
    name: "Premier",
    featured: true,
    commitment: "$250,000",
    statedAnnual: "15%",
    quarterlyIndicative: "$9,375",
    math: "($250,000 × 15%) ÷ 4",
    narrative:
      "Higher minimum for investors where depth of dialogue on acquisitions, deployment, and risk carries incremental value alongside Premier economics.",
    perks: [
      "Faster initial response on ordinary requests than The Circle",
      "Semi-annual scheduled one-on-one with senior leadership",
      "Earlier visibility on acquisitions, strategy, and capital deployment",
      "The same monthly letter, quarterly live session, and distribution schedule at Premier tier economics",
    ],
  },
  {
    name: "The Founders Table",
    commitment: "$1,000,000",
    statedAnnual: "18%",
    quarterlyIndicative: "$45,000",
    math: "($1,000,000 × 18%) ÷ 4",
    narrative:
      "For a small number of substantial allocations where the firm can support private time with senior leadership and structured discussion of co-investment when structurally available.",
    perks: [
      "Private quarterly session with senior leadership, agenda set by you",
      "Highest-priority escalation path for time-sensitive matters, as set out in the program agreement",
      "Early discussion of co-investment or side-by-side participation where structurally available",
      "Leadership onboarding expected prior to closing at this allocation level",
    ],
  },
];

export const PREMIER_INVESTMENT_RANGES = [
  { value: "100k-250k", label: "$100K–$250K" },
  { value: "250k-1m", label: "$250K–$1M" },
  { value: "1m-plus", label: "$1M+" },
];

export const PREMIER_RECEIVES = [
  "Direct dialogue with our senior investment team on ordinary matters.",
  "A named relationship manager as your primary point of contact.",
  "Quarterly cash distributions per your executed offering documents and tier.",
  "A monthly letter on portfolio developments—not promotional marketing.",
];
