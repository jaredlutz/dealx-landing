"use client";

import { motion } from "framer-motion";
import { Shield, FileText, CalendarClock, CheckCircle2 } from "lucide-react";
import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Hero({ setActive }) {
  return (
    <section id="home" className="pt-14 sm:pt-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Badge>
              <Shield className="h-4 w-4" />
              Security-first structuring • Defined duration • Quarterly cadence
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight text-white"
            >
              Income. Structure. Control.
            </motion.h1>

            <p className={cn("mt-5 text-lg leading-relaxed", brand.muted)}>
              Private-market fixed income engineered with institutional discipline and operator-level execution.
              Defined terms. Documented protections. A platform built for serious capital.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href={getSignUpUrl()} onClick={() => setActive("ir")}>Access Opportunities</Button>
              <Button
                variant="secondary"
                href="#gov"
                onClick={() => setActive("gov")}
              >
                Review Our Framework
              </Button>
            </div>

            <div className={cn("mt-6 text-sm", brand.subtle)}>
              Cycle-tested leadership since the 1990s • Process-driven governance • No yield marketing
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Card>
                <div className="flex items-start gap-3">
                  <CalendarClock className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Quarterly cadence</div>
                    <div className={cn("text-sm mt-1", brand.subtle)}>Defined schedule and reporting rhythm.</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <FileText className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Documentation-first</div>
                    <div className={cn("text-sm mt-1", brand.subtle)}>Terms disclosed before subscription.</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <Shield className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Security-focused</div>
                    <div className={cn("text-sm mt-1", brand.subtle)}>Downside-aware structuring.</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className={cn("text-xs tracking-[0.18em] uppercase", brand.subtle)}>
                Allocation Profile
              </div>
              <div className="mt-3 text-white text-xl font-semibold">Designed for $100K–$1M allocators</div>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                If you allocate meaningful capital and expect defined terms, disciplined operations, and professional reporting—this
                platform is built for you.
              </p>

              <div className="mt-6 grid gap-3">
                {["Defined duration", "Quarterly income cadence", "Risk disclosure and documentation", "Platform-based access & reporting"].map(
                  (t) => (
                    <div key={t} className="flex items-center gap-3">
                      <CheckCircle2 className={cn("h-5 w-5", brand.gold)} />
                      <div className={cn("text-sm", brand.text)}>{t}</div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Button href={getSignUpUrl()}>Begin Eligibility Review</Button>
                <a
                  href="#resources"
                  onClick={() => setActive("resources")}
                  className={cn("text-sm hover:text-white transition", brand.muted)}
                >
                  Learn the basics of private-market fixed income →
                </a>
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
