"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import HeroStatsBento from "@/components/sections/HeroStatsBento";

export default function Hero({ setActive }) {
  return (
    <section
      id="home"
      className={cn(
        "relative overflow-hidden bg-background pt-14 sm:pt-20 pb-12 sm:pb-16 lg:pb-20",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_100%_70%_at_88%_-15%,rgba(0,94,224,0.085),transparent_58%)]",
        "dark:before:bg-[radial-gradient(ellipse_90%_60%_at_92%_-8%,rgba(0,94,224,0.16),transparent_52%)]"
      )}
    >
      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className={cn("mb-4 text-sm", brand.subtle)}>
              Institutional discipline • $300M+ real estate acquired • Operating since 2014
            </div>

            <Badge>
              <Shield className="h-4 w-4" />
              Institutional multifamily • Security-first structuring
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className={cn("mt-6 text-5xl sm:text-6xl font-semibold tracking-tight", brand.text)}
            >
              Income. Structure. Control.
            </motion.h1>

            <p className={cn("mt-5 text-lg leading-relaxed", brand.muted)}>
              Income investments backed by institutional multifamily real estate.
              <br />
              Defined terms, disciplined operations, and professional reporting.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <InvestCtaButton source="hero" onBeforeOpen={() => setActive("opps")}>
                See Available Income Investments
              </InvestCtaButton>
            </div>

            <div className={cn("mt-6 text-sm", brand.subtle)}>
              Cycle-tested leadership since the 1990s • Process-driven governance • No yield marketing
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <HeroStatsBento />
          </div>
        </div>
      </Container>
    </section>
  );
}
