import React, { useState } from 'react';
import { X, Search, Package, Clock, MapPin, Truck, CheckCircle2, MessageSquare, Phone, Store } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, orders } = useShop();
  const [searchInput, setSearchInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchInput.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.id.replace('MSB-', '') === cleanId
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`Order reference "${searchInput}" not found. Please verify your order number.`);
    }
  };

  const getStepIndex = (status: Order['orderStatus']) => {
    switch (status) {
      case 'placed': return 1;
      case 'baking': return 2;
      case 'packing': return 3;
      case 'out_for_delivery': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = selectedOrder ? getStepIndex(selectedOrder.orderStatus) : 1;

  const steps = [
    { title: 'Order Placed', desc: 'Received & Scheduled' },
    { title: 'In Kitchen', desc: 'Simmering / Baking' },
    { title: 'Aroma Sealed', desc: 'Insulated Gift Pack' },
    { title: 'Out For Delivery', desc: 'Express Courier' },
    { title: 'Delivered', desc: 'Enjoy With Family' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#651C32] text-[#FFF8EC] p-5 flex items-center justify-between border-b border-[#C99A3D]/30">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C99A3D]" />
            <div>
              <h3 className="font-serif text-xl font-bold">Track Your Mithra Order</h3>
              <p className="text-xs text-[#FFF8EC]/70">Live dispatch status direct from our atelier kitchen</p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Order Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#3B2118]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. MSB-94021)"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32] uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#3B2118] text-[#FFF8EC] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#25150f] transition-colors"
            >
              Lookup
            </button>
          </form>

          {/* Quick Select from Recent Orders */}
          {orders.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-[#3B2118]/60 uppercase tracking-wider block mb-2">
                Recent Orders in Your Session:
              </span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                      selectedOrder?.id === ord.id
                        ? 'bg-[#651C32] text-white border-[#651C32]'
                        : 'bg-white text-[#3B2118] border-[#3B2118]/15 hover:border-[#C99A3D]'
                    }`}
                  >
                    #{ord.id} ({ord.customerName})
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedOrder && (
            <div className="space-y-6">
              
              {/* Order Banner */}
              <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#C99A3D]/30 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#651C32] block">
                    Order Reference
                  </span>
                  <span className="font-mono text-lg font-bold text-[#3B2118]">
                    #{selectedOrder.id}
                  </span>
                  <span className="text-xs text-[#3B2118]/60 block mt-0.5">
                    Placed for {selectedOrder.customerName}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#3B2118]/50 block">
                    Delivery Schedule
                  </span>
                  <span className="text-xs font-semibold text-[#3B2118] block">
                    {selectedOrder.deliveryDate}
                  </span>
                  <span className="text-[11px] text-[#651C32] font-medium block">
                    {selectedOrder.deliverySlot}
                  </span>
                </div>
              </div>

              {/* Dynamic 5-Stage Kitchen Timeline */}
              <div className="py-2">
                <div className="grid grid-cols-5 gap-2 text-center relative">
                  {steps.map((st, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum < currentStep;
                    const isCurrent = stepNum === currentStep;

                    return (
                      <div key={idx} className="space-y-1.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                            isDone
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-[#C99A3D] text-[#3B2118] ring-4 ring-[#C99A3D]/20 animate-pulse'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {isDone ? '✓' : stepNum}
                        </div>
                        <span
                          className={`block text-[11px] font-bold ${
                            isCurrent
                              ? 'text-[#651C32]'
                              : isDone
                              ? 'text-emerald-800'
                              : 'text-[#3B2118]/40'
                          }`}
                        >
                          {st.title}
                        </span>
                        <span className="text-[9px] text-[#3B2118]/60 block leading-tight">
                          {st.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery / Destination Details */}
              <div className="p-4 bg-white rounded-2xl border border-[#3B2118]/10 text-xs space-y-2">
                <div className="flex items-start gap-2.5">
                  {selectedOrder.deliveryType === 'delivery' ? (
                    <MapPin className="w-4 h-4 text-[#651C32] shrink-0 mt-0.5" />
                  ) : (
                    <Store className="w-4 h-4 text-[#651C32] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-[#3B2118]">
                      {selectedOrder.deliveryType === 'delivery' ? 'Doorstep Delivery Address:' : 'Store Pickup Counter:'}
                    </span>
                    <p className="text-[#3B2118]/80 mt-0.5">
                      {selectedOrder.deliveryType === 'delivery'
                        ? `${selectedOrder.address?.street}, ${selectedOrder.address?.city} - ${selectedOrder.address?.pincode} ${
                            selectedOrder.address?.landmark ? `(Near: ${selectedOrder.address.landmark})` : ''
                          }`
                        : selectedOrder.pickupStore}
                    </p>
                  </div>
                </div>
              </div>

              {/* Itemized summary */}
              <div>
                <h5 className="font-serif font-bold text-sm text-[#3B2118] mb-2">Package Items ({selectedOrder.items.length})</h5>
                <div className="bg-white rounded-2xl border border-[#3B2118]/10 divide-y divide-[#3B2118]/10 p-3 text-xs">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-[#3B2118]">{item.name}</span>
                        <span className="text-[11px] text-[#3B2118]/60 ml-2">({item.variantLabel} × {item.quantity})</span>
                      </div>
                      <span className="font-serif font-bold text-[#651C32]">₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between font-bold text-sm text-[#3B2118]">
                    <span>Total Amount</span>
                    <span className="font-serif text-[#651C32]">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={`https://wa.me/919443218900?text=${encodeURIComponent(
                    `Hi Mithra Sweets Team! Please give me a live dispatch update on order #${selectedOrder.id}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Kitchen Desk</span>
                </a>

                <a
                  href="tel:+919443218900"
                  className="px-4 py-2.5 rounded-xl border border-[#3B2118]/20 bg-white hover:border-[#651C32] text-[#3B2118] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C99A3D]" />
                  <span>Call Atelier Desk</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
