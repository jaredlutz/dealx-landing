import { Suspense } from "react";
import DfIncomeTargetedLandingContent from "./DfIncomeTargetedLandingContent";
import DfIncomeTargetedShell from "./DfIncomeTargetedShell";
import "../../df-income-targeted-shell.css";

export default function DfIncomeTargetVariantRoute({ config }) {
	return (
		<DfIncomeTargetedShell>
			<Suspense fallback={null}>
				<DfIncomeTargetedLandingContent pageKey={config.pageKey} theme={config.theme} />
			</Suspense>
		</DfIncomeTargetedShell>
	);
}
