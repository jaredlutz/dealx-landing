"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  BookingButton,
  BookingCard,
  BookingCardContent,
  BookingCardDescription,
  BookingCardHeader,
  BookingCardTitle,
  BookingInput,
  BookingLabel,
  BookingSelect,
  BookingSkeleton,
  SCHEDULER_BTN_CLASS,
} from "@/components/book/bookingUi";
import { PUBLIC_BOOKING_CARD_CLASS } from "@/lib/book/publicBookingResourceLinks";
import {
  defaultBookingTimeZone,
  formatSlotDateLabel,
  formatSlotTimeLabel,
  groupSlotsByLocalDate,
} from "@/lib/book/slotDisplay";
import { cn } from "@/lib/theme";

function formatDisplayTimeZoneLabel(timeZone) {
  if (timeZone === "America/Los_Angeles") return "Pacific Time";
  return timeZone.replace(/_/g, " ");
}

function formatDisplayTimeZoneShortName(timeZone) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(new Date());
    return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
  } catch {
    return timeZone;
  }
}

export default function PublicBookingScheduler({
  calendarIds,
  className,
  cardClassName,
  title = "Pick a time",
  description = "Choose a day, then a start time. Availability is shown in your selected timezone.",
  confirmLabel = "Confirm booking",
  onConfirmation,
  renderConfirmation,
}) {
  const [slots, setSlots] = useState([]);
  const [bookingTz, setBookingTz] = useState(defaultBookingTimeZone());
  const [localTz, setLocalTz] = useState(null);
  const [displayTz, setDisplayTz] = useState(defaultBookingTimeZone());
  const [displayTzTouched, setDisplayTzTouched] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const calendarKey = calendarIds.join(",");

  const fetchSlots = useCallback(async () => {
    if (calendarIds.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ calendars: calendarIds.join(","), days: "14" });
      const res = await fetch(`/api/crm/book/availability?${params}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      const data = await res.json();
      setSlots(data.slots ?? []);
      if (typeof data.timezone === "string" && data.timezone) {
        setBookingTz(data.timezone);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load availability");
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, [calendarKey]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz?.trim()) setLocalTz(tz);
    } catch {
      /* keep default */
    }
  }, []);

  useEffect(() => {
    if (displayTzTouched) return;
    setDisplayTz(localTz ?? bookingTz);
  }, [bookingTz, localTz, displayTzTouched]);

  const handleSchedule = async () => {
    if (!selectedSlot || !name.trim() || !email.trim()) return;
    setScheduling(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/book/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startIso: selectedSlot.start,
          endIso: selectedSlot.end,
          calendars: calendarIds,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to schedule");
      }
      const next = { joinUrl: data.joinUrl ?? null, htmlLink: data.htmlLink ?? null };
      setConfirmation(next);
      onConfirmation?.(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to schedule");
    } finally {
      setScheduling(false);
    }
  };

  const effectiveDisplayTz = displayTz || localTz || bookingTz;
  const { sortedDateKeys, byDate: slotsByDate } = groupSlotsByLocalDate(slots, effectiveDisplayTz);
  const timeZoneOptions = Array.from(new Set([localTz, bookingTz, "America/Los_Angeles"].filter(Boolean)));
  const effectiveSelectedDateKey =
    selectedDateKey && slotsByDate[selectedDateKey] ? selectedDateKey : (sortedDateKeys[0] ?? null);
  const selectedDateSlots = effectiveSelectedDateKey ? (slotsByDate[effectiveSelectedDateKey] ?? []) : [];

  if (calendarIds.length === 0) {
    return (
      <BookingCard className={cn(PUBLIC_BOOKING_CARD_CLASS, "max-w-xl", cardClassName, className)}>
        <BookingCardHeader>
          <BookingCardTitle>Calendar not configured</BookingCardTitle>
          <BookingCardDescription>
            We could not load availability because this link does not include a valid calendar. Please use the link from
            your email or contact investor relations.
          </BookingCardDescription>
        </BookingCardHeader>
      </BookingCard>
    );
  }

  if (confirmation) {
    if (renderConfirmation) return <>{renderConfirmation(confirmation)}</>;
    return (
      <BookingCard className={cn("max-w-xl", cardClassName, className)}>
        <BookingCardHeader>
          <BookingCardTitle>Confirmation</BookingCardTitle>
          <BookingCardDescription>Check your email for calendar details.</BookingCardDescription>
        </BookingCardHeader>
        <BookingCardContent className="space-y-4">
          {confirmation.joinUrl && (
            <div>
              <BookingLabel className="text-xs text-zinc-500">Meet link</BookingLabel>
              <a
                href={confirmation.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block break-all text-sm text-teal-700 hover:underline"
              >
                {confirmation.joinUrl}
              </a>
            </div>
          )}
          {confirmation.htmlLink && (
            <BookingButton variant="outline" size="sm" asChild={false}>
              <a href={confirmation.htmlLink} target="_blank" rel="noopener noreferrer">
                Add to calendar
              </a>
            </BookingButton>
          )}
        </BookingCardContent>
      </BookingCard>
    );
  }

  return (
    <BookingCard className={cn("max-w-2xl", cardClassName, className)} id="schedule">
      <BookingCardHeader>
        <BookingCardTitle>{title}</BookingCardTitle>
        <BookingCardDescription>{description}</BookingCardDescription>
      </BookingCardHeader>
      <BookingCardContent>
        <div className="rounded-md border border-zinc-200 bg-zinc-50/80 p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-900">Time zone</p>
            <p className="text-xs text-zinc-500">Availability is shown in your selected timezone.</p>
          </div>
          <div className="mt-3">
            <BookingSelect
              value={effectiveDisplayTz}
              onChange={(e) => {
                setDisplayTzTouched(true);
                setDisplayTz(e.target.value);
              }}
              className="max-w-xs"
            >
              {timeZoneOptions.map((tz) => (
                <option key={tz} value={tz}>
                  {tz === localTz
                    ? `Your local time (${formatDisplayTimeZoneShortName(tz)})`
                    : `${formatDisplayTimeZoneLabel(tz)} (${formatDisplayTimeZoneShortName(tz)})`}
                </option>
              ))}
            </BookingSelect>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {loading ? (
          <div className="space-y-3">
            <BookingSkeleton className="h-10 w-full" />
            <BookingSkeleton className="h-40 w-full" />
          </div>
        ) : !selectedSlot ? (
          <div className="space-y-4">
            {sortedDateKeys.length === 0 ? (
              <p className="text-sm text-zinc-500">No available slots in the next 14 days. Try again later.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_1fr]">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4">
                  <p className="mb-3 text-sm font-medium text-zinc-900">1) Select a date</p>
                  <div className="flex flex-wrap gap-2">
                    {sortedDateKeys.map((key) => (
                      <BookingButton
                        key={key}
                        variant={effectiveSelectedDateKey === key ? "primary" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedSlot(null);
                          setSelectedDateKey(key);
                        }}
                      >
                        {formatSlotDateLabel(slotsByDate[key][0].start, effectiveDisplayTz)}
                      </BookingButton>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                  <p className="text-sm font-medium text-zinc-900">2) Select a time</p>
                  <p className="mb-3 mt-1 text-sm text-zinc-500">
                    {effectiveSelectedDateKey && selectedDateSlots[0]
                      ? formatSlotDateLabel(selectedDateSlots[0].start, effectiveDisplayTz)
                      : "Choose a date to view times"}
                  </p>
                  {selectedDateSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {selectedDateSlots.map((slot) => (
                        <BookingButton
                          key={slot.start}
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {formatSlotTimeLabel(slot.start, effectiveDisplayTz)}
                        </BookingButton>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed border-zinc-200 p-6 text-center text-sm text-zinc-500">
                      Select a date to continue.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-sm text-zinc-600">
                <span className="font-medium text-zinc-900">
                  {formatSlotDateLabel(selectedSlot.start, effectiveDisplayTz)}
                </span>
                {" · "}
                {formatSlotTimeLabel(selectedSlot.start, effectiveDisplayTz)} (
                {formatDisplayTimeZoneShortName(effectiveDisplayTz)})
              </p>
              <BookingButton
                variant="ghost"
                size="sm"
                className="mt-2 -ml-2 h-8 px-2"
                onClick={() => setSelectedSlot(null)}
              >
                Change time
              </BookingButton>
            </div>
            <div className="space-y-3">
              <div>
                <BookingLabel htmlFor="book-name">Name</BookingLabel>
                <BookingInput
                  id="book-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <BookingLabel htmlFor="book-email">Email</BookingLabel>
                <BookingInput
                  id="book-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleSchedule}
              disabled={scheduling || !name.trim() || !email.trim()}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition",
                SCHEDULER_BTN_CLASS
              )}
            >
              {scheduling ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Scheduling…
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        )}
      </BookingCardContent>
    </BookingCard>
  );
}
