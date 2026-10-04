import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, ShieldCheck, Menu, X, Sparkles, Wand2, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsTrackOrderOpen,
    setIsAiSommelierOpen,
    wishlist,
    setActiveCategory,
    activeCategory,
    isAdminMode,
    setIsAdminMode,
    setIsCustomCakeOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'all' },
    { label: 'Sweets', id: 'sweets' },
    { label: 'Cakes', id: 'cakes' },
    { label: 'Bakery', id: 'bakery' },
    { label: 'Snacks', id: 'snacks' },
    { label: 'Beverages', id: 'beverages' },
    { label: 'Gift Boxes', id: 'gifts' },
    { label: 'Offers', id: 'offers' },
  ];

  const handleNavClick = (id: string) => {
    if (isAdminMode) setIsAdminMode(false);
    if (id === 'offers') {
      const el = document.getElementById('offers-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveCategory(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Strip */}
      <div className="bg-[#651C32] text-[#FFF8EC] px-4 py-1.5 text-xs font-medium text-center border-b border-[#C99A3D]/30 flex items-center justify-center gap-3">
        <span className="hidden sm:inline">✦ Freshly Handcrafted Every Morning</span>
        <span className="hidden sm:inline text-[#C99A3D]">·</span>
        <span>Free Express Delivery on Orders Above ₹999</span>
        <span className="hidden sm:inline text-[#C99A3D]">·</span>
        <span className="bg-[#C99A3D] text-[#3B2118] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">Code: WELCOME20</span>
      </div>

      {/* Main Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#3B2118]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#651C32] block leading-none group-hover:text-[#C99A3D] transition-colors">
                MITHRA
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#3B2118]/70 block font-sans font-medium mt-1">
                Sweets &amp; Bakery
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#3B2118]/80">
            {navLinks.map((link) => {
              const isActive = !isAdminMode && activeCategory === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#651C32] ${
                    isActive ? 'text-[#651C32] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C99A3D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary interactive controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* AI Sommelier Button */}
            <button
              onClick={() => setIsAiSommelierOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#651C32]/10 hover:bg-[#651C32] text-[#651C32] hover:text-[#FFF8EC] text-xs font-semibold tracking-wide transition-all border border-[#651C32]/20"
              title="AI Sweet Sommelier & Pairing Assistant"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>AI Sommelier</span>
            </button>

            {/* Custom Cake Button */}
            <button
              onClick={() => setIsCustomCakeOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C99A3D] text-[#651C32] hover:bg-[#651C32] hover:text-[#FFF8EC] text-xs font-semibold tracking-wide transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
              <span>Custom Cake</span>
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[#3B2118]/80 hover:text-[#651C32] hover:bg-black/5 text-xs font-medium transition-colors"
              title="Track Order"
            >
              <Truck className="w-4 h-4 text-[#C99A3D]" />
              <span>Track</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#3B2118]/80 hover:text-[#651C32] transition-colors"
              aria-label="Search delicacies"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#3B2118]/80 hover:text-[#651C32] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#651C32] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-[#651C32] text-[#FFF8EC] rounded-lg hover:bg-[#521628] transition-all shadow-sm focus:outline-none"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C99A3D]" />
              <span className="text-xs font-semibold tabular-nums hidden sm:inline">
                Bag
              </span>
              {cartItemCount > 0 && (
                <span className="bg-[#C99A3D] text-[#3B2118] text-xs font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Switcher Toggle */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isAdminMode
                  ? 'bg-[#3B2118] text-[#FFF8EC] border-[#3B2118]'
                  : 'bg-white text-[#3B2118]/70 border-[#3B2118]/20 hover:border-[#651C32] hover:text-[#651C32]'
              }`}
              title="Toggle Merchant Admin Studio"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden xl:inline">{isAdminMode ? 'Storefront' : 'Admin'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3B2118] lg:hidden focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFDF9] border-b border-[#3B2118]/15 px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#3B2118]/10">
              <button
                onClick={() => {
                  setIsAiSommelierOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-[#651C32]/10 text-[#651C32] border border-[#651C32]/20 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#C99A3D]" />
                AI Sommelier
              </button>
              <button
                onClick={() => {
                  setIsTrackOrderOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-white text-[#3B2118] border border-[#3B2118]/20 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-[#C99A3D]" />
                Track Order
              </button>
              <button
                onClick={() => {
                  setIsCustomCakeOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-[#651C32]/5 text-[#651C32] border border-[#651C32]/20 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
                Custom Cake
              </button>
              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-[#3B2118]/5 text-[#3B2118] border border-[#3B2118]/20 rounded text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAdminMode ? 'Storefront' : 'Admin'}
              </button>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left py-2 text-base font-serif text-[#3B2118] hover:text-[#651C32] border-b border-[#3B2118]/5"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
