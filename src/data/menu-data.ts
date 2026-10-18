export interface Variant {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
}

export interface ItemAddonLink {
  addon: AddonItem;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  variants?: Variant[];
  addons?: ItemAddonLink[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
  items: MenuItem[];
  _count?: {
    items: number;
  };
}

export interface PromoCode {
  code: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  isActive: boolean;
}

// 1. ADDONS
export const ADDONS: Record<string, AddonItem> = {
  extraCheese: { id: 'addon-1', name: 'Extra Cheese Slice', price: 80 },
  extraPatty: { id: 'addon-2', name: 'Extra Crispy Patty', price: 250 },
  garlicMayo: { id: 'addon-3', name: 'Garlic Mayo Dip', price: 70 },
  chipotleDip: { id: 'addon-4', name: 'Chipotle Fire Dip', price: 80 },
  jalapenos: { id: 'addon-5', name: 'Pickled Jalapenos', price: 60 },
  coleslaw: { id: 'addon-6', name: 'Fresh Coleslaw Cup', price: 90 },
};

// 2. CATEGORIES & ITEMS
export const MENU_CATEGORIES: Category[] = [
  {
    id: 'cat-burgers',
    name: 'Burgers',
    slug: 'burgers',
    description: 'Crispy fried fillets, gourmet brioche buns, fresh lettuce and secret signature sauces.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    sortOrder: 1,
    items: [
      {
        id: 'item-zinger-classic',
        name: 'Chickado Classic Zinger',
        slug: 'chickado-classic-zinger',
        description: 'Signature crispy whole chicken fillet, fresh shredded iceberg, and house mayo on toasted sesame bun.',
        price: 550,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
        variants: [
          { id: 'v1', name: 'Single Fillet', price: 550, isDefault: true },
          { id: 'v2', name: 'Double Fillet Mega', price: 790, isDefault: false },
          { id: 'v3', name: 'Fire Blaster Spicy', price: 590, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.extraPatty },
          { addon: ADDONS.jalapenos },
          { addon: ADDONS.garlicMayo },
        ],
      },
      {
        id: 'item-fiery-jalapeno',
        name: 'Fiery Jalapeno Crunch',
        slug: 'fiery-jalapeno-crunch',
        description: 'Spicy crusted fillet topped with pickled jalapenos, molten cheddar sauce, and chili crunch.',
        price: 640,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
        variants: [
          { id: 'v4', name: 'Regular Spicy', price: 640, isDefault: true },
          { id: 'v5', name: 'Double Cheese Overload', price: 740, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.chipotleDip },
        ],
      },
      {
        id: 'item-smoky-bbq',
        name: 'Smoky BBQ Tender Burger',
        slug: 'smoky-bbq-tender-burger',
        description: 'Crispy fried tenders glazed in smoky hickory BBQ sauce, caramelized onions, and swiss cheese.',
        price: 680,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 3,
        variants: [
          { id: 'v6', name: 'Standard', price: 680, isDefault: true },
          { id: 'v7', name: 'Double Stack', price: 880, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.extraPatty },
        ],
      },
    ],
  },
  {
    id: 'cat-chicken',
    name: 'Fried Chicken',
    slug: 'fried-chicken',
    description: 'Hand-breaded with 11 secret herbs and spices, fried golden brown to juicy perfection.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    sortOrder: 2,
    items: [
      {
        id: 'item-chicken-2pcs',
        name: '2 Pcs Crispy Chicken Box',
        slug: '2-pcs-crispy-chicken',
        description: 'Two pieces of golden, crispy, tender bone-in chicken served with our signature dip.',
        price: 490,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-chicken',
        category: { id: 'cat-chicken', name: 'Fried Chicken', slug: 'fried-chicken' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 1,
        variants: [
          { id: 'v8', name: 'Mild Crispy', price: 490, isDefault: true },
          { id: 'v9', name: 'Hot & Spicy', price: 520, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.garlicMayo },
          { addon: ADDONS.coleslaw },
        ],
      },
      {
        id: 'item-chicken-4pcs',
        name: '4 Pcs Golden Fried Chicken Box',
        slug: '4-pcs-golden-fried-chicken',
        description: 'Four large pieces of our secret-recipe crunchy fried chicken with 1 regular dip sauce.',
        price: 890,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-chicken',
        category: { id: 'cat-chicken', name: 'Fried Chicken', slug: 'fried-chicken' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
        variants: [
          { id: 'v10', name: 'Mild Crispy', price: 890, isDefault: true },
          { id: 'v11', name: 'Hot & Spicy', price: 930, isDefault: false },
          { id: 'v12', name: 'Half & Half (2 Mild, 2 Spicy)', price: 910, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.garlicMayo },
          { addon: ADDONS.coleslaw },
          { addon: ADDONS.chipotleDip },
        ],
      },
      {
        id: 'item-bucket-8pcs',
        name: '8 Pcs Feast Bucket',
        slug: '8-pcs-feast-bucket',
        description: 'Eight pieces of sizzling fresh crispy fried chicken, perfect for friends and family.',
        price: 1650,
        image: '/assets/chickado-feast-bucket.jpg',
        categoryId: 'cat-chicken',
        category: { id: 'cat-chicken', name: 'Fried Chicken', slug: 'fried-chicken' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3,
        variants: [
          { id: 'v13', name: 'All Mild', price: 1650, isDefault: true },
          { id: 'v14', name: 'All Spicy', price: 1690, isDefault: false },
          { id: 'v15', name: 'Half Mild / Half Spicy', price: 1670, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.garlicMayo },
          { addon: ADDONS.coleslaw },
        ],
      },
    ],
  },
  {
    id: 'cat-wings',
    name: 'Wings',
    slug: 'wings',
    description: 'Crunchy golden wings tossed in spicy buffalo, fiery peri peri or tangy honey glaze.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    sortOrder: 3,
    items: [
      {
        id: 'item-buffalo-wings',
        name: 'Hot & Spicy Buffalo Wings (6 Pcs)',
        slug: 'hot-spicy-buffalo-wings-6pcs',
        description: 'Six jumbo crispy wings smothered in rich tangy hot buffalo sauce and toasted sesame.',
        price: 490,
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-wings',
        category: { id: 'cat-wings', name: 'Wings', slug: 'wings' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
        variants: [
          { id: 'v16', name: '6 Pcs Box', price: 490, isDefault: true },
          { id: 'v17', name: '10 Pcs Mega Box', price: 780, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.garlicMayo },
          { addon: ADDONS.chipotleDip },
        ],
      },
      {
        id: 'item-honey-wings',
        name: 'Honey Glazed Crunch Wings (6 Pcs)',
        slug: 'honey-glazed-crunch-wings-6pcs',
        description: 'Crispy fried wings dipped in sticky sweet honey garlic butter glaze.',
        price: 520,
        image: '/assets/honey-glazed-wings.jpg',
        categoryId: 'cat-wings',
        category: { id: 'cat-wings', name: 'Wings', slug: 'wings' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 2,
        variants: [
          { id: 'v18', name: '6 Pcs Box', price: 520, isDefault: true },
          { id: 'v19', name: '10 Pcs Box', price: 820, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.garlicMayo },
        ],
      },
    ],
  },
  {
    id: 'cat-deals',
    name: 'Combos & Deals',
    slug: 'deals-combos',
    description: 'Best value party feasts, solo combos, and midnight hunger busters.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    sortOrder: 4,
    items: [
      {
        id: 'item-solo-deal',
        name: 'Solo Crunch Delight Deal',
        slug: 'solo-crunch-delight',
        description: '1 Chickado Classic Zinger + 1 Regular Crinkle Fries + 1 Chilled Drink (330ml).',
        price: 790,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.garlicMayo },
        ],
      },
      {
        id: 'item-duo-combo',
        name: 'Duo Mega Combo Deal',
        slug: 'duo-mega-combo',
        description: '2 Chickado Zingers + 2 Pcs Golden Fried Chicken + 1 Large Masala Fries + 2 Cold Drinks.',
        price: 1550,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.coleslaw },
          { addon: ADDONS.garlicMayo },
        ],
      },
      {
        id: 'item-family-feast',
        name: 'Family Mega Feast Deal',
        slug: 'family-mega-feast',
        description: '4 Chickado Zingers + 4 Pcs Crispy Chicken + 2 Large Crinkle Fries + 6 Pcs Wings + 1.5L Chilled Beverage.',
        price: 2950,
        image: '/assets/chickado-feast-bucket.jpg',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3,
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.garlicMayo },
          { addon: ADDONS.coleslaw },
        ],
      },
    ],
  },
  {
    id: 'cat-sides',
    name: 'Sides & Dips',
    slug: 'sides',
    description: 'Crinkle cut fries, loaded melted cheese platters, and authentic dipping sauces.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    sortOrder: 5,
    items: [
      {
        id: 'item-fries',
        name: 'Crispy Masala Crinkle Fries',
        slug: 'crispy-masala-crinkle-fries',
        description: 'Golden crinkle-cut potatoes dusted with Chickado signature spicy chaat masala.',
        price: 250,
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-sides',
        category: { id: 'cat-sides', name: 'Sides & Dips', slug: 'sides' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 1,
        variants: [
          { id: 'v20', name: 'Regular', price: 250, isDefault: true },
          { id: 'v21', name: 'Large', price: 350, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.garlicMayo },
          { addon: ADDONS.extraCheese },
        ],
      },
      {
        id: 'item-loaded-fries',
        name: 'Cheesy Chicken Loaded Fries',
        slug: 'cheesy-chicken-loaded-fries',
        description: 'Hot crinkle fries loaded with crispy chicken chunks, melted cheddar cheese, jalapenos, and chipotle mayo.',
        price: 490,
        image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-sides',
        category: { id: 'cat-sides', name: 'Sides & Dips', slug: 'sides' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
        variants: [
          { id: 'v22', name: 'Standard Bowl', price: 490, isDefault: true },
          { id: 'v23', name: 'Monster Loaded Overload', price: 680, isDefault: false },
        ],
        addons: [
          { addon: ADDONS.extraCheese },
          { addon: ADDONS.jalapenos },
        ],
      },
    ],
  },
  {
    id: 'cat-drinks',
    name: 'Drinks',
    slug: 'drinks',
    description: 'Chilled sodas, gourmet mojitos, and refreshing signature coolers.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    sortOrder: 6,
    items: [
      {
        id: 'item-soft-drink',
        name: 'Chilled Soft Drink (Can 330ml)',
        slug: 'chilled-soft-drink-330ml',
        description: 'Ice cold refreshing can of your choice: Pepsi, 7Up, Mirinda, or Diet Pepsi.',
        price: 130,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-drinks',
        category: { id: 'cat-drinks', name: 'Drinks', slug: 'drinks' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 1,
        variants: [
          { id: 'v24', name: 'Pepsi', price: 130, isDefault: true },
          { id: 'v25', name: '7Up', price: 130, isDefault: false },
          { id: 'v26', name: 'Mirinda Orange', price: 130, isDefault: false },
          { id: 'v27', name: 'Diet Pepsi', price: 130, isDefault: false },
        ],
      },
      {
        id: 'item-mint-margarita',
        name: 'Zesty Mint Margarita Cooler',
        slug: 'zesty-mint-margarita',
        description: 'Fresh garden mint, crushed ice, lemon zest and bubbly soda for instant refreshment.',
        price: 290,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-drinks',
        category: { id: 'cat-drinks', name: 'Drinks', slug: 'drinks' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: 'cat-desserts',
    name: 'Desserts',
    slug: 'desserts',
    description: 'Warm chocolate molten cake, soft serve vanilla sundaes and sweet cravings.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    sortOrder: 7,
    items: [
      {
        id: 'item-molten-cake',
        name: 'Warm Chocolate Molten Lava Cake',
        slug: 'chocolate-molten-lava-cake',
        description: 'Decadent dark chocolate cake with a rich molten chocolate center flowing out on first bite.',
        price: 450,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
        categoryId: 'cat-desserts',
        category: { id: 'cat-desserts', name: 'Desserts', slug: 'desserts' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
      },
    ],
  },
];

// Enrich categories with _count for carousel and cards
MENU_CATEGORIES.forEach((cat) => {
  cat._count = { items: cat.items.length };
});

// 3. PROMO CODES
export const PROMO_CODES: PromoCode[] = [
  {
    code: 'CHICK100',
    type: 'FIXED',
    value: 100,
    minOrder: 1000,
    isActive: true,
  },
  {
    code: 'CRISPY20',
    type: 'PERCENTAGE',
    value: 20,
    minOrder: 1200,
    maxDiscount: 350,
    isActive: true,
  },
  {
    code: 'WELCOME50',
    type: 'FIXED',
    value: 50,
    minOrder: 500,
    isActive: true,
  },
];

// Helper functions for easy frontend access
export function getAllCategories(): Category[] {
  return MENU_CATEGORIES;
}

export function getAllItems(): MenuItem[] {
  return MENU_CATEGORIES.flatMap((c) => c.items);
}

export function getFeaturedItems(): MenuItem[] {
  return getAllItems()
    .filter((item) => item.isFeatured && item.isAvailable)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 6);
}

export function getDeals(): MenuItem[] {
  const dealsCat = MENU_CATEGORIES.find((c) => c.slug === 'deals-combos');
  return (dealsCat?.items || []).filter((i) => i.isAvailable).slice(0, 3);
}

export function getItemBySlug(slug: string): MenuItem | undefined {
  return getAllItems().find((item) => item.slug === slug);
}

export function getItemById(id: string): MenuItem | undefined {
  return getAllItems().find((item) => item.id === id);
}

export function validatePromoCode(
  code: string,
  subtotal: number
): { valid: boolean; promo?: PromoCode; calculatedDiscount?: number; error?: string } {
  const cleanCode = code.trim().toUpperCase();
  const promo = PROMO_CODES.find((p) => p.code === cleanCode && p.isActive);

  if (!promo) {
    return { valid: false, error: 'Invalid promo code' };
  }

  if (subtotal < promo.minOrder) {
    return {
      valid: false,
      error: `Minimum order amount of Rs ${promo.minOrder.toLocaleString()} required for this code`,
    };
  }

  let calculatedDiscount = 0;
  if (promo.type === 'PERCENTAGE') {
    calculatedDiscount = Math.round((subtotal * promo.value) / 100);
    if (promo.maxDiscount) {
      calculatedDiscount = Math.min(calculatedDiscount, promo.maxDiscount);
    }
  } else {
    calculatedDiscount = promo.value;
  }

  return {
    valid: true,
    promo,
    calculatedDiscount,
  };
}
