import React, { useState } from 'react';
import { X, Star, Heart, Check, ShoppingBag, ShieldCheck, Flame, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVariant } from '../types';

interface ProductDetailModalDialogProps {
  product: import('../types').Product;
  onClose: () => void;
}

const ProductDetailModalDialog: React.FC<ProductDetailModalDialogProps> = ({ product, onClose }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
  } = useShop();

  const defaultVariant = product.variants[0];
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(defaultVariant);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'storage'>('details');
  const [activeImage, setActiveImage] = useState<string>(product.image);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, activeVariant.label, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, activeVariant.label, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  // Gallery images list (fallback to main image)
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Modal Close Button */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#3B2118] backdrop-blur-md shadow-md transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Inner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Product Image Gallery */}
          <div className="md:col-span-6 bg-[#FFF8EC]/60 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#3B2118]/10 space-y-4">
            <div>
              {/* Primary 1:1 High-Resolution Showcase Frame */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-[#3B2118]/10 bg-white group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {product.isPureGhee && (
                  <div className="absolute top-3 left-3 bg-[#651C32] text-[#FFF8EC] text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                    100% Pure Cow Ghee
                  </div>
                )}
              </div>

              {/* Alternate Views: Texture, Serving & Packaging Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2.5 mt-3 overflow-x-auto no-scrollbar py-1">
                  {galleryImages.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgSrc)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === imgSrc
                          ? 'border-[#651C32] ring-2 ring-[#651C32]/20 scale-105'
                          : 'border-[#3B2118]/15 opacity-70 hover:opacity-100 hover:border-[#C99A3D]'
                      }`}
                    >
                      <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees Under Image */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-[11px] text-[#3B2118]/80 font-medium">
              <div className="p-2.5 rounded-xl bg-white border border-[#3B2118]/10">
                <span className="block text-base mb-0.5">🌿</span>
                <span>Fresh Batch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#3B2118]/10">
                <span className="block text-base mb-0.5">📦</span>
                <span>Aroma Sealed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#3B2118]/10">
                <span className="block text-base mb-0.5">⚡</span>
                <span>Same Day Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Wishlist */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold text-[#C99A3D]">
                  {product.subcategory}
                </span>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-full border transition-colors ${
                    isFavorited
                      ? 'bg-[#651C32] text-[#FFF8EC] border-[#651C32]'
                      : 'border-[#3B2118]/20 text-[#3B2118]/70 hover:text-[#651C32]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title & Tagline */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2118] mt-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#3B2118]/70 mt-1 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex text-[#C99A3D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#3B2118]">{product.rating}</span>
                <span className="text-[#3B2118]/50">({product.reviewCount} Reviews)</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  Verified Fresh
                </span>
              </div>

              {/* Price Banner */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#FFF8EC] border border-[#C99A3D]/30 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#3B2118]/60 block font-sans">Price for {activeVariant.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#651C32] tabular-nums">
                      ₹{activeVariant.price}
                    </span>
                    {activeVariant.originalPrice && (
                      <span className="text-sm text-[#3B2118]/40 line-through tabular-nums">
                        ₹{activeVariant.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-[#3B2118]/60 font-medium">Inclusive of all taxes</span>
              </div>

              {/* Variant Selector */}
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2118] mb-2">
                  Select Pack / Weight
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.label}
                      onClick={() => setActiveVariant(v)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        activeVariant.label === v.label
                          ? 'bg-[#651C32] text-[#FFF8EC] border-[#651C32] shadow-xs'
                          : 'bg-white text-[#3B2118] border-[#3B2118]/20 hover:border-[#C99A3D]'
                      }`}
                    >
                      <span className="block">{v.label}</span>
                      <span className="text-[10px] opacity-80">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#3B2118]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#3B2118]/20 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#3B2118] hover:bg-[#FFF8EC] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#3B2118] hover:bg-[#FFF8EC] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons (Add to Bag & Buy Now) */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl border border-[#651C32] text-[#651C32] hover:bg-[#651C32]/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-[#651C32] hover:bg-[#521628] text-[#FFF8EC] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Information Tabs (Ingredients, Nutrition, Storage) */}
              <div className="mt-6 pt-4 border-t border-[#3B2118]/10">
                <div className="flex border-b border-[#3B2118]/10 text-xs mb-3">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 font-semibold ${
                      activeTab === 'details' ? 'border-b-2 border-[#651C32] text-[#651C32]' : 'text-[#3B2118]/60'
                    }`}
                  >
                    Ingredients &amp; Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`pb-2 mr-4 font-semibold ${
                      activeTab === 'nutrition' ? 'border-b-2 border-[#651C32] text-[#651C32]' : 'text-[#3B2118]/60'
                    }`}
                  >
                    Nutrition Facts
                  </button>
                  <button
                    onClick={() => setActiveTab('storage')}
                    className={`pb-2 font-semibold ${
                      activeTab === 'storage' ? 'border-b-2 border-[#651C32] text-[#651C32]' : 'text-[#3B2118]/60'
                    }`}
                  >
                    Shelf Life &amp; Storage
                  </button>
                </div>

                <div className="text-xs text-[#3B2118]/80 leading-relaxed min-h-[60px]">
                  {activeTab === 'details' && (
                    <div>
                      <p className="mb-2">{product.description}</p>
                      <p className="font-semibold text-[#3B2118]">
                        Ingredients:{' '}
                        <span className="font-normal text-[#3B2118]/70">
                          {product.ingredients.join(', ')}
                        </span>
                      </p>
                    </div>
                  )}

                  {activeTab === 'nutrition' && (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 bg-[#FFF8EC] rounded-lg">
                        <span className="text-[10px] text-[#3B2118]/60 block">Energy</span>
                        <span className="font-bold text-[#651C32]">{product.nutrition.calories}</span>
                      </div>
                      <div className="p-2 bg-[#FFF8EC] rounded-lg">
                        <span className="text-[10px] text-[#3B2118]/60 block">Protein</span>
                        <span className="font-bold text-[#651C32]">{product.nutrition.protein}</span>
                      </div>
                      <div className="p-2 bg-[#FFF8EC] rounded-lg">
                        <span className="text-[10px] text-[#3B2118]/60 block">Fats</span>
                        <span className="font-bold text-[#651C32]">{product.nutrition.fat}</span>
                      </div>
                      <div className="p-2 bg-[#FFF8EC] rounded-lg">
                        <span className="text-[10px] text-[#3B2118]/60 block">Carbs</span>
                        <span className="font-bold text-[#651C32]">{product.nutrition.carbs}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'storage' && (
                    <div className="space-y-1">
                      <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
                      <p><strong>Storage Guidelines:</strong> {product.storage}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useShop();

  if (!selectedProduct) return null;

  return (
    <ProductDetailModalDialog
      key={selectedProduct.id}
      product={selectedProduct}
      onClose={() => setSelectedProduct(null)}
    />
  );
};
