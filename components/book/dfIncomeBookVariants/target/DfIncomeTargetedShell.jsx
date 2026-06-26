"use client";

import { useEffect } from "react";

const ROOT_CLASS = "df-income-targeted-lp";

/** Locks document chrome to the targeted DF Income LP palette (navy canvas). */
export default function DfIncomeTargetedShell({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(ROOT_CLASS);
    return () => {
      root.classList.remove(ROOT_CLASS);
    };
  }, []);

  return children;
}
