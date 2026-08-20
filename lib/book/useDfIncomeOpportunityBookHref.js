"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { buildDfIncomeOpportunityBookHref } from "@/lib/book/dfIncomeOpportunityUrls";

/** Book CTA href that forwards email `tid`/`cid` from the marketing LP query string. */
export function useDfIncomeOpportunityBookHref() {
	const searchParams = useSearchParams();
	return useMemo(
		() =>
			buildDfIncomeOpportunityBookHref({
				tid: searchParams.get("tid"),
				cid: searchParams.get("cid"),
			}),
		[searchParams],
	);
}
