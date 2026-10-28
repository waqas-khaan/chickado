'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Clock, MessageSquare, Navigation } from 'lucide-react';
import { InstagramIcon, TikTokIcon, YouTubeIcon, FacebookIcon, WhatsAppIcon } from '@/components/social-icons';
import { brandConfig } from '@/lib/brand';
import { openWhatsAppDirectly, getWhatsAppChatUrl } from '@/lib/whatsapp';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="relative bg-white/85 backdrop-blur-xl text-neutral-600 pt-16 pb-8 border-t border-neutral-200/80 shadow-[0_-8px_30px_rgba(220,38,38,0.02)] overflow-hidden">
      {/* Subtle Ambient Red Glow for Depth */}
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-neutral-200/70">
          {/* Brand Info Card */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-14 h-14 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={brandConfig.logoPath}
                  alt={brandConfig.name}
                  fill
                  sizes="56px"
                  className="object-contain drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-black text-neutral-900 tracking-tight group-hover:text-red-600 transition">
                  {brandConfig.name}
                  <span className="text-red-600">.</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-red-600/90 -mt-0.5">
                  {brandConfig.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-500 leading-relaxed">
              {brandConfig.tagline} Hand-crafted with fresh, never-frozen chicken and 11 signature secret spices.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chickado on Instagram"
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:border-pink-300 transition hover:-translate-y-0.5"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chickado on TikTok"
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-neutral-500 hover:text-black hover:border-neutral-400 transition hover:-translate-y-0.5"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chickado on YouTube"
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-neutral-500 hover:text-red-600 hover:border-red-300 transition hover:-translate-y-0.5"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chickado on Facebook"
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-neutral-500 hover:text-blue-600 hover:border-blue-300 transition hover:-translate-y-0.5"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Store Hours & Delivery */}
          <div>
            <h3 className="font-heading text-xs font-black uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Operating Hours</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-neutral-600 glass-card p-3 rounded-xl border border-neutral-200/60">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-900">Daily Timing:</span>
                  <span className="text-neutral-500">{brandConfig.openingHours}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-neutral-600 glass-card p-3 rounded-xl border border-neutral-200/60">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-neutral-900">Delivery Coverage:</span>
                  <span className="text-neutral-500">Peshawar Saddar, Hayatabad, Cantt & University Town (Up to 12 km radius)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-heading text-xs font-black uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Contact</span>
            </h3>
            <div className="space-y-2.5 text-xs text-neutral-600">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <a href={`tel:${brandConfig.phone}`} className="hover:text-red-600 transition font-bold text-neutral-900">
                  {brandConfig.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <a
                  href={getWhatsAppChatUrl()}
                  onClick={(e) => {
                    e.preventDefault();
                    openWhatsAppDirectly(brandConfig.whatsappCleanNumber);
                  }}
                  className="hover:text-emerald-700 transition font-bold text-emerald-600 cursor-pointer"
                >
                  WhatsApp: +{brandConfig.whatsappCleanNumber}
                </a>
              </p>
              <p className="text-[11px] text-neutral-500 pt-1 leading-relaxed">
                {brandConfig.address}
              </p>
              <div className="pt-1">
                <a
                  href={brandConfig.googleMaps.directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold transition hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
