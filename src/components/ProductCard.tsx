import React, { useState } from 'react';
import { Star, Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();
  
  // Local variant state (default to first variant or 500g if available)
  const defaultVariant = product.variants.find(v => v.label.includes('500g')) || product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant || product.variants[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant?.label, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-xl border border-[#3B2118]/10 overflow-hidden hover:border-[#C99A3D]/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
    >
      {/* Visual Image Container (1:1 Master Style Composition) */}
      <div className="relative aspect-square bg-[#FFF8EC]/60 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF8EC] to-[#F7D8C8] text-4xl">
            🍬
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors ${
            isFavorited
              ? 'bg-[#651C32] text-[#FFF8EC]'
              : 'bg-white/80 text-[#3B2118]/70 hover:text-[#651C32] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet status marker (No bulky badge sandwich, just subtle text) */}
        {product.isPureGhee && (
          <div className="absolute bottom-2 left-2 bg-[#3B2118]/80 text-[#FFF8EC] text-[10px] font-medium px-2 py-0.5 rounded backdrop-blur-sm">
            Pure Cow Ghee
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Category · Rating) */}
          <div className="flex items-center justify-between text-xs text-[#3B2118]/60 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-[#C99A3D]">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 font-semibold text-[#3B2118]">
              <Star className="w-3.5 h-3.5 fill-[#C99A3D] text-[#C99A3D]" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-[#3B2118]/40">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-bold text-[#3B2118] group-hover:text-[#651C32] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#3B2118]/70 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Variants & Actions Section */}
        <div className="mt-4 pt-3 border-t border-[#3B2118]/10 space-y-3">
          
          {/* Variant Selector Tabs */}
          {product.variants.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 p-0.5 bg-[#FFF8EC] rounded-lg border border-[#3B2118]/5"
            >
              {product.variants.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setSelectedVariant(v)}
                  className={`flex-1 py-1 text-[11px] font-medium rounded transition-all whitespace-nowrap ${
                    selectedVariant.label === v.label
                      ? 'bg-white text-[#651C32] font-bold shadow-xs'
                      : 'text-[#3B2118]/70 hover:text-[#3B2118]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          {/* Price & Quick Add */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold text-[#651C32] tabular-nums">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-xs text-[#3B2118]/40 line-through tabular-nums">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#3B2118]/50 block">
                taxes included
              </span>
            </div>

            <button
              onClick={handleQuickAdd}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#651C32] hover:bg-[#521628] text-[#FFF8EC] shadow-sm'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
