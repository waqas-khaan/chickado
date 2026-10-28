import { brandConfig } from './brand';

/**
 * Format monetary values in PKR with thousand separators: e.g. "Rs 1,650"
 * Supports numbers and strings
 */
export function formatCurrency(amount: number | string | unknown): string {
  if (amount === null || amount === undefined) {
    return `${brandConfig.currency} 0`;
  }
  const numeric = typeof amount === 'number' ? amount : Number(String(amount));
  if (isNaN(numeric)) {
    return `${brandConfig.currency} 0`;
  }

  const rounded = Math.round(numeric);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${brandConfig.currency} ${formatted}`;
}

/**
 * Format phone number display
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Format date/time readable
 */
export function formatDateTime(date: string | number | Date | unknown): string {
  if (!date) return '-';
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date instanceof Date
      ? date
      : new Date(String(date));
  return new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}

/**
 * Format date only
 */
export function formatDate(date: string | number | Date | unknown): string {
  if (!date) return '-';
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date instanceof Date
      ? date
      : new Date(String(date));
  return new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}
