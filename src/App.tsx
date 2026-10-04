import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { BestSellers } from './components/BestSellers';
import { SweetsSection } from './components/SweetsSection';
import { CakeStudio } from './components/CakeStudio';
import { BakerySection } from './components/BakerySection';
import { SnacksSection } from './components/SnacksSection';
import { BeveragesSection } from './components/BeveragesSection';
import { GiftBoxesSection } from './components/GiftBoxesSection';
import { FestivalSection } from './components/FestivalSection';
import { OffersSection } from './components/OffersSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { StoreLocator } from './components/StoreLocator';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomCakeBuilderModal } from './components/CustomCakeBuilderModal';
import { BespokeBoxBuilderModal } from './components/BespokeBoxBuilderModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AiSommelierModal } from './components/AiSommelierModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ArrowLeft } from 'lucide-react';

const DepartmentNavSwitcher: React.FC = () => {
  const { activeCategory, setActiveCategory } = useShop();

  const categories = [
    { id: 'all', label: '← All Delicacies' },
    { id: 'sweets', label: 'Traditional Sweets' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'bakery', label: 'Artisan Bakery' },
    { id: 'snacks', label: 'Savouries' },
    { id: 'beverages', label: 'Brews & Beverages' },
    { id: 'gifts', label: 'Gift Boxes' },
    { id: 'festivals', label: 'Festivals' },
  ];

  return (
    <div className="bg-[#FFF8EC] border-b border-[#3B2118]/10 py-3 px-4 sticky top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((c) => {
          const isSelected = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#651C32] text-[#FFF8EC] shadow-xs'
                  : 'bg-white text-[#3B2118]/70 hover:text-[#3B2118] border border-[#3B2118]/10 hover:border-[#C99A3D]'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { isAdminMode, activeCategory } = useShop();

  if (isAdminMode) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-1">
        {/* If user filtered to a specific department from nav, show dedicated focus or full flow */}
        {activeCategory === 'all' && (
          <>
            <Hero />
            <CategoryNav />
            <BestSellers />
            <SweetsSection />
            <CakeStudio />
            <BakerySection />
            <SnacksSection />
            <BeveragesSection />
            <GiftBoxesSection />
            <FestivalSection />
            <OffersSection />
            <WhyChooseUs />
            <ReviewsSection />
            <StoreLocator />
            <Newsletter />
          </>
        )}

        {activeCategory !== 'all' && <DepartmentNavSwitcher />}

        {activeCategory === 'sweets' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Traditional Pure Ghee Sweets</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Cashew katlis, Mysore pak, saffron halwa, and royal Bengali sweets simmered in authentic village ghee.
              </p>
            </div>
            <SweetsSection />
            <BestSellers />
            <OffersSection />
          </>
        )}

        {activeCategory === 'cakes' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Celebration Cake Studio</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Belgian chocolate truffles, saffron rasmalai bakes, and custom tiered celebration cakes.
              </p>
            </div>
            <CakeStudio />
            <OffersSection />
          </>
        )}

        {activeCategory === 'bakery' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Fresh Artisan Bakery</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Laminated butter croissants, brownies, glazed donuts, and hot spiced bakery puffs.
              </p>
            </div>
            <BakerySection />
            <OffersSection />
          </>
        )}

        {activeCategory === 'snacks' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Crispy South Indian Savouries</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Madras mixture, mullu butter murukku, and pure coconut oil Kerala banana chips.
              </p>
            </div>
            <SnacksSection />
            <OffersSection />
          </>
        )}

        {activeCategory === 'beverages' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Artisan Brews &amp; Beverages</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Kesar badam milk, Damascus rose milk, and Chikmagalur degree filter coffee.
              </p>
            </div>
            <BeveragesSection />
            <OffersSection />
          </>
        )}

        {activeCategory === 'gifts' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Luxury Gift Collections</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Handcrafted royal velvet boxes, wedding return gifts, and bespoke confections caskets.
              </p>
            </div>
            <GiftBoxesSection />
            <FestivalSection />
          </>
        )}

        {activeCategory === 'festivals' && (
          <>
            <div className="bg-[#651C32] text-[#FFF8EC] py-10 px-4 text-center">
              <h1 className="font-serif text-4xl font-bold">Festive &amp; Auspicious Collections</h1>
              <p className="text-xs text-[#FFF8EC]/70 mt-2 max-w-lg mx-auto">
                Diwali, Pongal, Tamil New Year, and grand celebration sweet hampers curated with tradition.
              </p>
            </div>
            <FestivalSection />
            <GiftBoxesSection />
          </>
        )}
      </main>

      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <CustomCakeBuilderModal />
      <BespokeBoxBuilderModal />
      <OrderConfirmationModal />
      <SearchModal />
      <TrackOrderModal />
      <AiSommelierModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
