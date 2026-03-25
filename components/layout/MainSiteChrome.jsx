"use client";

import React from "react";
import InvestStickyCta from "@/components/investment/InvestStickyCta";
import { brand, cn } from "@/lib/theme";
import TopNav from "@/components/sections/TopNav";
import Footer from "@/components/sections/Footer";

export default function MainSiteChrome({ children }) {
  const [active, setActive] = React.useState("");

  return (
    <div className={cn("flex min-h-screen flex-col pb-16 lg:pb-0", brand.bg, brand.text)}>
      <TopNav active={active} setActive={setActive} />
      <main className="flex-1 pb-20 sm:pb-24">{children}</main>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
        <InvestStickyCta source="sticky-mobile-legal">Start Eligibility Review</InvestStickyCta>
      </div>
    </div>
  );
}
