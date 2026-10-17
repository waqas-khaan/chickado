'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageSquare,
  ArrowLeft,
  Tag,
  Check,
} from 'lucide-react';
import { useCartStore, OrderType } from '@/lib/cart-store';
import BucketCartIcon from '@/components/bucket-cart-icon';
import { WhatsAppIcon } from '@/components/social-icons';
import { formatCurrency } from '@/lib/format';
import { brandConfig } from '@/lib/brand';
import { getWhatsAppOrderUrl, WhatsAppOrderDetails } from '@/lib/whatsapp';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    removeItem,
    updateQuantity,
    updateNotes,
    promo,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getDiscount,
    getTax,
    getTotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const discount = getDiscount();
  const tax = getTax();
  const total = getTotal();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-24 px-4 text-center flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl space-y-4 shadow-sm border border-neutral-200/80">
          <div className="flex items-center justify-center mx-auto">
            <BucketCartIcon count={0} size={76} />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 uppercase font-heading">
            Your Bucket is Empty
          </h1>
          <p className="text-xs text-neutral-500">
            You have not added any delicious crispy burgers or chicken yet.
          </p>
          <Link
            href="/menu"
            className="btn-red inline-flex items-center gap-2 px-6 py-3 text-xs"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Quick WhatsApp link from cart
  const waDetails: WhatsAppOrderDetails = {
    orderNumber: `CART-${Date.now().toString().slice(-4)}`,
    customerName: 'Valued Customer',
    customerPhone: '',
    customerAddress: null,
    orderType,
    tableNumber: orderType === 'DINE_IN' ? tableNumber : null,
    items: items.map((i) => ({
      name: i.name,
      variantName: i.variantName,
      addons: i.addons,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      totalPrice: i.totalPrice,
      notes: i.notes,
      image: i.image,
    })),
    subtotal,
    deliveryFee,
    discount,
    tax,
    total,
  };
  const whatsappUrl = getWhatsAppOrderUrl(waDetails);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
          <div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-red-600 transition mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Your Feast Cart
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-neutral-500 hover:text-red-600 font-bold transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items list */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 space-y-4">
            {/* Order Type Selector */}
            <div className="p-3 bg-white/70 rounded-2xl border border-white/60 space-y-2">
              <span className="text-[10px] font-black uppercase text-neutral-400 block">
                Order Type
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['DELIVERY', 'PICKUP', 'DINE_IN'] as OrderType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={`py-2 rounded-xl text-xs font-black uppercase transition ${
                      orderType === t
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white/80 text-neutral-700 border border-neutral-200 hover:bg-white'
                    }`}
                  >
                    {t === 'DELIVERY' ? '🛵 Delivery' : t === 'PICKUP' ? '🛍️ Takeaway' : '🍽️ Dine-in'}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-neutral-200/60">
              {items.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-4 items-center">
                  {item.image && (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 shadow-xs">
                      <Image src={item.image} alt={item.name} fill unoptimized sizes="64px" className="object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black text-neutral-900">{item.name}</h3>
                    {item.variantName && (
                      <span className="text-xs text-neutral-500 block">Size: {item.variantName}</span>
                    )}
                    {item.addons && item.addons.length > 0 && (
                      <span className="text-[11px] text-amber-700 block truncate">
                        +{item.addons.map((a) => a.name).join(', ')}
                      </span>
                    )}
                    <span className="text-sm font-black text-red-600 mt-1 block">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1 shadow-xs">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1 hover:bg-neutral-100 text-neutral-700 rounded active:scale-95 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-black text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1 hover:bg-neutral-100 text-neutral-700 rounded active:scale-95 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:scale-105 active:scale-95 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 space-y-5">
            <h2 className="text-base font-black text-neutral-900 border-b border-neutral-200/60 pb-3">
              Bill Summary
            </h2>

            <div className="space-y-2 text-xs text-neutral-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-neutral-900">{formatCurrency(subtotal)}</span>
              </div>
              {orderType === 'DELIVERY' && (
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="font-bold text-neutral-900">{formatCurrency(deliveryFee)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount:</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-bold text-neutral-900">{formatCurrency(tax)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-neutral-900 pt-3 border-t border-neutral-200/60">
                <span>Grand Total:</span>
                <span className="text-red-600 text-xl">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full btn-red py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-whatsapp py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order Cart on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
