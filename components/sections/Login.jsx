import { getSignInUrl } from "@/lib/portal";
import { brand, cn } from "@/lib/theme";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export default function Login() {
  return (
    <section id="login" className="pt-16 pb-20">
      <Container>
        <div className="max-w-lg">
          <SectionTitle
            eyebrow="Portal"
            title="Log in"
            subtitle="Access your dashboard, documents, and reporting."
          />
          <Card className="mt-8 p-6">
            <a
              href={getSignInUrl()}
              className="block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#060B12] hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Continue to portal
            </a>
            <div className={cn("mt-4 flex flex-col gap-1 text-xs", brand.subtle)}>
              <a
                href="mailto:investorsupport@diversyfund.com"
                className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/25 focus-visible:ring-2 focus-visible:ring-white/40 rounded px-2 -mx-2 py-1 inline-block"
              >
                Forgot password? Email investorsupport@diversyfund.com
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
