"use client";

import { useEffect, useState } from "react";
import styles from "./df-2026-fixed-income.module.css";

export default function Df2026FixedIncomeStickyCta({ href, label, deferUntilBelowFold }) {
  const [belowFold, setBelowFold] = useState(false);

  useEffect(() => {
    if (!deferUntilBelowFold) return;
    const update = () => {
      setBelowFold(window.scrollY >= window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [deferUntilBelowFold]);

  const hidden = deferUntilBelowFold && !belowFold;

  return (
    <a
      href={href}
      className={`${styles.stickyCta} ${hidden ? styles.stickyCtaBelowFoldHidden : ""}`}
      aria-hidden={hidden ? true : undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      {label}
    </a>
  );
}
