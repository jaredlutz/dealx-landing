import DfIncomeTargetedLandingContent from "./DfIncomeTargetedLandingContent";
import DfIncomeTargetedShell from "./DfIncomeTargetedShell";
import "../../df-income-targeted-shell.css";

export default function DfIncomeTargetVariantRoute({ config }) {
  return (
    <DfIncomeTargetedShell>
      <DfIncomeTargetedLandingContent
        pageKey={config.pageKey}
        leadSignupSource={config.leadSignupSource}
        theme={config.theme}
      />
    </DfIncomeTargetedShell>
  );
}
