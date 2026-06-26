import { notFound } from "next/navigation";
import DfIncomeMaterialsClient from "@/components/book/DfIncomeMaterialsClient";

export const metadata = {
  title: "DF Income investor materials | DiversyFund",
  description: "Download the DF Income investor deck and supporting materials.",
  robots: { index: false, follow: false },
};

async function loadMaterialsBootstrap(tid) {
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
  const res = await fetch(
    `${base}/api/crm/df-income-materials-bootstrap?tid=${encodeURIComponent(tid)}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.ok ? data : null;
}

export default async function DfIncomeMaterialsPage({ searchParams }) {
  const tid = (await searchParams)?.tid?.trim();
  if (!tid) notFound();

  const bootstrap = await loadMaterialsBootstrap(tid);
  if (!bootstrap) notFound();

  return (
    <DfIncomeMaterialsClient
      firstName={bootstrap.firstName}
      docs={bootstrap.docs}
      bookCallHref={bootstrap.bookCallHref}
      offeringHref={bootstrap.offeringHref}
      highlightDoc={(await searchParams)?.doc?.trim() || null}
    />
  );
}
