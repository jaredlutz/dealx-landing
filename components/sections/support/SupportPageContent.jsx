import Link from "next/link";
import { getContentBlocksForPage } from "@/lib/content";
import { brand, cn } from "@/lib/theme";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default async function SupportPageContent({ searchParams }) {
  const blocks = await getContentBlocksForPage("support");
  const title = blocks.title ?? "Investor Support Center";
  const eyebrow = blocks.eyebrow ?? "We're Here to Help";
  const body = blocks.body ?? "If you're an existing DiversyFund investor, use this form to contact our support team for assistance with your account, investment details, or platform questions. Our team is ready to help you every step of the way.";
  const submitted = searchParams?.submitted === "1";
  const error = searchParams?.error;

  return (
    <SiteLayout>
      <div className={cn("py-16 sm:py-20", brand.bg, brand.text)}>
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className={cn("mb-3 text-xs tracking-[0.18em] uppercase", brand.accent)}>
              {eyebrow}
            </div>
            <h1 className={cn("text-3xl font-bold sm:text-4xl", brand.text)}>
              {title}
            </h1>
            <p className={cn("mt-6 text-base leading-relaxed", brand.muted)}>
              {body}
            </p>

            <div className={cn("mt-8 rounded-xl border px-4 py-3", brand.border, brand.accentBg)}>
              <span className={cn("font-semibold", brand.text)}>For Existing Investors Only</span>
            </div>

            {submitted && (
              <div className={cn("mt-8 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3", brand.text)}>
                Thank you. We&apos;ll be in touch shortly.
              </div>
            )}
            {error && (
              <div className={cn("mt-8 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3", brand.text)}>
                Something went wrong. Please try again or email investorsupport@diversyfund.com.
              </div>
            )}

            <form
              action="/api/support"
              method="POST"
              className="mt-10 space-y-6"
            >
              <div>
                <label htmlFor="support-name" className={cn("block text-sm font-medium", brand.text)}>
                  Name
                </label>
                <input
                  id="support-name"
                  name="name"
                  type="text"
                  required
                  className={cn("mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-base", brand.border, brand.text, "focus:outline-none focus:ring-2 focus:ring-diversy-primary/40")}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="support-email" className={cn("block text-sm font-medium", brand.text)}>
                  Email
                </label>
                <input
                  id="support-email"
                  name="email"
                  type="email"
                  required
                  className={cn("mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-base", brand.border, brand.text, "focus:outline-none focus:ring-2 focus:ring-diversy-primary/40")}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="support-message" className={cn("block text-sm font-medium", brand.text)}>
                  Message
                </label>
                <textarea
                  id="support-message"
                  name="message"
                  rows={5}
                  required
                  className={cn("mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-base", brand.border, brand.text, "focus:outline-none focus:ring-2 focus:ring-diversy-primary/40")}
                  placeholder="Describe your question or issue..."
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>

            <p className={cn("mt-10 text-sm", brand.muted)}>
              For general inquiries, please use our{" "}
              <Link href="/contact" className="text-diversy-primary hover:underline">
                Contact Form
              </Link>
              .
            </p>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
