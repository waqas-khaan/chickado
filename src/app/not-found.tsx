import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Home, UtensilsCrossed } from 'lucide-react';
import { brandConfig } from '@/lib/brand';
import CloseMenuBookOnMount from '@/components/close-menu-book-on-mount';

export const metadata: Metadata = {
  title: `Oops! This page was eaten | ${brandConfig.name}`,
  description: '404 - Looks like someone took a big crunchy bite out of this page! Head back to Chickado home or explore our delicious menu.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <CloseMenuBookOnMount />

      {/* Hide navbar, top announcement bar, footer, and menu book modal on the 404 page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #top-announcement-bar,
            header,
            footer,
            #menu-book-modal,
            [aria-label="Chickado Official Menu Book"] {
              display: none !important;
            }
          `,
        }}
      />

      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#FAFAFA]">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-red-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-10 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-2xl mx-auto w-full text-center space-y-7 relative z-10">
          
          {/* Chickado Brand Header */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={brandConfig.logoPath}
                  alt={brandConfig.name}
                  fill
                  sizes="48px"
                  priority
                  className="object-contain drop-shadow-xs"
                />
              </div>
              <span className="font-heading text-2xl font-black tracking-tight text-neutral-900 group-hover:text-red-600 transition">
                {brandConfig.name}
                <span className="text-red-600">.</span>
              </span>
            </Link>
          </div>

          {/* Hero 4 [Plate / Bitten Drumstick] 4 Composition */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 my-2 select-none">
            {/* Left '4' */}
            <span className="text-8xl sm:text-9xl md:text-[11rem] font-black font-heading text-neutral-900 tracking-tighter leading-none drop-shadow-xs">
              4
            </span>

            {/* Center '0' - Appetizing Plate with Bitten Fried Chicken Drumstick & Crumbs */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 shrink-0 flex items-center justify-center">
              {/* Glow under plate */}
              <div className="absolute inset-2 bg-gradient-to-tr from-red-600/20 to-amber-500/25 rounded-full blur-xl" />

              <svg
                viewBox="0 0 200 200"
                className="w-full h-full relative z-10 drop-shadow-xl overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Checkered pattern for deli liner */}
                  <pattern id="checkeredPaper" width="16" height="16" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="#DC2626" fillOpacity="0.12" />
                    <rect x="8" y="8" width="8" height="8" fill="#DC2626" fillOpacity="0.12" />
                    <rect width="8" height="8" fill="#FFFFFF" />
                    <rect y="8" width="8" height="8" fill="#FFFFFF" />
                  </pattern>
                  <clipPath id="plateInnerClip">
                    <circle cx="100" cy="100" r="76" />
                  </clipPath>
                </defs>

                {/* Cast Shadow under Plate */}
                <ellipse cx="100" cy="178" rx="80" ry="12" fill="#000000" fillOpacity="0.08" />
                <ellipse cx="100" cy="175" rx="70" ry="8" fill="#DC2626" fillOpacity="0.08" />

                {/* Outer Porcelain Plate Rim */}
                <circle cx="100" cy="100" r="88" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="4" />
                <circle cx="100" cy="100" r="78" fill="#F9FAFB" stroke="#F3F4F6" strokeWidth="2" />

                {/* Red Checkered Deli Liner inside plate */}
                <g clipPath="url(#plateInnerClip)">
                  <rect x="20" y="20" width="160" height="160" fill="url(#checkeredPaper)" />
                  {/* Paper folds / creases */}
                  <path d="M24 100L176 100" stroke="#DC2626" strokeOpacity="0.08" strokeWidth="2" />
                  <path d="M100 24L100 176" stroke="#DC2626" strokeOpacity="0.08" strokeWidth="2" />
                </g>

                {/* Dipping Sauce Cup (Garlic Mayo with Paprika) */}
                <g transform="translate(42, 54)">
                  <circle cx="16" cy="16" r="16" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
                  <circle cx="16" cy="16" r="12" fill="#FEF3C7" />
                  {/* Chili / garlic speckles */}
                  <circle cx="14" cy="13" r="1" fill="#DC2626" />
                  <circle cx="18" cy="17" r="1.2" fill="#DC2626" />
                  <circle cx="13" cy="18" r="0.8" fill="#B45309" />
                  <circle cx="19" cy="14" r="0.7" fill="#B45309" />
                </g>

                {/* Golden Crispy Fried Chicken Drumstick with Bite Mark */}
                <g transform="rotate(-28 105 110)">
                  {/* Bone Handle on Left */}
                  <g fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5">
                    <circle cx="56" cy="104" r="7" />
                    <circle cx="56" cy="116" r="7" />
                    <rect x="58" y="106" width="22" height="8" rx="2" stroke="none" />
                  </g>

                  {/* Inner white meat showing through the bite */}
                  <path
                    d="M118 92 C122 96 120 102 126 104 C128 110 126 114 130 118 C124 122 120 128 116 130 Z"
                    fill="#FEF3C7"
                  />

                  {/* Golden Crispy Fried Chicken Meat Coat */}
                  <path
                    d="M74 110 
                       C74 96 90 84 116 84
                       C122 84 125 86 128 90
                       C124 94 124 98 128 102
                       C124 106 124 112 128 116
                       C122 120 120 124 124 128
                       C112 134 94 136 78 126
                       C72 120 74 114 74 110 Z"
                    fill="#D97706"
                    stroke="#B45309"
                    strokeWidth="2.5"
                  />

                  {/* Crisp Fried Texture / Shading */}
                  <path
                    d="M82 106 C82 98 94 92 110 92"
                    stroke="#FBBF24"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="86" cy="112" r="2.5" fill="#92400E" />
                  <circle cx="98" cy="102" r="2" fill="#78350F" />
                  <circle cx="106" cy="116" r="2.5" fill="#92400E" />
                  <circle cx="94" cy="122" r="1.5" fill="#B45309" />
                </g>

                {/* Scattered Crispy Golden Crumbs on the Plate */}
                <circle cx="132" cy="74" r="3" fill="#D97706" />
                <circle cx="144" cy="86" r="2" fill="#F59E0B" />
                <circle cx="152" cy="102" r="3.5" fill="#B45309" />
                <circle cx="146" cy="120" r="2" fill="#D97706" />
                <circle cx="138" cy="136" r="3" fill="#F59E0B" />
                <circle cx="124" cy="148" r="2.5" fill="#92400E" />
                <circle cx="88" cy="144" r="2" fill="#D97706" />
                <circle cx="158" cy="132" r="1.5" fill="#FBBF24" />
                <circle cx="114" cy="68" r="2" fill="#B45309" />

                {/* Playful tiny steam wisps */}
                <path
                  d="M102 46 C100 40 106 36 104 30"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  fill="none"
                  opacity="0.7"
                />
                <path
                  d="M116 50 C114 44 120 40 118 34"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Right '4' */}
            <span className="text-8xl sm:text-9xl md:text-[11rem] font-black font-heading text-neutral-900 tracking-tighter leading-none drop-shadow-xs">
              4
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-3 max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight font-heading leading-tight">
              Oops!
              <span className="block mt-1 sm:mt-2">This page was eaten.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-medium leading-relaxed">
              Looks like someone in our kitchen took a big crunchy bite out of this link! Don’t worry, there is plenty of hot, fresh food waiting.
            </p>
          </div>

          {/* Action Buttons: Prominent Back to Home + Explore Menu */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Link
              href="/"
              className="w-full sm:w-auto btn-red inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-black shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 active:translate-y-0 transition rounded-2xl group"
            >
              <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/menu"
              className="w-full sm:w-auto bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-red-600 text-neutral-900 hover:text-red-600 inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-black rounded-2xl transition shadow-xs hover:-translate-y-0.5 active:translate-y-0"
            >
              <UtensilsCrossed className="w-4 h-4 text-red-600" />
              <span>Explore Menu</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
