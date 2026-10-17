import React from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  ShoppingBag,
} from 'lucide-react';
import { brandConfig } from '@/lib/brand';
import { WhatsAppIcon } from '@/components/social-icons';

interface OrderSuccessProps {
  params: Promise<{ orderNumber: string }>;
}

export function generateStaticParams() {
  return [
    { orderNumber: 'confirmed' },
  ];
}

export const dynamicParams = false;

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const { orderNumber } = await params;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Celebration Header Card */}
        <div className="glass-card rounded-[28px] p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm ring-4 ring-emerald-500/10">
            <CheckCircle className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              Order Placed via WhatsApp!
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 mt-1">
              Thank You for Ordering!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 font-normal">
              Your order has been sent to our kitchen team. We are preparing your feast fresh and hot!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${brandConfig.whatsappCleanNumber}?text=${encodeURIComponent(
                `Hi ${brandConfig.name}! I just submitted an order. Please confirm my order details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>

            <Link
              href="/menu"
              className="glass-card hover:border-red-500 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-neutral-800 rounded-xl font-bold text-xs transition"
            >
              <ShoppingBag className="w-4 h-4 text-red-600" />
              <span>Explore Menu</span>
            </Link>
          </div>
        </div>

        {/* Quick Contact & Store Info */}
        <div className="glass-card rounded-[24px] p-6 space-y-4 text-xs text-neutral-600">
          <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
            <h2 className="text-sm font-black uppercase text-neutral-900 tracking-wider">
              Store & Kitchen Contact
            </h2>
            <span className="text-emerald-600 font-bold">Open Daily</span>
          </div>
          <div className="space-y-2">
            <p><strong>Hotline:</strong> {brandConfig.phone}</p>
            <p><strong>WhatsApp:</strong> +{brandConfig.whatsappCleanNumber}</p>
            <p><strong>Address:</strong> {brandConfig.address}</p>
            <p><strong>Hours:</strong> {brandConfig.openingHours}</p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-red-600 font-bold underline transition"
          >
            ← Back to Chickado Home
          </Link>
        </div>
      </div>
    </div>
  );
}
