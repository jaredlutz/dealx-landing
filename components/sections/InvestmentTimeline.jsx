"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { CircleDollarSign, Building2, Coins, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const STEPS = [
  {
    icon: CircleDollarSign,
    label: "Commit",
    detail: "Investment opens",
  },
  {
    icon: Building2,
    label: "Deploy",
    detail: "Capital into asset",
  },
  {
    icon: Coins,
    label: "Receive",
    detail: "Quarterly distributions",
  },
  {
    icon: ArrowUpRight,
    label: "Exit",
    detail: "Property refinance or sale",
  },
  {
    icon: CheckCircle2,
    label: "Return",
    detail: "Capital returned",
  },
];

export default function InvestmentTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });

  return (
    <section ref={ref} className="pt-20 overflow-hidden">
      <Container>
        <SectionTitle
          eyebrow="Lifecycle"
          title="Investment timeline"
          subtitle="Typical timeline: 18 months. Clear sequence from commitment to return."
          titleSize="large"
        />

        <div className="mt-16 relative">
          {/* Flowing connector line - desktop */}
          <div
            className={cn(
              "absolute top-[36px] left-16 right-16 h-[2px] hidden lg:block",
              "bg-gray-200 dark:bg-white/10"
            )}
          >
            <motion.div
              className="h-full bg-diversy-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left center" }}
            />
          </div>

          {/* Steps - horizontal scroll on mobile (Apple-style), flex on desktop */}
          <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:flex lg:justify-between lg:gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  className="relative flex min-w-[120px] shrink-0 flex-col items-center text-center snap-center lg:min-w-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 24 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.15 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Node */}
                  <div
                    className={cn(
                      "relative z-10 flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full",
                      "border-2 border-diversy-primary/30",
                      "bg-white dark:bg-[#0A0B0D]",
                      "shadow-[0_2px_12px_rgba(0,94,224,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                    )}
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + 0.12 * i,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Icon className={cn("h-7 w-7", brand.accent)} strokeWidth={1.75} />
                    </motion.div>
                  </div>

                  {/* Label + detail */}
                  <div className="mt-5">
                    <div className={cn("text-sm font-semibold tracking-tight", brand.text)}>
                      {step.label}
                    </div>
                    <div className={cn("mt-1 text-xs leading-snug", brand.muted)}>
                      {step.detail}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className={cn("mt-10 text-center text-sm", brand.subtle)}>
            18 months typical • Clear sequence
          </p>
        </div>
      </Container>
    </section>
  );
}
