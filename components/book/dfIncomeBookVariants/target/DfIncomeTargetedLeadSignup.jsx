"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Df2026DeckLeadSignupForm from "@/components/book/Df2026DeckLeadSignupForm";
import { useDfIncomeOpportunityBookHref } from "@/lib/book/useDfIncomeOpportunityBookHref";
import styles from "../../df-income-targeted.module.css";

/** Deck / qualification flow — source distinguishes A/B variant in CRM. */
export default function DfIncomeTargetedLeadSignup({ source }) {
	const router = useRouter();
	const bookHref = useDfIncomeOpportunityBookHref();
	const [fallbackThanks, setFallbackThanks] = useState(false);

	if (fallbackThanks) {
		return (
			<div className={styles.formWrap}>
				<p className={styles.formSuccess}>
					Thanks — we&apos;ll send the investor deck and follow up with next steps shortly.
				</p>
				<p className={styles.fineprint}>
					Prefer to talk now?{" "}
					<a href={bookHref} className={styles.formLink}>
						Book a call
					</a>
					.
				</p>
			</div>
		);
	}

	return (
		<Df2026DeckLeadSignupForm
			source={source}
			submitLabel="Request the Investor Deck"
			onSuccess={({ materialsTid }) => {
				if (materialsTid) {
					router.push(`/book/df-income/materials?tid=${encodeURIComponent(materialsTid)}`);
				} else {
					setFallbackThanks(true);
				}
			}}
			bookCallHref={bookHref}
		/>
	);
}
