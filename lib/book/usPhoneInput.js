/** US mobile input helpers for deck / booking forms. */

/** Strip to up to 10 national digits (drops leading US country code 1). */
export function digitsFromPhoneInput(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** Format as (949) 245-9055 while typing. */
export function formatUsPhoneDisplay(value) {
  const digits = digitsFromPhoneInput(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** API payload — 10-digit US mobile; CRM adds +1. */
export function normalizeUsPhoneForApi(value) {
  const digits = digitsFromPhoneInput(value);
  return digits.length === 10 ? digits : "";
}

export function isValidUsMobileInput(value) {
  return digitsFromPhoneInput(value).length === 10;
}
