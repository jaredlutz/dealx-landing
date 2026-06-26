function envTruthy(raw) {
  if (!raw?.trim()) return false;
  const v = raw.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

function envExplicitlyOff(raw) {
  if (!raw?.trim()) return false;
  const v = raw.trim().toLowerCase();
  return v === "0" || v === "false" || v === "no";
}

export function isPostHogClientStrictMode() {
  if (typeof process === "undefined") return false;
  if (envExplicitlyOff(process.env.NEXT_PUBLIC_POSTHOG_STRICT_EVENTS)) return false;
  if (envTruthy(process.env.NEXT_PUBLIC_POSTHOG_STRICT_EVENTS)) return true;
  return process.env.NODE_ENV === "production";
}

export const POSTHOG_ALLOWED_EVENTS = new Set([
  "book_page_viewed",
  "df_income_deck_requested",
  "df_income_deck_delivery_sent",
  "df_income_doc_email_click",
  "df_income_doc_materials_viewed",
  "df_income_doc_downloaded",
  "ceo_doc_lp_landing_view",
  "meeting_booked",
  "booking_failed",
  "page_view",
]);

function isAllowedClient(event) {
  if (!isPostHogClientStrictMode()) return true;
  return POSTHOG_ALLOWED_EVENTS.has(event);
}

export function track(event, properties) {
  if (!isAllowedClient(event)) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.capture(event, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    })
    .catch(() => {});
}

export function identify(distinctId, traits) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.identify(distinctId, traits);
    })
    .catch(() => {});
}

export function identifyVslFromBootstrap(hashedDistinctId) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const id = hashedDistinctId?.trim();
  if (!key || !id) return;
  import("posthog-js")
    .then(({ default: posthog }) => {
      const prior = posthog.get_distinct_id();
      if (prior && prior !== id) {
        posthog.alias(id, prior);
      }
      posthog.identify(id);
    })
    .catch(() => {});
}
