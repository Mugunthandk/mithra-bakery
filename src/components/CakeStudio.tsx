import React, { useState } from 'react';
import { Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import cakeImg from '../assets/images/custom_artisan_cake_1791018825712.jpg';

export const CakeStudio: React.FC = () => {
  const { products, setIsCustomCakeOpen } = useShop();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const cakeProducts = products.filter(p => p.category === 'cakes');

  const cakeCategories = [
    { label: 'All Cakes', id: 'all' },
    { label: 'Classic Flavours', id: 'Classic Cakes' },
    { label: 'Royal Fusion & Premium', id: 'Premium Cakes' },
  ];

  const filteredCakes = activeFilter === 'all'
    ? cakeProducts
    : cakeProducts.filter(p => p.subcategory === activeFilter);

  return (
    <section id="cakes-section" className="py-16 bg-[#FFF8EC]/30 border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cake Studio Showcase Feature Banner */}
        <div className="bg-[#651C32] text-[#FFF8EC] rounded-3xl p-6 sm:p-10 lg:p-12 mb-14 shadow-xl relative overflow-hidden">
          {/* Subtle gold ornamental accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C99A3D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side: Editorial copy & CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8EC]/10 border border-[#C99A3D]/40 text-[#C99A3D] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
                <span>Made For Your Moments</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFF8EC] leading-tight">
                Your Dream Cake, <br />
                <span className="italic font-normal text-[#C99A3D]">Handcrafted Fresh.</span>
              </h2>

              <p className="text-[#FFF8EC]/80 text-sm sm:text-base leading-relaxed max-w-xl">
                From show-stopping 3-tier wedding centerpieces to eggless fusion Rasmalai and Belgian Truffle birthday bakes. Every cake is baked with Belgian chocolate, New Zealand dairy butter, and fresh seasonal fruits.
              </p>

              {/* Tags / Occasion Pills rendered cleanly */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#FFF8EC]/70 pt-1">
                <span>Birthday</span>
                <span>·</span>
                <span>Anniversary</span>
                <span>·</span>
                <span>Wedding</span>
                <span>·</span>
                <span>Photo Cakes</span>
                <span>·</span>
                <span>100% Eggless Option</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => setIsCustomCakeOpen(true)}
                  className="px-6 py-3.5 bg-[#C99A3D] text-[#3B2118] hover:bg-[#b8892f] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#3B2118]" />
                  <span>Customize Your Cake</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('cakes-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-transparent border border-[#FFF8EC]/30 hover:border-[#FFF8EC] text-[#FFF8EC] rounded-xl font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  View All Cakes
                </button>
              </div>
            </div>

            {/* Right side: Large high-fidelity cake image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C99A3D]/40 aspect-[4/3] group">
                <img
                  src={cakeImg}
                  alt="Artisanal celebration cake with edible petals and gold leaf"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#3B2118]/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-[#FFF8EC]">
                  <p className="font-serif font-bold text-[#C99A3D]">Royal Rasmalai &amp; Pistachio</p>
                  <p className="text-[10px] text-white/70">Custom made for Mr. &amp; Mrs. Raghavan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cake Catalog Section Header */}
        <div id="cakes-grid" className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C99A3D] font-bold">Artisan Cake Studio</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2118] mt-1">
              Select Your Celebration Flavour
            </h3>
            <p className="text-xs sm:text-sm text-[#3B2118]/70 mt-1">
              Custom weight options (500g, 1kg, 1.5kg) available on every cake with same-day express delivery.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FFF8EC] rounded-xl border border-[#3B2118]/10">
            {cakeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === cat.id
                    ? 'bg-[#651C32] text-[#FFF8EC] shadow-xs font-semibold'
                    : 'text-[#3B2118]/70 hover:text-[#3B2118]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cake Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCakes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
