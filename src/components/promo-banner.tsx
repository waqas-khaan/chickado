'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface PromoBannerProps {
  className?: string;
}

interface BannerSlide {
  id: string;
  title: string;
  description: string;
  imagePng: string;
  imageWebpSrcSet: string;
  alt: string;
  whatsappMessage?: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: 'lucky-box',
    title: 'Chickado Lucky Box - Win an iPhone 17 Pro Max',
    description: 'Spend Rs. 3,000 or more -> Get 1 Lucky Draw Entry! Monthly Draw.',
    imagePng: '/assets/banners/lucky-box-banner-hq.png',
    imageWebpSrcSet:
      '/assets/banners/lucky-box-banner-mobile.webp 800w, /assets/banners/lucky-box-banner-md.webp 1400w, /assets/banners/lucky-box-banner-hq.webp 2048w, /assets/banners/lucky-box-banner-4k.webp 2560w',
    alt: 'Chickado Lucky Box - Spend Rs. 3,000 or more to get 1 Lucky Draw Entry! Win an iPhone 17 Pro Max. Monthly Draw. Dine-in, Takeaway, Delivery.',
    whatsappMessage:
      'Hi Chickado! I would like to order and enter the Chickado Lucky Box Lucky Draw (Win an iPhone 17 Pro Max).',
  },
  {
    id: 'baked-pasta',
    title: 'Baked Pasta - Hot • Cheesy • Loaded',
    description: 'Small Rs 400 (+Tax) • Large Rs 700 (+Tax)',
    imagePng: '/assets/banners/baked-pasta-banner-hq.png',
    imageWebpSrcSet:
      '/assets/banners/baked-pasta-banner-mobile.webp 800w, /assets/banners/baked-pasta-banner-md.webp 1400w, /assets/banners/baked-pasta-banner-hq.webp 2048w, /assets/banners/baked-pasta-banner-4k.webp 2560w',
    alt: 'Chickado Baked Pasta - Hot, Cheesy, Loaded. Small Rs 400 +Tax, Large Rs 700 +Tax.',
    whatsappMessage:
      'Hi Chickado! I would like to order the Baked Pasta (Hot • Cheesy • Loaded) - Small (Rs 400) / Large (Rs 700).',
  },
  {
    id: 'crunch-box',
    title: 'Crunch Box - Hot • Crispy • Delicious',
    description: '1 Chicken Broast Pcs, 1 Crunch Burger, 1 Reg Drink - Rs 650 (+Tax)',
    imagePng: '/assets/banners/crunch-box-banner-hq.png',
    imageWebpSrcSet:
      '/assets/banners/crunch-box-banner-mobile.webp 800w, /assets/banners/crunch-box-banner-md.webp 1400w, /assets/banners/crunch-box-banner-hq.webp 2048w, /assets/banners/crunch-box-banner-4k.webp 2560w',
    alt: 'Chickado Crunch Box - Hot, Crispy, Delicious. 1 Chicken Broast Pcs, 1 Crunch Burger, 1 Reg Drink. RS 650 (+Tax).',
    whatsappMessage:
      'Hi Chickado! I would like to order the Crunch Box Deal (1 Chicken Broast Pcs, 1 Crunch Burger, 1 Reg Drink) - Rs 650 (+Tax).',
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

export default function PromoBanner({
  className = '',
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
          return (
            <div
              key={banner.id}
              className="min-w-full w-full flex-shrink-0 relative aspect-[1024/340] min-h-[140px] sm:min-h-0 bg-[#3A020F] overflow-hidden select-none pointer-events-none"
            >
              {/* Responsive Ultra-HD 4K/2.5K Picture Elements for Razor-Sharp Full-Width Display */}
              <picture className="block w-full h-full">
                <source
                  type="image/webp"
                  srcSet={banner.imageWebpSrcSet}
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1920px"
                />
                <img
                  src={banner.imagePng}
                  alt={banner.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </picture>
            </div>
          );
        })}
      </div>
    </section>
  );
}
