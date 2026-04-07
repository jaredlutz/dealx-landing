import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { loadLegalFragment } from "@/lib/legal/loadLegalFragment";
import { publicPageMetadata } from "@/lib/site-seo";

export const metadata = publicPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing use of the DiversyFund website and related online services, including eligibility, acceptable use, and disclaimers.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  const html = loadLegalFragment("terms");
  return <LegalDocumentPage title="Terms of Service" html={html} />;
}
