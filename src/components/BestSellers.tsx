import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const BestSellers: React.FC = () => {
  const { products } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products that are bestsellers
  const bestSellers = products.filter(p => p.isBestSeller);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="bestsellers-section" className="py-14 bg-[#FFF8EC]/40 border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Customer Favourites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
              Our Most Loved Treats ❤️
            </h2>
            <p className="text-sm text-[#3B2118]/70 mt-1">
              Time-honored recipes perfected over generations, flying off our counters every morning.
            </p>
          </div>

          {/* Navigation Arrow Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-[#3B2118]/20 bg-white hover:bg-[#651C32] hover:text-white transition-colors shadow-xs"
              aria-label="Previous best sellers"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-[#3B2118]/20 bg-white hover:bg-[#651C32] hover:text-white transition-colors shadow-xs"
              aria-label="Next best sellers"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
