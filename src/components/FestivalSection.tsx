import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { FESTIVAL_COLLECTIONS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FestivalSection: React.FC = () => {
  const { setActiveCategory } = useShop();

  return (
    <section id="festivals-section" className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#651C32] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
            <span>Auspicious Celebrations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118]">
            Celebrate Every Occasion With Something Sweet 🌸
          </h2>
          <p className="text-sm text-[#3B2118]/70 mt-2">
            Specially curated traditional assortments for Diwali, Pongal, weddings, and family milestones.
          </p>
        </div>

        {/* 4 Thematic Festival Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FESTIVAL_COLLECTIONS.map((fest) => (
            <div
              key={fest.id}
              className="bg-white rounded-2xl border border-[#3B2118]/10 p-5 flex flex-col justify-between hover:shadow-md hover:border-[#C99A3D] transition-all group"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C99A3D] block mb-1">
                  {fest.badge}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#3B2118] group-hover:text-[#651C32] transition-colors">
                  {fest.title}
                </h3>

                <p className="text-xs text-[#3B2118]/70 mt-2 leading-relaxed">
                  {fest.tagline}
                </p>

                {/* Items included */}
                <div className="mt-4 pt-3 border-t border-[#3B2118]/10 space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-[#3B2118]/50 block">Curated Assortment:</span>
                  {fest.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[#3B2118]/80 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C99A3D]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3B2118]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#3B2118]/50 block">Pricing</span>
                  <span className="font-serif font-bold text-sm text-[#651C32]">{fest.boxPrice}</span>
                </div>

                <button
                  onClick={() => {
                    setActiveCategory('gifts');
                    const el = document.getElementById('gifts-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FFF8EC] hover:bg-[#651C32] hover:text-[#FFF8EC] text-[#651C32] text-xs font-bold transition-all border border-[#3B2118]/10"
                >
                  Explore Box
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
