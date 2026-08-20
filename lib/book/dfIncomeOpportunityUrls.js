/** Canonical DF Income booking LP — only `/incomeopportunity/v/1` is live. */
export const DF_INCOME_CANONICAL_VARIANT_SLUG = "1";

export const DF_INCOME_CANONICAL_LP_PATH = "/incomeopportunity/v/1";

export const DF_INCOME_CANONICAL_LP_URL = "https://diversyfund.com/incomeopportunity/v/1";

/** @deprecated Use DF_INCOME_CANONICAL_LP_PATH */
export const DF_INCOME_OPPORTUNITY_HREF = DF_INCOME_CANONICAL_LP_PATH;

/** Ungated investor deck PDF (direct download on v/1 LP). */
export const DF_INCOME_OPPORTUNITY_DECK_HREF = "/documents/df-income-product-deck.pdf";

export const DF_INCOME_OPPORTUNITY_DECK_DOWNLOAD_FILENAME =
	"DiversyFund-DF-Income-Product-Deck.pdf";

/** NC / Collateral Rotation booking source (Craig calendar). */
export const DF_INCOME_LP_BOOKING_SOURCE = "lp_df_income_booking";

/** Canonical investor-call schedule URL with booking source. */
export const DF_INCOME_INVESTOR_CALL_HREF = `/book/investor-call?bookingSource=${DF_INCOME_LP_BOOKING_SOURCE}`;

/**
 * Book CTA on `/incomeopportunity/v/1` — source in the href, not a silent rewrite.
 * Prefer {@link buildDfIncomeOpportunityBookHref} when the page has email `tid`/`cid`.
 */
export const DF_INCOME_OPPORTUNITY_BOOK_HREF = DF_INCOME_INVESTOR_CALL_HREF;

/**
 * Build LP → book href preserving attribution query params from the marketing LP.
 * Option B: email lands on marketing LP with tid; book CTA must forward tid/cid.
 *
 * @param {string | URLSearchParams | Record<string, string | null | undefined> | null | undefined} search
 */
export function buildDfIncomeOpportunityBookHref(search) {
	const dest = new URL("https://diversyfund.com/book/investor-call");
	dest.searchParams.set("bookingSource", DF_INCOME_LP_BOOKING_SOURCE);

	let incoming;
	if (search instanceof URLSearchParams) {
		incoming = search;
	} else if (typeof search === "string") {
		incoming = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
	} else if (search && typeof search === "object") {
		incoming = new URLSearchParams();
		for (const [key, value] of Object.entries(search)) {
			if (value != null && String(value).trim()) incoming.set(key, String(value));
		}
	} else {
		incoming = new URLSearchParams();
	}

	for (const key of ["tid", "cid"]) {
		const value = incoming.get(key)?.trim();
		if (value) dest.searchParams.set(key, value);
	}

	return `${dest.pathname}${dest.search}`;
}
