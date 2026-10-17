'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import ItemModal from '@/components/item-modal';
import MenuItemCard, { ItemType } from '@/components/menu-item-card';
import { useCartStore } from '@/lib/cart-store';

export default function HomeClientSection({
  featuredItems,
  deals,
}: {
  featuredItems: ItemType[];
  deals: ItemType[];
}) {
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const { addItem } = useCartStore();

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
    <>
      {/* 1. TOP SELLERS & FEATURED ITEMS (Reference Image 2 Card Design) */}
      <section className="py-16 bg-[#F4F6F8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 mb-1">
                <Flame className="w-4 h-4 fill-red-600 text-red-600" />
                <span>Top Sellers</span>
              </div>
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight uppercase font-heading">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12 pb-6">
            {featuredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedItem(selected)}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. VALUE COMBOS & SHARING FEASTS (Reference Image 2 Card Design) */}
      {deals.length > 0 && (
        <section className="py-16 bg-white relative overflow-hidden border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 mb-1">
                  <Sparkles className="w-4 h-4 fill-red-600 text-red-600" />
                  <span>Maximum Value</span>
                </div>
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight uppercase font-heading">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12 pb-6">
              {deals.map((deal) => (
                <MenuItemCard
                  key={deal.id}
                  item={deal}
                  onSelect={(selected) => setSelectedItem(selected)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Item Customizer Modal */}
      <ItemModal
        item={selectedItem as any}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
