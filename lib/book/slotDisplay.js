/**
 * Display helpers for booking slots returned as UTC ISO strings from the API.
 */

const DEFAULT_BOOKING_TZ = "America/Los_Angeles";
const YMD_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function defaultBookingTimeZone() {
  return DEFAULT_BOOKING_TZ;
}

/** YYYY-MM-DD in the given IANA timezone, sortable. */
export function dateKeyInTimeZone(iso, timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function formatSlotDateLabel(iso, timeZone) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone,
  });
}

export function formatSlotTimeLabel(iso, timeZone) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });
}

export function groupSlotsByLocalDate(slots, timeZone) {
  const byDate = slots.reduce((acc, slot) => {
    const k = dateKeyInTimeZone(slot.start, timeZone);
    if (!acc[k]) acc[k] = [];
    acc[k].push(slot);
    return acc;
  }, {});
  const sortedDateKeys = Object.keys(byDate).sort();
  for (const k of sortedDateKeys) {
    byDate[k].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }
  return { sortedDateKeys, byDate };
}

/** Map a calendar day to YYYY-MM-DD in `timeZone`. */
export function dayPickerCellToDateKey(day, timeZone) {
  const localNoon = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 12, 0, 0, 0);
  return dateKeyInTimeZone(localNoon.toISOString(), timeZone);
}

/**
 * Noon on the wall date in `timeZone` — used for highlighting selected dates.
 * Avoids date-fns-tz by probing offset via Intl.
 */
export function dateKeyToPickerDate(dateKey, timeZone) {
  const m = YMD_RE.exec(String(dateKey).trim());
  if (!m) return new Date(NaN);
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const utcGuess = Date.UTC(y, mo - 1, d, 12, 0, 0);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date(utcGuess));
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  const offsetHours = hour - 12;
  return new Date(Date.UTC(y, mo - 1, d, 12 - offsetHours, 0, 0));
}
