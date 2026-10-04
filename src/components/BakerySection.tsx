import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import bakeryImg from '../assets/images/fresh_bakery_croissants_pastries_1791018835549.jpg';

export const BakerySection: React.FC = () => {
  const { products } = useShop();

  const bakeryProducts = products.filter(p => p.category === 'bakery');

  return (
    <section id="bakery-section" className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Baked Fresh Every Morning at 6 AM</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
              Fresh From Our Oven 🥐
            </h2>
            <p className="text-sm text-[#3B2118]/70 mt-1 max-w-xl">
              Artisan butter croissants, fudgy brownies, glazed brioche donuts, and hot savoury puffs prepared with 100% real dairy butter.
            </p>
          </div>

          {/* Bakery morning guarantee badge */}
          <div className="flex items-center gap-3 bg-[#FFF8EC] border border-[#C99A3D]/30 px-4 py-2 rounded-xl text-xs text-[#3B2118]">
            <span className="text-xl">🥖</span>
            <div>
              <p className="font-bold text-[#651C32]">Morning Batch Promise</p>
              <p className="text-[11px] text-[#3B2118]/70">Zero preservatives or premixes</p>
            </div>
          </div>
        </div>

        {/* Highlight Banner / Visual Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center bg-[#FFF8EC]/60 rounded-2xl p-6 border border-[#3B2118]/10">
          <div className="lg:col-span-5 aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
            <img
              src={bakeryImg}
              alt="Freshly baked artisan butter croissants and pastries"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#3B2118]">
              The Craft of 27-Layer French Lamination
            </h3>
            <p className="text-sm text-[#3B2118]/80 leading-relaxed">
              Our master bakers laminate stone-milled wheat flour with European cultured butter over a 36-hour slow fermentation cycle. The result is a gossamer honeycomb crumb that shatters delicately with each bite.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-lg border border-[#3B2118]/10 text-center">
                <span className="text-base font-bold text-[#651C32] block font-serif">100%</span>
                <span className="text-[11px] text-[#3B2118]/70">Pure Dairy Butter</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#3B2118]/10 text-center">
                <span className="text-base font-bold text-[#651C32] block font-serif">36 Hours</span>
                <span className="text-[11px] text-[#3B2118]/70">Slow Fermented</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#3B2118]/10 text-center">
                <span className="text-base font-bold text-[#651C32] block font-serif">Daily Hot</span>
                <span className="text-[11px] text-[#3B2118]/70">Puff Batches</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bakeryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
