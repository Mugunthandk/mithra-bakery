import React from 'react';
import { Sparkles, Utensils } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const SnacksSection: React.FC = () => {
  const { products } = useShop();
  const snacksProducts = products.filter(p => p.category === 'snacks');

  return (
    <section id="snacks-section" className="py-16 bg-[#FFF8EC]/20 border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
              <Utensils className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Authentic Tamil Nadu Savouries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
              Crunch. Spice. Happiness. 🍿
            </h2>
            <p className="text-sm text-[#3B2118]/70 mt-1 max-w-xl">
              From crisp cold-pressed coconut oil Kerala banana chips to spicy royal mixture and fragrant butter murukku — freshly batch-fried everyday.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#3B2118]/80 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C99A3D]" />
              Cold-Pressed Oils
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C99A3D]" />
              Vacuum Sealed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C99A3D]" />
              Zero Palm Oil
            </span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snacksProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
