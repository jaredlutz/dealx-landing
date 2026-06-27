"use client";

import Image from "next/image";
import { Suspense } from "react";
import CeoDocLpViewTracker from "@/components/analytics/CeoDocLpViewTracker";
import DfIncomeTargetedLeadSignup from "./DfIncomeTargetedLeadSignup";
import DfIncomeTargetedStickyCta from "./DfIncomeTargetedStickyCta";
import {
  DF_INCOME_OPPORTUNITY_BOOK_HREF,
  DF_INCOME_OPPORTUNITY_DECK_HREF,
} from "@/lib/book/dfIncomeOpportunityUrls";
import styles from "../../df-income-targeted.module.css";

function TrendIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7v5" />
      <path d="M16 7h5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.3L12 17l-5.7 2.8 1.1-6.3L3 8.9 9 8z" />
    </svg>
  );
}

const FAQ_ITEMS = [
  {
    question: "Who can invest in DF Income?",
    answer:
      "The offering is available to accredited investors only, under Regulation D, Rule 506(c). You'll complete identity and accreditation verification in the portal before subscribing.",
    open: true,
  },
  {
    question: "How do the 12%, 15%, and 18% classes work?",
    answer:
      "There are three income classes tied to commitment size: a 12% class (minimum $100,000), a 15% class (minimum $250,000), and an 18% class (minimum $1,000,000). Stated annual rates are objectives, not guarantees, and accrue on drawn capital as described in the Private Placement Memorandum.",
  },
  {
    question: "What is the money actually invested in?",
    answer:
      "DF Income is a debt offering — promissory notes that fund the acquisition of discounted multifamily debt and distressed note opportunities in today's market. It's an income-focused, institutional-style fixed income strategy.",
  },
  {
    question: "How long is my capital committed?",
    answer: "The strategy has a 2-year term. Full terms are in the offering documents.",
  },
  {
    question: "What are the risks?",
    answer:
      "Investing involves risk, including the potential loss of principal. Stated rates are targets, not guarantees. Private placements are illiquid and intended for a portion of a diversified portfolio. Review the Private Placement Memorandum and consult your own financial, tax, and legal advisors before investing.",
  },
  {
    question: "What happens on the call?",
    answer:
      "It's a 15-minute, no-obligation conversation. We'll learn about your allocation goals, walk through the strategy and the risks, and point you to the next step in the portal if it's a fit.",
  },
];

function DiversyFundLogo({ className }) {
  return (
    <a href="#top" className={`${styles.logoLink} ${className ?? ""}`}>
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

/** DF Income booking A/B variant — promissory-note narrative (`/incomeopportunity/v/{slug}`). */
function resolveTargetedPageClassName(theme, styles) {
  const classes = [styles.page];
  if (theme === "consistent-blue" || theme === "consistent-blue-dark-hero") {
    classes.push(styles.pageConsistentBlue);
  }
  if (theme === "consistent-blue-dark-hero") {
    classes.push(styles.pageConsistentBlueDarkHero);
  }
  return classes.join(" ");
}

export default function DfIncomeTargetedLandingContent({
  pageKey,
  leadSignupSource,
  theme = "default",
}) {
  const pageClassName = resolveTargetedPageClassName(theme, styles);

  return (
    <div className={`marketing-light ${pageClassName}`}>
      <Suspense fallback={null}>
        <CeoDocLpViewTracker pageKey={pageKey} />
      </Suspense>

      <DfIncomeTargetedStickyCta />

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navIn}`}>
          <DiversyFundLogo />
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={DF_INCOME_OPPORTUNITY_BOOK_HREF}>
            Book a private call
          </a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={`${styles.wrap} ${styles.heroIn}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              Target <span className={styles.accent}>12–18% annual income</span>, backed by today&apos;s
              distressed market.
              <span className={styles.heroUrgent}>Act before the market shifts.</span>
            </h1>
            <div className={styles.heroCta}>
              <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`} href={DF_INCOME_OPPORTUNITY_BOOK_HREF}>
                Book a private call
              </a>
            </div>
            <p className={styles.heroSub}>15 minutes · No obligation · Accredited · Reg D 506(c)</p>
          </div>
        </div>
      </section>

      <div className={styles.trust}>
        <div className={`${styles.wrap} ${styles.trustIn}`}>
          <div className={styles.trustItem}>
            <b>$300M+</b>
            <span>Real estate acquired</span>
          </div>
          <div className={styles.trustItem}>
            <b>20+</b>
            <span>Properties</span>
          </div>
          <div className={styles.trustItem}>
            <b>28,000+</b>
            <span>Investors</span>
          </div>
          <div className={styles.trustItem}>
            <b>Since 2016</b>
            <span>Operating platform</span>
          </div>
          <div className={styles.trustItem}>
            <b>1990s</b>
            <span>Cycle-tested leadership</span>
          </div>
        </div>
      </div>

      <section className={`${styles.bgPaper} ${styles.section}`}>
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <span className={styles.eyebrow}>Why allocators are looking at DF Income</span>
            <h2>Income, designed for this moment.</h2>
            <p>Three reasons allocators take the call.</p>
          </div>
          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <div className={styles.ic}>
                <TrendIcon />
              </div>
              <h3>Target 12–18% passive income</h3>
              <p>Three rate classes. Distributions do the work — you operate nothing.</p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.ic}>
                <BuildingIcon />
              </div>
              <h3>Backed by today&apos;s distressed market</h3>
              <p>
                Discounted multifamily debt and distressed assets — quality exposure at a basis the last cycle
                didn&apos;t offer.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.ic}>
                <StarIcon />
              </div>
              <h3>A team through multiple cycles</h3>
              <p>
                Operating since the 1990s — downturns, recoveries, rate shocks. Repeatable process, not a lucky
                deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="classes">
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <span className={styles.eyebrow}>DF Income · Promissory notes</span>
            <h2>Pick your income class.</h2>
            <p>Promissory notes under Reg D, 506(c). Larger commitments access higher stated rates.</p>
          </div>
          <div className={styles.classes}>
            <div className={styles.classCard}>
              <div className={styles.pct}>
                12<span>%</span>
              </div>
              <div className={styles.lbl}>Target annual</div>
              <div className={styles.min}>
                <b>$100,000</b>
                Minimum investment
              </div>
            </div>
            <div className={`${styles.classCard} ${styles.classCardFeat}`}>
              <span className={styles.classTag}>Most popular</span>
              <div className={styles.pct}>
                15<span>%</span>
              </div>
              <div className={styles.lbl}>Target annual</div>
              <div className={styles.min}>
                <b>$250,000</b>
                Minimum investment
              </div>
            </div>
            <div className={styles.classCard}>
              <div className={styles.pct}>
                18<span>%</span>
              </div>
              <div className={styles.lbl}>Target annual</div>
              <div className={styles.min}>
                <b>$1,000,000</b>
                Minimum investment
              </div>
            </div>
          </div>
          <p className={styles.classesFine}>
            2-year term. Stated rates are objectives, not guarantees, and accrue on drawn capital per the PPM.
            $20M target raise. Full terms in the Private Placement Memorandum.
          </p>
        </div>
      </section>

      <section className={`${styles.bgPaper} ${styles.section}`}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.txt}>
            <span className={styles.eyebrow}>The opportunity</span>
            <h2>The dislocation is the entry point.</h2>
            <p>
              Loan maturities, repriced debt, motivated sellers — a rare chance to buy quality multifamily at a
              discount. DF Income is built to step in.
            </p>
            <ul className={styles.ticks}>
              <li>Acquire discounted multifamily debt and note opportunities</li>
              <li>Enter at a basis set by today&apos;s distressed pricing, not yesterday&apos;s peak</li>
              <li>Income-focused structure with a defined 2-year term</li>
              <li>Institutional underwriting and professional quarterly reporting</li>
            </ul>
          </div>
          <div className={styles.panel}>
            <h3>Why now, not later</h3>
            <div className={styles.stat}>
              <b>$20M</b>
              <span>Target capital raise for this offering</span>
            </div>
            <div className={styles.divline} />
            <div className={styles.stat}>
              <b>2 yr</b>
              <span>Defined term with quarterly visibility</span>
            </div>
            <div className={styles.divline} />
            <div className={styles.stat}>
              <b>506(c)</b>
              <span>Reg D placement — accredited investors only</span>
            </div>
            <p className={styles.panelFine}>
              Windows close as pricing normalizes. Deploy while the discount exists.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split} ${styles.splitRev}`}>
          <div className={styles.panel}>
            <h3>Discipline that compounds</h3>
            <p className={styles.panelIntro}>
              Not a lucky deal — a repeatable process, run by people who&apos;ve seen what breaks and what holds
              across cycles.
            </p>
            <div className={styles.stat}>
              <b>30+ yrs</b>
              <span>Operating since the 1990s</span>
            </div>
            <div className={styles.divline} />
            <div className={styles.stat}>
              <b>Multiple</b>
              <span>Market cycles navigated</span>
            </div>
            <div className={styles.divline} />
            <div className={styles.stat}>
              <b>$300M+</b>
              <span>Real estate acquired to date</span>
            </div>
          </div>
          <div className={styles.txt}>
            <span className={styles.eyebrow}>The team</span>
            <h2>Operators who&apos;ve run through more than one cycle.</h2>
            <p>
              Acquiring and operating real estate since the 1990s — through downturns, recoveries, and rate shocks.
              The result: disciplined governance, risk disclosed up front, reporting you can act on.
            </p>
            <ul className={styles.ticks}>
              <li>Cycle-tested leadership with decades of operating history</li>
              <li>Process-driven governance and institutional standards</li>
              <li>Risk disclosure before commitment — no yield marketing</li>
              <li>Investor dashboard and quarterly reporting</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="how" className={`${styles.bgPaper} ${styles.section}`}>
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <span className={styles.eyebrow}>Getting started</span>
            <h2>From conversation to allocation in three steps.</h2>
            <p>Book a call, verify eligibility, and subscribe — with quarterly reporting in your dashboard.</p>
          </div>
          <div className={styles.secCta}>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`} href={DF_INCOME_OPPORTUNITY_DECK_HREF}>
              Request the investor deck →
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.ctaband} ${styles.section}`}>
        <div className={styles.wrap}>
          <h2>
            Act before the
            <br />
            market shifts.
          </h2>
          <p>The distressed window is open now. Book a private call.</p>
          <a className={`${styles.btn} ${styles.btnGold} ${styles.btnLg}`} href={DF_INCOME_OPPORTUNITY_BOOK_HREF}>
            Book your private call →
          </a>
          <p className={styles.micro}>
            Accredited investors only · Regulation D, Rule 506(c) · This does not constitute an offer or commitment
          </p>
        </div>
      </section>

      <section className={`${styles.bgPaper} ${styles.section}`} id="reach">
        <div className={styles.wrap}>
          <div className={styles.reach}>
            <div>
              <h2>Request the investor deck.</h2>
              <p className={styles.reachIntro}>
                For accredited investors and private lenders. Tell us where you fit and we&apos;ll send the DF Income
                materials — via social sign-in, email, or text.
              </p>
            </div>
            <DfIncomeTargetedLeadSignup source={leadSignupSource} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <span className={styles.eyebrow}>Common questions</span>
            <h2>What allocators ask before the call.</h2>
          </div>
          <div className={styles.faq}>
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} open={item.open ? true : undefined}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <div className={styles.faqCta}>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`} href={DF_INCOME_OPPORTUNITY_BOOK_HREF}>
              Book a private call →
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <DiversyFundLogo className={styles.footerLogo} />
          <p className={styles.footerIntro}>
            Institutional fixed income platform for disciplined private-market allocation. Operating since 2016 ·
            $300M+ real estate acquired · 28,000+ investors.
          </p>
          <div className={styles.disc}>
            <p>
              <strong>Important disclosures.</strong> This page is for informational purposes only and does not
              constitute an offer to sell, or a solicitation of an offer to buy, any security. Any offer is made
              only to accredited investors through the Private Placement Memorandum (PPM) and related subscription
              documents, under Regulation D, Rule 506(c).
            </p>
            <p>
              Investing involves risk, including the possible loss of principal. The DF Income offering consists of
              promissory notes (debt). Stated annual rates of 12%, 15%, and 18% are objectives and targets, not
              guarantees, and accrue on drawn capital as described in the PPM. Past performance and prior real estate
              acquired do not guarantee future results. Private placements are illiquid, long-term, and speculative.
              Minimums and rate classes are as stated in the offering documents ($100,000 / $250,000 / $1,000,000).
              Target capital raise is $20 million. The 2-year term is described in the PPM.
            </p>
            <p>
              Prospective investors must independently verify accreditation status and should consult their own
              financial, legal, and tax advisors before investing. Statements regarding market conditions reflect the
              sponsor&apos;s views and are not assurances of outcomes. Booking a call does not create any commitment
              to invest. Questions:{" "}
              <a className={styles.inlineLink} href="mailto:invest@diversyfund.com">
                invest@diversyfund.com
              </a>
              .
            </p>
            <p>© 2026 DiversyFund, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
