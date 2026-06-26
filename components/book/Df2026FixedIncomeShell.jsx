"use client";

import { useEffect } from "react";

const ROOT_CLASS = "df2026-fixed-income-lp";

export default function Df2026FixedIncomeShell({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(ROOT_CLASS, "marketing-light");
    return () => {
      root.classList.remove(ROOT_CLASS, "marketing-light");
    };
  }, []);

  return children;
}
