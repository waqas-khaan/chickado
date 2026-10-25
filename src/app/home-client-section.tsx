'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, ArrowRight, X } from 'lucide-react';
import ItemModal from '@/components/item-modal';
import MenuItemCard, { ItemType } from '@/components/menu-item-card';
import ExploreMenuCarousel from '@/components/explore-menu-carousel';
import { useCartStore } from '@/lib/cart-store';

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isComingSoon?: boolean;
  items: ItemType[];
}

export default function HomeClientSection({
  categories,
  featuredItems,
  deals,
}: {
  categories: CategoryType[];
  featuredItems: ItemType[];
  deals: ItemType[];
}) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const { addItem } = useCartStore();

  const handleSelectCategory = (slug: string) => {
    if (selectedCategorySlug === slug) {
      // Toggle off to show top sellers and combos
      setSelectedCategorySlug(null);
    } else {
      setSelectedCategorySlug(slug);
      // Smoothly scroll down to the category items section
      setTimeout(() => {
        const el = document.getElementById('home-menu-items');
        if (el) {
          const scrollBuffer = 90;
          const y = el.getBoundingClientRect().top + window.scrollY - scrollBuffer;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 60);
    }
  };

  const handleResetCategory = () => {
    setSelectedCategorySlug(null);
  };

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

  const activeCategory = categories.find((c) => c.slug === selectedCategorySlug);

  return (
    <>
      {/* 1. EXPLORE MENU CAROUSEL */}
      <section className="py-6 sm:py-8 bg-transparent relative">
        <ExploreMenuCarousel
          categories={categories}
          selectedCategory={selectedCategorySlug}
          onSelectCategory={handleSelectCategory}
          onResetCategory={handleResetCategory}
        />
      </section>

      {/* 2. DYNAMIC CATEGORY ITEMS OR TOP SELLERS / COMBOS */}
      <div id="home-menu-items">
        {activeCategory ? (
          /* ACTIVE CATEGORY ITEMS VIEW (Triggered by clicking an Explore Menu card) */
          <section className="py-12 sm:py-16 bg-[#F4F6F8] relative border-b border-neutral-200/60 animate-fadeIn">
            <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 mb-1.5">
                    <Flame className="w-4 h-4 fill-red-600 text-red-600" />
                    <span>{activeCategory.name}</span>
                    <span className="text-neutral-400">•</span>
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-black">
                      {activeCategory.items.length}{' '}
                      {activeCategory.items.length === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase font-heading">
                    {activeCategory.name}
                  </h2>
                  {activeCategory.description && (
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                      {activeCategory.description}
                    </p>
                  )}
                </div>

                {/* Right Actions: Back to Featured & Open in Full Menu */}
                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  <button
                    type="button"
                    onClick={handleResetCategory}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-2xs text-xs font-black uppercase tracking-wider transition active:scale-95 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Show Featured</span>
                  </button>

                  <Link
                    href={`/menu?category=${activeCategory.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/25 text-xs font-black uppercase tracking-wider transition active:scale-95 cursor-pointer"
                  >
                    <span>View in Full Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Items Grid */}
              {activeCategory.items.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-neutral-200/80 p-6">
                  <p className="text-sm font-bold text-neutral-700">
                    No items currently available in {activeCategory.name}.
                  </p>
                  <button
                    onClick={handleResetCategory}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
                  >
                    Back to Featured
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 gap-y-7 sm:gap-y-9 pb-6">
                  {activeCategory.items.map((item, idx) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      priority={idx < 5}
                      onSelect={(selected) => setSelectedItem(selected)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        ) : (
          /* DEFAULT VIEW: TOP SELLERS & FEAST COMBOS */
          <>
            {/* Top Sellers / Popular Crunch Bites */}
            <section className="py-12 sm:py-16 bg-[#F4F6F8] relative">
              <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 mb-1">
                      <Flame className="w-4 h-4 fill-red-600 text-red-600" />
                      <span>Top Sellers</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase font-heading">
                      Popular Crunch Bites
                    </h2>
                  </div>
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition"
                  >
                    <span>View Full Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 gap-y-7 sm:gap-y-9 pb-6">
                  {featuredItems.map((item, idx) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      priority={idx < 5}
                      onSelect={(selected) => setSelectedItem(selected)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Maximum Value / Feast & Bucket Combos */}
            {deals.length > 0 && (
              <section className="py-12 sm:py-16 bg-white relative overflow-hidden border-t border-neutral-200/60">
                <div className="max-w-7xl 2xl:max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 mb-1">
                        <Sparkles className="w-4 h-4 fill-red-600 text-red-600" />
                        <span>Maximum Value</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase font-heading">
                        Feast & Bucket Combos
                      </h2>
                    </div>
                    <Link
                      href="/menu?category=deals-combos"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition"
                    >
                      <span>View All Deals</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 gap-y-7 sm:gap-y-9 pb-6">
                    {deals.map((deal, idx) => (
                      <MenuItemCard
                        key={deal.id}
                        item={deal}
                        priority={idx < 2}
                        onSelect={(selected) => setSelectedItem(selected)}
                        onQuickAdd={handleQuickAdd}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Item Customizer Modal */}
      <ItemModal
        item={selectedItem as any}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
