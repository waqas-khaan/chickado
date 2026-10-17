import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Flame,
  Clock,
  ShieldCheck,
  Truck,
  Star,
  MessageSquare,
  Sparkles,
  Phone,
  CheckCircle,
  MapPin,
} from 'lucide-react';
import { brandConfig } from '@/lib/brand';
import { formatCurrency } from '@/lib/format';
import { getAllCategories, getFeaturedItems, getDeals } from '@/data/menu-data';
import HomeClientSection from './home-client-section';
import ExploreMenuCarousel from '@/components/explore-menu-carousel';
import PromoBanner from '@/components/promo-banner';
import MobileAppBanner from '@/components/mobile-app-banner';
import { WhatsAppIcon } from '@/components/social-icons';

export default function HomePage() {
  const categories = getAllCategories();
  const featuredItems = getFeaturedItems();
  const deals = getDeals();

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (White dominant, Glass finish, Red accents) */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Soft ambient background glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline, Subheading, CTAs & Value Badges */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-black uppercase tracking-wider shadow-xs">
                <Flame className="w-4 h-4 fill-red-600 text-red-600" />
                <span>The Crunch Champions • 100% Fresh Halal</span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-none text-neutral-900">
                CRISPY. JUICY.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-amber-500">
                  LEGENDARY.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Indulge in Pakistan&apos;s most satisfying fried chicken, towering zinger burgers, and fiery wings. Pressure-fried to golden crunch with our secret 11-spice recipe.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent("Hi Chickado! I would like to place an order.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-whatsapp inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-black shadow-xl shadow-emerald-600/25 active:scale-95 text-white"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Value Props Glass Pills */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="glass-card p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-900">30 Min Delivery</h4>
                    <span className="text-[11px] text-neutral-500">Hot & steaming</span>
                  </div>
                </div>

                <div className="glass-card p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-900">100% Halal</h4>
                    <span className="text-[11px] text-neutral-500">Fresh local chicken</span>
                  </div>
                </div>

                <div className="glass-card p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-900">4.9 Star Rating</h4>
                    <span className="text-[11px] text-neutral-500">10,000+ happy bites</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Food Imagery in Glass Frame with Floating Highlights */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto rounded-[28px] overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/assets/hero-feast.jpg"
                  alt="Chickado Crispy Fried Chicken Feast"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Promo Tag */}
                <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black text-neutral-900 shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Use code: <strong className="text-red-600">CHICK100</strong></span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-2xl flex items-center justify-between text-neutral-900 shadow-xl border border-white/70">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block">
                      Signature Feast
                    </span>
                    <h3 className="text-base font-black text-neutral-900 leading-tight">
                      Chickado Crunch Platter
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-black font-bold line-through block">Rs 1,890</span>
                    <p className="text-xl font-black text-red-600 leading-tight">Rs 1,550</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE MENU CAROUSEL (Matching Reference Image 1) */}
      <ExploreMenuCarousel categories={categories} />

      {/* 2.5 PROMOTIONAL FAST-FOOD BILLBOARD BANNER (Complete Page Width) */}
      <section className="w-full">
        <PromoBanner fullWidth />
      </section>

      {/* 3. FEATURED PRODUCTS (Interactive Client Section with Reference Image 2 Cards) */}
      <HomeClientSection featuredItems={featuredItems as any} deals={deals as any} />

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

      {/* 5. WHATSAPP ORDER BANNER CALLOUT (Red-Tinted Glass Finish) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="glass-red p-8 sm:p-12 rounded-3xl border border-red-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
              Fastest Ordering Channel
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              Craving Fried Chicken Right Now?
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-xl">
              Skip complicated forms. Order your favorite combo directly via WhatsApp with one click! Our kitchen starts preparing immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
                `Hi ${brandConfig.name}, I want to order from your menu!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-black"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat on WhatsApp (+{brandConfig.whatsappCleanNumber})</span>
            </a>

            <a
              href={`tel:${brandConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 glass-card hover:border-red-500 text-neutral-900 rounded-xl font-bold text-sm transition"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call {brandConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5.5 MOBILE APP DOWNLOAD BANNER (Matching Reference Image 2) */}
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
                    <p className="text-neutral-600 text-xs">{brandConfig.phone} (WhatsApp: +{brandConfig.whatsappCleanNumber})</p>
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
