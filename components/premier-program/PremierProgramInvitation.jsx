"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Check,
  Clock,
  Inbox,
  Phone,
  RotateCcw,
  Target,
} from "lucide-react";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import VoiceAiCallConsentControl from "@/components/forms/VoiceAiCallConsentControl";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {
  CONTACT_PREFERENCE_OPTIONS,
  INVITATION_AFTER,
  INVITATION_EXPRESS,
  INVITATION_FOUNDERS,
  INVITATION_MARKET_STATS,
  INVITATION_QUALIFICATION,
  INVITATION_TIER_BULLETS,
} from "@/lib/premier-invitation-display";
import { PREMIER_INVESTMENT_RANGES, PREMIER_TIERS } from "@/lib/premier-program-intake-data";
import { SITE_NAME } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const accentEyebrow =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-diversy-primary";
const serifDisplay = "font-serif text-balance";
const hairline = "border border-diversy-primary/35";
const fieldClass = cn(
  "mt-2 w-full rounded-lg border border-diversy-primary/30 bg-muted/30 px-3 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground/70",
  "focus:border-diversy-primary/55 focus:outline-none focus:ring-2 focus:ring-diversy-primary/25"
);

function GoldLine() {
  return (
    <div className="mx-auto flex justify-center py-6" aria-hidden>
      <div className="h-px w-12 bg-diversy-primary/60" />
    </div>
  );
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AfterIcon({ kind }) {
  const common = "h-4 w-4 shrink-0 text-diversy-primary";
  if (kind === "check") return <Check className={common} strokeWidth={2.5} aria-hidden />;
  if (kind === "phone") return <Phone className={common} aria-hidden />;
  if (kind === "building") return <Building2 className={common} aria-hidden />;
  if (kind === "clock") return <Clock className={common} aria-hidden />;
  if (kind === "refresh") return <RotateCcw className={common} aria-hidden />;
  if (kind === "inbox") return <Inbox className={common} aria-hidden />;
  if (kind === "target") return <Target className={common} aria-hidden />;
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-diversy-primary/45 text-[10px] font-bold uppercase tracking-tight text-diversy-primary"
      aria-hidden
    >
      If
    </span>
  );
}

export default function PremierProgramInvitation({ crmBookingCall = "" }) {
  const searchParams = useSearchParams();
  const callHref = typeof crmBookingCall === "string" ? crmBookingCall.trim() : "";
  const hasCallBooking = Boolean(callHref);

  const utm = useMemo(
    () => ({
      utm_campaign: searchParams.get("utm_campaign") ?? "",
      utm_source: searchParams.get("utm_source") ?? "",
      utm_medium: searchParams.get("utm_medium") ?? "",
    }),
    [searchParams]
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [contactPref, setContactPref] = useState("");
  const [consentTransactionalSms, setConsentTransactionalSms] = useState(false);
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [consentVoiceAiCall, setConsentVoiceAiCall] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [doneAudience, setDoneAudience] = useState(null);
  const honeypotRef = useRef(null);

  const howHeardResolved = useMemo(() => {
    const opt = CONTACT_PREFERENCE_OPTIONS.find((o) => o.value === contactPref);
    return opt?.howHeard ?? "";
  }, [contactPref]);

  useEffect(() => {
    if (!doneAudience) return;
    const t = window.setTimeout(() => {
      document.getElementById("premier-invitation-book-call")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
    return () => window.clearTimeout(t);
  }, [doneAudience]);

  const fullName = useMemo(() => `${firstName} ${lastName}`.trim(), [firstName, lastName]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setBusy(true);
      try {
        const res = await fetch("/api/premier-seat-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyWebsite: honeypotRef.current?.value ?? "",
            fullName,
            email,
            phone,
            investmentRange,
            howHeard: howHeardResolved,
            consentTransactionalSms,
            consentEmailPrivacy,
            consentMarketingEmail,
            consentVoiceAiCall,
            intakeVariant: "premier_program",
            utm_campaign: utm.utm_campaign || undefined,
            utm_source: utm.utm_source || undefined,
            utm_medium: utm.utm_medium || undefined,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
          setError(typeof data.message === "string" ? data.message : "Something went wrong.");
          return;
        }
        setDoneAudience(data.audience === "client" ? "client" : "prospect");
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setBusy(false);
      }
    },
    [
      fullName,
      email,
      phone,
      investmentRange,
      howHeardResolved,
      consentTransactionalSms,
      consentEmailPrivacy,
      consentMarketingEmail,
      consentVoiceAiCall,
      utm,
    ]
  );

  const confirmation =
    doneAudience === "client"
      ? "Your relationship manager will be in touch within 24 hours."
      : "Thank you—we have your intake. Book a call when you are ready, or a member of our senior team will reach out.";

  const confirmationClientScheduling =
    "Your relationship manager will see this intake. You can still book a call below if you would like to hold time on the calendar.";

  return (
    <div className="premier-invitation-light min-h-screen bg-background text-foreground antialiased">
      <a
        href="#express-interest"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
        )}
      >
        Skip to form
      </a>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-background lg:bg-background/90 lg:backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className={cn(
              serifDisplay,
              "text-xs font-semibold uppercase tracking-[0.14em] text-diversy-primary transition hover:text-diversy-primary-hover"
            )}
          >
            {SITE_NAME}
          </Link>
          <button
            type="button"
            onClick={() => scrollToId("premier-invitation-hero")}
            className={cn(
              "rounded-full border border-diversy-primary/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-diversy-primary transition hover:bg-diversy-primary/10"
            )}
          >
            Private invitation
          </button>
        </Container>
      </header>

      {/* Hero */}
      <section
        id="premier-invitation-hero"
        className="relative overflow-hidden border-b border-border/60 bg-background px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 94, 224, 0.08), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <div
            className={cn(
              "mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-diversy-primary/35 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-diversy-primary"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-diversy-primary" aria-hidden />
            A private invitation — selected individuals only
          </div>
          <h1 className={cn(serifDisplay, "text-4xl font-normal leading-[1.15] text-foreground sm:text-5xl md:text-[3.25rem]")}>
            The window is open.
            <span className="mt-3 block text-diversy-primary italic">You made the list.</span>
          </h1>
          <p className={cn("mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]")}>
            The Premier Product is sponsor-led multifamily income — structured for accredited investors who want direct
            dialogue with the founding team, disciplined underwriting, and quarterly distributions governed by executed
            documents.
          </p>
          <GoldLine />
          <p className={cn("mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]")}>
            If you are here, you were selected — not mass marketed. Read what follows, then tell us where you are. No
            obligation.
          </p>

          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-stretch gap-6 sm:flex-row sm:justify-center sm:gap-0">
            <div className="flex flex-1 flex-col items-center px-4 py-2 sm:border-r sm:border-diversy-primary/25">
              <span className={cn(serifDisplay, "text-3xl font-normal text-diversy-primary sm:text-4xl")}>12–18%</span>
              <span className={cn(accentEyebrow, "mt-2 text-center text-[10px]")}>Annual return target</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-4 py-2 sm:border-r sm:border-diversy-primary/25">
              <span className={cn(serifDisplay, "text-3xl font-normal text-diversy-primary sm:text-4xl")}>Quarterly</span>
              <span className={cn(accentEyebrow, "mt-2 text-center text-[10px]")}>Cash flow distributions</span>
            </div>
            <div className="flex flex-1 flex-col items-center px-4 py-2">
              <span className={cn(serifDisplay, "text-3xl font-normal text-diversy-primary sm:text-4xl")}>Multifamily</span>
              <span className={cn(accentEyebrow, "mt-2 text-center text-[10px]")}>Acquired below market</span>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button type="button" variant="primary" showArrow={false} onClick={() => scrollToId("express-interest")}>
              Express my interest
            </Button>
            <Button type="button" variant="secondary" showArrow={false} onClick={() => scrollToId("market-condition")}>
              Why now
            </Button>
          </div>
        </div>
      </section>

      {/* Market */}
      <section id="market-condition" className="border-b border-border/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className={accentEyebrow}>The market condition behind this opportunity</p>
          <h2 className={cn(serifDisplay, "mt-5 text-3xl font-normal text-foreground sm:text-4xl")}>
            Banks have stepped back.
            <span className="mt-2 block text-diversy-primary italic">We have not.</span>
          </h2>
          <p className={cn("mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]")}>
            Regional lenders have tightened multifamily credit just as transitional loans mature. Experienced sponsors with
            relationships and balance-sheet discipline can acquire selectively — without relying on syndicated liquidity for
            every trade.
          </p>
          <GoldLine />
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-2">
          {INVITATION_MARKET_STATS.map((card) => (
            <div key={card.label} className={cn("flex flex-col rounded-lg p-6 sm:p-8", hairline, "bg-card/40")}>
              <p className={cn(accentEyebrow, "text-left text-[10px]")}>{card.label}</p>
              <p className={cn(serifDisplay, "mt-4 text-4xl font-normal text-diversy-primary sm:text-5xl")}>{card.value}</p>
              <p className={cn("mt-4 text-left text-sm leading-relaxed text-muted-foreground")}>{card.body}</p>
              <p className={cn("mt-auto pt-6 text-left text-[11px] text-diversy-primary/80")}>{card.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section id="investment-tiers" className="border-b border-border/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className={accentEyebrow}>Investment tiers</p>
          <h2 className={cn(serifDisplay, "mt-5 text-3xl font-normal text-foreground sm:text-4xl")}>
            Three ways to{" "}
            <span className="text-diversy-primary italic">participate</span>
          </h2>
          <p className={cn("mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground")}>
            Minimum allocation, stated annual return (not guaranteed), and quarterly distribution treatment are fixed by tier
            and governed solely by the offering documents you execute.
          </p>
          <GoldLine />
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
          {PREMIER_TIERS.map((tier) => {
            const bullets = INVITATION_TIER_BULLETS[tier.name] ?? [];
            const featured = Boolean(tier.featured);
            return (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-lg px-6 py-10 sm:px-8",
                  hairline,
                  featured ? "bg-diversy-primary/[0.07]" : "bg-background"
                )}
              >
                {featured ? (
                  <span
                    className={cn(
                      "mb-6 inline-flex w-fit rounded-full border border-diversy-primary/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-diversy-primary"
                    )}
                  >
                    Most selected
                  </span>
                ) : (
                  <span className="mb-6 block h-[26px]" aria-hidden />
                )}
                <h3 className={cn(serifDisplay, "text-2xl font-semibold text-foreground")}>{tier.name}</h3>
                <p className={cn("mt-2 text-sm text-muted-foreground")}>Starting at {tier.commitment}</p>
                <p className={cn(serifDisplay, "mt-8 text-5xl font-normal text-diversy-primary")}>{tier.statedAnnual}</p>
                <p className={cn(accentEyebrow, "mt-1 text-[10px] normal-case tracking-normal text-muted-foreground")}>
                  per year, paid quarterly
                </p>
                <p className={cn("mt-6 text-sm font-semibold text-foreground")}>
                  {tier.quarterlyIndicative} per quarter ({tier.commitment} minimum)
                </p>
                <ul className="mt-8 space-y-3 text-left text-sm leading-relaxed text-muted-foreground">
                  {bullets.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-diversy-primary" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quote + founders */}
      <section id="founders" className="border-b border-border/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <blockquote className={cn("rounded-lg px-8 py-10 text-center sm:px-12 sm:py-12", hairline, "bg-card/30")}>
            <p className={cn(serifDisplay, "text-xl italic leading-snug text-foreground sm:text-2xl")}>
              “{INVITATION_FOUNDERS.quote}”
            </p>
            <footer className={cn("mt-6 text-right text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground")}>
              {INVITATION_FOUNDERS.quoteAttribution}
            </footer>
          </blockquote>

          <div className="mx-auto mt-20 max-w-3xl text-center">
            <p className={accentEyebrow}>{INVITATION_FOUNDERS.eyebrow}</p>
            <h2 className={cn(serifDisplay, "mt-5 text-3xl font-normal text-foreground sm:text-4xl")}>
              {INVITATION_FOUNDERS.headlineLead}{" "}
              <span className="text-diversy-primary italic">{INVITATION_FOUNDERS.headlineAccent}</span>
            </h2>
            <p className={cn("mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]")}>
              {INVITATION_FOUNDERS.intro}
            </p>
            <GoldLine />
          </div>

          <div className={cn("mt-10 grid overflow-hidden rounded-lg md:grid-cols-2", hairline)}>
            {INVITATION_FOUNDERS.columns.map((col, i) => (
              <div
                key={col.eyebrow}
                className={cn(
                  "bg-card/20 px-6 py-8 sm:px-10 sm:py-10",
                  i === 0 ? "border-b border-diversy-primary/25 md:border-b-0 md:border-r" : ""
                )}
              >
                <p className={accentEyebrow}>{col.eyebrow}</p>
                <p className={cn(serifDisplay, "mt-6 text-5xl font-normal text-diversy-primary sm:text-6xl")}>{col.stat}</p>
                <p className={cn("mt-6 text-sm leading-relaxed text-muted-foreground")}>{col.body}</p>
              </div>
            ))}
          </div>

          <div className={cn("mx-auto mt-10 max-w-3xl rounded-lg px-6 py-8 text-center sm:px-10", hairline)}>
            <p className={cn("text-sm leading-relaxed text-muted-foreground")}>
              {INVITATION_FOUNDERS.highlightLead}{" "}
              <em className="font-serif text-diversy-primary not-italic">{INVITATION_FOUNDERS.highlightAccent}</em>
            </p>
          </div>
        </div>
      </section>

      {/* Qualification */}
      <section id="qualification" className="border-b border-border/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className={accentEyebrow}>{INVITATION_QUALIFICATION.eyebrow}</p>
          <h2 className={cn(serifDisplay, "mt-6 text-3xl font-normal leading-tight text-foreground sm:text-[2.1rem]")}>
            {INVITATION_QUALIFICATION.headlineLead}{" "}
            <em className="text-diversy-primary not-italic">{INVITATION_QUALIFICATION.headlineAccent}</em>{" "}
            {INVITATION_QUALIFICATION.headlineTrail}
          </h2>
          <div className={cn("mx-auto mt-10 max-w-2xl rounded-lg px-6 py-8 sm:px-10 sm:py-10", hairline)}>
            <p className={cn("text-sm leading-relaxed text-muted-foreground sm:text-[15px]")}>
              {INVITATION_QUALIFICATION.boxed}
            </p>
          </div>
          <p className={cn("mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground")}>
            {INVITATION_QUALIFICATION.footnote}
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="express-interest" className="scroll-mt-24 border-b border-border/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className={accentEyebrow}>{INVITATION_EXPRESS.eyebrow}</p>
          <h2 className={cn(serifDisplay, "mt-6 text-3xl font-normal text-foreground sm:text-4xl")}>
            {INVITATION_EXPRESS.headlineLead}{" "}
            <span className="text-diversy-primary italic">{INVITATION_EXPRESS.headlineAccent}</span>
          </h2>
          <p className={cn("mx-auto mt-6 max-w-xl text-sm text-muted-foreground")}>{INVITATION_EXPRESS.sub}</p>
          <GoldLine />
        </div>

        <div className="mx-auto mt-6 max-w-xl rounded-lg border border-diversy-primary/20 bg-muted/20 px-6 py-8 sm:px-10 sm:py-10">
          {doneAudience ? (
            <p className="text-center text-base font-medium leading-relaxed text-foreground">
              {doneAudience === "client" ? confirmationClientScheduling : confirmation}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="hidden" aria-hidden>
                <label htmlFor="premier-inv-co">Company</label>
                <input ref={honeypotRef} id="premier-inv-co" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="text-left">
                  <label htmlFor="premier-inv-fn" className={cn(accentEyebrow, "block text-[10px]")}>
                    First name
                  </label>
                  <input
                    id="premier-inv-fn"
                    name="firstName"
                    required
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className={fieldClass}
                    autoComplete="given-name"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="premier-inv-ln" className={cn(accentEyebrow, "block text-[10px]")}>
                    Last name
                  </label>
                  <input
                    id="premier-inv-ln"
                    name="lastName"
                    required
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                    className={fieldClass}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="text-left">
                  <label htmlFor="premier-inv-email" className={cn(accentEyebrow, "block text-[10px]")}>
                    Email address
                  </label>
                  <input
                    id="premier-inv-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={fieldClass}
                    autoComplete="email"
                  />
                </div>
                <div className="text-left">
                  <label htmlFor="premier-inv-phone" className={cn(accentEyebrow, "block text-[10px]")}>
                    Phone number
                  </label>
                  <input
                    id="premier-inv-phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    className={fieldClass}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="text-left">
                <label htmlFor="premier-inv-range" className={cn(accentEyebrow, "block text-[10px]")}>
                  Investment range you are considering
                </label>
                <select
                  id="premier-inv-range"
                  name="investmentRange"
                  required
                  value={investmentRange}
                  onChange={(ev) => setInvestmentRange(ev.target.value)}
                  className={cn(fieldClass, "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat")}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="">Select a range</option>
                  {PREMIER_INVESTMENT_RANGES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-left">
                <label htmlFor="premier-inv-contact" className={cn(accentEyebrow, "block text-[10px]")}>
                  Best way to reach you
                </label>
                <select
                  id="premier-inv-contact"
                  name="contactPreference"
                  required
                  value={contactPref}
                  onChange={(ev) => setContactPref(ev.target.value)}
                  className={cn(fieldClass, "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat")}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="">Phone call, email, or text?</option>
                  {CONTACT_PREFERENCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <EmailConsentControls
                privacyChecked={consentEmailPrivacy}
                onPrivacyChange={setConsentEmailPrivacy}
                marketingChecked={consentMarketingEmail}
                onMarketingChange={setConsentMarketingEmail}
                showHeading={false}
                className="bg-muted/20 text-left"
                labelClassName="text-sm leading-snug text-muted-foreground"
              />

              <label className="flex cursor-pointer gap-3 text-left text-sm leading-snug text-muted-foreground">
                <input
                  type="checkbox"
                  checked={consentTransactionalSms}
                  onChange={(ev) => setConsentTransactionalSms(ev.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/30"
                />
                <span>I agree to receive transactional messages at this number regarding my request.</span>
              </label>
              <VoiceAiCallConsentControl
                checked={consentVoiceAiCall}
                onChange={setConsentVoiceAiCall}
              />

              {error ? <p className="text-center text-sm font-medium text-red-500">{error}</p> : null}

              <Button type="submit" variant="primary" disabled={busy} showArrow={false} className="w-full justify-center">
                {busy ? "Submitting…" : "Express my interest"}
              </Button>

              <p className={cn("text-center text-[11px] leading-relaxed text-muted-foreground")}>
                This is not an offer of securities. All information is kept strictly confidential. A member of our team will
                reach out personally within a few hours of your submission — by your preferred channel.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* After */}
      <section id="what-happens-next" className="border-b border-border/60 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className={accentEyebrow}>{INVITATION_AFTER.eyebrow}</p>
            <h2 className={cn(serifDisplay, "mt-6 text-3xl font-normal text-foreground sm:text-4xl")}>
              {INVITATION_AFTER.headline}
              <span className="mt-2 block text-diversy-primary italic">{INVITATION_AFTER.headlineAccent}</span>
            </h2>
            <p className={cn("mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground")}>
              {INVITATION_AFTER.intro}
            </p>
            <GoldLine />
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {[INVITATION_AFTER.existingClients, INVITATION_AFTER.newProspects].map((col) => (
              <div key={col.title}>
                <div className="border-b border-diversy-primary/30 pb-3">
                  <h3 className={cn(accentEyebrow, "text-left text-[11px]")}>{col.title}</h3>
                </div>
                <ul className="mt-8 space-y-10">
                  {col.steps.map((step, si) => (
                    <li key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <AfterIcon kind={step.icon} />
                        {si < col.steps.length - 1 ? (
                          <div className="mt-2 min-h-[2rem] w-px flex-1 bg-diversy-primary/20" aria-hidden />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1 pb-2">
                        <p className={cn(accentEyebrow, "text-left text-[10px]")}>{step.when}</p>
                        <p className={cn("mt-2 font-semibold text-foreground")}>{step.title}</p>
                        <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground")}>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book call */}
      {doneAudience ? (
        <section
          id="premier-invitation-book-call"
          className="scroll-mt-24 border-b border-border/60 px-5 py-14 sm:px-8 sm:py-16"
          aria-labelledby="premier-inv-book-heading"
        >
          <div className="mx-auto max-w-xl text-center">
            <p className={accentEyebrow}>Book a call</p>
            <h2 id="premier-inv-book-heading" className={cn(serifDisplay, "mt-4 text-2xl font-normal text-foreground")}>
              Schedule with investor relations
            </h2>
            <p className={cn("mt-4 text-sm leading-relaxed text-muted-foreground")}>
              Phone conversation only. Opens our secure scheduling flow in a new tab. For other formats, use{" "}
              <Link href="/contact" className="font-medium text-diversy-primary underline underline-offset-2">
                contact
              </Link>
              .
            </p>
            <div className={cn("mt-8 rounded-lg px-6 py-8", hairline, "bg-card/30")}>
              {hasCallBooking ? (
                <Button href={callHref} variant="primary" showArrow={false} rel="noopener noreferrer" target="_blank" className="w-full justify-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  Book a call
                </Button>
              ) : (
                <p className={cn("text-sm", brand.muted)}>
                  Scheduling is not wired from this environment. We still received your intake — a member of the team will
                  reach out to coordinate.
                </p>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className={cn(serifDisplay, "text-sm font-semibold uppercase tracking-[0.14em] text-diversy-primary")}>
            {SITE_NAME} — Premier Product
          </p>
          <p className={cn("mt-8 text-[11px] leading-relaxed text-muted-foreground")}>
            All return targets are projections only and are not guaranteed. Any offer may be made only by prospectus or
            similar disclosure. This page is for informational use by invited or referred accredited investors only and
            does not constitute an offer to sell or a solicitation of an offer to buy any security. Past performance does
            not predict future results.
          </p>
          <p className={cn("mt-10 text-[10px] uppercase tracking-[0.14em] text-muted-foreground")}>
            Accredited investors only · Subject to offering documents
          </p>
        </div>
      </footer>
    </div>
  );
}
