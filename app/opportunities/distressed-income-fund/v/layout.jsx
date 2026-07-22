import { Suspense } from "react";
import PostHogProvider from "@/components/analytics/PostHogProvider";
import MetaPixelRoot from "@/components/analytics/MetaPixelRoot";
import DfIncomeTargetedShell from "@/components/book/dfIncomeBookVariants/target/DfIncomeTargetedShell";

export default function DistressedIncomeFundVariantLayout({ children }) {
  return (
    <PostHogProvider>
      <DfIncomeTargetedShell>
        <Suspense fallback={null}>
          <MetaPixelRoot />
        </Suspense>
        {children}
      </DfIncomeTargetedShell>
    </PostHogProvider>
  );
}
