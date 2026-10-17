'use client';

import React, { useState, useMemo } from 'react';
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

export default function MenuClientView({ categories }: { categories: CategoryType[] }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const { addItem } = useCartStore();

  // Flatten all items
  const allItems = useMemo(() => {
    return categories.flatMap((c) => c.items);
  }, [categories]);

  // Filter & Sort
  const filteredItems = useMemo(() => {
    let result = allItems;

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category?.slug === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.category && item.category.name.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [allItems, activeCategory, searchQuery, sortBy]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Sticky Category Tabs Bar */}
        <div className="sticky top-20 z-30 bg-white border border-neutral-200/80 rounded-2xl shadow-xs p-3 mb-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            {/* Category Pills */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-red-600 text-white shadow-md'
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
                    onClick={() => setActiveCategory(c.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-red-600 text-white shadow-md'
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

        {/* Items Grid Matching Reference Image 2 */}
        {filteredItems.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 gap-y-12 pb-12">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedItem(selected)}
                onQuickAdd={handleQuickAdd}
              />
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
