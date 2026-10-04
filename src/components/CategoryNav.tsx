import React from 'react';
import { CATEGORIES_METADATA } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategoryNav: React.FC = () => {
  const { activeCategory, setActiveCategory, setIsCustomCakeOpen } = useShop();

  const handleCategorySelect = (id: string) => {
    if (id === 'custom_cakes') {
      setIsCustomCakeOpen(true);
      return;
    }
    setActiveCategory(id);
    const targetElement = document.getElementById(`${id}-section`) || document.getElementById('catalog-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C99A3D] font-bold">Handcrafted Delicacies</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118] mt-1">
            Explore Our World of Goodness
          </h2>
          <p className="text-sm text-[#3B2118]/70 mt-2">
            Select a department to browse authentic recipes, freshly made everyday with pure ingredients.
          </p>
        </div>

        {/* 8 Category Circular / Rounded Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {CATEGORIES_METADATA.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`group flex flex-col items-center text-center p-3.5 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-[#651C32] text-[#FFF8EC] border-[#651C32] shadow-md scale-105'
                    : 'bg-[#FFF8EC]/60 hover:bg-[#FFF8EC] text-[#3B2118] border-[#3B2118]/10 hover:border-[#C99A3D] hover:shadow-sm hover:-translate-y-1'
                }`}
              >
                {/* Circular Icon Wrapper */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2.5 transition-transform group-hover:scale-110 ${
                    isSelected ? 'bg-[#FFF8EC]/20 text-white' : 'bg-white shadow-inner'
                  }`}
                >
                  <span>{cat.icon}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-sm leading-snug">
                  {cat.name}
                </h3>

                {/* Subtitle / Count */}
                <span
                  className={`text-[11px] mt-1 tracking-tight ${
                    isSelected ? 'text-[#C99A3D]' : 'text-[#3B2118]/60'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
