import Container from "@/components/ui/Container";
import MainSiteChrome from "@/components/layout/MainSiteChrome";
import LegalHtmlBody from "@/components/legal/LegalHtmlBody";
import { brand, cn } from "@/lib/theme";

export default function LegalDocumentPage({ title, html }) {
  return (
    <MainSiteChrome>
      <Container className="pb-10 pt-8 sm:pb-14 sm:pt-12">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight sm:text-4xl",
            brand.text
          )}
        >
          {title}
        </h1>
        <div className="mt-8 border-t border-border pt-8">
          <LegalHtmlBody html={html} />
        </div>
      </Container>
    </MainSiteChrome>
  );
}
