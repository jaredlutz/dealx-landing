"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Calendar as CalendarIcon, ExternalLink, Loader2 } from "lucide-react";
import PublicBookingPageShell from "@/components/book/PublicBookingPageShell";
import InvestorCallContactAuth from "@/components/book/InvestorCallContactAuth";
import {
  BookingButton,
  BookingCard,
  BookingCardContent,
  BookingCardDescription,
  BookingCardHeader,
  BookingCardTitle,
  BookingInput,
  BookingLabel,
  BookingSkeleton,
} from "@/components/book/bookingUi";
import EmailConsentControls from "@/components/forms/EmailConsentControls";
import VoiceAiCallConsentControl from "@/components/forms/VoiceAiCallConsentControl";
import { SMS_CONSENT_MARKETING } from "@/lib/investment-interest-consent";
import {
  INVESTOR_CALL_BEFORE_CALL_BLURB,
  INVESTOR_CALL_BOOKING_DOWNLOADS,
} from "@/lib/book/investorCallBookingContent";
import { parseLpInvestorCallBookingSource } from "@/lib/book/parseLpInvestorCallBookingSource";
import { PUBLIC_BOOKING_CARD_CLASS } from "@/lib/book/publicBookingResourceLinks";
import {
  dateKeyInTimeZone,
  defaultBookingTimeZone,
  formatSlotDateLabel,
  formatSlotTimeLabel,
  groupSlotsByLocalDate,
} from "@/lib/book/slotDisplay";
import { metaTrackStandard } from "@/lib/analytics/metaPixel";
import { brand, cn } from "@/lib/theme";

const DEFAULT_FALLBACK = "https://links.diversyfund.com/widget/booking/gikK2iGjegkeED65GOUq";

function digitsOnly(s) {
  return String(s || "").replace(/\D/g, "");
}

function BookInvestorCallContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bookingReturnPath = useMemo(() => {
    const qs = searchParams.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }, [pathname, searchParams]);
  const tid = searchParams.get("tid") ?? "";
  const slug = searchParams.get("slug") ?? "";
  const bookingSource = parseLpInvestorCallBookingSource(searchParams.get("bookingSource"));
  const fallbackUrl = DEFAULT_FALLBACK;

  const [slots, setSlots] = useState([]);
  const [bookingTz, setBookingTz] = useState(defaultBookingTimeZone());
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentEmailPrivacy, setConsentEmailPrivacy] = useState(false);
  const [consentMarketingEmail, setConsentMarketingEmail] = useState(false);
  const [consentMarketingSms, setConsentMarketingSms] = useState(false);
  const [consentVoiceAiCall, setConsentVoiceAiCall] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState(null);
  const [prefillContact, setPrefillContact] = useState(undefined);
  const [confirmation, setConfirmation] = useState(null);
  const [sessionUserId, setSessionUserId] = useState(null);
  const [sessionEmail, setSessionEmail] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [manualContact, setManualContact] = useState(false);
  const scheduleLockRef = useRef(false);
  const idempotencyKeyRef = useRef(null);

  const phoneDigits = digitsOnly(phone);
  const showPhoneConsents = phoneDigits.length >= 10;

  const fetchSlots = useCallback(async () => {
    setLoadingSlots(true);
    setError(null);
    setUseFallback(false);
    try {
      const qs = new URLSearchParams({
        days: "14",
        bookingSource,
      });
      const res = await fetch(`/api/crm/book/investor-call/availability?${qs.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setUseFallback(true);
        setSlots([]);
        return;
      }
      if (data.message && typeof data.message === "string" && data.message.toLowerCase().includes("no senior ir")) {
        setUseFallback(true);
        setSlots([]);
        return;
      }
      setSlots(data.slots ?? []);
      if (typeof data.timezone === "string" && data.timezone.length > 0) {
        setBookingTz(data.timezone);
      }
    } catch {
      setUseFallback(true);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [bookingSource]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  useEffect(() => {
    if (!tid || !slug) {
      setPrefillContact(undefined);
      return;
    }
    fetch(`/api/crm/track/prefill?tid=${encodeURIComponent(tid)}&slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.prefill) setPrefillContact(data.prefill);
      })
      .catch(() => {});
  }, [tid, slug]);

  useEffect(() => {
    if (prefillContact) {
      setName([prefillContact.firstName, prefillContact.lastName].filter(Boolean).join(" "));
      setEmail(prefillContact.email ?? "");
      setPhone(prefillContact.phoneE164 ?? "");
    }
  }, [prefillContact]);

  useEffect(() => {
    fetch("/api/insights-signup/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || data.status === "none") return;
        if (typeof data.userId === "string") setSessionUserId(data.userId);
        if (typeof data.email === "string" && data.email) {
          setSessionEmail(data.email);
          setEmail((prev) => prev || data.email);
        }
        const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
        if (fullName) {
          setSessionName(fullName);
          setName((prev) => prev || fullName);
        }
      })
      .catch(() => {});
  }, []);

  const handleSchedule = async () => {
    if (!selectedSlot || !name.trim() || !email.trim() || !phone.trim()) return;
    if (!consentEmailPrivacy) {
      setError("Please consent to email communications before confirming.");
      return;
    }
    if (scheduleLockRef.current) return;
    scheduleLockRef.current = true;
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `book-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
    setScheduling(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/book/investor-call/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startIso: selectedSlot.start,
          endIso: selectedSlot.end,
          name: name.trim(),
          email: email.trim(),
          phoneE164: phone.trim(),
          consentEmail: true,
          consentSms: consentMarketingSms,
          consentVoiceAiCall,
          bookingSource,
          idempotencyKey: idempotencyKeyRef.current,
          ...(sessionUserId ? { workosUserId: sessionUserId } : {}),
        }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setError(data.error ?? "That time was just taken. Please pick another slot.");
        setSelectedSlot(null);
        await fetchSlots();
        return;
      }
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to schedule");
      }
      setConfirmation({
        joinUrl: data.joinUrl ?? null,
        htmlLink: data.htmlLink ?? null,
      });
      metaTrackStandard(
        "Schedule",
        {
          content_name: "investor_call_schedule",
          content_category: "investor_call_booking",
        },
        `investor_call:${selectedSlot.start}`
      );
    } catch (err) {
      scheduleLockRef.current = false;
      setError(err instanceof Error ? err.message : "Failed to schedule");
    } finally {
      setScheduling(false);
    }
  };

  const { sortedDateKeys, byDate } = useMemo(() => groupSlotsByLocalDate(slots, bookingTz), [slots, bookingTz]);
  const dateKeysSig = sortedDateKeys.join("|");

  useEffect(() => {
    setSelectedDateKey((prev) => (prev && sortedDateKeys.includes(prev) ? prev : null));
  }, [dateKeysSig, sortedDateKeys]);

  const activeDateKey =
    sortedDateKeys.length === 0
      ? null
      : selectedDateKey && sortedDateKeys.includes(selectedDateKey)
        ? selectedDateKey
        : sortedDateKeys[0];

  const tzHint = bookingTz === "America/Los_Angeles" ? "Pacific Time" : bookingTz.replace(/_/g, " ");
  const slotsForSelectedDay = activeDateKey && byDate[activeDateKey] ? byDate[activeDateKey] : [];

  const shellProps = {
    eyebrow: "Accredited investors · DiversyFund",
    title: "Book a call with Craig Cecilio",
    description: "Schedule a live conversation with Craig Cecilio, our founder. Times shown are from his calendar.",
    beforeCallBlurb: INVESTOR_CALL_BEFORE_CALL_BLURB,
    downloads: INVESTOR_CALL_BOOKING_DOWNLOADS,
  };

  if (useFallback) {
    return (
      <PublicBookingPageShell {...shellProps}>
        <BookingCard className={cn(PUBLIC_BOOKING_CARD_CLASS, "max-w-xl")}>
          <BookingCardHeader>
            <BookingCardTitle>Schedule a call</BookingCardTitle>
            <BookingCardDescription>
              Our embedded calendar isn&apos;t available right now. Use the link below to book with our team.
            </BookingCardDescription>
          </BookingCardHeader>
          <BookingCardContent>
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#005EE0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0066F5]"
            >
              <ExternalLink className="size-4" />
              Open scheduling
            </a>
          </BookingCardContent>
        </BookingCard>
      </PublicBookingPageShell>
    );
  }

  if (confirmation) {
    return (
      <PublicBookingPageShell {...shellProps}>
        <BookingCard className={cn("max-w-xl")}>
          <BookingCardHeader>
            <BookingCardTitle>You&apos;re all set</BookingCardTitle>
            <BookingCardDescription>
              {confirmation.joinUrl
                ? "A calendar invite has been sent to your email."
                : "A calendar invite has been sent to your email. Our team will reach you at the scheduled time."}
            </BookingCardDescription>
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
              <a
                href={confirmation.htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-zinc-50"
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
    <PublicBookingPageShell {...shellProps}>
      <BookingCard className={cn("max-w-2xl")}>
        <BookingCardHeader>
          <BookingCardTitle>Pick a time</BookingCardTitle>
          <BookingCardDescription>
            Choose a day, then a start time. 30-minute slots · Weekdays · {tzHint} · Craig Cecilio
          </BookingCardDescription>
        </BookingCardHeader>
        <BookingCardContent>
          {error && <p className="text-sm text-red-600">{error}</p>}

          {loadingSlots ? (
            <div className="space-y-3">
              <BookingSkeleton className="h-10 w-full" />
              <BookingSkeleton className="h-40 w-full" />
            </div>
          ) : !selectedSlot ? (
            <div className="space-y-6">
              {sortedDateKeys.length === 0 ? (
                <>
                  <p className="text-sm text-zinc-500">No available slots in the next 14 days.</p>
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-zinc-50"
                  >
                    <ExternalLink className="size-4" />
                    Try our scheduling link
                  </a>
                </>
              ) : (
                <>
                  <p className="text-xs text-zinc-500">Dates with openings are selectable. All times are {tzHint}.</p>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="text-sm font-medium text-zinc-900">Select a date</p>
                      <div className="flex flex-wrap gap-2">
                        {sortedDateKeys.map((key) => (
                          <BookingButton
                            key={key}
                            variant={activeDateKey === key ? "primary" : "outline"}
                            size="sm"
                            onClick={() => {
                              setSelectedDateKey(key);
                              setSelectedSlot(null);
                            }}
                          >
                            {formatSlotDateLabel(byDate[key][0].start, bookingTz)}
                          </BookingButton>
                        ))}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      <p className="text-sm font-medium text-zinc-900">
                        {slotsForSelectedDay[0]
                          ? formatSlotDateLabel(slotsForSelectedDay[0].start, bookingTz)
                          : "Select another day"}
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {slotsForSelectedDay.map((slot) => (
                          <BookingButton
                            key={slot.start}
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {formatSlotTimeLabel(slot.start, bookingTz)}
                          </BookingButton>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                <p className="text-sm text-zinc-600">
                  <span className="font-medium text-zinc-900">
                    {formatSlotDateLabel(selectedSlot.start, bookingTz)}
                  </span>
                  {" · "}
                  {formatSlotTimeLabel(selectedSlot.start, bookingTz)} {tzHint}
                </p>
                <BookingButton
                  variant="ghost"
                  size="sm"
                  className="mt-2 -ml-2 h-8 px-2"
                  onClick={() => {
                    setSelectedSlot(null);
                    setSelectedDateKey(dateKeyInTimeZone(selectedSlot.start, bookingTz));
                  }}
                >
                  Change time
                </BookingButton>
              </div>
              <InvestorCallContactAuth
                signedInEmail={sessionEmail || null}
                signedInName={sessionName || null}
                returnPath={bookingReturnPath}
                manualActive={manualContact || !sessionEmail}
                onUseManual={() => setManualContact(true)}
              />
              {(manualContact || !sessionEmail) && (
              <div className="space-y-3">
                <div>
                  <BookingLabel htmlFor="inv-book-name">Name</BookingLabel>
                  <BookingInput
                    id="inv-book-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <BookingLabel htmlFor="inv-book-email">Email</BookingLabel>
                  <BookingInput
                    id="inv-book-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              )}
              <div className="space-y-3">
                <div>
                  <BookingLabel htmlFor="inv-book-phone">
                    Phone <span className="text-red-600">*</span>
                  </BookingLabel>
                  <BookingInput
                    id="inv-book-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                  <p className="mt-2 text-xs text-zinc-500">
                    We&apos;ll use this number for your scheduled call and related messages.
                  </p>
                </div>
                <EmailConsentControls
                  privacyChecked={consentEmailPrivacy}
                  onPrivacyChange={setConsentEmailPrivacy}
                  marketingChecked={consentMarketingEmail}
                  onMarketingChange={setConsentMarketingEmail}
                />
                {showPhoneConsents && (
                  <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
                    <label className="flex cursor-pointer gap-2.5">
                      <input
                        type="checkbox"
                        checked={consentMarketingSms}
                        onChange={(e) => setConsentMarketingSms(e.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 rounded border-border text-diversy-primary focus:ring-diversy-primary/40"
                      />
                      <span className={cn("text-xs leading-snug", brand.muted)}>{SMS_CONSENT_MARKETING}</span>
                    </label>
                    <VoiceAiCallConsentControl checked={consentVoiceAiCall} onChange={setConsentVoiceAiCall} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleSchedule}
                disabled={scheduling || !name.trim() || !email.trim() || !phone.trim() || !consentEmailPrivacy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#005EE0] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0066F5] disabled:opacity-50"
              >
                {scheduling ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Scheduling…
                  </>
                ) : (
                  <>
                    <CalendarIcon className="size-4" />
                    Confirm booking
                  </>
                )}
              </button>
            </div>
          )}
        </BookingCardContent>
      </BookingCard>
    </PublicBookingPageShell>
  );
}

export default function BookInvestorCallPage() {
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
      <BookInvestorCallContent />
    </Suspense>
  );
}
