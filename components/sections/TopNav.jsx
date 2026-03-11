"use client";

import React, { useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import { getSignUpUrl, getSignInUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const nav = [
  { id: "home", label: "Home" },
  { id: "opps", label: "Opportunities" },
  { id: "how", label: "Process" },
  { id: "gov", label: "Governance" },
  { id: "about", label: "About" },
  { id: "resources", label: "Resources" },
  { id: "ir", label: "Access" },
];

export default function TopNav({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-diversy-dark/95">
      <Container className="flex items-center justify-between py-3">
        <a
          href="#home"
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
              href={`#${n.id}`}
              onClick={() => setActive(n.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm transition focus:outline-none focus:ring-1 focus:ring-diversy-primary/40",
                active === n.id ? "bg-diversy-primary/15 text-gray-900 dark:text-white font-medium" : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
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
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/5 transition"
          >
            <Lock className="h-4 w-4" />
            Log In
          </a>
           <span className="hidden sm:inline-flex">
            <Button href={getSignUpUrl()} onClick={() => setActive("opps")}>See Opportunities</Button>
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white dark:border-white/10 dark:bg-diversy-dark">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => { setActive(n.id); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm transition",
                    active === n.id ? "bg-diversy-primary/20 text-gray-900 dark:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {n.label}
                </a>
              ))}
              <a
                href={getSignInUrl()}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white transition"
              >
                <Lock className="h-4 w-4" />
                Log In
              </a>
              <a
                href={getSignUpUrl()}
                className="flex items-center justify-center gap-2 rounded-xl bg-diversy-primary px-4 py-3 text-sm font-semibold text-white hover:bg-diversy-primary-hover transition mx-4 mt-2"
              >
                See Opportunities
              </a>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
