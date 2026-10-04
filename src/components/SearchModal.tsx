import React, { useState } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  if (!isSearchOpen) return null;

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'sweets', label: 'Sweets' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'gifts', label: 'Gifts' },
    { id: 'beverages', label: 'Beverages' },
  ];

  const results = products.filter((p) => {
    const matchesCat = filterCat === 'all' || p.category === filterCat;
    const matchesSearch = searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden animate-in fade-in-50 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#3B2118]/10 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#651C32]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sweets, cakes, brownies, mixture, hampers..."
            className="flex-1 text-base text-[#3B2118] placeholder:text-[#3B2118]/40 focus:outline-none bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#3B2118]/40 hover:text-[#3B2118]"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-[#3B2118]/60 hover:text-[#3B2118]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-6 py-3 bg-[#FFF8EC] border-b border-[#3B2118]/10 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilterCat(c.id)}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all ${
                filterCat === c.id
                  ? 'bg-[#651C32] text-white font-semibold shadow-xs'
                  : 'text-[#3B2118]/70 hover:text-[#3B2118] bg-white/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#3B2118]/60">
              No matching delicacies found for "{searchTerm}".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsSearchOpen(false);
                }}
                className="p-3 rounded-2xl bg-white border border-[#3B2118]/10 hover:border-[#C99A3D] hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF8EC] overflow-hidden shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C99A3D]">
                      {product.subcategory}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#3B2118] group-hover:text-[#651C32]">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#3B2118]/60 line-clamp-1">{product.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-serif font-bold text-sm text-[#651C32] block">
                      ₹{product.price}
                    </span>
                    <span className="text-[10px] text-[#3B2118]/50">
                      from {product.variants[0]?.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3B2118]/30 group-hover:text-[#651C32] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
