"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Suspense } from "react";
import CeoDocLpViewTracker from "@/components/analytics/CeoDocLpViewTracker";
import DfIncomeTargetedLeadSignup from "../target/DfIncomeTargetedLeadSignup";
import {
  DF_INCOME_OPPORTUNITY_BOOK_HREF,
  DF_INCOME_OPPORTUNITY_DECK_HREF,
} from "@/lib/book/dfIncomeOpportunityUrls";
import {
  DF_INCOME_TARGET_CLASSES,
  DF_INCOME_TARGET_FAQ_ITEMS,
  DF_INCOME_TARGET_TRUST_STATS,
} from "@/lib/book/dfIncomeTargetVariantContent";
import styles from "./df-income-v3.module.css";

const TIMELINE_STEPS = [
  {
    title: "Review the deck",
    body: "Understand how the strategy is structured, what backs the income, and where you fit.",
  },
  {
    title: "Verify eligibility",
    body: "Accredited status and identity verification through the investor portal.",
  },
  {
    title: "Allocate & report",
    body: "Subscribe to your class and track quarterly reporting in your dashboard.",
  },
];

function V3StickyCta() {
  const [belowFold, setBelowFold] = useState(false);

  useEffect(() => {
    const update = () => setBelowFold(window.scrollY >= window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const hidden = !belowFold;

  return (
    <a
      href={DF_INCOME_OPPORTUNITY_BOOK_HREF}
      className={`${styles.stickyCta} ${hidden ? styles.stickyHidden : ""}`}
      aria-hidden={hidden ? true : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      Book a private call
    </a>
  );
}

/** Editorial memo layout — `/incomeopportunity/v/3`. */
export default function DfIncomeV3LandingContent({ pageKey, leadSignupSource }) {
  return (
    <div className={`marketing-light ${styles.page}`}>
      <Suspense fallback={null}>
        <CeoDocLpViewTracker pageKey={pageKey} />
      </Suspense>

      <V3StickyCta />

      <section className={styles.hero} id="top">
        <header className={styles.heroTop}>
          <a href="#top">
            <Image
              src="/images/df_logo-darkmode.svg"
              alt="DiversyFund"
              width={128}
              height={28}
              className={styles.logoImg}
              priority
            />
          </a>
          <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={styles.heroBook}>
            Book a private call
          </a>
        </header>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.compliance}>Accredited investors · Reg D 506(c) · Not an offer</p>
            <h1 className={styles.heroTitle}>
              Target <em>12–18% annual income</em> in today&apos;s distressed market.
            </h1>
            <p className={styles.heroLead}>
              An institutional fixed-income strategy backed by discounted multifamily debt — built for
              allocators who want income without operating assets.
            </p>
            <div className={styles.heroActions}>
              <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={`${styles.btn} ${styles.btnPrimary}`}>
                Book a private call
              </a>
            </div>
            <p className={styles.heroMeta}>15 minutes · No obligation · Illustrative targets only</p>
          </div>

          <div className={styles.rateStack} aria-label="Income classes">
            {DF_INCOME_TARGET_CLASSES.map((row) => (
              <div
                key={row.rate}
                className={`${styles.rateRow} ${row.featured ? styles.rateFeatured : ""}`}
              >
                <div className={styles.rateNum}>
                  {row.rate}
                  <span>%</span>
                </div>
                <div className={styles.rateDetail}>
                  Target annual
                  <b>
                    {row.min}
                    {row.tag ? ` · ${row.tag}` : ""}
                  </b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.trustStrip}>
        {DF_INCOME_TARGET_TRUST_STATS.map((item) => (
          <div key={item.label} className={styles.trustCell}>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <section className={styles.memoSection}>
        <div className={styles.wrap}>
          <div className={styles.memoHead}>
            <div className={styles.memoIndex} aria-hidden>
              01
            </div>
            <div>
              <p className={styles.eyebrow}>Investment thesis</p>
              <h2>Why allocators are looking at DF Income now.</h2>
              <p>Three structural reasons the strategy resonates in the current cycle.</p>
            </div>
          </div>
          <div className={styles.pillarList}>
            <div className={styles.pillarRow}>
              <span className={styles.pillarNum} aria-hidden>
                1
              </span>
              <div>
                <h3>Target 12–18% passive income</h3>
                <p>Three rate classes. Distributions do the work — you operate nothing.</p>
              </div>
            </div>
            <div className={styles.pillarRow}>
              <span className={styles.pillarNum} aria-hidden>
                2
              </span>
              <div>
                <h3>Backed by today&apos;s distressed market</h3>
                <p>
                  Discounted multifamily debt at a basis the last cycle didn&apos;t offer — quality exposure,
                  distressed entry.
                </p>
              </div>
            </div>
            <div className={styles.pillarRow}>
              <span className={styles.pillarNum} aria-hidden>
                3
              </span>
              <div>
                <h3>A team through multiple cycles</h3>
                <p>Operating since the 1990s — repeatable process across downturns, recoveries, and rate shocks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.memoSection} id="classes">
        <div className={styles.wrap}>
          <div className={styles.memoHead}>
            <div className={styles.memoIndex} aria-hidden>
              02
            </div>
            <div>
              <p className={styles.eyebrow}>Share classes</p>
              <h2>Compare income classes.</h2>
              <p>Larger commitments access higher stated target rates under Reg D, Rule 506(c).</p>
            </div>
          </div>
          <table className={styles.classTable}>
            <thead>
              <tr>
                <th>Target rate</th>
                <th>Minimum</th>
                <th>Term</th>
              </tr>
            </thead>
            <tbody>
              {DF_INCOME_TARGET_CLASSES.map((row) => (
                <tr key={row.rate} className={row.featured ? styles.classTableFeatured : undefined}>
                  <td>
                    <span className={styles.classRate}>{row.rate}%</span>
                    {row.tag ? <span className={styles.classTag}>{row.tag}</span> : null}
                  </td>
                  <td>{row.min}</td>
                  <td>2 years</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.tableFine}>
            Stated rates are objectives, not guarantees, and accrue on drawn capital per the PPM. $20M target
            raise. Accredited investors only.
          </p>
        </div>
      </section>

      <section className={styles.memoSection}>
        <div className={styles.wrap}>
          <div className={styles.memoHead}>
            <div className={styles.memoIndex} aria-hidden>
              03
            </div>
            <div>
              <p className={styles.eyebrow}>Market context</p>
              <h2>The dislocation is the entry point.</h2>
            </div>
          </div>
          <div className={styles.narrativeGrid}>
            <div className={styles.narrativeBlock}>
              <p>
                Loan maturities, repriced debt, motivated sellers — a rare chance to buy quality multifamily at a
                discount. DF Income is built to step in while pricing still reflects stress, not normalization.
              </p>
              <ul className={styles.tickList}>
                <li>Acquire discounted multifamily debt and note opportunities</li>
                <li>Enter at today&apos;s distressed pricing, not yesterday&apos;s peak</li>
                <li>Income-focused structure with a defined 2-year term</li>
                <li>Institutional underwriting and quarterly reporting</li>
              </ul>
            </div>
            <div className={styles.statList}>
              <div className={styles.statRow}>
                <b>$20M</b>
                <span>Target capital raise</span>
              </div>
              <div className={styles.statRow}>
                <b>2 yr</b>
                <span>Defined term</span>
              </div>
              <div className={styles.statRow}>
                <b>506(c)</b>
                <span>Accredited investors only</span>
              </div>
              <div className={styles.statRow}>
                <b>30+ yrs</b>
                <span>Operating since the 1990s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.memoSection} id="how">
        <div className={styles.wrap}>
          <div className={styles.memoHead}>
            <div className={styles.memoIndex} aria-hidden>
              04
            </div>
            <div>
              <p className={styles.eyebrow}>Process</p>
              <h2>From deck to allocation.</h2>
              <p>A straightforward path for qualified allocators.</p>
            </div>
          </div>
          <div className={styles.timeline}>
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.title} className={styles.step}>
                <div className={styles.stepDot}>{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          <div className={styles.timelineCta}>
            <a href={DF_INCOME_OPPORTUNITY_DECK_HREF} className={`${styles.btn} ${styles.btnPrimary}`}>
              Request the investor deck
            </a>
          </div>
        </div>
      </section>

      <section className={styles.deckBand} id="reach">
        <div className={`${styles.wrap} ${styles.deckGrid}`}>
          <div>
            <p className={styles.eyebrow} style={{ color: "#93c5fd" }}>
              Investor materials
            </p>
            <h2>Request the investor deck.</h2>
            <p className={styles.deckIntro}>
              For accredited investors and private lenders. Tell us where you fit and we&apos;ll send the DF Income
              materials — via social sign-in, email, or text.
            </p>
            <p className={styles.deckIntro} style={{ marginTop: 20 }}>
              Prefer to talk first?{" "}
              <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} style={{ color: "#93c5fd", textDecoration: "underline" }}>
                Book a private call
              </a>
              .
            </p>
          </div>
          <div className={styles.deckForm}>
            <DfIncomeTargetedLeadSignup source={leadSignupSource} />
          </div>
        </div>
      </section>

      <section className={styles.memoSection}>
        <div className={styles.wrap}>
          <div className={styles.memoHead}>
            <div className={styles.memoIndex} aria-hidden>
              05
            </div>
            <div>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>What allocators ask before committing.</h2>
            </div>
          </div>
          <div className={styles.faqGrid}>
            {DF_INCOME_TARGET_FAQ_ITEMS.map((item) => (
              <details key={item.question} className={styles.faqItem} open={item.open ? true : undefined}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <div className={styles.faqCta}>
            <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={`${styles.btn} ${styles.btnPrimary}`}>
              Book a private call
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <Image
            src="/images/df_logo-darkmode.svg"
            alt="DiversyFund"
            width={128}
            height={28}
            className={styles.footerLogo}
          />
          <p>
            Institutional fixed income platform for disciplined private-market allocation. Operating since 2016 ·
            $300M+ real estate acquired · 28,000+ investors.
          </p>
          <div className={styles.disc}>
            <p>
              <strong>Important disclosures.</strong> This page is for informational purposes only and does not
              constitute an offer to sell, or a solicitation of an offer to buy, any security. Any offer is made only
              to accredited investors through the Private Placement Memorandum (PPM) and related subscription
              documents, under Regulation D, Rule 506(c).
            </p>
            <p>
              Investing involves risk, including the possible loss of principal. Stated annual rates of 12%, 15%, and
              18% are objectives and targets, not guarantees. Private placements are illiquid and long-term.
              Questions:{" "}
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
