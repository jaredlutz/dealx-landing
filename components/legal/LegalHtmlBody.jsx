import { cn } from "@/lib/theme";

const legalBodyClass = cn(
  "max-w-3xl",
  "text-[15px] sm:text-base leading-relaxed text-muted-foreground",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:italic",
  "[&_p]:mb-4",
  "[&_a]:text-diversy-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-opacity hover:[&_a]:opacity-90",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2",
  "[&_li>p]:mb-0 [&_li]:text-muted-foreground",
  "[&_hr]:my-8 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border",
  "[&_.elementor]:contents [&_.e-con-inner]:contents",
  "[&_.elementor-element]:contents [&_.elementor-widget]:contents"
);

export default function LegalHtmlBody({ html }) {
  return (
    <div
      className={legalBodyClass}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
