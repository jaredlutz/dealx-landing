"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, X } from "lucide-react";
import { getSignInUrl } from "@/lib/portal";
import { cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import {
  InsightsEducationMegaMenuDesktop,
  InsightsEducationMegaMenuMobile,
} from "@/components/navigation/InsightsEducationMegaMenu";
import {
  InvestMegaMenuDesktop,
  InvestMegaMenuMobile,
} from "@/components/navigation/InvestMegaMenu";

/**
 * @param {{ active: string, setActive: (id: string) => void }} props
 */
export default function TopNav({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navActive = (() => {
    if (pathname?.startsWith("/insights-education")) return "insights";
    if (pathname?.startsWith("/strategies")) return "strategies";
    if (pathname?.startsWith("/opportunities")) return "invest";
    if (pathname?.startsWith("/about")) return "about";
    return active;
  })();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background lg:bg-background/95 lg:backdrop-blur supports-[backdrop-filter]:lg:bg-background/80">
      <Container className="flex items-center justify-between py-3">
        <a
          href="/"
          onClick={() => {
            setActive("home");
            setMobileOpen(false);
          }}
          className="flex items-center gap-3"
        >
          <img src="/images/diversyfund-logo.svg" alt="DiversyFund" className="h-9 w-auto dark:hidden" />
          <img src="/images/diversyfund-logo-white.svg" alt="DiversyFund" className="hidden h-9 w-auto dark:block" />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <InvestMegaMenuDesktop
            isActive={navActive === "invest"}
            onActivate={() => setActive("invest")}
          />
          <Link
            href="/strategies"
            onClick={() => setActive("strategies")}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm transition focus:outline-none focus:ring-1 focus:ring-diversy-primary/40",
              navActive === "strategies"
                ? "bg-diversy-primary/15 font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Strategies
          </Link>
          <InsightsEducationMegaMenuDesktop
            isActive={navActive === "insights"}
            onActivate={() => setActive("insights")}
          />
          <Link
            href="/about"
            onClick={() => setActive("about")}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm transition focus:outline-none focus:ring-1 focus:ring-diversy-primary/40",
              navActive === "about"
                ? "bg-diversy-primary/15 font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Learn More
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href={getSignInUrl()}
            className="hidden items-center gap-2 rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted sm:inline-flex"
          >
            <Lock className="h-4 w-4" />
            Log In
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="max-h-[min(85vh,640px)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-2">
              <div className="rounded-lg px-2 py-1">
                <div className="px-2 py-2 text-sm font-semibold text-foreground">Invest</div>
                <InvestMegaMenuMobile onPick={() => setMobileOpen(false)} />
              </div>

              <Link
                href="/strategies"
                onClick={() => {
                  setActive("strategies");
                  setMobileOpen(false);
                }}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm transition",
                  navActive === "strategies"
                    ? "bg-diversy-primary/20 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Strategies
              </Link>

              <div className="rounded-lg px-2 py-1">
                <Link
                  href="/insights-education"
                  onClick={() => {
                    setActive("insights");
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "block rounded-lg px-2 py-2 text-sm font-semibold transition",
                    navActive === "insights"
                      ? "bg-diversy-primary/20 text-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  Insights & Education
                </Link>
                <InsightsEducationMegaMenuMobile onPick={() => setMobileOpen(false)} className="ml-2" />
              </div>

              <Link
                href="/about"
                onClick={() => {
                  setActive("about");
                  setMobileOpen(false);
                }}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm transition",
                  navActive === "about"
                    ? "bg-diversy-primary/20 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Learn More
              </Link>

              <a
                href={getSignInUrl()}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Lock className="h-4 w-4" />
                Log In
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
