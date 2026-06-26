"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  canonicalPageKey,
  ensureMetaFbqBootstrap,
  shouldEnableMetaPixelClient,
  syncMetaPageView,
} from "@/lib/analytics/metaPixel";

export default function MetaPixelRoot() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
  const pathnameRef = useRef(pathname);
  const searchParamsRef = useRef(searchParams);
  pathnameRef.current = pathname;
  searchParamsRef.current = searchParams;
  const enabled = Boolean(pixelId) && shouldEnableMetaPixelClient();

  useLayoutEffect(() => {
    if (!enabled) return;
    ensureMetaFbqBootstrap();
    syncMetaPageView(pixelId, pathnameRef.current, searchParamsRef.current);
  }, [enabled, pixelId]);

  useEffect(() => {
    if (!enabled) return;
    syncMetaPageView(pixelId, pathname, searchParams);
  }, [enabled, pixelId, pathname, searchParams]);

  return null;
}
