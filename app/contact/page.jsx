import { getContentBlock } from "@/lib/content";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const title = (await getContentBlock("contact", "title")) ?? "Contact Us";
  const body = (await getContentBlock("contact", "body")) ?? "";
  const primaryImage = "/migrated/home/home-1.jpg";

  return (
    <SiteLayout>
      <div className="py-16 sm:py-20">
        <Container>
          {primaryImage && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={primaryImage}
                alt=""
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold sm:text-4xl", brand.text)}>
            {title}
          </h1>
          {body && (
            <div
              className={cn("mt-6 whitespace-pre-line text-base leading-relaxed", brand.muted)}
            >
              {body}
            </div>
          )}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className={cn("text-lg font-semibold", brand.text)}>Office Location</h2>
            <p className={cn("mt-2 text-sm", brand.muted)}>San Diego, CA — by appointment only.</p>
            <h2 className={cn("mt-6 text-lg font-semibold", brand.text)}>Email</h2>
            <a
              href="mailto:investorsupport@diversyfund.com"
              className={cn("mt-2 block text-sm hover:text-diversy-primary", brand.accent)}
            >
              investorsupport@diversyfund.com
            </a>
            <p className={cn("mt-1 text-xs", brand.subtle)}>General Inquiries Only</p>
            <p className={cn("mt-4 text-sm", brand.muted)}>
              Existing investors, please use our{" "}
              <a href="/support" className={cn("underline hover:text-diversy-primary", brand.accent)}>
                Support Form
              </a>{" "}
              for account-related questions.
            </p>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
