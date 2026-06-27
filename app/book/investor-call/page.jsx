"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Calendar as CalendarIcon, ExternalLink, Loader2 } from "lucide-react";
import BookingSlotPicker from "@/components/book/BookingSlotPicker";
import BookingStepIndicator from "@/components/book/BookingStepIndicator";
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
import { BOOKING_BUSINESS_DAYS } from "@/lib/book/bookingConstants";
import {
  INVESTOR_CALL_PAGE_DESCRIPTION,
  INVESTOR_CALL_PAGE_TITLE,
  INVESTOR_CALL_REP_DISPLAY_NAME,
} from "@/lib/book/investorCallBookingContent";
import { parseLpInvestorCallBookingSource } from "@/lib/book/parseLpInvestorCallBookingSource";
import { PUBLIC_BOOKING_CARD_CLASS } from "@/lib/book/publicBookingResourceLinks";
import {
  dateKeyInTimeZone,
  formatDisplayTimeZoneShortName,
  formatSlotDateLabel,
  formatSlotTimeLabel,
} from "@/lib/book/slotDisplay";
import {
  formatUsPhoneDisplay,
  isValidUsMobileInput,
  normalizeUsPhoneForApi,
} from "@/lib/book/usPhoneInput";
import { metaTrackStandard } from "@/lib/analytics/metaPixel";
import { SMS_CONSENT_MARKETING } from "@/lib/investment-interest-consent";
import { brand, cn } from "@/lib/theme";

const DEFAULT_FALLBACK = "https://links.diversyfund.com/widget/booking/gikK2iGjegkeED65GOUq";

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

  const [slots, setSlots] = useState([]);
  const [bookingTz, setBookingTz] = useState("America/Los_Angeles");
  const [displayTz, setDisplayTz] = useState("America/Los_Angeles");
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

  const showPhoneConsents = isValidUsMobileInput(phone);

  const fetchSlots = useCallback(async () => {
    setLoadingSlots(true);
    setError(null);
    setUseFallback(false);
    try {
      const qs = new URLSearchParams({
        businessDays: String(BOOKING_BUSINESS_DAYS),
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
      if (prefillContact.phoneE164) {
        setPhone(formatUsPhoneDisplay(prefillContact.phoneE164));
      }
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
    if (!selectedSlot || !name.trim() || !email.trim() || !isValidUsMobileInput(phone)) return;
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
    const phoneNormalized = normalizeUsPhoneForApi(phone);
    try {
      const res = await fetch("/api/crm/book/investor-call/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startIso: selectedSlot.start,
          endIso: selectedSlot.end,
          name: name.trim(),
          email: email.trim(),
          phoneE164: phoneNormalized ? `+1${phoneNormalized}` : phone.trim(),
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
        scheduleLockRef.current = false;
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

  const shellProps = {
    eyebrow: "Accredited investors · DiversyFund",
    title: INVESTOR_CALL_PAGE_TITLE,
    description: INVESTOR_CALL_PAGE_DESCRIPTION,
    showBeforeCallPanel: false,
  };

  const currentStep = confirmation ? 3 : selectedSlot ? 2 : 1;
  const effectiveDisplayTz = displayTz || bookingTz;

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
              href={DEFAULT_FALLBACK}
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
            <BookingStepIndicator currentStep={3} className="mb-4" />
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
          <BookingStepIndicator currentStep={currentStep} className="mb-4" />
          <BookingCardTitle>Pick a time</BookingCardTitle>
          <BookingCardDescription>
            30-minute slots · Weekdays · next {BOOKING_BUSINESS_DAYS} business days ·{" "}
            {INVESTOR_CALL_REP_DISPLAY_NAME}
          </BookingCardDescription>
        </BookingCardHeader>
        <BookingCardContent>
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!selectedSlot ? (
            <div className="space-y-4">
              <BookingSlotPicker
                slots={slots}
                loading={loadingSlots}
                bookingTimeZone={bookingTz}
                selectedDateKey={selectedDateKey}
                onSelectedDateKeyChange={setSelectedDateKey}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                onDisplayTimeZoneChange={setDisplayTz}
              />
              {!loadingSlots && slots.length === 0 && (
                <a
                  href={DEFAULT_FALLBACK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-zinc-50"
                >
                  <ExternalLink className="size-4" />
                  Try our scheduling link
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-5">
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
                  onClick={() => {
                    setSelectedSlot(null);
                    setSelectedDateKey(dateKeyInTimeZone(selectedSlot.start, effectiveDisplayTz));
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
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(formatUsPhoneDisplay(e.target.value))}
                    placeholder="949 245 9055"
                    autoComplete="tel-national"
                  />
                  <p className="mt-2 text-xs text-zinc-500">
                    U.S. mobile — 10 digits; we&apos;ll add +1 automatically.
                  </p>
                </div>
                <EmailConsentControls
                  privacyChecked={consentEmailPrivacy}
                  onPrivacyChange={setConsentEmailPrivacy}
                  marketingChecked={consentMarketingEmail}
                  onMarketingChange={setConsentMarketingEmail}
                />
                {showPhoneConsents && (
                  <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
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
                disabled={
                  scheduling ||
                  !name.trim() ||
                  !email.trim() ||
                  !isValidUsMobileInput(phone) ||
                  !consentEmailPrivacy
                }
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
