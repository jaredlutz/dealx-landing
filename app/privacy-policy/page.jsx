import { getContentBlock } from "@/lib/content";
import SiteLayout from "@/components/layout/SiteLayout";
import ContentPage from "@/components/sections/ContentPage";

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const title = (await getContentBlock("privacy_policy", "title")) ?? "Privacy Policy";
  const body = (await getContentBlock("privacy_policy", "body")) ?? "";
  const primaryImage = "/migrated/content/privacy_policy/img-0.jpg";

  return (
    <SiteLayout>
      <ContentPage title={title} body={body} primaryImage={primaryImage} />
    </SiteLayout>
  );
}
