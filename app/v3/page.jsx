import WebinarLandingPage from "@/components/webinar/WebinarLandingPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Double Digit Returns Driven by Fixed Income, Not Hype | DiversyFund",
  description:
    "For serious investors: private-market fixed income designed for consistent quarterly cash flow, professional execution, and the institutional platform that powers it.",
};

export default function WebinarV3Page({ searchParams }) {
  return <WebinarLandingPage searchParams={searchParams} />;
}
