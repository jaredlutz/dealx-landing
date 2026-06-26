"use client";

import Image from "next/image";
import Link from "next/link";
import DfIncomeHowItWorksSection from "./DfIncomeHowItWorksSection";
import {
  DF_INCOME_OPPORTUNITY_BOOK_HREF,
  DF_INCOME_OPPORTUNITY_HREF,
} from "@/lib/book/dfIncomeOpportunityUrls";
import styles from "./df-2026-fixed-income.module.css";

function DiversyFundLogo({ className }) {
  return (
    <Link href={DF_INCOME_OPPORTUNITY_HREF} className={`${styles.logoLink} ${className ?? ""}`}>
      <Image
        src="/images/df_logo-darkmode.svg"
        alt="DiversyFund"
        width={128}
        height={28}
        className={styles.logoImg}
        priority
      />
    </Link>
  );
}

export default function DfIncomeHowItWorksPageContent() {
  return (
    <div className={`marketing-light ${styles.page}`}>
      <div className={styles.content}>
        <header className={styles.siteHeader}>
          <div className={styles.wrap}>
            <nav className={styles.nav} aria-label="Primary">
              <DiversyFundLogo />
              <Link href={DF_INCOME_OPPORTUNITY_HREF} className={styles.pill}>
                Back to overview
              </Link>
            </nav>
          </div>
        </header>

        <header className={`${styles.wrap} ${styles.hero}`}>
          <p className={styles.heroCompliance}>
            For accredited investors · Illustrative only · Not an offer
          </p>
          <div className={styles.eyebrow}>DF 2026 Fixed Income, LLC</div>
          <h1 className={styles.heroTitle}>
            How it <em>works.</em>
          </h1>
          <p className={styles.sub}>
            A closed-end fund backed by real estate credit — structured for defined income, not speculative
            growth.
          </p>
        </header>

        <DfIncomeHowItWorksSection />

        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.reach}>
            <div>
              <h2>Ready for the next step?</h2>
              <p className={styles.reachIntro}>
                Request the investor deck or schedule a private call with our senior team.
              </p>
            </div>
            <div className={styles.ctaRow}>
              <Link href={`${DF_INCOME_OPPORTUNITY_HREF}#reach`} className={`${styles.btn} ${styles.btnPrimary}`}>
                Request the Investor Deck
              </Link>
              <Link href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={`${styles.btn} ${styles.btnGhost}`}>
                Book Appointment
              </Link>
            </div>
          </div>
        </section>

        <footer className={`${styles.wrap} ${styles.footer}`}>
          <div className={styles.footTop}>
            <DiversyFundLogo />
            <div>San Diego, California</div>
          </div>
          <p className={styles.disclaimer}>
            This material is for informational purposes only and does not constitute an offer to sell or a solicitation
            of an offer to buy any securities. Any offer is made only through official offering documents available to
            qualified, eligible investors. Target preferred returns are targets only, are not guaranteed, and may not be
            achieved. Investing involves risk, including the possible loss of principal.
          </p>
        </footer>
      </div>
    </div>
  );
}
