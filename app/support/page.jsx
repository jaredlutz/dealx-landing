import SupportPageContent from "@/components/sections/support/SupportPageContent";

export const dynamic = "force-dynamic";

export default function SupportPage({ searchParams }) {
  return <SupportPageContent searchParams={searchParams} />;
}
