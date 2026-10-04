import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyCoupon(promoInput);
    setCouponMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FFFDF9] h-full flex flex-col shadow-2xl border-l border-[#3B2118]/15 animate-in slide-in-from-right duration-300">
        
        {/* Cart Drawer Header */}
        <div className="p-5 bg-[#651C32] text-[#FFF8EC] flex items-center justify-between border-b border-[#C99A3D]/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C99A3D]" />
            <h3 className="font-serif text-xl font-bold">Your Sweet Bag</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Delivery Threshold Bar */}
        <div className="px-5 py-2.5 bg-[#FFF8EC] border-b border-[#3B2118]/10 text-xs">
          {cartSubtotal >= 999 ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <span>🎉 Congratulations! You have qualified for <strong>FREE EXPRESS DELIVERY</strong>.</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between font-medium text-[#3B2118]/80 mb-1">
                <span>Add ₹{999 - cartSubtotal} more for Free Delivery</span>
                <span>₹{cartSubtotal} / ₹999</span>
              </div>
              <div className="w-full bg-[#3B2118]/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C99A3D] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#3B2118]/60">
              <div className="w-16 h-16 rounded-full bg-[#FFF8EC] flex items-center justify-center text-3xl">
                🍬
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-[#3B2118]">Your sweet bag is empty</p>
                <p className="text-xs text-[#3B2118]/70 mt-1 max-w-xs">
                  Discover traditional ghee sweets, fresh cakes, and crunchy savouries made with purity.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#651C32] text-[#FFF8EC] text-xs font-bold uppercase tracking-wider"
              >
                Browse Delicacies
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-[#3B2118]/10 flex gap-3.5 shadow-xs relative"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 rounded-xl bg-[#FFF8EC] shrink-0 overflow-hidden border border-[#3B2118]/5">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {item.category === 'cakes' ? '🎂' : item.category === 'gifts' ? '🎁' : '🍬'}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="pr-6">
                    <h4 className="font-serif font-bold text-sm text-[#3B2118] line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#C99A3D] block">
                      {item.variantLabel}
                    </span>

                    {/* Custom details note if custom cake */}
                    {item.customCakeDetails && (
                      <p className="text-[10px] text-[#3B2118]/70 italic mt-0.5">
                        Piping: "{item.customCakeDetails.message}"
                      </p>
                    )}

                    {/* Custom details note if custom box */}
                    {item.customBoxDetails && (
                      <p className="text-[10px] text-[#3B2118]/70 italic mt-0.5">
                        {item.customBoxDetails.selectedSweets.length} varieties selected
                      </p>
                    )}
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#3B2118]/20 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 px-1.5 text-[#3B2118] hover:bg-[#FFF8EC]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 px-1.5 text-[#3B2118] hover:bg-[#FFF8EC]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif font-bold text-base text-[#651C32] tabular-nums">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 text-[#3B2118]/40 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Input & Cart Financials Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FFF8EC] border-t border-[#3B2118]/15 space-y-4">
            
            {/* Promo Code Form */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo {appliedCoupon.code} applied (-₹{cartDiscount})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g. WELCOME20)"
                  className="flex-1 px-3 py-2 rounded-xl border border-[#3B2118]/20 bg-white text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#651C32]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3B2118] text-[#FFF8EC] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#25150f]"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMessage && (
              <p className={`text-[11px] ${couponMessage.error ? 'text-red-600' : 'text-emerald-700'}`}>
                {couponMessage.text}
              </p>
            )}

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#3B2118]/80 pt-2 border-t border-[#3B2118]/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#3B2118] tabular-nums">₹{cartSubtotal}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Special Discount</span>
                  <span className="tabular-nums">-₹{cartDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Delivery</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">Free</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#3B2118]/10 text-base font-bold text-[#3B2118]">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-[#651C32] tabular-nums">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 bg-[#651C32] hover:bg-[#521628] text-[#FFF8EC] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C99A3D]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
