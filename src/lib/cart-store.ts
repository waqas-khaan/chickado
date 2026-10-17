import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { brandConfig } from './brand';

export interface CartAddon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  name: string;
  image?: string | null;
  variantName?: string | null;
  addons?: CartAddon[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  notes?: string;
}

export type OrderType = 'DELIVERY' | 'PICKUP' | 'DINE_IN';

interface PromoDiscount {
  code: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number;
  calculatedDiscount: number;
}

interface CartStore {
  items: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  promo: PromoDiscount | null;
  isCartDrawerOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateNotes: (cartItemId: string, notes: string) => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  applyPromo: (promo: PromoDiscount) => void;
  removePromo: () => void;
  clearCart: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;

  // Getters
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: 'DELIVERY',
      tableNumber: '',
      promo: null,
      isCartDrawerOpen: false,

      addItem: (newItem) => {
        const sortedAddonIds = (newItem.addons || [])
          .map((a) => a.id)
          .sort()
          .join('-');
        const cartItemId = `${newItem.itemId}_${newItem.variantName || 'regular'}_${sortedAddonIds}`;

        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.cartItemId === cartItemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const existing = updated[existingIndex];
          const newQty = existing.quantity + newItem.quantity;
          updated[existingIndex] = {
            ...existing,
            quantity: newQty,
            totalPrice: existing.unitPrice * newQty,
            notes: newItem.notes || existing.notes,
          };
          set({ items: updated });
        } else {
          const itemToAdd: CartItem = {
            ...newItem,
            cartItemId,
            totalPrice: newItem.unitPrice * newItem.quantity,
          };
          set({ items: [...currentItems, itemToAdd] });
        }
      },

      removeItem: (cartItemId) => {
        set({ items: get().items.filter((i) => i.cartItemId !== cartItemId) });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        const updated = get().items.map((item) => {
          if (item.cartItemId === cartItemId) {
            return {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            };
          }
          return item;
        });
        set({ items: updated });
      },

      updateNotes: (cartItemId, notes) => {
        const updated = get().items.map((item) => {
          if (item.cartItemId === cartItemId) {
            return { ...item, notes };
          }
          return item;
        });
        set({ items: updated });
      },

      setOrderType: (orderType) => set({ orderType }),
      setTableNumber: (tableNumber) => set({ tableNumber }),

      applyPromo: (promo) => set({ promo }),
      removePromo: () => set({ promo: null }),

      clearCart: () => set({ items: [], promo: null, tableNumber: '' }),

      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),
      toggleCartDrawer: () => set({ isCartDrawerOpen: !get().isCartDrawerOpen }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      getDeliveryFee: () => {
        return get().orderType === 'DELIVERY' && get().items.length > 0
          ? brandConfig.deliveryFee
          : 0;
      },

      getDiscount: () => {
        const promo = get().promo;
        if (!promo) return 0;
        const subtotal = get().getSubtotal();
        if (promo.type === 'PERCENTAGE') {
          return Math.round((subtotal * promo.value) / 100);
        }
        return Math.min(promo.value, subtotal);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const taxable = Math.max(0, subtotal - discount);
        return Math.round(taxable * brandConfig.taxRate);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const deliveryFee = get().getDeliveryFee();
        const discount = get().getDiscount();
        const tax = get().getTax();
        return Math.max(0, subtotal - discount + deliveryFee + tax);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'chickado-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        orderType: state.orderType,
        tableNumber: state.tableNumber,
        promo: state.promo,
      }),
    }
  )
);
