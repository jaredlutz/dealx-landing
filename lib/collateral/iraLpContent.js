/** /collateral/ira — teaser from the IRA investing guide. Single CTA: download. */

export const IRA_LP = {
  routeKey: "collateral-ira",
  documentSlug: "ira-investing",
  pageTitle: "Invest with IRA | DiversyFund",
  downloadLabel: "Download the IRA guide",
  downloadFilename: "DiversyFund-IRA-Investing-Overview.pdf",
  eyebrow: "DF Income · IRA investing",
  heroTitleBefore: "Invest with an",
  heroAccent: "IRA",
  heroTitleAfter: " — private real-estate income inside a self-directed account.",
  heroUrgent: "Download the IRA guide.",
  heroSupport:
    "Custodian mechanics, funding paths, eligibility, and the questions to bring to your advisor — for accredited investors considering DF Income through an IRA.",
  heroSub: "Instant download · No form · Educational only · Not tax advice",
  trust: [
    { value: "SDIRA", label: "Self-directed structure" },
    { value: "Custodian", label: "Legal account holder" },
    { value: "506(c)", label: "Accredited standard" },
    { value: "Multi-year", label: "Illiquid commitment" },
    { value: "Advisor", label: "Tax counsel required" },
  ],
  sections: [
    {
      kind: "pillars",
      eyebrow: "The structure",
      title: "The custodian is the account holder.",
      intro:
        "Inside an IRA, the custodian is the legal account holder. You direct the allocation; the custodian signs, wires funds, and receives distributions on the account's behalf.",
      showDownload: true,
      items: [
        {
          title: "Flexibility",
          body: "Hold assets aligned with your view — including private real estate — beyond publicly traded securities, when the custodian supports private placements.",
        },
        {
          title: "Tax-deferred growth",
          body: "Gains inside the IRA grow tax-deferred. Taxes are typically owed on withdrawal, not as gains are realized. Confirm with your tax advisor.",
        },
        {
          title: "Custodial oversight",
          body: "A specialized custodian administers the account for IRS compliance on alternative investments. Not every IRA provider can do this.",
        },
      ],
    },
    {
      kind: "cards",
      id: "process",
      eyebrow: "The process",
      title: "How capital reaches the offering.",
      intro: "A typical funding path — confirm details with your custodian before you start.",
      showDownload: true,
      items: [
        {
          hold: "Step 1",
          title: "Confirm the custodian",
          body: "Open or move to a self-directed IRA that permits private placements. Many traditional IRAs cannot hold this asset class.",
        },
        {
          hold: "Step 2",
          title: "Fund the SDIRA",
          body: "Usually via transfer from another IRA or rollover from a 401(k). Annual contributions alone rarely meet private-placement minimums.",
        },
        {
          hold: "Step 3",
          title: "Direct the allocation",
          body: "Instruct the custodian to subscribe. Documents are signed by the custodian on behalf of the IRA — not in your personal name.",
        },
      ],
    },
    {
      kind: "pillars",
      eyebrow: "Before you allocate",
      title: "Parameters — not objections.",
      intro: "These frame the conversation with a qualified advisor and the custodian.",
      items: [
        {
          title: "Custodian fees",
          body: "Setup, transaction, and annual fees vary by firm and complexity. Review the schedule against your expected hold.",
        },
        {
          title: "Liquidity",
          body: "Real estate is illiquid. Private allocations are multi-year commitments — capital is not redeemable on demand.",
        },
        {
          title: "Due diligence",
          body: "Evaluate strategy, sponsor track record, documentation, and whether the offering fits IRA rules and your goals.",
        },
        {
          title: "IRS rules",
          body: "Prohibited transactions (personal use, dealings with disqualified persons) can jeopardize the IRA. Compliance is the owner's responsibility.",
        },
      ],
    },
    {
      kind: "split",
      eyebrow: "Eligibility & next steps",
      title: "What makes the conversation faster.",
      intro:
        "Most private real-estate offerings require accredited investor status under SEC Regulation D. This guide is educational — not tax or legal advice.",
      terms: [
        {
          title: "Accredited standard",
          body: "Generally: income above $200K individual / $300K joint for two years with expectation of the same, or net worth above $1M excluding primary residence — or other SEC categories.",
        },
        {
          title: "Confirm the custodian",
          body: "Does your current provider hold private placements? If not, identify an SDIRA custodian before you start paperwork.",
        },
        {
          title: "Choose the funding path",
          body: "Transfer, rollover, or contribution — know which path you will use so the custodian can timeline the wire.",
        },
        {
          title: "What the firm does not do",
          body: "DiversyFund does not act as custodian, plan administrator, or tax advisor. Subscription documents are issued in the IRA's name.",
        },
      ],
      panelTitle: "What's inside the download",
      whatsInside: [
        "How IRA ownership actually works",
        "Why most accounts need to be self-directed",
        "Funding path from custodian to offering",
        "Eligibility and accredited-investor framing",
        "Considerations before allocating",
        "Questions to bring to your advisor",
      ],
    },
  ],
  ctaBand: {
    titleLine1: "Get the IRA",
    titleLine2: "investing guide.",
    body: "Instant download — no form. Educational only. Not tax, legal, or investment advice. Not an offer to sell securities.",
  },
  footer:
    "This guide is educational only. It is not investment, tax, or legal advice and does not constitute an offer to sell or a solicitation to buy securities. DiversyFund offerings are available only to accredited investors where lawfully offered. Always consult qualified financial and tax professionals before allocating. Investments involve risk, including possible loss of principal.",
};
