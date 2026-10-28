import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Star,
  Phone,
  MapPin,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { brandConfig } from '@/lib/brand';
import { formatCurrency } from '@/lib/format';
import { getAllCategories, getFeaturedItems, getDeals } from '@/data/menu-data';
import HomeClientSection from './home-client-section';
import PromoBanner from '@/components/promo-banner';
import MobileAppBanner from '@/components/mobile-app-banner';
import { WhatsAppIcon } from '@/components/social-icons';
import WhatsAppDirectLink from '@/components/whatsapp-direct-link';

export default function HomePage() {
  const categories = getAllCategories();
  const featuredItems = getFeaturedItems();
  const deals = getDeals();

  return (
    <div className="flex flex-col relative overflow-hidden bg-[#FAFAFA]">
      {/* Soft Ambient Background Glow Blobs for Glass UI Depth */}
      <div className="fixed top-12 left-1/4 w-[36rem] h-[36rem] bg-red-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-[32rem] h-[32rem] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed -bottom-20 left-10 w-[38rem] h-[38rem] bg-red-600/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* 1. HERO BANNER: Baked Pasta Promotional Billboard Banner */}
      <PromoBanner />

      {/* 2. EXPLORE MENU & INTERACTIVE CATEGORY ITEMS */}
      <HomeClientSection
        categories={categories}
        featuredItems={featuredItems}
        deals={deals}
      />

      {/* 4. WHY CHOOSE CHICKADO (Glass Cards on Off-White) */}
      <section className="py-20 bg-neutral-50/80 border-b border-neutral-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              The Secret Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900">
              Why Chickado Hits Different
            </h2>
            <p className="text-sm text-neutral-500">
              We never compromise on crunch, flavor, or food safety. Here is what makes our fried chicken legendary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card glass-card-hover p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xl">
                🍗
              </div>
              <h3 className="text-base font-black text-neutral-900">Fresh, Never Frozen</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Hand-inspected, fresh farm chicken sourced daily. Marinated for 12 hours so flavor sinks into the bone.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xl">
                🌶️
              </div>
              <h3 className="text-base font-black text-neutral-900">11 Secret Spices</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Crafted blend of freshly milled herbs, smoked paprika, and aromatic chili crunch for an addictive savor.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xl">
                🔥
              </div>
              <h3 className="text-base font-black text-neutral-900">Pressure-Fried Crunch</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Cooked under high pressure in pure vegetable oil to seal in the natural juices while creating an ultra-crispy crust.
              </p>
            </div>

            <div className="glass-card glass-card-hover p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xl">
                🛵
              </div>
              <h3 className="text-base font-black text-neutral-900">Rapid 30-Min Delivery</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Thermal insulated food dispatch ensures your burgers stay tall and fries stay extra crispy to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHATSAPP DIRECT ORDER BANNER (Full-Width Theme Glass UI) */}
      <section className="w-full relative overflow-hidden pt-12 sm:pt-14 pb-8 sm:pb-10 bg-gradient-to-br from-white/95 via-white/85 to-red-50/40 backdrop-blur-2xl border-y border-neutral-200/80 shadow-xs">
        {/* Soft Ambient Theme Glows */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[32rem] h-[32rem] bg-red-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[32rem] h-[32rem] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42rem] h-[22rem] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Subtle Top Inner Edge Specular Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-black uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Speedy Ordering • Instant Dispatch</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight uppercase font-heading leading-tight">
            Craving Right Now?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
              Skip The Wait!
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Send us your order directly on WhatsApp. Our Saddar kitchen will start frying right away!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <WhatsAppDirectLink
              phone={brandConfig.whatsappCleanNumber}
              message="Hi Chickado! I would like to order right now."
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-emerald-400/30 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp (+{brandConfig.whatsappCleanNumber})</span>
            </WhatsAppDirectLink>

            <a
              href={`tel:${brandConfig.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/90 hover:bg-white text-neutral-900 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg border border-neutral-200/90 hover:border-red-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-md"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call {brandConfig.phone}</span>
            </a>
          </div>

          {/* Trust Value Props Cards (Fills space with rich glassmorphism) */}
          <div className="pt-5 border-t border-neutral-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-white backdrop-blur-md border border-black shadow-xs flex items-center justify-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-xs font-black text-neutral-900 block leading-tight">30-Min Fast Delivery</span>
                <span className="text-[11px] text-neutral-500 font-medium">Hot & steaming to your door</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white backdrop-blur-md border border-black shadow-xs flex items-center justify-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-xs font-black text-neutral-900 block leading-tight">100% Halal Fresh</span>
                <span className="text-[11px] text-neutral-500 font-medium">Local poultry sourced daily</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white backdrop-blur-md border border-black shadow-xs flex items-center justify-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
                <Flame className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-xs font-black text-neutral-900 block leading-tight">Piping Hot Crunch</span>
                <span className="text-[11px] text-neutral-500 font-medium">Shatteringly crisp guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MOBILE APP DOWNLOAD BANNER */}
      <MobileAppBanner />

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              Real Reviews
            </span>
            <h2 className="text-3xl font-black text-neutral-900">
              Loved by Fast Food Connoisseurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card glass-card-hover p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                &ldquo;Honestly blew KFC away in both crunch and flavor! The Classic Zinger had a huge juicy fillet and the spice blend was spot on. Delivered in 25 minutes hot!&rdquo;
              </p>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900">Zubair Ahmed</span>
                <span className="text-neutral-500">Peshawar Saddar</span>
              </div>
            </div>

            <div className="glass-card glass-card-hover p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                &ldquo;The WhatsApp order button made ordering so effortless. The 8 Pcs Feast Bucket was crunchy on the outside, tender inside. Definitely our new family favorite.&rdquo;
              </p>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900">Ayesha Tariq</span>
                <span className="text-neutral-500">Hayatabad, Peshawar</span>
              </div>
            </div>

            <div className="glass-card glass-card-hover p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                &ldquo;The Cheesy Loaded Fries and Buffalo Wings are sensational. Excellent portion sizes and great prices in PKR. Highly recommended!&rdquo;
              </p>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900">Dr. Hamza Bilal</span>
                <span className="text-neutral-500">University Town, Peshawar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STORE LOCATION & GOOGLE MAP */}
      <section className="py-16 bg-neutral-50/70 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Details & Direct CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-black uppercase tracking-wider shadow-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Us In Person</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900">
                Freshly Fried in Peshawar Saddar
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Whether you want to dine-in with family, grab a quick takeaway box, or pick up a midnight snack, our kitchen opposite Sunhri Masjid is buzzing with energy.
              </p>

              <div className="space-y-3.5 text-sm">
                <div className="glass-card p-3.5 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Flagship Store Location:</span>
                    <p className="text-neutral-600 text-xs">{brandConfig.address}</p>
                  </div>
                </div>

                <div className="glass-card p-3.5 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Daily Service Hours:</span>
                    <p className="text-neutral-600 text-xs">{brandConfig.openingHours}</p>
                  </div>
                </div>

                <div className="glass-card p-3.5 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Hotline & WhatsApp:</span>
                    <p className="text-neutral-600 text-xs">
                      {brandConfig.phone} (WhatsApp: +{brandConfig.whatsappCleanNumber})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Google Maps Embed */}
            <div className="lg:col-span-7">
              <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-neutral-900">Chickado Live Location</span>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500">Peshawar Saddar</span>
                </div>

                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-inner bg-neutral-100">
                  <iframe
                    title="Chickado Peshawar Saddar Google Map"
                    src={brandConfig.googleMaps.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
