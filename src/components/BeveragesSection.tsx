import React, { useState } from 'react';
import { Coffee, Sparkles, Flame, Snowflake, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const BeveragesSection: React.FC = () => {
  const { products } = useShop();
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');

  const beverageProducts = products.filter((p) => p.category === 'beverages');

  const subcategories = [
    { label: 'All Brews & Drinks', value: 'all' },
    { label: 'Traditional Cold Beverages', value: 'Traditional Cold Beverages' },
    { label: 'Signature Traditional Brews', value: 'Signature Traditional Brews' },
  ];

  const filtered = selectedSubcat === 'all'
    ? beverageProducts
    : beverageProducts.filter((p) => p.subcategory === selectedSubcat);

  return (
    <section id="beverages-section" className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
              <Coffee className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Slow-Brewed Delights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
              Artisan Brews &amp; Beverages ☕
            </h2>
            <p className="text-sm text-[#3B2118]/70 mt-1 max-w-xl">
              From stone-ground Chikmagalur degree filter coffee and saffron badam milk simmered over gentle flame, to tall layered royal faloodas.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#3B2118]/80 font-medium">
            <span className="flex items-center gap-1.5 bg-[#FFF8EC] border border-[#C99A3D]/30 px-3 py-1.5 rounded-lg">
              <Flame className="w-3.5 h-3.5 text-[#651C32]" />
              <span>Fresh Cow Milk Only</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#FFF8EC] border border-[#C99A3D]/30 px-3 py-1.5 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Kashmiri Saffron</span>
            </span>
          </div>
        </div>

        {/* Feature Banner: The Degree Filter Coffee & Saffron Milk Ritual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-[#FFF8EC]/60 border border-[#3B2118]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#651C32] text-[#FFF8EC] flex items-center justify-center mb-3">
                <Coffee className="w-5 h-5 text-[#C99A3D]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B2118]">
                Authentic Chikmagalur Degree Filter Coffee
              </h3>
              <p className="text-xs text-[#3B2118]/70 mt-1.5 leading-relaxed">
                Handpicked dark roast Peaberry and Plantation-A beans slow-decocted in brass drip chambers and frothed with foaming country milk.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3B2118]/10 flex items-center justify-between text-xs text-[#651C32] font-semibold">
              <span>80:20 Roasted Chicory Blend</span>
              <span>Served Fresh Daily</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF8EC]/60 border border-[#3B2118]/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#651C32] text-[#FFF8EC] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-[#C99A3D]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B2118]">
                Shahi Kesar Badam Milk &amp; Rose Elixirs
              </h3>
              <p className="text-xs text-[#3B2118]/70 mt-1.5 leading-relaxed">
                Slow-reduced whole cow milk infused with crushed Mamra almonds, cardamom pods, and crimson Kashmiri saffron strands.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3B2118]/10 flex items-center justify-between text-xs text-[#651C32] font-semibold">
              <span>Available Chilled &amp; Piping Warm</span>
              <span>100% Natural Flavours</span>
            </div>
          </div>
        </div>

        {/* Subcategory Filter Tabs */}
        {subcategories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {subcategories.map((subcat) => {
              const isActive = selectedSubcat === subcat.value;
              const count = subcat.value === 'all'
                ? beverageProducts.length
                : beverageProducts.filter((p) => p.subcategory === subcat.value).length;

              return (
                <button
                  key={subcat.value}
                  onClick={() => setSelectedSubcat(subcat.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#651C32] text-[#FFF8EC] shadow-sm font-semibold'
                      : 'bg-[#FFF8EC] text-[#3B2118]/80 hover:bg-[#FFF8EC]/80 border border-[#3B2118]/5'
                  }`}
                >
                  <span>{subcat.label}</span>
                  <span className={`ml-1.5 text-[11px] ${isActive ? 'text-[#C99A3D]' : 'text-[#3B2118]/50'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
