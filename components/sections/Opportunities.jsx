import Image from "next/image";
import InvestCtaButton from "@/components/investment/InvestCtaButton";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Opportunities() {
  return (
    <section
      id="opps"
      className={cn(
        "relative my-10 overflow-hidden rounded-2xl border border-border bg-card py-16 text-card-foreground sm:my-12 sm:py-20 lg:my-14",
        "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-diversy-primary"
        aria-hidden
      />
      <Container className="relative z-[1]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-stretch">
          <div className="flex flex-col justify-center lg:col-span-7">
            <SectionTitle
              eyebrow="Opportunities"
              title="Current structured income opportunities"
              subtitle="Backed by multifamily real estate. Terms and ranges disclosed per offering."
              titleSize="large"
            />
            <div className={cn("mt-6 text-xs lg:max-w-xl", brand.subtle)}>
              Offering availability and details may vary by eligibility and jurisdiction.
            </div>
            <div className="mt-8 w-fit">
              <InvestCtaButton source="opportunities">Review Current Opportunities</InvestCtaButton>
            </div>
          </div>

          <figure
            className={cn(
              "relative min-h-[14rem] overflow-hidden rounded-2xl border border-border sm:min-h-[18rem] lg:col-span-5 lg:min-h-[min(22rem,55vh)]"
            )}
          >
            <Image
              src="/migrated/home/home-13.jpg"
              alt="Institutional multifamily asset in a prime coastal market"
              fill
              quality={86}
              className="object-cover object-[center_32%]"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent dark:from-black/40 dark:via-black/12"
              aria-hidden
            />
            <figcaption
              className={cn(
                "absolute inset-x-0 bottom-0 border-t border-white/10 bg-black px-4 py-3 sm:px-5 sm:py-3.5",
                "text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-left"
              )}
            >
              Scale • Discipline • Execution
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
