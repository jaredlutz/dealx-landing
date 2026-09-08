import { Suspense } from "react";
import PostHogProvider from "@/components/analytics/PostHogProvider";

export default function ShareholderNextChapterMaterialsLayout({ children }) {
  return (
    <PostHogProvider>
      <Suspense fallback={null}>{children}</Suspense>
    </PostHogProvider>
  );
}
