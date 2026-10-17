'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Sparkles, ArrowRight, Copy, Check, Star } from 'lucide-react';
import { WhatsAppIcon } from '@/components/social-icons';
import { brandConfig } from '@/lib/brand';

interface PromoBannerProps {
  voucherCode?: string;
  discountText?: string;
  className?: string;
  fullWidth?: boolean;
}

export default function PromoBanner({
  voucherCode = 'CHICK100',
  discountText = 'FLAT RS 100 OFF ON ORDERS OVER RS 1,000',
  className = '',
  fullWidth = true,
}: PromoBannerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-amber-700 text-white shadow-xl ${
        fullWidth
          ? 'w-full border-y border-red-500/40'
          : 'rounded-3xl border border-red-500/40 shadow-2xl'
      } ${className}`}
    >
      {/* Background Lighting Effects & Dynamic Fast-Food Patterns */}
      <div className="absolute -top-32 -left-24 w-96 h-96 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

      {/* Decorative Fast-Food Diagonal Stripes Overlay */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff, #fff 14px, transparent 14px, transparent 28px)',
        }}
      />

      <div
        className={`relative z-10 ${
          fullWidth
            ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14'
            : 'px-6 py-8 sm:px-10 sm:py-12 lg:px-12'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Promo Code, CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
              <span>Limited Time Mega Deal</span>
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight leading-tight drop-shadow-md">
                CRUNCH TIME IS{' '}
                <span className="text-amber-300 underline decoration-amber-400 decoration-wavy decoration-2">
                  CHICKADO
                </span>{' '}
                TIME!
              </h2>
              <p className="text-sm sm:text-base text-red-100 mt-2.5 max-w-xl font-medium leading-relaxed">
                Enjoy golden crispy fried chicken, hand-breaded daily with our secret 11-herb recipe. Piping hot, juicy inside, and guaranteed crunch in every bite.
              </p>
            </div>

            {/* Voucher Coupon Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 bg-black/25 backdrop-blur-md border border-white/20 rounded-2xl p-2 sm:p-2.5 pr-4 shadow-inner">
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{discountText}</span>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <span className="text-xs text-white/80 font-bold uppercase">Code:</span>
                <span className="font-mono font-black text-sm text-white tracking-widest">
                  {voucherCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition active:scale-90 cursor-pointer"
                  title="Copy coupon code"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/menu?category=deals-combos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-red-600 hover:bg-amber-300 hover:text-neutral-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-xl active:scale-95 cursor-pointer"
              >
                <span>View Feast Combos</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
                  `Hi Chickado! I want to claim the ${voucherCode} promo deal.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Res Appetizing Feast Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 group">
              <Image
                src="/assets/chickado-feast-bucket.jpg"
                alt="Chickado Crispy Feast Bucket"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              {/* Floating Review Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-neutral-900 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5 border border-white">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-black">4.9 / 5</span>
                <span className="text-[10px] text-neutral-500 font-semibold">(10k+ Bites)</span>
              </div>

              {/* Floating Quality Tag */}
              <div className="absolute bottom-3 right-3 bg-red-600/95 backdrop-blur-md text-white rounded-xl px-3.5 py-1.5 shadow-lg text-xs font-black uppercase tracking-wider border border-white/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>100% Halal Fresh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
