"use client";

import { useTransition } from "react";
import Link from "next/link";
import { saveTestimonial, createTestimonial } from "./actions";

export default function TestimonialForm({ testimonial, className = "" }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const data = {
            quote: formData.get("quote")?.toString() ?? "",
            authorName: formData.get("authorName")?.toString() ?? "",
            authorSource: formData.get("authorSource")?.toString() || null,
            sortOrder: Number(formData.get("sortOrder")) || 0,
          };
          if (testimonial) {
            await saveTestimonial(testimonial.id, data);
          } else {
            await createTestimonial(data);
          }
          window.location.href = "/admin/testimonials";
        });
      }}
      className={`space-y-4 ${className}`}
    >
      <div>
        <label className="block text-sm font-medium text-stone-700">Quote</label>
        <textarea
          name="quote"
          defaultValue={testimonial?.quote}
          required
          rows={4}
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Author name</label>
        <input
          name="authorName"
          defaultValue={testimonial?.authorName}
          required
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Source (optional)</label>
        <input
          name="authorSource"
          defaultValue={testimonial?.authorSource ?? ""}
          placeholder="e.g. Investor"
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700">Sort order</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={testimonial?.sortOrder ?? 0}
          className="mt-1 w-24 rounded border border-stone-300 px-3 py-2"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-diversy-primary px-4 py-2 text-white hover:bg-diversy-primary-hover disabled:opacity-50"
        >
          {isPending ? "Saving…" : testimonial ? "Save" : "Add"}
        </button>
        <Link
          href="/admin/testimonials"
          className="rounded border border-stone-300 px-4 py-2 text-stone-700 hover:bg-stone-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
