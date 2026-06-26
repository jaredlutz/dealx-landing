/**
 * AuthKit callback URI — client routes read NEXT_PUBLIC_*; server may also have WORKOS_REDIRECT_URI.
 */
export function getWorkOsRedirectUri() {
  return (
    process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI?.trim() ||
    process.env.WORKOS_REDIRECT_URI?.trim() ||
    ""
  );
}
