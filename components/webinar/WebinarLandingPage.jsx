"use client";

import React from "react";
import { getSignInUrl } from "@/lib/portal";
import WebinarHeader from "./WebinarHeader";
import WebinarHero from "./WebinarHero";
import WebinarValueProps from "./WebinarValueProps";
import WebinarPositioning from "./WebinarPositioning";
import WebinarTestimonials from "./WebinarTestimonials";
import Container from "@/components/ui/Container";

export default function WebinarLandingPage() {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <WebinarHeader />
      <main>
        <WebinarHero />
        <WebinarValueProps />
        <WebinarPositioning />
        <WebinarTestimonials />
        <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-md text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Access Your Account
              </h2>
              <p className="mt-2 text-gray-600">
                Log in to the DiversyFund platform to manage your investments.
              </p>
              <a
                href={getSignInUrl()}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-diversy-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-diversy-primary-hover focus:outline-none focus:ring-2 focus:ring-diversy-primary/50"
              >
                Log In
              </a>
            </div>
          </Container>
        </section>
      </main>
      <footer className="border-t border-gray-200 bg-white py-8">
        <Container>
          <p className="text-center text-sm text-gray-500">
            © 2026 DiversyFund. All Rights Reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
