export type MainCategory = 
  | 'sweets' 
  | 'cakes' 
  | 'bakery' 
  | 'snacks' 
  | 'gifts' 
  | 'beverages' 
  | 'festivals';

export interface ProductVariant {
  label: string; // e.g., '250g', '500g', '1kg' or '6 pcs' or '1 pc'
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: MainCategory;
  subcategory: string;
  price: number; // Base price for standard variant
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  isBestSeller?: boolean;
  isFreshToday?: boolean;
  isEggless?: boolean;
  isPureGhee?: boolean;
  isGlutenFree?: boolean;
  variants: ProductVariant[];
  description: string;
  ingredients: string[];
  nutrition: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  };
  shelfLife: string;
  storage: string;
  stock: number;
}

export interface CartItem {
  id: string; // unique item cart id
  productId: string;
  name: string;
  category: MainCategory;
  image: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  customNotes?: string;
  customCakeDetails?: {
    flavour: string;
    size: string;
    shape: string;
    message: string;
    eggless: boolean;
    deliveryDate: string;
  };
  customBoxDetails?: {
    boxName: string;
    selectedSweets: string[];
    ribbonColor: string;
    giftNote: string;
  };
}

export interface StoreLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  timing: string;
  phone: string;
  mapQuery: string;
  isFlagship?: boolean;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'shipping';
  discountValue: number;
  minOrder: number;
}

export interface Order {
  id: string;
  createdAt: string;
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
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponApplied?: string;
  paymentMethod: 'razorpay_upi' | 'razorpay_card' | 'cod' | 'whatsapp';
  paymentStatus: 'paid' | 'pending' | 'cod';
  orderStatus: 'placed' | 'baking' | 'packing' | 'out_for_delivery' | 'delivered';
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
  verified: boolean;
}
