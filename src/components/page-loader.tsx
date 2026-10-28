'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // If already shown during this session, dismiss immediately
    let alreadyShown = false;
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('chickado_splash_done')) {
        alreadyShown = true;
      }
    } catch {
      alreadyShown = false;
    }

    if (alreadyShown) {
      setLoading(false);
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('chickado_splash_done', 'true');
      }
    } catch {}

    // Lock body scroll while loader is visible
    document.body.style.overflow = 'hidden';

    // Swift, snappy progress bar animation
    const p1 = setTimeout(() => setProgress(50), 60);
    const p2 = setTimeout(() => setProgress(100), 220);

    // Graceful exit fade
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 380);

    // Completely unmount loader
    const doneTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 550);

    // Hard fallback safety timer (iOS Safari / mobile performance)
    const safetyTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 800);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      aria-label="Website Loading"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0d0303] select-none overflow-hidden transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Pulsing Glow Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] bg-gradient-to-tr from-red-600/30 via-amber-500/20 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Centerpiece Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Halo & Circular Mascot Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Glowing Halo Ring */}
          <div
            className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-red-600 via-amber-400 to-red-600 opacity-90 animate-spin"
            style={{ animationDuration: '6s' }}
          >
            <div className="w-full h-full rounded-full bg-[#0d0303]" />
          </div>

          {/* Secondary Soft Ambient Pulse Ring */}
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-amber-500/20 animate-ping opacity-30 pointer-events-none" />

          {/* Chickado Official Mascot Logo Image */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-[0_15px_45px_rgba(239,68,68,0.45)] border-2 border-amber-400/60 bg-white">
            <Image
              src="/assets/brand/logo.webp"
              alt="Chickado Logo"
              fill
              priority
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain p-1"
            />
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="mt-6 flex flex-col items-center space-y-1">
          <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
            Chickado<span className="text-red-600">.</span>
          </h1>
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-extrabold text-amber-400/95 drop-shadow-sm">
            Bite Into Joy
          </span>
        </div>

        {/* Sleek Golden-Red Gradient Progress Bar */}
        <div className="mt-7 w-48 sm:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-amber-300 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Micro-copy */}
        <span className="mt-3 text-[10px] sm:text-[11px] font-semibold text-neutral-400/90 tracking-wider uppercase animate-pulse">
          {progress < 70 ? 'Preparing Fresh Joy...' : 'Ready to Serve!'}
        </span>
      </div>
    </div>
  );
}
