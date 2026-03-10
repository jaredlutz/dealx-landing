import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import TestimonialForm from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) notFound();
  const db = getDb();
  const rows = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, numId))
    .limit(1);
  const t = rows[0];
  if (!t) notFound();

  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="text-sm text-diversy-primary hover:underline"
      >
        ← Back to testimonials
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-stone-900">Edit testimonial</h1>
      <TestimonialForm className="mt-6" testimonial={t} />
    </div>
  );
}
