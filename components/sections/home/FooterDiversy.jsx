import Link from "next/link";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

export default function FooterDiversy() {
  return (
    <footer className={cn("border-t py-10", brand.border)}>
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
              <Link href="/about" className="block mt-1 hover:text-diversy-primary transition">About</Link>
              <Link href="/investment-opportunities" className="block mt-1 hover:text-diversy-primary transition">Investment Opportunities</Link>
              <Link href="/multifamily-investment-fund" className="block mt-1 hover:text-diversy-primary transition">Multifamily Fund</Link>
              <Link href="/invest-with-ira" className="block mt-1 hover:text-diversy-primary transition">Invest with IRA</Link>
              <Link href="/support" className="block mt-1 hover:text-diversy-primary transition">Support</Link>
              <Link href="/privacy-policy" className="block mt-1 hover:text-diversy-primary transition">Privacy Policy</Link>
              <Link href="/sms-terms" className="block mt-1 hover:text-diversy-primary transition">SMS Terms</Link>
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Support</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="mailto:investorsupport@diversyfund.com" className="block mt-1 hover:text-diversy-primary transition">investorsupport@diversyfund.com</a>
              <Link href="/contact" className="block mt-1 hover:text-diversy-primary transition">Contact</Link>
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
