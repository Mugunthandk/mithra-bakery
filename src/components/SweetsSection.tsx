import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const SweetsSection: React.FC = () => {
  const { products } = useShop();
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const subcategories = [
    { label: 'All Sweets', value: 'all' },
    { label: 'Kaju Specials', value: 'Kaju Specials' },
    { label: 'Milk Sweets', value: 'Milk Sweets' },
    { label: 'Ladoo', value: 'Ladoo' },
    { label: 'Halwa', value: 'Halwa' },
    { label: 'Bengali Sweets', value: 'Bengali Sweets' },
    { label: 'Traditional Specials', value: 'Traditional Specials' },
  ];

  const sweetsProducts = products.filter(p => p.category === 'sweets');
  const filtered = selectedSubcat === 'all'
    ? sweetsProducts
    : sweetsProducts.filter(p => p.subcategory === selectedSubcat);

  const displayed = showAll ? filtered : filtered.slice(0, 8);

  return (
    <section id="sweets-section" className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Simmered in Pure Cow Ghee</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
              Traditional Sweets
            </h2>
            <p className="text-sm text-[#3B2118]/70 mt-1 max-w-xl">
              Authentic royal recipes featuring slow stone-ground cashews, Kashmiri saffron, and rich milk rabri cooked the traditional way.
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="self-start md:self-auto text-xs font-semibold text-[#651C32] hover:text-[#C99A3D] flex items-center gap-1.5 group py-1"
          >
            <span>{showAll ? 'Show Featured Sweets' : 'View All Sweets'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subcategory Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {subcategories.map((subcat) => {
            const isActive = selectedSubcat === subcat.value;
            const count = subcat.value === 'all'
              ? sweetsProducts.length
              : sweetsProducts.filter(p => p.subcategory === subcat.value).length;

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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Footer CTA */}
        {!showAll && filtered.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-xl border border-[#651C32] text-[#651C32] hover:bg-[#651C32] hover:text-[#FFF8EC] text-xs font-bold tracking-wider uppercase transition-all shadow-xs"
            >
              View All {filtered.length} Sweets →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
