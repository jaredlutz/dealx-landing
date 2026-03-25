import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { loadLegalFragment } from "@/lib/legal/loadLegalFragment";
import { publicPageMetadata } from "@/lib/site-seo";

export const metadata = publicPageMetadata({
  title: "SMS terms",
  description:
    "Terms and conditions for SMS communications from DiversyFund, including consent, frequency, and opt-out instructions.",
  path: "/sms-terms",
});

export default function SmsTermsPage() {
  const html = loadLegalFragment("sms");
  return (
    <LegalDocumentPage title="SMS Terms & Conditions" html={html} />
  );
}
