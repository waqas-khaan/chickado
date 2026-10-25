import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { brandConfig } from '@/lib/brand';

export default function TopAnnouncementBar() {
  return (
    <div
      id="top-announcement-bar"
      suppressHydrationWarning
      className="hidden md:block bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white text-[11px] py-2 px-4 border-b border-white/10 font-medium"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Clock className="w-3 h-3" />
            <span>Open Daily: {brandConfig.openingHours}</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-neutral-300">
            <MapPin className="w-3 h-3 text-red-500" />
            <span className="truncate max-w-md">{brandConfig.address}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${brandConfig.phone}`}
            className="flex items-center gap-1.5 text-neutral-200 hover:text-white transition font-semibold"
          >
            <Phone className="w-3 h-3 text-red-500" />
            <span>Call: {brandConfig.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
