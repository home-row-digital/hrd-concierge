import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * A safe utility to format any E.164 string.
 * Defaults to National format if it's a US number,
 * otherwise defaults to International.
 */
export function formatPhoneNumber(phone: string | undefined | null): string {
  if (!phone) return '';

  const phoneNumber = parsePhoneNumberFromString(phone);

  if (!phoneNumber) {
    return phone; // Return as-is if it's not a valid phone string
  }

  // Logic: If it's US/Canada, show (XXX) XXX-XXXX
  // Otherwise, show +CC XXXXX XXXXX
  return phoneNumber.country === 'US'
    ? phoneNumber.formatNational()
    : phoneNumber.formatInternational();
}
