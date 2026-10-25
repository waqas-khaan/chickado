'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useMenuBookStore } from '@/lib/menu-book-store';

// Synthesized Realistic Physical Paper Sound via Web Audio API (Zero Latency, No MP3 Needed)
function playPaperRustle(isMuted: boolean) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const duration = 0.4;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI) * Math.exp(-t * 3.2);
      output[i] = (Math.random() * 2 - 1) * envelope * 0.36;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    whiteNoise.start();
  } catch {
    // Audio context not allowed or unsupported
  }
}

export default function MenuBookModal() {
  const {
    isOpen,
    isAutoOpen,
    markUserInteracted,
    activeSpread,
    zoom,
    closeBook,
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
  const [isMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const autoTimersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllAutoTimers = useCallback(() => {
    autoTimersRef.current.forEach((t) => clearTimeout(t));
    autoTimersRef.current = [];
  }, []);

  // Graceful smooth exit animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    clearAllAutoTimers();
    setTimeout(() => {
      closeBook();
      setIsClosing(false);
    }, 300);
  }, [clearAllAutoTimers, closeBook]);

  // When user interacts, cancel auto-closing & auto-flipping
  const handleUserInteract = useCallback(() => {
    clearAllAutoTimers();
    markUserInteracted();
  }, [clearAllAutoTimers, markUserInteracted]);

  // Trigger realistic cover opening with smooth spring
  const triggerOpening = useCallback(() => {
    setBookState('opening');
    playPaperRustle(isMuted);

    const openTimer = setTimeout(() => {
      setBookState('opened');
    }, 650);
    autoTimersRef.current.push(openTimer);
  }, [isMuted]);

  // Detect mobile viewport (< 768px): completely disable menu book on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        clearAllAutoTimers();
        document.body.style.overflow = '';
      }
    };
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [clearAllAutoTimers]);

  // Auto showcase on website open (showcases full menu across 5 seconds total on desktop/tablet only)
  useEffect(() => {
    if (!mounted || !isOpen || isMobile || (typeof window !== 'undefined' && window.innerWidth < 768)) {
      clearAllAutoTimers();
      setIsClosing(false);
      return;
    }

    if (isAutoOpen) {
      setBookState('closed');
      setFlipState('idle');
      setSpread(1);
      clearAllAutoTimers();

      // Step 1: Front page waits for 2 seconds, then moves and opens smoothly
      const t1 = setTimeout(() => {
        triggerOpening();
      }, 2000);
      autoTimersRef.current.push(t1);

      // Step 2: Flip to Spread 2 (Pizzas & Burgers) at 4500ms to showcase full menu
      const tFlip = setTimeout(() => {
        playPaperRustle(isMuted);
        setFlipState('flipping-next');

        const tFlipEnd = setTimeout(() => {
          setSpread(2);
          setFlipState('idle');
        }, 750);
        autoTimersRef.current.push(tFlipEnd);
      }, 4500);
      autoTimersRef.current.push(tFlip);

      // Step 3: Gracefully close at 7000ms
      const tClose = setTimeout(() => {
        handleClose();
      }, 7000);
      autoTimersRef.current.push(tClose);

      return () => {
        clearAllAutoTimers();
      };
    } else {
      clearAllAutoTimers();
      setBookState('opened');
      setFlipState('idle');
    }
  }, [mounted, isOpen, isAutoOpen, isMobile, isMuted, triggerOpening, handleClose, setSpread, clearAllAutoTimers]);

  // Lock body scroll when modal is open on desktop/tablet (never on mobile)
  useEffect(() => {
    if (isOpen && mounted && !isMobile && typeof window !== 'undefined' && window.innerWidth >= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mounted, isMobile]);

  // Realistic 3D Page Flip Forward on Desktop (Spread 1 -> Spread 2)
  const handleTurnNext = useCallback(() => {
    if (flipState !== 'idle' || bookState !== 'opened') return;
    if (activeSpread === 2) return;

    handleUserInteract();
    playPaperRustle(isMuted);
    setFlipState('flipping-next');

    setTimeout(() => {
      setSpread(2);
      setFlipState('idle');
    }, 800);
  }, [flipState, bookState, activeSpread, isMuted, handleUserInteract, setSpread]);

  // Realistic 3D Page Flip Backward on Desktop (Spread 2 -> Spread 1)
  const handleTurnPrev = useCallback(() => {
    if (flipState !== 'idle' || bookState !== 'opened') return;
    if (activeSpread === 1) return;

    handleUserInteract();
    playPaperRustle(isMuted);
    setFlipState('flipping-prev');

    setTimeout(() => {
      setSpread(1);
      setFlipState('idle');
    }, 800);
  }, [flipState, bookState, activeSpread, isMuted, handleUserInteract, setSpread]);

  const handleManualOpenClick = () => {
    handleUserInteract();
    if (bookState === 'closed') {
      triggerOpening();
    }
  };

  // Keyboard navigation on desktop
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleTurnNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handleTurnPrev();
      } else if (e.key === '+' || e.key === '=') {
        handleUserInteract();
        zoomIn();
      } else if (e.key === '-') {
        handleUserInteract();
        zoomOut();
      } else if (e.key === '0') {
        handleUserInteract();
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMobile, handleTurnNext, handleTurnPrev, handleClose, handleUserInteract, zoomIn, zoomOut, resetZoom]);

  // Pan dragging handlers on Desktop Zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    handleUserInteract();
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

  // Completely disabled and invisible in mobile view (< 768px)
  if (!mounted || !isOpen || isMobile) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chickado Official Menu Book"
      className={`hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-md select-none overflow-hidden transition-all duration-500 ease-out ${
        isClosing ? 'opacity-0 scale-[0.96] pointer-events-none' : 'opacity-100 scale-100 animate-fadeIn'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Soft Ambient Depth Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[34rem] h-[34rem] bg-red-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[34rem] h-[34rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ====================================================================
          REALISTIC 3D PHYSICAL BOOK STAGE (Desktop & Tablet only)
          ==================================================================== */}
      <main
        className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 perspective-book"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative max-w-full max-h-full transition-transform duration-300 ease-out ${
              zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
            }`}
            style={{
              transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="relative preserve-3d">
              {/* SUB-STATE 1: BOOK IS FULLY CLOSED */}
              {bookState === 'closed' && (
                <div
                  onClick={handleManualOpenClick}
                  className="cursor-pointer group relative w-[410px] md:w-[470px] lg:w-[530px] xl:w-[560px] max-w-[90vw] aspect-[1812/2375] rounded-r-xl rounded-l-sm closed-book-casing p-1 transition-all duration-300 hover:scale-[1.02] preserve-3d"
                >
                  <div className="absolute -left-2.5 top-0 bottom-0 w-3 bg-gradient-to-r from-[#0d0303] via-[#1a0806] to-[#250d0a] rounded-l-xs shadow-2xl" />
                  <div className="absolute left-3 top-0 bottom-0 w-[1.5px] bg-black/40 shadow-[1px_0_1px_rgba(255,255,255,0.06)] pointer-events-none" />
                  <div className="absolute -right-1.5 top-2 bottom-2 w-1.5 bg-gradient-to-r from-[#1c120e] via-[#e5ded3] to-[#dcd4c7] rounded-r-xs shadow-sm pointer-events-none" />

                  <div className="relative w-full h-full rounded-r-lg overflow-hidden border border-amber-500/40 shadow-inner">
                    <Image
                      src="/menu-book/book-cover.webp"
                      alt="Chickado Menu Book Cover"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* SUB-STATE 2: BOOK COVER OPENING ANIMATION IN 3D */}
              {bookState === 'opening' && (
                <div className="relative w-[680px] md:w-[760px] lg:w-[980px] xl:w-[1240px] 2xl:w-[1460px] max-w-[95vw] max-h-[85vh] aspect-[3625/2375] real-book-casing preserve-3d">
                  <div className="relative w-full h-full rounded-md overflow-hidden preserve-3d flex bg-neutral-950 shadow-inner">
                    {/* Left Half (Underneath): Page 1 */}
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

                    {/* Right Half (Underneath): Page 2 */}
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

                    {/* Spine crease */}
                    <div className="book-spine-crease">
                      <div className="book-spine-shadow-ambient" />
                      <div className="book-spine-seam-line" />
                      <div className="book-spine-highlight-line" />
                    </div>

                    {/* Cover swinging with 1.05s spring */}
                    <div className="absolute top-0 bottom-0 right-0 w-1/2 preserve-3d animate-realistic-cover-open z-40">
                      <div className="absolute inset-0 backface-hidden rounded-r-md overflow-hidden border border-amber-500/50 shadow-2xl">
                        <Image
                          src="/menu-book/book-cover.webp"
                          alt="Chickado Front Cover"
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                      <div
                        className="absolute inset-0 backface-hidden rounded-l-md overflow-hidden border border-amber-500/30 shadow-2xl"
                        style={{ transform: 'rotateY(180deg)' }}
                      >
                        <Image
                          src="/menu-book/page-1.webp"
                          alt="Chickado Combos & Deals"
                          fill
                          priority
                          className="object-cover object-right"
                        />
                        <div className="absolute inset-0 page-shadow-left pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-STATE 3: BOOK FULLY OPENED (INTERACTIVE 3D FLIPBOOK) */}
              {bookState === 'opened' && (
                <div className="relative w-[680px] md:w-[760px] lg:w-[980px] xl:w-[1240px] 2xl:w-[1460px] max-w-[95vw] max-h-[85vh] aspect-[3625/2375] real-book-casing preserve-3d">
                  <div className="relative w-full h-full rounded-md overflow-hidden preserve-3d flex bg-neutral-950 shadow-inner">
                    {/* LEFT WING BASE */}
                    <div
                      onClick={handleTurnPrev}
                      className={`relative w-1/2 h-full overflow-hidden select-none ${
                        activeSpread === 2 ? 'cursor-pointer group' : ''
                      }`}
                      style={{
                        transform: 'rotateY(1.4deg)',
                        transformOrigin: 'right center',
                      }}
                    >
                      <Image
                        src={
                          flipState === 'flipping-prev'
                            ? '/menu-book/page-1.webp'
                            : activeSpread === 1
                            ? '/menu-book/page-1.webp'
                            : '/menu-book/page-3.webp'
                        }
                        alt="Chickado Left Page"
                        fill
                        priority
                        className="object-cover object-right"
                      />
                      <div className="absolute inset-0 page-shadow-left pointer-events-none" />

                      {flipState === 'flipping-next' && (
                        <div
                          className="absolute inset-0 bg-black/40 pointer-events-none"
                          style={{ animation: 'pageUnderneathLand 0.8s ease-in-out forwards' }}
                        />
                      )}
                    </div>

                    {/* RIGHT WING BASE */}
                    <div
                      onClick={handleTurnNext}
                      className={`relative w-1/2 h-full overflow-hidden select-none ${
                        activeSpread === 1 ? 'cursor-pointer group' : ''
                      }`}
                      style={{
                        transform: 'rotateY(-1.4deg)',
                        transformOrigin: 'left center',
                      }}
                    >
                      <Image
                        src={
                          flipState === 'flipping-next'
                            ? '/menu-book/page-4.webp'
                            : activeSpread === 1
                            ? '/menu-book/page-2.webp'
                            : '/menu-book/page-4.webp'
                        }
                        alt="Chickado Right Page"
                        fill
                        priority
                        className="object-cover object-left"
                      />
                      <div className="absolute inset-0 page-shadow-right pointer-events-none" />

                      {flipState === 'flipping-next' && (
                        <div
                          className="absolute inset-0 bg-black/40 pointer-events-none"
                          style={{ animation: 'pageUnderneathLift 0.8s ease-out forwards' }}
                        />
                      )}
                    </div>

                    {/* SEAMLESS BOOK SPINE CREASE */}
                    <div className="book-spine-crease">
                      <div className="book-spine-shadow-ambient" />
                      <div className="book-spine-seam-line" />
                      <div className="book-spine-highlight-line" />
                    </div>

                    {/* TURNING PAGE LEAF: Spread 1 -> Spread 2 */}
                    {flipState === 'flipping-next' && (
                      <div
                        className="absolute top-0 bottom-0 right-0 w-1/2 preserve-3d z-40 pointer-events-none"
                        style={{
                          transformOrigin: 'left center',
                          animation: 'pageFlipForward 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                        }}
                      >
                        <div className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl">
                          <Image
                            src="/menu-book/page-2.webp"
                            alt="Turning Page Front"
                            fill
                            priority
                            className="object-cover object-left"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenForward 0.8s ease-in-out forwards',
                            }}
                          />
                        </div>

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
                              animation: 'pageSheenBack 0.8s ease-in-out forwards',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* TURNING PAGE LEAF: Spread 2 -> Spread 1 */}
                    {flipState === 'flipping-prev' && (
                      <div
                        className="absolute top-0 bottom-0 left-0 w-1/2 preserve-3d z-40 pointer-events-none"
                        style={{
                          transformOrigin: 'right center',
                          animation: 'pageFlipBackward 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                        }}
                      >
                        <div className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl">
                          <Image
                            src="/menu-book/page-3.webp"
                            alt="Turning Page Front Backward"
                            fill
                            priority
                            className="object-cover object-right"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenBackward 0.8s ease-in-out forwards',
                            }}
                          />
                        </div>

                        <div
                          className="absolute inset-0 backface-hidden overflow-hidden bg-neutral-900 shadow-2xl"
                          style={{ transform: 'rotateY(180deg)' }}
                        >
                          <Image
                            src="/menu-book/page-2.webp"
                            alt="Turning Page Back Backward"
                            fill
                            priority
                            className="object-cover object-left"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              animation: 'pageSheenBackBackward 0.8s ease-in-out forwards',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
