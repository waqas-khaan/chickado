'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, Plus, Minus, Check, Flame, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { useCartStore } from '@/lib/cart-store';
import { WhatsAppIcon } from '@/components/social-icons';
import { brandConfig } from '@/lib/brand';
import {
  getSingleItemWhatsAppUrl,
  openWhatsAppDirectly,
  buildSingleItemWhatsAppMessage,
} from '@/lib/whatsapp';

export interface ItemModalProps {
  item: {
    id: string;
    name: string;
    description?: string | null;
    price: number | string;
    image?: string | null;
    category?: { name: string } | null;
    variants?: Array<{ id: string; name: string; price: number | string; isDefault: boolean }>;
    addons?: Array<{ addon: { id: string; name: string; price: number | string } }>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const { addItem } = useCartStore();

  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Array<{ id: string; name: string; price: number }>>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [mounted, setMounted] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [modalImgError, setModalImgError] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Sync default variant when modal opens
  React.useEffect(() => {
    if (item) {
      if (item.variants && item.variants.length > 0) {
        const def = item.variants.find((v) => v.isDefault) || item.variants[0];
        setSelectedVariant(def.name);
      } else {
        setSelectedVariant(null);
      }
      setSelectedAddons([]);
      setQuantity(1);
      setNotes('');
      setModalImgSrc(item.image || null);
      setModalImgError(false);
    }
  }, [item]);

  const handleModalImgError = () => {
    if (!modalImgSrc) {
      setModalImgError(true);
      return;
    }
    if (modalImgSrc.includes('/menu/fries/')) {
      setModalImgSrc(modalImgSrc.replace('/menu/fries/', '/menu/Fries/'));
      return;
    }
    if (modalImgSrc.includes('/menu/Fries/')) {
      setModalImgSrc(modalImgSrc.replace('/menu/Fries/', '/menu/fries/'));
      return;
    }
    if (modalImgSrc.includes('Bihari')) {
      setModalImgSrc(modalImgSrc.replace('Bihari', 'Behari'));
      return;
    }
    if (modalImgSrc.includes('Behari')) {
      setModalImgSrc(modalImgSrc.replace('Behari', 'Bihari'));
      return;
    }
    setModalImgError(true);
  };

  // Synchronize body class for hiding navbar & floating elements when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('item-modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('item-modal-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('item-modal-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !item || !mounted) return null;

  // Calculate unit price
  let basePrice = Number(item.price);
  if (selectedVariant && item.variants) {
    const variantObj = item.variants.find((v) => v.name === selectedVariant);
    if (variantObj) {
      basePrice = Number(variantObj.price);
    }
  }

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      itemId: item.id,
      name: item.name,
      image: item.image,
      variantName: selectedVariant,
      addons: selectedAddons,
      unitPrice,
      quantity,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  const handleOrderOnWhatsApp = () => {
    if (!item) return;
    const message = buildSingleItemWhatsAppMessage({
      name: item.name,
      price: unitPrice,
      variantName: selectedVariant,
      addons: selectedAddons,
      quantity,
      totalPrice,
      notes: notes.trim() || undefined,
      image: item.image,
    });
    onClose();
    openWhatsAppDirectly(brandConfig.whatsappCleanNumber, message);
  };

  return createPortal(
    <div
      id="item-modal-dialog"
      data-item-modal="true"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] overflow-y-auto bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <div className="glass-modal max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp text-neutral-900">
        {/* Header Image */}
        <div className="relative h-64 w-full bg-neutral-950 overflow-hidden">
          {modalImgSrc && !modalImgError ? (
            <Image
              src={modalImgSrc}
              alt={item.name}
              fill
              unoptimized
              sizes="512px"
              onError={handleModalImgError}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500 bg-neutral-900">
              <Flame className="w-16 h-16 text-red-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />


          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 hover:scale-105 active:scale-95 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider mb-1.5 shadow-sm">
              {item.category?.name || 'Chickado Special'}
            </span>
            <h2 className="text-2xl font-black text-white leading-tight drop-shadow-md">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {item.description && (
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              {item.description}
            </p>
          )}

          {/* Variant Selector */}
          {item.variants && item.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-800">
                Choose Size / Option *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant === v.name;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-600/30 shadow-xs'
                          : 'border-white/60 bg-white/60 hover:bg-white hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                            isSelected ? 'border-red-600 bg-red-600 text-white' : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>{v.name}</span>
                      </div>
                      <span className="font-extrabold text-red-600">
                        {formatCurrency(v.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Selector */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-800">
                Upgrade with Delicious Add-ons
              </label>
              <div className="space-y-2">
                {item.addons.map(({ addon }) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  const addonPrice = Number(addon.price);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() =>
                        toggleAddon({ id: addon.id, name: addon.name, price: addonPrice })
                      }
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition ${
                        isChecked
                          ? 'border-red-500 bg-red-50/80 text-red-950 ring-1 ring-red-500/30 shadow-xs'
                          : 'border-white/60 bg-white/60 hover:bg-white hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                            isChecked ? 'border-red-600 bg-red-600 text-white' : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-bold text-red-600">
                        +{formatCurrency(addonPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-800">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Less mayo, extra crispy, extra napkins"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-white/70 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white text-neutral-900 placeholder:text-neutral-400 shadow-xs transition"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-5 bg-white border-t border-neutral-200/80 shadow-lg flex flex-col gap-2.5">
          {/* Top Row: Stepper and Unit/Total Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
                Qty
              </span>
              <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700 active:scale-95 transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-black text-sm text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-neutral-700 active:scale-95 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-semibold text-neutral-400">Total:</span>
              <span className="text-lg font-black text-red-600 font-heading">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          {/* Bottom Row: Full-width / Side-by-Side CTAs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 btn-red py-3 px-3 sm:px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-black whitespace-nowrap shadow-md active:scale-[0.98] transition cursor-pointer rounded-xl"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Add to Cart</span>
              <span className="text-white/80 font-normal">•</span>
              <span>{formatCurrency(totalPrice)}</span>
            </button>

            <button
              type="button"
              onClick={handleOrderOnWhatsApp}
              className="btn-whatsapp py-3 px-3.5 sm:px-4 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold shadow-md rounded-xl shrink-0 whitespace-nowrap active:scale-[0.98] transition cursor-pointer"
              title="Order this item directly on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
