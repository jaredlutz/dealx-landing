"use client";

import Image from "next/image";
import { Suspense } from "react";
import CeoDocLpViewTracker from "@/components/analytics/CeoDocLpViewTracker";
import Df2026FixedIncomeLeadSignup from "./Df2026FixedIncomeLeadSignup";
import Df2026FixedIncomeStickyCta from "./Df2026FixedIncomeStickyCta";
import {
  DF_INCOME_OPPORTUNITY_BOOK_HREF,
  DF_INCOME_OPPORTUNITY_HOW_HREF,
} from "@/lib/book/dfIncomeOpportunityUrls";
import styles from "./df-2026-fixed-income.module.css";

function DiversyFundLogo({ className }) {
  return (
    <a
      href="https://diversyfund.com"
      className={`${styles.logoLink} ${className ?? ""}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/images/df_logo-darkmode.svg"
        alt="DiversyFund"
        width={128}
        height={28}
        className={styles.logoImg}
        priority
      />
    </a>
  );
}

function bookingCtaCopy(pageKey) {
  const isBooking = pageKey === "book-df-income";
  return {
    headerNav: isBooking ? "Book Appointment" : "Request the Deck",
    floating: isBooking ? "Book Appointment" : "Request the Investor Deck",
  };
}

export default function Df2026FixedIncomeLandingContent({
  pageKey = "book-df-income",
  leadSignupSource = "book-df-income",
}) {
  const { headerNav, floating } = bookingCtaCopy(pageKey);

  return (
    <div className={`marketing-light ${styles.page}`}>
      <Suspense fallback={null}>
        <CeoDocLpViewTracker pageKey={pageKey} />
      </Suspense>
      <div className={styles.content}>
        <header className={styles.siteHeader}>
          <div className={styles.wrap}>
            <nav className={styles.nav} aria-label="Primary">
              <DiversyFundLogo />
              <div className={styles.navlinks}>
                <a href="#classes">Share Classes</a>
                <a href={DF_INCOME_OPPORTUNITY_HOW_HREF}>How It Works</a>
                <a href="#track">Track Record</a>
              </div>
              <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={styles.pill}>
                {headerNav}
              </a>
            </nav>
          </div>
          <div className={styles.navMobileWrap}>
            <div className={styles.wrap}>
              <nav className={styles.navMobile} aria-label="Page sections">
                <a href="#classes">Share Classes</a>
                <a href={DF_INCOME_OPPORTUNITY_HOW_HREF}>How It Works</a>
                <a href="#track">Track Record</a>
              </nav>
            </div>
          </div>
        </header>

        <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={styles.deckFab}>
          {floating}
        </a>
        <Df2026FixedIncomeStickyCta
          href={DF_INCOME_OPPORTUNITY_BOOK_HREF}
          label={floating}
          deferUntilBelowFold={pageKey === "book-df-income"}
        />

        <header className={`${styles.wrap} ${styles.hero}`}>
          <p className={styles.heroCompliance}>
            For accredited investors · Illustrative only · Not an offer
          </p>
          <div className={styles.eyebrow}>DF 2026 Fixed Income, LLC · A Closed-End Fund</div>
          <h1 className={styles.heroTitle}>
            Real estate–backed fixed income, <em>built by operators.</em>
          </h1>
          <p className={styles.sub}>
            Target preferred returns of 12–18%, backed by multifamily and private real estate credit. No guru
            pitch — a fund run by people who&apos;ve raised capital and weathered downturns since 1998.
          </p>
          <div className={styles.ctaRow}>
            <a href="#reach" className={`${styles.btn} ${styles.btnPrimary}`}>
              Request the Investor Deck
            </a>
            <a href="#classes" className={`${styles.btn} ${styles.btnGhost}`}>
              Compare Share Classes
            </a>
          </div>

          <div className={styles.stats}>
            <div>
              <div className={styles.statNum}>$1B+</div>
              <div className={styles.statLbl}>Capital Raised</div>
            </div>
            <div>
              <div className={styles.statNum}>30,000+</div>
              <div className={styles.statLbl}>Investors Served</div>
            </div>
            <div>
              <div className={styles.statNum}>Since &apos;98</div>
              <div className={styles.statLbl}>Through Every Cycle</div>
            </div>
            <div>
              <div className={styles.statNum}>12–18%</div>
              <div className={styles.statLbl}>Target Return Range</div>
            </div>
          </div>
        </header>

        <section id="classes" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.secHead}>
            <div className={styles.eyebrow}>Two ways in</div>
            <h2>Choose the share class that fits your appetite.</h2>
            <p>
              Both classes are backed by the same disciplined underwriting. The difference is where you sit in the
              structure and your target preferred return.
            </p>
          </div>
          <div className={styles.classes}>
            <div className={styles.card}>
              <div className={styles.cardTag}>Class B · Income First</div>
              <div className={styles.cardRate}>
                12%<small> target pref.</small>
              </div>
              <div className={styles.cardName}>Steady Income</div>
              <p className={styles.cardMuted}>
                For investors who prioritize consistent, lower-volatility income with a defined preferred return.
              </p>
              <ul className={styles.cardList}>
                <li>Fixed 12% target preferred return</li>
                <li>Quarterly distribution schedule</li>
                <li>Senior position in the distribution waterfall</li>
              </ul>
            </div>
            <div className={`${styles.card} ${styles.featured}`}>
              <div className={styles.ribbonWrap} aria-hidden>
                <span className={styles.ribbon}>Higher Target</span>
              </div>
              <div className={styles.cardTag}>Class A · Growth + Income</div>
              <div className={styles.cardRate}>
                15%<small> target pref.</small>
              </div>
              <div className={styles.cardName}>Enhanced Yield</div>
              <p className={styles.cardCream}>
                For investors seeking a higher target preferred return and comfortable with the corresponding
                position in the structure.
              </p>
              <ul className={styles.cardList}>
                <li>15% target preferred return</li>
                <li>Quarterly distribution schedule</li>
                <li>Real estate–collateralized exposure</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.secHead}>
            <div className={styles.eyebrow}>The mechanics</div>
            <h2>Where the yield actually comes from.</h2>
            <p>
              Capital is pooled into a closed-end fund, deployed into real estate credit, and distributed on a defined
              schedule according to your share class.
            </p>
          </div>
          <a href={DF_INCOME_OPPORTUNITY_HOW_HREF} className={`${styles.btn} ${styles.btnGhost}`}>
            See how it works →
          </a>
        </section>

        <section id="track" className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.quote}>
            <div className={styles.eyebrow} style={{ marginBottom: 30 }}>
              Operator-first, not advisor-first
            </div>
            <blockquote>&ldquo;$1B raised. Built through downturns. Still in the trenches.&rdquo;</blockquote>
            <div className={styles.quoteBy}>Craig Cecilio</div>
            <div className={styles.quoteRole}>Founder &amp; CEO, DiversyFund</div>
          </div>
        </section>

        <section className={styles.wrap} id="reach">
          <div className={styles.reach}>
            <div>
              <h2>Request the investor deck.</h2>
              <p className={styles.reachIntro}>
                For accredited investors and private lenders. Tell us where you fit and we&apos;ll send the DF 2026
                Fixed Income materials and a time to talk with Craig or Alan.
              </p>
            </div>
            <Df2026FixedIncomeLeadSignup source={leadSignupSource} />
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
            achieved. Investing involves risk, including the possible loss of principal. Past performance is not
            indicative of future results. Prospective investors should review all offering materials and consult their
            own legal, tax, and financial advisors before investing.
          </p>
        </footer>
      </div>
    </div>
  );
}
