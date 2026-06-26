export const POSTHOG_SESSION_RECORDING_PATHS = ["/book/df-income", "/incomeopportunity"];

export function shouldEnablePostHogSessionRecording(pathname) {
  if (!pathname) return false;
  const path = pathname.split("?")[0]?.trim() || "";
  return POSTHOG_SESSION_RECORDING_PATHS.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );
}
