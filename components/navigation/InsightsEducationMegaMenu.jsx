"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/theme";
import {
  documentsFormsLinks,
  educationLinks,
  insightsLinks,
  toolsLinks,
} from "@/lib/insights-education-nav";

export const insightsMegaColumns = [
  { title: "Insights", links: insightsLinks },
  { title: "Education", links: educationLinks },
  { title: "Documents & forms", links: documentsFormsLinks },
  { title: "Tools", links: toolsLinks },
];

/**
 * Desktop: hover / focus-within panel for Insights & Education.
 * @param {{
 *   isActive: boolean,
 *   onActivate?: () => void,
 *   triggerClassName?: string,
 *   activeTriggerClassName?: string,
 * }} props
 */
export function InsightsEducationMegaMenuDesktop({
  isActive,
  onActivate,
  triggerClassName,
  activeTriggerClassName,
}) {
  return (
    <div className="group relative">
      <Link
        href="/insights-education"
        onClick={() => onActivate?.()}
        className={cn(
          "inline-flex items-center gap-0.5 text-sm transition",
          isActive
            ? (activeTriggerClassName ?? "bg-diversy-primary/15 font-medium text-foreground")
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          triggerClassName ??
            "rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-diversy-primary/40"
        )}
        aria-haspopup="true"
      >
        Insights & Education
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 opacity-70 transition group-hover:-rotate-180"
          aria-hidden
        />
      </Link>
      <div
        className={cn(
          "pointer-events-none invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition duration-150 ease-out",
          "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
        )}
      >
        <div
          className="w-[min(calc(100vw-2rem),64rem)] rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg"
          role="menu"
        >
          <div className="mb-4 border-b border-border pb-3">
            <Link
              href="/insights-education"
              className="text-sm font-semibold text-foreground hover:text-diversy-primary"
              onClick={() => onActivate?.()}
            >
              View all insights →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            {insightsMegaColumns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{col.title}</div>
                <ul className="mt-2 space-y-0.5">
                  {col.links.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-2 py-1.5 text-sm text-foreground outline-none transition hover:bg-muted focus-visible:ring-1 focus-visible:ring-diversy-primary/40"
                        role="menuitem"
                        onClick={() => onActivate?.()}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile drawer: hub link is separate; this is the nested link groups.
 * @param {{ onPick?: () => void, className?: string }} props
 */
export function InsightsEducationMegaMenuMobile({ onPick, className }) {
  return (
    <div className={cn("mt-1 space-y-4 border-l-2 border-border/80 pl-3", className)}>
      {insightsMegaColumns.map((col) => (
        <div key={col.title}>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{col.title}</div>
          <ul className="mt-1.5 space-y-0.5">
            {col.links.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  onClick={() => onPick?.()}
                  className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
