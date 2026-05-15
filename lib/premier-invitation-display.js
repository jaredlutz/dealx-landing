/**
 * Display copy for `/premier-program/private-invitation` — layout aligned to private-invitation
 * creative; economics pulled from `premier-program-intake-data` where applicable.
 */

export const INVITATION_MARKET_STATS = [
  {
    label: "Bank lending contraction",
    value: "68%",
    body:
      "Senior loan officers report tighter standards and weaker demand — a persistent headwind for transitional borrowers.",
    source: "Source: Federal Reserve SLOOS, Q1 2024",
  },
  {
    label: "Distressed multifamily volume",
    value: "$94B",
    body:
      "Commercial real estate distress remains elevated, with multifamily among the fastest-growing segments in watchlists.",
    source: "Source: industry reporting (indicative)",
  },
  {
    label: "Below-market acquisition window",
    value: "20–35%",
    body:
      "In select markets, motivated trades continue to clear at meaningful discounts to replacement cost when execution is disciplined.",
    source: "Source: sponsor underwriting ranges (illustrative)",
  },
  {
    label: "Lending recovery timeline",
    value: "2027+",
    body:
      "Credit normalization is unlikely to be immediate — extending the interval where relationships and speed matter.",
    source: "Source: macro baseline (indicative)",
  },
];

/** Bullets shown in the three-column tier comparison (mockup-aligned). */
export const INVITATION_TIER_BULLETS = {
  "The Circle": [
    "Named dedicated relationship manager",
    "Senior team response within 24 hours",
    "Quarterly live investor webinar with Q&A",
    "Monthly investor letter from the founding team",
    "First look at new acquisitions",
  ],
  Premier: [
    "Everything in The Circle, plus:",
    "Priority 12-hour response guarantee",
    "Bi-annual private 1:1 with founding team",
    "Early access to acquisition deal flow detail",
    "Exclusive Premier member events",
  ],
  "The Founders Table": [
    "Everything in Premier, plus:",
    "Quarterly private 1:1 with the founders",
    "Co-investment rights on select acquisitions",
    "Annual private Founders Dinner",
    "White-glove bespoke onboarding",
  ],
};

export const INVITATION_FOUNDERS = {
  quote:
    "The distress in commercial real estate is real, it is ongoing, and it is creating opportunities that experienced operators have not seen since 2010.",
  quoteAttribution: "— Morgan Stanley Real Estate Research, October 2024",
  eyebrow: "Why our founders are positioned for this moment",
  headlineLead: "Decades of relationships",
  headlineAccent: "built for exactly this.",
  intro:
    "The Premier Product exists because our two founders bring something no fund or REIT can replicate — personal relationships built over decades with the sellers, brokers, and operators who matter right now.",
  columns: [
    {
      eyebrow: "Co-founder — active since",
      stat: "1997",
      body:
        "Operating in multifamily real estate since the late 1990s, our co-founder has navigated multiple credit cycles — including 2001, 2008, and 2020 — acquiring assets at below-market prices when others were stepping away. The relationships built across these decades — with brokers, family offices, and sellers — surface opportunity when liquidity tightens.",
    },
    {
      eyebrow: "Co-founder — specialist network",
      stat: "Deep",
      body:
        "Our second co-founder brings a complementary network of lender relationships, operator contacts, and off-market deal flow cultivated over a career in multifamily acquisitions. Together, the founding team surfaces deals that never reach a broker listing — motivated sellers who call because of trust earned over years, not quarters.",
    },
  ],
  highlightLead:
    "When distress concentrates in transitional assets, access is relational — multifamily properties below replacement cost surface through networks, not portals.",
  highlightAccent: "This window exists now.",
};

export const INVITATION_QUALIFICATION = {
  eyebrow: "A note on qualification",
  headlineLead: "We are being",
  headlineAccent: "thoughtful",
  headlineTrail: "about who we invite.",
  boxed:
    "Not everyone we reach out to will be the right fit for the Premier Product — and that is by design. We are qualifying a select group of individuals based on relationship, readiness, and investment capacity. If you received this invitation, we believe there is a strong possibility you may qualify. The conversation after you submit will help us both determine that together — without pressure, without obligation.",
  footnote:
    "The right fit matters as much to us as it does to you. We are building something long-term, and we want the right people around it.",
};

export const INVITATION_EXPRESS = {
  eyebrow: "Express your interest",
  headlineLead: "Tell us a little about",
  headlineAccent: "where you are.",
  sub:
    "Complete the form and we will be in touch personally — by your preferred channel — within a few hours. No obligation, no pressure.",
};

export const INVITATION_AFTER = {
  eyebrow: "What happens after you express interest",
  headline: "We take it from here.",
  headlineAccent: "Personally.",
  intro:
    "Submit the form below and a member of our founding team will be in touch — by your preferred channel — to have a real conversation about whether this is the right fit.",
  existingClients: {
    title: "Existing clients",
    steps: [
      {
        icon: "check",
        when: "Immediately on submit",
        title: "Warm confirmation arrives",
        body:
          "You receive a personal confirmation acknowledging your interest. Your relationship manager is notified and your file is flagged as priority.",
      },
      {
        icon: "phone",
        when: "Within 2 hours",
        title: "Your relationship manager calls",
        body:
          "A real conversation — no script, no pitch. We discuss the current offering, the bar that makes sense, and answer everything on your mind.",
      },
      {
        icon: "building",
        when: "Within 48 hours",
        title: "Private Partner Preview — in person",
        body:
          "An intimate office visit in Southern California. You meet the founding team face to face, review active acquisitions, and confirm your position if it is the right fit.",
      },
      {
        icon: "clock",
        when: "First quarter",
        title: "Your first distribution arrives",
        body:
          "Quarterly cash flow deposited directly. Same week, your first live investor webinar with the founding team — Q&A on the active portfolio and what is coming next.",
      },
    ],
  },
  newProspects: {
    title: "New prospective members",
    steps: [
      {
        icon: "refresh",
        when: "Immediately on submit",
        title: "Personal confirmation sent",
        body:
          "You receive an acknowledgment that your interest has been received and that a senior team member will reach out shortly to introduce themselves.",
      },
      {
        icon: "inbox",
        when: "Within 4 hours",
        title: "Senior team reaches out",
        body:
          "By your preferred channel. We introduce ourselves, share more about the current offering, and have an honest conversation about whether this makes sense for you.",
      },
      {
        icon: "target",
        when: "Within 72 hours",
        title: "Premier Investor Briefing — at our office",
        body:
          "A small, curated session in Southern California. Meet the founding team, review the acquisition strategy, and decide from there — no commitment required on the day.",
      },
      {
        icon: "if",
        when: "If it is a fit",
        title: "Welcome to the Premier Product",
        body:
          "Onboarding begins. First distribution timeline confirmed. Monthly investor letters and quarterly webinar access begin immediately.",
      },
    ],
  },
};

export const CONTACT_PREFERENCE_OPTIONS = [
  { value: "phone", label: "Phone call", howHeard: "Preferred contact: phone call" },
  { value: "email", label: "Email", howHeard: "Preferred contact: email" },
  { value: "text", label: "Text message", howHeard: "Preferred contact: text message" },
];
