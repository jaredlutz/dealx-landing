import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { loadLegalFragment } from "@/lib/legal/loadLegalFragment";
import { publicPageMetadata } from "@/lib/site-seo";

export const metadata = publicPageMetadata({
  title: "Privacy Policy",
  description:
    "How DiversyFund collects, uses, and protects personal information for visitors and investors on this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const html = loadLegalFragment("privacy");
  return <LegalDocumentPage title="Privacy Policy" html={html} />;
}
