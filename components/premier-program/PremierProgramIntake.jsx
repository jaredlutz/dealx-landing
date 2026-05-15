"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, CircleDollarSign, Phone, UsersRound } from "lucide-react";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { PREMIER_INVESTMENT_RANGES, PREMIER_RECEIVES, PREMIER_TIERS } from "@/lib/premier-program-intake-data";
import { SITE_NAME } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-diversy-primary";
const body = cn("text-base leading-relaxed text-muted-foreground");
const strong = "font-semibold text-foreground";

const fieldClass = cn(
  "mt-2 w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground/60 transition",
  "focus:border-diversy-primary/50 focus:outline-none focus:ring-2 focus:ring-diversy-primary/20",
  "dark:border-white/[0.1] dark:bg-muted/25"
);

function SectionHeader({ num, label }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className={eyebrow}>
        {num} — {label}
      </span>
      <div className="h-px max-w-[60px] flex-1 bg-border" aria-hidden />
    </div>
  );
}

function scrollToForm() {
  document.getElementById("request-seat")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PremierProgramIntake({ crmBookingCall = "" }) {
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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [consentTransactionalSms, setConsentTransactionalSms] = useState(false);
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [doneAudience, setDoneAudience] = useState(null);
  const honeypotRef = useRef(null);

  useEffect(() => {
    if (!doneAudience) return;
    const t = window.setTimeout(() => {
      document.getElementById("premier-book-call")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [doneAudience]);

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
            howHeard,
            consentTransactionalSms,
            consentEmailPrivacy,
            consentMarketingEmail,
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
      howHeard,
      consentTransactionalSms,
      consentEmailPrivacy,
      consentMarketingEmail,
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
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
      <a
        href="#request-seat"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
        )}
      >
        Skip to request form
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-background lg:bg-background/90 lg:backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground transition hover:text-diversy-primary"
          >
            {SITE_NAME}
          </Link>
          <ThemeSwitcher />
        </div>
      </header>

      <div
        className={cn(
          "relative overflow-hidden border-b border-border bg-background",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_100%_70%_at_88%_-15%,rgba(0,94,224,0.085),transparent_58%)]",
          "dark:before:bg-[radial-gradient(ellipse_90%_60%_at_92%_-8%,rgba(0,94,224,0.16),transparent_52%)]"
        )}
      >
        <Container className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
              <p className={cn(eyebrow, "mb-0")}>Premier Program</p>
              <p
                className={cn(
                  "text-right text-[11px] font-medium uppercase leading-relaxed tracking-[0.12em] sm:max-w-xs",
                  brand.muted
                )}
              >
                Accredited Investors
                <br />
                Confidential · Invitation only
              </p>
            </div>

            <h1 className={cn("text-3xl font-semibold tracking-tight sm:text-4xl", brand.text)}>
              Premier Program
              <span className={cn("mt-2 block text-lg font-normal text-muted-foreground sm:text-xl")}>
                By invitation only.
              </span>
            </h1>

            <p className={cn("mt-6 max-w-2xl text-[15px] font-medium leading-snug sm:text-base", brand.text)}>
              Regional and community banks have pulled back from multifamily lending. Overleveraged owners face refinancing
              pressure. In select markets, assets trade below replacement cost—creating a finite window for disciplined
              acquisition.
            </p>
            <p className={cn("mt-4 max-w-2xl text-lg leading-relaxed", brand.muted)}>
              Premier Program is sponsor-led capital formation for that window—not open enrollment and not self-serve.
            </p>

            <div
              className={cn(
                "mt-10 rounded-2xl border border-diversy-primary/25 bg-diversy-primary/[0.04] py-7 pl-5 pr-6 dark:bg-diversy-primary/[0.08]",
                "border-l-4 border-l-diversy-primary"
              )}
            >
              <p className={cn(eyebrow, "mb-3")}>Why this program exists</p>
              <p className={body}>
                The Mortgage Bankers Association (2024) reported on the order of{" "}
                <strong className={strong}>$94 billion</strong> in commercial real estate loans classified as distressed
                or troubled, with multifamily among the fastest-growing segments—context for repositioning volume in
                target markets.
              </p>
              <p className={cn(body, "mt-4")}>
                A reviewed intake path keeps sponsor time aligned with underwriting and closing—not retail throughput.
                Session dates and locations are not published here; scheduling is confirmed privately after verification.
              </p>
            </div>

            <div className="mt-8">
              <Button type="button" variant="primary" showArrow={false} onClick={scrollToForm}>
                Take your seat
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <section aria-labelledby="premier-tiers-heading">
            <SectionHeader num="01" label="Commitment and economics" />
            <h2 id="premier-tiers-heading" className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
              Three allocation levels into the offering
            </h2>
            <p className={cn(body, "mt-4")}>
              Minimum allocation, <strong className={strong}>stated annual return</strong> (not guaranteed), and{" "}
              <strong className={strong}>quarterly distribution treatment</strong> are fixed by tier and governed solely
              by the offering documents you execute. Indicative quarterly amounts use the formula below at the tier
              minimum, before fees, taxes, and adjustments described in those documents.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {PREMIER_TIERS.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "overflow-hidden border-border p-0",
                    tier.featured && "border-diversy-primary/40 shadow-sm ring-1 ring-diversy-primary/15"
                  )}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className={cn("text-xl font-semibold tracking-tight", brand.text)}>{tier.name}</h3>
                        <p className={cn("mt-2 max-w-prose text-sm leading-relaxed", brand.muted)}>{tier.narrative}</p>
                      </div>
                      <dl className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-2 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm dark:bg-muted/15 sm:text-right">
                        <div>
                          <dt className={cn("text-[11px] font-medium uppercase tracking-[0.1em]", brand.muted)}>
                            Minimum allocation
                          </dt>
                          <dd className={cn("font-semibold tabular-nums", brand.text)}>{tier.commitment}</dd>
                        </div>
                        <div>
                          <dt className={cn("text-[11px] font-medium uppercase tracking-[0.1em]", brand.muted)}>
                            Stated annual return
                          </dt>
                          <dd className={cn("font-semibold tabular-nums text-diversy-primary")}>{tier.statedAnnual}</dd>
                        </div>
                        <div className="col-span-2 border-t border-border pt-2 sm:col-span-2">
                          <dt className={cn("text-[11px] font-medium uppercase tracking-[0.1em]", brand.muted)}>
                            Indicative quarterly distribution
                          </dt>
                          <dd className={cn("font-semibold tabular-nums", brand.text)}>{tier.quarterlyIndicative}</dd>
                          <dd className={cn("mt-1 font-mono text-[11px] leading-snug", brand.muted)}>{tier.math}</dd>
                        </div>
                      </dl>
                    </div>
                    <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-12" aria-labelledby="premier-receive-heading">
            <SectionHeader num="02" label="What you receive" />
            <h2 id="premier-receive-heading" className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>
              Reporting and cash flow at tier
            </h2>
            <ul className="mt-6 space-y-3">
              {PREMIER_RECEIVES.map((line) => (
                <li key={line} className="flex gap-2.5 text-base leading-relaxed text-muted-foreground">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-diversy-primary" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col gap-3 p-5">
              <CalendarDays className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
              <h3 className={cn("font-semibold", brand.text)}>Monthly letter</h3>
              <p className={cn("text-sm leading-relaxed", brand.muted)}>
                Sponsor narrative on what changed, what is under review, and what to watch before the next live session.
              </p>
            </Card>
            <Card className="flex flex-col gap-3 p-5">
              <UsersRound className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
              <h3 className={cn("font-semibold", brand.text)}>Quarterly group session</h3>
              <p className={cn("text-sm leading-relaxed", brand.muted)}>
                Portfolio and strategy in open discussion, with time for questions from investors.
              </p>
            </Card>
            <Card className="flex flex-col gap-3 p-5">
              <CircleDollarSign className={cn("h-5 w-5 shrink-0", brand.gold)} aria-hidden />
              <h3 className={cn("font-semibold", brand.text)}>Quarterly distributions</h3>
              <p className={cn("text-sm leading-relaxed", brand.muted)}>
                Cash flows on the schedule and terms of your tier and executed documents.
              </p>
            </Card>
          </div>

          <section id="request-seat" className="mt-14 scroll-mt-24 border-t border-border pt-12">
            <SectionHeader num="03" label="Take your seat" />
            <h2 className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}>Request a conversation</h2>
            <p className={cn(body, "mt-4 max-w-prose")}>
              Accredited investors only. Submitting this form does not commit capital. After you submit, you can book a
              phone call on our scheduling flow. If scheduling is not available in this environment, we will reach out from
              your intake.
            </p>

            {doneAudience ? (
              <Card className="mt-8 max-w-lg border-diversy-primary/20 p-6">
                <p className="text-base font-medium leading-relaxed text-foreground">
                  {doneAudience === "client" ? confirmationClientScheduling : confirmation}
                </p>
              </Card>
            ) : (
              <Card className="mt-8 max-w-lg border-diversy-primary/25 p-6 sm:p-8">
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="hidden" aria-hidden>
                    <label htmlFor="premier-company">Company</label>
                    <input
                      ref={honeypotRef}
                      tabIndex={-1}
                      autoComplete="off"
                      id="premier-company"
                      name="companyWebsite"
                      type="text"
                    />
                  </div>

                  <div>
                    <label htmlFor="premier-name" className="text-xs font-medium text-muted-foreground">
                      Full name
                    </label>
                    <input
                      id="premier-name"
                      name="fullName"
                      required
                      value={fullName}
                      onChange={(ev) => setFullName(ev.target.value)}
                      className={fieldClass}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="premier-email" className="text-xs font-medium text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="premier-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      className={fieldClass}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="premier-phone" className="text-xs font-medium text-muted-foreground">
                      Phone
                    </label>
                    <input
                      id="premier-phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(ev) => setPhone(ev.target.value)}
                      className={fieldClass}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="premier-range" className="text-xs font-medium text-muted-foreground">
                      Investment range
                    </label>
                    <select
                      id="premier-range"
                      name="investmentRange"
                      required
                      value={investmentRange}
                      onChange={(ev) => setInvestmentRange(ev.target.value)}
                      className={fieldClass}
                    >
                      <option value="">Select range</option>
                      {PREMIER_INVESTMENT_RANGES.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="premier-heard" className="text-xs font-medium text-muted-foreground">
                      How did you hear about the program?
                    </label>
                    <textarea
                      id="premier-heard"
                      name="howHeard"
                      required
                      rows={3}
                      value={howHeard}
                      onChange={(ev) => setHowHeard(ev.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <EmailConsentControls
                    privacyChecked={consentEmailPrivacy}
                    onPrivacyChange={setConsentEmailPrivacy}
                    marketingChecked={consentMarketingEmail}
                    onMarketingChange={setConsentMarketingEmail}
                  />
                  <label className="flex cursor-pointer gap-3 text-sm leading-snug text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={consentTransactionalSms}
                      onChange={(ev) => setConsentTransactionalSms(ev.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/30"
                    />
                    <span>I agree to receive transactional messages at this number regarding my request.</span>
                  </label>

                  {error ? <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p> : null}

                  <Button type="submit" variant="primary" disabled={busy} showArrow={false}>
                    {busy ? "Submitting…" : "Submit request"}
                  </Button>
                </form>
              </Card>
            )}
          </section>

          {doneAudience ? (
            <section
              id="premier-book-call"
              className="mt-12 scroll-mt-24 border-t border-border pt-10"
              aria-labelledby="premier-book-call-heading"
            >
              <SectionHeader num="04" label="Book a call" />
              <h2
                id="premier-book-call-heading"
                className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", brand.text)}
              >
                Schedule with investor relations
              </h2>
              <p className={cn(body, "mt-4 max-w-prose")}>
                This is a phone conversation only (no in-person visit on this page). You will open our secure scheduling
                flow in a new tab. If you need a different format, reply to the team or use{" "}
                <Link href="/contact" className="font-medium text-diversy-primary underline underline-offset-2">
                  contact
                </Link>
                .
              </p>

              <Card className="mt-8 max-w-lg border-diversy-primary/25 p-6 sm:p-8">
                {hasCallBooking ? (
                  <Button
                    href={callHref}
                    variant="primary"
                    showArrow={false}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden />
                    Book a call
                  </Button>
                ) : (
                  <p className={cn("text-sm leading-relaxed", brand.muted)}>
                    Scheduling is not wired from this environment. We still received your intake—a member of the team will
                    reach out to coordinate.
                  </p>
                )}
              </Card>
            </section>
          ) : null}

          <div className="mt-10 rounded-xl border border-border bg-muted/20 p-5 text-xs leading-relaxed text-muted-foreground dark:bg-muted/10">
            <p>
              This page is for informational use by invited or referred accredited investors only. It does not constitute
              an offer to sell or a solicitation of an offer to buy any security. Any offer may be made only by prospectus
              or similar disclosure. Stated returns are not guaranteed; actual results will differ. Past performance does
              not predict future results.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
            <p className={cn("text-[11px] font-normal uppercase leading-relaxed tracking-[0.08em]", brand.muted)}>
              {SITE_NAME}
              <br />
              Premier Program
              <br />
              Confidential overview
            </p>
            <p
              className={cn(
                "text-[11px] font-normal uppercase leading-relaxed tracking-[0.08em] sm:text-right",
                brand.muted
              )}
            >
              Accredited investors only
              <br />
              Subject to offering documents
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
