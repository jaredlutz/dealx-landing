import Link from "next/link";
import { Clock, Headphones, Shield } from "lucide-react";
import MainSiteChrome from "@/components/layout/MainSiteChrome";
import InstitutionalFormPage from "@/components/layout/InstitutionalFormPage";
import SupportFormClient from "@/components/sections/support/SupportFormClient";
import { getContentBlocksForPage } from "@/lib/content";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

export const dynamic = "force-dynamic";

const SUPPORT_BODY_FALLBACK =
  "If you're an existing DiversyFund investor, use this form to contact our support team for assistance with your account, investment details, or platform questions. Our team is ready to help you every step of the way.";

export async function generateMetadata() {
  const blocks = await getContentBlocksForPage("support");
  const metaTitle = blocks.title ?? "Investor support";
  const descriptionRaw = (blocks.body ?? SUPPORT_BODY_FALLBACK).replace(/\s+/g, " ").trim();
  const description =
    descriptionRaw.length > 160 ? `${descriptionRaw.slice(0, 157)}…` : descriptionRaw;
  return publicPageMetadata({
    title: metaTitle,
    description,
    path: "/support",
  });
}

export default async function SupportPage() {
  const blocks = await getContentBlocksForPage("support");
  const eyebrow = blocks.eyebrow ?? "We're Here to Help";
  const title = blocks.title ?? "Investor Support Center";
  const body = blocks.body ?? SUPPORT_BODY_FALLBACK;

  return (
    <MainSiteChrome>
      <InstitutionalFormPage
        eyebrow={
          <p className={cn("text-xs font-medium uppercase tracking-[0.18em]", brand.muted)}>{eyebrow}</p>
        }
        title={title}
        description={body}
        formSectionTitle="Tell us what you need"
        formSectionSubtitle="Include your account email and as much detail as you can — it helps us resolve your request faster."
        highlights={[
          {
            icon: Headphones,
            title: "Investor-focused",
            text: "This channel is staffed for portfolio, portal, and servicing questions — not general sales inquiries.",
          },
          {
            icon: Clock,
            title: "What to expect",
            text: "Complex cases may need a bit longer, but we review every submission in order.",
          },
          {
            icon: Shield,
            title: "Secure handling",
            text: "Never share passwords or full card numbers in this form; we’ll verify you through established channels.",
          },
        ]}
        lead={
          <div
            className={cn(
              "mt-8 rounded-xl border border-diversy-primary/25 bg-diversy-primary/[0.04] p-4 backdrop-blur-sm",
              "dark:border-diversy-primary/35 dark:bg-diversy-primary/[0.08]"
            )}
          >
            <span className={cn("text-sm font-semibold", brand.text)}>For existing investors only</span>
            <p className={cn("mt-1.5 text-sm leading-relaxed", brand.muted)}>
              For general inquiries, use our{" "}
              <Link href="/contact" className="font-medium text-diversy-primary hover:underline">
                Contact form
              </Link>
              .
            </p>
          </div>
        }
        form={<SupportFormClient />}
      />
    </MainSiteChrome>
  );
}
