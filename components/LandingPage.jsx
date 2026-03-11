"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import TopNav from "@/components/sections/TopNav";
import Hero from "@/components/sections/Hero";
import WhyDiversyFund from "@/components/sections/WhyDiversyFund";
import Positioning from "@/components/sections/Positioning";
import Structures from "@/components/sections/Structures";
import HowReturnsGenerated from "@/components/sections/HowReturnsGenerated";
import InvestmentTimeline from "@/components/sections/InvestmentTimeline";
import Opportunities from "@/components/sections/Opportunities";
import HowItWorks from "@/components/sections/HowItWorks";
import Governance from "@/components/sections/Governance";
import About from "@/components/sections/About";
import Resources from "@/components/sections/Resources";
import InvestorRelations from "@/components/sections/InvestorRelations";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  const [active, setActive] = React.useState("home");

  return (
    <div className={cn("flex min-h-screen flex-col pb-16 lg:pb-0", brand.bg, brand.text)}>
      <TopNav active={active} setActive={setActive} />

      <main className="pb-20 sm:pb-24">
        <Hero setActive={setActive} />
        <Positioning />
        <Structures />
        <HowReturnsGenerated />
        <InvestmentTimeline />
        <WhyDiversyFund />
        <Opportunities />
        <HowItWorks />
        <Governance />
        <About />
        <Resources />
        <InvestorRelations />
      </main>

      <Footer />

      {/* Sticky CTA on mobile */}
      <a
        href={getSignUpUrl()}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-2 bg-diversy-primary px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-diversy-primary-hover",
          "lg:hidden",
          "pb-[max(1rem,env(safe-area-inset-bottom))]"
        )}
      >
        Start Eligibility Review <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
