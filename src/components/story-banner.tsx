'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface StoryBannerProps {
  className?: string;
}

export default function StoryBanner({ className = '' }: StoryBannerProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-white border-y border-neutral-200/80 ${className}`}
    >
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Fast-Food Diagonal Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #000, #000 12px, transparent 12px, transparent 24px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Dining Experience Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[4/4.5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group bg-neutral-900">
              <Image
                src="/assets/banners/about-restaurant.webp"
                alt="Chickado Flagship Restaurant Dining Area & Bite Into Joy Sign"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-[center_36%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quality Badges */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-neutral-900 rounded-xl px-3.5 py-1.5 shadow-lg border border-white flex items-center gap-1.5 text-xs font-black">
                <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                <span>100% Halal Fresh</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-red-600 text-white rounded-xl px-3.5 py-1.5 shadow-lg border border-red-500/30 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>45-Min Crisp Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy & CTA */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              <span>Crunch Perfection Since Day 1</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight uppercase leading-tight font-heading">
              Not Just Fried Chicken.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
                An Obsession.
              </span>
            </h2>

            <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
              <p>
                We spent over 18 months perfecting our proprietary secret 11-spice marinade and custom pressure-frying techniques. The result? A batter that stays shatteringly crisp for over 45 minutes, with meat so tender and juicy it falls right off the bone.
              </p>
              <p>
                From our flagship kitchen in Peshawar Saddar opposite Sunhri Masjid near MCB bank, we serve thousands of satisfied foodies every week who crave authentic, high-voltage flavor without the commercial compromises.
              </p>
            </div>

            {/* Quick Feature Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>12-Hour Marinade</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Secret 11-Spices</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Freeze Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
