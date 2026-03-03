"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  CalendarClock,
  ArrowRight,
  Lock,
  Building2,
  Layers,
  LineChart,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";

/**
 * DiversyFund — Hybrid BlackRock x Cardone (Institutional Dominance)
 * Single-file, responsive prototype (Tailwind)
 * Pages: Home, Opportunities, How It Works, Security & Governance, About, Resources, Investor Relations, Login
 *
 * Notes:
 * - Replace placeholder numbers/terms with live values once compliance approves.
 * - Replace imagery blocks with licensed photography or owned asset imagery.
 */

const brand = {
  bg: "bg-[#060B12]",
  panel: "bg-white/5",
  panel2: "bg-white/3",
  border: "border-white/10",
  text: "text-white/90",
  muted: "text-white/60",
  subtle: "text-white/45",
  gold: "text-[#B79C57]",
};

const nav = [
  { id: "home", label: "Home" },
  { id: "opps", label: "Opportunities" },
  { id: "how", label: "How It Works" },
  { id: "gov", label: "Security & Governance" },
  { id: "about", label: "About" },
  { id: "resources", label: "Resources" },
  { id: "ir", label: "Investor Relations" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children, className }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs",
        brand.muted
      )}
    >
      {children}
    </span>
  );
}

function Button({ children, variant = "primary", href = "#", onClick }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/25";
  const styles =
    variant === "primary"
      ? "bg-white text-[#060B12] hover:bg-white/90"
      : variant === "secondary"
        ? "border border-white/15 bg-transparent text-white hover:bg-white/5"
        : "bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90";

  return (
    <a href={href} onClick={onClick} className={cn(base, styles)}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className={cn("mb-3 text-xs tracking-[0.18em] uppercase", brand.subtle)}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-3 text-base leading-relaxed", brand.muted)}>{subtitle}</p>
      ) : null}
    </div>
  );
}

function Divider() {
  return <div className="my-14 h-px w-full bg-white/10" />;
}

function TopNav({ active, setActive }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#060B12]/85 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <a
          href="#home"
          onClick={() => setActive("home")}
          className="flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-xl bg-white text-[#060B12] grid place-items-center font-black">
            DF
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">DiversyFund</div>
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
                "rounded-lg px-3 py-2 text-sm transition",
                active === n.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#login"
            onClick={() => setActive("login")}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
          >
            <Lock className="h-4 w-4" />
            Log In
          </a>
          <Button href="#ir" onClick={() => setActive("ir")}>Access Opportunities</Button>
        </div>
      </Container>
    </div>
  );
}

function Hero({ setActive }) {
  return (
    <section id="home" className="pt-14 sm:pt-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Badge>
              <Shield className="h-4 w-4" />
              Security-first structuring • Defined duration • Quarterly cadence
            </Badge>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white"
            >
              Income. Structure. Control.
            </motion.h1>

            <p className={cn("mt-5 text-lg leading-relaxed", brand.muted)}>
              Private-market fixed income engineered with institutional discipline and operator-level execution.
              Defined terms. Documented protections. A platform built for serious capital.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href="#ir" onClick={() => setActive("ir")}>Access Opportunities</Button>
              <Button
                variant="secondary"
                href="#gov"
                onClick={() => setActive("gov")}
              >
                Review Our Framework
              </Button>
            </div>

            <div className={cn("mt-6 text-sm", brand.subtle)}>
              Cycle-tested leadership since the 1990s • Process-driven governance • No yield marketing
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Card>
                <div className="flex items-start gap-3">
                  <CalendarClock className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Quarterly cadence</div>
                    <div className={cn("text-sm mt-1", brand.subtle)}>Defined schedule and reporting rhythm.</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <FileText className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Documentation-first</div>
                    <div className={cn("text-sm mt-1", brand.subtle)}>Terms disclosed before subscription.</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <Shield className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Security-focused</div>
                    <div className={cn("text-sm mt-1", brand.subtle)}>Downside-aware structuring.</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className={cn("text-xs tracking-[0.18em] uppercase", brand.subtle)}>
                Allocation Profile
              </div>
              <div className="mt-3 text-white text-xl font-semibold">Designed for $100K–$1M allocators</div>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                If you allocate meaningful capital and expect defined terms, disciplined operations, and professional reporting—this
                platform is built for you.
              </p>

              <div className="mt-6 grid gap-3">
                {["Defined duration", "Quarterly income cadence", "Risk disclosure and documentation", "Platform-based access & reporting"].map(
                  (t) => (
                    <div key={t} className="flex items-center gap-3">
                      <CheckCircle2 className={cn("h-5 w-5", brand.gold)} />
                      <div className={cn("text-sm", brand.text)}>{t}</div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Button href="#ir" onClick={() => setActive("ir")}>Begin Eligibility Review</Button>
                <a
                  href="#resources"
                  onClick={() => setActive("resources")}
                  className={cn("text-sm hover:text-white transition", brand.muted)}
                >
                  Learn the basics of private-market fixed income →
                </a>
              </div>

              <div className={cn("mt-6 text-xs", brand.subtle)}>
                Investing involves risk, including loss of principal.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Positioning() {
  return (
    <section className="pt-14">
      <Container>
        <SectionTitle
          eyebrow="Positioning"
          title="Private markets without amateur structuring"
          subtitle="Most private investments are sold. Few are engineered. DiversyFund is built for investors who value structure, process, and execution over stories."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex items-start gap-3">
              <Layers className={cn("h-5 w-5", brand.gold)} />
              <div>
                <div className="text-white font-semibold">Structure before scale</div>
                <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                  Defined maturity mechanics, clear income cadence, and disclosed terms prior to subscription.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <LineChart className={cn("h-5 w-5", brand.gold)} />
              <div>
                <div className="text-white font-semibold">Execution is the brand</div>
                <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
                  Professional reporting rhythm and operational consistency—built to perform through cycles.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-6">
          <div className="text-white font-semibold text-lg">Capital demands discipline.</div>
          <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
            You're not here for excitement. You're here for clarity, downside awareness, and defined outcomes.
            That's what this platform is built to deliver.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Structures() {
  const items = [
    {
      icon: Building2,
      title: "Single-Asset Secured",
      desc: "Defined collateral. Defined exposure. Structured documentation before subscription.",
    },
    {
      icon: FileText,
      title: "Instrument-Based Secured",
      desc: "Contractual protections structured up front with clarity on mechanics and terms.",
    },
    {
      icon: Layers,
      title: "Multi-Asset Secured",
      desc: "Income supported across multiple real assets under a defined framework.",
    },
  ];

  return (
    <section className="pt-14">
      <Container>
        <SectionTitle
          eyebrow="Framework"
          title="Three fixed-income structures"
          subtitle="Different structures. One standard: disciplined terms, documentation, and execution."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title}>
              <div className="flex items-start gap-3">
                <it.icon className={cn("h-5 w-5", brand.gold)} />
                <div>
                  <div className="text-white font-semibold">{it.title}</div>
                  <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>{it.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={cn("mt-6 text-sm", brand.subtle)}>
          Each opportunity includes defined duration, income cadence, and risk disclosures.
        </div>
      </Container>
    </section>
  );
}

function Opportunities({ setActive }) {
  const opps = [
    {
      title: "Structured Income Opportunity",
      meta: ["Structure: Single-Asset Secured", "Cadence: Quarterly", "Term: Defined"],
      note: "Documentation available upon eligibility confirmation.",
    },
    {
      title: "Private Market Income Opportunity",
      meta: ["Structure: Instrument-Based Secured", "Cadence: Quarterly", "Term: Defined"],
      note: "Security and risk summary disclosed pre-subscription.",
    },
    {
      title: "Diversified Collateral Income Opportunity",
      meta: ["Structure: Multi-Asset Secured", "Cadence: Quarterly", "Term: Defined"],
      note: "Operational reporting rhythm provided quarterly.",
    },
  ];

  return (
    <section id="opps" className="pt-16">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionTitle
            eyebrow="Opportunities"
            title="Current structured income opportunities"
            subtitle="Defined duration. Quarterly cadence. Documented structure."
          />
          <Button href="#ir" onClick={() => setActive("ir")}>Access Documentation</Button>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {opps.map((o) => (
            <Card key={o.title}>
              <div className="text-white font-semibold">{o.title}</div>
              <div className={cn("mt-2 text-sm", brand.muted)}>
                {o.meta.map((m) => (
                  <div key={m} className="mt-1">• {m}</div>
                ))}
              </div>
              <div className={cn("mt-3 text-xs", brand.subtle)}>{o.note}</div>
              <div className="mt-5">
                <a
                  href="#ir"
                  onClick={() => setActive("ir")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80"
                >
                  Review Documentation <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className={cn("mt-6 text-xs", brand.subtle)}>
          Offering availability and details may vary by eligibility and jurisdiction.
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: CheckCircle2,
      title: "1) Eligibility review",
      desc: "Confirm investor profile and access requirements.",
    },
    {
      icon: Lock,
      title: "2) Verification & compliance",
      desc: "KYC/AML verification and platform onboarding.",
    },
    {
      icon: FileText,
      title: "3) Documentation access",
      desc: "Review defined terms, cadence, and risk disclosures.",
    },
    {
      icon: CalendarClock,
      title: "4) Subscription execution",
      desc: "Structured subscription flow with defined mechanics.",
    },
    {
      icon: LineChart,
      title: "5) Quarterly cycle",
      desc: "Reporting cadence aligned with distributions and transparency.",
    },
    {
      icon: Shield,
      title: "6) Defined maturity event",
      desc: "Term completion mechanics disclosed up front.",
    },
  ];

  return (
    <section id="how" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Process"
          title="A defined capital process"
          subtitle="No ambiguity. No moving goalposts. Private markets require clarity—and a professional operational rhythm."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.title}>
              <div className="flex items-start gap-3">
                <s.icon className={cn("h-5 w-5", brand.gold)} />
                <div>
                  <div className="text-white font-semibold">{s.title}</div>
                  <p className={cn("mt-2 text-sm", brand.muted)}>{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Governance() {
  const blocks = [
    {
      icon: Shield,
      title: "Underwriting discipline",
      points: [
        "Asset fundamentals review",
        "Duration alignment and maturity design",
        "Downside considerations and structural protections",
      ],
    },
    {
      icon: FileText,
      title: "Documentation standards",
      points: [
        "Offering documents and subscription agreements",
        "Defined payment schedules and maturity mechanics",
        "Risk disclosures and investor communications",
      ],
    },
    {
      icon: CalendarClock,
      title: "Reporting cadence",
      points: [
        "Quarterly reporting rhythm",
        "Distribution tracking and platform access",
        "Structured updates designed to reduce ambiguity",
      ],
    },
  ];

  return (
    <section id="gov" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Security & Governance"
          title="Governance. Structure. Discipline."
          subtitle="Security-first means documentation-first. Serious capital expects disclosed terms, defined mechanics, and consistent reporting."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {blocks.map((b) => (
            <Card key={b.title}>
              <div className="flex items-start gap-3">
                <b.icon className={cn("h-5 w-5", brand.gold)} />
                <div>
                  <div className="text-white font-semibold">{b.title}</div>
                  <div className={cn("mt-3 text-sm", brand.muted)}>
                    {b.points.map((p) => (
                      <div key={p} className="mt-1">• {p}</div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={cn("mt-8 rounded-2xl border border-white/10 bg-white/4 p-6", "max-w-4xl")}
        >
          <div className="text-white font-semibold">Risk statement</div>
          <p className={cn("mt-2 text-sm leading-relaxed", brand.muted)}>
            Investing involves risk, including loss of principal. Private-market investments may be illiquid. Terms, cadence,
            and maturity mechanics are defined by each offering's documentation.
          </p>
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="About"
          title="Institutional discipline. Operator execution."
          subtitle="DiversyFund is built for disciplined private-market income structures. We do not chase trends—we design frameworks and execute them through cycles."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card>
              <div className="text-white font-semibold text-lg">Cycle-tested leadership</div>
              <p className={cn("mt-3 text-sm leading-relaxed", brand.muted)}>
                Craig Cecilio began structuring income-focused real estate vehicles in the late 1990s. That multi-cycle
                experience informs how DiversyFund approaches risk, duration design, documentation, and execution cadence.
              </p>
              <div className={cn("mt-4 text-sm", brand.muted)}>
                • Markets fluctuate. Discipline compounds.
                <br />• Private markets reward structure over optimism.
              </div>
            </Card>
          </div>
          <div className="lg:col-span-5">
            <Card>
              <div className="text-white font-semibold text-lg">What we are not</div>
              <div className={cn("mt-3 text-sm", brand.muted)}>
                <div className="mt-1">• Not retail speculation</div>
                <div className="mt-1">• Not "yield marketing"</div>
                <div className="mt-1">• Not trend-driven finance</div>
              </div>
              <div className={cn("mt-5 text-sm", brand.muted)}>
                We are structured private-market income—designed for capital that expects standards.
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Resources() {
  const articles = [
    {
      title: "Private-market fixed income vs. equity",
      desc: "How duration, distributions, and risk differ in private markets.",
    },
    {
      title: "How quarterly income structures work",
      desc: "What cadence means, how reporting aligns, and what to look for.",
    },
    {
      title: "Defined terms and maturity mechanics",
      desc: "Why terms matter and how maturity is documented.",
    },
    {
      title: "Security-first: collateral and documentation",
      desc: "What protections may exist and how to evaluate the framework.",
    },
    {
      title: "How to evaluate private-market opportunities responsibly",
      desc: "A disciplined checklist for serious allocators.",
    },
  ];

  return (
    <section id="resources" className="pt-16">
      <Container>
        <SectionTitle
          eyebrow="Resources"
          title="Education for disciplined allocation"
          subtitle="Clear, direct explanations built for investors who want to understand structure—not marketing."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <Card key={a.title}>
              <div className="text-white font-semibold">{a.title}</div>
              <p className={cn("mt-2 text-sm", brand.muted)}>{a.desc}</p>
              <div className="mt-4">
                <a className="text-sm font-semibold text-white hover:text-white/80" href="#">
                  Read →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function InvestorRelations() {
  return (
    <section id="ir" className="pt-16 pb-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Investor Relations"
              title="Access opportunities"
              subtitle="Eligibility review is required to access full offering documentation. If you allocate meaningful capital and want defined terms, start here."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Eligibility</div>
                    <p className={cn("mt-2 text-sm", brand.muted)}>
                      Confirm investor profile and access requirements to view documentation.
                    </p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-3">
                  <Lock className={cn("h-5 w-5", brand.gold)} />
                  <div>
                    <div className="text-white font-semibold">Verification</div>
                    <p className={cn("mt-2 text-sm", brand.muted)}>
                      Compliance verification (KYC/AML) may be required based on jurisdiction and offering.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-6">
              <div className="text-white font-semibold">Contact</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className={cn("h-4 w-4", brand.gold)} />
                  <div>
                    <div className={cn("text-sm", brand.text)}>investorsupport@diversyfund.com</div>
                    <div className={cn("text-xs", brand.subtle)}>Investor support</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className={cn("h-4 w-4", brand.gold)} />
                  <div>
                    <div className={cn("text-sm", brand.text)}>(###) ###-####</div>
                    <div className={cn("text-xs", brand.subtle)}>Replace with IR line</div>
                  </div>
                </div>
              </div>
              <div className={cn("mt-5 text-xs", brand.subtle)}>
                This website is for informational purposes and does not constitute an offer to sell or a solicitation to buy securities.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6">
              <div className="text-white font-semibold text-lg">Eligibility form (prototype)</div>
              <p className={cn("mt-2 text-sm", brand.muted)}>
                Replace this with your real onboarding form (Typeform, internal KYC, or platform-native flow).
              </p>

              <div className="mt-5 grid gap-3">
                <label className={cn("text-xs", brand.subtle)}>
                  Full name
                  <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30" placeholder="Jane Investor" />
                </label>
                <label className={cn("text-xs", brand.subtle)}>
                  Email
                  <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30" placeholder="jane@domain.com" />
                </label>
                <label className={cn("text-xs", brand.subtle)}>
                  Typical allocation range
                  <select className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                    <option>$100K–$250K</option>
                    <option>$250K–$500K</option>
                    <option>$500K–$1M</option>
                    <option>$1M+</option>
                  </select>
                </label>
                <label className={cn("text-xs", brand.subtle)}>
                  Timing
                  <select className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                    <option>2–4 weeks</option>
                    <option>30–60 days</option>
                    <option>60–90 days</option>
                    <option>90+ days</option>
                  </select>
                </label>
              </div>

              <div className="mt-5">
                <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#060B12] hover:bg-white/90">
                  Request Access
                </button>
                <div className={cn("mt-3 text-xs", brand.subtle)}>
                  Submitting this form does not create an offer or commitment.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Login() {
  return (
    <section id="login" className="pt-16 pb-20">
      <Container>
        <div className="max-w-lg">
          <SectionTitle
            eyebrow="Portal"
            title="Log in"
            subtitle="Access your dashboard, documents, and reporting."
          />
          <Card className="mt-8 p-6">
            <div className="grid gap-3">
              <label className={cn("text-xs", brand.subtle)}>
                Email
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30" placeholder="you@domain.com" />
              </label>
              <label className={cn("text-xs", brand.subtle)}>
                Password
                <input type="password" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30" placeholder="••••••••" />
              </label>
            </div>
            <button className="mt-5 w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#060B12] hover:bg-white/90">
              Continue
            </button>
            <div className={cn("mt-4 text-xs", brand.subtle)}>
              Need help? Email investorsupport@diversyfund.com
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-white font-semibold">DiversyFund</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              Institutional fixed income platform for disciplined private-market allocation.
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Company</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <div className="mt-1">Disclosures</div>
              <div className="mt-1">Privacy</div>
              <div className="mt-1">Terms</div>
              <div className="mt-1">AML/KYC</div>
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Support</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <div className="mt-1">investorsupport@diversyfund.com</div>
              <div className={cn("mt-3 text-xs", brand.subtle)}>
                Investing involves risk, including potential loss of principal. This website is for informational purposes and does not constitute an offer to sell or a solicitation to buy securities.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function LandingPage() {
  const [active, setActive] = React.useState("home");

  return (
    <div className={cn("min-h-screen", brand.bg, "text-white")}>
      <TopNav active={active} setActive={setActive} />

      <main>
        <Hero setActive={setActive} />
        <Positioning />
        <Structures />
        <Divider />
        <Opportunities setActive={setActive} />
        <HowItWorks />
        <Governance />
        <About />
        <Resources />
        <InvestorRelations />
        <Login />
      </main>

      <Footer />
    </div>
  );
}
