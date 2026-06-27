import DfIncomeV4LandingContent from "./DfIncomeV4LandingContent";

export default function DfIncomeV4VariantRoute({ config }) {
  return (
    <DfIncomeV4LandingContent pageKey={config.pageKey} leadSignupSource={config.leadSignupSource} />
  );
}
