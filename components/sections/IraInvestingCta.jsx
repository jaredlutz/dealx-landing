"use client";

import Link from "next/link";
import { CheckCircle2, Download, FileText } from "lucide-react";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import Container from "@/components/ui/Container";
import { brand, cn } from "@/lib/theme";
import {
  IRA_GUIDE_DOWNLOAD_FILENAME,
  IRA_GUIDE_PDF_PATH,
  IRA_GUIDE_SOURCE,
  IRA_GUIDE_TITLE,
} from "@/lib/ira-guide";

const BENEFITS = [
  "Hold private real-estate income inside a self-directed IRA",
  "Tax-deferred growth — gains compound until withdrawal",
  "Custodian mechanics, funding paths, and eligibility explained",
  "Questions to bring to your CPA or financial advisor",
];

const successAction = {
  kind: "download",
  href: IRA_GUIDE_PDF_PATH,
  filename: IRA_GUIDE_DOWNLOAD_FILENAME,
  title: IRA_GUIDE_TITLE,
  description:
    "Tell us where to send the guide and we'll unlock the PDF immediately. We'll also email a copy for later.",
  eyebrow: "IRA Investing Guide",
};

export default function IraInvestingCta() {
  return (
    <section
      id="ira-guide"
      className={cn(
        "relative my-10 overflow-hidden rounded-2xl border border-border bg-card py-14 text-card-foreground sm:my-12 sm:py-16 lg:my-14",
        "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
      )}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-diversy-primary"
        aria-hidden
      />
      <Container className="relative z-[1]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className={cn("text-xs font-semibold uppercase tracking-[0.18em]", "text-diversy-primary")}>
              Retirement allocations
            </div>
            <h2
              className={cn(
                "mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
                brand.text
              )}
            >
              Invest with your IRA.
            </h2>
            <p className={cn("mt-4 max-w-xl text-base leading-relaxed sm:text-lg", brand.muted)}>
              Download our guide on holding private real-estate income inside a self-directed IRA — custodian
              mechanics, funding paths, and the considerations that decide whether the structure fits the
              capital.
            </p>

            <ul className="mt-6 space-y-2.5">
              {BENEFITS.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", brand.gold)} aria-hidden />
                  <span className={cn("text-sm leading-relaxed sm:text-[15px]", brand.text)}>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <InvestCtaButton
                source={IRA_GUIDE_SOURCE}
                successAction={successAction}
                showArrow={false}
              >
                <Download className="h-4 w-4" aria-hidden />
                Download the IRA Investing Guide
              </InvestCtaButton>
              <Link
                href="/insights-education/ira"
                className={cn(
                  "text-sm font-semibold text-diversy-primary underline-offset-4 hover:underline",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-sm"
                )}
              >
                Read the framework first
              </Link>
            </div>

            <p className={cn("mt-5 text-xs leading-relaxed", brand.subtle)}>
              Educational only. Not investment, tax, or legal advice. Always consult qualified professionals.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div
              className={cn(
                "relative mx-auto flex aspect-[3/4] w-full max-w-xs flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-md sm:max-w-sm",
                "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_120%_70%_at_20%_-10%,rgba(0,94,224,0.12),transparent_60%)]",
                "dark:before:bg-[radial-gradient(ellipse_120%_70%_at_20%_-10%,rgba(0,94,224,0.24),transparent_60%)]"
              )}
              aria-hidden
            >
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-diversy-primary">
                  <FileText className="h-3 w-3" />
                  PDF Guide
                </div>
                <p className={cn("mt-6 text-xs font-semibold uppercase tracking-[0.18em]", brand.subtle)}>
                  DiversyFund
                </p>
                <p className={cn("mt-2 text-xl font-semibold leading-tight tracking-tight", brand.text)}>
                  Investing with an IRA
                </p>
                <p className={cn("mt-3 text-xs leading-relaxed", brand.muted)}>
                  Custodial mechanics, eligibility, and the funding path explained.
                </p>
              </div>
              <div className="relative space-y-1.5">
                <div className="h-1 w-3/4 rounded-full bg-border" />
                <div className="h-1 w-5/6 rounded-full bg-border/70" />
                <div className="h-1 w-2/3 rounded-full bg-border/60" />
                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium text-diversy-primary">
                  <Download className="h-3 w-3" />
                  Free download
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
