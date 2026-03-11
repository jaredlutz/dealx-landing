import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className={cn("border-t py-10", brand.border)}>
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className={cn("font-semibold", brand.text)}>DiversyFund</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              Institutional fixed income platform for disciplined private-market allocation.
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Company</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="#" className={cn("block mt-1 transition rounded px-2 -mx-2 py-1 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.text, "hover:opacity-80")}>Disclosures</a>
              <a href="#" className={cn("block mt-1 transition rounded px-2 -mx-2 py-1 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.text, "hover:opacity-80")}>Privacy</a>
              <a href="#" className={cn("block mt-1 transition rounded px-2 -mx-2 py-1 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.text, "hover:opacity-80")}>Terms</a>
              <a href="#" className={cn("block mt-1 transition rounded px-2 -mx-2 py-1 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.text, "hover:opacity-80")}>AML/KYC</a>
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Support</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="mailto:investorsupport@diversyfund.com" className={cn("block mt-1 transition rounded px-2 -mx-2 py-1 focus:outline-none focus:ring-2 focus:ring-diversy-primary/40 focus-visible:ring-2 focus-visible:ring-diversy-primary/50", brand.text, "hover:opacity-80")}>investorsupport@diversyfund.com</a>
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
