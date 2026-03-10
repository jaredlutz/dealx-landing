import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-white font-semibold">DiversyFund</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              Institutional fixed income platform for disciplined private-market allocation.
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Company</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="#" className="block mt-1 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 -mx-2 py-1">Disclosures</a>
              <a href="#" className="block mt-1 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 -mx-2 py-1">Privacy</a>
              <a href="#" className="block mt-1 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 -mx-2 py-1">Terms</a>
              <a href="#" className="block mt-1 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 -mx-2 py-1">AML/KYC</a>
            </div>
          </div>
          <div>
            <div className={cn("text-sm font-semibold", brand.text)}>Support</div>
            <div className={cn("mt-2 text-sm", brand.muted)}>
              <a href="mailto:investorsupport@diversyfund.com" className="block mt-1 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 -mx-2 py-1">investorsupport@diversyfund.com</a>
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
