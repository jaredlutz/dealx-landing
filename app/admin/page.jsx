import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
      <p className="mt-1 text-stone-600">
        Manage homepage content for diversyfund.com.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/content"
            className="block rounded-lg border border-stone-200 bg-white p-4 shadow-sm hover:border-diversy-primary/30"
          >
            <span className="font-medium text-stone-900">Content blocks</span>
            <p className="mt-1 text-sm text-stone-500">
              Edit hero, about, why invest, portfolio, fund, and mobile app copy.
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/testimonials"
            className="block rounded-lg border border-stone-200 bg-white p-4 shadow-sm hover:border-diversy-primary/30"
          >
            <span className="font-medium text-stone-900">Testimonials</span>
            <p className="mt-1 text-sm text-stone-500">
              Add, edit, and reorder investor testimonials.
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
