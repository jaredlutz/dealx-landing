"use client";

import { useEffect, useState } from "react";
import BlogProse from "@/components/blog/BlogProse";
import InsightsUnlockCard, {
  readStoredUnlock,
  writeStoredUnlock,
} from "@/components/blog/InsightsUnlockCard";
import { cn } from "@/lib/theme";

/**
 * `ArticleGate` wraps the gated remainder of a markdown-driven Insights &
 * Education article. The teaser portion is rendered directly above; this
 * component renders the gated `<BlogProse>` behind a blur + lead-capture
 * overlay (the shared `InsightsUnlockCard`), then removes the blur once the
 * visitor submits the unlock form. Unlock state is persisted in localStorage
 * (`df-insights-unlocked-v1`) so repeat visits skip the gate.
 *
 * For JSX-driven pages (e.g. the static `/insights-education/{ira,...}` pages),
 * use the sibling `GatedSection` component instead — same unlock behavior with
 * arbitrary React children.
 */
export default function ArticleGate({ slug, gatedMarkdown, eyebrow = "Continue reading" }) {
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

  if (!gatedMarkdown) return null;

  if (unlocked && hydrated) {
    return (
      <div className="mt-4">
        <BlogProse markdown={gatedMarkdown} />
      </div>
    );
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
        <BlogProse markdown={gatedMarkdown} />
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
