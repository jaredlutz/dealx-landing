"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/theme";

/**
 * Investor deck viewer — controls stay adjacent to the slide (not at the section edges).
 * Slide images often include their own page numbers; we only announce position to assistive tech.
 *
 * @param {{ images: { name: string; url: string; imageIndex: number }[]; className?: string }} props
 */
export default function OfferingDeckCarousel({ images, className }) {
  const sorted = [...images].sort((a, b) => a.imageIndex - b.imageIndex);
  const numPages = sorted.length;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        setPage((p) => Math.max(1, p - 1));
      } else if (e.key === "ArrowRight") {
        setPage((p) => (numPages > 0 ? Math.min(numPages, p + 1) : p));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [numPages]);

  const goPrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goNext = useCallback(
    () => setPage((p) => (numPages > 0 ? Math.min(numPages, p + 1) : p)),
    [numPages]
  );

  const current = sorted[page - 1];

  if (numPages === 0 || !current) {
    return null;
  }

  return (
    <section className={cn("relative", className)} aria-label="Investor presentation slides">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {page} of {numPages}: {current.name}
      </p>

      <div className="relative mx-auto w-full max-w-[920px]">
        {numPages > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={page <= 1}
              aria-label="Previous slide"
              className={cn(
                "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full sm:size-10",
                "left-2 border border-border bg-background text-foreground shadow-md",
                "lg:bg-background/90 lg:backdrop-blur-sm",
                "hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40",
                "disabled:pointer-events-none disabled:opacity-35",
                "sm:left-0 sm:-translate-x-[calc(100%+10px)] sm:shadow-lg"
              )}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={page >= numPages}
              aria-label="Next slide"
              className={cn(
                "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full sm:size-10",
                "right-2 border border-border bg-background text-foreground shadow-md",
                "lg:bg-background/90 lg:backdrop-blur-sm",
                "hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40",
                "disabled:pointer-events-none disabled:opacity-35",
                "sm:right-0 sm:translate-x-[calc(100%+10px)] sm:shadow-lg"
              )}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}

        <div
          className={cn(
            "overflow-hidden rounded-lg border-[3px] border-zinc-800/90 bg-zinc-900 p-0.5 dark:border-zinc-700",
            "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45),0_8px_20px_-6px_rgba(0,0,0,0.28)]"
          )}
        >
          <div className="relative bg-white dark:bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.name}
              className="block h-auto w-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
