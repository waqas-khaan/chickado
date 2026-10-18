'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, Flame, Filter, X } from 'lucide-react';
import ItemModal from '@/components/item-modal';
import MenuItemCard, { ItemType } from '@/components/menu-item-card';
import PromoBanner from '@/components/promo-banner';
import { useCartStore } from '@/lib/cart-store';

interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  items: ItemType[];
}

function getCategoryIcon(slug: string) {
  switch (slug) {
    case 'burgers':
      return '🍔';
    case 'fried-chicken':
      return '🍗';
    case 'wings':
      return '🌶️';
    case 'deals-combos':
      return '🔥';
    case 'sides-dips':
      return '🍟';
    case 'drinks':
      return '🥤';
    case 'desserts':
      return '🍰';
    default:
      return '🍗';
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

  // Flatten all items
  const allItems = useMemo(() => {
    return categories.flatMap((c) => c.items);
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
      .filter((cat) => cat.items.length > 0);
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

      // Target threshold line just below the sticky header (~160px from viewport top)
      const targetOffset = 180;
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

    if (slug === 'all') {
      const container = document.getElementById('menu-items-container');
      if (container) {
        const y = container.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(`category-${slug}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 150;
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
          <div className="w-full md:w-88 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search burgers, wings, buckets..."
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

      {/* Promotional Fast-Food Banner Section (Complete Page Width) */}
      <PromoBanner fullWidth />

      {/* Main Content Area */}
      <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Sticky Category Tabs Bar with Auto-Scrollspy */}
        <div className="sticky top-20 z-30 bg-white border border-neutral-200/80 rounded-2xl shadow-sm p-2.5 sm:p-3 mb-8 backdrop-blur-md bg-white/95">
          <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-0.5">
            {/* Category Pills */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                ref={(el) => {
                  tabButtonRefs.current['all'] = el;
                }}
                onClick={() => handleCategoryClick('all')}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.02]'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                🔥 All Items ({allItems.length})
              </button>

              {categories.map((c) => {
                const active = activeCategory === c.slug;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabButtonRefs.current[c.slug] = el;
                    }}
                    onClick={() => handleCategoryClick(c.slug)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.02]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {c.name} ({c.items.length})
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 pl-2 border-l border-neutral-200">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
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
                className="category-section scroll-mt-36"
              >
                {/* Professional Category Banner Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-white via-white to-red-50/30 rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-[0_2px_14px_rgba(0,0,0,0.03)] p-3.5 sm:p-5 mb-5 sm:mb-7 group transition-all duration-300">
                  {/* Left Brand Gradient Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-red-600 via-red-500 to-amber-500 rounded-l-2xl sm:rounded-l-3xl" />

                  {/* Iconic Chickado 3 Red Stripes (Top Right) */}
                  <div className="absolute top-0 right-4 sm:right-6 flex items-center gap-1 opacity-75 pointer-events-none">
                    <div className="w-1.5 h-3 bg-red-600 rounded-b-xs" />
                    <div className="w-1.5 h-3 bg-red-600 rounded-b-xs" />
                    <div className="w-1.5 h-3 bg-red-600 rounded-b-xs" />
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:gap-4 pl-2 sm:pl-3">
                    {/* Left: Category Icon + Title + Description */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 border border-red-100 flex items-center justify-center shrink-0 shadow-xs text-xl sm:text-2xl group-hover:scale-105 transition-transform duration-300">
                        {getCategoryIcon(category.slug)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h2 className="text-lg sm:text-2xl font-black text-neutral-900 uppercase font-heading tracking-tight">
                            {category.name}
                          </h2>
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black text-red-600 bg-red-50 border border-red-200/70 px-2 sm:px-2.5 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                            {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                        {category.description && (
                          <p className="text-[11px] sm:text-xs md:text-sm text-neutral-500 mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none max-w-xl">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

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
