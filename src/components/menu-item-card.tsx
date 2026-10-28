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
  category?: { id?: string; name: string; slug: string; isComingSoon?: boolean } | null;
  variants?: Array<{ id: string; name: string; price: number | string; isDefault?: boolean }>;
  addons?: Array<{ addon: { id: string; name: string; price: number | string } }>;
  isAvailable?: boolean;
}

interface MenuItemCardProps {
  item: ItemType;
  priority?: boolean;
  onSelect: (item: ItemType) => void;
  onQuickAdd: (item: ItemType, e: React.MouseEvent) => void;
}

export default function MenuItemCard({ item, priority = false, onSelect, onQuickAdd }: MenuItemCardProps) {
  const isComingSoon = item.isAvailable === false;
  const [imgSrc, setImgSrc] = React.useState<string | null>(item.image || null);
  const [hasError, setHasError] = React.useState(false);
  const [retryStep, setRetryStep] = React.useState(0);

  // Synchronize when item changes
  React.useEffect(() => {
    setImgSrc(item.image || null);
    setHasError(false);
    setRetryStep(0);
  }, [item.image]);

  const handleImageError = () => {
    if (!imgSrc) {
      setHasError(true);
      return;
    }

    if (retryStep === 0) {
      // Step 1: Try swapping folder casing (fries <-> Fries)
      setRetryStep(1);
      if (imgSrc.includes('/menu/fries/')) {
        setImgSrc(imgSrc.replace('/menu/fries/', '/menu/Fries/'));
        return;
      }
      if (imgSrc.includes('/menu/Fries/')) {
        setImgSrc(imgSrc.replace('/menu/Fries/', '/menu/fries/'));
        return;
      }
    }

    if (retryStep <= 1) {
      // Step 2: Handle Bihari / Behari spelling variants
      setRetryStep(2);
      if (imgSrc.includes('Bihari')) {
        setImgSrc(imgSrc.replace('Bihari', 'Behari'));
        return;
      }
      if (imgSrc.includes('Behari')) {
        setImgSrc(imgSrc.replace('Behari', 'Bihari'));
        return;
      }
    }

    // Step 3: Graceful brand fallback
    setHasError(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isComingSoon) {
      return;
    }
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
      className={`group bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_14px_rgba(0,0,0,0.06)] border border-neutral-100 relative flex flex-col justify-between pt-4 sm:pt-5 pb-5 sm:pb-6 px-2.5 sm:px-3 lg:px-3.5 xl:px-4 transition-all duration-300 mb-2 sm:mb-3 ${
        isComingSoon ? 'opacity-90 cursor-not-allowed' : 'hover:shadow-xl cursor-pointer'
      }`}
    >
      {/* 1. Iconic 3 Red Vertical Stripes (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
        <div className="w-2 h-3.5 bg-red-600 rounded-b-xs shadow-xs" />
        <div className="w-2 h-3.5 bg-red-600 rounded-b-xs shadow-xs" />
        <div className="w-2 h-3.5 bg-red-600 rounded-b-xs shadow-xs" />
      </div>

      {/* Floating Coming Soon Badge */}
      {isComingSoon && (
        <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black text-[9px] uppercase tracking-wider shadow-xs">
          Coming Soon
        </div>
      )}

      {/* 2. Centered Food Photography */}
      <div className="relative w-full h-28 xs:h-32 sm:h-32 md:h-36 lg:h-32 xl:h-36 my-1 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
        {imgSrc && !hasError ? (
          <Image
            src={imgSrc}
            alt={item.name}
            fill
            unoptimized
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            onError={handleImageError}
            className={`object-cover transition-transform duration-500 ${
              isComingSoon ? 'opacity-90' : 'group-hover:scale-105'
            }`}
          />
        ) : (
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <Flame className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        )}
      </div>

      {/* 3. Item Details (Title, 2-line Description, Price) */}
      <div className="mt-2 sm:mt-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className={`text-xs sm:text-sm lg:text-sm xl:text-base font-black tracking-tight leading-snug line-clamp-1 transition min-h-[1.25rem] sm:min-h-0 ${
            isComingSoon ? 'text-neutral-700' : 'text-neutral-900 group-hover:text-red-600'
          }`}>
            {item.name}
          </h3>

          {item.description ? (
            <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-2 leading-tight sm:leading-relaxed mt-1 min-h-[24px] sm:min-h-[30px]">
              {item.description}
            </p>
          ) : (
            <div className="min-h-[24px] sm:min-h-[30px]" />
          )}
        </div>

        <div className="pt-2 pb-0.5 sm:pb-0">
          <p className="text-sm sm:text-base lg:text-base xl:text-lg font-black text-neutral-900">
            Rs {formattedPrice}
          </p>
        </div>
      </div>

      {/* 4. Centered Bottom Button */}
      <div className="absolute -bottom-3 sm:-bottom-3.5 left-0 right-0 flex justify-center z-20 px-1 sm:px-0">
        {isComingSoon ? (
          <div className="bg-neutral-800 text-amber-300 font-black text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-wider px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg shadow-md border border-neutral-700/80 flex items-center justify-center gap-1 whitespace-nowrap cursor-not-allowed select-none">
            <span>COMING SOON</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickAdd(item, e);
            }}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-wider px-3 sm:px-4 lg:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
          >
            <span className="pointer-events-none">+ ADD TO CART</span>
          </button>
        )}
      </div>
    </div>
  );
}
