import React from 'react';
import { Gift, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import giftBoxImg from '../assets/images/luxury_sweet_gift_box_1791018810797.jpg';

export const GiftBoxesSection: React.FC = () => {
  const { products, setIsBespokeBoxOpen } = useShop();

  const giftProducts = products.filter(p => p.category === 'gifts');

  const collections = [
    { title: 'Wedding Return Gifts', desc: 'Custom printed names & gold embossed keepsake caskets', min: 'Min. 15 boxes' },
    { title: 'Corporate Executive Hampers', desc: 'Luxury sugar-free delicacies & roasted Afghan nuts', min: 'Pan-India shipping' },
    { title: 'Festive Celebration Hampers', desc: 'Diwali & Pongal limited edition velvet caskets', min: 'Same-day delivery' },
    { title: 'Baby Shower & Birthdays', desc: 'Handcrafted mini sweet assortment with custom tags', min: 'Personalized cards' },
  ];

  return (
    <section id="gifts-section" className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Hero Banner */}
        <div className="bg-gradient-to-r from-[#3B2118] via-[#651C32] to-[#3B2118] text-[#FFF8EC] rounded-3xl p-6 sm:p-10 lg:p-12 mb-14 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C99A3D]/20 border border-[#C99A3D]/40 text-[#C99A3D] text-xs font-semibold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-[#C99A3D]" />
                <span>The Art of Confectionery Gifting</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Sweetness Worth Gifting. <br />
                <span className="italic font-normal text-[#C99A3D]">Treasured Forever.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#FFF8EC]/80 leading-relaxed max-w-xl">
                Elevate your special moments with our hand-bound velvet boxes, gold-leaf seals, and bespoke assortments. Designed for auspicious weddings, festive celebrations, and distinguished corporate gifting.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsBespokeBoxOpen(true)}
                  className="px-6 py-3.5 bg-[#C99A3D] text-[#3B2118] hover:bg-[#b58832] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#3B2118]" />
                  <span>Build Your Own Gift Box →</span>
                </button>

                <div className="text-xs text-[#FFF8EC]/70 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C99A3D]" />
                  <span>Custom Monograms &amp; Wax Seals Available</span>
                </div>
              </div>
            </div>

            {/* Right side image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C99A3D]/40 aspect-[4/3] group">
                <img
                  src={giftBoxImg}
                  alt="Luxury velvet sweet gift box with gold foil"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs text-[#FFF8EC]">
                  <p className="font-serif font-bold text-base text-[#C99A3D]">Mithra Royal Atelier Casket</p>
                  <p className="text-[11px] text-white/70">Hand-assembled with 9 curated heritage sweets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Collection Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {collections.map((col, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FFF8EC]/60 border border-[#3B2118]/10 hover:border-[#C99A3D] transition-colors"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#651C32] mb-1">
                {col.min}
              </div>
              <h4 className="font-serif font-bold text-base text-[#3B2118]">
                {col.title}
              </h4>
              <p className="text-xs text-[#3B2118]/70 mt-1 leading-relaxed">
                {col.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Catalog of Gift Boxes */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2118]">
              Signature Hampers &amp; Keepsake Boxes
            </h3>
            <p className="text-xs sm:text-sm text-[#3B2118]/70 mt-1">
              Select ready-to-dispatch luxury hampers delivered in insulated gift packaging.
            </p>
          </div>
          <button
            onClick={() => setIsBespokeBoxOpen(true)}
            className="text-xs font-bold text-[#651C32] hover:text-[#C99A3D] flex items-center gap-1.5"
          >
            <span>Bespoke Box Configurator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {giftProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
