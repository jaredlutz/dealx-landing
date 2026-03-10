"use client";

import { motion } from "framer-motion";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroDiversy({ content = {}, setActive }) {
  const eyebrow = content.hero_eyebrow ?? "Invest in Real Estate with DiversyFund";
  const title = content.hero_title ?? "Invest Smarter in Expert-Managed Multifamily Real Estate with an AI-Powered Platform";
  const heroImage = content.hero_image_url?.trim() || "/migrated/home/home-1.jpg";

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Hero background - crawled from diversyfund.com */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-diversy-primary/5 via-transparent to-gray-50 dark:from-diversy-primary/10 dark:to-diversy-dark" />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("text-base sm:text-lg", brand.muted)}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8"
          >
            <Button
              href="https://www.diversyfund.com/investment-opportunities/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActive?.("opps")}
            >
              Invest Now
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
