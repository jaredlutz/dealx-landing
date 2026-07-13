"use client";

import { useEffect, useState } from "react";
import styles from "@/components/book/df-income-targeted.module.css";

/** Mobile sticky CTA — primary download action for collateral LPs. */
export default function CollateralStickyDownloadCta({ href, label, onClick }) {
  const [belowFold, setBelowFold] = useState(false);

  useEffect(() => {
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
  }, []);

  const hidden = !belowFold;

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${styles.stickyCta} ${hidden ? styles.stickyCtaBelowFoldHidden : ""}`}
      aria-hidden={hidden ? true : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      {label}
    </a>
  );
}
