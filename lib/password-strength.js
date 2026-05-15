// Lightweight client-side password strength heuristics. The remote source of
// truth is WorkOS's password policy (zxcvbn-backed) on `userManagement.createUser`,
// which rejects weak passwords with "Password does not meet strength requirements."
//
// We mirror that policy here so visitors see the actual rule set update LIVE as
// they type — instead of only learning the password was weak after submit. The
// thresholds below are intentionally conservative so a password that passes
// these checks should also pass WorkOS's strength check in the vast majority of
// cases.

const COMMON_WEAK_TOKENS = [
  "password",
  "passw0rd",
  "qwerty",
  "asdfgh",
  "letmein",
  "iloveyou",
  "welcome",
  "admin",
  "monkey",
  "dragon",
  "abc123",
  "111111",
  "123123",
  "123abc",
  "trustno1",
  "diversyfund",
];

const SEQUENTIAL_PATTERNS = [
  "0123456789",
  "9876543210",
  "abcdefghijklmnopqrstuvwxyz",
  "zyxwvutsrqponmlkjihgfedcba",
  "qwertyuiopasdfghjklzxcvbnm",
];

function hasSequentialRun(value, runLength = 5) {
  if (!value || value.length < runLength) return false;
  const lower = value.toLowerCase();
  for (const pattern of SEQUENTIAL_PATTERNS) {
    for (let i = 0; i <= pattern.length - runLength; i++) {
      const segment = pattern.slice(i, i + runLength);
      if (lower.includes(segment)) return true;
    }
  }
  return false;
}

function hasLongRepeat(value, runLength = 4) {
  if (!value || value.length < runLength) return false;
  let run = 1;
  for (let i = 1; i < value.length; i++) {
    if (value[i] === value[i - 1]) {
      run += 1;
      if (run >= runLength) return true;
    } else {
      run = 1;
    }
  }
  return false;
}

function classesUsed(value) {
  if (!value) return 0;
  let count = 0;
  if (/[a-z]/.test(value)) count += 1;
  if (/[A-Z]/.test(value)) count += 1;
  if (/[0-9]/.test(value)) count += 1;
  if (/[^A-Za-z0-9]/.test(value)) count += 1;
  return count;
}

/**
 * Evaluate a candidate password against rules that approximate WorkOS's
 * strength policy. Returns a structured result the UI can render directly.
 *
 * @param {string} password
 * @returns {{
 *   strong: boolean,
 *   score: 0 | 1 | 2 | 3 | 4,
 *   label: "Too short" | "Weak" | "Fair" | "Good" | "Strong",
 *   requirements: Array<{ id: string, label: string, met: boolean }>,
 * }}
 */
export function evaluatePassword(password) {
  const value = typeof password === "string" ? password : "";
  const length = value.length;
  const classes = classesUsed(value);
  const lowered = value.toLowerCase();
  const containsCommon = COMMON_WEAK_TOKENS.some((token) => lowered.includes(token));
  const sequential = hasSequentialRun(value, 5);
  const repeats = hasLongRepeat(value, 4);

  const requirements = [
    {
      id: "length",
      label: "At least 10 characters",
      met: length >= 10,
    },
    {
      id: "classes",
      label: "Mix of upper, lower, number, and symbol (any 3)",
      met: classes >= 3,
    },
    {
      id: "uncommon",
      label: "Avoids common words and obvious patterns",
      met: length > 0 && !containsCommon && !sequential && !repeats,
    },
  ];

  const strong = requirements.every((r) => r.met);

  let score = 0;
  if (length === 0) {
    score = 0;
  } else if (length < 8 || classes <= 1 || containsCommon) {
    score = 1;
  } else if (length < 10 || classes < 3 || sequential || repeats) {
    score = 2;
  } else if (length < 14 || classes < 4) {
    score = 3;
  } else {
    score = 4;
  }

  let label = "Too short";
  if (score === 1) label = "Weak";
  else if (score === 2) label = "Fair";
  else if (score === 3) label = "Good";
  else if (score === 4) label = "Strong";

  return { strong, score, label, requirements };
}

/**
 * Convenience wrapper for places that only care about pass/fail.
 *
 * @param {string} password
 * @returns {boolean}
 */
export function isPasswordStrong(password) {
  return evaluatePassword(password).strong;
}
