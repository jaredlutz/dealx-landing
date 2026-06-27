import DfIncomeV3LandingContent from "./DfIncomeV3LandingContent";

export default function DfIncomeV3VariantRoute({ config }) {
  return (
    <DfIncomeV3LandingContent pageKey={config.pageKey} leadSignupSource={config.leadSignupSource} />
  );
}
