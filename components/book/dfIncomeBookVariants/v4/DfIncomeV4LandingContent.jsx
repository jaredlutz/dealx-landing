"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Suspense } from "react";
import CeoDocLpViewTracker from "@/components/analytics/CeoDocLpViewTracker";
import DfIncomeTargetedLeadSignup from "../target/DfIncomeTargetedLeadSignup";
import {
  DF_INCOME_OPPORTUNITY_BOOK_HREF,
} from "@/lib/book/dfIncomeOpportunityUrls";
import {
  DF_INCOME_TARGET_CLASSES,
  DF_INCOME_TARGET_FAQ_ITEMS,
  DF_INCOME_TARGET_TRUST_STATS,
} from "@/lib/book/dfIncomeTargetVariantContent";
import styles from "./df-income-v4.module.css";

function V4StickyCta() {
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

/** Bento grid + sticky sidebar — `/incomeopportunity/v/4`. */
export default function DfIncomeV4LandingContent({ pageKey, leadSignupSource }) {
  return (
    <div className={`marketing-light ${styles.page}`}>
      <Suspense fallback={null}>
        <CeoDocLpViewTracker pageKey={pageKey} />
      </Suspense>

      <V4StickyCta />

      <header className={styles.nav}>
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
        <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={styles.navBtn}>
          Book a private call
        </a>
      </header>

      <section className={styles.bento} id="top">
        <div className={styles.bentoDark}>
          <div className={styles.bentoDarkInner}>
            <p className={styles.bentoEyebrow}>DF Income · Accredited · Reg D 506(c)</p>
            <h1 className={styles.bentoTitle}>
              Target <span>12–18% income</span> from distressed multifamily debt.
            </h1>
            <div className={styles.bentoActions}>
              <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={styles.btnWhite}>
                Book a private call
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bentoRatesRow}>
        {DF_INCOME_TARGET_CLASSES.map((row) => (
          <div
            key={row.rate}
            className={`${styles.bentoRate} ${row.featured ? styles.bentoRateFeatured : ""}`}
          >
            <div>
              <p className={styles.rateLabel}>Target annual{row.tag ? ` · ${row.tag}` : ""}</p>
              <p className={styles.rateValue}>
                {row.rate}
                <small>%</small>
              </p>
            </div>
            <p className={styles.rateMin}>
              Minimum
              <b>{row.min}</b>
            </p>
          </div>
        ))}
        </div>

        <div className={styles.bentoWide}>
          {DF_INCOME_TARGET_TRUST_STATS.map((item) => (
            <div key={item.label} className={styles.stat}>
              <b>{item.value}</b>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.main}>
        <div className={styles.content}>
          <section className={styles.block}>
            <h2>Built for the current cycle</h2>
            <p>
              Loan maturities, repriced debt, and motivated sellers create a window to acquire discounted
              multifamily exposure — with a defined 2-year income structure and institutional reporting.
            </p>
            <ul className={styles.list}>
              <li>Three income classes from 12% to 18% target annual</li>
              <li>Backed by discounted multifamily debt and note opportunities</li>
              <li>Cycle-tested team operating since the 1990s</li>
              <li>Quarterly visibility through the investor dashboard</li>
            </ul>
            <div className={styles.chipRow}>
              <span className={styles.chip}>$20M target raise</span>
              <span className={styles.chip}>2-year term</span>
              <span className={styles.chip}>506(c) accredited</span>
            </div>
          </section>

          <section className={styles.block} id="how">
            <h2>From deck to allocation</h2>
            <p>Request materials, verify eligibility, and subscribe through the investor portal.</p>
            <ul className={styles.list}>
              <li>Review the investor deck and offering summary</li>
              <li>Complete accreditation and identity verification</li>
              <li>Select your class and subscribe when ready</li>
            </ul>
          </section>

          <section className={styles.block}>
            <h2>Common questions</h2>
            <div className={styles.faq}>
              {DF_INCOME_TARGET_FAQ_ITEMS.map((item) => (
                <details key={item.question} open={item.open ? true : undefined}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar} id="reach">
          <div className={styles.sideCard}>
            <h3>Book a private call</h3>
            <p>15 minutes with our senior team. No obligation — walk through fit, structure, and next steps.</p>
            <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className={styles.sideBook}>
              Book a private call
            </a>
          </div>
          <div className={styles.sideCard}>
            <h3>Request the investor deck</h3>
            <p>For accredited investors. Social sign-in, email, or text — materials sent immediately when eligible.</p>
            <div className={styles.deckForm}>
              <DfIncomeTargetedLeadSignup source={leadSignupSource} />
            </div>
          </div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <Image
          src="/images/df_logo-darkmode.svg"
          alt="DiversyFund"
          width={128}
          height={28}
          className={styles.logoImg}
        />
        <p style={{ marginTop: 12 }}>
          Institutional fixed income platform · Operating since 2016 · $300M+ real estate acquired
        </p>
        <div className={styles.disc}>
          <p>
            For informational purposes only — not an offer or solicitation. Accredited investors only under
            Regulation D, Rule 506(c). Stated rates are targets, not guarantees. Investing involves risk,
            including loss of principal.
          </p>
          <p>© 2026 DiversyFund, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
