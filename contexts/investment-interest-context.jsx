"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import InvestmentInterestModal from "@/components/investment/InvestmentInterestModal";
import { PENDING_LEAD_MODAL_KEY } from "@/components/investment/LeadSignupForm";

/**
 * @typedef {{ kind: "portal" }} PortalSuccessAction
 * @typedef {{ kind: "download", href: string, filename?: string, title: string, description?: string, eyebrow?: string }} DownloadSuccessAction
 * @typedef {PortalSuccessAction | DownloadSuccessAction} SuccessAction
 */

const InvestmentInterestContext = createContext(null);

// 10 minutes — long enough for a LinkedIn OAuth round-trip, short enough that
// the modal doesn't pop on an unrelated future visit.
const PENDING_MODAL_TTL_MS = 10 * 60 * 1000;

export function InvestmentInterestProvider({ children }) {
  const [state, setState] = useState({ open: false, source: "", successAction: null });

  /**
   * @param {string} source — analytics-friendly origin label
   * @param {{ successAction?: SuccessAction }} [options]
   */
  const openModal = useCallback((source, options = {}) => {
    setState({
      open: true,
      source: typeof source === "string" && source ? source : "unknown",
      successAction: options.successAction ?? null,
    });
  }, []);

  const closeModal = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  // On mount, check if we're returning from a LinkedIn deep-link initiated
  // inside the modal — if so, re-open the modal in the original source +
  // successAction so the visitor lands back where they left off and the
  // LeadSignupForm flips straight to "capital" mode (session detected).
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raw;
    try {
      raw = window.sessionStorage.getItem(PENDING_LEAD_MODAL_KEY);
    } catch {
      return;
    }
    if (!raw) return;
    try {
      window.sessionStorage.removeItem(PENDING_LEAD_MODAL_KEY);
    } catch {
      // ignore — best effort
    }
    /** @type {{ source?: string, successAction?: SuccessAction | null, ts?: number }} */
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }
    const age = Date.now() - (parsed.ts ?? 0);
    if (!parsed.source || age > PENDING_MODAL_TTL_MS) return;
    openModal(parsed.source, parsed.successAction ? { successAction: parsed.successAction } : undefined);
  }, [openModal]);

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal]
  );

  return (
    <InvestmentInterestContext.Provider value={value}>
      {children}
      <InvestmentInterestModal
        open={state.open}
        source={state.source}
        successAction={state.successAction}
        onClose={closeModal}
      />
    </InvestmentInterestContext.Provider>
  );
}

export function useInvestmentInterest() {
  const ctx = useContext(InvestmentInterestContext);
  if (!ctx) {
    throw new Error("useInvestmentInterest must be used within InvestmentInterestProvider");
  }
  return ctx;
}
