"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function DfIncomeMaterialsClient({
  firstName,
  docs,
  bookCallHref,
  offeringHref,
  highlightDoc,
}) {
  const highlightRef = useRef(null);

  useEffect(() => {
    if (!highlightDoc || !highlightRef.current) return;
    highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightDoc]);

  return (
    <div className="marketing-light min-h-screen bg-[#f9fafb] text-zinc-950 antialiased">
      <header className="border-b border-zinc-200/90 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link href="https://diversyfund.com" className="opacity-95">
            <img src="/images/df_logo-darkmode.svg" alt="DiversyFund" className="h-7 w-auto brightness-0" />
          </Link>
          <a
            href={bookCallHref}
            className="rounded-full bg-[#005EE0] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0066F5]"
          >
            Book a call
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          For accredited investors · Not an offer
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          {firstName ? `${firstName}, your` : "Your"} DF Income materials
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600">
          Download the investor deck and supporting one-pagers below. Each click is logged so our team knows
          which materials you reviewed.
        </p>

        <ul className="mt-10 space-y-4">
          {docs.map((doc) => (
            <li
              key={doc.slug}
              ref={highlightDoc === doc.slug ? highlightRef : undefined}
              className={`rounded-xl border bg-white p-5 shadow-sm shadow-zinc-900/5 ${
                highlightDoc === doc.slug
                  ? "border-[#005EE0]/50 ring-2 ring-[#005EE0]/15"
                  : "border-zinc-200"
              }`}
            >
              <h2 className="text-lg font-semibold text-zinc-900">{doc.title}</h2>
              <p className="mt-1 text-sm text-zinc-600">{doc.line}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={doc.downloadHref}
                  className="inline-flex rounded-full bg-[#005EE0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0066F5]"
                >
                  Download PDF
                </a>
                {doc.lpPath ? (
                  <Link
                    href={doc.lpPath}
                    className="inline-flex rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                  >
                    Read online
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-xl border border-[#005EE0]/20 bg-[#005EE0]/5 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Next step</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Review the offering on diversyfund.com or book a private call with our team.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={bookCallHref}
              className="inline-flex rounded-full bg-[#005EE0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0066F5]"
            >
              Book a private call
            </a>
            <a
              href={offeringHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              View offering
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-zinc-500">
          Investing involves risk, including the possible loss of principal. Stated rates are objectives,
          not guarantees. For accredited investors under Regulation D, Rule 506(c) only.
        </p>
      </main>
    </div>
  );
}
