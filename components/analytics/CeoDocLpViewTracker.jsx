"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics/posthogStrictMode";

export default function CeoDocLpViewTracker({ pageKey }) {
  const sp = useSearchParams();
  const tid = sp.get("tid");
  useEffect(() => {
    track("ceo_doc_lp_landing_view", {
      page: pageKey,
      fromEmail: Boolean(tid?.trim()),
    });
  }, [pageKey, tid]);
  return null;
}
