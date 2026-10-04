import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, MainCategory } from '../types';
import { INITIAL_PRODUCTS, COUPONS } from '../data/products';
import customCakeImg from '../assets/images/custom_artisan_cake_1791018825712.jpg';
import giftBoxImg from '../assets/images/luxury_sweet_gift_box_1791018810797.jpg';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  activeCategory: string;
  activeSubcategory: string | null;
  searchQuery: string;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isCustomCakeOpen: boolean;
  isBespokeBoxOpen: boolean;
  isSearchOpen: boolean;
  isTrackOrderOpen: boolean;
  isAiSommelierOpen: boolean;
  selectedProduct: Product | null;
  currentOrderConfirmation: Order | null;
  appliedCoupon: { code: string; discount: number; type: 'percentage' | 'fixed'; label: string } | null;
  isAdminMode: boolean;
  
  // Setters & Actions
  setActiveCategory: (cat: string) => void;
  setActiveSubcategory: (subcat: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsCustomCakeOpen: (open: boolean) => void;
  setIsBespokeBoxOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsTrackOrderOpen: (open: boolean) => void;
  setIsAiSommelierOpen: (open: boolean) => void;
  setSelectedProduct: (prod: Product | null) => void;
  setCurrentOrderConfirmation: (order: Order | null) => void;
  setIsAdminMode: (admin: boolean) => void;
  
  // Cart Actions
  addToCart: (product: Product, variantLabel?: string, quantity?: number, notes?: string) => void;
  addCustomCakeToCart: (cakeData: {
    flavour: string;
    size: string;
    shape: string;
    message: string;
    eggless: boolean;
    deliveryDate: string;
    price: number;
  }) => void;
  addCustomBoxToCart: (boxData: {
    boxName: string;
    selectedSweets: string[];
    ribbonColor: string;
    giftNote: string;
    price: number;
  }) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Coupon
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Checkout & Orders
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  cartTotal: number;
  cartItemCount: number;
  placeOrder: (orderPayload: {
    customerName: string;
    phone: string;
    email: string;
    deliveryType: 'delivery' | 'pickup';
    pickupStore?: string;
    address?: {
      street: string;
      city: string;
      pincode: string;
      landmark?: string;
    };
    deliveryDate: string;
    deliverySlot: string;
    paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'cod' | 'whatsapp';
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  
  // Admin Operations
  adminAddProduct: (prod: Product) => void;
  adminUpdateProduct: (prod: Product) => void;
  adminDeleteProduct: (prodId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'MSB-94021',
    createdAt: '2026-10-02T18:40:00Z',
    customerName: 'Senthil Nathan',
    phone: '+91 98401 23456',
    email: 'senthil.n@example.com',
    deliveryType: 'delivery',
    address: { street: '14, Anna Nagar 2nd Street', city: 'Coimbatore', pincode: '641011' },
    deliveryDate: '2026-10-03',
    deliverySlot: 'Morning (9:00 AM - 12:00 PM)',
    items: [
      {
        id: 'sample-1',
        productId: 'kaju-katli',
        name: 'Kaju Katli',
        category: 'sweets',
        image: '',
        variantLabel: '500g',
        unitPrice: 450,
        quantity: 2
      },
      {
        id: 'sample-2',
        productId: 'special-mixture',
        name: 'Mithra Royal Madras Mixture',
        category: 'snacks',
        image: '',
        variantLabel: '500g',
        unitPrice: 180,
        quantity: 1
      }
    ],
    subtotal: 1080,
    discount: 150,
    deliveryFee: 0,
    total: 930,
    couponApplied: 'BUY2GET1',
    paymentMethod: 'razorpay_upi',
    paymentStatus: 'paid',
    orderStatus: 'packing'
  },
  {
    id: 'MSB-94018',
    createdAt: '2026-10-02T15:20:00Z',
    customerName: 'Meenakshi Sundaram',
    phone: '+91 94432 99881',
    email: 'meena.s@example.com',
    deliveryType: 'pickup',
    pickupStore: 'Mithra Heritage Flagship & Kitchen (Karur)',
    deliveryDate: '2026-10-03',
    deliverySlot: 'Afternoon (2:00 PM - 5:00 PM)',
    items: [
      {
        id: 'sample-3',
        productId: 'rasmalai-cake',
        name: 'Signature Royal Rasmalai Cake',
        category: 'cakes',
        image: '',
        variantLabel: '1kg',
        unitPrice: 1400,
        quantity: 1
      }
    ],
    subtotal: 1400,
    discount: 280,
    deliveryFee: 0,
    total: 1120,
    couponApplied: 'WELCOME20',
    paymentMethod: 'razorpay_card',
    paymentStatus: 'paid',
    orderStatus: 'baking'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Clear out any old cached product lists from localStorage across all past versions
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('mithra_product')) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (e) {
      // ignore
    }

    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mithra_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('mithra_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mithra_orders');
    return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCustomCakeOpen, setIsCustomCakeOpen] = useState<boolean>(false);
  const [isBespokeBoxOpen, setIsBespokeBoxOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false);
  const [isAiSommelierOpen, setIsAiSommelierOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentOrderConfirmation, setCurrentOrderConfirmation] = useState<Order | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: 'percentage' | 'fixed'; label: string } | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);


  useEffect(() => {
    localStorage.setItem('mithra_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mithra_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mithra_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discount) / 100);
    } else {
      cartDiscount = appliedCoupon.discount;
    }
  }

  // Delivery fee: ₹50 if under ₹999, free above ₹999 or with FREEDEL
  const deliveryFee = (cartSubtotal >= 999 || appliedCoupon?.code === 'FREEDEL' || cartSubtotal === 0) ? 0 : 50;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);

  const addToCart = (product: Product, variantLabel?: string, quantity = 1, notes?: string) => {
    const selectedVariant = variantLabel 
      ? product.variants.find(v => v.label === variantLabel) || product.variants[0]
      : product.variants[0];
    
    const unitPrice = selectedVariant ? selectedVariant.price : product.price;
    const variantTag = selectedVariant ? selectedVariant.label : 'Standard';
    const cartItemId = `${product.id}-${variantTag}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          variantLabel: variantTag,
          unitPrice,
          quantity,
          customNotes: notes,
        }
      ];
    });

    setIsCartOpen(true);
  };

  const addCustomCakeToCart = (cakeData: {
    flavour: string;
    size: string;
    shape: string;
    message: string;
    eggless: boolean;
    deliveryDate: string;
    price: number;
  }) => {
    const cartItemId = `custom-cake-${Date.now()}`;
    const newItem: CartItem = {
      id: cartItemId,
      productId: 'custom-cake-bespoke',
      name: `Bespoke Artisanal Cake (${cakeData.flavour})`,
      category: 'cakes',
      image: customCakeImg,
      variantLabel: cakeData.size,
      unitPrice: cakeData.price,
      quantity: 1,
      customCakeDetails: {
        flavour: cakeData.flavour,
        size: cakeData.size,
        shape: cakeData.shape,
        message: cakeData.message,
        eggless: cakeData.eggless,
        deliveryDate: cakeData.deliveryDate,
      }
    };
    setCart(prev => [...prev, newItem]);
    setIsCustomCakeOpen(false);
    setIsCartOpen(true);
  };

  const addCustomBoxToCart = (boxData: {
    boxName: string;
    selectedSweets: string[];
    ribbonColor: string;
    giftNote: string;
    price: number;
  }) => {
    const cartItemId = `custom-gift-${Date.now()}`;
    const newItem: CartItem = {
      id: cartItemId,
      productId: 'custom-box-bespoke',
      name: `Bespoke Confection Box: ${boxData.boxName}`,
      category: 'gifts',
      image: giftBoxImg,
      variantLabel: `${boxData.selectedSweets.length} Varieties`,
      unitPrice: boxData.price,
      quantity: 1,
      customBoxDetails: {
        boxName: boxData.boxName,
        selectedSweets: boxData.selectedSweets,
        ribbonColor: boxData.ribbonColor,
        giftNote: boxData.giftNote,
      }
    };
    setCart(prev => [...prev, newItem]);
    setIsBespokeBoxOpen(false);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const config = COUPONS[cleanCode];
    if (!config) {
      return { success: false, message: 'Invalid promo code. Try WELCOME20 or BUY2GET1.' };
    }
    if (cartSubtotal < config.min) {
      return { success: false, message: `Minimum cart value of ₹${config.min} required for ${cleanCode}.` };
    }
    setAppliedCoupon({
      code: cleanCode,
      discount: config.discount,
      type: config.type,
      label: config.label,
    });
    return { success: true, message: `Coupon ${cleanCode} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const placeOrder = (orderPayload: {
    customerName: string;
    phone: string;
    email: string;
    deliveryType: 'delivery' | 'pickup';
    pickupStore?: string;
    address?: {
      street: string;
      city: string;
      pincode: string;
      landmark?: string;
    };
    deliveryDate: string;
    deliverySlot: string;
    paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'cod' | 'whatsapp';
  }): Order => {
    const newOrderId = `MSB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      customerName: orderPayload.customerName,
      phone: orderPayload.phone,
      email: orderPayload.email,
      deliveryType: orderPayload.deliveryType,
      pickupStore: orderPayload.pickupStore,
      address: orderPayload.address,
      deliveryDate: orderPayload.deliveryDate,
      deliverySlot: orderPayload.deliverySlot,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee,
      total: cartTotal,
      couponApplied: appliedCoupon?.code,
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: orderPayload.paymentMethod === 'cod' ? 'cod' : 'paid',
      orderStatus: 'placed',
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrderConfirmation(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
  };

  const adminAddProduct = (prod: Product) => {
    setProducts(prev => [prod, ...prev]);
  };

  const adminUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const adminDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        activeCategory,
        activeSubcategory,
        searchQuery,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isCustomCakeOpen,
        isBespokeBoxOpen,
        isSearchOpen,
        isTrackOrderOpen,
        isAiSommelierOpen,
        selectedProduct,
        currentOrderConfirmation,
        appliedCoupon,
        isAdminMode,
        setActiveCategory,
        setActiveSubcategory,
        setSearchQuery,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsCustomCakeOpen,
        setIsBespokeBoxOpen,
        setIsSearchOpen,
        setIsTrackOrderOpen,
        setIsAiSommelierOpen,
        setSelectedProduct,
        setCurrentOrderConfirmation,
        setIsAdminMode,
        addToCart,
        addCustomCakeToCart,
        addCustomBoxToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        cartTotal,
        cartItemCount,
        placeOrder,
        updateOrderStatus,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
