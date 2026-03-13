import { BarChart3, RefreshCw, Target } from "lucide-react";
import Container from "@/components/ui/Container";

const pillars = [
  {
    icon: BarChart3,
    title: "Consistent performance",
    desc: "Opportunities designed to generate double-digit returns.",
  },
  {
    icon: RefreshCw,
    title: "Strong returns through cycles",
    desc: "Capital deployed into structured real asset investments.",
  },
  {
    icon: Target,
    title: "Disciplined investment strategy",
    desc: "Investments designed with defined timelines and measurable outcomes.",
  },
];

export default function WebinarPositioning() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-24">
      <Container>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          DiversyFund Positioning
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          Investors ultimately allocate capital for returns. But sophisticated
          investors want repeatable performance, not a lucky deal.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
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
