"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Menu, X } from "lucide-react";
import { getSignUpUrl, getSignInUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const nav = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "why", label: "Why Invest", href: "/#why" },
  { id: "portfolio", label: "Portfolio", href: "/#portfolio" },
  { id: "opps", label: "Investment Opportunities", href: "/investment-opportunities" },
  { id: "multifamily", label: "Multifamily Fund", href: "/multifamily-investment-fund" },
  { id: "ira", label: "Invest with IRA", href: "/invest-with-ira" },
  { id: "support", label: "Support", href: "/support" },
  { id: "testimonials", label: "Testimonials", href: "/#testimonials" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function TopNavDiversy({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-diversy-dark/95">
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
                active === n.id ? "bg-diversy-primary/20 text-gray-900 dark:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
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
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-transparent px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:border-diversy-primary/30 dark:border-white/20 dark:text-white dark:hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
          >
            <Lock className="h-4 w-4" />
            Log In
          </a>
          <span className="hidden sm:inline-flex">
            <Button href={getSignUpUrl()} onClick={() => setActive?.("opps")}>Invest Now</Button>
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white dark:border-white/10 dark:bg-diversy-dark">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.id}
                  href={n.href}
                  onClick={() => { setActive?.(n.id); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm transition",
                    active === n.id ? "bg-diversy-primary/20 text-gray-900 dark:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {n.label}
                </Link>
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
                className="flex justify-center gap-2 rounded-xl bg-diversy-primary px-4 py-3 text-sm font-semibold text-white hover:bg-diversy-primary-hover transition mx-4 mt-2"
              >
                Invest Now
              </a>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
