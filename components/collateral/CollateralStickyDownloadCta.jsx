"use client";

import { useEffect, useState } from "react";
import styles from "@/components/book/df-income-targeted.module.css";

/** Mobile sticky CTA — primary download action for collateral LPs. */
export default function CollateralStickyDownloadCta({
  href,
  label,
  onClick,
  download,
  alwaysVisible = false,
}) {
  const [belowFold, setBelowFold] = useState(false);

  useEffect(() => {
    if (alwaysVisible) return undefined;

    const update = () => {
      setBelowFold(window.scrollY >= window.innerHeight * 0.55);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [alwaysVisible]);

  const hidden = alwaysVisible ? false : !belowFold;

  return (
    <a
      href={href}
      onClick={onClick}
      download={download}
      className={`${styles.stickyCta} ${hidden ? styles.stickyCtaBelowFoldHidden : ""}`}
      aria-hidden={hidden ? true : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      {label}
    </a>
  );
}
