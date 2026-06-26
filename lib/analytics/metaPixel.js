"use client";

const META_FBQ_BOOTSTRAP = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`;

let initializedPixelId;
let lastPageViewCanonicalKey;

export function ensureMetaFbqBootstrap() {
  if (typeof document === "undefined") return;
  if (typeof window !== "undefined" && typeof window.fbq === "function") return;
  if (document.querySelector('script[data-df-meta-pixel="bootstrap"]')) return;
  const el = document.createElement("script");
  el.setAttribute("data-df-meta-pixel", "bootstrap");
  el.textContent = META_FBQ_BOOTSTRAP;
  document.head.appendChild(el);
}

function envTruthy(v) {
  if (!v) return false;
  const s = v.trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes" || s === "on";
}

export function shouldEnableMetaPixelClient() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  if (!id) return false;
  if (envTruthy(process.env.NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PRODUCTION)) return true;
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV?.trim().toLowerCase();
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV?.trim().toLowerCase();
  return vercelEnv === "production" || appEnv === "production";
}

export function canonicalPageKey(pathname, searchParams) {
  const entries = Array.from(searchParams.entries()).sort(([a], [b]) => a.localeCompare(b));
  const q = entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
  return q ? `${pathname}?${q}` : pathname;
}

const dedupeKeys = new Set();

export function metaTrackStandard(event, params, dedupeKey) {
  if (!shouldEnableMetaPixelClient()) return;
  ensureMetaFbqBootstrap();
  const key = `${event}:${dedupeKey}`;
  if (dedupeKeys.has(key)) return;
  dedupeKeys.add(key);
  const fbq = typeof window !== "undefined" ? window.fbq : undefined;
  if (typeof fbq !== "function") return;
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
  );
  fbq("track", event, cleaned);
}

export function syncMetaPageView(pixelId, pathname, searchParams) {
  if (!pixelId || !shouldEnableMetaPixelClient()) return;
  ensureMetaFbqBootstrap();
  const fbq = typeof window !== "undefined" ? window.fbq : undefined;
  if (typeof fbq !== "function") return;
  if (initializedPixelId !== pixelId) {
    fbq("init", pixelId);
    initializedPixelId = pixelId;
  }
  const key = canonicalPageKey(pathname, searchParams);
  if (lastPageViewCanonicalKey === key) return;
  lastPageViewCanonicalKey = key;
  fbq("track", "PageView");
}
