/**
 * Production-Grade Clinical Form Validation & Input Sanitization
 */

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$|^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  NPI_REGEX: /^\d{10}$/,
  POSTAL_CODE_REGEX: /^\d{5}(-\d{4})?$|^[A-Z0-9]{3,10}$/i,
};

/**
 * Validates whether string is non-empty after trimming
 */
export function validateRequired(value: unknown, fieldName = 'This field'): string | null {
  if (value === undefined || value === null || String(value).trim() === '') {
    return `${fieldName} is required.`;
  }
  return null;
}

/**
 * Validates email format
 */
export function validateEmail(email: string): string | null {
  if (!email || !email.trim()) return 'Email address is required.';
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid clinical email address.';
  }
  return null;
}

/**
 * Validates telephone number
 */
export function validatePhone(phone: string): string | null {
  if (!phone || !phone.trim()) return 'Phone number is required.';
  const sanitized = phone.replace(/[\s()-]/g, '');
  if (!/^\+?\d{7,15}$/.test(sanitized)) {
    return 'Please enter a valid phone number (7 to 15 digits).';
  }
  return null;
}

/**
 * Validates numeric range
 */
export function validateNumber(
  val: unknown,
  fieldName = 'Value',
  min = 0,
  max = Number.MAX_SAFE_INTEGER
): string | null {
  const num = Number(val);
  if (isNaN(num)) return `${fieldName} must be a valid number.`;
  if (num < min) return `${fieldName} cannot be less than ${min}.`;
  if (num > max) return `${fieldName} cannot exceed ${max}.`;
  return null;
}

/**
 * Sanitizes user input against Cross-Site Scripting (XSS)
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates ISO date or YYYY-MM-DD
 */
export function validateDate(dateStr: string, fieldName = 'Date'): string | null {
  if (!dateStr || !dateStr.trim()) return `${fieldName} is required.`;
  const timestamp = Date.parse(dateStr);
  if (isNaN(timestamp)) return `Please provide a valid ${fieldName.toLowerCase()}.`;
  return null;
}
