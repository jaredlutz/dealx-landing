/**
 * Three Secured fixed-income structures rendered on the home page `Structures` section.
 * The standalone `/strategies/structures` route has been retired; this data is the single source
 * of truth for the home section.
 * Icons resolve via `iconName` so we can import lucide-react where the data is rendered.
 */
export const STRUCTURES = [
  {
    id: "single-asset-secured",
    iconName: "Building2",
    title: "Single-Asset Secured",
    flowLabel: "Collateralized note structure",
    desc: "Defined collateral. Defined exposure. Terms disclosed before subscription.",
    flow: ["Investor Capital", "Income Note", "Single Apartment Property"],
    longCopy:
      "A note collateralized by a single, named multifamily property. Investors receive a stated coupon and a defined maturity. Underwriting, lien position, and reporting cadence are documented up front.",
    suitedFor: [
      "Allocators who want one identified property as the source of collateral",
      "Capital with a defined hold expectation rather than open-ended exposure",
      "Investors prioritizing clarity of collateral over portfolio averaging",
    ],
  },
  {
    id: "instrument-based-secured",
    iconName: "FileText",
    title: "Instrument-Based Secured",
    flowLabel: "Portfolio-backed instrument",
    desc: "Contractual protections and mechanics structured up front.",
    flow: ["Investor Capital", "Income Instrument", "Secured Asset(s)"],
    longCopy:
      "A fixed-income instrument backed by an underlying asset or asset pool with covenants, security interests, and reporting obligations set in the operative documents. Mechanics for distributions, draws, and remedies are written before capital is committed.",
    suitedFor: [
      "Investors who place weight on contractual protections and covenants",
      "Capital that benefits from instrument-level documentation discipline",
      "Allocations where reporting cadence is part of the underwriting decision",
    ],
  },
  {
    id: "multi-asset-secured",
    iconName: "Layers",
    title: "Multi-Asset Secured",
    flowLabel: "Multi-property vehicle",
    desc: "Income supported across multiple properties under one framework.",
    flow: ["Investor Capital", "Structured Vehicle", "Portfolio of Properties"],
    longCopy:
      "A vehicle that secures investor income across a defined set of multifamily assets. Diversification across properties sits inside a single legal framework with consistent reporting and a stated economic profile.",
    suitedFor: [
      "Allocators who prefer diversification across multiple properties",
      "Investors who want one set of operative documents rather than per-deal subscriptions",
      "Capital that values portfolio-level execution discipline",
    ],
  },
];
