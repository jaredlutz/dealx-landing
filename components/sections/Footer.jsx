import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import Link from "next/link";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

const socials = [
  {
    href: "https://www.linkedin.com/company/diversyfund/",
    label: "DiversyFund on LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://www.facebook.com/DiversyFund",
    label: "DiversyFund on Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/diversyfund/",
    label: "DiversyFund on Instagram",
    Icon: Instagram,
  },
  {
    href: "https://x.com/DiversyFund",
    label: "DiversyFund on X",
    Icon: X,
  },
  {
    href: "https://www.youtube.com/c/DiversyFund",
    label: "DiversyFund on YouTube",
    Icon: Youtube,
  },
];

const linkFocus = cn(
  "rounded px-2 -mx-2 py-1 transition focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50"
);

export default function Footer() {
  return (
    <footer className={cn("py-10", brand.sectionFooter)}>
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <a href="/" className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-md">
              <img
                src="/images/diversyfund-logo.svg"
                alt="DiversyFund"
                className="h-9 w-auto dark:hidden"
              />
              <img
                src="/images/diversyfund-logo-white.svg"
                alt="DiversyFund"
                className="hidden h-9 w-auto dark:block"
              />
            </a>
            <div className={cn("mt-3 text-sm", brand.muted)}>
              Institutional fixed income platform for disciplined private-market allocation.
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "inline-flex rounded-lg p-2.5 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-diversy-primary/40"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Company</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="/documents" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                Documents
              </a>
              <a href="/offering-circular" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                Offering circular
              </a>
              <a href="/terms-of-service" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                Terms of Service
              </a>
              <a href="/privacy-policy" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                Privacy
              </a>
              <a href="/sms-terms" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                SMS terms
              </a>
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Support</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <Link href="/contact" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                Contact
              </Link>
              <Link href="/support" className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}>
                Investor support
              </Link>
              <a
                href="mailto:investorsupport@diversyfund.com"
                className={cn("block mt-1", brand.text, "hover:opacity-80", linkFocus)}
              >
                investorsupport@diversyfund.com
              </a>
              <div className={cn("mt-3 text-xs", brand.subtle)}>
                Investing involves risk, including potential loss of principal. This website is for informational purposes and does not constitute an offer to sell or a solicitation to buy securities.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
