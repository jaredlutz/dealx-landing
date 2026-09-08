import { identifyVslFromBootstrap, track } from "@/lib/analytics/posthogStrictMode";

const SESSION_STORAGE_KEY = "shareholder_next_chapter_materials_session_id";
const SLUG = "shareholder-next-chapter-july-22-2026";
const START_OFFSET_SECONDS = 180;

const identifiedIds = new Set();

export { START_OFFSET_SECONDS };

export function getOrCreateMaterialsSessionId() {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Internal event → PostHog event. Returns null if we should not send to PostHog. */
function mapToPostHogEvent(eventType, eventValue, sessionId) {
  const base = { ...eventValue, sessionId, slug: SLUG };
  switch (eventType) {
    case "shareholder_next_chapter_materials_video_started":
    case "shareholder_next_chapter_materials_video_progress":
    case "shareholder_next_chapter_materials_video_milestone":
    case "shareholder_next_chapter_materials_video_completed":
      return { event: eventType, properties: base };
    default:
      return null;
  }
}

export async function trackShareholderMaterialsVideoEvent(
  tid,
  eventType,
  eventValue,
  sessionId
) {
  if (!tid?.trim()) return;
  try {
    const res = await fetch("/api/crm/shareholder-next-chapter-materials-video-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tid, eventType, eventValue, sessionId }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.ok && data.posthogDistinctId) {
      if (!identifiedIds.has(data.posthogDistinctId)) {
        identifyVslFromBootstrap(data.posthogDistinctId);
        identifiedIds.add(data.posthogDistinctId);
      }
      const mapped = mapToPostHogEvent(eventType, eventValue, sessionId);
      if (mapped) {
        track(mapped.event, mapped.properties);
      }
    }
  } catch {
    // Non-blocking
  }
}
