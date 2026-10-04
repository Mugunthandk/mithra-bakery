import React from 'react';
import { Sparkles, MessageSquare, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const {
    setActiveCategory,
    setIsAdminMode,
    isAdminMode,
    setIsCustomCakeOpen,
    setIsTrackOrderOpen,
    setIsAiSommelierOpen,
    setIsWishlistOpen,
  } = useShop();

  const handleNav = (cat: string) => {
    setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3B2118] text-[#FFF8EC] border-t border-[#C99A3D]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FFF8EC]/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-wider text-[#C99A3D] block leading-none">
                MITHRA
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#FFF8EC]/70 block mt-1 font-sans font-semibold">
                Sweets &amp; Bakery
              </span>
            </div>

            <p className="font-serif italic text-base text-[#FFF8EC]/90">
              "A Little Sweetness. A Lot of Happiness."
            </p>

            <p className="text-xs text-[#FFF8EC]/70 leading-relaxed max-w-sm">
              Artisanal South Indian sweetmakers and luxury patisserie kitchen. Serving authentic taste, pure cow ghee confections, and celebration memories since 1994.
            </p>

            {/* Quick Contact & WhatsApp link */}
            <div className="pt-2 space-y-2 text-xs">
              <a
                href="https://wa.me/919443218900?text=Hi%20Mithra%20Sweets%20Team,%20I%20would%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direct WhatsApp Order Desk: +91 94432 18900</span>
              </a>
            </div>
          </div>

          {/* Column 2: Shop Delicacies */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C99A3D]">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-[#FFF8EC]/70">
              <li>
                <button onClick={() => handleNav('sweets')} className="hover:text-[#FFF8EC] transition-colors">
                  Traditional Pure Ghee Sweets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cakes')} className="hover:text-[#FFF8EC] transition-colors">
                  Celebration &amp; Fusion Cakes
                </button>
              </li>
              <li>
                <button onClick={() => setIsCustomCakeOpen(true)} className="hover:text-[#FFF8EC] transition-colors flex items-center gap-1">
                  <span>Custom Cake Builder</span>
                  <Sparkles className="w-3 h-3 text-[#C99A3D]" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bakery')} className="hover:text-[#FFF8EC] transition-colors">
                  Artisan Oven Viennoiserie
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('snacks')} className="hover:text-[#FFF8EC] transition-colors">
                  Crunchy South Indian Snacks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('beverages')} className="hover:text-[#FFF8EC] transition-colors">
                  Artisan Brews &amp; Beverages
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gifts')} className="hover:text-[#FFF8EC] transition-colors">
                  Royal Gift Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C99A3D]">Patron Concierge</h4>
            <ul className="space-y-2 text-xs text-[#FFF8EC]/70">
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-[#FFF8EC] transition-colors text-left flex items-center gap-1.5 font-semibold text-[#C99A3D]"
                >
                  <span>Track Live Order</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAiSommelierOpen(true)}
                  className="hover:text-[#FFF8EC] transition-colors text-left flex items-center gap-1"
                >
                  <span>AI Sweet Sommelier</span>
                  <Sparkles className="w-3 h-3 text-[#C99A3D]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="hover:text-[#FFF8EC] transition-colors text-left"
                >
                  <span>My Saved Delicacies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('stores-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFF8EC] transition-colors"
                >
                  Locate Flagship Stores
                </button>
              </li>
              <li>
                <a href="#offers-section" className="hover:text-[#FFF8EC] transition-colors">
                  Promo Codes &amp; Deals
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919443218900?text=Hi%20Mithra%20Team,%20inquiry%20about%20wedding%20bulk%20orders"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFF8EC] transition-colors"
                >
                  Wedding Bulk Order Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Our Heritage & Admin */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C99A3D]">Flagship Ateliers</h4>
            <div className="space-y-2 text-xs text-[#FFF8EC]/70">
              <p><strong className="text-white">Karur:</strong> Kovai Road</p>
              <p><strong className="text-white">Coimbatore:</strong> R.S. Puram</p>
              <p><strong className="text-white">Chennai:</strong> T. Nagar</p>
              <p><strong className="text-white">Tiruppur:</strong> Kumaran Road</p>

              <div className="pt-3">
                <button
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FFF8EC]/20 hover:border-[#C99A3D] text-[11px] text-[#FFF8EC]/80 hover:text-white transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C99A3D]" />
                  <span>{isAdminMode ? 'Return to Storefront' : 'Merchant Admin Studio'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8EC]/60">
          <p>© {new Date().getFullYear()} Mithra Sweets &amp; Bakery. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#C99A3D] text-[#C99A3D]" />
            <span>for families worldwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
