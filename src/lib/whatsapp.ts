import { brandConfig } from './brand';
import { formatCurrency } from './format';

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
      : 'https://chickado.falconsoftwares.com';
  const cleanPath = img.startsWith('/') ? img : `/${img}`;
  return `${origin}${cleanPath}`;
}

/**
 * Builds the exact required WhatsApp text message for an order.
 */
export function buildWhatsAppOrderMessage(order: WhatsAppOrderDetails): string {
  const typeLabels: Record<string, { icon: string; label: string }> = {
    DELIVERY: { icon: '🛵', label: 'Delivery' },
    PICKUP: { icon: '🛍️', label: 'Pickup / Takeaway' },
    DINE_IN: { icon: '🍽️', label: `Dine-in${order.tableNumber ? ` (Table #${order.tableNumber})` : ''}` },
  };

  const typeInfo = typeLabels[order.orderType] || { icon: '🛵', label: order.orderType };

  const lines: string[] = [
    `🍗 *${brandConfig.name}*`,
  ];

  lines.push(`👤 Name: ${order.customerName}`);
  lines.push(`📞 Phone: ${order.customerPhone}`);

  if (order.orderType === 'DELIVERY' && order.customerAddress) {
    lines.push(`📍 Address: ${order.customerAddress}`);
  }

  lines.push(`${typeInfo.icon} Type: ${typeInfo.label}`);
  lines.push('------------------');
  lines.push('*ORDER ITEMS:*');

  order.items.forEach((item, index) => {
    let itemDescription = item.name;
    if (item.variantName) {
      itemDescription += ` (${item.variantName})`;
    }
    if (item.addons && item.addons.length > 0) {
      const addonsStr = item.addons.map((a) => a.name).join(', ');
      itemDescription += ` [Add-ons: ${addonsStr}]`;
    }

    const unitPriceFormatted = formatCurrency(item.unitPrice);
    const lineTotalFormatted = formatCurrency(item.totalPrice);

    lines.push(`${index + 1}) *${itemDescription}* x${item.quantity}`);
    lines.push(`   Price: ${unitPriceFormatted} each | Subtotal: ${lineTotalFormatted}`);
    
    if (item.notes) {
      lines.push(`   ↳ Note: ${item.notes}`);
    }
  });

  lines.push('------------------');
  lines.push(`Subtotal: ${formatCurrency(order.subtotal)}`);

  if (order.orderType === 'DELIVERY') {
    lines.push(`Delivery: ${formatCurrency(order.deliveryFee)}`);
  }

  if (order.discount > 0) {
    lines.push(`Discount: -${formatCurrency(order.discount)}`);
  }

  if (order.tax > 0) {
    lines.push(`Tax: ${formatCurrency(order.tax)}`);
  }

  lines.push(`*Total: ${formatCurrency(order.total)}*`);

  if (order.notes && order.notes.trim()) {
    lines.push(`📝 Notes: ${order.notes.trim()}`);
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
 * Builds text message for a single item order.
 */
export function buildSingleItemWhatsAppMessage(item: SingleItemOrderDetails): string {
  const lines: string[] = [
    `🍗 *${brandConfig.name}*`,
  ];

  let itemTitle = item.name;
  if (item.variantName) {
    itemTitle += ` (${item.variantName})`;
  }
  if (item.addons && item.addons.length > 0) {
    const addonsStr = item.addons.map((a) => a.name).join(', ');
    itemTitle += ` [Add-ons: ${addonsStr}]`;
  }

  const effectiveTotal = item.totalPrice || item.price * item.quantity;

  lines.push(`📌 Item: *${itemTitle}*`);
  lines.push(`🔢 Quantity: ${item.quantity}`);
  lines.push(`💰 Price: ${formatCurrency(item.price)} each | Total: ${formatCurrency(effectiveTotal)}`);

  if (item.notes && item.notes.trim()) {
    lines.push(`📝 Note: ${item.notes.trim()}`);
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
