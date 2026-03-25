import { cn } from "@/lib/theme";
import { brand } from "@/lib/theme";

export default function SectionTitle({ eyebrow, title, subtitle, titleSize = "default" }) {
  const titleClass =
    titleSize === "large"
      ? "text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground"
      : "text-2xl sm:text-3xl font-semibold text-foreground";

  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-blue-700 dark:text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}
      <h2 className={titleClass}>{title}</h2>
      {subtitle ? (
        <p className={cn("mt-3 text-base leading-relaxed", brand.muted)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
