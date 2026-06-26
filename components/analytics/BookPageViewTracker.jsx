"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { identifyVslFromBootstrap, track } from "@/lib/analytics/posthogStrictMode";

const BOOK_PAGE_SESSION_KEY = "df_book_page_view_session_id";

function getOrCreateBookPageSessionId() {
  if (typeof window === "undefined") return "";
  const existing = sessionStorage.getItem(BOOK_PAGE_SESSION_KEY);
  if (existing?.trim()) return existing.trim();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `book_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(BOOK_PAGE_SESSION_KEY, id);
  return id;
}

function parseCalendarIds(raw) {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export default function BookPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tid = searchParams.get("tid")?.trim() || undefined;
  const cid = searchParams.get("cid")?.trim() || undefined;
  const calendars = searchParams.get("calendars")?.trim() || undefined;
  const firedKeyRef = useRef(null);

  useEffect(() => {
    if (!pathname?.startsWith("/book")) return;

    const sessionId = getOrCreateBookPageSessionId();
    const fireKey = `${pathname}:${sessionId}:${tid ?? ""}:${cid ?? ""}`;
    if (firedKeyRef.current === fireKey) return;
    firedKeyRef.current = fireKey;

    const calendarIds = parseCalendarIds(calendars ?? null);
    const source = tid ? "email" : "direct";
    const clientProps = {
      path: pathname,
      source,
      sessionId,
      ...(cid ? { cid, ctaSlug: cid } : {}),
      ...(calendarIds.length > 0 ? { calendarIds } : {}),
    };

    void (async () => {
      try {
        const res = await fetch("/api/crm/book-page-track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            tid,
            cid,
            path: pathname,
            calendars,
            sessionId,
            source,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.distinctId === "string" && data.distinctId.trim()) {
            identifyVslFromBootstrap(data.distinctId.trim());
          }
        }
      } catch {
        /* non-blocking */
      }
      track("book_page_viewed", clientProps);
    })();
  }, [pathname, tid, cid, calendars]);

  return null;
}
