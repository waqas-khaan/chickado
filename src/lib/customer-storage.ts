export interface SavedCustomerInfo {
  name: string;
  phone: string;
  address?: string;
  email?: string;
}

export const CUSTOMER_INFO_STORAGE_KEY = 'chickado_customer_info';

/**
 * Retrieves the saved customer info from localStorage.
 * Falls back to the latest recent order if direct customer info hasn't been saved yet.
 */
export function getSavedCustomerInfo(): SavedCustomerInfo | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(CUSTOMER_INFO_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          name: typeof parsed.name === 'string' ? parsed.name : '',
          phone: typeof parsed.phone === 'string' ? parsed.phone : '',
          address: typeof parsed.address === 'string' ? parsed.address : '',
          email: typeof parsed.email === 'string' ? parsed.email : '',
        };
      }
    }

    // Fallback: check chickado_recent_orders if existing customer already made an order before
    const recentOrdersRaw = localStorage.getItem('chickado_recent_orders');
    if (recentOrdersRaw) {
      const recentOrders = JSON.parse(recentOrdersRaw);
      if (Array.isArray(recentOrders) && recentOrders.length > 0) {
        const lastOrder = recentOrders[0];
        if (lastOrder && (lastOrder.customerName || lastOrder.customerPhone)) {
          const fallbackInfo: SavedCustomerInfo = {
            name: lastOrder.customerName || '',
            phone: lastOrder.customerPhone || '',
            address: lastOrder.customerAddress || '',
            email: lastOrder.customerEmail || '',
          };
          // Persist it under the direct key for consistency
          localStorage.setItem(CUSTOMER_INFO_STORAGE_KEY, JSON.stringify(fallbackInfo));
          return fallbackInfo;
        }
      }
    }
  } catch (err) {
    console.error('Failed to read saved customer info:', err);
  }

  return null;
}

/**
 * Saves or updates customer info in localStorage.
 */
export function saveCustomerInfo(info: Partial<SavedCustomerInfo>): void {
  if (typeof window === 'undefined') return;

  try {
    const current = getSavedCustomerInfo() || { name: '', phone: '', address: '', email: '' };
    const updated: SavedCustomerInfo = {
      name: info.name !== undefined ? info.name.trim() : current.name,
      phone: info.phone !== undefined ? info.phone.trim() : current.phone,
      address: info.address !== undefined ? info.address.trim() : (current.address || ''),
      email: info.email !== undefined ? info.email.trim() : (current.email || ''),
    };

    localStorage.setItem(CUSTOMER_INFO_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save customer info:', err);
  }
}

