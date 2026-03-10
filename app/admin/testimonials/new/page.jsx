import TestimonialForm from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Add testimonial</h1>
      <TestimonialForm className="mt-6" />
    </div>
  );
}
