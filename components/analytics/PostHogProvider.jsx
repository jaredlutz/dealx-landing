"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "@posthog/react";
import { Suspense } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (KEY && typeof window !== "undefined") {
  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: ".ph-no-capture",
    },
  });
}

export default function PostHogProvider({ children }) {
  if (!KEY) return children;
  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export function PostHogBookTrackers({ children }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>{null}</Suspense>
    </>
  );
}
