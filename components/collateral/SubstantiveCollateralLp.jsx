"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import styles from "@/components/book/df-income-targeted.module.css";
import CollateralStickyDownloadCta from "@/components/collateral/CollateralStickyDownloadCta";
import { getOrCreateCollateralAnonId } from "@/lib/collateral/collateralAnonId";
import {
  RETARGET_COLLATERAL_DOWNLOADED,
  RETARGET_COLLATERAL_LP_VIEWED,
  COLLATERAL_BOOK_LP_PATH,
} from "@/lib/collateral/collateralCampaigns";
import { metaTrackCustom } from "@/lib/analytics/metaPixel";

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

function DownloadButton({ href, onClick, className, downloadFilename, children }) {
  return (
    <a className={className} href={href} onClick={onClick} download={downloadFilename}>
      {children}
    </a>
  );
}

/**
 * Shared substantive collateral LP — incomeopportunity/v/1 visual system,
 * single CTA (download) repeated across the page.
 *
 * @param {{ content: Record<string, unknown> }} props
 */
export default function SubstantiveCollateralLp({ content }) {
  const searchParams = useSearchParams();
  const tid = searchParams.get("tid");

  const downloadHref = useMemo(() => {
    const params = new URLSearchParams({
      doc: content.documentSlug,
      lpVariant: "open",
    });
    if (tid) params.set("tid", tid);
    const anonId = getOrCreateCollateralAnonId();
    if (anonId) params.set("anonId", anonId);
    return `/api/public/collateral-download?${params.toString()}`;
  }, [content.documentSlug, tid]);

  useEffect(() => {
    const anonId = getOrCreateCollateralAnonId();
    void fetch("/api/crm/collateral-lp-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentSlug: content.documentSlug,
        lpVariant: "open",
        pageKey: content.routeKey,
        tid: tid ?? undefined,
        anonId,
      }),
    });
    metaTrackCustom(RETARGET_COLLATERAL_LP_VIEWED, {
      document_slug: content.documentSlug,
      page_key: content.routeKey,
      lp_variant: "open",
      content_name: content.routeKey,
      content_category: COLLATERAL_BOOK_LP_PATH,
    });
  }, [content.documentSlug, content.routeKey, tid]);

  function onDownloadClick() {
    metaTrackCustom(RETARGET_COLLATERAL_DOWNLOADED, {
      document_slug: content.documentSlug,
      page_key: content.routeKey,
      lp_variant: "open",
      content_name: content.routeKey,
      content_category: COLLATERAL_BOOK_LP_PATH,
    });
  }

  const pageClassName = `${styles.page} ${styles.pageConsistentBlue}`;
  const primaryBtn = `${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`;
  const downloadFilename = content.downloadFilename;

  return (
    <div className={`marketing-light ${pageClassName}`}>
      <CollateralStickyDownloadCta
        href={downloadHref}
        label={content.downloadLabel}
        onClick={onDownloadClick}
      />

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navIn}`}>
          <DiversyFundLogo />
          <DownloadButton
            href={downloadHref}
            onClick={onDownloadClick}
            className={`${styles.btn} ${styles.btnPrimary}`}
            downloadFilename={downloadFilename}
          >
            {content.downloadLabel}
          </DownloadButton>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={`${styles.wrap} ${styles.heroIn}`}>
          <div className={styles.heroCopy}>
            {content.eyebrow ? (
              <span className={styles.eyebrow}>{content.eyebrow}</span>
            ) : null}
            <h1 className={styles.heroTitle}>
              {content.heroTitleBefore ? (
                <>
                  {content.heroTitleBefore}{" "}
                </>
              ) : null}
              <span className={styles.accent}>{content.heroAccent}</span>
              {content.heroTitleAfter ?? ""}
              {content.heroUrgent ? (
                <span className={styles.heroUrgent}>{content.heroUrgent}</span>
              ) : null}
            </h1>
            <p
              style={{
                marginTop: 16,
                maxWidth: 580,
                color: "var(--muted)",
                fontSize: "1.05rem",
                lineHeight: 1.55,
              }}
            >
              {content.heroSupport}
            </p>
            <div className={styles.heroCta}>
              <DownloadButton
                href={downloadHref}
                onClick={onDownloadClick}
                className={primaryBtn}
                downloadFilename={downloadFilename}
              >
                {content.downloadLabel}
              </DownloadButton>
            </div>
            <p className={styles.heroSub}>{content.heroSub}</p>
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
                {section.showDownload ? (
                  <div className={styles.secCta} style={{ marginTop: 36 }}>
                    <DownloadButton
                      href={downloadHref}
                      onClick={onDownloadClick}
                      className={primaryBtn}
                      downloadFilename={downloadFilename}
                    >
                      {content.downloadLabel}
                    </DownloadButton>
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
                {section.showDownload ? (
                  <div className={styles.secCta} style={{ marginTop: 36 }}>
                    <DownloadButton
                      href={downloadHref}
                      onClick={onDownloadClick}
                      className={primaryBtn}
                      downloadFilename={downloadFilename}
                    >
                      {content.downloadLabel}
                    </DownloadButton>
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
                          <strong style={{ display: "block", marginBottom: 4 }}>{t.title}</strong>
                          <span style={{ color: "var(--muted)", lineHeight: 1.55 }}>{t.body}</span>
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
                    <DownloadButton
                      href={downloadHref}
                      onClick={onDownloadClick}
                      className={primaryBtn}
                      downloadFilename={downloadFilename}
                    >
                      {content.downloadLabel}
                    </DownloadButton>
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 12,
                    maxWidth: 900,
                    margin: "0 auto",
                  }}
                >
                  {section.items.map((m) => (
                    <div
                      key={m}
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: 12,
                        padding: "14px 16px",
                        background: "var(--white)",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        textAlign: "center",
                      }}
                    >
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
          <DownloadButton
            href={downloadHref}
            onClick={onDownloadClick}
            className={`${styles.btn} ${styles.btnGold} ${styles.btnLg}`}
            downloadFilename={downloadFilename}
          >
            {content.downloadLabel}
          </DownloadButton>
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
