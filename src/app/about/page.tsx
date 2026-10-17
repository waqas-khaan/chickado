import React from 'react';
import { Flame, ShieldCheck, Sparkles, Award } from 'lucide-react';
import StoryBanner from '@/components/story-banner';

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero Header */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-black uppercase tracking-wider shadow-xs">
          <Flame className="w-4 h-4 fill-red-600 text-red-600" />
          <span>The Chickado Story</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-tight uppercase font-heading">
          Born From A Passion For The Perfect Crunch
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
          At Chickado, we believed fast food deserved better: 100% fresh, never frozen local chicken, freshly milled spices, and uncompromised quality in every single bite.
        </p>
      </div>

      {/* Story Banner (Complete Page Width) */}
      <StoryBanner />

      {/* Core Pillars */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-600">
            Our Foundation
          </span>
          <h2 className="text-3xl font-black text-neutral-900 uppercase font-heading">
            The Three Pillars of Chickado
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4 text-left border border-neutral-200/70 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-black text-neutral-900 uppercase font-heading">100% Halal & Fresh</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Inspected daily from certified local poultry farms. Zero synthetic preservatives, zero freezing.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4 text-left border border-neutral-200/70 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6 stroke-[2.2] fill-amber-500 text-amber-500" />
            </div>
            <h3 className="text-lg font-black text-neutral-900 uppercase font-heading">Secret 11 Spices</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Smoked paprika, garlic herb infusions, and pure chili crunch balanced for ultimate craveability.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-4 text-left border border-neutral-200/70 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <Award className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-black text-neutral-900 uppercase font-heading">Precision Pressure-Frying</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Locked moisture inside and maximum golden crisp outside, cooked in 100% trans-fat-free vegetable oil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
