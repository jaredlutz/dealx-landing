"use client";

import React, { useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import { getSignUpUrl, getSignInUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const nav = [
  { id: "home", label: "Home" },
  { id: "opps", label: "Opportunities" },
  { id: "how", label: "How It Works" },
  { id: "gov", label: "Security & Governance" },
  { id: "about", label: "About" },
  { id: "resources", label: "Resources" },
  { id: "ir", label: "Investor Relations" },
];

export default function TopNav({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#060B12]/85 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <a
          href="#home"
          onClick={() => { setActive("home"); setMobileOpen(false); }}
          className="flex items-center gap-3"
        >
          <img
            src="/images/diversyfund-logo-white.svg"
            alt="DiversyFund"
            className="h-8 w-auto"
          />
          <div className="leading-tight hidden sm:block">
            <div className={cn("text-xs", brand.subtle)}>Institutional Fixed Income</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setActive(n.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40",
                active === n.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={getSignInUrl()}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Lock className="h-4 w-4" />
            Log In
          </a>
           <span className="hidden sm:inline-flex">
            <Button href={getSignUpUrl()} onClick={() => setActive("ir")}>Access Opportunities</Button>
          </span>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#060B12]">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => { setActive(n.id); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm transition",
                    active === n.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {n.label}
                </a>
              ))}
              <a
                href={getSignInUrl()}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
              >
                <Lock className="h-4 w-4" />
                Log In
              </a>
              <a
                href={getSignUpUrl()}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#060B12] hover:bg-white/90 transition mx-4 mt-2"
              >
                Access Opportunities
              </a>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
