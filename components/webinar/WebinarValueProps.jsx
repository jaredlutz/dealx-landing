import { TrendingUp, Building2, Shield } from "lucide-react";
import Container from "@/components/ui/Container";

const valueProps = [
  {
    icon: TrendingUp,
    title: "Double-Digit Yield",
    desc: "Opportunities designed to outperform traditional income vehicles.",
  },
  {
    icon: Building2,
    title: "Three Decades of Experience",
    desc: "Built by operators with over 30 years raising and managing capital.",
  },
  {
    icon: Shield,
    title: "Access to Private Market Opportunities",
    desc: "Investments typically reserved for serious investors.",
  },
];

export default function WebinarValueProps() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-24">
      <Container>
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          What Serious Investors Look For
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <Icon className="h-10 w-10 text-diversy-primary" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-3 text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
