import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import MainSiteChrome from "@/components/layout/MainSiteChrome";
import InstitutionalFormPage from "@/components/layout/InstitutionalFormPage";
import ContactFormClient from "@/components/sections/contact/ContactFormClient";
import { getContentBlock } from "@/lib/content";
import { publicPageMetadata } from "@/lib/site-seo";
import { brand, cn } from "@/lib/theme";

export const dynamic = "force-dynamic";

const CONTACT_INTRO_FALLBACK =
  "Have a question about DiversyFund or our investment opportunities? Get in touch with our team here.";

/** Ends the intro; anything after this in CMS `body` is ignored (e.g. pasted page copy). */
const CONTACT_INTRO_END = /get in touch with our team here\.?/i;

/**
 * Two-line intro: question + follow-up. Truncates polluted CMS body after the closing sentence.
 */
function introParagraphsFromBody(raw) {
  let t = String(raw || "").trim();
  if (!t) return [];

  const endMatch = t.match(CONTACT_INTRO_END);
  if (endMatch && endMatch.index !== undefined) {
    t = t.slice(0, endMatch.index + endMatch[0].length).trim();
  }

  const q = t.indexOf("?");
  if (q === -1) {
    return [t];
  }
  const first = t.slice(0, q + 1).trim();
  const rest = t.slice(q + 1).trim();
  if (!rest) return [first];
  return [first, rest];
}

export async function generateMetadata() {
  const metaTitle = (await getContentBlock("contact", "title")) || "Contact us";
  const bodyRaw = (await getContentBlock("contact", "body")) || CONTACT_INTRO_FALLBACK;
  const lines = introParagraphsFromBody(bodyRaw);
  const description =
    lines.join(" ").replace(/\s+/g, " ").trim() ||
    "Contact DiversyFund for general inquiries about investment opportunities, the firm, and how to reach our team.";
  return publicPageMetadata({
    title: metaTitle,
    description: description.length > 160 ? `${description.slice(0, 157)}…` : description,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const title = (await getContentBlock("contact", "title")) || "Contact us";
  const bodyRaw = (await getContentBlock("contact", "body")) || CONTACT_INTRO_FALLBACK;

  const introLines = introParagraphsFromBody(bodyRaw);

  const description = (
    <>
      {introLines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </>
  );

  return (
    <MainSiteChrome>
      <InstitutionalFormPage
        leadColumnClass="lg:col-span-7"
        formColumnClass="lg:col-span-5"
        eyebrow={
          <p className={cn("text-xs font-medium uppercase tracking-[0.18em]", brand.muted)}>Get in touch</p>
        }
        title={title}
        description={description}
        formSectionTitle="Send us a message"
        formSectionSubtitle="We’ll route your note to the right team."
        highlights={[
          {
            icon: MapPin,
            title: "Office",
            text: "San Diego, CA — by appointment only.",
          },
          {
            icon: Mail,
            title: "Email",
            text: (
              <>
                <a
                  href="mailto:investorsupport@diversyfund.com"
                  className={cn(
                    "font-medium text-diversy-primary hover:underline",
                    "break-all focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 rounded-sm"
                  )}
                >
                  investorsupport@diversyfund.com
                </a>
                <span className={cn("mt-1 block text-xs", brand.subtle)}>General inquiries</span>
              </>
            ),
          },
          {
            icon: Clock,
            title: "Typical response",
            text: "We aim to reply within one to two business days for general inquiries.",
          },
        ]}
        lead={
          <div
            className={cn(
              "mt-8 rounded-xl border border-diversy-primary/25 bg-diversy-primary/[0.04] p-4 backdrop-blur-sm",
              "dark:border-diversy-primary/35 dark:bg-diversy-primary/[0.08]"
            )}
          >
            <span className={cn("text-sm font-semibold", brand.text)}>Existing investors</span>
            <p className={cn("mt-1.5 text-sm leading-relaxed", brand.muted)}>
              For account-related questions, please use our{" "}
              <Link href="/support" className="font-medium text-diversy-primary hover:underline">
                Support form
              </Link>
              .
            </p>
          </div>
        }
        form={<ContactFormClient />}
      />
    </MainSiteChrome>
  );
}
