import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const STAT_LABELS = ["Members", "Investors", "AUM"];
const STAT_KEYS = ["stat_members", "stat_investors", "stat_aum"];
const STAT_ICONS = ["/migrated/home/home-2.png", "/migrated/home/home-3.png", "/migrated/home/home-4.png"];

export default function AboutDiversy({ content = {} }) {
  const eyebrow = content.about_eyebrow ?? "ABOUT DIVERSYFUND";
  const title = content.about_title ?? "The AI-Powered Multifamily Investment Platform";
  const subtitle = content.about_subtitle ?? "We believe multifamily real estate...";
  const ctaLabel = content.about_cta_label ?? "About Us";
  const ctaUrl = content.about_cta_url ?? "/about";

  const stats = STAT_LABELS.map((label, i) => ({
    label,
    value: content[STAT_KEYS[i]] ?? (i === 2 ? "$0 M+" : "0+"),
    icon: content[`stat_${label.toLowerCase()}_icon`] || STAT_ICONS[i],
  }));

  return (
    <section id="about" className="py-16 sm:py-20">
      <Container>
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              {s.icon && (
                <img src={s.icon} alt="" aria-hidden className="h-14 w-14 object-contain" />
              )}
              <div className={cn("mt-2 text-2xl font-bold sm:text-3xl", brand.text)}>
                {s.value}
              </div>
              <div className={cn("mt-1 text-sm", brand.muted)}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={ctaUrl} variant="secondary">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
