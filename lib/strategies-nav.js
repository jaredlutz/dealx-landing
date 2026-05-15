/**
 * Strategies is now a single hub page (`/strategies`) that renders the Investment Thesis.
 * The previous mega-menu columns (Three Structures / By Goal / By Product) have been retired —
 * the three "By Goal" educational pages now live under `/insights-education/<slug>` and the
 * standalone By Product / Three Structures pages have been folded back into `/strategies`.
 *
 * Kept as a single export so consumers can use a stable hub href without depending on the
 * old `strategiesColumns` / `strategiesByGoalSubpages` / `strategiesNavLinks` shape.
 */

export const STRATEGIES_HUB_HREF = "/strategies";
