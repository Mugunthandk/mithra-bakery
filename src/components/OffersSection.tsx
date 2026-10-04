import React, { useState } from 'react';
import { Tag, Copy, Check, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OffersSection: React.FC = () => {
  const { applyCoupon, setIsCartOpen, cartSubtotal } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [couponToast, setCouponToast] = useState<{ text: string; error: boolean } | null>(null);

  const offers = [
    {
      code: 'WELCOME20',
      discount: '20% OFF',
      title: 'First Online Order Delight',
      desc: 'Applicable on all sweets, cakes, and bakery delicacies above ₹499.',
      badge: 'New Customer Special',
      min: 499,
    },
    {
      code: 'BUY2GET1',
      discount: '₹150 OFF',
      title: 'Festival Sweet Bounty',
      desc: 'Flat ₹150 discount when ordering sweets & savory hampers over ₹799.',
      badge: 'Bestseller Offer',
      min: 799,
    },
    {
      code: 'FREEDEL',
      discount: 'FREE DELIVERY',
      title: 'Zero Delivery Fee',
      desc: 'Free express temperature-controlled doorstep delivery across all cities.',
      badge: 'Standard Offer',
      min: 0,
    },
  ];

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    const res = applyCoupon(code);
    if (res.success) {
      setCouponToast({ text: `🎉 Promo ${code} applied to your sweet bag!`, error: false });
    } else {
      setCouponToast({
        text: `📋 Promo ${code} copied to clipboard! ${res.message}`,
        error: true,
      });
    }
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section id="offers-section" className="py-16 bg-[#FFF8EC]/40 border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Limited Period Coupons</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
              🔥 Sweet Deals For You
            </h2>
            <p className="text-sm text-[#3B2118]/70 mt-1">
              Save more on every festive celebration. Click to copy and apply directly to your bag.
            </p>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-[#651C32] hover:text-[#C99A3D]"
          >
            View Bag &amp; Apply Coupons →
          </button>
        </div>

        {/* 3 Prominent Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.code}
                className="bg-white rounded-2xl border-2 border-dashed border-[#C99A3D]/60 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#651C32] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#651C32] bg-[#651C32]/10 px-2 py-0.5 rounded">
                      {offer.badge}
                    </span>
                    <Tag className="w-4 h-4 text-[#C99A3D]" />
                  </div>

                  <div className="font-serif text-3xl font-extrabold text-[#651C32] mb-1">
                    {offer.discount}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#3B2118]">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-[#3B2118]/70 mt-2 leading-relaxed">
                    {offer.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3B2118]/10 flex items-center justify-between gap-3">
                  <div className="font-mono text-xs font-bold tracking-widest text-[#3B2118] bg-[#FFF8EC] px-3 py-1.5 rounded-lg border border-[#3B2118]/10">
                    {offer.code}
                  </div>

                  <button
                    onClick={() => handleCopyAndApply(offer.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#651C32] text-[#FFF8EC] hover:bg-[#521628]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy &amp; Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {couponToast && (
          <div className={`mt-6 p-4 rounded-xl border text-xs flex items-center justify-between transition-all ${
            couponToast.error
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <span>{couponToast.text}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="underline font-bold ml-3 shrink-0"
            >
              Open Sweet Bag →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
