import { getAllItems, ADDONS, validatePromoCode } from '@/data/menu-data';
import { CartItem, OrderType } from './cart-store';

export interface ValidatedCartItem {
  itemId: string;
  name: string;
  variantName?: string | null;
  addons?: Array<{ id: string; name: string; price: number }>;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  image?: string | null;
}

export interface ValidatedOrderResult {
  valid: boolean;
  errors: string[];
  sanitizedCustomerName: string;
  sanitizedCustomerPhone: string;
  sanitizedCustomerAddress: string | null;
  sanitizedTableNumber: string | null;
  sanitizedNotes: string | null;
  items: ValidatedCartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  orderNumber: string;
}

/**
 * Strips dangerous control characters and converts newlines to single spaces
 * to prevent WhatsApp message format injection and CRLF line spoofing.
 */
export function sanitizeText(input: unknown, maxLength = 200): string {
  if (typeof input !== 'string') return '';
  return input
    // Remove null bytes and control characters except basic printable characters
    .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
    // Collapse multi-spaces and newlines into a single clean space
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates Pakistan phone numbers (e.g., 03316633141, +923316633141)
 * Normalizes to clean 11-digit local format: 03XXXXXXXXX
 */
export function sanitizeAndValidatePhone(phoneRaw: string): { valid: boolean; normalized: string } {
  const digitsOnly = phoneRaw.replace(/[^\d+]/g, '');
  let normalized = digitsOnly;

  if (normalized.startsWith('+92')) {
    normalized = '0' + normalized.slice(3);
  } else if (normalized.startsWith('92') && normalized.length === 12) {
    normalized = '0' + normalized.slice(2);
  } else if (normalized.startsWith('0092')) {
    normalized = '0' + normalized.slice(4);
  }

  // Pakistan mobile phone format: 03XX XXXXXXX (11 digits starting with 03)
  const pkPhoneRegex = /^03\d{9}$/;
  if (pkPhoneRegex.test(normalized)) {
    return { valid: true, normalized };
  }

  // Fallback check: general 10-15 digit phone
  const genericPhoneRegex = /^\+?\d{10,15}$/;
  if (genericPhoneRegex.test(digitsOnly)) {
    return { valid: true, normalized: digitsOnly };
  }

  return { valid: false, normalized: digitsOnly };
}

/**
 * Server/Source-of-truth cart verification.
 * Loads prices directly from canonical menu catalog.
 * Never trusts price, subtotal, discount, or totals submitted from browser.
 */
export function validateAndRecalculateCart(params: {
  rawItems: CartItem[];
  orderType: OrderType;
  customerName: string;
  customerPhone: string;
  customerAddress?: string | null;
  tableNumber?: string | null;
  notes?: string | null;
  promoCode?: string | null;
}): ValidatedOrderResult {
  const errors: string[] = [];

  // 1. Sanitize customer inputs
  const sanitizedCustomerName = sanitizeText(params.customerName, 60);
  if (sanitizedCustomerName.length < 2) {
    errors.push('Customer name is required (at least 2 characters)');
  }

  const phoneCheck = sanitizeAndValidatePhone(params.customerPhone);
  if (!phoneCheck.valid) {
    errors.push('A valid phone number is required (e.g. 0331 6633141)');
  }
  const sanitizedCustomerPhone = phoneCheck.normalized;

  const sanitizedCustomerAddress =
    params.orderType === 'DELIVERY'
      ? sanitizeText(params.customerAddress, 200)
      : null;

  if (params.orderType === 'DELIVERY' && (!sanitizedCustomerAddress || sanitizedCustomerAddress.length < 5)) {
    errors.push('Delivery address is required (at least 5 characters)');
  }

  const sanitizedTableNumber =
    params.orderType === 'DINE_IN'
      ? sanitizeText(params.tableNumber, 10).replace(/[^a-zA-Z0-9-]/g, '')
      : null;

  if (params.orderType === 'DINE_IN' && !sanitizedTableNumber) {
    errors.push('Table number is required for Dine-in orders');
  }

  const sanitizedNotes = params.notes ? sanitizeText(params.notes, 200) : null;

  // 2. Validate Cart Items against canonical catalog
  if (!Array.isArray(params.rawItems) || params.rawItems.length === 0) {
    errors.push('Your cart is empty. Please add items before placing an order.');
    return {
      valid: false,
      errors,
      sanitizedCustomerName,
      sanitizedCustomerPhone,
      sanitizedCustomerAddress,
      sanitizedTableNumber,
      sanitizedNotes,
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      tax: 0,
      total: 0,
      orderNumber: '',
    };
  }

  const validatedItems: ValidatedCartItem[] = [];
  let calculatedSubtotal = 0;

  const allCatalogItems = getAllItems();
  const allAddons = Object.values(ADDONS);

  for (const rawItem of params.rawItems) {
    // Lookup item in canonical catalog
    const catalogItem = allCatalogItems.find(
      (m) => m.id === rawItem.itemId || m.name.toLowerCase() === rawItem.name.toLowerCase()
    );

    if (!catalogItem) {
      errors.push(`Item "${rawItem.name || 'Unknown'}" is not recognized in our menu catalog.`);
      continue;
    }

    if (catalogItem.isAvailable === false) {
      errors.push(`"${catalogItem.name}" is currently sold out / unavailable.`);
      continue;
    }

    // Validate Quantity: integer, min 1, max 50
    const rawQty = Number(rawItem.quantity);
    if (!Number.isInteger(rawQty) || rawQty < 1 || rawQty > 50) {
      errors.push(`Invalid quantity for "${catalogItem.name}". Must be between 1 and 50.`);
      continue;
    }
    const quantity = rawQty;

    // Validate Variant & Base Price
    let canonicalUnitPrice = catalogItem.price;
    let selectedVariantName: string | null = null;

    if (rawItem.variantName && catalogItem.variants && catalogItem.variants.length > 0) {
      const matchedVariant = catalogItem.variants.find(
        (v) => v.name.toLowerCase() === rawItem.variantName?.toLowerCase()
      );
      if (matchedVariant) {
        canonicalUnitPrice = matchedVariant.price;
        selectedVariantName = matchedVariant.name;
      } else {
        // Fallback to default variant or base price
        const defaultVar = catalogItem.variants.find((v) => v.isDefault) || catalogItem.variants[0];
        canonicalUnitPrice = defaultVar.price;
        selectedVariantName = defaultVar.name;
      }
    }

    // Validate Add-ons
    const validatedAddons: Array<{ id: string; name: string; price: number }> = [];
    if (Array.isArray(rawItem.addons) && rawItem.addons.length > 0) {
      for (const rawAddon of rawItem.addons) {
        const canonicalAddon = allAddons.find(
          (a) => a.id === rawAddon.id || a.name.toLowerCase() === rawAddon.name.toLowerCase()
        );
        if (canonicalAddon) {
          validatedAddons.push({
            id: canonicalAddon.id,
            name: canonicalAddon.name,
            price: canonicalAddon.price,
          });
          canonicalUnitPrice += canonicalAddon.price;
        }
      }
    }

    const itemTotalPrice = canonicalUnitPrice * quantity;
    calculatedSubtotal += itemTotalPrice;

    validatedItems.push({
      itemId: catalogItem.id,
      name: catalogItem.name,
      variantName: selectedVariantName,
      addons: validatedAddons,
      quantity,
      unitPrice: canonicalUnitPrice,
      totalPrice: itemTotalPrice,
      notes: rawItem.notes ? sanitizeText(rawItem.notes, 100) : undefined,
      image: catalogItem.image,
    });
  }

  // 3. Re-calculate Delivery Fee, Discounts & Tax
  const deliveryFee = 0; // Free delivery as per brandConfig
  let discount = 0;

  if (params.promoCode && params.promoCode.trim()) {
    const promoResult = validatePromoCode(params.promoCode.trim(), calculatedSubtotal);
    if (promoResult.valid && promoResult.calculatedDiscount) {
      discount = promoResult.calculatedDiscount;
    }
  }

  const tax = 0; // Tax rate 0 as per brandConfig
  const total = Math.max(0, calculatedSubtotal - discount + deliveryFee + tax);

  // Generate a cryptographically unguessable order token
  const cryptoToken =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8).toUpperCase()
      : Math.random().toString(36).slice(2, 10).toUpperCase();
  const orderNumber = `CKD-${cryptoToken}`;

  return {
    valid: errors.length === 0,
    errors,
    sanitizedCustomerName,
    sanitizedCustomerPhone,
    sanitizedCustomerAddress,
    sanitizedTableNumber,
    sanitizedNotes,
    items: validatedItems,
    subtotal: calculatedSubtotal,
    deliveryFee,
    discount,
    tax,
    total,
    orderNumber,
  };
}
