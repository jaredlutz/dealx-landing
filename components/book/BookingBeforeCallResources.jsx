import { ChevronRight, FileDown } from "lucide-react";
import { DF_INCOME_BOOKING_DOWNLOADS } from "@/lib/book/dfIncomeProductContent";
import { cn } from "@/lib/theme";

function ResourceRow({ item }) {
  return (
    <a
      href={item.href}
      download={item.downloadFilename}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-start gap-2 rounded-lg border border-[#005EE0]/20 bg-[#005EE0]/[0.04] p-3 transition hover:border-[#005EE0]/35 hover:bg-[#005EE0]/[0.07]"
      )}
    >
      <FileDown className="mt-0.5 size-4 shrink-0 text-[#005EE0]/70 transition group-hover:text-[#005EE0]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#111827]">{item.title}</p>
        <p className="mt-0.5 text-xs text-[#4b5563]">{item.line}</p>
      </div>
      <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#005EE0]/30 transition group-hover:text-[#005EE0]" />
    </a>
  );
}

/** Sidebar list — `/book`, `/book/investor-call`. */
export default function BookingBeforeCallResources({ className, downloads = DF_INCOME_BOOKING_DOWNLOADS }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {downloads.map((item) => (
        <li key={item.href}>
          <ResourceRow item={item} />
        </li>
      ))}
    </ul>
  );
}
