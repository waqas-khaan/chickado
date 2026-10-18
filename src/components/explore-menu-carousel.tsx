'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  _count?: {
    items: number;
  };
}

interface ExploreMenuCarouselProps {
  categories: CategoryItem[];
}

export default function ExploreMenuCarousel({ categories }: ExploreMenuCarouselProps) {
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

  return (
    <section className="py-12 bg-[#F4F6F8] relative overflow-hidden border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Reference Image 1 */}
        <div className="flex items-center justify-between mb-8 pb-1">
          {/* Left: EXPLORE MENU + Solid Red Underline Bar */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 uppercase font-heading">
              EXPLORE MENU
            </h2>
            <div className="w-16 h-1 bg-red-600 mt-1.5 rounded-full" />
          </div>

          {/* Right: VIEW ALL + Red Underline */}
          <Link
            href="/menu"
            className="group flex flex-col items-center text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-900 hover:text-red-600 transition"
          >
            <span>VIEW ALL</span>
            <div className="w-full h-0.5 bg-red-600 mt-1 group-hover:scale-x-110 transition-transform origin-center" />
          </Link>
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
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.slug}`}
                style={{ borderRadius: '50% 50% 50% 18px' }}
                className="relative shrink-0 w-40 sm:w-48 md:w-52 aspect-[1/1.08] bg-white border-2 border-amber-400 hover:border-amber-500 shadow-[0_4px_18px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between pt-4 sm:pt-5 pb-5 sm:pb-6 px-3.5 sm:px-4 text-center group cursor-pointer overflow-hidden select-none"
              >
                {/* Food Image sitting in the top dome */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 my-auto flex items-center justify-center">
                  {cat.image ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-50/60 group-hover:scale-108 transition-transform duration-500 ease-out flex items-center justify-center">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 112px, 140px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center shadow-inner group-hover:scale-108 transition-transform duration-300">
                      <Flame className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                  )}
                </div>

                {/* Bottom Content: Category Name + Red Accent Underline Bar */}
                <div className="w-full flex flex-col items-center pt-1 pb-1">
                  <h3 className="text-xs sm:text-sm md:text-[15px] font-bold text-neutral-900 group-hover:text-red-600 transition-colors tracking-tight text-center px-1 line-clamp-1">
                    {cat.name}
                  </h3>
                  {/* Signature Solid Red Accent Pill Bar */}
                  <div className="w-9 sm:w-11 h-1 sm:h-1.5 bg-red-600 rounded-full mt-1.5 sm:mt-2 group-hover:w-14 transition-all duration-300" />
                </div>

                {/* Signature Bottom-Right Dot Indicator */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#E4E7EB] group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 shadow-2xs pointer-events-none"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
