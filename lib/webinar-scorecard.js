/**
 * Webinar registration scorecard — DF-Website mirror of the df-crm
 * `vslInvestorQuiz` rubric. Step defs, option lists, and weights are intentionally
 * kept in sync with df-crm (`src/lib/landing/vslInvestorQuiz.ts`) so the same
 * scoring math runs locally as a fallback when the CRM webhook is unset, and so
 * the forwarded payload validates against `flow: vsl_investor_quiz_v1` on df-crm.
 *
 * Bump WEBINAR_SCORECARD_RUBRIC_VERSION whenever weights or options change.
 */

export const WEBINAR_SCORECARD_RUBRIC_VERSION = 1;

/** Identifier sent to df-crm so the submission lands in the existing quiz funnel. */
export const WEBINAR_SCORECARD_QUESTIONNAIRE_SOURCE = "vsl_todays_market_investor_quiz";
export const WEBINAR_SCORECARD_FLOW = "vsl_investor_quiz_v1";

export const WEBINAR_SCORECARD_TOTAL_STEPS = 16;

/**
 * Step definitions: 1 contact step, 14 multiple-choice questions, 1 free-form.
 * Subtitles mirror the df-crm UX ("Profile", "Priorities", "Context").
 */
export const WEBINAR_SCORECARD_STEPS = [
  {
    step: 1,
    key: "contact",
    subtitle: "Profile",
    title: "How we’ll reach you",
    helper:
      "Share where we should send the briefing replay and your readiness snapshot. Phone is optional for SMS confirmations.",
    kind: "contact",
  },
  {
    step: 2,
    key: "q1",
    subtitle: "Priorities",
    title: "What best describes your current investment goal?",
    kind: "choice",
    field: "q1InvestmentGoal",
  },
  {
    step: 3,
    key: "q2",
    subtitle: "Priorities",
    title: "How are your current investments performing relative to your expectations?",
    kind: "choice",
    field: "q2PerformanceVsExpectations",
  },
  {
    step: 4,
    key: "q3",
    subtitle: "Priorities",
    title: "What's your primary concern with today's interest rate environment?",
    kind: "choice",
    field: "q3RateEnvironmentConcern",
  },
  {
    step: 5,
    key: "q4",
    subtitle: "Priorities",
    title: "Which best describes where your investable capital sits right now?",
    kind: "choice",
    field: "q4InvestableCapitalLocation",
  },
  {
    step: 6,
    key: "q5",
    subtitle: "Priorities",
    title: "How much capital are you looking to put to work in the next 90 days?",
    kind: "choice",
    field: "q5CapitalNext90Days",
  },
  {
    step: 7,
    key: "q6",
    subtitle: "Priorities",
    title: "What's your preferred investment timeline?",
    kind: "choice",
    field: "q6InvestmentTimeline",
  },
  {
    step: 8,
    key: "q7",
    subtitle: "Priorities",
    title: "How familiar are you with private credit or fixed income alternatives?",
    kind: "choice",
    field: "q7PrivateCreditFamiliarity",
  },
  {
    step: 9,
    key: "q8",
    subtitle: "Priorities",
    title: "What would make you confident enough to move forward with a new investment?",
    kind: "choice",
    field: "q8ConfidenceToMoveForward",
  },
  {
    step: 10,
    key: "q9",
    subtitle: "Priorities",
    title: "Have you invested in private market products before?",
    kind: "choice",
    field: "q9PrivateMarketsBefore",
  },
  {
    step: 11,
    key: "q10",
    subtitle: "Priorities",
    title: "What's the single biggest factor driving your investment decisions right now?",
    kind: "choice",
    field: "q10BiggestDecisionFactor",
  },
  {
    step: 12,
    key: "q11",
    subtitle: "Context",
    title: "Which best describes your current situation?",
    kind: "choice",
    field: "q11CurrentSituation",
  },
  {
    step: 13,
    key: "q12",
    subtitle: "Context",
    title: "Describe the outcome you would like over the next 90 days",
    kind: "choice",
    field: "q12Outcome90Days",
  },
  {
    step: 14,
    key: "q13",
    subtitle: "Context",
    title: "What have you tried that hasn't worked in the past?",
    kind: "choice",
    field: "q13TriedNotWorked",
  },
  {
    step: 15,
    key: "q14",
    subtitle: "Context",
    title: "Which solution would suit you best?",
    kind: "choice",
    field: "q14PreferredSolutionStyle",
  },
  {
    step: 16,
    key: "q15",
    subtitle: "Context",
    title: "Anything else you’d like the team to know?",
    helper: "Optional — open response.",
    kind: "textarea",
    field: "q15AnythingElse",
  },
];

export const WEBINAR_SCORECARD_OPTIONS = {
  q1InvestmentGoal: [
    { value: "preserve-income", label: "Preserve principal while earning steady contractual income" },
    { value: "balanced-total-return", label: "Balance income with measured growth" },
    { value: "growth-focused", label: "Maximize growth; income is secondary" },
    { value: "still-clarifying", label: "Still defining the objective for this pool of capital" },
  ],
  q2PerformanceVsExpectations: [
    { value: "ahead", label: "Ahead of what I expected" },
    { value: "about-expected", label: "Roughly in line" },
    { value: "behind", label: "Behind where I’d like to be" },
    { value: "not-sure", label: "Too early or too noisy to say" },
  ],
  q3RateEnvironmentConcern: [
    { value: "real-yields-too-low", label: "Real returns after inflation feel inadequate" },
    { value: "reinvestment-risk", label: "Reinvestment risk as policy and yields shift" },
    { value: "volatility-drawdowns", label: "Volatility and drawdowns in risk assets" },
    { value: "credit-default-fears", label: "Credit stress or default risk in parts of the market" },
    { value: "minimal-concern", label: "Not a pressing concern at the moment" },
  ],
  q4InvestableCapitalLocation: [
    { value: "mostly-cash-mm", label: "Cash, T-bills, or money-market" },
    { value: "bonds-fixed", label: "Public bonds or traditional fixed income" },
    { value: "public-equities", label: "Public equities" },
    { value: "alternatives-mix", label: "Alternatives or a diversified blend" },
    { value: "advised-vehicles", label: "Advised, trust, or institutional structures" },
  ],
  q5CapitalNext90Days: [
    { value: "under-100k", label: "Under $100,000" },
    { value: "100k-249k", label: "$100,000 – $249,999" },
    { value: "250k-499k", label: "$250,000 – $499,999" },
    { value: "500k-999k", label: "$500,000 – $999,999" },
    { value: "1m-plus", label: "$1,000,000 or more" },
    { value: "not-deploying-90d", label: "No meaningful deployment planned this quarter" },
  ],
  q6InvestmentTimeline: [
    { value: "within-30-days", label: "Within 30 days" },
    { value: "within-90-days", label: "Within 90 days" },
    { value: "within-6-months", label: "Within six months" },
    { value: "research-mode", label: "In research mode — no fixed deadline" },
  ],
  q7PrivateCreditFamiliarity: [
    { value: "very-familiar", label: "Very — I review these structures regularly" },
    { value: "somewhat", label: "Somewhat — I’ve participated before" },
    { value: "limited", label: "Limited — I’m still building fluency" },
    { value: "not-familiar", label: "Unfamiliar — I'd want a clear walkthrough" },
  ],
  q8ConfidenceToMoveForward: [
    { value: "clear-docs-and-call", label: "Full offering docs plus a direct conversation with the team" },
    { value: "group-session-first", label: "A structured group session before a one-to-one" },
    { value: "small-start-then-scale", label: "A modest initial allocation, then scale if it performs" },
    { value: "need-more-time", label: "More education and time — no rush" },
  ],
  q9PrivateMarketsBefore: [
    { value: "yes-regularly", label: "Yes — it's a core part of how I allocate" },
    { value: "yes-occasionally", label: "Yes — selectively" },
    { value: "no-first-time", label: "Not yet — this would be new" },
  ],
  q10BiggestDecisionFactor: [
    { value: "yield-cashflow-profile", label: "Contractual yield and cash flow profile" },
    { value: "capital-preservation-structure", label: "Documented structure and recovery mechanics" },
    { value: "sponsor-track-record", label: "Sponsor experience and execution track record" },
    { value: "liquidity-terms", label: "Liquidity, term, and flexibility" },
    { value: "macro-outlook", label: "Macro outlook and rate path" },
  ],
  q11CurrentSituation: [
    { value: "business-owner-profits", label: "Business owner looking to place profits somewhere" },
    { value: "full-time-investor", label: "Full-time investor looking for a new product" },
    { value: "executive-seeking-return", label: "Executive looking for a return" },
    { value: "other", label: "Other" },
  ],
  q12Outcome90Days: [
    { value: "deploy-specific-amount", label: "Deploy a defined amount of capital" },
    { value: "compare-shortlist", label: "Narrow a shortlist and compare finalists" },
    { value: "education-then-decide", label: "Complete diligence, then decide" },
    { value: "unsure", label: "Still framing what success looks like this quarter" },
  ],
  q13TriedNotWorked: [
    { value: "public-market-volatility", label: "Public-market volatility overwhelmed the thesis" },
    { value: "low-yield-fixed-income", label: "Traditional fixed income delivered too little after inflation" },
    { value: "illiquid-lockups", label: "Illiquidity or lockups didn’t match the need" },
    { value: "manager-underperformance", label: "Manager or strategy underperformed expectations" },
    { value: "not-applicable-yet", label: "Haven’t run into a clear failure mode yet" },
  ],
  q14PreferredSolutionStyle: [
    { value: "one-to-one-review", label: "Private review with a specialist" },
    { value: "group-overview", label: "Group briefing or webinar format first" },
    { value: "content-first", label: "Written materials first, then a conversation if warranted" },
  ],
};

export const SCORECARD_ANSWER_FIELDS = [
  "q1InvestmentGoal",
  "q2PerformanceVsExpectations",
  "q3RateEnvironmentConcern",
  "q4InvestableCapitalLocation",
  "q5CapitalNext90Days",
  "q6InvestmentTimeline",
  "q7PrivateCreditFamiliarity",
  "q8ConfidenceToMoveForward",
  "q9PrivateMarketsBefore",
  "q10BiggestDecisionFactor",
  "q11CurrentSituation",
  "q12Outcome90Days",
  "q13TriedNotWorked",
  "q14PreferredSolutionStyle",
];

const WEIGHTS = {
  q1InvestmentGoal: {
    "preserve-income": 5,
    "balanced-total-return": 4,
    "growth-focused": 3,
    "still-clarifying": 2,
  },
  q2PerformanceVsExpectations: {
    ahead: 5,
    "about-expected": 4,
    behind: 2,
    "not-sure": 3,
  },
  q3RateEnvironmentConcern: {
    "real-yields-too-low": 4,
    "reinvestment-risk": 4,
    "volatility-drawdowns": 3,
    "credit-default-fears": 3,
    "minimal-concern": 2,
  },
  q4InvestableCapitalLocation: {
    "mostly-cash-mm": 4,
    "bonds-fixed": 4,
    "public-equities": 3,
    "alternatives-mix": 5,
    "advised-vehicles": 4,
  },
  q5CapitalNext90Days: {
    "under-100k": 2,
    "100k-249k": 4,
    "250k-499k": 5,
    "500k-999k": 5,
    "1m-plus": 5,
    "not-deploying-90d": 1,
  },
  q6InvestmentTimeline: {
    "within-30-days": 5,
    "within-90-days": 5,
    "within-6-months": 3,
    "research-mode": 2,
  },
  q7PrivateCreditFamiliarity: {
    "very-familiar": 5,
    somewhat: 4,
    limited: 3,
    "not-familiar": 2,
  },
  q8ConfidenceToMoveForward: {
    "clear-docs-and-call": 5,
    "group-session-first": 4,
    "small-start-then-scale": 4,
    "need-more-time": 2,
  },
  q9PrivateMarketsBefore: {
    "yes-regularly": 5,
    "yes-occasionally": 4,
    "no-first-time": 2,
  },
  q10BiggestDecisionFactor: {
    "yield-cashflow-profile": 4,
    "capital-preservation-structure": 5,
    "sponsor-track-record": 5,
    "liquidity-terms": 3,
    "macro-outlook": 3,
  },
  q11CurrentSituation: {
    "business-owner-profits": 5,
    "full-time-investor": 5,
    "executive-seeking-return": 4,
    other: 3,
  },
  q12Outcome90Days: {
    "deploy-specific-amount": 5,
    "compare-shortlist": 4,
    "education-then-decide": 3,
    unsure: 2,
  },
  q13TriedNotWorked: {
    "public-market-volatility": 3,
    "low-yield-fixed-income": 4,
    "illiquid-lockups": 3,
    "manager-underperformance": 3,
    "not-applicable-yet": 2,
  },
  q14PreferredSolutionStyle: {
    "one-to-one-review": 5,
    "group-overview": 4,
    "content-first": 2,
  },
};

function tierFromPct(pct) {
  if (pct >= 70) return "high";
  if (pct >= 45) return "medium";
  return "low";
}

function buildInsights(answers, tier) {
  const out = [];
  if (tier === "high") {
    out.push(
      "Your timeline and deployment intent resemble investors who typically move efficiently from briefing to offering documents."
    );
  } else if (tier === "medium") {
    out.push(
      "You’re past casual browsing — the logical focus now is how our structure maps to your constraints and preferred pace."
    );
  } else {
    out.push(
      "Many sophisticated allocators start with education and circle back when capital and timing align — both are valid paths."
    );
  }
  if (
    answers.q7PrivateCreditFamiliarity === "not-familiar" ||
    answers.q7PrivateCreditFamiliarity === "limited"
  ) {
    out.push(
      "Private placements use different language and risk disclosures than public markets — we’ll keep explanations precise and document-grounded."
    );
  } else {
    out.push(
      "Given your comfort with private markets, the briefing can focus on documentation, collateral, and payment mechanics rather than basics."
    );
  }
  if (answers.q10BiggestDecisionFactor === "capital-preservation-structure") {
    out.push(
      "You weighted structure and recovery mechanics heavily — those map directly to how we present collateral and priority of payment in offering materials."
    );
  } else if (answers.q10BiggestDecisionFactor === "yield-cashflow-profile") {
    out.push(
      "Cash flow and stated return mechanics are central for you — next steps should center on the note’s payment schedule and risk factors, not headlines."
    );
  } else {
    out.push(
      "Sponsor quality and process integrity matter to your decision — we’ll keep follow-up factual, comparable, and tied to offering documents."
    );
  }
  return out.slice(0, 3);
}

/**
 * Validate that all required choice answers are present + return a normalized record.
 * Returns null when any required field is missing or has an unknown value.
 */
export function parseScorecardAnswers(input) {
  if (!input || typeof input !== "object") return null;
  const out = {};
  for (const field of SCORECARD_ANSWER_FIELDS) {
    const value = input[field];
    if (typeof value !== "string" || !value.trim()) return null;
    const valid = WEIGHTS[field]?.[value];
    if (valid == null) return null;
    out[field] = value;
  }
  const extra = typeof input.q15AnythingElse === "string" ? input.q15AnythingElse.trim() : "";
  out.q15AnythingElse = extra ? extra.slice(0, 2000) : null;
  return out;
}

/**
 * Deterministic score → identical to df-crm `scoreVslInvestorQuizAnswers` so this LP
 * fallback matches the CRM-computed score whenever the webhook is configured.
 */
export function scoreWebinarScorecardAnswers(answers) {
  const parts = SCORECARD_ANSWER_FIELDS.map((field) => WEIGHTS[field][answers[field]]);
  const rawScore = parts.reduce((sum, n) => sum + n, 0);
  const maxScore = parts.length * 5;
  const scorePct = Math.min(100, Math.round((rawScore / maxScore) * 100));
  const tier = tierFromPct(scorePct);
  return {
    rubricVersion: WEBINAR_SCORECARD_RUBRIC_VERSION,
    rawScore,
    maxScore,
    scorePct,
    tier,
    insights: buildInsights(answers, tier),
  };
}

export function computeScorecardQualified(answers, tier) {
  if (tier === "low") return false;
  const capital = answers.q5CapitalNext90Days;
  return capital !== "under-100k" && capital !== "not-deploying-90d";
}

/** Copy shown alongside the result card based on tier / qualification. */
export function recommendedNextStep(tier, qualified) {
  if (!qualified) {
    return {
      headline: "Start with the briefing replay",
      body:
        "Based on your responses, the most useful next step is the on-demand briefing — supply, debt maturities, and refinancing pressure in plain language. When timeline and ticket size firm up, the team is available for a private conversation.",
      primaryLabel: "Open the briefing deck",
      primaryHref: "/fixed-income-webinar",
      secondaryLabel: "Talk with the investor team",
      secondaryHref: "/contact",
    };
  }
  if (tier === "high") {
    return {
      headline: "Next steps for active allocators",
      body:
        "Your responses suggest you’re actively allocating and ready for document-level discussion. Watch the briefing for full context on supply, debt, and pricing, then schedule a private review with our team.",
      primaryLabel: "Open the briefing deck",
      primaryHref: "/fixed-income-webinar",
      secondaryLabel: "Book a private call",
      secondaryHref: "/contact",
    };
  }
  return {
    headline: "Two ways to go deeper",
    body:
      "You’re engaged but may still want macro and program context. The briefing replay covers the full narrative; from there we can match the right next step to your timeline.",
    primaryLabel: "Open the briefing deck",
    primaryHref: "/fixed-income-webinar",
    secondaryLabel: "Talk with the investor team",
    secondaryHref: "/contact",
  };
}
