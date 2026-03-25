"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import InvestmentInterestModal from "@/components/investment/InvestmentInterestModal";

const InvestmentInterestContext = createContext(null);

export function InvestmentInterestProvider({ children }) {
  const [state, setState] = useState({ open: false, source: "" });

  const openModal = useCallback((source) => {
    setState({ open: true, source: typeof source === "string" && source ? source : "unknown" });
  }, []);

  const closeModal = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

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
