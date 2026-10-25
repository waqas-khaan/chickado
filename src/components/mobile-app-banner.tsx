import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { brandConfig } from '@/lib/brand';

export default function MobileAppBanner() {
  const customerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  ];

  return (
    <section suppressHydrationWarning className="w-full relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-amber-700 text-white border-y border-red-500/40 shadow-xl my-0">
      {/* Background Lighting Effects & Fast-Food Diagonal Texture */}
      <div className="absolute -top-28 -left-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

      {/* Decorative Fast-Food Diagonal Stripes Overlay */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff, #fff 14px, transparent 14px, transparent 28px)',
        }}
      />

      {/* Professional 3D Animated Full Gourmet Pizza Covering Right-Bottom Shade */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 right-2 sm:right-6 lg:right-10 xl:right-16 z-20 pointer-events-none select-none">
        <div className="relative">
          {/* Ambient Warm Golden Glow */}
          <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-2xl scale-110 animate-pizza-glow" />
          
          {/* Animated 3D Full Gourmet Pizza */}
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-76 xl:h-76 animate-float-pizza drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]">
            <Image
              src="/assets/banners/gourmet-full-pizza.png"
              alt="Chickado Gourmet Full Pizza"
              fill
              unoptimized
              sizes="(max-width: 768px) 160px, (max-width: 1200px) 260px, 320px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Main Content Container with Comfortable Padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-20 sm:pb-32 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Full-Height, Cleanly Visible Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Soft Phone Shadow */}
              <div className="absolute -inset-3 bg-black/35 rounded-[48px] blur-xl" />

              {/* iPhone Physical Bezel with Generous Height */}
              <div className="relative w-[250px] sm:w-[275px] h-[505px] sm:h-[545px] bg-neutral-900 rounded-[44px] p-2.5 shadow-2xl border-[5px] border-neutral-800 ring-1 ring-white/25 select-none">
                {/* Dynamic Island Pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-22 h-4 bg-neutral-950 rounded-full flex items-center justify-end px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
                </div>

                {/* Glass Screen Content */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col text-[10px] text-neutral-800 relative shadow-inner">
                  {/* Status Bar */}
                  <div className="pt-2 px-5 pb-1 flex justify-between items-center text-[9px] font-bold text-neutral-600 bg-white shrink-0">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px]">5G</span>
                      <div className="w-4 h-2 rounded-2xs border border-neutral-700 flex items-center p-0.5">
                        <div className="w-full h-full bg-neutral-800 rounded-3xs" />
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-3.5 pt-1.5 pb-2 bg-white flex items-center justify-between border-b border-neutral-100 shrink-0">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-neutral-400 block font-bold">
                        Deliver to
                      </span>
                      <span className="text-[10px] font-black text-neutral-900 flex items-center gap-0.5">
                        HOME <span className="text-[8px] text-red-600">▾</span>
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Scrollable Mini App Feed */}
                  <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 bg-[#FAF9F6]">
                    {/* Loyalty Points Pill */}
                    <div className="bg-amber-100/90 border border-amber-300 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[9px]">
                      <span className="font-bold text-amber-950">Points: <strong>3,219</strong></span>
                      <span className="text-[8px] font-black uppercase text-amber-900 bg-white/90 px-1.5 py-0.5 rounded-md">
                        Top Up
                      </span>
                    </div>

                    {/* Promo Mini Banner */}
                    <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-xl p-2.5 text-white relative overflow-hidden shadow-xs">
                      <div className="relative z-10 max-w-[130px]">
                        <span className="text-[7px] font-black uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded-xs">
                          HOT DEAL
                        </span>
                        <h4 className="font-black text-[11px] leading-tight mt-1">
                          Bite into Joy! Crispy Zinger
                        </h4>
                      </div>
                      <div className="absolute -right-2 -bottom-2 w-15 h-15 rounded-full overflow-hidden border border-white/40 shadow-xs">
                        <Image
                          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80"
                          alt="Burger"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Explore Categories Mini */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5 px-0.5">
                        <span className="font-black text-[9px] text-neutral-900 uppercase">
                          Categories
                        </span>
                        <span className="text-[8px] text-red-600 font-bold">All</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center">
                        {[
                          { name: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80' },
                          { name: 'Chicken', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=100&q=80' },
                          { name: 'Wings', img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=100&q=80' },
                          { name: 'Deals', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=100&q=80' },
                        ].map((c, i) => (
                          <div key={i} className="bg-white p-1 rounded-xl border border-amber-300 flex flex-col items-center shadow-2xs">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden mb-1">
                              <Image src={c.img} alt={c.name} fill unoptimized className="object-cover" />
                            </div>
                            <span className="text-[7.5px] font-black uppercase text-neutral-800 truncate w-full">
                              {c.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best Sellers Mini Card */}
                    <div className="bg-white p-2 rounded-xl border border-neutral-200 shadow-2xs flex items-center gap-2">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                        <Image
                          src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=100&q=80"
                          alt="Fried Chicken"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-[9px] text-neutral-900 block truncate">
                          4 Pcs Golden Fried Box
                        </span>
                        <span className="text-[9px] font-black text-red-600 block">
                          Rs 890
                        </span>
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[8px]">
                        +
                      </div>
                    </div>
                  </div>

                  {/* Bottom App Navigation */}
                  <div className="py-2 px-4 bg-white border-t border-neutral-100 flex items-center justify-between text-[8px] font-bold text-neutral-400 shrink-0">
                    <span className="text-red-600 font-black">● Home</span>
                    <span>Explore</span>
                    <span>Deals</span>
                    <span>Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy, Clean Avatars (No Arrow Button) & Store Badges */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Chickado On The Go</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading leading-tight">
                Download Our Mobile App
              </h2>
              <p className="text-white/90 font-medium text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
                Elevate your experience by downloading our mobile app for Seamless ordering experience.
              </p>
            </div>

            {/* Social Proof Avatar Group + Explicitly Disabled Arrow Button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                  {customerAvatars.map((url, index) => (
                    <div
                      key={index}
                      className="inline-block relative w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-white overflow-hidden shadow-md shrink-0 bg-neutral-200"
                    >
                      <Image
                        src={url}
                        alt={`Customer ${index + 1}`}
                        fill
                        unoptimized
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Explicitly Disabled Arrow Button as requested */}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Arrow link preview (disabled)"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-red-600 flex items-center justify-center shadow-md opacity-75 cursor-not-allowed pointer-events-none select-none ring-2 ring-white/60"
                >
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Social Proof Text Badge */}
              <div className="flex items-center gap-1.5 text-white bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                <div className="flex items-center text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-black ml-1 text-white">4.9 / 5</span>
                </div>
                <span className="text-xs text-white/90 font-medium">• 10,000+ App Orders</span>
              </div>
            </div>

            {/* App Store Download Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Google Play Button */}
              <a
                href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
                  'Hi Chickado! Please share the Android mobile app download link.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-950 hover:bg-black text-white px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 cursor-pointer"
              >
                {/* Google Play Triangle SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3.609 1.814L13.792 12 3.61 22.186A2.2 2.2 0 0 1 3 20.655V3.345c0-.6.225-1.15.609-1.531z"
                    fill="#00E676"
                  />
                  <path
                    d="M17.445 8.347l-3.653 3.653L3.61 1.814A2.247 2.247 0 0 1 4.887 1.44c1.036.035 2.126.608 3.12 1.182l9.438 5.725z"
                    fill="#FFD600"
                  />
                  <path
                    d="M13.792 12l3.653 3.653-9.438 5.725c-.994.574-2.084 1.147-3.12 1.182a2.247 2.247 0 0 1-1.277-.374L13.792 12z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20.89 10.428l-3.445-2.081-3.653 3.653 3.653 3.653 3.445-2.081c1.23-.744 1.23-2.4 0-3.144z"
                    fill="#00B0FF"
                  />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase font-bold text-neutral-400 tracking-wider leading-none">
                    GET IT ON
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                    Google Play
                  </span>
                </div>
              </a>

              {/* Apple App Store Button with Coming Soon Tag (Non-clickable) */}
              <div className="relative inline-flex">
                <span className="absolute -top-2.5 -right-2 z-10 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black text-[9px] uppercase tracking-wider shadow-md border border-neutral-950 pointer-events-none select-none">
                  Coming Soon
                </span>
                <div
                  aria-disabled="true"
                  className="bg-neutral-950/90 text-white px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-md border border-white/15 cursor-not-allowed select-none opacity-85"
                >
                  {/* Apple Logo SVG */}
                  <svg className="w-5 h-5 fill-white shrink-0 opacity-80" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.56.64-1.05 1.71-.92 2.73 1.01.08 2.03-.48 2.64-1.23z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] font-bold text-neutral-400 tracking-wider leading-none">
                      Download on the
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                      App Store
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
