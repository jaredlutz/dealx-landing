import { Suspense } from "react";
import PostHogProvider from "@/components/analytics/PostHogProvider";
import BookPageViewTracker from "@/components/analytics/BookPageViewTracker";
import MetaPixelRoot from "@/components/analytics/MetaPixelRoot";
import "@/components/book/df-2026-fixed-income-shell.css";

export const metadata = {
  title: "Book | DiversyFund",
  robots: { index: true, follow: true },
};

export default function BookLayout({ children }) {
  return (
    <PostHogProvider>
      <Suspense fallback={null}>
        <MetaPixelRoot />
        <BookPageViewTracker />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
