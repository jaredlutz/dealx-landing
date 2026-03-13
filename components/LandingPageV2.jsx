"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { getSignUpUrl, getSignInUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import TopNav from "@/components/sections/TopNav";
import Hero from "@/components/sections/Hero";
import WhyDiversyFund from "@/components/sections/WhyDiversyFund";
import Structures from "@/components/sections/Structures";
import HowReturnsGenerated from "@/components/sections/HowReturnsGenerated";
import InvestmentTimeline from "@/components/sections/InvestmentTimeline";
import Opportunities from "@/components/sections/Opportunities";
import Footer from "@/components/sections/Footer";
import WebinarHero from "@/components/webinar/WebinarHero";
import WebinarValueProps from "@/components/webinar/WebinarValueProps";
import WebinarPositioning from "@/components/webinar/WebinarPositioning";
import WebinarTestimonials from "@/components/webinar/WebinarTestimonials";

export default function LandingPageV2() {
  const [active, setActive] = React.useState("home");

  return (
    <div className={cn("flex min-h-screen flex-col pb-16 lg:pb-0", brand.bg, brand.text)}>
      <TopNav active={active} setActive={setActive} />

      <main className="pb-20 sm:pb-24">
        {/* Home sections */}
        <Hero setActive={setActive} />
        <WebinarHero />
        <Structures />
        <HowReturnsGenerated />
        <InvestmentTimeline />
        <WhyDiversyFund />
        <WebinarValueProps />
        <WebinarPositioning />
        <Opportunities />
        <WebinarTestimonials />

        {/* Access Your Account */}
        <section className={cn("border-t py-16 sm:py-24", brand.border)}>
          <Container>
            <div className="mx-auto max-w-md text-center">
              <h2 className={cn("text-2xl font-bold", brand.text)}>
                Access Your Account
              </h2>
              <p className={cn("mt-2", brand.muted)}>
                Log in to the DiversyFund platform to manage your investments.
              </p>
              <a
                href={getSignInUrl()}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-diversy-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-diversy-primary-hover focus:outline-none focus:ring-2 focus:ring-diversy-primary/50"
              >
                Log In
              </a>
            </div>
          </Container>
        </section>
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
