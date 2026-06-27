"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BookingSlotPicker from "@/components/book/BookingSlotPicker";
import BookingStepIndicator from "@/components/book/BookingStepIndicator";
import {
  BookingButton,
  BookingCard,
  BookingCardContent,
  BookingCardDescription,
  BookingCardHeader,
  BookingCardTitle,
  BookingInput,
  BookingLabel,
  SCHEDULER_BTN_CLASS,
} from "@/components/book/bookingUi";
import { BOOKING_BUSINESS_DAYS } from "@/lib/book/bookingConstants";
import { PUBLIC_BOOKING_CARD_CLASS } from "@/lib/book/publicBookingResourceLinks";
import {
  formatDisplayTimeZoneShortName,
  formatSlotDateLabel,
  formatSlotTimeLabel,
} from "@/lib/book/slotDisplay";
import { cn } from "@/lib/theme";

export default function PublicBookingScheduler({
  calendarIds,
  className,
  cardClassName,
  title = "Pick a time",
  description = "Choose a day, then a start time. 30-minute weekday slots within the next five business days.",
  confirmLabel = "Confirm booking",
  onConfirmation,
  renderConfirmation,
}) {
  const [slots, setSlots] = useState([]);
  const [bookingTz, setBookingTz] = useState("America/Los_Angeles");
  const [displayTz, setDisplayTz] = useState("America/Los_Angeles");
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
      const params = new URLSearchParams({
        calendars: calendarIds.join(","),
        businessDays: String(BOOKING_BUSINESS_DAYS),
      });
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

  const effectiveDisplayTz = displayTz || bookingTz;
  const currentStep = confirmation ? 3 : selectedSlot ? 2 : 1;

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
          <BookingStepIndicator currentStep={3} className="mb-4" />
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
        <BookingStepIndicator currentStep={currentStep} className="mb-4" />
        <BookingCardTitle>{title}</BookingCardTitle>
        <BookingCardDescription>{description}</BookingCardDescription>
      </BookingCardHeader>
      <BookingCardContent>
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!selectedSlot ? (
          <BookingSlotPicker
            slots={slots}
            loading={loading}
            bookingTimeZone={bookingTz}
            selectedDateKey={selectedDateKey}
            onSelectedDateKeyChange={setSelectedDateKey}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            onDisplayTimeZoneChange={setDisplayTz}
          />
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
