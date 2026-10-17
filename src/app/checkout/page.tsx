'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  Sparkles,
  MapPin,
  Phone,
  User,
  Tag,
  Check,
  ArrowLeft,
  AlertCircle,
  CreditCard,
  Banknote,
} from 'lucide-react';
import { useCartStore, OrderType } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/format';
import { WhatsAppIcon } from '@/components/social-icons';
import { brandConfig } from '@/lib/brand';
import { getWhatsAppOrderUrl, WhatsAppOrderDetails } from '@/lib/whatsapp';
import { validatePromoCode } from '@/data/menu-data';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    promo,
    applyPromo,
    removePromo,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getDiscount,
    getTax,
    getTotal,
    getItemCount,
  } = useCartStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'ONLINE'>('CASH');

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const discount = getDiscount();
  const tax = getTax();
  const total = getTotal();
  const itemCount = getItemCount();

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoError('');

    try {
      const result = validatePromoCode(promoInput.trim(), subtotal);

      if (!result.valid || !result.promo) {
        setPromoError(result.error || 'Invalid or expired coupon');
        return;
      }

      applyPromo({
        code: result.promo.code,
        type: result.promo.type,
        value: result.promo.value,
        calculatedDiscount: result.calculatedDiscount || 0,
      });
      setPromoInput('');
    } catch {
      setPromoError('Failed to validate coupon');
    } finally {
      setPromoLoading(false);
    }
  };

  const handleProcessOrder = async (target: 'WEB' | 'WHATSAPP') => {
    setError('');

    if (!customerName.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setError('Please provide a valid 11-digit phone number (e.g. 03316633141)');
      return;
    }
    if (orderType === 'DELIVERY' && !customerAddress.trim()) {
      setError('Delivery street address is required for delivery orders');
      return;
    }

    setSubmitting(true);

    try {
      const orderNumber = `CKD-${Date.now().toString().slice(-6)}`;
      const waDetails: WhatsAppOrderDetails = {
        orderNumber,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim() || null,
        orderType,
        tableNumber: orderType === 'DINE_IN' ? tableNumber : null,
        notes: notes.trim() || undefined,
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

      const waUrl = getWhatsAppOrderUrl(waDetails);

      try {
        const recentOrders = JSON.parse(localStorage.getItem('chickado_recent_orders') || '[]');
        recentOrders.unshift({ ...waDetails, createdAt: new Date().toISOString() });
        localStorage.setItem('chickado_recent_orders', JSON.stringify(recentOrders.slice(0, 10)));
      } catch {}

      clearCart();
      window.location.href = waUrl;
    } catch (err: any) {
      setError(err.message || 'Something went wrong processing your order');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-24 px-4 text-center flex items-center justify-center">
        <div className="max-w-md w-full glass-card p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900">Your Feast Cart is Empty</h1>
          <p className="text-xs text-neutral-500">
            Add items to your cart before proceeding to checkout.
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-red-600 transition mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Checkout & Delivery Details
            </h1>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-bold shadow-xs">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Fulfillment Mode Card */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <h2 className="text-sm font-black uppercase text-neutral-900 tracking-wider">
                1. Select Order Type
              </h2>
              <div className="grid grid-cols-3 gap-2.5">
                {(['DELIVERY', 'PICKUP', 'DINE_IN'] as OrderType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={`py-3 px-2 rounded-xl text-xs font-black uppercase transition ${
                      orderType === t
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white/80 text-neutral-700 border border-neutral-200 hover:bg-white'
                    }`}
                  >
                    {t === 'DELIVERY' ? '🛵 Delivery' : t === 'PICKUP' ? '🛍️ Takeaway' : '🍽️ Dine-in'}
                  </button>
                ))}
              </div>

              {orderType === 'DINE_IN' && (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Table Number
                  </label>
                  <input
                    type="text"
                    value={tableNumber || ''}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 4"
                    className="w-full glass-input text-xs px-3.5 py-2.5"
                  />
                </div>
              )}
            </div>

            {/* 2. Customer Contact & Location */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <h2 className="text-sm font-black uppercase text-neutral-900 tracking-wider">
                2. Contact & Delivery Info
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Waqas"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 glass-input text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0331 6633141"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 glass-input text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input text-xs font-medium"
                />
              </div>

              {orderType === 'DELIVERY' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                    <textarea
                      required
                      rows={2}
                      placeholder="House / Flat #, Street, Area landmark (Peshawar Saddar, Hayatabad, etc.)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 glass-input text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Kitchen Notes / Special Requests
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please ring bell twice, extra garlic mayo"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input text-xs font-medium"
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <h2 className="text-sm font-black uppercase text-neutral-900 tracking-wider">
                3. Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CASH')}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                    paymentMethod === 'CASH'
                      ? 'border-red-600 bg-red-50 text-red-950 ring-2 ring-red-600/30'
                      : 'border-white/60 bg-white/70 hover:bg-white text-neutral-700'
                  }`}
                >
                  <Banknote className="w-6 h-6 text-red-600 shrink-0" />
                  <div>
                    <span className="text-xs font-black block">Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-500">Pay when delivered</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                    paymentMethod === 'ONLINE'
                      ? 'border-red-600 bg-red-50 text-red-950 ring-2 ring-red-600/30'
                      : 'border-white/60 bg-white/70 hover:bg-white text-neutral-700'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-red-600 shrink-0" />
                  <div>
                    <span className="text-xs font-black block">Online / Card</span>
                    <span className="text-[10px] text-neutral-500">Bank Transfer / POS Card</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 space-y-5">
              <h2 className="text-base font-black text-neutral-900 border-b border-neutral-200/60 pb-3">
                Order Review ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-neutral-200/50">
                {items.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
                    <div className="min-w-0 pr-2">
                      <span className="font-black text-neutral-900 block truncate">
                        {item.name} x{item.quantity}
                      </span>
                      {item.variantName && (
                        <span className="text-[11px] text-neutral-500 block">
                          Size: {item.variantName}
                        </span>
                      )}
                      {item.addons && item.addons.length > 0 && (
                        <span className="text-[10px] text-amber-700 block truncate">
                          +{item.addons.map((a) => a.name).join(', ')}
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-neutral-900 shrink-0">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="pt-2 border-t border-neutral-200/60 space-y-2">
                <label className="block text-[11px] font-black uppercase text-neutral-500">
                  Have a Promo Code?
                </label>
                {promo ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>{promo.code}</span>
                      <span className="text-[11px] text-emerald-600">
                        (-{formatCurrency(promo.calculatedDiscount)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CHICK100"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="flex-1 glass-input text-xs px-3.5 py-2 uppercase"
                    />
                    <button
                      type="button"
                      disabled={promoLoading || !promoInput.trim()}
                      onClick={handleApplyPromo}
                      className="btn-red px-4 py-2 text-xs font-bold disabled:opacity-50"
                    >
                      {promoLoading ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 font-medium pt-3 border-t border-neutral-200/60">
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

              {/* Action Buttons: WhatsApp vs Direct Web Order */}
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleProcessOrder('WHATSAPP')}
                  className="w-full btn-whatsapp py-3.5 text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>
                    {submitting ? 'Placing Order...' : 'Order on WhatsApp (Instant Kitchen Sync)'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
