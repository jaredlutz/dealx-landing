"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/theme";

/**
 * Sticky "On this page" TOC for long educational pages.
 * Observes section anchors and highlights whichever is currently in the reader's viewport.
 *
 * Usage: each page section should render with `id="<slug>" className="scroll-mt-24"` and the
 * matching slug in the `sections` prop.
 *
 * @param {{
 *   sections: Array<{ id: string, label: string, num?: string }>,
 *   className?: string,
 *   ariaLabel?: string,
 * }} props
 */
export default function EducationalPageToc({ sections, className, ariaLabel = "On this page" }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        /* top: offset for sticky header; bottom: section is "active" while in the upper half of viewport */
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={cn("text-sm", className)} aria-label={ariaLabel}>
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        On this page
      </div>
      <ol className="space-y-0.5">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                className={cn(
                  "group flex items-baseline gap-2.5 rounded-md px-2 py-1.5 -mx-2 transition",
                  isActive
                    ? "bg-diversy-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {s.num ? (
                  <span
                    className={cn(
                      "min-w-[1.5rem] text-[10px] font-semibold tabular-nums tracking-wide",
                      isActive ? "text-diversy-primary" : "text-muted-foreground/60"
                    )}
                  >
                    {s.num}
                  </span>
                ) : null}
                <span className="leading-snug">{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
