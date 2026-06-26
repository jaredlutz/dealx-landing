import Image from "next/image";
import Link from "next/link";
import BookingBeforeCallResources from "@/components/book/BookingBeforeCallResources";
import {
  DF_INCOME_BOOKING_DOWNLOADS,
  PUBLIC_BOOKING_BEFORE_CALL_BLURB,
} from "@/lib/book/dfIncomeProductContent";
import { cn } from "@/lib/theme";

/** Shared marketing shell for `/book` and `/book/investor-call`. */
export default function PublicBookingPageShell({
  eyebrow,
  title,
  description,
  children,
  beforeCallBlurb = PUBLIC_BOOKING_BEFORE_CALL_BLURB,
  downloads = DF_INCOME_BOOKING_DOWNLOADS,
  headerMaterialsDownload = null,
}) {
  return (
    <div className="marketing-light min-h-svh bg-[#f9fafb] text-[#111827]">
      <div
        className="pointer-events-none fixed inset-0 opacity-90 [background:radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,94,224,0.08),transparent_55%)]"
        aria-hidden
      />
      <header className="relative border-b border-[#005EE0]/10 bg-[#f9fafb]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
          <Link href="https://diversyfund.com" className="opacity-90 transition hover:opacity-100">
            <Image
              src="/images/df_logo-darkmode.svg"
              alt="DiversyFund"
              width={128}
              height={28}
              className="h-7 w-auto brightness-0"
              priority
            />
          </Link>
          {headerMaterialsDownload ? (
            <a
              href={headerMaterialsDownload.href}
              download={headerMaterialsDownload.downloadFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline sm:inline"
            >
              Investor materials
            </a>
          ) : (
            <Link
              href="/incomeopportunity#reach"
              className="hidden text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline sm:inline"
            >
              Request investor deck
            </Link>
          )}
        </div>
      </header>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#005EE0]">{eyebrow}</p>
            <h1
              className={cn(
                "mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl md:text-5xl"
              )}
            >
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600">{description}</p>
            <div className="mt-8">{children}</div>
          </div>

          <aside className="mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-lg border border-[#005EE0]/20 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.06)]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#005EE0]">Before your call</h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">{beforeCallBlurb}</p>
                <div className="mt-5">
                  <BookingBeforeCallResources downloads={downloads} />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[11px] leading-relaxed text-zinc-500">
          Past performance does not guarantee future results. Private offerings involve risk of loss. Not an offer or
          solicitation—see offering documents. © {new Date().getFullYear()} DiversyFund
        </p>
      </div>
    </div>
  );
}
