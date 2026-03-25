"use client";

import React from "react";
import InvestStickyCta from "@/components/investment/InvestStickyCta";
import { brand, cn } from "@/lib/theme";
import TopNav from "@/components/sections/TopNav";
import Hero from "@/components/sections/Hero";
import Structures from "@/components/sections/Structures";
import Opportunities from "@/components/sections/Opportunities";
import Positioning from "@/components/sections/Positioning";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  const [active, setActive] = React.useState("home");

  return (
    <div className={cn("flex min-h-screen flex-col pb-16 lg:pb-0", brand.bg, brand.text)}>
      <TopNav active={active} setActive={setActive} />

      <main className="pb-20 sm:pb-24">
        <Hero setActive={setActive} />
        <Structures />
        <Opportunities />
        <Positioning />
        <Testimonials />
      </main>

      <Footer />

      {/* Sticky CTA on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
        <InvestStickyCta source="sticky-mobile-landing">Start Eligibility Review</InvestStickyCta>
      </div>
    </div>
  );
}
