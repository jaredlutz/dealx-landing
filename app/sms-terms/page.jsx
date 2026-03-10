import { getContentBlock } from "@/lib/content";
import SiteLayout from "@/components/layout/SiteLayout";
import ContentPage from "@/components/sections/ContentPage";

export const dynamic = "force-dynamic";

export default async function SmsTermsPage() {
  const title = (await getContentBlock("sms_terms", "title")) ?? "SMS Terms";
  const body = (await getContentBlock("sms_terms", "body")) ?? "";
  const primaryImage = "/migrated/content/sms_terms/img-0.jpg";

  return (
    <SiteLayout>
      <ContentPage title={title} body={body} primaryImage={primaryImage} />
    </SiteLayout>
  );
}
