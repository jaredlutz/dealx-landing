"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useInvestmentInterest } from "@/contexts/investment-interest-context";
import { cn } from "@/lib/theme";

const investColumns = [
  {
    title: "Take action",
    items: [
      {
        kind: "modal",
        label: "Review current opportunities",
        source: "topnav-invest-review",
        helper: "Eligibility review · accredited investors",
      },
    ],
  },
  {
    title: "Offerings",
    items: [
      {
        kind: "link",
        label: "DF Income / Multifamily Notes",
        href: "/opportunities/df-income",
        helper: "Promissory notes · Reg D 506(c)",
      },
    ],
  },
];

/**
 * Desktop: hover/focus-within mega-panel for Invest.
 * @param {{
 *   isActive: boolean,
 *   onActivate?: () => void,
 *   triggerClassName?: string,
 *   activeTriggerClassName?: string,
 * }} props
 */
export function InvestMegaMenuDesktop({ isActive, onActivate, triggerClassName, activeTriggerClassName }) {
  const { openModal } = useInvestmentInterest();

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => onActivate?.()}
        className={cn(
          "inline-flex items-center gap-0.5 text-sm transition",
          isActive
            ? (activeTriggerClassName ?? "bg-diversy-primary/15 font-medium text-foreground")
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          triggerClassName ?? "rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-diversy-primary/40"
        )}
        aria-haspopup="true"
      >
        Invest
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 opacity-70 transition group-hover:-rotate-180"
          aria-hidden
        />
      </button>
      <div
        className={cn(
          "pointer-events-none invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition duration-150 ease-out",
          "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
        )}
      >
        <div
          className="w-[min(calc(100vw-2rem),36rem)] rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg"
          role="menu"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {investColumns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{col.title}</div>
                <ul className="mt-2 space-y-1">
                  {col.items.map((item) => {
                    if (item.kind === "modal") {
                      return (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={() => {
                              onActivate?.();
                              openModal(item.source);
                            }}
                            className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-foreground outline-none transition hover:bg-muted focus-visible:ring-1 focus-visible:ring-diversy-primary/40"
                            role="menuitem"
                          >
                            <span className="block font-medium">{item.label}</span>
                            {item.helper ? (
                              <span className="mt-0.5 block text-xs text-muted-foreground">{item.helper}</span>
                            ) : null}
                          </button>
                        </li>
                      );
                    }
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => onActivate?.()}
                          className="block rounded-md px-2 py-1.5 text-sm text-foreground outline-none transition hover:bg-muted focus-visible:ring-1 focus-visible:ring-diversy-primary/40"
                          role="menuitem"
                        >
                          <span className="block font-medium">{item.label}</span>
                          {item.helper ? (
                            <span className="mt-0.5 block text-xs text-muted-foreground">{item.helper}</span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
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
 * Mobile drawer for Invest. Hub trigger lives separately in TopNav.
 * @param {{ onPick?: () => void, className?: string }} props
 */
export function InvestMegaMenuMobile({ onPick, className }) {
  const { openModal } = useInvestmentInterest();

  return (
    <div className={cn("mt-1 space-y-4 border-l-2 border-border/80 pl-3", className)}>
      {investColumns.map((col) => (
        <div key={col.title}>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{col.title}</div>
          <ul className="mt-1.5 space-y-0.5">
            {col.items.map((item) => {
              if (item.kind === "modal") {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        openModal(item.source);
                        onPick?.();
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </button>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => onPick?.()}
                    className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
