"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import styles from "@/components/book/df-income-targeted.module.css";
import shareholderStyles from "@/components/shareholder/shareholder-next-chapter-materials.module.css";
import CollateralStickyDownloadCta from "@/components/collateral/CollateralStickyDownloadCta";
import { SHAREHOLDER_NEXT_CHAPTER_MATERIALS_LP as content } from "@/lib/shareholder/shareholderNextChapterMaterialsLpContent";
import {
  START_OFFSET_SECONDS,
  getOrCreateMaterialsSessionId,
  trackShareholderMaterialsVideoEvent,
} from "@/lib/analytics/shareholderNextChapterMaterialsVideo";
import { identifyVslFromBootstrap } from "@/lib/analytics/posthogStrictMode";

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

function DownloadButton({ href, className, downloadFilename, children }) {
  return (
    <a className={className} href={href} download={downloadFilename}>
      {children}
    </a>
  );
}

function RecordingPlayer({ hasReplay, replayVideoUrl, tid }) {
  const sessionId = useMemo(getOrCreateMaterialsSessionId, []);
  const seekAppliedRef = useRef(false);
  const autoplayAttemptedRef = useRef(false);
  const videoStartedRef = useRef(false);
  const milestonesReachedRef = useRef(new Set());
  const progressThrottleRef = useRef(null);

  const applyStartOffset = useCallback((video) => {
    if (seekAppliedRef.current || !video?.duration) return;
    if (video.duration > START_OFFSET_SECONDS) {
      video.currentTime = START_OFFSET_SECONDS;
      seekAppliedRef.current = true;
    }
  }, []);

  const tryAutoplay = useCallback((video) => {
    if (autoplayAttemptedRef.current || !video) return;
    autoplayAttemptedRef.current = true;
    video.play().catch(() => {
      // Browser autoplay policy — user can press play; video stays at 3:00.
    });
  }, []);

  const handleLoadedMetadata = useCallback(
    (e) => {
      const video = e.currentTarget;
      applyStartOffset(video);
    },
    [applyStartOffset]
  );

  const handleCanPlay = useCallback(
    (e) => {
      const video = e.currentTarget;
      applyStartOffset(video);
      tryAutoplay(video);
    },
    [applyStartOffset, tryAutoplay]
  );

  const handleVideoPlay = useCallback(() => {
    if (!tid || !sessionId || !hasReplay) return;
    if (!videoStartedRef.current) {
      videoStartedRef.current = true;
      trackShareholderMaterialsVideoEvent(
        tid,
        "shareholder_next_chapter_materials_video_started",
        { startOffsetSeconds: START_OFFSET_SECONDS },
        sessionId
      );
    }
  }, [tid, sessionId, hasReplay]);

  const handleVideoTimeUpdate = useCallback(
    (e) => {
      if (!tid || !sessionId || !hasReplay) return;
      const video = e.currentTarget;
      const duration = video.duration;
      const current = video.currentTime;
      if (!duration || duration <= 0) return;

      const pct = (current / duration) * 100;
      const milestones = [25, 50, 75, 95];
      for (const m of milestones) {
        if (pct >= m && !milestonesReachedRef.current.has(m)) {
          milestonesReachedRef.current.add(m);
          trackShareholderMaterialsVideoEvent(
            tid,
            "shareholder_next_chapter_materials_video_milestone",
            {
              milestone: m,
              currentTime: current,
              duration,
              startOffsetSeconds: START_OFFSET_SECONDS,
            },
            sessionId
          );
        }
      }

      if (progressThrottleRef.current) return;
      progressThrottleRef.current = setTimeout(() => {
        trackShareholderMaterialsVideoEvent(
          tid,
          "shareholder_next_chapter_materials_video_progress",
          {
            currentTime: current,
            duration,
            progressPct: pct,
            watchSecondsFromStart: Math.max(0, current - START_OFFSET_SECONDS),
            startOffsetSeconds: START_OFFSET_SECONDS,
          },
          sessionId
        );
        progressThrottleRef.current = null;
      }, 15000);
    },
    [tid, sessionId, hasReplay]
  );

  const handleVideoEnded = useCallback(() => {
    if (!tid || !sessionId || !hasReplay) return;
    trackShareholderMaterialsVideoEvent(
      tid,
      "shareholder_next_chapter_materials_video_completed",
      { startOffsetSeconds: START_OFFSET_SECONDS },
      sessionId
    );
  }, [tid, sessionId, hasReplay]);

  return (
    <>
      <div
        style={{
          marginTop: 28,
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-sm)",
          background: "#000",
        }}
      >
        {hasReplay ? (
          <video
            className="w-full bg-black"
            style={{ aspectRatio: "16 / 9", display: "block" }}
            controls
            playsInline
            preload="metadata"
            src={replayVideoUrl}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onPlay={handleVideoPlay}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            style={{
              aspectRatio: "16 / 9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: 24,
              textAlign: "center",
              color: "var(--muted)",
              background: "var(--white)",
            }}
          >
            <p style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
              Recording is being prepared. Check back shortly or reply to your invite email.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function ShareholderNextChapterMaterialsClient({
  tid,
  posthogDistinctId,
  firstName,
  replayVideoUrl,
  presentationHref,
  presentationFilename,
  bootstrapUnavailable = false,
}) {
  const hasReplay = Boolean(replayVideoUrl?.trim());
  const hasDeck = Boolean(presentationHref?.trim());
  const primaryBtn = `${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`;
  const pageClassName = `${styles.page} ${styles.pageConsistentBlue}`;
  const personalizedSupport = firstName
    ? `${firstName}, ${content.heroSupport.charAt(0).toLowerCase()}${content.heroSupport.slice(1)}`
    : content.heroSupport;

  useEffect(() => {
    if (posthogDistinctId?.trim()) {
      identifyVslFromBootstrap(posthogDistinctId);
    }
  }, [posthogDistinctId]);

  return (
    <div className={`marketing-light ${pageClassName} ${shareholderStyles.materialsLp}`}>
      {hasDeck ? (
        <CollateralStickyDownloadCta
          href={presentationHref}
          label={content.downloadLabel}
          download={presentationFilename || undefined}
          alwaysVisible
        />
      ) : null}

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navIn}`}>
          <DiversyFundLogo />
          {hasDeck ? (
            <DownloadButton
              href={presentationHref}
              className={`${styles.btn} ${styles.btnPrimary} ${shareholderStyles.navDownload}`}
              downloadFilename={presentationFilename || undefined}
            >
              {content.downloadLabel}
            </DownloadButton>
          ) : null}
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={`${styles.wrap} ${styles.heroIn}`}>
          <div className={styles.heroCopy}>
            {bootstrapUnavailable ? (
              <p
                style={{
                  marginBottom: 16,
                  padding: "12px 16px",
                  borderRadius: 8,
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                We couldn&apos;t personalize this page right now, but the recording and presentation below should
                still load. Refresh in a moment if the player is empty.
              </p>
            ) : null}
            <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
            <p
              style={{
                marginTop: 16,
                maxWidth: 620,
                color: "var(--muted)",
                fontSize: "1.05rem",
                lineHeight: 1.55,
              }}
            >
              {personalizedSupport}
            </p>
            <RecordingPlayer hasReplay={hasReplay} replayVideoUrl={replayVideoUrl} tid={tid} />
            <p className={styles.heroSub} style={{ marginTop: 20 }}>
              {content.heroSub}
            </p>
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

      <section className={`${styles.bgPaper} ${styles.section}`} id="presentation">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.txt}>
            <span className={styles.eyebrow}>{content.presentationSection.eyebrow}</span>
            <h2>{content.presentationSection.title}</h2>
            <p>{content.presentationSection.intro}</p>
            {hasDeck ? (
              <div className={shareholderStyles.sectionDownload} style={{ marginTop: 28 }}>
                <DownloadButton
                  href={presentationHref}
                  className={primaryBtn}
                  downloadFilename={presentationFilename || undefined}
                >
                  {content.downloadLabel}
                </DownloadButton>
              </div>
            ) : (
              <p style={{ marginTop: 16, color: "var(--muted)" }}>
                The presentation file is being uploaded — refresh in a few minutes.
              </p>
            )}
          </div>
          <div className={styles.panel}>
            <h3>What&apos;s inside</h3>
            <ul className={styles.ticks} style={{ marginTop: 16 }}>
              {content.whatsInside.map((line) => (
                <li key={line}>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
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
