import React from 'react';
import Image from 'next/image';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { InstagramIcon, TikTokIcon, YouTubeIcon, FacebookIcon } from '@/components/social-icons';
import { Metadata } from 'next';
import { brandConfig } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Contact & Location | ${brandConfig.name} Peshawar Saddar`,
  description: `Visit ${brandConfig.name} in Peshawar Saddar opposite Sunhri Masjid or contact us via WhatsApp for instant ordering.`,
};

export default function ContactPage() {

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-black uppercase tracking-wider shadow-xs">
            <MapPin className="w-4 h-4" />
            <span>Store Location & Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
            Visit & Connect with {brandConfig.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-normal">
            Located in the heart of Peshawar Saddar opposite Sunhri Masjid near MCB bank. Drop by for sizzling fresh crunch, chat on WhatsApp, or follow us on our socials!
          </p>
        </div>

        {/* 3 Contact Info Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Address & Directions */}
          <div className="p-7 glass-card glass-card-hover rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <MapPin className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-black text-neutral-900">Flagship Address</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              {brandConfig.address}
            </p>
            <a
              href={brandConfig.googleMaps.directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 hover:text-red-700 pt-2 transition"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Google Maps Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: Phone & Email */}
          <div className="p-7 glass-card glass-card-hover rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-black text-neutral-900">Direct Contact</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-500">Phone:</span>
                <a href={`tel:${brandConfig.phone}`} className="font-black text-neutral-900 hover:text-red-600">
                  {brandConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-500">WhatsApp:</span>
                <a
                  href={`https://wa.me/${brandConfig.whatsappCleanNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-emerald-700 hover:underline"
                >
                  +{brandConfig.whatsappCleanNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-500">Email:</span>
                <a href={`mailto:${brandConfig.email}`} className="font-semibold text-neutral-800 hover:text-red-600">
                  {brandConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Social Channels */}
          <div className="p-7 glass-card glass-card-hover rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <InstagramIcon className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-base font-black text-neutral-900">Official Socials</h3>
            <div className="space-y-2 text-xs">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-neutral-700 hover:text-pink-600 py-0.5 group transition"
              >
                <span className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-pink-500" />
                  <span>Instagram: <strong className="text-neutral-900 group-hover:text-pink-600">@chickadopk</strong></span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-pink-500" />
              </a>
              <a
                href={brandConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-neutral-700 hover:text-neutral-950 py-0.5 group transition"
              >
                <span className="flex items-center gap-2">
                  <TikTokIcon className="w-4 h-4 text-neutral-800" />
                  <span>TikTok: <strong className="text-neutral-900 group-hover:text-black">@chickadopk</strong></span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              </a>
              <a
                href={brandConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-neutral-700 hover:text-red-600 py-0.5 group transition"
              >
                <span className="flex items-center gap-2">
                  <YouTubeIcon className="w-4 h-4 text-red-600" />
                  <span>YouTube: <strong className="text-neutral-900 group-hover:text-red-600">@chickado01</strong></span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-600" />
              </a>
              <a
                href={brandConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-neutral-700 hover:text-blue-600 py-0.5 group transition"
              >
                <span className="flex items-center gap-2">
                  <FacebookIcon className="w-4 h-4 text-blue-600" />
                  <span>Facebook: <strong className="text-neutral-900 group-hover:text-blue-600">Chickado</strong></span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Full-Width Showcase */}
        <div className="glass-card rounded-[28px] p-5 sm:p-7 space-y-4 shadow-md border border-white/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h2 className="text-sm sm:text-base font-black text-neutral-900">
                  Chickado Peshawar Saddar Flagship Branch
                </h2>
                <p className="text-[11px] text-neutral-500 font-medium">
                  Opposite Sunhri Masjid near MCB Bank, Saddar, Peshawar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Live GPS Verified
              </span>
              <a
                href={brandConfig.googleMaps.directLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red py-2 px-4 text-xs inline-flex items-center gap-1.5 font-bold"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="w-full h-96 sm:h-[460px] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-inner bg-neutral-100">
            <iframe
              title="Chickado Peshawar Saddar Map Location"
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
  );
}
