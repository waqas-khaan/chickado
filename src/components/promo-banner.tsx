'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { brandConfig } from '@/lib/brand';

interface PromoBannerProps {
  className?: string;
  fullWidth?: boolean;
}

interface BannerSlide {
  id: string;
  title: string;
  description: string;
  imagePng: string;
  imageWebpSrcSet: string;
  alt: string;
  whatsappMessage: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: 'baked-pasta',
    title: 'Baked Pasta - Hot • Cheesy • Loaded',
    description: 'Small Rs 400 (+Tax) • Large Rs 700 (+Tax)',
    imagePng: '/assets/baked-pasta-banner-hq.png',
    imageWebpSrcSet:
      '/assets/baked-pasta-banner-hq.webp 2560w, /assets/baked-pasta-banner-4k.webp 3840w',
    alt: 'Chickado Baked Pasta - Hot, Cheesy, Loaded. Small Rs 400 +Tax, Large Rs 700 +Tax. Click to Order Now on WhatsApp.',
    whatsappMessage:
      'Hi Chickado! I would like to order the Baked Pasta (Hot • Cheesy • Loaded) - Small (Rs 400) / Large (Rs 700).',
  },
  {
    id: 'crunch-box',
    title: 'Crunch Box - Hot • Crispy • Delicious',
    description: '1 Chicken Broast Pcs, 1 Crunch Burger, 1 Reg Drink - Rs 650 (+Tax)',
    imagePng: '/assets/crunch-box-banner-hq.png',
    imageWebpSrcSet:
      '/assets/crunch-box-banner-hq.webp 2560w, /assets/crunch-box-banner-4k.webp 3840w',
    alt: 'Chickado Crunch Box - Hot, Crispy, Delicious. 1 Chicken Broast Pcs, 1 Crunch Burger, 1 Reg Drink. RS 650 (+Tax). Click to Order Now on WhatsApp.',
    whatsappMessage:
      'Hi Chickado! I would like to order the Crunch Box Deal (1 Chicken Broast Pcs, 1 Crunch Burger, 1 Reg Drink) - Rs 650 (+Tax).',
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

export default function PromoBanner({
  className = '',
  fullWidth = true,
}: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-slide every 5 seconds unless paused by hover or touch
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, goToNext, currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diffX = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 40;
      if (diffX > minSwipeDistance) {
        goToNext();
      } else if (diffX < -minSwipeDistance) {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#3A020F] text-white border-b border-red-950/40 shadow-sm group/slider ${className}`}
      aria-label="Promotional Deals Billboard Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Billboard Track */}
      <div
        className="flex w-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNERS.map((banner, index) => {
          const whatsappUrl = `https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
            banner.whatsappMessage
          )}`;

          return (
            <div
              key={banner.id}
              className="min-w-full w-full flex-shrink-0 relative aspect-[1024/340] min-h-[140px] sm:min-h-0 bg-[#3A020F] overflow-hidden"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full h-full cursor-pointer select-none"
                title={`Click to Order ${banner.title} on WhatsApp`}
                tabIndex={currentIndex === index ? 0 : -1}
                aria-label={`Order ${banner.title}`}
              >
                {/* Responsive Ultra-HD 4K/2.5K Picture Elements for Razor-Sharp Full-Width Display */}
                <picture className="block w-full h-full">
                  <source
                    type="image/webp"
                    srcSet={banner.imageWebpSrcSet}
                    sizes="100vw"
                  />
                  <img
                    src={banner.imagePng}
                    alt={banner.alt}
                    className="w-full h-full object-cover transform group-hover:scale-[1.008] transition-transform duration-500 ease-out"
                    loading="eager"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                </picture>

                {/* Interactive Hover Sheen Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators / Pill Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-xl">
        {BANNERS.map((banner, index) => {
          const isActive = currentIndex === index;
          return (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${banner.title}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                isActive
                  ? 'w-7 bg-gradient-to-r from-red-500 via-amber-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                  : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
