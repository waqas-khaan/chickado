'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Flame, Sparkles } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  _count?: {
    items: number;
  };
  isComingSoon?: boolean;
}

interface ExploreMenuCarouselProps {
  categories: CategoryItem[];
  selectedCategory?: string | null;
  onSelectCategory?: (slug: string) => void;
  onResetCategory?: () => void;
}

export default function ExploreMenuCarousel({
  categories,
  selectedCategory,
  onSelectCategory,
  onResetCategory,
}: ExploreMenuCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <section className="py-12 bg-[#F4F6F8] relative overflow-hidden border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Reference Image 1 */}
        <div className="flex items-center justify-between mb-8 pb-1">
          {/* Left: EXPLORE MENU + Solid Red Underline Bar */}
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 uppercase font-heading">
                EXPLORE MENU
              </h2>
              {activeCategoryObj && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-sm animate-fadeIn">
                  <Flame className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{activeCategoryObj.name}</span>
                </span>
              )}
            </div>
            <div className="w-16 h-1 bg-red-600 mt-1.5 rounded-full" />
          </div>

          {/* Right: Reset Button & VIEW ALL + Red Underline */}
          <div className="flex items-center gap-3 sm:gap-4">
            {selectedCategory && onResetCategory && (
              <button
                type="button"
                onClick={onResetCategory}
                className="text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-3 py-1.5 rounded-xl border border-red-200/60 transition cursor-pointer"
              >
                Show Featured
              </button>
            )}
            <Link
              href="/menu"
              className="group flex flex-col items-center text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-900 hover:text-red-600 transition"
            >
              <span>VIEW ALL</span>
              <div className="w-full h-0.5 bg-red-600 mt-1 group-hover:scale-x-110 transition-transform origin-center" />
            </Link>
          </div>
        </div>

        {/* Carousel Container with Left/Right Circular Red Navigation Chevrons */}
        <div className="relative group/carousel">
          {/* Left Circular Red Button */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 hover:bg-red-700 active:scale-90 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
          </button>

          {/* Right Circular Red Button */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 hover:bg-red-700 active:scale-90 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
          >
            {categories.map((cat, index) => {
              const isComingSoon = Boolean(cat.isComingSoon);
              const isSelected = selectedCategory === cat.slug;

              const cardInner = (
                <>
                  {/* COMING SOON Top Floating Badge */}
                  {isComingSoon && (
                    <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md border border-white/40 flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-2.5 h-2.5 text-amber-200" />
                      <span>COMING SOON</span>
                    </div>
                  )}

                  {/* ACTIVE Selected Category Badge */}
                  {isSelected && (
                    <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md border border-white/40 flex items-center gap-1 whitespace-nowrap animate-fadeIn">
                      <Flame className="w-2.5 h-2.5 text-amber-200 fill-amber-200" />
                      <span>ACTIVE</span>
                    </div>
                  )}

                  {/* Food Image sitting in the top dome */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 my-auto flex items-center justify-center">
                    {cat.image ? (
                      <div
                        className={`relative w-full h-full rounded-full overflow-hidden bg-neutral-50/60 flex items-center justify-center transition-transform duration-500 ease-out ${
                          isComingSoon
                            ? 'opacity-85'
                            : isSelected
                            ? 'scale-108'
                            : 'group-hover:scale-108'
                        }`}
                      >
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          unoptimized
                          priority={index < 4}
                          loading={index < 4 ? 'eager' : 'lazy'}
                          sizes="(max-width: 640px) 112px, 140px"
                          className={`object-cover transition-transform duration-500 ${
                            isComingSoon ? '' : isSelected ? 'scale-105' : 'group-hover:scale-105'
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center shadow-inner group-hover:scale-108 transition-transform duration-300">
                        <Flame className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Content: Category Name + Pill Accent Underline Bar */}
                  <div className="w-full flex flex-col items-center pt-1 pb-1">
                    <h3
                      className={`text-xs sm:text-sm md:text-[15px] font-bold tracking-tight text-center px-1 line-clamp-1 transition-colors ${
                        isComingSoon
                          ? 'text-neutral-700'
                          : isSelected
                          ? 'text-red-600 font-black'
                          : 'text-neutral-900 group-hover:text-red-600'
                      }`}
                    >
                      {cat.name}
                    </h3>
                    {/* Signature Solid Pill Bar */}
                    <div
                      className={`h-1 sm:h-1.5 rounded-full mt-1.5 sm:mt-2 transition-all duration-300 ${
                        isComingSoon
                          ? 'w-8 bg-neutral-300'
                          : isSelected
                          ? 'w-14 bg-red-600 shadow-sm'
                          : 'w-9 sm:w-11 bg-red-600 group-hover:w-14'
                      }`}
                    />
                  </div>

                  {/* Signature Bottom-Right Dot Indicator */}
                  <div
                    aria-hidden="true"
                    className={`absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 shadow-2xs pointer-events-none ${
                      isComingSoon
                        ? 'bg-amber-400'
                        : isSelected
                        ? 'bg-red-600 scale-125'
                        : 'bg-[#E4E7EB] group-hover:bg-red-500 group-hover:scale-110'
                    }`}
                  />
                </>
              );

              if (isComingSoon) {
                return (
                  <div
                    key={cat.id}
                    aria-disabled="true"
                    title={`${cat.name} - Coming Soon to Chickado!`}
                    style={{ borderRadius: '50% 50% 50% 18px' }}
                    className="relative shrink-0 w-40 sm:w-48 md:w-52 aspect-[1/1.08] bg-white/90 border-2 border-dashed border-amber-300/80 shadow-[0_4px_14px_rgba(0,0,0,0.03)] flex flex-col items-center justify-between pt-4 sm:pt-5 pb-5 sm:pb-6 px-3.5 sm:px-4 text-center overflow-hidden select-none cursor-not-allowed opacity-90 hover:opacity-95 transition-all duration-200"
                  >
                    {cardInner}
                  </div>
                );
              }

              const cardClasses = `relative shrink-0 w-40 sm:w-48 md:w-52 aspect-[1/1.08] bg-white border-2 transition-all duration-300 flex flex-col items-center justify-between pt-4 sm:pt-5 pb-5 sm:pb-6 px-3.5 sm:px-4 text-center group cursor-pointer overflow-hidden select-none ${
                isSelected
                  ? 'border-red-600 ring-4 ring-red-500/25 shadow-xl shadow-red-500/20 -translate-y-2 bg-gradient-to-b from-red-50/40 via-white to-white'
                  : 'border-amber-400 hover:border-amber-500 shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1.5'
              }`;

              if (onSelectCategory) {
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.slug)}
                    style={{ borderRadius: '50% 50% 50% 18px' }}
                    className={cardClasses}
                    aria-pressed={isSelected}
                    aria-label={`View ${cat.name} menu items`}
                  >
                    {cardInner}
                  </button>
                );
              }

              return (
                <Link
                  key={cat.id}
                  href={`/menu?category=${cat.slug}`}
                  style={{ borderRadius: '50% 50% 50% 18px' }}
                  className={cardClasses}
                >
                  {cardInner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
