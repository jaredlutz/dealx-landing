/**
 * Decode AuthKit state (`btoa({ returnPathname })` or base64url, optional `.custom`).
 * @param {string | null | undefined} state
 * @returns {string | null}
 */
export function decodeOAuthStateReturnPath(state) {
  if (!state || typeof state !== "string") return null;
  try {
    const internal = state.includes(".") ? state.split(".")[0] : state;
    const padded = internal.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(padded));
    return typeof decoded.returnPathname === "string" ? decoded.returnPathname : null;
  } catch {
    return null;
  }
}
