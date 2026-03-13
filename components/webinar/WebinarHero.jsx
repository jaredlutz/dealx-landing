"use client";

import Container from "@/components/ui/Container";
import { getSignInUrl } from "@/lib/portal";

export default function WebinarHero() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Double Digit Returns{" "}
            <span className="text-diversy-primary">Driven by Fixed Income,</span>{" "}
            Not Hype.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            A briefing for serious investors on the discipline of private-market
            fixed income—designed for consistent quarterly cash flow, professional
            execution, and the institutional platform that powers it.
          </p>
          <a
            href={getSignInUrl()}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-diversy-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-diversy-primary-hover focus:outline-none focus:ring-2 focus:ring-diversy-primary/50"
          >
            Log In
          </a>
          <p className="mt-6 text-sm text-gray-500">
            Trusted by serious capital for quarterly income and professional
            execution.
          </p>
        </div>
      </Container>
    </section>
  );
}
