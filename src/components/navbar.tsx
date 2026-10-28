'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, MessageCircle, BookOpen } from 'lucide-react';
import BucketCartIcon from '@/components/bucket-cart-icon';
import { brandConfig } from '@/lib/brand';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/format';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [cartBouncing, setCartBouncing] = useState(false);

  const { getItemCount, getSubtotal, openCartDrawer } = useCartStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const prevCount = useRef(itemCount);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger bounce animation when item is added to cart
  useEffect(() => {
    if (mounted && itemCount > prevCount.current) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 450);
      return () => clearTimeout(timer);
    }
    prevCount.current = itemCount;
  }, [itemCount, mounted]);

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

  const displayedCount = mounted ? itemCount : 0;
  const displayedSubtotal = mounted ? subtotal : 0;

  if (isModalOpen) {
    return null;
  }


  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Deals & Combos', href: '/menu?category=deals-combos' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-40 transition-all duration-300 bg-white/85 backdrop-blur-xl border-b border-white/60 ${
        scrolled ? 'h-16 shadow-md' : 'h-20 shadow-xs'
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo with Fallback */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`relative shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                scrolled ? 'w-11 h-11' : 'w-14 h-14'
              }`}
            >
              {!logoFailed ? (
                <Image
                  src={brandConfig.logoPath}
                  alt={brandConfig.name}
                  fill
                  sizes="56px"
                  priority
                  className="object-contain drop-shadow-sm"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-xl flex items-center justify-center shadow-md">
                  C
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black tracking-tight text-neutral-900 group-hover:text-red-600 transition leading-none">
                {brandConfig.name}
                <span className="text-red-600">.</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-extrabold text-red-600/90 mt-0.5">
                {brandConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition ${
                    isActive
                      ? 'bg-red-50 text-red-600 shadow-xs ring-1 ring-red-500/20'
                      : 'text-neutral-700 hover:text-red-600 hover:bg-neutral-50/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Menu Book PDF Button */}
            <a
              href="/menu-book/chickado-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading font-black tracking-wider transition bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white shadow-sm hover:shadow-red-600/30 hover:scale-105 active:scale-95 ml-1 border border-amber-400/30 cursor-pointer"
              title="Open Official Chickado Menu PDF"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>MENU BOOK</span>
            </a>
          </nav>

          {/* Action CTAs: Bucket Cart Button, Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Fast-Food Chicken Bucket Cart Trigger */}
            <button
              id="navbar-cart-button"
              onClick={openCartDrawer}
              aria-label="View Shopping Cart"
              className="relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:py-2.5 rounded-2xl hover:bg-neutral-100/70 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <div className={cartBouncing ? 'animate-cart-bounce' : ''}>
                <BucketCartIcon count={displayedCount} size={42} />
              </div>
              <div className="flex flex-col text-left pr-1">
                <span className="text-[11px] uppercase font-black tracking-wider text-neutral-400 leading-none">
                  Cart
                </span>
                <span suppressHydrationWarning className="text-sm sm:text-[15px] font-black text-red-600 font-heading leading-tight mt-0.5">
                  {formatCurrency(displayedSubtotal)}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-red-600 rounded-xl hover:bg-neutral-100/80 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Solid Style) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white mx-4 mt-2 p-4 space-y-2 rounded-2xl border border-neutral-200 shadow-2xl animate-scaleUp">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-heading font-bold transition ${
                  pathname === link.href
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-neutral-800 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Menu Book PDF Button in Mobile Menu */}
            <a
              href="/menu-book/chickado-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-heading font-black tracking-wider transition bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white shadow-md hover:shadow-red-600/30 active:scale-98 border border-amber-400/30 cursor-pointer"
              title="Open Official Chickado Menu PDF"
            >
              <BookOpen className="w-4 h-4" />
              <span>MENU BOOK (PDF)</span>
            </a>

            <div className="pt-3 border-t border-neutral-200/80 flex flex-col gap-2">
              <a
                href={`tel:${brandConfig.phone}`}
                className="flex items-center justify-center gap-2 py-2 text-xs text-neutral-600 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>Call Store: {brandConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${brandConfig.whatsappCleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
  );
}
