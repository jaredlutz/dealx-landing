"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Df2026DeckLeadSignupForm from "./Df2026DeckLeadSignupForm";
import { DF_INCOME_OPPORTUNITY_BOOK_HREF } from "@/lib/book/dfIncomeOpportunityUrls";

export default function Df2026FixedIncomeLeadSignup({ source = "book-df-income" }) {
  const router = useRouter();
  const [fallbackThanks, setFallbackThanks] = useState(false);

  if (fallbackThanks) {
    return (
      <p className="text-sm text-zinc-600">
        Thanks — we&apos;ll email your investor deck shortly.{" "}
        <a href={DF_INCOME_OPPORTUNITY_BOOK_HREF} className="font-semibold text-[#005EE0] underline">
          Book a call
        </a>
      </p>
    );
  }

  return (
    <Df2026DeckLeadSignupForm
      source={source}
      submitLabel="Request the Investor Deck"
      onSuccess={({ materialsTid }) => {
        if (materialsTid) {
          router.push(`/book/df-income/materials?tid=${encodeURIComponent(materialsTid)}`);
        } else {
          setFallbackThanks(true);
        }
      }}
    />
  );
}
