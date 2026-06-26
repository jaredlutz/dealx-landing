"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import PublicBookingPageShell from "@/components/book/PublicBookingPageShell";
import PublicBookingScheduler from "@/components/book/PublicBookingScheduler";
import {
  BookingCard,
  BookingCardContent,
  BookingCardDescription,
  BookingCardHeader,
  BookingCardTitle,
  BookingSkeleton,
} from "@/components/book/bookingUi";
import { PUBLIC_BOOKING_CARD_CLASS } from "@/lib/book/publicBookingResourceLinks";
import { cn } from "@/lib/theme";

function parseCalendarIds(raw) {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const calendarIds = parseCalendarIds(searchParams.get("calendars"));
  const [confirmation, setConfirmation] = useState(null);

  if (calendarIds.length === 0) {
    return (
      <PublicBookingPageShell
        eyebrow="Accredited investors · DiversyFund"
        title="Booking unavailable"
        description="This scheduling link is missing calendar configuration. Please use the link from your email or contact investor relations."
      >
        <BookingCard className={cn(PUBLIC_BOOKING_CARD_CLASS, "max-w-xl")}>
          <BookingCardHeader>
            <BookingCardTitle>Calendar not configured</BookingCardTitle>
            <BookingCardDescription>
              We could not load availability because this link does not include a valid calendar.
            </BookingCardDescription>
          </BookingCardHeader>
        </BookingCard>
      </PublicBookingPageShell>
    );
  }

  if (confirmation) {
    return (
      <PublicBookingPageShell
        eyebrow="Accredited investors · DiversyFund"
        title="You're all set"
        description="Your phone call is confirmed and a calendar invite is on its way."
      >
        <BookingCard className={cn("max-w-xl")}>
          <BookingCardHeader>
            <BookingCardTitle>Confirmation</BookingCardTitle>
            <BookingCardDescription>Check your email for calendar details.</BookingCardDescription>
          </BookingCardHeader>
          <BookingCardContent className="space-y-4">
            {confirmation.joinUrl && (
              <div>
                <p className="text-xs text-zinc-500">Meet link</p>
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
              <a
                href={confirmation.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-[#111827] hover:bg-zinc-50"
              >
                Add to calendar
              </a>
            )}
          </BookingCardContent>
        </BookingCard>
      </PublicBookingPageShell>
    );
  }

  return (
    <PublicBookingPageShell
      eyebrow="Accredited investors · DiversyFund"
      title="Book a call with Craig Cecilio"
      description="Schedule a live conversation with our founder. Choose a time that works for you—we'll send confirmation details by email."
    >
      <PublicBookingScheduler calendarIds={calendarIds} onConfirmation={setConfirmation} />
    </PublicBookingPageShell>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="marketing-light min-h-svh bg-[#f9fafb] px-4 py-10">
          <div className="mx-auto max-w-lg space-y-3">
            <BookingSkeleton className="h-10 w-full" />
            <BookingSkeleton className="h-48 w-full" />
          </div>
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
