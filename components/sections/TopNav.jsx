"use client";

import React, { useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import { getSignInUrl } from "@/lib/portal";
import { cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const nav = [
  { id: "home", label: "Home" },
  { id: "opps", label: "Opportunities" },
];

export default function TopNav({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex items-center justify-between py-3">
        <a
          href="/"
          onClick={() => { setActive("home"); setMobileOpen(false); }}
          className="flex items-center gap-3"
        >
          <img
            src="/images/diversyfund-logo.svg"
            alt="DiversyFund"
            className="h-9 w-auto dark:hidden"
          />
          <img
            src="/images/diversyfund-logo-white.svg"
            alt="DiversyFund"
            className="hidden h-9 w-auto dark:block"
          />
        </a>

        <div className="hidden lg:flex items-center gap-0.5">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={() => setActive(n.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm transition focus:outline-none focus:ring-1 focus:ring-diversy-primary/40",
                active === n.id ? "bg-diversy-primary/15 font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href={getSignInUrl()}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted"
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
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`/#${n.id}`}
                  onClick={() => { setActive(n.id); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm transition",
                    active === n.id ? "bg-diversy-primary/20 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {n.label}
                </a>
              ))}
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
    </div>
  );
}
