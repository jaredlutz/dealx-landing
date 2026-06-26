import { track } from "@/lib/analytics/posthogStrictMode";

function pageKeyForSource(source) {
  if (source === "book-df-income") return "book-df-income";
  if (source === "book-df-income-target") return "book-df-income-target";
  return "df2026-fixed-income";
}

export function trackDfIncomeDeckRequested(input) {
  track("df_income_deck_requested", {
    source: input.source,
    path: input.path,
    intent: "df-2026-deck",
    investmentRange: input.investmentRange,
    signupMode: input.signupMode,
    pageKey: pageKeyForSource(input.source),
    channel: "client",
  });
}
