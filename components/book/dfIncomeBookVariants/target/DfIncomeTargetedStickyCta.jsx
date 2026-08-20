"use client";

import { useEffect, useState } from "react";
import { useDfIncomeOpportunityBookHref } from "@/lib/book/useDfIncomeOpportunityBookHref";
import styles from "../../df-income-targeted.module.css";

/** Mobile sticky CTA — defers until one viewport scroll (matches `/book/df-income`). */
export default function DfIncomeTargetedStickyCta() {
	const bookHref = useDfIncomeOpportunityBookHref();
	const [belowFold, setBelowFold] = useState(false);

	useEffect(() => {
		const update = () => {
			setBelowFold(window.scrollY >= window.innerHeight);
		};

		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update, { passive: true });
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, []);

	const hidden = !belowFold;

	return (
		<a
			href={bookHref}
			className={`${styles.stickyCta} ${hidden ? styles.stickyCtaBelowFoldHidden : ""}`}
			aria-hidden={hidden ? true : undefined}
			tabIndex={hidden ? -1 : undefined}
		>
			Book a private call
		</a>
	);
}
