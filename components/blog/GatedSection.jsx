"use client";

import { useEffect, useState } from "react";
import InsightsUnlockCard, {
  readStoredUnlock,
  writeStoredUnlock,
} from "@/components/blog/InsightsUnlockCard";
import { cn } from "@/lib/theme";

/**
 * `GatedSection` is the JSX-children variant of `ArticleGate`. It wraps the
 * portion of a static educational page (e.g. `/insights-education/ira`) that
 * should sit behind the same lead-capture gate as the markdown blog posts.
 *
 * Behavior matches `ArticleGate` exactly:
 * - Renders `children` blurred + clipped with a fade mask, with the shared
 *   `InsightsUnlockCard` overlay anchored to the bottom of the blurred panel.
 * - Submits to `/api/insights-unlock`, persists unlock state in localStorage
 *   under `df-insights-unlocked-v1`, then reveals `children` directly.
 *
 * @param {{ slug: string, eyebrow?: string, children: React.ReactNode }} props
 */
export default function GatedSection({ slug, eyebrow = "Continue reading", children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (readStoredUnlock()) setUnlocked(true);
  }, []);

  function handleUnlocked() {
    writeStoredUnlock();
    setUnlocked(true);
  }

  if (unlocked && hydrated) {
    return <>{children}</>;
  }

  return (
    <div className="relative mt-4">
      {/* Top fade so the teaser dissolves into the gated section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-background via-background/85 to-transparent"
      />

      <div
        aria-hidden
        className={cn(
          "select-none [filter:blur(6px)] saturate-95",
          "max-h-[28rem] overflow-hidden",
          "[mask-image:linear-gradient(to_bottom,black,rgba(0,0,0,0.65)_55%,transparent_100%)]"
        )}
      >
        {children}
      </div>

      {/* Lead-capture overlay */}
      <div className="absolute inset-x-0 bottom-0 top-16 flex justify-center px-2 pb-2 sm:top-24">
        <div className="pointer-events-auto w-full max-w-2xl self-end">
          <InsightsUnlockCard slug={slug} eyebrow={eyebrow} onUnlocked={handleUnlocked} />
        </div>
      </div>
    </div>
  );
}
