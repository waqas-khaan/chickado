import { z } from 'zod';

export const orderItemSchema = z.object({
  itemId: z.string().optional(),
  name: z.string().min(1, 'Item name is required'),
  variantName: z.string().optional().nullable(),
  addons: z
    .array(
      z.object({
        name: z.string(),
        price: z.number().min(0),
      })
    )
    .optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Price must be positive'),
  totalPrice: z.number().min(0),
  notes: z.string().optional().nullable(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, 'Name is required (at least 2 characters)'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  customerEmail: z.string().email().optional().nullable().or(z.literal('')),
  customerAddress: z.string().optional().nullable(),
  orderType: z.enum(['DELIVERY', 'PICKUP', 'DINE_IN']),
  tableNumber: z.string().optional().nullable(),
  source: z.enum(['WEB', 'WHATSAPP', 'POS']).default('WEB'),
  items: z.array(orderItemSchema).min(1, 'At least one item is required in the cart'),
  notes: z.string().optional().nullable(),
  promoCode: z.string().optional().nullable(),
});


export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const itemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional().nullable(),
  price: z.number().min(0, 'Price must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  image: z.string().optional().nullable(),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  variants: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().min(0),
        isDefault: z.boolean().default(false),
      })
    )
    .optional(),
  addonIds: z.array(z.string()).optional(),
});

export const promoCodeSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters').toUpperCase(),
  type: z.enum(['FIXED', 'PERCENTAGE']),
  value: z.number().min(1, 'Discount value must be at least 1'),
  minOrder: z.number().min(0).optional().nullable(),
  maxDiscount: z.number().min(0).optional().nullable(),
  maxUses: z.number().int().min(1).optional().nullable(),
  expiresAt: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});
