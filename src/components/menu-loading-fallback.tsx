import React from 'react';
import Image from 'next/image';

interface MenuLoadingFallbackProps {
  message?: string;
  subtext?: string;
  className?: string;
}

export default function MenuLoadingFallback({
  message = 'Preparing Fresh Joy...',
  subtext = 'Hand-crafted chicken & secret spices',
  className = '',
}: MenuLoadingFallbackProps) {
  return (
    <section
      aria-label="Loading Menu"
      role="status"
      className={`relative min-h-[55vh] flex flex-col items-center justify-center px-4 py-16 sm:py-24 overflow-hidden select-none ${className}`}
    >
      {/* Soft Ambient Radial Glow Behind Mascot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-red-500/15 via-amber-500/10 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Center Mascot & Loading Presentation */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto">
        {/* Animated Halo & Circular Mascot Container */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Rotating Glowing Gradient Ring */}
          <div
            className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-red-600 via-amber-400 to-red-600 opacity-90 animate-spin"
            style={{ animationDuration: '6s' }}
          >
            <div className="w-full h-full rounded-full bg-white" />
          </div>

          {/* Secondary Soft Pulse Ring */}
          <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-red-500/20 animate-ping opacity-40 pointer-events-none" />

          {/* Official Chickado Mascot Logo */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[0_12px_32px_rgba(220,38,38,0.22)] border-2 border-amber-400/80 bg-white">
            <Image
              src="/assets/brand/logo.jpg"
              alt="Chickado Logo"
              fill
              priority
              sizes="(max-width: 640px) 112px, 128px"
              className="object-contain p-1"
            />
          </div>
        </div>

        {/* Brand Header */}
        <div className="flex flex-col items-center space-y-1">
          <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
            Chickado<span className="text-red-600">.</span>
          </h2>
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-extrabold text-red-600">
            Bite Into Joy
          </span>
        </div>

        {/* Loading Progress Bar */}
        <div className="mt-6 w-48 sm:w-56 h-1.5 bg-neutral-200/90 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-full w-2/3 animate-indeterminate shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
        </div>

        {/* Dynamic Microcopy */}
        <div className="mt-4 flex flex-col items-center space-y-1">
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-neutral-600 animate-pulse">
            {message}
          </span>
          {subtext && (
            <p className="text-[11px] text-neutral-400 max-w-xs leading-relaxed">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
