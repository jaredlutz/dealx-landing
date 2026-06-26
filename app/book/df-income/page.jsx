import Df2026FixedIncomeLandingContent from "@/components/book/Df2026FixedIncomeLandingContent";

export const metadata = {
  title: "DF 2026 Fixed Income — DiversyFund",
  description:
    "Real estate–backed fixed income from operators who've raised capital since 1998. Target preferred returns for accredited investors. Illustrative only; not an offer.",
  openGraph: {
    title: "DF 2026 Fixed Income — DiversyFund",
    description:
      "Closed-end fund with Class A and Class B share classes. For accredited investors; not an offer.",
  },
};

export default function DfIncomeBookPage() {
  return (
    <Df2026FixedIncomeLandingContent pageKey="book-df-income" leadSignupSource="book-df-income" />
  );
}
