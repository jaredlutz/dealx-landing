import Link from "next/link";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

export default function FooterDiversy() {
  return (
    <footer className={cn("border-t border-border bg-muted py-10")}>
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className={cn("font-semibold", brand.text)}>DiversyFund</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              Invest smarter in expert-managed multifamily real estate with an AI-powered platform.
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Company</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <Link href="/support" className="mt-1 block transition hover:text-diversy-primary">
                Support
              </Link>
              <Link href="/offering-circular" className="mt-1 block transition hover:text-diversy-primary">
                Offering circular
              </Link>
              <Link href="/terms-of-service" className="mt-1 block transition hover:text-diversy-primary">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="mt-1 block transition hover:text-diversy-primary">
                Privacy Policy
              </Link>
              <Link href="/sms-terms" className="mt-1 block transition hover:text-diversy-primary">
                SMS Terms
              </Link>
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Support</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="mailto:investorsupport@diversyfund.com" className="mt-1 block transition hover:text-diversy-primary">
                investorsupport@diversyfund.com
              </a>
              <Link href="/contact" className="mt-1 block transition hover:text-diversy-primary">
                Contact
              </Link>
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
