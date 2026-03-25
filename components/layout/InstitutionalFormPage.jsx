import Container from "@/components/ui/Container";
import { brand, cn } from "@/lib/theme";

/**
 * Shared shell for /contact and /support: radial washes, fine grid, two-column layout, form in a lifted panel.
 */
export default function InstitutionalFormPage({
  eyebrow,
  title,
  description,
  /** Main content under the description (callouts, office cards, etc.) */
  lead,
  /** Small icon rows — { icon: LucideIcon, title: string, text: string }[] */
  highlights = [],
  /** Form client (or fragment) */
  form,
  /** Heading above the form panel */
  formSectionTitle = "Send a message",
  formSectionSubtitle,
  /** Tailwind col-span classes at lg (must total 12 with formColumnClass) */
  leadColumnClass = "lg:col-span-5",
  formColumnClass = "lg:col-span-7",
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "relative overflow-hidden border-b border-border/70",
          "pb-12 pt-8 sm:pb-16 sm:pt-12"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-diversy-primary/[0.07] via-transparent to-transparent dark:from-diversy-primary/[0.12]"
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-20",
            "bg-[radial-gradient(ellipse_95%_55%_at_100%_-5%,rgba(0,94,224,0.11),transparent_58%)]",
            "dark:bg-[radial-gradient(ellipse_90%_50%_at_100%_0%,rgba(0,94,224,0.2),transparent_52%)]"
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-20 opacity-[0.45] dark:opacity-[0.55]",
            "[background-image:linear-gradient(to_right,rgba(0,94,224,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,94,224,0.06)_1px,transparent_1px)]",
            "[background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
          )}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-1/2 -z-20 h-72 w-72 -translate-y-1/2 rounded-full bg-diversy-primary/[0.06] blur-3xl dark:bg-diversy-primary/10"
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-14 lg:items-start">
            <div className={cn("min-w-0", leadColumnClass)}>
              {eyebrow}
              <h1
                className={cn(
                  "text-3xl font-semibold tracking-tight sm:text-4xl",
                  brand.text,
                  eyebrow ? "mt-2" : "mt-0"
                )}
              >
                {title}
              </h1>
              {description != null && description !== "" ? (
                typeof description === "string" ? (
                  <p className={cn("mt-4 text-base leading-relaxed", brand.muted)}>{description}</p>
                ) : (
                  <div className={cn("mt-4 space-y-3 text-base leading-relaxed", brand.muted)}>
                    {description}
                  </div>
                )
              ) : null}

              {lead}

              {highlights.length > 0 && (
                <ul className="mt-10 space-y-5">
                  {highlights.map(({ icon: Icon, title: t, text }) => (
                    <li key={t} className="flex min-w-0 gap-3.5">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          "border border-diversy-primary/20 bg-diversy-primary/[0.06] text-diversy-primary",
                          "dark:border-diversy-primary/30 dark:bg-diversy-primary/10"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-semibold", brand.text)}>{t}</p>
                        <div
                          className={cn(
                            "mt-0.5 text-sm leading-relaxed [overflow-wrap:anywhere]",
                            brand.muted
                          )}
                        >
                          {text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={cn("min-w-0", formColumnClass)}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border/90",
                  "bg-card/90 p-6 shadow-[0_24px_60px_-24px_rgba(0,94,224,0.18)] backdrop-blur-sm",
                  "dark:border-border dark:bg-card/80 dark:shadow-[0_28px_70px_-28px_rgba(0,94,224,0.25)]"
                )}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-diversy-primary/[0.08] blur-2xl dark:bg-diversy-primary/15"
                  aria-hidden
                />
                <div className="relative">
                  <div className="border-b border-border/80 pb-5">
                    <h2 className={cn("text-lg font-semibold tracking-tight", brand.text)}>{formSectionTitle}</h2>
                    {formSectionSubtitle ? (
                      <p className={cn("mt-1.5 text-sm leading-relaxed", brand.muted)}>{formSectionSubtitle}</p>
                    ) : null}
                  </div>
                  <div className="pt-6">{form}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
