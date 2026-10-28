'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  BookOpen,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Phone,
} from 'lucide-react';
import { brandConfig } from '@/lib/brand';
import { WhatsAppIcon } from '@/components/social-icons';

const MENU_PAGES = [
  {
    page: 1,
    title: 'Combos & Deals',
    subtitle: 'Crunch Box, Duo Deals & Mega Feasts',
    image: '/menu-book/page-1.webp',
  },
  {
    page: 2,
    title: 'Chicken & Drinks',
    subtitle: 'Broast, Crispy Wings, Fries & Mocktails',
    image: '/menu-book/page-2.webp',
  },
  {
    page: 3,
    title: 'Gourmet Pizzas',
    subtitle: 'Crown Crust, Bihari Kebab & Extreme Pizza',
    image: '/menu-book/page-3.webp',
  },
  {
    page: 4,
    title: 'Burgers & Pasta',
    subtitle: 'Zinger Burgers & Oven-Baked Loaded Pasta',
    image: '/menu-book/page-4.webp',
  },
];

export default function MenuBookPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'scroll' | 'single'>('scroll');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update page indicators on scroll
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      pageRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
          setCurrentPage(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const scrollToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (viewMode === 'scroll') {
      const target = pageRefs.current[pageNumber - 1];
      if (target) {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Chickado Official Menu Book',
          text: 'Explore the official menu book of Chickado Peshawar!',
          url: window.location.href,
        });
        return;
      } catch {
        // user cancelled or unsupported
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#140206] text-white flex flex-col selection:bg-red-600 selection:text-white">
      {/* Sticky Top Navigation & Utility Bar */}
      <header className="sticky top-0 z-40 bg-[#1e030a]/95 backdrop-blur-md border-b border-red-900/40 shadow-xl transition-all">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wide transition active:scale-95 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden xs:inline">Back to</span> Home
          </Link>

          {/* Center Brand Title & Page Indicator */}
          <div className="flex flex-col items-center text-center truncate px-1">
            <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Menu Book</span>
            </span>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              Page {currentPage} of {MENU_PAGES.length} • {MENU_PAGES[currentPage - 1].title}
            </span>
          </div>

          {/* Right Action Icons: Download PDF, Share */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white transition active:scale-95"
              title="Share Menu Book"
              aria-label="Share Menu Book link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href="/menu-book/chickado-menu.pdf"
              download="chickado-menu.pdf"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white text-xs font-bold transition active:scale-95"
              title="Download PDF version"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">PDF</span>
            </a>

            <a
              href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
                'Hi Chickado! I am viewing your Official Menu Book and would like to place an order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-black tracking-wider transition bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm hover:shadow-emerald-500/30 active:scale-95 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Order Now</span>
            </a>
          </div>
        </div>

        {/* Quick Page Jump Pills */}
        <div className="bg-[#120105]/80 border-t border-red-950/60 px-3 py-2 overflow-x-auto no-scrollbar">
          <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max">
            {MENU_PAGES.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => scrollToPage(item.page)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-heading font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-600/30 ring-1 ring-amber-400/40'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[9px] font-black">
                    {item.page}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Menu Book Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-2 sm:px-6 py-4 sm:py-8 space-y-6">
        {copied && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold shadow-2xl animate-scaleUp">
            Link copied to clipboard!
          </div>
        )}

        {/* Scroll Mode (All Pages stacked with crisp high-res WebP) */}
        <div className="space-y-6 sm:space-y-10" ref={scrollContainerRef}>
          {MENU_PAGES.map((pageItem, index) => (
            <div
              key={pageItem.page}
              ref={(el) => {
                pageRefs.current[index] = el;
              }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border-2 border-red-950/60 ring-1 ring-white/10 group"
            >
              {/* Page Header Ribbon */}
              <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 bg-gradient-to-r from-[#2a040d] via-[#3a0613] to-[#2a040d] border-b border-red-950/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-black text-[10px] uppercase tracking-wider border border-amber-500/30">
                    Page {pageItem.page}
                  </span>
                  <span className="font-heading font-black text-white text-xs sm:text-sm">
                    {pageItem.title}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 hidden sm:inline">
                  {pageItem.subtitle}
                </span>
              </div>

              {/* High-Resolution Page Visual */}
              <div className="relative w-full aspect-[1812/2375] bg-neutral-950">
                <Image
                  src={pageItem.image}
                  alt={`Chickado Official Menu Book - Page ${pageItem.page}: ${pageItem.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                  priority={pageItem.page <= 2}
                  className="object-contain"
                />
              </div>

              {/* Bottom Quick Order Strip */}
              <div className="p-3 bg-[#1d0309] border-t border-red-950/60 flex items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 text-[11px] truncate">
                  Spot something you like on Page {pageItem.page}?
                </span>
                <a
                  href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
                    `Hi Chickado! I am looking at Page ${pageItem.page} (${pageItem.title}) of your Menu Book and would like to order.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-heading font-black text-xs hover:scale-105 active:scale-95 transition whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Store Contact & Hotline Banner */}
        <section className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-[#2a040d] to-[#1a0208] border border-red-900/40 text-center space-y-4 shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            Craving Legendary Crunch?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
            Order for Dine-in, Takeaway, or Lightning Delivery across Peshawar Saddar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${brandConfig.whatsappCleanNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs sm:text-sm transition shadow-lg shadow-emerald-950"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp ({brandConfig.phone})</span>
            </a>
            <a
              href={`tel:${brandConfig.phone}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs sm:text-sm transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Store Directly</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
