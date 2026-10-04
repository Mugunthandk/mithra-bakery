import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useShop();

  if (!isWishlistOpen) return null;

  // Resolve product objects from wishlist IDs
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FFFDF9] h-full flex flex-col shadow-2xl border-l border-[#3B2118]/15 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-[#651C32] text-[#FFF8EC] flex items-center justify-between border-b border-[#C99A3D]/30">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C99A3D] fill-[#C99A3D]" />
            <h3 className="font-serif text-xl font-bold">Your Saved Delicacies</h3>
            <span className="text-xs bg-[#C99A3D] text-[#3B2118] font-bold px-2 py-0.5 rounded-full ml-1">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10"
            aria-label="Close Wishlist"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#3B2118]/60">
              <div className="w-16 h-16 rounded-full bg-[#FFF8EC] flex items-center justify-center text-3xl">
                🤍
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-[#3B2118]">Your Wishlist is Empty</p>
                <p className="text-xs text-[#3B2118]/70 mt-1 max-w-xs">
                  Save your favorite pure ghee sweets, artisan celebration cakes, and snacks to order anytime.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#651C32] text-[#FFF8EC] text-xs font-bold uppercase tracking-wider hover:bg-[#521628] transition-colors"
              >
                Browse Delicacies
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => {
              const defaultVariant = product.variants[0];
              return (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#3B2118]/10 flex gap-3.5 shadow-xs relative group hover:border-[#C99A3D] transition-all"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-20 rounded-xl bg-[#FFF8EC] shrink-0 overflow-hidden border border-[#3B2118]/5 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="pr-6">
                      <span className="text-[10px] uppercase font-bold text-[#C99A3D] tracking-wider block">
                        {product.subcategory}
                      </span>
                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif font-bold text-sm text-[#3B2118] line-clamp-1 hover:text-[#651C32] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-serif font-bold text-sm text-[#651C32]">
                          ₹{defaultVariant?.price || product.price}
                        </span>
                        <span className="text-[11px] text-[#3B2118]/50">
                          ({defaultVariant?.label || 'Standard'})
                        </span>
                      </div>
                    </div>

                    {/* Move to Bag Action */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product, defaultVariant?.label, 1);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#651C32] hover:bg-[#521628] text-[#FFF8EC] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C99A3D]" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>

                  {/* Delete from wishlist button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 text-[#3B2118]/40 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 bg-[#FFF8EC] border-t border-[#3B2118]/15 flex items-center justify-between">
            <span className="text-xs text-[#3B2118]/70">
              {wishlistedProducts.length} items saved
            </span>
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, p.variants[0]?.label, 1));
              }}
              className="px-4 py-2 bg-[#C99A3D] hover:bg-[#b8892f] text-[#3B2118] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Add All to Bag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
