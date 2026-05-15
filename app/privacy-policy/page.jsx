import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { loadLegalFragment } from "@/lib/legal/loadLegalFragment";
import { publicPageMetadata } from "@/lib/site-seo";

export const metadata = publicPageMetadata({
  title: "Privacy Policy",
  description:
    "How DiversyFund collects, uses, and protects personal information for visitors and investors on this website.",
  path: "/privacy-policy",
});

function PrivacyFormsNotice() {
  return (
    <aside
      className="rounded-xl border border-border bg-muted/30 px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-5"
      aria-label="How we use information from site forms"
    >
      <p className="font-medium text-foreground">When you use our online forms</p>
      <p className="mt-2">
        If you submit a contact, support, investment interest, or program request, we ask you to confirm how we may use
        your email address and related contact details. That acknowledgment refers to the practices described in this
        Privacy Policy. Optional marketing email preferences, where shown on the form, are separate from
        transactional or support-related messages.
      </p>
    </aside>
  );
}

export default function PrivacyPolicyPage() {
  const html = loadLegalFragment("privacy");
  return (
    <LegalDocumentPage title="Privacy Policy" html={html} preContent={<PrivacyFormsNotice />} />
  );
}
