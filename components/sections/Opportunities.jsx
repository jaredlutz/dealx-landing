import { getSignUpUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function Opportunities() {
  return (
    <section
      id="opps"
      className={cn(
        "relative my-16 overflow-hidden rounded-2xl border py-16 sm:py-20",
        brand.border,
        "bg-white dark:bg-[#0F1114]",
        "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-diversy-primary"
        aria-hidden
      />
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionTitle
            eyebrow="Opportunities"
            title="Current structured income opportunities"
            subtitle="Backed by multifamily real estate. Terms and ranges disclosed per offering."
            titleSize="large"
          />
          <Button href={getSignUpUrl()}>Review Current Opportunities</Button>
        </div>

        <div className={cn("mt-6 text-xs", brand.subtle)}>
          Offering availability and details may vary by eligibility and jurisdiction.
        </div>
      </Container>
    </section>
  );
}
