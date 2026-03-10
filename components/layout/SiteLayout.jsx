"use client";

import React from "react";
import { brand, cn } from "@/lib/theme";
import TopNavDiversy from "@/components/sections/home/TopNavDiversy";
import FooterDiversy from "@/components/sections/home/FooterDiversy";

export default function SiteLayout({ children }) {
  const [active, setActive] = React.useState("");

  return (
    <div className={cn("flex min-h-screen flex-col", brand.bg, brand.text)}>
      <TopNavDiversy active={active} setActive={setActive} />
      <main className="flex-1">{children}</main>
      <FooterDiversy />
    </div>
  );
}
