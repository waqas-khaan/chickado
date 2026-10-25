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
  isComingSoon?: boolean;
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

// 2. CATEGORIES & ITEMS MATCHING CHICKADO OFFICIAL MENU
export const MENU_CATEGORIES: Category[] = [
  {
    id: 'cat-deals',
    name: 'Combos & Deals',
    slug: 'deals-combos',
    description: 'Signature Chickado combo boxes, burger duo meals, kids meals, and oven-fresh pizza feast bundles.',
    image: '/assets/menu/combos/Chickado%20Meal%20Box.webp',
    sortOrder: 1,
    items: [
      {
        id: 'deal-zinger-combo',
        name: 'Zinger Combo',
        slug: 'zinger-combo',
        description: '1 Zinger Burger, 1 Regular Fries, 1 Regular Drink.',
        price: 770,
        image: '/assets/menu/combos/Zinger%20Combo.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
      },
      {
        id: 'deal-chickado-crispy-box',
        name: 'Chickado Crispy Box',
        slug: 'chickado-crispy-box',
        description: '2 Chicken Broast Pcs, 1 Regular Fries, 1 Regular Drink.',
        price: 850,
        image: '/assets/menu/combos/Chickado%20Crispy%20Box.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
      },
      {
        id: 'deal-chickado-meal-box',
        name: 'Chickado Meal Box',
        slug: 'chickado-meal-box',
        description: '1 Zinger Burger, 1 Chicken Broast Pcs, 1 Regular Fries, 1 Regular Drink.',
        price: 1020,
        image: '/assets/menu/combos/Chickado%20Meal%20Box.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3,
      },
      {
        id: 'deal-crunch-box',
        name: 'Crunch Box',
        slug: 'crunch-box',
        description: '1 Chicken Broast Pcs, 1 Crunch Burger, 1 Regular Drink.',
        price: 650,
        image: '/assets/menu/combos/Crunch%20Box.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 4,
      },
      {
        id: 'deal-chickado-duo-box',
        name: 'Chickado Duo Box',
        slug: 'chickado-duo-box',
        description: '4 Chicken Broast Pcs, 1 Regular Fries, 2 Regular Drinks.',
        price: 1350,
        image: '/assets/menu/combos/Chickado%20Duo%20Box.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 5,
      },
      {
        id: 'deal-extreme-duo-meal',
        name: 'Extreme Duo Meal',
        slug: 'extreme-duo-meal',
        description: '2 Zinger Burgers, 2 Regular Fries, 2 Regular Drinks.',
        price: 1350,
        image: '/assets/menu/combos/Extreme%20Duo%20Meal.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 6,
      },
      {
        id: 'deal-grill-duo-deal-1',
        name: 'Grill Duo Deal 1',
        slug: 'grill-duo-deal-1',
        description: '2 Single Patty Grill Burgers, 2 Regular Fries, 2 Regular Drinks.',
        price: 1600,
        image: '/assets/menu/combos/Grill%20Duo%20Deal%201.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 7,
      },
      {
        id: 'deal-grill-duo-deal-2',
        name: 'Grill Duo Deal 2',
        slug: 'grill-duo-deal-2',
        description: '2 Double Patty Grill Burgers, 2 Regular Fries, 2 Regular Drinks.',
        price: 2000,
        image: '/assets/menu/combos/Grill%20Duo%20Deal%202.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 8,
      },
      {
        id: 'deal-baby-meal-1',
        name: 'Baby Meal 1',
        slug: 'baby-meal-1',
        description: '4 Tempura Nuggets, 1 Regular Fries, 1 Slice Juice.',
        price: 520,
        image: '/assets/menu/combos/Baby%20Meal%201.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 9,
      },
      {
        id: 'deal-baby-meal-2',
        name: 'Baby Meal 2',
        slug: 'baby-meal-2',
        description: '1 Crispy Burger, 1 Regular Fries, 1 Regular Drink.',
        price: 550,
        image: '/assets/menu/combos/Baby%20Meal%202.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 10,
      },
      {
        id: 'deal-single-strike',
        name: 'Single Strike Pizza Combo',
        slug: 'single-strike-pizza-combo',
        description: '1 Small Pizza, 1 Regular Drink.',
        price: 600,
        image: '/assets/menu/combos/Single%20Strike.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 11,
      },
      {
        id: 'deal-chickado-couple',
        name: 'Chickado Couple Pizza Combo',
        slug: 'chickado-couple-pizza-combo',
        description: '1 Medium Pizza, 6 Pcs Baked Wings, 2 Regular Drinks.',
        price: 1600,
        image: '/assets/menu/combos/Chickado%20Couple.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 12,
      },
      {
        id: 'deal-chickado-squad',
        name: 'Chickado Squad Pizza Feast',
        slug: 'chickado-squad-pizza-feast',
        description: '1 Large Pizza, 8 Pcs Baked Wings, 1.5 Litre Drink.',
        price: 2150,
        image: '/assets/menu/combos/Chickado%20Squad.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 13,
      },
      {
        id: 'deal-twin-box',
        name: 'Twin Box Pizza Combo',
        slug: 'twin-box-pizza-combo',
        description: '2 Half Large Pizzas, 6 Pcs Oven Baked Wings, 1 Regular Fries, 2 Dip Sauces.',
        price: 2100,
        image: '/assets/menu/combos/Twin%20Box.webp',
        categoryId: 'cat-deals',
        category: { id: 'cat-deals', name: 'Combos & Deals', slug: 'deals-combos' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 14,
      },
    ],
  },
  {
    id: 'cat-pizzas',
    name: 'Pizzas',
    slug: 'pizzas',
    description: 'Freshly baked stone-oven crust loaded with mughlai chicken, kebab bites, mozzarella and herbs.',
    image: '/assets/menu/pizza/Crown%20crust.webp',
    sortOrder: 2,
    items: [
      {
        id: 'pizza-crown-crust',
        name: 'Crown Crust Pizza',
        slug: 'crown-crust-pizza',
        description: 'A flavourful special sauce with mughlai tikka topping, capsicum, onion and black olives.',
        price: 650,
        image: '/assets/menu/pizza/Crown%20crust.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
        variants: [
          { id: 'cc-s', name: 'Small (S)', price: 650, isDefault: true },
          { id: 'cc-m', name: 'Medium (M)', price: 1350, isDefault: false },
          { id: 'cc-l', name: 'Large (L)', price: 1800, isDefault: false },
          { id: 'cc-xl', name: 'Extra Large (XL)', price: 2600, isDefault: false },
        ],
      },
      {
        id: 'pizza-chickado-special',
        name: 'Chickado Special Pizza',
        slug: 'chickado-special-pizza',
        description: 'Loaded with cheese, chicken, capsicum, jalapenos, mushroom sweet corn, green olives and special white sauce.',
        price: 550,
        image: '/assets/menu/pizza/Chickado%20special.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
        variants: [
          { id: 'cs-s', name: 'Small (S)', price: 550, isDefault: true },
          { id: 'cs-m', name: 'Medium (M)', price: 1350, isDefault: false },
          { id: 'cs-l', name: 'Large (L)', price: 1700, isDefault: false },
          { id: 'cs-xl', name: 'Extra Large (XL)', price: 2500, isDefault: false },
        ],
      },
      {
        id: 'pizza-behari-kebab',
        name: 'Behari Kebab Pizza',
        slug: 'behari-kebab-pizza',
        description: 'Loaded with cheese, tikka chicken, juicy kebab, sweet corn, capsicum, black olives.',
        price: 600,
        image: '/assets/menu/pizza/Behari%20kebab.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3,
        variants: [
          { id: 'bk-s', name: 'Small (S)', price: 600, isDefault: true },
          { id: 'bk-m', name: 'Medium (M)', price: 1300, isDefault: false },
          { id: 'bk-l', name: 'Large (L)', price: 1700, isDefault: false },
          { id: 'bk-xl', name: 'Extra Large (XL)', price: 2500, isDefault: false },
        ],
      },
      {
        id: 'pizza-cheese-lover',
        name: 'Cheese Lover Pizza',
        slug: 'cheese-lover-pizza',
        description: 'Special red pizza sauce and flavourful mix cheese.',
        price: 400,
        image: '/assets/menu/pizza/cheese%20lover.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 4,
        variants: [
          { id: 'cl-s', name: 'Small (S)', price: 400, isDefault: true },
          { id: 'cl-m', name: 'Medium (M)', price: 900, isDefault: false },
          { id: 'cl-l', name: 'Large (L)', price: 1300, isDefault: false },
          { id: 'cl-xl', name: 'Extra Large (XL)', price: 2000, isDefault: false },
        ],
      },
      {
        id: 'pizza-stuff-kebab',
        name: 'Stuff Kebab Pizza',
        slug: 'stuff-kebab-pizza',
        description: 'Special sauce, kebab dip, mix cheese, capsicum, green olives, special flavour toppings.',
        price: 1400,
        image: '/assets/menu/pizza/Stuff%20kebab.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 5,
        variants: [
          { id: 'sk-m', name: 'Medium (M)', price: 1400, isDefault: true },
          { id: 'sk-l', name: 'Large (L)', price: 2000, isDefault: false },
          { id: 'sk-xl', name: 'Extra Large (XL)', price: 2750, isDefault: false },
        ],
      },
      {
        id: 'pizza-malai-tikka',
        name: 'Malai Tikka Pizza',
        slug: 'malai-tikka-pizza',
        description: 'Special white sauce malai tikka chicken mix cheese black olives capsicum and onion.',
        price: 500,
        image: '/assets/menu/pizza/Chickado%20special.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 6,
        variants: [
          { id: 'mt-s', name: 'Small (S)', price: 500, isDefault: true },
          { id: 'mt-m', name: 'Medium (M)', price: 1100, isDefault: false },
          { id: 'mt-l', name: 'Large (L)', price: 1500, isDefault: false },
          { id: 'mt-xl', name: 'Extra Large (XL)', price: 2150, isDefault: false },
        ],
      },
      {
        id: 'pizza-chicken-extreme',
        name: 'Chicken Extreme Pizza',
        slug: 'chicken-extreme-pizza',
        description: 'Special sauce, mix cheese, black Olives, onion, capsicum, and two types of special chicken toppings.',
        price: 500,
        image: '/assets/menu/pizza/Extereme%20pizza.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 7,
        variants: [
          { id: 'ce-s', name: 'Small (S)', price: 500, isDefault: true },
          { id: 'ce-m', name: 'Medium (M)', price: 1100, isDefault: false },
          { id: 'ce-l', name: 'Large (L)', price: 1500, isDefault: false },
          { id: 'ce-xl', name: 'Extra Large (XL)', price: 2250, isDefault: false },
        ],
      },
      {
        id: 'pizza-chicken-tikka',
        name: 'Chicken Tikka Pizza',
        slug: 'chicken-tikka-pizza',
        description: 'Made with pizza sauce mix cheese tikka chicken and onions.',
        price: 480,
        image: '/assets/menu/pizza/Chixken%20tikka.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 8,
        variants: [
          { id: 'ct-s', name: 'Small (S)', price: 480, isDefault: true },
          { id: 'ct-m', name: 'Medium (M)', price: 1100, isDefault: false },
          { id: 'ct-l', name: 'Large (L)', price: 1450, isDefault: false },
          { id: 'ct-xl', name: 'Extra Large (XL)', price: 2100, isDefault: false },
        ],
      },
      {
        id: 'pizza-fajita',
        name: 'Fajita Pizza',
        slug: 'fajita-pizza',
        description: 'Special pizza red sauce cheese mix tikka chicken, capsicum and jalapenos.',
        price: 480,
        image: '/assets/menu/pizza/Fajita.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 9,
        variants: [
          { id: 'fj-s', name: 'Small (S)', price: 480, isDefault: true },
          { id: 'fj-m', name: 'Medium (M)', price: 1100, isDefault: false },
          { id: 'fj-l', name: 'Large (L)', price: 1450, isDefault: false },
          { id: 'fj-xl', name: 'Extra Large (XL)', price: 2100, isDefault: false },
        ],
      },
      {
        id: 'pizza-supreme',
        name: 'Supreme Pizza',
        slug: 'supreme-pizza',
        description: 'Featuring smoky tikka chicken special pizza sauce capsicum black olives mushrooms.',
        price: 480,
        image: '/assets/menu/pizza/Supreme.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 10,
        variants: [
          { id: 'sp-s', name: 'Small (S)', price: 480, isDefault: true },
          { id: 'sp-m', name: 'Medium (M)', price: 1100, isDefault: false },
          { id: 'sp-l', name: 'Large (L)', price: 1450, isDefault: false },
          { id: 'sp-xl', name: 'Extra Large (XL)', price: 2150, isDefault: false },
        ],
      },
      {
        id: 'pizza-pepperoni-mushroom',
        name: 'Pepperoni Mushroom Pizza',
        slug: 'pepperoni-mushroom-pizza',
        description: 'Authentic pizza red sauce tantalizing mix cheese beef pepperoni mushrooms and black olives.',
        price: 500,
        image: '/assets/menu/pizza/Beef%20pepperoni.webp',
        categoryId: 'cat-pizzas',
        category: { id: 'cat-pizzas', name: 'Pizzas', slug: 'pizzas' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 11,
        variants: [
          { id: 'pm-s', name: 'Small (S)', price: 500, isDefault: true },
          { id: 'pm-m', name: 'Medium (M)', price: 1150, isDefault: false },
          { id: 'pm-l', name: 'Large (L)', price: 1550, isDefault: false },
          { id: 'pm-xl', name: 'Extra Large (XL)', price: 2200, isDefault: false },
        ],
      },
    ],
  },
  {
    id: 'cat-burgers',
    name: 'Gourmet Burgers',
    slug: 'burgers',
    description: 'Fresh grilled chicken fillets, 100% pure smashed beef patties, brioche buns, and secret sauces.',
    image: '/assets/menu/burger/White%20house%20burger.webp',
    sortOrder: 3,
    items: [
      {
        id: 'burger-white-house',
        name: 'White House Burger (Double)',
        slug: 'white-house-burger',
        description: 'Double grilled juicy chicken fillets with cheese slice and special mild sauce.',
        price: 980,
        image: '/assets/menu/burger/White%20house%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
      },
      {
        id: 'burger-emmental',
        name: 'Emmental Burger',
        slug: 'emmental-burger',
        description: 'Double chicken grilled juicy fillets cheese slice with mouth watering tangy red sauce.',
        price: 980,
        image: '/assets/menu/burger/Emmental%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
      },
      {
        id: 'burger-tangy-tank',
        name: 'Tangy Tank Burger',
        slug: 'tangy-tank-burger',
        description: 'Single chicken grilled fillet tangy sauce and cheese slice.',
        price: 670,
        image: '/assets/menu/burger/Tangy%20tang%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3,
      },
      {
        id: 'burger-filler-shot',
        name: 'White House Filler Shot Burger',
        slug: 'white-house-filler-shot-burger',
        description: 'Filler shot single fillet of grilled juicy chicken white sauce cheese slice.',
        price: 620,
        image: '/assets/menu/burger/Filler%20shot%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 4,
      },
      {
        id: 'burger-epic-shot',
        name: 'Epic Shot Beef Burger',
        slug: 'epic-shot-beef-burger',
        description: 'Single juicy grilled beef patty with cheese slice and tangy sauce.',
        price: 650,
        image: '/assets/menu/burger/Epic%20shot%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 5,
      },
      {
        id: 'burger-havana',
        name: 'Havana Beef Burger',
        slug: 'havana-beef-burger',
        description: 'Single grilled beef patty with cheese slice and smoky BBQ sauce.',
        price: 650,
        image: '/assets/menu/burger/Epic%20shot%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 6,
      },
      {
        id: 'burger-royal-beast',
        name: 'Royal Beast Double Beef Burger',
        slug: 'royal-beast-double-beef-burger',
        description: 'Double grilled juicy beef patties double cheese slice dill pickles and smoky BBQ sauce.',
        price: 980,
        image: '/assets/menu/burger/Royal%20beast%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 7,
      },
      {
        id: 'burger-waldorf',
        name: 'Waldorf Double Beef Burger',
        slug: 'waldorf-double-beef-burger',
        description: 'Double grilled juicy beef patties double cheese slices special tangy sauce and red jalapenos.',
        price: 980,
        image: '/assets/menu/burger/Waldorf%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 8,
      },
      {
        id: 'burger-american-cheese',
        name: 'American Cheese Double Beef Burger',
        slug: 'american-cheese-double-beef-burger',
        description: 'Double grilled juicy and flavourful beef patties double cheese slice and special cheese sauce.',
        price: 1020,
        image: '/assets/menu/burger/American%20cheese.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 9,
      },
      {
        id: 'burger-classic-zinger',
        name: 'Chickado Classic Zinger',
        slug: 'chickado-classic-zinger',
        description: 'Crispy whole chicken breast fillet, shredded iceberg lettuce, and spicy mayo on toasted bun.',
        price: 480,
        image: '/assets/menu/burger/Zinger%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 10,
      },
      {
        id: 'burger-mighty-zinger',
        name: 'Mighty Zinger Mega Burger',
        slug: 'mighty-zinger-mega-burger',
        description: 'Double crunchy zinger fillets, double cheddar slices, spicy sauce, and iceberg lettuce.',
        price: 750,
        image: '/assets/menu/burger/Mighty%20burger.webp',
        categoryId: 'cat-burgers',
        category: { id: 'cat-burgers', name: 'Gourmet Burgers', slug: 'burgers' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 11,
      },
    ],
  },
  {
    id: 'cat-pastas-starters',
    name: 'Pastas & Starters',
    slug: 'pastas-starters',
    description: 'Oven-baked pastas, calzone chunks, sizzling hot wings, and loaded fries.',
    image: '/assets/menu/pasta/Baked%20pasta.webp',
    sortOrder: 4,
    items: [
      {
        id: 'item-baked-pasta',
        name: 'Oven Baked Pasta',
        slug: 'oven-baked-pasta',
        description: 'Golden oven-baked pasta with layers of melted mozzarella, chicken and herbs.',
        price: 400,
        image: '/assets/menu/pasta/Baked%20pasta.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 1,
        variants: [
          { id: 'bp-s', name: 'Small', price: 400, isDefault: true },
          { id: 'bp-l', name: 'Large', price: 700, isDefault: false },
        ],
      },
      {
        id: 'item-crunchy-pasta',
        name: 'Crunchy Pasta',
        slug: 'crunchy-pasta',
        description: 'Penne pasta tossed in spicy red sauce and melted cheese topped with crispy crunch bites.',
        price: 850,
        image: '/assets/menu/pasta/Crunchy%20pasta.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 2,
      },
      {
        id: 'item-calzone-chunks',
        name: 'Calzone Chunks',
        slug: 'calzone-chunks',
        description: 'Stuffed folded dough pockets with spicy chicken, molten cheese and pizza sauce.',
        price: 850,
        image: '/assets/menu/burger/Calazone%20chunks.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 3,
      },
      {
        id: 'item-pizza-fries',
        name: 'Chickado Pizza Fries',
        slug: 'chickado-pizza-fries',
        description: 'Crispy crinkle fries loaded with pizza sauce, mozzarella cheese, chicken chunks, and olives.',
        price: 750,
        image: '/assets/menu/pizza/Pizza%20fries.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: true,
        sortOrder: 4,
      },
      {
        id: 'item-curly-fries',
        name: 'Seasoned Curly Fries',
        slug: 'seasoned-curly-fries',
        description: 'Spiral curly potatoes seasoned with spicy herbs, served crispy and piping hot.',
        price: 600,
        image: '/assets/menu/fries/Curly%20fries.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 5,
      },
      {
        id: 'item-chick-n-chips',
        name: 'Chick n Chips',
        slug: 'chick-n-chips',
        description: 'Crispy fried chicken tenders paired with seasoned golden fries and house dip.',
        price: 600,
        image: '/assets/menu/fries/Chick%20n%20chips.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 6,
      },
      {
        id: 'item-bihari-rolls',
        name: 'Bihari Rolls',
        slug: 'bihari-rolls',
        description: 'Golden rolls stuffed with tender bihari spiced chicken and zesty sauces.',
        price: 600,
        image: '/assets/menu/fries/Behari%20Roll.webp',
        categoryId: 'cat-pastas-starters',
        category: { id: 'cat-pastas-starters', name: 'Pastas & Starters', slug: 'pastas-starters' },
        isAvailable: true,
        isFeatured: false,
        sortOrder: 7,
      },
    ],
  },
  {
    id: 'cat-margaritas',
    name: 'Margaritas',
    slug: 'margaritas',
    description: 'Chilled fruit margaritas blended with crushed ice and fresh mint leaves.',
    image: '/assets/menu/drinks/margaritas.webp',
    sortOrder: 5,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-shakes',
    name: 'Shakes',
    slug: 'shakes',
    description: 'Decadent thick gourmet milkshakes topped with whipped cream, rich drizzles, and crushed biscuits.',
    image: '/assets/menu/drinks/shakes.webp',
    sortOrder: 6,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-mojitos',
    name: 'Mojitos',
    slug: 'mojitos',
    description: 'Crisp sparkling sodas muddled with fresh mint sprigs, lime slices, and crushed ice.',
    image: '/assets/menu/drinks/mojitos.webp',
    sortOrder: 7,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-cold-coffee',
    name: 'Cold Coffee',
    slug: 'cold-coffee',
    description: 'Chilled artisanal espresso creations, iced lattes, and blended frappes.',
    image: '/assets/menu/drinks/cold-coffee.webp',
    sortOrder: 8,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-special-drinks',
    name: 'Chickado Special Drinks',
    slug: 'special-drinks',
    description: 'Exclusive signature craft coolers with tropical fruits and vibrant lagoon syrups.',
    image: '/assets/menu/drinks/special-drinks.webp',
    sortOrder: 9,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-mocktail',
    name: 'Mocktail',
    slug: 'mocktail',
    description: 'Sophisticated non-alcoholic mocktails bursting with fresh fruit infusions and botanicals.',
    image: '/assets/menu/drinks/mocktail.webp',
    sortOrder: 10,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-smoothies',
    name: 'Smoothies',
    slug: 'smoothies',
    description: 'Thick, creamy fruit and nut smoothies prepared fresh with rich natural ingredients.',
    image: '/assets/menu/drinks/smoothies.webp',
    sortOrder: 11,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-fresh-juices',
    name: 'Fresh Juices',
    slug: 'fresh-juices',
    description: 'Cold-pressed natural juices prepared to order from fresh seasonal fruits.',
    image: '/assets/menu/drinks/fresh-juices.webp',
    sortOrder: 12,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-ice-tea',
    name: 'Ice Tea',
    slug: 'ice-tea',
    description: 'Refreshing slow-steeped iced teas flavored with exotic fruit essences and lemon.',
    image: '/assets/menu/drinks/ice-tea.webp',
    sortOrder: 13,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-hot-coffee',
    name: 'Hot Coffee',
    slug: 'hot-coffee',
    description: 'Freshly roasted and extracted artisan coffee with silky micro-foam milk.',
    image: '/assets/menu/drinks/hot-coffee.webp',
    sortOrder: 14,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-beverages',
    name: 'Beverages',
    slug: 'beverages',
    description: 'Chilled soft drink cans, fresh lemon sodas, and bottled pure mineral water.',
    image: '/assets/menu/drinks/beverages.webp',
    sortOrder: 15,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-ice-cream',
    name: 'Ice Cream',
    slug: 'ice-cream',
    description: 'Signature frozen dessert cups and creamy artisan ice cream scoops.',
    image: '/assets/menu/drinks/ice-cream.webp',
    sortOrder: 16,
    isComingSoon: true,
    items: [],
  },
  {
    id: 'cat-special-tea',
    name: 'Special Tea',
    slug: 'special-tea',
    description: 'Authentic slow-boiled Pakistani specialty teas with saffron, whole milk, and fragrant spices.',
    image: '/assets/menu/drinks/special-tea.webp',
    sortOrder: 17,
    isComingSoon: true,
    items: [],
  },
];

// Enrich categories with item counts
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

// Helper functions for frontend access
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
    .slice(0, 10);
}

export function getDeals(): MenuItem[] {
  const dealsCat = MENU_CATEGORIES.find((c) => c.slug === 'deals-combos');
  return (dealsCat?.items || []).filter((i) => i.isAvailable);
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
