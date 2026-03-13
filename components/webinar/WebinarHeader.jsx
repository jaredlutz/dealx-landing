"use client";

import Link from "next/link";
import { cn } from "@/lib/theme";
import { getSignInUrl } from "@/lib/portal";
import Container from "@/components/ui/Container";

export default function WebinarHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur"
      )}
    >
      <Container className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          <img
            src="/images/diversyfund-logo.svg"
            alt="DiversyFund"
            className="h-8 w-auto"
          />
        </Link>

        <div className="order-2 flex shrink-0 items-center justify-end">
          <a
            href={getSignInUrl()}
            className={cn(
              "rounded-xl bg-diversy-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-diversy-primary-hover",
              "focus:outline-none focus:ring-2 focus:ring-diversy-primary/50"
            )}
          >
            Log In
          </a>
        </div>
      </Container>
    </header>
  );
}
