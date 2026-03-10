"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Home,
  Briefcase,
  HelpCircle,
  Shield,
  Info,
  BookOpen,
  Users,
  Lock,
  ArrowRight,
  PanelLeftClose,
  PanelLeft,
  Menu,
} from "lucide-react";
import { getSignUpUrl, getSignInUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";

const SIDEBAR_STORAGE_KEY = "lp-sidebar-collapsed";
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_COLLAPSED = "4rem";

const nav = [
  { id: "home", label: "Home", icon: Home },
  { id: "opps", label: "Opportunities", icon: Briefcase },
  { id: "how", label: "How It Works", icon: HelpCircle },
  { id: "gov", label: "Security & Governance", icon: Shield },
  { id: "about", label: "About", icon: Info },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "ir", label: "Investor Relations", icon: Users },
];

export default function AppSidebar({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) setCollapsed(stored === "true");
  }, [mounted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleCollapsed();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleCollapsed]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      }
      return next;
    });
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navLink = (n) => (
    <a
      key={n.id}
      href={`#${n.id}`}
      onClick={() => {
        setActive(n.id);
        closeMobile();
      }}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
        "focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40",
        active === n.id
          ? "bg-white/10 text-white"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      )}
      title={collapsed ? n.label : undefined}
    >
      <n.icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{n.label}</span>}
    </a>
  );

  const sidebarContent = (
    <>
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-3">
        {!collapsed ? (
          <a
            href="#home"
            onClick={() => {
              setActive("home");
              closeMobile();
            }}
            className="flex items-center gap-2"
          >
            <img
              src="/images/diversyfund-logo-white.svg"
              alt="DiversyFund"
              className="h-8 w-auto"
            />
            <div className="hidden flex-col xl:flex">
              <span className="text-xs text-white/60">Institutional Fixed Income</span>
            </div>
          </a>
        ) : (
          <a
            href="#home"
            onClick={() => {
              setActive("home");
              closeMobile();
            }}
            className="flex flex-shrink-0 items-center justify-center"
          >
            <img
              src="/images/diversyfund-logo-white.svg"
              alt="DiversyFund"
              className="h-6 w-auto max-w-8 object-contain"
            />
          </a>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden rounded-lg p-1.5 text-white/60 hover:bg-white/5 hover:text-white md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {nav.map(navLink)}
      </nav>

      <div className="border-t border-white/10 p-2 space-y-1">
        <a
          href={getSignInUrl()}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition",
            "hover:bg-white/5 hover:text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40"
          )}
          title={collapsed ? "Log In" : undefined}
        >
          <Lock className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Log In</span>}
        </a>
        <a
          href={getSignUpUrl()}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-[#060B12]",
            "hover:bg-white/90 transition",
            "focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40"
          )}
          title={collapsed ? "Access Opportunities" : undefined}
        >
          <ArrowRight className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Access Opportunities</span>}
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile: hamburger trigger + overlay */}
      <div className="fixed left-0 top-0 z-50 flex h-14 items-center gap-2 border-b border-white/10 bg-[#060B12] px-4 md:hidden w-full">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <a href="#home" onClick={() => setActive("home")} className="flex items-center">
          <img
            src="/images/diversyfund-logo-white.svg"
            alt="DiversyFund"
            className="h-8 w-auto"
          />
        </a>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: mobile = slide-in overlay, desktop = fixed left */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col bg-[#060B12] border-r border-white/10",
          "transition-[width,transform] duration-200 ease-in-out",
          "md:translate-x-0 md:left-0",
          mobileOpen ? "translate-x-0 w-[16rem]" : "-translate-x-full md:translate-x-0",
          mobileOpen ? "w-[16rem]" : "md:w-[16rem]",
          !mobileOpen && collapsed && "md:w-[4rem]"
        )}
      >
        {mobileOpen ? (
          <div className="flex h-full w-[16rem] flex-col">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-3">
              <a href="#home" onClick={closeMobile} className="flex items-center gap-2">
                <img
                  src="/images/diversyfund-logo-white.svg"
                  alt="DiversyFund"
                  className="h-8 w-auto"
                />
                <span className="text-xs text-white/60">Institutional Fixed Income</span>
              </a>
              <button
                type="button"
                onClick={closeMobile}
                className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <PanelLeftClose className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-2">
              {nav.map(navLink)}
            </nav>
            <div className="border-t border-white/10 p-2 space-y-1">
              <a
                href={getSignInUrl()}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                <Lock className="h-5 w-5" />
                Log In
              </a>
              <a
                href={getSignUpUrl()}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-[#060B12] hover:bg-white/90"
              >
                <ArrowRight className="h-4 w-4" />
                Access Opportunities
              </a>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-w-0 flex-col">
            {sidebarContent}
          </div>
        )}
      </aside>

      {/* Spacer so main content is not under the fixed sidebar (desktop only) */}
      <div
        className={cn(
          "hidden shrink-0 transition-[width] duration-200 md:block",
          collapsed ? "w-16" : "w-64"
        )}
        aria-hidden="true"
      />
    </>
  );
}
