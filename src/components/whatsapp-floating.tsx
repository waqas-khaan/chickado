'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { WhatsAppIcon } from '@/components/social-icons';
import { getWhatsAppChatUrl } from '@/lib/whatsapp';
import { useCartStore } from '@/lib/cart-store';

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const { isCartDrawerOpen } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Hide on admin routes or when item modal / cart drawer is open
  if (pathname.startsWith('/admin') || isModalOpen || isCartDrawerOpen) {
    return null;
  }

  const chatUrl = getWhatsAppChatUrl();

  return (
    <aside
      id="floating-whatsapp-btn"
      aria-label="WhatsApp quick chat"
      className="fixed bottom-6 right-6 z-40 flex items-center group transition-all duration-300"
    >
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order or Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20"
      >
        {/* Pulsing beacon effect */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] text-neutral-900 font-bold items-center justify-center">
            1
          </span>
        </span>

        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </aside>
  );
}
