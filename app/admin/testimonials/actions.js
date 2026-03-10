"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

export async function createTestimonial(data) {
  const db = getDb();
  await db.insert(testimonials).values(data);
}

export async function saveTestimonial(id, data) {
  const db = getDb();
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id) {
  const db = getDb();
  await db.delete(testimonials).where(eq(testimonials.id, id));
}
