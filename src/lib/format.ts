import { brandConfig } from './brand';

/**
 * Format monetary values in PKR with thousand separators: e.g. "Rs 1,650"
 * Supports numbers, strings, and Prisma Decimal objects
 */
export function formatCurrency(amount: any): string {
  if (amount === null || amount === undefined) {
    return `${brandConfig.currency} 0`;
  }
  const numeric = typeof amount === 'number' ? amount : Number(amount.toString());
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
export function formatDateTime(date: any): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date);
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
export function formatDate(date: any): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}
