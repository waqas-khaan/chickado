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
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-3 px-2 scroll-smooth"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.slug}`}
                className="shrink-0 w-44 sm:w-52 bg-white rounded-2xl border-2 border-amber-400 hover:border-amber-500 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between p-4 sm:p-5 text-center relative group cursor-pointer"
              >
                {/* Food Image */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 my-1 flex items-center justify-center">
                  {cat.image ? (
                    <div className="w-full h-full relative rounded-full overflow-hidden shadow-sm border border-neutral-100 bg-neutral-50 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        unoptimized
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-red-50 text-red-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <Flame className="w-10 h-10" />
                    </div>
                  )}
                </div>

                {/* Category Title matching Reference Image 1 */}
                <h3 className="text-xs sm:text-sm font-black text-neutral-900 group-hover:text-amber-600 transition tracking-wider uppercase mt-3 line-clamp-1">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
