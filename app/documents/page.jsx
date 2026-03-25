import { Download, ExternalLink, FileText } from "lucide-react";
import MainSiteChrome from "@/components/layout/MainSiteChrome";
import Container from "@/components/ui/Container";
import { siteDocuments } from "@/lib/site-documents";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

export const metadata = publicPageMetadata({
  title: "Documents",
  description:
    "View and download DiversyFund offering documents, disclosures, and legal materials referenced on this site.",
  path: "/documents",
});

export default function DocumentsPage() {
  return (
    <MainSiteChrome>
      <Container className="pb-10 pt-8 sm:pb-14 sm:pt-12">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight sm:text-4xl",
            brand.text
          )}
        >
          Documents
        </h1>
        <p className={cn("mt-3 max-w-2xl text-sm sm:text-base", brand.muted)}>
          View or download the documents below. Files open in a new tab; use
          Download to save a copy to your device.
        </p>

        <ul
          className={cn(
            "mt-8 border-t border-border",
            "[&>li+li]:border-t [&>li+li]:border-border"
          )}
        >
          {siteDocuments.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="flex gap-3 min-w-0">
                <FileText
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0 text-diversy-primary"
                  )}
                  aria-hidden
                />
                <div className="min-w-0">
                  <div className={cn("font-medium", brand.text)}>{doc.title}</div>
                  <p className={cn("mt-1 text-sm", brand.muted)}>
                    {doc.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:pt-0.5">
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-3 py-2 text-sm font-medium transition",
                    "text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
                  )}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View
                </a>
                <a
                  href={doc.href}
                  download
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg bg-diversy-primary px-3 py-2 text-sm font-semibold text-white transition",
                    "hover:bg-diversy-primary-hover focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
                  )}
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </MainSiteChrome>
  );
}
