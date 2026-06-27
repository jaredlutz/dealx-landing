"use client";

import { useEffect, useRef, useState } from "react";
import { BookingButton, BookingSelect, BookingSkeleton } from "@/components/book/bookingUi";
import {
  defaultBookingTimeZone,
  formatDisplayTimeZoneLabel,
  formatDisplayTimeZoneShortName,
  formatSlotDateLabel,
  formatSlotDateLabelCompact,
  formatSlotDateLabelLong,
  formatSlotTimeLabel,
  groupSlotsByLocalDate,
  resolveVisitorTimeZone,
} from "@/lib/book/slotDisplay";
import { cn } from "@/lib/theme";

export default function BookingSlotPicker({
  slots,
  loading,
  bookingTimeZone = defaultBookingTimeZone(),
  selectedDateKey,
  onSelectedDateKeyChange,
  selectedSlot,
  onSelectSlot,
  onDisplayTimeZoneChange,
  emptyMessage = "No available slots in the next five business days.",
  className,
}) {
  const timesRef = useRef(null);
  const [displayTz, setDisplayTz] = useState(bookingTimeZone);
  const [displayTzTouched, setDisplayTzTouched] = useState(false);
  const localTz = resolveVisitorTimeZone();

  useEffect(() => {
    if (displayTzTouched) return;
    setDisplayTz(localTz ?? bookingTimeZone);
  }, [bookingTimeZone, localTz, displayTzTouched]);

  const effectiveDisplayTz = displayTz || localTz || bookingTimeZone;
  const { sortedDateKeys, byDate: slotsByDate } = groupSlotsByLocalDate(slots, effectiveDisplayTz);
  const timeZoneOptions = Array.from(
    new Set([localTz, bookingTimeZone, "America/Los_Angeles"].filter(Boolean))
  );

  const activeDateKey =
    selectedDateKey && slotsByDate[selectedDateKey]
      ? selectedDateKey
      : (sortedDateKeys[0] ?? null);

  const selectedDateSlots = activeDateKey ? (slotsByDate[activeDateKey] ?? []) : [];

  useEffect(() => {
    onDisplayTimeZoneChange?.(effectiveDisplayTz);
  }, [effectiveDisplayTz, onDisplayTimeZoneChange]);

  function handleDateSelect(key) {
    onSelectedDateKeyChange?.(key);
    onSelectSlot?.(null);
    requestAnimationFrame(() => {
      timesRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  if (loading) {
    return (
      <div className={cn("space-y-3", className)}>
        <BookingSkeleton className="h-12 w-full" />
        <BookingSkeleton className="h-32 w-full" />
      </div>
    );
  }

  if (sortedDateKeys.length === 0) {
    return <p className={cn("text-sm text-zinc-500", className)}>{emptyMessage}</p>;
  }

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-xs text-zinc-500">Weekday openings within the next five business days</p>
        <div className="sm:max-w-xs sm:flex-1">
          <BookingSelect
            value={effectiveDisplayTz}
            onChange={(e) => {
              setDisplayTzTouched(true);
              setDisplayTz(e.target.value);
            }}
            aria-label="Time zone"
            className="text-xs"
          >
            {timeZoneOptions.map((tz) => (
              <option key={tz} value={tz}>
                {tz === localTz
                  ? `Your time (${formatDisplayTimeZoneShortName(tz)})`
                  : `${formatDisplayTimeZoneLabel(tz)} (${formatDisplayTimeZoneShortName(tz)})`}
              </option>
            ))}
          </BookingSelect>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-900">Select a date</p>
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 snap-x snap-mandatory [scrollbar-width:thin]"
          role="listbox"
          aria-label="Available dates"
        >
          {sortedDateKeys.map((key) => {
            const isActive = activeDateKey === key;
            const slotCount = slotsByDate[key]?.length ?? 0;
            return (
              <BookingButton
                key={key}
                variant={isActive ? "primary" : "outline"}
                size="sm"
                className={cn(
                  "min-h-[3.25rem] min-w-[4.5rem] shrink-0 snap-start flex-col gap-0.5 px-3 py-2 text-center leading-tight",
                  !isActive && "border-zinc-200"
                )}
                onClick={() => handleDateSelect(key)}
                aria-pressed={isActive}
              >
                <span className="text-sm font-semibold sm:hidden">
                  {formatSlotDateLabelCompact(slotsByDate[key][0].start, effectiveDisplayTz)}
                </span>
                <span className="hidden text-sm font-semibold sm:inline">
                  {formatSlotDateLabel(slotsByDate[key][0].start, effectiveDisplayTz)}
                </span>
                <span className={cn("text-[10px] font-normal", isActive ? "text-white/80" : "text-zinc-500")}>
                  {slotCount} {slotCount === 1 ? "time" : "times"}
                </span>
              </BookingButton>
            );
          })}
        </div>
      </div>

      <div ref={timesRef}>
        {selectedDateSlots[0] ? (
          <p className="mb-3 text-sm font-medium text-zinc-900">
            {formatSlotDateLabelLong(selectedDateSlots[0].start, effectiveDisplayTz)}
            <span className="font-normal text-zinc-500">
              {" "}
              · {formatDisplayTimeZoneShortName(effectiveDisplayTz)}
            </span>
          </p>
        ) : null}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {selectedDateSlots.map((slot) => {
            const isSelected = selectedSlot?.start === slot.start;
            return (
              <BookingButton
                key={slot.start}
                variant={isSelected ? "primary" : "outline"}
                size="sm"
                className={cn("min-h-12 w-full text-sm font-semibold", !isSelected && "border-zinc-200")}
                onClick={() => onSelectSlot?.(slot)}
                aria-pressed={isSelected}
              >
                {formatSlotTimeLabel(slot.start, effectiveDisplayTz)}
              </BookingButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
