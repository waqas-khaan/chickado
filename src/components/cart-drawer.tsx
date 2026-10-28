'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Tag,
  Check,
  CheckCircle,
} from 'lucide-react';
import { useCartStore, OrderType } from '@/lib/cart-store';
import BucketCartIcon from '@/components/bucket-cart-icon';
import { WhatsAppIcon } from '@/components/social-icons';
import { formatCurrency } from '@/lib/format';
import { brandConfig } from '@/lib/brand';
import {
  getWhatsAppOrderUrl,
  WhatsAppOrderDetails,
  openWhatsAppDirectly,
  buildWhatsAppOrderMessage,
} from '@/lib/whatsapp';
import { validatePromoCode } from '@/data/menu-data';

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeItem,
    updateQuantity,
    updateNotes,
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

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  // Quick checkout modal inside drawer
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutTarget, setCheckoutTarget] = useState<'WEB' | 'WHATSAPP'>('WEB');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const resetCheckoutModal = () => {
    setSubmitting(false);
    setShowCheckoutModal(false);
    setFormError('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setOrderNotes('');
  };

  React.useEffect(() => {
    const handleRestoreState = () => {
      if (submitting) {
        resetCheckoutModal();
      }
    };
    window.addEventListener('pageshow', handleRestoreState);
    window.addEventListener('focus', handleRestoreState);
    return () => {
      window.removeEventListener('pageshow', handleRestoreState);
      window.removeEventListener('focus', handleRestoreState);
    };
  }, [submitting]);

  if (!isCartDrawerOpen) return null;

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
        setPromoError(result.error || 'Invalid or expired promo code');
        setPromoLoading(false);
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
      setPromoError('Failed to validate promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const initiateCheckout = (target: 'WEB' | 'WHATSAPP') => {
    if (items.length === 0) return;
    setCheckoutTarget(target);
    setShowCheckoutModal(true);
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setFormError('Please enter a valid phone number (e.g. 03316633141).');
      return;
    }
    if (orderType === 'DELIVERY' && !customerAddress.trim()) {
      setFormError('Delivery address is required for home delivery.');
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
        tableNumber: orderType === 'DINE_IN' ? tableNumber : undefined,
        notes: orderNotes.trim() || undefined,
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

      const waMessage = buildWhatsAppOrderMessage(waDetails);

      // Save recent order locally
      try {
        const recentOrders = JSON.parse(localStorage.getItem('chickado_recent_orders') || '[]');
        recentOrders.unshift({ ...waDetails, createdAt: new Date().toISOString() });
        localStorage.setItem('chickado_recent_orders', JSON.stringify(recentOrders.slice(0, 10)));
      } catch {}

      // Reset checkout modal and clear cart immediately so when the browser regains focus,
      // all dialogs and the cart are completely fresh and clean
      resetCheckoutModal();
      clearCart();
      closeCartDrawer();

      // Open WhatsApp directly without intermediary landing page
      openWhatsAppDirectly(brandConfig.whatsappCleanNumber, waMessage);
      router.push('/order-success/confirmed');
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while placing your order.');
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity"
          onClick={closeCartDrawer}
        />

        {/* Slide-out Glass Drawer */}
        <aside className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md glass-drawer flex flex-col relative z-10 animate-slideLeft">
            {/* Drawer Header (Navbar) */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white shadow-md border-b border-red-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center p-1 border border-white/60">
                  <BucketCartIcon count={itemCount} size={30} />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-black text-white leading-tight drop-shadow-xs">
                    Your Chickado Cart
                  </h2>
                  <span className="text-xs text-red-100 font-medium">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for crunch
                  </span>
                </div>
              </div>

              <button
                onClick={closeCartDrawer}
                aria-label="Close cart"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition border border-white/20 shadow-xs"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="flex items-center justify-center">
                  <BucketCartIcon count={0} size={68} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold text-neutral-800">Your cart is empty</h3>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Your tastebuds are missing out! Explore our crispy fried chicken, combos, and burgers.
                  </p>
                </div>
                <button
                  onClick={closeCartDrawer}
                  className="px-6 py-2.5 btn-red text-white text-xs font-bold shadow-md"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Tabs */}
                <div className="p-4 bg-white/60 border-b border-white/60">
                  <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Select Order Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['DELIVERY', 'PICKUP', 'DINE_IN'] as OrderType[]).map((type) => {
                      const label = type === 'DELIVERY' ? '🛵 Delivery' : type === 'PICKUP' ? '🛍️ Takeaway' : '🍽️ Dine-in';
                      const active = orderType === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setOrderType(type)}
                          className={`py-2 px-2 text-xs font-heading font-bold rounded-xl border transition ${
                            active
                              ? 'bg-red-600 text-white border-red-600 shadow-sm'
                              : 'glass-card text-neutral-700 border-neutral-200/70 hover:bg-white'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 glass-card border border-white/70 hover:border-red-500/30 transition shadow-xs"
                    >
                      <div className="flex gap-3">
                        {item.image && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200/60">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              unoptimized
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-heading text-sm font-bold text-neutral-900 leading-snug">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded-lg transition"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            </button>
                          </div>

                          {item.variantName && (
                            <span className="inline-block text-[11px] font-semibold text-neutral-500 mt-0.5">
                              Size: {item.variantName}
                            </span>
                          )}

                          {item.addons && item.addons.length > 0 && (
                            <p className="text-[11px] text-amber-700 font-medium">
                              + {item.addons.map((a) => a.name).join(', ')}
                            </p>
                          )}

                          {/* Price & Quantity Controls */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="font-heading text-sm font-black text-red-600">
                              {formatCurrency(item.totalPrice)}
                            </span>

                            <div className="flex items-center rounded-xl bg-white/90 border border-neutral-200 shadow-xs overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 text-neutral-600 transition"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-neutral-900 min-w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 text-neutral-600 transition"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Special Instruction Note */}
                          <input
                            type="text"
                            placeholder="Special instructions (optional)"
                            value={item.notes || ''}
                            onChange={(e) => updateNotes(item.cartItemId, e.target.value)}
                            className="mt-2 w-full text-[11px] px-2.5 py-1 glass-input"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Promo Code"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          className="w-full pl-9 pr-3 py-2 text-xs uppercase font-bold glass-input"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoLoading || !promoInput.trim()}
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-heading font-bold rounded-xl transition"
                      >
                        {promoLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>

                    {promoError && (
                      <p className="text-[11px] text-red-600 mt-1 font-semibold">{promoError}</p>
                    )}

                    {promo && (
                      <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-bold shadow-xs">
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Code &quot;{promo.code}&quot; applied (-{formatCurrency(discount)})
                        </span>
                        <button
                          onClick={removePromo}
                          className="text-neutral-400 hover:text-red-600 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Totals & Checkout Actions in Glass Card */}
                <div className="p-5 glass-card m-3 border border-white/80 shadow-lg space-y-3">
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-neutral-900">{formatCurrency(subtotal)}</span>
                    </div>
                    {orderType === 'DELIVERY' && (
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span className="font-bold text-emerald-600">Free Delivery</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount:</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-black text-neutral-900 pt-2 border-t border-neutral-200/80">
                      <span className="font-heading">Grand Total:</span>
                      <span className="font-heading text-red-600 text-lg font-black">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  {/* WhatsApp Order Button */}
                  <div className="pt-2">
                    <button
                      id="checkout-whatsapp-button"
                      onClick={() => initiateCheckout('WHATSAPP')}
                      className="w-full flex items-center justify-center gap-2 py-3.5 btn-whatsapp text-white text-xs font-heading font-black shadow-lg rounded-xl hover:shadow-emerald-600/20 active:scale-98 transition"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Order on WhatsApp ({formatCurrency(total)})</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Quick Customer Details Modal (Glass Style) */}
      {showCheckoutModal && (
        <div
          className="fixed inset-0 z-60 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetCheckoutModal();
          }}
        >
          <div className="glass-modal max-w-md w-full p-6 shadow-2xl animate-scaleUp border border-white/70">
            <div className="flex items-center justify-between border-b border-neutral-200/70 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-black text-neutral-900">
                  {checkoutTarget === 'WHATSAPP' ? '📲 WhatsApp Order Details' : '🛵 Delivery & Contact Details'}
                </span>
              </div>
              <button
                type="button"
                onClick={resetCheckoutModal}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleCompleteOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2.5 glass-input font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Phone Number (with WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03316633141"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 glass-input font-medium"
                />
              </div>

              {orderType === 'DELIVERY' && (
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Delivery Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat #, Street, Area, Peshawar..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2.5 glass-input font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Order Notes (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, extra sauce napkins"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-3 py-2.5 glass-input font-medium"
                />
              </div>

              {/* Order Recap */}
              <div className="p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/60 space-y-1 text-[11px] text-neutral-600">
                <div className="flex justify-between">
                  <span>Order Mode:</span>
                  <span className="font-bold text-neutral-900">{orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Count:</span>
                  <span className="font-bold text-neutral-900">{itemCount} items</span>
                </div>
                {orderType === 'DELIVERY' && (
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="font-bold text-emerald-600">Free Delivery</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-neutral-900 text-xs pt-1 border-t border-neutral-200/60">
                  <span>Payable Total:</span>
                  <span className="font-black text-red-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3.5 text-white rounded-xl font-heading font-black text-xs shadow-md transition flex items-center justify-center gap-2 ${
                    checkoutTarget === 'WHATSAPP'
                      ? 'btn-whatsapp'
                      : 'btn-red'
                  } ${submitting ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {submitting ? (
                    <span>Processing Order...</span>
                  ) : checkoutTarget === 'WHATSAPP' ? (
                    <>
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Send WhatsApp Order ({formatCurrency(total)})</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm & Place Order ({formatCurrency(total)})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
