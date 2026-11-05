'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { ArrowRight } from 'lucide-react';

function OutlineBucketIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Chicken Drumstick (Bone Handle + Meat Contour) */}
      <path d="M 34 16 L 43 6" />
      <path d="M 42.5 4.5 C 42 2.5 43.5 1.5 45 2.5 C 46.5 3.5 46 5.5 44.5 6.5 C 46 7.5 45 9.5 43 9 C 41.5 8.5 41.5 7 42 6.5" />
      <path d="M 25 21 C 22 16 26 12 31 11.5 C 34.5 11 36.5 13 38 16 C 39.5 18 37.5 21 36.5 21" />

      {/* Bucket Body Outline */}
      <path d="M 14 22 L 18 55 C 18 58 46 58 46 55 L 50 22" />

      {/* Top Rim Ellipse */}
      <ellipse cx="32" cy="22" rx="18" ry="4" />

      {/* Bucket Front Vertical Stripes */}
      <path d="M 26 26 L 27.5 56" strokeWidth="2.8" />
      <path d="M 38 26 L 36.5 56" strokeWidth="2.8" />
    </svg>
  );
}

export default function MobileCartBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getItemCount, getSubtotal, openCartDrawer, isCartDrawerOpen } = useCartStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor DOM for opened modals
  useEffect(() => {
    const checkModal = () => {
      const open =
        document.body.classList.contains('item-modal-open') ||
        Boolean(document.getElementById('item-modal-dialog')) ||
        Boolean(document.querySelector('[data-item-modal="true"]'));
      setIsModalOpen(open);
    };

    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Hide on admin routes, checkout, or cart pages (where user is already looking at cart)
  const isHiddenRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/pos') ||
    pathname === '/cart' ||
    pathname === '/checkout' ||
    pathname.startsWith('/order-success');

  const isVisible =
    mounted &&
    itemCount > 0 &&
    !isHiddenRoute &&
    !isModalOpen &&
    !isCartDrawerOpen;

  // Format currency with two decimal places (e.g. Rs. 998.00) matching brand specification
  const formattedPrice = `Rs. ${Number(subtotal || 0).toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  if (!mounted) {
    return null;
  }

  return (
    <aside
      aria-label="Floating Mobile Cart Summary"
      className={`fixed left-3 right-3 bottom-4 z-40 md:hidden transition-all duration-300 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={openCartDrawer}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCartDrawer();
          }
        }}
        className="relative w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white rounded-2xl shadow-xl shadow-red-600/30 border border-white/15 px-4 py-3 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all select-none"
      >
        {/* Left: Outlined Bucket Cart Icon with Count Badge + Total Price */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center shrink-0">
            <OutlineBucketIcon className="w-7 h-7 text-white" />
            <span
              key={itemCount}
              className="absolute -top-1.5 -right-2 min-w-[19px] h-[19px] px-1 bg-white text-red-600 rounded-full text-[11px] font-black flex items-center justify-center leading-none shadow-sm animate-scaleUp"
            >
              {itemCount}
            </span>
          </div>

          <span className="text-white font-extrabold text-base tracking-tight font-heading">
            {formattedPrice}
          </span>
        </div>

        {/* Right: Pill Button "View Cart →" */}
        <div className="flex items-center gap-1.5 bg-white hover:bg-neutral-100 active:bg-neutral-200 text-neutral-900 font-black text-sm px-4 py-2 rounded-xl transition-all shadow-md active:scale-95">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </aside>
  );
}
