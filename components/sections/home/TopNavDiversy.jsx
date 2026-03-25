"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Menu, X } from "lucide-react";
import { getSignInUrl } from "@/lib/portal";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const nav = [
  { id: "home", label: "Home", href: "/" },
  { id: "opps", label: "Opportunities", href: "/#opps" },
  { id: "support", label: "Support", href: "/support" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function TopNavDiversy({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="/"
          onClick={() => { setActive?.("home"); setMobileOpen(false); }}
          className="flex items-center gap-3"
        >
          <img
            src="/images/diversyfund-logo.svg"
            alt="DiversyFund"
            className="h-8 w-auto dark:hidden"
          />
          <img
            src="/images/diversyfund-logo-white.svg"
            alt="DiversyFund"
            className="hidden h-8 w-auto dark:block"
          />
          <div className="leading-tight hidden sm:block">
            <div className={cn("text-xs", brand.subtle)}>Multifamily Real Estate</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              onClick={() => { setActive?.(n.id); setMobileOpen(false); }}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50",
                active === n.id ? "bg-diversy-primary/20 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href={getSignInUrl()}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted hover:border-diversy-primary/30 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
          >
            <Lock className="h-4 w-4" />
            Log In
          </a>
          <span className="hidden sm:inline-flex">
            <InvestCtaButton source="nav-diversy-desktop" onBeforeOpen={() => setActive?.("opps")}>
              Invest Now
            </InvestCtaButton>
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.id}
                  href={n.href}
                  onClick={() => { setActive?.(n.id); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm transition",
                    active === n.id ? "bg-diversy-primary/20 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={getSignInUrl()}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Lock className="h-4 w-4" />
                Log In
              </a>
              <InvestCtaButton
                source="nav-diversy-mobile"
                className="mx-4 mt-2 w-[calc(100%-2rem)]"
                onBeforeOpen={() => setMobileOpen(false)}
              >
                Invest Now
              </InvestCtaButton>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
