'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Flame,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import ItemModal from '@/components/item-modal';
import MenuItemCard, { ItemType } from '@/components/menu-item-card';
import { useCartStore } from '@/lib/cart-store';

interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isComingSoon?: boolean;
  items: ItemType[];
}

interface CategoryBannerMeta {
  line1: string;
  line2: string;
  subYellow: string;
  badgeTop: string;
  badgeBottom: string;
}

function getCategoryBannerContent(category: CategoryType): CategoryBannerMeta {
  if (category.isComingSoon) {
    return {
      line1: 'EXCLUSIVE PREVIEW • COMING SOON',
      line2: category.name.toUpperCase(),
      subYellow: (category.description || 'LAUNCHING SOON AT CHICKADO PESHAWAR SADDAR').toUpperCase(),
      badgeTop: 'COMING',
      badgeBottom: 'SOON',
    };
  }

  switch (category.slug) {
    case 'deals-combos':
      return {
        line1: 'NEVER SETTLE FOR',
        line2: '1 – GET ALL 4 IN ONE',
        subYellow: '21 INCH CITY SQUARE PIZZA & CRISPY BOX',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'pizzas':
      return {
        line1: 'FRESH DOUGH • MELTY CHEESE',
        line2: 'GOURMET CRUST PIZZAS',
        subYellow: 'HAND-CRAFTED ARTISAN CRUSTS & PREMIUM MOZZARELLA',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'burgers':
      return {
        line1: 'SUPREME CRUNCH IN EVERY BITE',
        line2: 'SIGNATURE ZINGERS & BURGERS',
        subYellow: 'JUICY CRISPY CHICKEN FILLETS & SECRET SAUCE',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'fried-chicken':
      return {
        line1: '11 SECRET HERBS & SPICES',
        line2: 'GOLDEN CRISPY BROAST',
        subYellow: 'PRESSURE-FRIED TO JUICY, SIZZLING PERFECTION',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'pastas-starters':
      return {
        line1: 'HOT • CHEESY • LOADED',
        line2: 'OVEN-BAKED PASTAS & WINGS',
        subYellow: 'MOLTEN MOZZARELLA, CALZONE & CRISPY SIZZLERS',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'sides':
    case 'sides-dips':
    case 'sides-extras':
      return {
        line1: 'PERFECT CRUNCH COMPANIONS',
        line2: 'CRISPY FRIES & SIDES',
        subYellow: 'SEASONED CRINKLE FRIES, DIPS & GARLIC MAYO',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'bar-drinks':
    case 'drinks':
    case 'beverages':
      return {
        line1: 'ICE COLD & REFRESHING',
        line2: 'CHILLED BEVERAGES',
        subYellow: 'BEST PAIRED WITH YOUR FAVORITE CRUNCH MEAL',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    case 'desserts':
      return {
        line1: 'SWEET INDULGENCE',
        line2: 'SIGNATURE DESSERTS',
        subYellow: 'WARM CHOCOLATE LAVA CAKES & SWEET BITES',
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
    default:
      return {
        line1: 'CHICKADO AUTHENTIC TASTE',
        line2: category.name.toUpperCase(),
        subYellow: (category.description || 'FRESHLY PREPARED WITH PREMIUM INGREDIENTS').toUpperCase(),
        badgeTop: 'CHICKADO',
        badgeBottom: 'SPECIAL',
      };
  }
}


export default function MenuClientView({ categories }: { categories: CategoryType[] }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const { addItem } = useCartStore();

  const isManualScrolling = useRef(false);
  const manualScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const tabButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollRailRef = useRef<HTMLDivElement>(null);

  const scrollTabsLeft = () => {
    if (scrollRailRef.current) {
      scrollRailRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollTabsRight = () => {
    if (scrollRailRef.current) {
      scrollRailRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // Flatten all items
  const allItems = useMemo(() => {
    return categories
      .filter((c) => !c.isComingSoon && c.items.length > 0)
      .flatMap((c) => c.items);
  }, [categories]);

  // Group, filter & sort items by category
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return categories
      .map((cat) => {
        let items = cat.items;

        if (q) {
          items = items.filter(
            (item) =>
              item.name.toLowerCase().includes(q) ||
              (item.description && item.description.toLowerCase().includes(q)) ||
              (item.category && item.category.name.toLowerCase().includes(q))
          );
        }

        if (sortBy === 'price-asc') {
          items = [...items].sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === 'price-desc') {
          items = [...items].sort((a, b) => Number(b.price) - Number(a.price));
        }

        return {
          ...cat,
          items,
        };
      })
      .filter((cat) => !cat.isComingSoon && cat.items.length > 0);
  }, [categories, searchQuery, sortBy]);

  const totalVisibleItems = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  // Scrollspy: update active category as items scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling.current) return;

      const sections = document.querySelectorAll<HTMLElement>('.category-section');
      if (!sections.length) return;

      // Check if user is scrolled near top of items list
      const container = document.getElementById('menu-items-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        // If container top is well below the sticky bar, activate 'all'
        if (containerRect.top > 220) {
          setActiveCategory('all');
          return;
        }
      }

      // Check if scrolled near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        const lastSection = sections[sections.length - 1];
        const lastSlug = lastSection?.getAttribute('data-category-slug');
        if (lastSlug && lastSlug !== activeCategory) {
          setActiveCategory(lastSlug);
        }
        return;
      }

      // Target threshold line just below the sticky header (~180px from viewport top)
      const targetOffset = 185;
      let matchedSlug = '';

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();

        // Section is currently crossing our trigger line
        if (rect.top <= targetOffset && rect.bottom > targetOffset) {
          matchedSlug = section.getAttribute('data-category-slug') || '';
          break;
        }
      }

      // If no section directly straddles targetOffset, find the closest section above it
      if (!matchedSlug) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= targetOffset) {
            matchedSlug = sections[i].getAttribute('data-category-slug') || '';
            break;
          }
        }
      }

      if (matchedSlug && matchedSlug !== activeCategory) {
        setActiveCategory(matchedSlug);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory, filteredCategories]);

  // Keep active category button visible in horizontal scroll track
  useEffect(() => {
    const activeBtn = tabButtonRefs.current[activeCategory];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory]);

  // Smooth scroll to category on tab click
  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    isManualScrolling.current = true;
    if (manualScrollTimeout.current) {
      clearTimeout(manualScrollTimeout.current);
    }
    manualScrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 850);

    const scrollBuffer = 175;

    if (slug === 'all') {
      const container = document.getElementById('menu-items-container');
      if (container) {
        const y = container.getBoundingClientRect().top + window.scrollY - scrollBuffer;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(`category-${slug}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - scrollBuffer;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  };

  // Handle direct URL query param (e.g. ?category=deals-combos)
  useEffect(() => {
    const initialCategory = searchParams.get('category');
    if (initialCategory && initialCategory !== 'all') {
      const timer = setTimeout(() => {
        handleCategoryClick(initialCategory);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleQuickAdd = (item: ItemType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Use default variant price and name if variants exist
    const defaultVariant = item.variants?.find((v) => v.isDefault) || item.variants?.[0];
    const unitPrice = defaultVariant ? Number(defaultVariant.price) : Number(item.price);
    const variantName = defaultVariant ? defaultVariant.name : null;

    addItem({
      itemId: item.id,
      name: item.name,
      image: item.image,
      variantName,
      addons: [],
      unitPrice,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] pb-24">
      {/* Top Header & Search Bar */}
      <div className="bg-white border-b border-neutral-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 mb-1.5">
              <Flame className="w-4 h-4 fill-red-600 text-red-600" />
              <span>Full Chickado Menu Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 uppercase font-heading">
              CRISPY. JUICY. FRESH.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-lg">
              Explore our complete lineup of pressure-fried chicken, zinger towers, loaded crunch boxes, and family feasts.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-72 md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search burgers, wings, pizzas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-800"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Seamless Sticky Category Navigation Dock */}
        <div className="sticky top-16 z-30 bg-[#F4F6F8]/85 backdrop-blur-xl pt-2 sm:pt-3 pb-3 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 border-b border-neutral-200/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] mb-7 sm:mb-9 transition-all">
          <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto">
            <div className="relative bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-1.5 sm:p-2 flex items-center justify-between gap-2 sm:gap-3">
              {/* Left Arrow Button for Desktop Rail */}
              <button
                type="button"
                onClick={scrollTabsLeft}
                className="hidden md:flex shrink-0 w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 text-neutral-600 hover:text-neutral-900 items-center justify-center transition active:scale-90 cursor-pointer"
                aria-label="Scroll categories left"
                title="Scroll categories left"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Category Pills Rail with min-w-0 for mobile flex shrinking */}
              <div
                ref={scrollRailRef}
                className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 px-0.5 flex-1 min-w-0 scroll-smooth"
              >
                <button
                  ref={(el) => {
                    tabButtonRefs.current['all'] = el;
                  }}
                  onClick={() => handleCategoryClick('all')}
                  className={`group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap select-none active:scale-95 shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white shadow-md shadow-red-600/30 scale-[1.02]'
                      : 'bg-neutral-100/80 hover:bg-neutral-200/90 text-neutral-700 hover:text-neutral-950 border border-neutral-200/40'
                  }`}
                >
                  <span>All Items</span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-white/25 text-white backdrop-blur-xs'
                        : 'bg-neutral-200/80 text-neutral-500 group-hover:bg-neutral-300/80 group-hover:text-neutral-800'
                    }`}
                  >
                    {allItems.length}
                  </span>
                </button>

                {categories
                  .filter((c) => !c.isComingSoon && c.items.length > 0)
                  .map((c) => {
                  const active = activeCategory === c.slug;
                  return (
                    <button
                      key={c.id}
                      ref={(el) => {
                        tabButtonRefs.current[c.slug] = el;
                      }}
                      onClick={() => handleCategoryClick(c.slug)}
                      className={`group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap select-none active:scale-95 shrink-0 ${
                        active
                          ? 'bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white shadow-md shadow-red-600/30 scale-[1.02]'
                          : 'bg-neutral-100/80 hover:bg-neutral-200/90 text-neutral-700 hover:text-neutral-950 border border-neutral-200/40'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md transition-colors ${
                          c.isComingSoon
                            ? 'bg-amber-400 text-neutral-950 font-black'
                            : active
                            ? 'bg-white/25 text-white backdrop-blur-xs'
                            : 'bg-neutral-200/80 text-neutral-500 group-hover:bg-neutral-300/80 group-hover:text-neutral-800'
                        }`}
                      >
                        {c.isComingSoon ? 'SOON' : c.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button for Desktop Rail */}
              <button
                type="button"
                onClick={scrollTabsRight}
                className="hidden md:flex shrink-0 w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 text-neutral-600 hover:text-neutral-900 items-center justify-center transition active:scale-90 cursor-pointer"
                aria-label="Scroll categories right"
                title="Scroll categories right"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Responsive Sort Selector: Ultra-compact on mobile, expanded on sm+ */}
              <div className="flex items-center shrink-0 pl-1.5 sm:pl-3 border-l border-neutral-200/80">
                <div className="relative flex items-center">
                  {/* Mobile Compact Icon Button Trigger (< sm) */}
                  <div className="flex sm:hidden w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200/80 items-center justify-center text-red-600 shadow-2xs">
                    <ArrowUpDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    {sortBy !== 'default' && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full border border-white" />
                    )}
                  </div>

                  {/* Tablet & Desktop Expanded Button Trigger (>= sm) */}
                  <div className="hidden sm:flex items-center bg-neutral-100/90 hover:bg-neutral-200/80 text-neutral-800 border border-neutral-200/80 rounded-xl pl-8 pr-7 py-2 sm:py-2.5 transition-all shadow-2xs">
                    <div className="pointer-events-none absolute left-2.5 sm:left-3 flex items-center text-red-600">
                      <ArrowUpDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider select-none">
                      {sortBy === 'default'
                        ? 'Default Sort'
                        : sortBy === 'price-asc'
                        ? 'Price: Low'
                        : 'Price: High'}
                    </span>
                    <div className="pointer-events-none absolute right-2 sm:right-2.5 flex items-center text-neutral-400">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Accessible Native Select Overlay Covering Entire Trigger Area */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort menu items"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base"
                  >
                    <option value="default">Default Sort</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grouped by Category with Scrollspy */}
        {totalVisibleItems === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-neutral-200/80 p-8">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-neutral-400 mx-auto">
              <Search className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-black text-neutral-900">No items found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for another item or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="btn-red px-6 py-2.5 text-xs inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div id="menu-items-container" className="space-y-12 sm:space-y-16 pb-16">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={`category-${category.slug}`}
                data-category-slug={category.slug}
                className="category-section scroll-mt-48 sm:scroll-mt-52"
              >
                {/* Redesigned Category Billboard Banner (Matching Reference Image) */}
                {(() => {
                  const bannerMeta = getCategoryBannerContent(category);
                  const patternId = `plus-pat-${category.slug}`;
                  const maskLeftId = `mask-l-${category.slug}`;
                  const maskRightId = `mask-r-${category.slug}`;

                  return (
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#D60511] via-[#E30613] to-[#B8000C] rounded-2xl sm:rounded-2.5xl border border-white/20 shadow-[0_4px_20px_rgba(227,6,19,0.18)] py-3 px-4 sm:py-3.5 sm:px-6 md:py-4 md:px-7 mb-4 sm:mb-5 text-white select-none group transition-all duration-300">
                      {/* Left Subtle White Plus Pattern Grid */}
                      <svg
                        className="absolute left-0 top-0 bottom-0 w-36 sm:w-56 pointer-events-none opacity-20"
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <defs>
                          <pattern
                            id={patternId}
                            width="14"
                            height="14"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 7,3.5 L 7,10.5 M 3.5,7 L 10.5,7"
                              stroke="#FFFFFF"
                              strokeWidth="2"
                              strokeLinecap="square"
                            />
                          </pattern>
                          <linearGradient id={maskLeftId} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="1" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                          </linearGradient>
                          <mask id={`mask-def-l-${category.slug}`}>
                            <rect width="100%" height="100%" fill={`url(#${maskLeftId})`} />
                          </mask>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#${patternId})`}
                          mask={`url(#mask-def-l-${category.slug})`}
                        />
                      </svg>

                      {/* Right Subtle White Plus Pattern Grid */}
                      <svg
                        className="absolute right-0 top-0 bottom-0 w-36 sm:w-56 pointer-events-none opacity-20"
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id={maskRightId} x1="1" y1="0" x2="0" y2="0">
                            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="1" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                          </linearGradient>
                          <mask id={`mask-def-r-${category.slug}`}>
                            <rect width="100%" height="100%" fill={`url(#${maskRightId})`} />
                          </mask>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#${patternId})`}
                          mask={`url(#mask-def-r-${category.slug})`}
                        />
                      </svg>

                      {/* Main Banner Content */}
                      <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
                        {/* Left: Punchy White Headline & Yellow Subtitle */}
                        <div className="min-w-0 pr-1 sm:pr-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-xs text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white/95 mb-1 sm:mb-1.5 border border-white/15">
                            <Flame className="w-3 h-3 text-[#FFE600] fill-[#FFE600]" />
                            <span>{category.name}</span>
                            <span className="text-white/60">•</span>
                            <span className="text-[#FFE600] font-black">
                              {category.items.length} {category.items.length === 1 ? 'ITEM' : 'ITEMS'}
                            </span>
                          </div>

                          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-white tracking-tight leading-snug font-heading drop-shadow-sm">
                            <span className="text-white/95">{bannerMeta.line1}</span>
                            <span className="text-white sm:ml-2 block sm:inline">{bannerMeta.line2}</span>
                          </h2>

                          <p className="text-[11px] sm:text-xs md:text-sm font-black uppercase text-[#FFE600] tracking-wide mt-1 drop-shadow-xs flex items-center flex-wrap gap-2">
                            <span>{bannerMeta.subYellow}</span>
                          </p>
                        </div>

                        {/* Right: Angled Circular Stamp Badge */}
                        <div className="shrink-0 pl-1 sm:pl-3">
                          <div className="w-13 h-13 sm:w-15 sm:h-15 md:w-17 md:h-17 rounded-full bg-gradient-to-br from-[#9E000A] to-[#750006] border-2 border-white/30 shadow-md flex flex-col items-center justify-center text-center -rotate-6 transform group-hover:rotate-0 transition-transform duration-300 ring-2 sm:ring-4 ring-black/10">
                            <span className="text-white font-black text-[10px] sm:text-xs md:text-[13px] tracking-wider uppercase leading-none drop-shadow-xs">
                              {bannerMeta.badgeTop}
                            </span>
                            <span className="w-5 sm:w-6 h-0.5 bg-[#FFE600] my-0.5 sm:my-1 rounded-full"></span>
                            <span className="text-[#FFE600] font-black text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase leading-none drop-shadow-xs">
                              {bannerMeta.badgeBottom}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 5 items per row on desktop, 2 items on mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 gap-y-7 sm:gap-y-9">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onSelect={(selected) => setSelectedItem(selected)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Item Customizer Modal */}
      <ItemModal
        item={selectedItem as any}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
