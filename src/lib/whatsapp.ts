import { brandConfig } from './brand';
import { formatCurrency } from './format';
import { sanitizeText } from './cart-validation';

export interface WhatsAppOrderItem {
  name: string;
  variantName?: string | null;
  addons?: Array<{ name: string; price: number }>;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string | null;
  image?: string | null;
}

export interface WhatsAppOrderDetails {
  orderNumber?: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string | null;
  orderType: 'DELIVERY' | 'PICKUP' | 'DINE_IN';
  tableNumber?: string | null;
  items: WhatsAppOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  notes?: string | null;
}

/**
 * Ensures an image URL is fully qualified with domain so WhatsApp renders the rich photo preview.
 */
export function getFullImageUrl(img?: string | null): string {
  if (!img) return '';
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : brandConfig.appUrl;
  const cleanPath = img.startsWith('/') ? img : `/${img}`;
  return `${origin}${cleanPath}`;
}

/**
 * Builds the exact required WhatsApp text message for an order with strict sanitization.
 */
export function buildWhatsAppOrderMessage(order: WhatsAppOrderDetails): string {
  const sanitizedTable = order.tableNumber ? sanitizeText(order.tableNumber, 10) : null;
  const typeLabels: Record<string, { icon: string; label: string }> = {
    DELIVERY: { icon: '🛵', label: 'Delivery' },
    PICKUP: { icon: '🛍️', label: 'Pickup / Takeaway' },
    DINE_IN: { icon: '🍽️', label: `Dine-in${sanitizedTable ? ` (Table #${sanitizedTable})` : ''}` },
  };

  const typeInfo = typeLabels[order.orderType] || { icon: '🛵', label: sanitizeText(order.orderType, 20) };

  const lines: string[] = [
    `🍗 *${brandConfig.name}*`,
  ];

  if (order.orderNumber) {
    lines.push(`🔖 Ref: ${sanitizeText(order.orderNumber, 20)}`);
  }

  lines.push(`👤 Name: ${sanitizeText(order.customerName, 60)}`);
  lines.push(`📞 Phone: ${sanitizeText(order.customerPhone, 20)}`);

  if (order.orderType === 'DELIVERY' && order.customerAddress) {
    lines.push(`📍 Address: ${sanitizeText(order.customerAddress, 200)}`);
  }

  lines.push(`${typeInfo.icon} Type: ${typeInfo.label}`);
  lines.push('------------------');
  lines.push('*ORDER ITEMS:*');

  order.items.forEach((item, index) => {
    let itemDescription = sanitizeText(item.name, 60);
    if (item.variantName) {
      itemDescription += ` (${sanitizeText(item.variantName, 30)})`;
    }
    if (item.addons && item.addons.length > 0) {
      const addonsStr = item.addons.map((a) => sanitizeText(a.name, 30)).join(', ');
      itemDescription += ` [Add-ons: ${addonsStr}]`;
    }

    const unitPriceFormatted = formatCurrency(Math.max(0, Number(item.unitPrice) || 0));
    const lineTotalFormatted = formatCurrency(Math.max(0, Number(item.totalPrice) || 0));
    const safeQty = Math.max(1, Math.min(50, Math.floor(Number(item.quantity) || 1)));

    lines.push(`${index + 1}) *${itemDescription}* x${safeQty}`);
    lines.push(`   Price: ${unitPriceFormatted} each | Subtotal: ${lineTotalFormatted}`);

    if (item.notes) {
      lines.push(`   ↳ Note: ${sanitizeText(item.notes, 100)}`);
    }
  });

  lines.push('------------------');
  lines.push(`Subtotal: ${formatCurrency(Math.max(0, Number(order.subtotal) || 0))}`);

  if (order.orderType === 'DELIVERY') {
    lines.push(`Delivery: ${order.deliveryFee > 0 ? formatCurrency(order.deliveryFee) : 'Free Delivery'}`);
  }

  if (order.discount > 0) {
    lines.push(`Discount: -${formatCurrency(order.discount)}`);
  }

  if (order.tax > 0) {
    lines.push(`Tax: ${formatCurrency(order.tax)}`);
  }

  lines.push(`*Total: ${formatCurrency(Math.max(0, Number(order.total) || 0))}*`);

  if (order.notes && order.notes.trim()) {
    lines.push(`📝 Notes: ${sanitizeText(order.notes, 200)}`);
  }

  return lines.join('\n');
}

export interface SingleItemOrderDetails {
  name: string;
  price: number;
  variantName?: string | null;
  addons?: Array<{ name: string; price: number }>;
  quantity: number;
  totalPrice?: number;
  notes?: string | null;
  image?: string | null;
}

/**
 * Builds text message for a single item order with strict sanitization.
 */
export function buildSingleItemWhatsAppMessage(item: SingleItemOrderDetails): string {
  const lines: string[] = [
    `🍗 *${brandConfig.name}*`,
  ];

  let itemTitle = sanitizeText(item.name, 60);
  if (item.variantName) {
    itemTitle += ` (${sanitizeText(item.variantName, 30)})`;
  }
  if (item.addons && item.addons.length > 0) {
    const addonsStr = item.addons.map((a) => sanitizeText(a.name, 30)).join(', ');
    itemTitle += ` [Add-ons: ${addonsStr}]`;
  }

  const safeQty = Math.max(1, Math.min(50, Math.floor(Number(item.quantity) || 1)));
  const safeUnitPrice = Math.max(0, Number(item.price) || 0);
  const effectiveTotal = item.totalPrice || safeUnitPrice * safeQty;

  lines.push(`📌 Item: *${itemTitle}*`);
  lines.push(`🔢 Quantity: ${safeQty}`);
  lines.push(`💰 Price: ${formatCurrency(safeUnitPrice)} each | Total: ${formatCurrency(effectiveTotal)}`);

  if (item.notes && item.notes.trim()) {
    lines.push(`📝 Note: ${sanitizeText(item.notes, 100)}`);
  }

  lines.push('------------------');
  lines.push(`Hi ${brandConfig.name}! I would like to order this item. Please confirm availability and delivery time.`);

  return lines.join('\n');
}

/**
 * Detects if the current user agent is on an iOS device (iPhone, iPad, iPod)
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isApple = /iPhone|iPad|iPod/i.test(ua);
  const isAppleTouchMac =
    /Macintosh/i.test(ua) &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 1;
  return isApple || isAppleTouchMac;
}

/**
 * Detects if the current user agent is on a mobile device (Android, iOS, etc.)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return isIOS() || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

/**
 * Generate a direct WhatsApp URL optimized for the user's specific platform:
 * - On iOS (iPhone / iPad in Safari, Chrome, etc.): Uses Apple Universal Link
 *   `https://api.whatsapp.com/send?phone=...&text=...` which iOS natively intercepts
 *   to launch the WhatsApp app without "Safari cannot open page because address is invalid" errors.
 * - On Android & Desktop: Uses `whatsapp://send?phone=...&text=...` to launch the app directly.
 */
export function buildDirectWhatsAppUrl(phone: string, text?: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const encodedText = text ? encodeURIComponent(text) : '';
  const textQuery = encodedText ? `&text=${encodedText}` : '';

  if (typeof window !== 'undefined' && isIOS()) {
    return `https://api.whatsapp.com/send?phone=${cleanPhone}${textQuery}`;
  }

  return `whatsapp://send?phone=${cleanPhone}${textQuery}`;
}

/**
 * Programmatically opens WhatsApp directly in the native application
 * without opening intermediate web landing pages or causing browser error dialogs.
 */
export function openWhatsAppDirectly(phone: string, text?: string): void {
  if (typeof window === 'undefined') return;

  const cleanPhone = phone.replace(/[^\d]/g, '');
  const encodedText = text ? encodeURIComponent(text) : '';
  const textQuery = encodedText ? `&text=${encodedText}` : '';

  if (isIOS()) {
    // On iOS (Safari & Chrome on iPhone), Universal Links must be triggered via window.location
    window.location.href = `https://api.whatsapp.com/send?phone=${cleanPhone}${textQuery}`;
    return;
  }

  const appUrl = `whatsapp://send?phone=${cleanPhone}${textQuery}`;
  try {
    const link = document.createElement('a');
    link.href = appUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    window.location.href = appUrl;
  }
}

/**
 * Generate the direct WhatsApp order URL.
 */
export function getWhatsAppOrderUrl(order: WhatsAppOrderDetails): string {
  const message = buildWhatsAppOrderMessage(order);
  return buildDirectWhatsAppUrl(brandConfig.whatsappCleanNumber, message);
}

/**
 * Generate a single-item direct WhatsApp order URL without item pictures.
 */
export function getSingleItemWhatsAppUrl(item: SingleItemOrderDetails): string {
  const message = buildSingleItemWhatsAppMessage(item);
  return buildDirectWhatsAppUrl(brandConfig.whatsappCleanNumber, message);
}

/**
 * Generate a simple direct chat WhatsApp link
 */
export function getWhatsAppChatUrl(customMessage?: string): string {
  const defaultMsg = `Hi ${brandConfig.name}, I would like to check your menu and place an order!`;
  return buildDirectWhatsAppUrl(brandConfig.whatsappCleanNumber, customMessage || defaultMsg);
}
