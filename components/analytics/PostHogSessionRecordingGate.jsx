"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { shouldEnablePostHogSessionRecording } from "@/lib/analytics/posthogSessionRecording";

export default function PostHogSessionRecordingGate() {
  const pathname = usePathname();
  const recordingRef = useRef(false);

  useEffect(() => {
    const enabled = shouldEnablePostHogSessionRecording(pathname);
    if (enabled && !recordingRef.current) {
      try {
        posthog.startSessionRecording(true);
        recordingRef.current = true;
      } catch {
        /* non-blocking */
      }
    } else if (!enabled && recordingRef.current) {
      try {
        posthog.stopSessionRecording();
      } catch {
        /* non-blocking */
      }
      recordingRef.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        try {
          posthog.stopSessionRecording();
        } catch {
          /* non-blocking */
        }
        recordingRef.current = false;
      }
    };
  }, []);

  return null;
}
