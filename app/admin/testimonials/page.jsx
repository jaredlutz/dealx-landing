import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const db = getDb();
  const list = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Testimonials</h1>
      <p className="mt-1 text-stone-600">
        Shown on the homepage. Add, edit, reorder.
      </p>
      <Link
        href="/admin/testimonials/new"
        className="mt-4 inline-block rounded bg-diversy-primary px-4 py-2 text-sm text-white hover:bg-diversy-primary-hover"
      >
        Add testimonial
      </Link>
      {list.length === 0 ? (
        <p className="mt-6 text-stone-500">No testimonials yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {list.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded border border-stone-200 bg-white p-4"
            >
              <p className="line-clamp-2 text-stone-700">&ldquo;{t.quote}&rdquo;</p>
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="text-sm text-diversy-primary hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
