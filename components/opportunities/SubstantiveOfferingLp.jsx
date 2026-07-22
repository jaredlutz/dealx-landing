"use client";

import Image from "next/image";
import styles from "@/components/book/df-income-targeted.module.css";
import CollateralStickyDownloadCta from "@/components/collateral/CollateralStickyDownloadCta";

function DiversyFundLogo() {
  return (
    <a href="#top" className={styles.logoLink}>
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

function CtaLink({ href, className, children, external = true }) {
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function ProcessArrow() {
  return (
    <div className={styles.capitalWorksArrow} aria-hidden>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M5 12h14" strokeLinecap="round" />
        <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FootnoteWithPpmLink({ text, ppmHref, className }) {
  const marker = "Private Placement Memorandum";
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1 || !ppmHref) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {text.slice(0, markerIndex)}
      <a href={ppmHref} target="_blank" rel="noopener noreferrer">
        {marker}
      </a>
      {text.slice(markerIndex + marker.length)}
    </p>
  );
}

function CapitalWorksFootnote({ text, ppmHref }) {
  return <FootnoteWithPpmLink text={text} ppmHref={ppmHref} className={styles.capitalWorksFootnote} />;
}

/**
 * Investment-thesis LP layout for live offerings — Invest now CTAs throughout.
 *
 * @param {{ content: Record<string, unknown>; investHref: string; ppmHref: string; heroVariant?: "dark" | "light" }} props
 */
export default function SubstantiveOfferingLp({ content, investHref, ppmHref, heroVariant = "dark" }) {
  const lightHero = heroVariant === "light";
  const pageClassName = [
    styles.page,
    styles.pageConsistentBlue,
    lightHero ? "" : styles.pageConsistentBlueDarkHero,
    styles.offeringLp,
    lightHero ? styles.offeringLpLight : "",
  ]
    .filter(Boolean)
    .join(" ");
  const primaryBtn = `${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`;
  const ctaLabel = content.ctaLabel ?? "Invest now";
  const hero = content.hero;

  return (
    <div className={`marketing-light ${pageClassName}`}>
      <CollateralStickyDownloadCta href={investHref} label={ctaLabel} />

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navIn}`}>
          <DiversyFundLogo />
          <p className={styles.navBadge}>
            {hero.badgeBefore}
            <span className={styles.navBadgeAccent}>{hero.badgeAccent}</span>
            {hero.badgeAfter}
          </p>
          <CtaLink href={investHref} className={`${styles.btn} ${styles.btnPrimary}`}>
            {ctaLabel}
          </CtaLink>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={`${styles.wrap} ${styles.heroSplitIn}`}>
          <div className={styles.heroSplitGrid}>
            <div className={styles.heroSplitMain}>
              <h1 className={styles.heroSplitTitle}>
                {hero.titleBefore}
                <em className={styles.accent}>{hero.titleAccent}</em>
                {hero.titleAfter}
              </h1>
              <div className={styles.heroCta}>
                <CtaLink href={investHref} className={primaryBtn}>
                  {ctaLabel}
                </CtaLink>
              </div>
              <p className={styles.heroSplitLead}>{hero.body}</p>
              <p className={styles.heroSub}>{hero.disclaimer}</p>
            </div>

            <aside className={styles.heroGlance} aria-label={hero.glance.title}>
              <p className={styles.heroGlanceTitle}>{hero.glance.title}</p>
              <dl className={styles.heroGlanceRows}>
                {hero.glance.rows.map((row) => (
                  <div key={row.label} className={styles.heroGlanceRow}>
                    <dt className={styles.heroGlanceLabel}>{row.label}</dt>
                    <dd
                      className={`${styles.heroGlanceValue} ${row.highlight ? styles.heroGlanceValueHighlight : ""}`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {content.trust?.length ? (
        <div className={styles.trust}>
          <div className={`${styles.wrap} ${styles.trustIn}`}>
            {content.trust.map((row) => (
              <div key={row.label} className={styles.trustItem}>
                <b>{row.value}</b>
                <span>{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {content.sections?.map((section, idx) => {
        const paper = idx % 2 === 0;
        const sectionClass = `${paper ? styles.bgPaper : ""} ${styles.section}`.trim();

        if (section.kind === "investClasses") {
          return (
            <section
              key={section.eyebrow + section.title}
              className={`${styles.investClassesSection} ${styles.section}`}
              id="invest-classes"
            >
              <div className={styles.wrap}>
                <div className={`${styles.secHead} ${styles.investClassesHead}`}>
                  <span className={styles.offeringDarkEyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  {section.intro ? <p>{section.intro}</p> : null}
                </div>

                <div className={styles.investClassesGrid}>
                  {section.classes.map((item) => (
                    <div
                      key={item.name}
                      className={`${styles.investClassCard} ${item.featured ? styles.investClassCardFeat : ""}`}
                    >
                      {item.tag ? <span className={styles.investClassTag}>{item.tag}</span> : null}
                      <p className={styles.investClassName}>{item.name}</p>
                      <div className={styles.investClassRate}>
                        {item.rate}
                        <span>%</span>
                      </div>
                      <p className={styles.investClassRateLabel}>target annual rate</p>
                      <dl className={styles.investClassRows}>
                        <div className={styles.investClassRow}>
                          <dt className={styles.investClassRowLabel}>Minimum</dt>
                          <dd className={styles.investClassRowValue}>{item.minimum}</dd>
                        </div>
                        <div className={styles.investClassRow}>
                          <dt className={styles.investClassRowLabel}>Target annual income at min.</dt>
                          <dd className={styles.investClassRowValue}>{item.targetIncome}</dd>
                        </div>
                        <div className={styles.investClassRow}>
                          <dt className={styles.investClassRowLabel}>Distributions</dt>
                          <dd className={styles.investClassRowValue}>{item.distributions}</dd>
                        </div>
                      </dl>
                      <CtaLink href={investHref} className={`${styles.btn} ${styles.btnPrimary} ${styles.investClassBtn}`}>
                        {ctaLabel}
                      </CtaLink>
                    </div>
                  ))}
                </div>

                {section.footnote ? (
                  <FootnoteWithPpmLink
                    text={section.footnote}
                    ppmHref={ppmHref}
                    className={styles.investClassesFootnote}
                  />
                ) : null}
              </div>
            </section>
          );
        }

        if (section.kind === "capitalWorks") {
          return (
            <section key={section.eyebrow + section.title} className={sectionClass}>
              <div className={styles.wrap}>
                <div className={`${styles.secHead} ${styles.capitalWorksHead}`}>
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  {section.intro ? <p>{section.intro}</p> : null}
                </div>

                <div className={styles.capitalWorksProcess}>
                  {section.processSteps.flatMap((step, stepIndex) => {
                    const nodes = [
                      <div key={step.title} className={styles.capitalWorksCard}>
                        <h3>{step.title}</h3>
                        <p>{step.body}</p>
                      </div>,
                    ];
                    if (stepIndex < section.processSteps.length - 1) {
                      nodes.push(<ProcessArrow key={`${step.title}-arrow`} />);
                    }
                    return nodes;
                  })}
                </div>

                <div className={styles.capitalWorksFeatures}>
                  {section.features.map((feature) => (
                    <div key={feature.title} className={`${styles.capitalWorksCard} ${styles.capitalWorksFeature}`}>
                      <h3>{feature.title}</h3>
                      <p>{feature.body}</p>
                    </div>
                  ))}
                </div>

                {section.footnote ? <CapitalWorksFootnote text={section.footnote} ppmHref={ppmHref} /> : null}
              </div>
            </section>
          );
        }

        if (section.kind === "strategyStory") {
          return (
            <section key={section.eyebrow + section.title} className={sectionClass}>
              <div className={styles.wrap}>
                <div className={`${styles.secHead} ${styles.strategyStoryHead}`}>
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className={styles.strategyStoryGrid}>
                  <div className={styles.strategyStoryMain}>
                    {section.paragraphs.map((paragraph) => (
                      <p key={typeof paragraph === "string" ? paragraph : paragraph.text + paragraph.emphasis}>
                        {typeof paragraph === "string" ? (
                          paragraph
                        ) : (
                          <>
                            {paragraph.text}
                            <strong>{paragraph.emphasis}</strong>
                          </>
                        )}
                      </p>
                    ))}
                    {section.research ? <p className={styles.strategyStoryResearch}>{section.research}</p> : null}
                  </div>
                  <figure className={styles.strategyStoryQuote}>
                    <blockquote>&ldquo;{section.quote}&rdquo;</blockquote>
                    {section.attribution ? (
                      <figcaption className={styles.strategyStoryAttribution}>{section.attribution}</figcaption>
                    ) : null}
                  </figure>
                </div>
              </div>
            </section>
          );
        }

        if (section.kind === "snapshot" || section.kind === "pillars") {
          return (
            <section key={section.eyebrow + section.title} className={sectionClass}>
              <div className={styles.wrap}>
                <div className={styles.secHead}>
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  {section.intro ? <p>{section.intro}</p> : null}
                </div>
                <div className={styles.pillars}>
                  {section.items.map((item) => (
                    <div key={item.title || item.label} className={styles.pillar}>
                      <h3>{item.title || item.label}</h3>
                      <p>{item.body || item.value}</p>
                    </div>
                  ))}
                </div>
                {section.showCta ? (
                  <div className={styles.secCta} style={{ marginTop: 36 }}>
                    <CtaLink href={investHref} className={primaryBtn}>
                      {ctaLabel}
                    </CtaLink>
                  </div>
                ) : null}
              </div>
            </section>
          );
        }

        if (section.kind === "cards") {
          return (
            <section key={section.eyebrow + section.title} className={sectionClass} id={section.id}>
              <div className={styles.wrap}>
                <div className={styles.secHead}>
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  {section.intro ? <p>{section.intro}</p> : null}
                </div>
                <div className={styles.classes}>
                  {section.items.map((item) => (
                    <div key={item.title} className={styles.classCard}>
                      {item.hold ? <div className={styles.lbl}>{item.hold}</div> : null}
                      {item.pct ? (
                        <div className={styles.pct}>
                          {item.pct}
                          {item.pctSuffix ? <span>{item.pctSuffix}</span> : null}
                        </div>
                      ) : null}
                      <h3 style={{ marginTop: item.hold || item.pct ? 12 : 0, fontSize: "1.15rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ marginTop: 10, color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.55 }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
                {section.showCta ? (
                  <div className={styles.secCta} style={{ marginTop: 36 }}>
                    <CtaLink href={investHref} className={primaryBtn}>
                      {ctaLabel}
                    </CtaLink>
                  </div>
                ) : null}
              </div>
            </section>
          );
        }

        if (section.kind === "split") {
          return (
            <section key={section.eyebrow + section.title} className={sectionClass}>
              <div className={`${styles.wrap} ${styles.split}`}>
                <div className={styles.txt}>
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  {section.intro ? <p>{section.intro}</p> : null}
                  <ul className={styles.ticks}>
                    {section.terms.map((t) => (
                      <li key={t.title}>
                        <div>
                          <strong className={styles.offeringTickTitle}>{t.title}</strong>
                          <span className={styles.offeringTickBody}>{t.body}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.panel}>
                  <h3>{section.panelTitle}</h3>
                  <ul className={styles.ticks} style={{ marginTop: 16 }}>
                    {section.whatsInside.map((line) => (
                      <li key={line}>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 28 }}>
                    <CtaLink href={investHref} className={primaryBtn}>
                      {ctaLabel}
                    </CtaLink>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.kind === "markets") {
          return (
            <section key={section.eyebrow + section.title} className={sectionClass}>
              <div className={styles.wrap}>
                <div className={styles.secHead}>
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  {section.intro ? <p>{section.intro}</p> : null}
                </div>
                <div className={styles.offeringMarketsGrid}>
                  {section.items.map((m) => (
                    <div key={m} className={styles.offeringMarketChip}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}

      <section className={`${styles.ctaband} ${styles.section}`}>
        <div className={styles.wrap}>
          <h2>
            {content.ctaBand.titleLine1}
            {content.ctaBand.titleLine2 ? (
              <>
                <br />
                {content.ctaBand.titleLine2}
              </>
            ) : null}
          </h2>
          <p>{content.ctaBand.body}</p>
          <CtaLink href={investHref} className={`${styles.btn} ${styles.btnGold} ${styles.btnLg}`}>
            {ctaLabel}
          </CtaLink>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p>{content.footer}</p>
        </div>
      </footer>
    </div>
  );
}
