import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Tag,
  ArrowLeft,
  Search,
  Filter,
  Package,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, MainCategory, Order } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    setIsAdminMode,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    updateOrderStatus,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'inventory' | 'coupons'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);
  const [editingStock, setEditingStock] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<MainCategory>('sweets');
  const [newProdSubcat, setNewProdSubcat] = useState('Kaju Specials');
  const [newProdPrice, setNewProdPrice] = useState(450);
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdTagline, setNewProdTagline] = useState('');

  // Overview metrics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 245800);
  const totalOrderCount = orders.length + 1284;
  const totalCustomers = 856;
  const lowStockCount = products.filter(p => p.stock < 25).length + 42;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      name: newProdName,
      tagline: newProdTagline || 'Authentic handcrafted recipe',
      category: newProdCategory,
      subcategory: newProdSubcat,
      price: Number(newProdPrice),
      rating: 5.0,
      reviewCount: 1,
      image: products[0].image,
      isFreshToday: true,
      variants: [
        { label: '500g', price: Number(newProdPrice) },
        { label: '1kg', price: Math.round(Number(newProdPrice) * 1.9) },
      ],
      description: 'Handcrafted fresh using premium farm-sourced ingredients.',
      ingredients: ['Pure Cow Ghee', 'Dry Fruits', 'Natural Spices'],
      nutrition: { calories: '450 kcal', protein: '8g', fat: '20g', carbs: '50g' },
      shelfLife: '15 Days',
      storage: 'Keep in cool dry place.',
      stock: Number(newProdStock),
    };

    adminAddProduct(newProduct);
    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdTagline('');
  };

  const handleUpdatePriceStock = (product: Product, newPrice: number, newStock: number) => {
    adminUpdateProduct({
      ...product,
      price: newPrice,
      stock: newStock,
      variants: product.variants.map((v, idx) => idx === 0 ? { ...v, price: newPrice } : v),
    });
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3B2118]">
      
      {/* Admin Top Header */}
      <div className="bg-[#3B2118] text-[#FFF8EC] border-b border-[#C99A3D]/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminMode(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF8EC] transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <div>
              <span className="font-serif text-xl font-bold text-[#C99A3D]">Mithra Merchant Studio</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-[#FFF8EC]/60">· Operations &amp; Inventory</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-mono text-[11px] font-bold">
              LIVE ATELIER KITCHEN
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-[#FFF8EC]/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'products', label: 'Products & Pricing', icon: <Package className="w-3.5 h-3.5" /> },
            { id: 'orders', label: 'Live Orders Desk', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
            { id: 'inventory', label: 'Inventory & Alerts', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
            { id: 'coupons', label: 'Promotions & Coupons', icon: <Tag className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#C99A3D] text-[#C99A3D] bg-white/5'
                  : 'border-transparent text-[#FFF8EC]/70 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#3B2118]/60 mb-2">
                  <span>Total Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    ₹
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#651C32] tabular-nums">
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span>+18.4% this month</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#3B2118]/60 mb-2">
                  <span>Orders Dispatched</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#3B2118] tabular-nums">
                  {totalOrderCount.toLocaleString()}
                </div>
                <div className="mt-2 text-[11px] text-[#3B2118]/60">
                  Across Karur, Kovai &amp; Chennai
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#3B2118]/60 mb-2">
                  <span>Registered Patrons</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-[#3B2118] tabular-nums">
                  {totalCustomers}
                </div>
                <div className="mt-2 text-[11px] text-blue-700 font-semibold">
                  84% Repeat order rate
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#3B2118]/60 mb-2">
                  <span>Low Stock Alert</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-rose-700 tabular-nums">
                  {lowStockCount}
                </div>
                <div className="mt-2 text-[11px] text-rose-700 font-semibold">
                  Action required before festival batch
                </div>
              </div>
            </div>

            {/* Department Performance & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Category Performance Breakdown */}
              <div className="lg:col-span-6 p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#3B2118]">
                  Sales Contribution by Department
                </h4>

                <div className="space-y-3 pt-2">
                  {[
                    { label: 'Traditional Sweets (Kaju & Ghee Mysore Pak)', percent: 45, amount: '₹1,10,610' },
                    { label: 'Celebration & Fusion Cakes', percent: 28, amount: '₹68,824' },
                    { label: 'South Indian Savoury Snacks', percent: 14, amount: '₹34,412' },
                    { label: 'Artisan Bakery & Viennoiserie', percent: 8, amount: '₹19,664' },
                    { label: 'Luxury Keepsake Gift Boxes', percent: 5, amount: '₹12,290' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-[#3B2118]">
                        <span>{item.label}</span>
                        <span className="font-mono text-[#651C32]">{item.amount} ({item.percent}%)</span>
                      </div>
                      <div className="w-full bg-[#3B2118]/10 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#651C32] h-full rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kitchen Live Dispatch Queue */}
              <div className="lg:col-span-6 p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#3B2118]">
                    Recent Kitchen Orders
                  </h4>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#651C32] hover:underline"
                  >
                    View All Orders
                  </button>
                </div>

                <div className="divide-y divide-[#3B2118]/10">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#3B2118]">#{order.id}</span>
                          <span className="text-xs font-medium text-[#3B2118]/80">{order.customerName}</span>
                        </div>
                        <p className="text-[11px] text-[#3B2118]/60 mt-0.5">
                          {order.items.length} items · {order.deliverySlot}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-sm text-[#651C32] block">₹{order.total}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          order.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.orderStatus.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & PRICING */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#3B2118]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products by name or subcategory..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-[#651C32] text-[#FFF8EC] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto hover:bg-[#521628]"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Sweet / Cake</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#3B2118]/10 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF8EC] border-b border-[#3B2118]/10 uppercase text-[#3B2118]/70 font-semibold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Base Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3B2118]/10">
                    {products
                      .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.subcategory.toLowerCase().includes(productSearch.toLowerCase()))
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-[#FFFDF9]">
                          <td className="py-3 px-4 font-semibold text-[#3B2118]">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#FFF8EC] overflow-hidden shrink-0">
                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <span className="block font-serif font-bold text-sm text-[#3B2118]">{product.name}</span>
                                <span className="text-[10px] text-[#3B2118]/50">{product.tagline.slice(0, 35)}...</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] uppercase font-bold text-[#C99A3D] bg-[#FFF8EC] px-2 py-0.5 rounded border border-[#C99A3D]/20">
                              {product.subcategory}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#651C32] tabular-nums">
                            ₹{product.price}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`tabular-nums font-semibold ${product.stock < 25 ? 'text-rose-600' : 'text-emerald-700'}`}>
                              {product.stock} units
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-[#3B2118] tabular-nums">
                            ⭐ {product.rating} ({product.reviewCount})
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setEditingPrice(product.price);
                                  setEditingStock(product.stock);
                                }}
                                className="p-1 text-[#3B2118]/60 hover:text-[#651C32]"
                                title="Edit Price & Stock"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => adminDeleteProduct(product.id)}
                                className="p-1 text-[#3B2118]/60 hover:text-rose-600"
                                title="Delete Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE ORDERS DESK */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#3B2118]">
              Active Kitchen &amp; Logistics Orders
            </h3>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-6 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3B2118]/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-[#651C32]">#{order.id}</span>
                        <span className="text-sm font-semibold text-[#3B2118]">· {order.customerName} ({order.phone})</span>
                      </div>
                      <p className="text-xs text-[#3B2118]/60 mt-0.5">
                        {order.deliveryType === 'delivery'
                          ? `Delivery to: ${order.address?.street}, ${order.address?.city}`
                          : `Pickup at: ${order.pickupStore}`} · {order.deliveryDate} ({order.deliverySlot})
                      </p>
                    </div>

                    {/* Order Status Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#3B2118]/60">Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg border border-[#3B2118]/20 text-xs font-bold bg-[#FFF8EC] text-[#651C32] focus:outline-none"
                      >
                        <option value="placed">Placed (Pending)</option>
                        <option value="baking">Baking / Preparing</option>
                        <option value="packing">Aroma Sealed &amp; Packing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#FFF8EC]/40 border border-[#3B2118]/5 text-xs">
                        <span className="font-serif font-bold text-sm text-[#3B2118] block">{item.name}</span>
                        <span className="text-[11px] text-[#3B2118]/70">
                          {item.variantLabel} × {item.quantity} = ₹{item.unitPrice * item.quantity}
                        </span>
                        {item.customCakeDetails && (
                          <span className="block text-[10px] text-[#651C32] font-medium mt-0.5 italic">
                            Message: "{item.customCakeDetails.message}"
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs text-[#3B2118]/70 pt-2 border-t border-[#3B2118]/5">
                    <span>Payment: <strong className="text-[#3B2118] uppercase">{order.paymentMethod.replace('_', ' ')} ({order.paymentStatus})</strong></span>
                    <span className="font-serif text-lg font-bold text-[#651C32]">Total: ₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY & LOW STOCK */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <strong>Morning Stock Replenishment Protocol:</strong> Daily batch counts are updated every morning at 7:00 AM after central kitchen quality inspection.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div key={prod.id} className="p-4 bg-white rounded-2xl border border-[#3B2118]/10 shadow-xs flex items-center justify-between">
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#3B2118]">{prod.name}</h5>
                    <span className="text-[11px] text-[#3B2118]/60">{prod.subcategory}</span>
                    <span className={`block text-xs font-bold mt-1 ${prod.stock < 25 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {prod.stock} Units In Stock
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      adminUpdateProduct({ ...prod, stock: prod.stock + 20 });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FFF8EC] text-[#651C32] hover:bg-[#651C32] hover:text-white border border-[#651C32]/20 text-xs font-bold transition-colors"
                  >
                    +20 Batch
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#3B2118]">
              Promotional Codes &amp; Campaign Vouchers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-2xl border border-[#3B2118]/10 space-y-2">
                <span className="font-mono text-base font-bold text-[#651C32] block">WELCOME20</span>
                <p className="text-xs text-[#3B2118]/70">20% discount on orders above ₹499 for new users</p>
                <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block">Active Campaign</div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#3B2118]/10 space-y-2">
                <span className="font-mono text-base font-bold text-[#651C32] block">BUY2GET1</span>
                <p className="text-xs text-[#3B2118]/70">₹150 off on festival sweets and savoury gift boxes</p>
                <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block">Active Campaign</div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#3B2118]/10 space-y-2">
                <span className="font-mono text-base font-bold text-[#651C32] block">FREEDEL</span>
                <p className="text-xs text-[#3B2118]/70">Waives ₹50 delivery fee automatically</p>
                <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block">Always Available</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#3B2118]/20 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#3B2118]">
              Update Price &amp; Stock: {editingProduct.name}
            </h4>

            <div>
              <label className="block text-xs font-semibold text-[#3B2118] mb-1">Base Price (₹)</label>
              <input
                type="number"
                value={editingPrice}
                onChange={(e) => setEditingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2118] mb-1">Available Stock</label>
              <input
                type="number"
                value={editingStock}
                onChange={(e) => setEditingStock(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-xs font-semibold text-[#3B2118]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdatePriceStock(editingProduct, editingPrice, editingStock);
                }}
                className="px-5 py-2 bg-[#651C32] text-[#FFF8EC] rounded-xl text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#3B2118]/20 space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#3B2118]">
              Add New Confectionery Item
            </h4>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Pistachio Peda"
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Department</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value as MainCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                >
                  <option value="sweets">Traditional Sweets</option>
                  <option value="cakes">Cakes</option>
                  <option value="bakery">Bakery</option>
                  <option value="snacks">Snacks</option>
                  <option value="gifts">Gift Boxes</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Subcategory</label>
                <input
                  type="text"
                  required
                  value={newProdSubcat}
                  onChange={(e) => setNewProdSubcat(e.target.value)}
                  placeholder="e.g. Kaju Specials / Milk Sweets"
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Tagline</label>
                <input
                  type="text"
                  value={newProdTagline}
                  onChange={(e) => setNewProdTagline(e.target.value)}
                  placeholder="Melt-in-mouth traditional treat"
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#3B2118]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#651C32] text-[#FFF8EC] rounded-xl text-xs font-bold hover:bg-[#521628]"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
