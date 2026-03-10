"use client";

import React from "react";
import { brand, cn } from "@/lib/theme";
import TopNavDiversy from "@/components/sections/home/TopNavDiversy";
import HeroDiversy from "@/components/sections/home/HeroDiversy";
import AboutDiversy from "@/components/sections/home/AboutDiversy";
import WhyInvest from "@/components/sections/home/WhyInvest";
import PortfolioDiversy from "@/components/sections/home/PortfolioDiversy";
import FundOpportunity from "@/components/sections/home/FundOpportunity";
import TestimonialsDiversy from "@/components/sections/home/TestimonialsDiversy";
import MobileAppCta from "@/components/sections/home/MobileAppCta";
import FooterDiversy from "@/components/sections/home/FooterDiversy";

export default function LandingPage({ content = {}, testimonials = [] }) {
  const [active, setActive] = React.useState("home");

  return (
    <div className={cn("flex min-h-screen flex-col", brand.bg, brand.text)}>
      <TopNavDiversy active={active} setActive={setActive} />

      <main>
        <HeroDiversy content={content} setActive={setActive} />
        <AboutDiversy content={content} />
        <WhyInvest content={content} />
        <PortfolioDiversy content={content} />
        <FundOpportunity content={content} />
        <TestimonialsDiversy content={content} testimonials={testimonials} />
        <MobileAppCta content={content} />
      </main>

      <FooterDiversy />
    </div>
  );
}
