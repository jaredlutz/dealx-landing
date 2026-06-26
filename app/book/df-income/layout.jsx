import PostHogSessionRecordingGate from "@/components/analytics/PostHogSessionRecordingGate";
import Df2026FixedIncomeShell from "@/components/book/Df2026FixedIncomeShell";

export default function DfIncomeBookLayout({ children }) {
  return (
    <Df2026FixedIncomeShell>
      <PostHogSessionRecordingGate />
      {children}
    </Df2026FixedIncomeShell>
  );
}
