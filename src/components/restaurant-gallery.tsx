'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Layers,
  Utensils,
  Heart,
} from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: 'hall' | 'lounge' | 'neon';
  tag: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '1',
    src: '/assets/gallery/interior-01.jpg',
    title: 'Plush Velvet Lounge',
    subtitle: 'Curved red velvet seating framed by rose trellis arches and glowing mascot',
    category: 'lounge',
    tag: 'VIP Lounge',
  },
  {
    id: '2',
    src: '/assets/gallery/interior-02.jpg',
    title: 'Executive Dining Suite',
    subtitle: 'Gold-veined black marble tables with ambient greenery and entertainment displays',
    category: 'hall',
    tag: 'Dining Hall',
  },
  {
    id: '3',
    src: '/assets/gallery/interior-03.jpg',
    title: 'Terrace-View Dining',
    subtitle: 'Sleek executive seating overlooking the sunlit outdoor terrace and glass wall',
    category: 'hall',
    tag: 'Dining Hall',
  },
  {
    id: '4',
    src: '/assets/gallery/interior-04.jpg',
    title: 'Illuminated Staircase Table',
    subtitle: 'Family banquet table set against our signature warm golden-lit staircase',
    category: 'hall',
    tag: 'Family Dining',
  },
  {
    id: '5',
    src: '/assets/gallery/interior-05.jpg',
    title: 'Grand Banquet Setting',
    subtitle: 'Warm architectural lighting and marble table arrangements for large groups',
    category: 'hall',
    tag: 'Dining Hall',
  },
  {
    id: '6',
    src: '/assets/gallery/interior-06.jpg',
    title: 'Chickado Mascot Wall',
    subtitle: 'Vibrant neon 3D Chickado mascot sign radiating warmth over the dining floor',
    category: 'neon',
    tag: 'Neon & Ambiance',
  },
  {
    id: '7',
    src: '/assets/gallery/interior-07.jpg',
    title: 'Main Saddar Dining Floor',
    subtitle: 'Expansive view of our flagship restaurant floor with panoramic street windows',
    category: 'hall',
    tag: 'Main Floor',
  },
  {
    id: '8',
    src: '/assets/gallery/interior-08.jpg',
    title: 'Signature Dining Corner',
    subtitle: 'Bespoke leather seating framed by floral arch mirror and Chickado branding',
    category: 'neon',
    tag: 'Brand Corner',
  },
  {
    id: '9',
    src: '/assets/gallery/interior-09.jpg',
    title: 'Celebration Floral Arch',
    subtitle: 'Pastel balloon installation and floral archway welcoming party celebrations',
    category: 'lounge',
    tag: 'Celebration Space',
  },
  {
    id: '10',
    src: '/assets/gallery/interior-10.jpg',
    title: 'Contemporary Place Setting',
    subtitle: 'Impeccable table arrangements with digital smart menus and polished cutlery',
    category: 'hall',
    tag: 'Table Detail',
  },
  {
    id: '11',
    src: '/assets/gallery/interior-11.jpg',
    title: 'Central Dining Vista',
    subtitle: 'Comfortable bucket seating and refined modern finishes across the dining area',
    category: 'hall',
    tag: 'Dining Hall',
  },
  {
    id: '12',
    src: '/assets/gallery/interior-12.jpg',
    title: 'Botanical Infinity Glow Wall',
    subtitle: 'Backlit emerald botanical garden installation reflected in polished marble',
    category: 'neon',
    tag: 'Neon & Ambiance',
  },
  {
    id: '13',
    src: '/assets/gallery/interior-13.jpg',
    title: 'Bite Into Joy Mascot Icon',
    subtitle: 'Artistic close-up of our signature mascot sign surrounded by fresh white blossoms',
    category: 'neon',
    tag: 'Brand Art',
  },
];

type CategoryFilter = 'all' | 'hall' | 'lounge' | 'neon';

const FILTER_TABS: { label: string; value: CategoryFilter; count: number }[] = [
  { label: 'All Photos', value: 'all', count: GALLERY_PHOTOS.length },
  {
    label: 'Dining Hall',
    value: 'hall',
    count: GALLERY_PHOTOS.filter((p) => p.category === 'hall').length,
  },
  {
    label: 'Velvet Lounge & VIP',
    value: 'lounge',
    count: GALLERY_PHOTOS.filter((p) => p.category === 'lounge').length,
  },
  {
    label: 'Neon & Ambiance',
    value: 'neon',
    count: GALLERY_PHOTOS.filter((p) => p.category === 'neon').length,
  },
];

export default function RestaurantGallery() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);

  const openLightbox = (photoId: string) => {
    const idx = GALLERY_PHOTOS.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1;
    });
  }, []);

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const currentPhoto = lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-black uppercase tracking-wider shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>Interior & Dining Gallery</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase leading-tight font-heading">
          Step Inside Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
            Saddar Flagship
          </span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
          From lush red velvet VIP booths to ambient golden staircases and vibrant neon branding, every inch of Chickado is crafted for joyous gatherings, family feasts, and high-energy dining.
        </p>

        {/* Location & Photo count pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100/90 text-neutral-700 font-semibold border border-neutral-200">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Opposite Sunhri Masjid, Near MCB Bank, Saddar, Peshawar</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200/80">
            <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
            <span>{GALLERY_PHOTOS.length} Ambiance Photos</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/10 scale-102'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, index) => {
          // Highlight first 2 items on larger screens if on 'all' tab
          const isFeatured = activeFilter === 'all' && (index === 0 || index === 7);

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-neutral-950 border border-neutral-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
                isFeatured
                  ? 'sm:col-span-2 sm:row-span-2 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]'
                  : 'aspect-[3/4]'
              }`}
            >
              {/* Image */}
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                unoptimized
              />

              {/* Tag Pill Top-Left */}
              <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                  {photo.tag}
                </span>
              </div>

              {/* Zoom Button Top-Right (revealed on hover) */}
              <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md transform group-hover:scale-100 scale-90">
                <Maximize2 className="w-4 h-4 text-neutral-800" />
              </div>

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Caption Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-1.5 text-red-400 text-xs font-black uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 fill-red-400" />
                  <span>Chickado Saddar</span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-tight text-white font-heading">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-snug font-normal opacity-90 group-hover:opacity-100">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-600 text-white tracking-wider uppercase">
                {currentPhoto.tag}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                Photo <strong className="text-white">{lightboxIndex + 1}</strong> of{' '}
                {GALLERY_PHOTOS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={closeLightbox}
                aria-label="Close Gallery Lightbox"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image with Prev / Next Navigation */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={showPrev}
              aria-label="Previous Photo"
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer backdrop-blur-md shadow-xl"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              aria-label="Next Photo"
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer backdrop-blur-md shadow-xl"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full h-[62vh] sm:h-[72vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Caption & Thumbnail Strip */}
          <div
            className="w-full max-w-4xl text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <h4 className="text-lg sm:text-xl font-black text-white font-heading">
                {currentPhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-normal">
                {currentPhoto.subtitle}
              </p>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
              {GALLERY_PHOTOS.map((photo, idx) => {
                const isCurrent = idx === lightboxIndex;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                      isCurrent
                        ? 'border-red-500 scale-105 shadow-md ring-2 ring-red-500/50'
                        : 'border-white/20 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="60px"
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
