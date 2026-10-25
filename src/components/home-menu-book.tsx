'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useMenuBookStore } from '@/lib/menu-book-store';

// Synthesized Realistic Physical Paper Sound via Web Audio API (Zero Latency, No MP3 Needed)
function playPaperRustle(isMuted: boolean) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const duration = 0.4;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI) * Math.exp(-t * 3.5);
      output[i] = (Math.random() * 2 - 1) * envelope * 0.4;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    whiteNoise.start();
  } catch (e) {
    // Audio context not allowed or unsupported
  }
}

export default function HomeMenuBook() {
  const {
    activeSpread,
    activePage,
    viewMode,
    zoom,
    setSpread,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useMenuBookStore();

  const [bookState, setBookState] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [flipState, setFlipState] = useState<'idle' | 'flipping-next' | 'flipping-prev'>('idle');
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const openedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger realistic cover opening
  const triggerOpening = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setBookState('opening');
    playPaperRustle(isMuted);

    openedTimerRef.current = setTimeout(() => {
      setBookState('opened');
    }, 1350);
  }, [isMuted]);

  // Front page displays on site open for 5 seconds, then flips open automatically
  useEffect(() => {
    setMounted(true);
    setBookState('closed');
    setFlipState('idle');
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Flip front page after exactly 5 seconds
    openTimerRef.current = setTimeout(() => {
      clearInterval(interval);
      triggerOpening();
    }, 5000);

    return () => {
      clearInterval(interval);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (openedTimerRef.current) clearTimeout(openedTimerRef.current);
    };
  }, [triggerOpening]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleTurnNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handleTurnPrev();
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-') {
        zoomOut();
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSpread, activePage, flipState, zoomIn, zoomOut, resetZoom]);

  // Reset pan when zoom is 1
  useEffect(() => {
    if (zoom === 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  // Realistic 3D Page Flip Forward: Spread 1 -> Spread 2
  const handleTurnNext = useCallback(() => {
    if (flipState !== 'idle' || bookState !== 'opened') return;
    if (activeSpread === 2) return;

    playPaperRustle(isMuted);
    setFlipState('flipping-next');

    setTimeout(() => {
      setSpread(2);
      setFlipState('idle');
    }, 850);
  }, [flipState, bookState, activeSpread, isMuted, setSpread]);

  // Realistic 3D Page Flip Backward: Spread 2 -> Spread 1
  const handleTurnPrev = useCallback(() => {
    if (flipState !== 'idle' || bookState !== 'opened') return;
    if (activeSpread === 1) return;

    playPaperRustle(isMuted);
    setFlipState('flipping-prev');

    setTimeout(() => {
      setSpread(1);
      setFlipState('idle');
    }, 850);
  }, [flipState, bookState, activeSpread, isMuted, setSpread]);

  const handleManualOpen = () => {
    if (bookState === 'closed') {
      triggerOpening();
    }
  };

  // Pan dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!mounted) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-neutral-500 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span>Opening Chickado Menu Book...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative select-none">
      {/* ====================================================================
          REALISTIC 3D PHYSICAL BOOK STAGE (THE CENTERPIECE)
          ==================================================================== */}
      <section
        className="relative w-full flex-1 min-h-[calc(100vh-6rem)] flex items-center justify-center py-6 sm:py-8 px-3 sm:px-6 lg:px-8 perspective-book overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Soft Ambient Depth Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[34rem] h-[34rem] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[34rem] h-[34rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* BOOK CONTAINER WITH ZOOM & PAN */}
        <div
          className={`relative max-w-full max-h-full transition-transform duration-200 ${
            zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
          }`}
          style={{
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          onMouseDown={handleMouseDown}
        >
          {viewMode === 'spread' ? (
            <div className="relative preserve-3d">
              {/* ----------------------------------------------------
                  SUB-STATE 1: BOOK IS FULLY CLOSED (3S COUNTDOWN)
                  ---------------------------------------------------- */}
              {bookState === 'closed' && (
                <div
                  onClick={handleManualOpen}
                  className="cursor-pointer group relative w-[310px] sm:w-[410px] md:w-[480px] lg:w-[540px] xl:w-[580px] max-w-[90vw] aspect-[1812/2375] rounded-r-2xl rounded-l-md shadow-2xl transition-all duration-500 hover:scale-[1.02] preserve-3d book-hardcover-casing p-2"
                >
                  {/* Spine on left */}
                  <div className="absolute -left-3 top-0 bottom-0 w-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950 rounded-l-md shadow-inner" />

                  {/* Stacked Paper Edge visible on right */}
                  <div className="absolute right-0 top-3 bottom-3 w-3 paper-stack-edge-right rounded-r-sm" />
                  <div className="absolute left-3 right-3 bottom-0 h-2.5 paper-stack-edge-bottom rounded-b-sm" />

                  {/* Front Cover Image */}
                  <div className="relative w-full h-full rounded-r-xl overflow-hidden border border-amber-500/60 shadow-lg">
                    <Image
                      src="/menu-book/book-cover.webp"
                      alt="Chickado Menu Book Cover"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/15 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------
                  SUB-STATE 2: BOOK COVER OPENING ANIMATION IN 3D
                  ---------------------------------------------------- */}
              {bookState === 'opening' && (
                <div
                  className="relative w-[340px] sm:w-[580px] md:w-[760px] lg:w-[980px] xl:w-[1240px] 2xl:w-[1460px] max-w-[95vw] max-h-[82vh] aspect-[3625/2375] rounded-2xl book-hardcover-casing p-2 sm:p-2.5 preserve-3d"
                >
                  {/* Stacked paper edge depths on sides */}
                  <div className="absolute -left-2 top-3 bottom-3 w-2.5 paper-stack-edge-left rounded-l-xs pointer-events-none" />
                  <div className="absolute -right-2 top-3 bottom-3 w-2.5 paper-stack-edge-right rounded-r-xs pointer-events-none" />
                  <div className="absolute left-4 right-4 -bottom-2 h-2.5 paper-stack-edge-bottom rounded-b-xs pointer-events-none" />

                  {/* SEAMLESS INNER TWO-PAGE SPREAD CANVAS */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden preserve-3d flex bg-neutral-950 shadow-inner">
                    {/* Left Half (Underneath): Page 1 (Combos) */}
                    <div className="relative w-1/2 h-full overflow-hidden select-none">
                      <Image
                        src="/menu-book/page-1.webp"
                        alt="Chickado Combos & Deals"
                        fill
                        priority
                        className="object-cover object-right"
                      />
                      <div className="absolute inset-0 page-shadow-left pointer-events-none" />
                    </div>

                    {/* Right Half (Underneath): Page 2 (Bar Menu) */}
                    <div className="relative w-1/2 h-full overflow-hidden select-none">
                      <Image
                        src="/menu-book/page-2.webp"
                        alt="Chickado Bar Menu"
                        fill
                        priority
                        className="object-cover object-left"
                      />
                      <div className="absolute inset-0 page-shadow-right pointer-events-none" />
                    </div>

                    {/* NATURAL SEAMLESS BOOK SPINE BINDING CREASE */}
                    <div className="book-spine-crease">
                      <div className="book-spine-shadow-ambient" />
                      <div className="book-spine-seam-line" />
                      <div className="book-spine-highlight-line" />
                    </div>

                    {/* 3D FRONT COVER LEAF SWINGING FROM RIGHT (0deg) TO LEFT (-180deg) */}
                    <div
                      className="absolute top-0 bottom-0 right-0 w-1/2 preserve-3d animate-realistic-cover-open z-40"
                    >
                      {/* Front Face: Book Cover */}
                      <div className="absolute inset-0 backface-hidden rounded-r-xl overflow-hidden border border-amber-500/60 shadow-2xl">
                        <Image
                          src="/menu-book/book-cover.webp"
                          alt="Chickado Front Cover"
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>

                      {/* Back Face: Inside Cover (Rotated 180deg) */}
                      <div
                        className="absolute inset-0 backface-hidden rounded-l-xl overflow-hidden border border-amber-500/40 shadow-2xl"
                        style={{ transform: 'rotateY(180deg)' }}
                      >
                        <Image
                          src="/menu-book/inside-cover.webp"
                          alt="Inside Cover"
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------
                  SUB-STATE 3: BOOK FULLY OPENED (INTERACTIVE 3D FLIPBOOK)
                  ---------------------------------------------------- */}
              {bookState === 'opened' && (
                <div
                  className="relative w-[340px] sm:w-[580px] md:w-[760px] lg:w-[980px] xl:w-[1240px] 2xl:w-[1460px] max-w-[95vw] max-h-[82vh] aspect-[3625/2375] rounded-2xl book-hardcover-casing p-2 sm:p-2.5 preserve-3d"
                >
                  {/* Stacked paper edge depths on sides */}
                  <div className="absolute -left-2 top-3 bottom-3 w-2.5 paper-stack-edge-left rounded-l-xs pointer-events-none" />
                  <div className="absolute -right-2 top-3 bottom-3 w-2.5 paper-stack-edge-right rounded-r-xs pointer-events-none" />
                  <div className="absolute left-4 right-4 -bottom-2 h-2.5 paper-stack-edge-bottom rounded-b-xs pointer-events-none" />

                  {/* ========================================================
                      SEAMLESS INNER BOOK SPREAD CANVAS (NO GAPS, PERFECT RATIO)
                      ======================================================== */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden preserve-3d flex bg-neutral-950 shadow-inner">
                    {/* ---------------- LEFT WING BASE (STATIC OR UNDERNEATH) ---------------- */}
                    <div
                      onClick={handleTurnPrev}
                      className={`relative w-1/2 h-full overflow-hidden select-none ${
                        activeSpread === 2 ? 'cursor-pointer group' : ''
                      }`}
                    >
                      {/* Spread 1 Left Page is Page 1 (Combos); Spread 2 Left Page is Page 3 (Pizzas) */}
                      <Image
                        src={
                          flipState === 'flipping-prev'
                            ? '/menu-book/page-1.webp' // Revealed as page flips back
                            : activeSpread === 1
                            ? '/menu-book/page-1.webp'
                            : '/menu-book/page-3.webp'
                        }
                        alt="Chickado Left Page"
                        fill
                        priority
                        className="object-cover object-right"
                      />
                      {/* Realistic Natural Page Curve Shadow near Spine */}
                      <div className="absolute inset-0 page-shadow-left pointer-events-none" />

                      {/* Dynamic shadow landing on left page during forward flip */}
                      {flipState === 'flipping-next' && (
                        <div
                          className="absolute inset-0 bg-black/40 pointer-events-none"
                          style={{ animation: 'pageUnderneathLand 0.85s ease-in-out forwards' }}
                        />
                      )}

                      {/* Left Page Dog-Ear Corner on Spread 2 */}
                      {activeSpread === 2 && flipState === 'idle' && (
                        <div className="absolute bottom-2 left-2 z-20 page-corner-curl-left pointer-events-none">
                          <div className="px-2.5 py-1 rounded-md bg-neutral-900/90 text-amber-300 font-bold text-[10px] uppercase border border-amber-500/40 shadow-lg flex items-center gap-1">
                            <ChevronLeft className="w-3 h-3 text-red-500" />
                            <span>Turn Back</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ---------------- RIGHT WING BASE (STATIC OR UNDERNEATH) ---------------- */}
                    <div
                      onClick={handleTurnNext}
                      className={`relative w-1/2 h-full overflow-hidden select-none ${
                        activeSpread === 1 ? 'cursor-pointer group' : ''
                      }`}
                    >
                      {/* Spread 1 Right Page is Page 2 (Bar); Spread 2 Right Page is Page 4 (Burgers) */}
                      <Image
                        src={
                          flipState === 'flipping-next'
                            ? '/menu-book/page-4.webp' // Revealed as page lifts forward
                            : activeSpread === 1
                            ? '/menu-book/page-2.webp'
                            : '/menu-book/page-4.webp'
                        }
                        alt="Chickado Right Page"
                        fill
                        priority
                        className="object-cover object-left"
                      />
                      {/* Realistic Natural Page Curve Shadow near Spine */}
                      <div className="absolute inset-0 page-shadow-right pointer-events-none" />

                      {/* Dynamic shadow lifting off right page during forward flip */}
                      {flipState === 'flipping-next' && (
                        <div
                          className="absolute inset-0 bg-black/40 pointer-events-none"
                          style={{ animation: 'pageUnderneathLift 0.85s ease-out forwards' }}
                        />
                      )}

                      {/* Right Page Dog-Ear Corner on Spread 1 */}
                      {activeSpread === 1 && flipState === 'idle' && (
                        <div className="absolute bottom-2 right-2 z-20 page-corner-curl-right pointer-events-none">
                          <div className="px-2.5 py-1 rounded-md bg-neutral-900/90 text-amber-300 font-bold text-[10px] uppercase border border-amber-500/40 shadow-lg flex items-center gap-1">
                            <span>Turn Page</span>
                            <ChevronRight className="w-3 h-3 text-red-500" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ---------------- NATURAL SEAMLESS BOOK SPINE CREASE ---------------- */}
                    <div className="book-spine-crease">
                      <div className="book-spine-shadow-ambient" />
                      <div className="book-spine-seam-line" />
                      <div className="book-spine-highlight-line" />
                    </div>

                    {/* ---------------- DYNAMIC 3D TURNING PAGE LEAF ---------------- */}
                    {/* Forward Turning Leaf: Right Page (Page 2) lifts and turns to Left Page (Page 3) */}
                    {flipState === 'flipping-next' && (
                      <div
                        className="absolute top-0 bottom-0 right-0 w-1/2 preserve-3d z-40 pointer-events-none"
                        style={{
                          transformOrigin: 'left center',
                          animation: 'pageFlipForward 0.85s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
                        }}
                      >
                        {/* Front Face: Page 2 (Bar Menu) */}
                        <div className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl">
                          <Image
                            src="/menu-book/page-2.webp"
                            alt="Turning Page Front"
                            fill
                            priority
                            className="object-cover object-left"
                          />
                          {/* Dynamic lighting sheen moving across the page */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenForward 0.85s ease-in-out forwards',
                            }}
                          />
                          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
                        </div>

                        {/* Back Face: Page 3 (Pizzas, facing left when turned) */}
                        <div
                          className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl"
                          style={{ transform: 'rotateY(180deg)' }}
                        >
                          <Image
                            src="/menu-book/page-3.webp"
                            alt="Turning Page Back"
                            fill
                            priority
                            className="object-cover object-right"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenBackward 0.85s ease-in-out forwards',
                            }}
                          />
                          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/35 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* Backward Turning Leaf: Left Page (Page 3) lifts and turns to Right Page (Page 2) */}
                    {flipState === 'flipping-prev' && (
                      <div
                        className="absolute top-0 bottom-0 left-0 w-1/2 preserve-3d z-40 pointer-events-none"
                        style={{
                          transformOrigin: 'right center',
                          animation: 'pageFlipBackward 0.85s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
                        }}
                      >
                        {/* Front Face: Page 3 (Pizzas) */}
                        <div className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl">
                          <Image
                            src="/menu-book/page-3.webp"
                            alt="Turning Page Backwards Front"
                            fill
                            priority
                            className="object-cover object-right"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenBackward 0.85s ease-in-out forwards',
                            }}
                          />
                          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/35 to-transparent pointer-events-none" />
                        </div>

                        {/* Back Face: Page 2 (Bar Menu, landing on right side) */}
                        <div
                          className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl"
                          style={{ transform: 'rotateY(180deg)' }}
                        >
                          <Image
                            src="/menu-book/page-2.webp"
                            alt="Turning Page Backwards Back"
                            fill
                            priority
                            className="object-cover object-left"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenForward 0.85s ease-in-out forwards',
                            }}
                          />
                          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ====================================================================
               MODE B: SINGLE PAGE VIEW (FOCUS MODE)
               ==================================================================== */
            <div className="relative w-[300px] sm:w-[420px] md:w-[520px] lg:w-[620px] xl:w-[700px] max-w-[90vw] max-h-[82vh] aspect-[1812/2375] rounded-xl overflow-hidden bg-neutral-900 border-2 border-amber-500/40 shadow-2xl book-hardcover-casing p-2">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={`/menu-book/page-${activePage}.webp`}
                  alt={`Chickado Menu Page ${activePage}`}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Previous Page Floating Button */}
        {bookState === 'opened' && (
          <button
            onClick={handleTurnPrev}
            disabled={activeSpread === 1 || flipState !== 'idle'}
            aria-label="Previous Page"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/85 hover:bg-red-600 text-neutral-800 hover:text-white border border-white/80 hover:border-red-500 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {/* Next Page Floating Button */}
        {bookState === 'opened' && (
          <button
            onClick={handleTurnNext}
            disabled={activeSpread === 2 || flipState !== 'idle'}
            aria-label="Next Page"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/85 hover:bg-red-600 text-neutral-800 hover:text-white border border-white/80 hover:border-red-500 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </section>
    </div>
  );
}
