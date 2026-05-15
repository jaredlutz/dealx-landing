"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Clock, TrendingUp, Users } from "lucide-react";
import { brand, cn } from "@/lib/theme";

const STATS = [
  { value: "$300M+", label: "Real Estate Acquired", icon: TrendingUp },
  { value: "20+", label: "Properties", icon: Building2 },
  { value: "28,000+", label: "Investors", icon: Users },
  { value: "Since 2016", label: "Operating", icon: Clock },
];

export default function HeroStatsBento() {
  const reduce = useReducedMotion();
  const [narrowViewport, setNarrowViewport] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setNarrowViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const tame = Boolean(reduce) || narrowViewport;

  return (
    <motion.div
      className="relative"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: tame ? 0 : 0.11,
            delayChildren: tame ? 0 : 0.2,
          },
        },
      }}
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-diversy-primary/[0.07] blur-xl dark:bg-diversy-primary/[0.12] lg:blur-3xl"
        aria-hidden
      />

      <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
        {STATS.map(({ value, label, icon: Icon }, i) => (
          <motion.article
            key={label}
            variants={{
              hidden: {
                opacity: tame ? 1 : 0,
                y: tame ? 0 : 26,
                scale: tame ? 1 : 0.94,
              },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: tame ? 500 : 340,
                  damping: tame ? 50 : 28,
                  mass: 0.8,
                },
              },
            }}
            whileHover={
              tame
                ? undefined
                : {
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 450, damping: 18 },
                  }
            }
            whileTap={tame ? undefined : { scale: 0.97 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-card-foreground sm:p-5",
              "shadow-md shadow-gray-200/50 dark:shadow-none",
              "ring-1 ring-black/[0.03] ring-inset dark:ring-white/[0.04]",
              "transition-shadow duration-300",
              "hover:shadow-xl hover:shadow-diversy-primary/15 dark:hover:border-white/[0.12] dark:hover:shadow-none"
            )}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-diversy-primary/0 via-diversy-primary/[0.03] to-diversy-primary/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-diversy-primary/[0.06] dark:to-diversy-primary/[0.12]"
              aria-hidden
            />

            <div className="relative">
              <motion.div
                initial={tame ? false : { scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: tame ? 0 : 0.35 + i * 0.06,
                }}
                className="mb-3 inline-flex rounded-lg bg-diversy-primary/10 p-2 text-diversy-primary dark:bg-diversy-primary/20"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </motion.div>

              <motion.p
                className={cn("text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl", brand.text)}
                initial={tame ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 24,
                  delay: tame ? 0 : 0.45 + i * 0.05,
                }}
              >
                {value}
              </motion.p>
              <p
                className={cn(
                  "mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs",
                  brand.muted
                )}
              >
                {label}
              </p>
            </div>

            <motion.div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-diversy-primary/20 blur-xl dark:bg-diversy-primary/25 lg:blur-2xl"
              animate={
                tame
                  ? undefined
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.35, 0.55, 0.35],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              aria-hidden
            />
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
