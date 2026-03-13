"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const HERO_STATS = [
  { value: "$300M+", label: "Real Estate Acquired" },
  { value: "40+", label: "Properties" },
  { value: "28,000+", label: "Investors" },
  { value: "Since 2014", label: "Operating" },
];

export default function Hero({ setActive }) {
  return (
    <section id="home" className="pt-14 sm:pt-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
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

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.label} className={cn("font-semibold", brand.text)}>
                  <div className="text-xl sm:text-2xl">{s.value}</div>
                  <div className={cn("mt-0.5 text-xs font-normal", brand.subtle)}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href={getSignUpUrl()} onClick={() => setActive("opps")}>See Available Income Investments</Button>
              <Button
                variant="secondary"
                href="#opps"
                onClick={() => setActive("opps")}
              >
                See Opportunities
              </Button>
            </div>

            <div className={cn("mt-6 text-sm", brand.subtle)}>
              Cycle-tested leadership since the 1990s • Process-driven governance • No yield marketing
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className={cn("rounded-3xl border p-6", brand.border, "bg-gradient-to-b from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5")}>
              <div className={cn("text-xs tracking-[0.18em] uppercase", brand.subtle)}>
                Allocation Profile
              </div>
              <div className={cn("mt-3 text-xl font-semibold", brand.text)}>Designed for $100K–$1M allocators</div>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                If you allocate meaningful capital and expect defined terms, disciplined operations, and professional reporting—this
                platform is built for you.
              </p>

              <div className="mt-6 grid gap-3">
                {["Defined duration", "Quarterly distributions", "Risk disclosure before commitment", "Investor dashboard & quarterly reporting"].map(
                  (t) => (
                    <div key={t} className="flex items-center gap-3">
                      <CheckCircle2 className={cn("h-5 w-5", brand.gold)} />
                      <div className={cn("text-sm", brand.text)}>{t}</div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Button href={getSignUpUrl()}>Start Eligibility Review</Button>
              </div>

              <div className={cn("mt-6 text-xs", brand.subtle)}>
                Investing involves risk, including loss of principal.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
