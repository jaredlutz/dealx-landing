import Link from "next/link";
import { signOutAction } from "./actions";

export const dynamic = "force-dynamic";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Content blocks" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-stone-100">
      <aside className="fixed inset-y-0 left-0 w-56 border-r border-stone-200 bg-white">
        <div className="flex h-16 items-center border-b border-stone-200 px-4">
          <Link href="/admin" className="font-semibold text-stone-800">
            DiversyFund Admin
          </Link>
        </div>
        <nav className="p-2" aria-label="Admin">
          <ul className="space-y-0.5">
            {adminNav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-100"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-stone-200 p-2">
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-left text-sm text-stone-600 hover:bg-stone-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="pl-56">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
