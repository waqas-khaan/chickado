'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingBag, ArrowRight } from 'lucide-react';

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
        {/* Left: Shopping Bag Icon with Count Badge + Total Price */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 stroke-[2.2] text-white" />
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
        <div className="flex items-center gap-1.5 bg-white/20 hover:bg-white/25 active:bg-white/30 text-white font-bold text-sm px-4 py-2 rounded-xl backdrop-blur-xs transition shadow-xs">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </aside>
  );
}

