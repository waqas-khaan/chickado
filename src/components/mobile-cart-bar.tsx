'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { ArrowRight } from 'lucide-react';
import BucketCartIcon from '@/components/bucket-cart-icon';

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
        {/* Left: Bucket Cart Icon with Count + Total Price */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center shrink-0 -my-1">
            <BucketCartIcon count={itemCount} size={36} />
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

