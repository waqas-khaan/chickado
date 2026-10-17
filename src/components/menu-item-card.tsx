'use client';

import React from 'react';
import Image from 'next/image';
import { Flame } from 'lucide-react';

export interface ItemType {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  price: number | string;
  image?: string | null;
  category?: { id?: string; name: string; slug: string } | null;
  variants?: Array<{ id: string; name: string; price: number | string; isDefault?: boolean }>;
  addons?: Array<{ addon: { id: string; name: string; price: number | string } }>;
}

interface MenuItemCardProps {
  item: ItemType;
  onSelect: (item: ItemType) => void;
  onQuickAdd: (item: ItemType, e: React.MouseEvent) => void;
}

export default function MenuItemCard({ item, onSelect, onQuickAdd }: MenuItemCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    onSelect(item);
  };

  const formattedPrice = Number(item.price).toLocaleString('en-PK');

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-[0_2px_14px_rgba(0,0,0,0.06)] hover:shadow-xl border border-neutral-100 relative flex flex-col justify-between pt-6 pb-7 px-5 transition-all duration-300 mb-4"
    >
      {/* 1. Iconic 3 Red Vertical Stripes (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
        <div className="w-2.5 h-4.5 bg-red-600 rounded-b-xs shadow-xs" />
        <div className="w-2.5 h-4.5 bg-red-600 rounded-b-xs shadow-xs" />
        <div className="w-2.5 h-4.5 bg-red-600 rounded-b-xs shadow-xs" />
      </div>

      {/* 2. Centered Food Photography */}
      <div className="relative w-full h-44 sm:h-48 my-1 rounded-xl overflow-hidden bg-neutral-50 flex items-center justify-center">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <Flame className="w-10 h-10" />
          </div>
        )}
      </div>

      {/* 3. Item Details (Title, 2-line Description, Price) */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight leading-snug line-clamp-1 group-hover:text-red-600 transition">
            {item.name}
          </h3>

          {item.description ? (
            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mt-1.5 min-h-[32px]">
              {item.description}
            </p>
          ) : (
            <div className="min-h-[32px]" />
          )}
        </div>

        <div className="pt-2">
          <p className="text-base sm:text-lg font-black text-neutral-900">
            Rs {formattedPrice}
          </p>
        </div>
      </div>

      {/* 4. Centered Bottom Red Button: + ADD TO CART */}
      <div className="absolute -bottom-3.5 left-0 right-0 flex justify-center z-20">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickAdd(item, e);
          }}
          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-1"
        >
          <span className="pointer-events-none">+ ADD TO CART</span>
        </button>
      </div>
    </div>
  );
}
