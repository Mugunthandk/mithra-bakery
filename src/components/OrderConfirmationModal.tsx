import React from 'react';
import { CheckCircle2, MessageSquare, Printer, X, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationModal: React.FC = () => {
  const { currentOrderConfirmation, setCurrentOrderConfirmation } = useShop();

  if (!currentOrderConfirmation) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppTrack = () => {
    const text = `Hi Mithra Sweets Team! Please share the dispatch status of my order #${currentOrderConfirmation.id}.`;
    window.open(`https://wa.me/919443218900?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Success Header */}
        <div className="bg-gradient-to-r from-[#651C32] to-[#3B2118] text-[#FFF8EC] p-6 text-center relative border-b border-[#C99A3D]/40">
          <button
            onClick={() => setCurrentOrderConfirmation(null)}
            className="absolute top-4 right-4 p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#C99A3D]/20 text-[#C99A3D] flex items-center justify-center mx-auto mb-3 border border-[#C99A3D]/40">
            <CheckCircle2 className="w-8 h-8 text-[#C99A3D]" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#C99A3D] font-bold">Order Confirmed &amp; In Kitchen</p>
          <h2 className="font-serif text-3xl font-bold mt-1">Thank You, {currentOrderConfirmation.customerName}!</h2>
          <p className="text-xs text-[#FFF8EC]/80 mt-1">
            Order Reference: <strong className="font-mono text-[#C99A3D] text-sm">#{currentOrderConfirmation.id}</strong>
          </p>
        </div>

        {/* Status Tracker */}
        <div className="p-6 border-b border-[#3B2118]/10 bg-[#FFF8EC]/40">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase font-bold text-[#3B2118]/70 tracking-wider">
              Live Kitchen Progress
            </h4>
            <span className="text-[11px] font-mono font-bold text-[#651C32] uppercase bg-[#651C32]/10 px-2 py-0.5 rounded">
              Status: {currentOrderConfirmation.orderStatus.replace('_', ' ')}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-medium">
            {[
              { num: 1, label: 'Received', statusKey: 'placed' },
              { num: 2, label: 'Baking / Preparing', statusKey: 'baking' },
              { num: 3, label: 'Aroma Sealed', statusKey: 'packing' },
              { num: 4, label: 'Dispatched', statusKey: 'delivered' },
            ].map((step, idx) => {
              const currentStepIndex =
                currentOrderConfirmation.orderStatus === 'placed' ? 1
                : currentOrderConfirmation.orderStatus === 'baking' ? 2
                : currentOrderConfirmation.orderStatus === 'packing' ? 3
                : 4;

              const isDone = step.num < currentStepIndex;
              const isCurrent = step.num === currentStepIndex;

              return (
                <div key={idx} className="space-y-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#C99A3D] text-[#3B2118] animate-pulse ring-2 ring-[#C99A3D]/40'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isDone ? '✓' : step.num}
                  </div>
                  <span
                    className={`block ${
                      isCurrent
                        ? 'text-[#651C32] font-bold'
                        : isDone
                        ? 'text-emerald-800 font-bold'
                        : 'text-[#3B2118]/50'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Receipt */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-5 text-xs">
          
          {/* Dispatch info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white rounded-2xl border border-[#3B2118]/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#3B2118]/50 block">Destination</span>
              {currentOrderConfirmation.deliveryType === 'delivery' ? (
                <p className="font-semibold text-[#3B2118] mt-0.5">
                  {currentOrderConfirmation.address?.street}, {currentOrderConfirmation.address?.city} - {currentOrderConfirmation.address?.pincode}
                </p>
              ) : (
                <p className="font-semibold text-[#3B2118] mt-0.5">
                  Pickup Counter: {currentOrderConfirmation.pickupStore}
                </p>
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#3B2118]/50 block">Slot &amp; Timing</span>
              <p className="font-semibold text-[#3B2118] mt-0.5">
                {currentOrderConfirmation.deliveryDate} · {currentOrderConfirmation.deliverySlot}
              </p>
            </div>
          </div>

          {/* Itemized List */}
          <div>
            <h5 className="font-serif font-bold text-sm text-[#3B2118] mb-2">Itemized Summary</h5>
            <div className="divide-y divide-[#3B2118]/10 bg-white rounded-2xl border border-[#3B2118]/10 p-4 space-y-2">
              {currentOrderConfirmation.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pt-2 first:pt-0">
                  <div>
                    <span className="font-semibold text-[#3B2118] block">{item.name}</span>
                    <span className="text-[11px] text-[#3B2118]/60">{item.variantLabel} × {item.quantity}</span>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#651C32] tabular-nums">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-[#3B2118]/10 space-y-1">
                <div className="flex justify-between text-[#3B2118]/70">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{currentOrderConfirmation.subtotal}</span>
                </div>
                {currentOrderConfirmation.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Applied</span>
                    <span className="tabular-nums">-₹{currentOrderConfirmation.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#3B2118]/70">
                  <span>Delivery</span>
                  <span className="tabular-nums">{currentOrderConfirmation.deliveryFee === 0 ? 'FREE' : `₹${currentOrderConfirmation.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#3B2118] pt-1 border-t border-[#3B2118]/10">
                  <span>Total Paid / Payable</span>
                  <span className="font-serif text-lg text-[#651C32] tabular-nums">₹{currentOrderConfirmation.total}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-[#FFF8EC] border-t border-[#3B2118]/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-[#3B2118]/20 bg-white text-[#3B2118] hover:border-[#651C32] text-xs font-semibold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppTrack}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Track on WhatsApp</span>
            </button>

            <button
              onClick={() => setCurrentOrderConfirmation(null)}
              className="px-4 py-2 rounded-xl bg-[#651C32] hover:bg-[#521628] text-[#FFF8EC] text-xs font-bold uppercase tracking-wider"
            >
              Continue Shopping
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
