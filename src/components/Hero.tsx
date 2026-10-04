import React from 'react';
import { Star, Truck, Check, ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import heroImg from '../assets/images/hero_cinematic_spread_1791021517596.jpg';

export const Hero: React.FC = () => {
  const { setActiveCategory, setIsCustomCakeOpen, setIsAiSommelierOpen } = useShop();

  const handleSweetsClick = () => {
    setActiveCategory('sweets');
    const el = document.getElementById('sweets-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCakesClick = () => {
    setActiveCategory('cakes');
    const el = document.getElementById('cakes-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EC] via-[#FFFDF9] to-[#FFFDF9] py-12 md:py-18 lg:py-24 border-b border-[#3B2118]/10">
      {/* Subtle ornamental backdrop pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#651C32_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#651C32]/10 border border-[#651C32]/20 text-[#651C32] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Freshly Made Every Day</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#3B2118] leading-[1.1] tracking-tight">
              A Little Sweetness, <br />
              <span className="text-[#651C32] italic font-normal">A Lot of Happiness.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#3B2118]/80 max-w-xl leading-relaxed font-sans font-normal">
              Discover traditional Indian sweets, freshly baked artisan cakes, crispy South Indian savouries, and bespoke royal gift boxes — crafted with pure farm ghee, single-origin nuts, and delivered fresh to your doorstep.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleSweetsClick}
                className="px-6 py-3.5 bg-[#651C32] text-[#FFF8EC] hover:bg-[#521628] rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 group whitespace-nowrap"
              >
                <span>🍬 Shop Sweets</span>
                <ArrowRight className="w-4 h-4 text-[#C99A3D] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleCakesClick}
                className="px-6 py-3.5 bg-[#FFFDF9] text-[#3B2118] border border-[#3B2118]/20 hover:border-[#651C32] hover:text-[#651C32] rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow whitespace-nowrap"
              >
                <span>🎂 Explore Cakes</span>
              </button>

              <button
                onClick={() => setIsAiSommelierOpen(true)}
                className="px-5 py-3.5 bg-[#FFF8EC] text-[#651C32] border border-[#C99A3D]/40 hover:bg-[#651C32] hover:text-[#FFF8EC] rounded-xl font-medium text-sm transition-all shadow-xs flex items-center gap-2 whitespace-nowrap group"
              >
                <Wand2 className="w-4 h-4 text-[#C99A3D] group-hover:rotate-12 transition-transform" />
                <span>AI Sommelier</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-[#3B2118]/10 flex flex-wrap items-center gap-6 text-xs text-[#3B2118]/80 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Check className="w-3 h-3" />
                </span>
                <span>Freshly Prepared Daily</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Check className="w-3 h-3" />
                </span>
                <span>100% Pure Cow Ghee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Check className="w-3 h-3" />
                </span>
                <span>Same-Day Fast Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Luxury Spread Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FFF8EC] bg-[#FFF8EC]/50 aspect-[4/3] group">
                <img
                  src={heroImg}
                  alt="Mithra artisanal sweets and luxury cake spread"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2118]/60 via-transparent to-transparent opacity-80" />
                
                {/* Embedded caption tag */}
                <div className="absolute bottom-4 left-4 right-4 text-[#FFF8EC] flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C99A3D] font-semibold">Artisan Collection</p>
                    <p className="text-sm font-serif font-bold">Kaju Katli · Mysore Pak · Belgian Truffle</p>
                  </div>
                  <button
                    onClick={() => setIsCustomCakeOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#C99A3D] text-[#3B2118] text-xs font-bold hover:bg-[#b58832] transition-colors"
                  >
                    Custom Orders
                  </button>
                </div>
              </div>

              {/* Floating Customer Proof Badge 1 */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-[#3B2118]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#651C32]/10 flex items-center justify-center text-[#651C32]">
                  <Star className="w-5 h-5 fill-[#C99A3D] text-[#C99A3D]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#3B2118] tabular-nums">4.9 / 5</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded">Top Rated</span>
                  </div>
                  <p className="text-xs text-[#3B2118]/70">2,500+ Happy Customers</p>
                </div>
              </div>

              {/* Floating Express Delivery Badge 2 */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-[#3B2118]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C99A3D]/20 flex items-center justify-center text-[#651C32]">
                  <Truck className="w-5 h-5 text-[#651C32]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#651C32]">Same Day Delivery</p>
                  <p className="text-xs text-[#3B2118]/70">In Karur, Kovai &amp; Chennai</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
