import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Calendar, Clock, CreditCard, MessageSquare, Truck, Store, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { STORES_DATA } from '../data/stores';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    placeOrder,
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('Priya Ramasamy');
  const [phone, setPhone] = useState('+91 98422 12345');
  const [email, setEmail] = useState('priya.r@example.com');
  const [street, setStreet] = useState('12, Bharathiyar 3rd Cross');
  const [city, setCity] = useState('Coimbatore');
  const [pincode, setPincode] = useState('641002');
  const [landmark, setLandmark] = useState('Near Flower Market');
  const [pickupStore, setPickupStore] = useState(STORES_DATA[1].name);
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliverySlot, setDeliverySlot] = useState('Morning (9:00 AM - 12:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay_upi' | 'razorpay_card' | 'cod' | 'whatsapp'>('razorpay_upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#651C32', '#C99A3D', '#3B2118', '#F7D8C8'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      triggerConfetti();

      placeOrder({
        customerName,
        phone,
        email,
        deliveryType,
        pickupStore: deliveryType === 'pickup' ? pickupStore : undefined,
        address: deliveryType === 'delivery' ? { street, city, pincode, landmark } : undefined,
        deliveryDate,
        deliverySlot,
        paymentMethod,
      });

      if (paymentMethod === 'whatsapp') {
        const itemsList = cart.map(i => `• ${i.name} (${i.variantLabel}) x${i.quantity} = ₹${i.unitPrice * i.quantity}`).join('\n');
        const text = `*New Mithra Sweets & Bakery Order*\n\n` +
          `👤 *Customer:* ${customerName}\n` +
          `📞 *Phone:* ${phone}\n` +
          `📍 *Mode:* ${deliveryType === 'delivery' ? `Doorstep Delivery to ${street}, ${city} - ${pincode}` : `Pickup at ${pickupStore}`}\n` +
          `📅 *Date & Slot:* ${deliveryDate} | ${deliverySlot}\n\n` +
          `*Order Items:*\n${itemsList}\n\n` +
          `💰 *Total Amount:* ₹${cartTotal}\n` +
          `💳 *Payment:* Cash / UPI on Delivery\n\n` +
          `Please confirm my order!`;
        window.open(`https://wa.me/919443218900?text=${encodeURIComponent(text)}`, '_blank');
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-3xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#651C32] text-[#FFF8EC] p-5 flex items-center justify-between border-b border-[#C99A3D]/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C99A3D]" />
            <div>
              <h3 className="font-serif text-xl font-bold">Secure Checkout</h3>
              <p className="text-xs text-[#FFF8EC]/70">Express dispatch directly from our kitchen</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Step 1: Customer Contact */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#3B2118] mb-3 flex items-center gap-2">
              <span>1. Patron Details</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Email (For Receipt)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Mode */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#3B2118] mb-3">
              2. Delivery Method
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]'
                    : 'bg-white border-[#3B2118]/15 hover:border-[#C99A3D]'
                }`}
              >
                <Truck className="w-5 h-5 text-[#651C32]" />
                <div className="text-left">
                  <div className="font-serif font-bold text-sm text-[#3B2118]">Doorstep Delivery</div>
                  <div className="text-[11px] text-[#3B2118]/70">Temperature controlled express van</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]'
                    : 'bg-white border-[#3B2118]/15 hover:border-[#C99A3D]'
                }`}
              >
                <Store className="w-5 h-5 text-[#651C32]" />
                <div className="text-left">
                  <div className="font-serif font-bold text-sm text-[#3B2118]">Store Pickup</div>
                  <div className="text-[11px] text-[#3B2118]/70">Pick up freshly packed at store counter</div>
                </div>
              </button>
            </div>

            {deliveryType === 'delivery' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#FFF8EC]/60 rounded-2xl border border-[#3B2118]/10">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House / Flat No, Street Name"
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                  >
                    <option>Karur</option>
                    <option>Coimbatore</option>
                    <option>Chennai</option>
                    <option>Tiruppur</option>
                    <option>Salem</option>
                    <option>Erode</option>
                    <option>Madurai</option>
                    <option>Trichy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Opposite Temple, Near Bus Stop"
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#FFF8EC]/60 rounded-2xl border border-[#3B2118]/10">
                <label className="block text-xs font-semibold text-[#3B2118] mb-2">Select Pickup Counter</label>
                <select
                  value={pickupStore}
                  onChange={(e) => setPickupStore(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                >
                  {STORES_DATA.map(s => (
                    <option key={s.id} value={s.name}>
                      {s.city} - {s.name} ({s.address})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Step 3: Schedule Date & Slot */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#3B2118] mb-3">
              3. Delivery Date &amp; Slot
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">Time Window</label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                >
                  <option>Morning (9:00 AM - 12:00 PM)</option>
                  <option>Afternoon (1:00 PM - 4:00 PM)</option>
                  <option>Evening (5:00 PM - 8:00 PM)</option>
                  <option>Same-Day Urgent (Within 2 Hours)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 4: Payment Simulation */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#3B2118] mb-3">
              4. Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'razorpay_upi' ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]' : 'bg-white border-[#3B2118]/15'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'razorpay_upi'}
                    onChange={() => setPaymentMethod('razorpay_upi')}
                    className="accent-[#651C32]"
                  />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#3B2118] block">Razorpay UPI &amp; QR</span>
                    <span className="text-[10px] text-[#3B2118]/60">Google Pay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Instant</span>
              </label>

              <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'razorpay_card' ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]' : 'bg-white border-[#3B2118]/15'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'razorpay_card'}
                    onChange={() => setPaymentMethod('razorpay_card')}
                    className="accent-[#651C32]"
                  />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#3B2118] block">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#3B2118]/60">Visa, Mastercard, RuPay &amp; NetBanking</span>
                  </div>
                </div>
                <CreditCard className="w-4 h-4 text-[#3B2118]/60" />
              </label>

              <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]' : 'bg-white border-[#3B2118]/15'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#651C32]"
                  />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#3B2118] block">Cash on Delivery (COD)</span>
                    <span className="text-[10px] text-[#3B2118]/60">Pay cash or UPI on delivery</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#3B2118]/60">Verified</span>
              </label>

              <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'whatsapp' ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600' : 'bg-white border-[#3B2118]/15'
              }`}>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="accent-emerald-600"
                  />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#3B2118] block">WhatsApp Assisted Order</span>
                    <span className="text-[10px] text-emerald-700">Chat directly with chef desk</span>
                  </div>
                </div>
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </label>
            </div>
          </div>

          {/* Order Summary & Final Confirmation CTA */}
          <div className="p-4 bg-[#FFF8EC] rounded-2xl border border-[#3B2118]/10 space-y-2">
            <div className="flex justify-between text-xs text-[#3B2118]/70">
              <span>Items Total ({cart.length} delicacies):</span>
              <span className="font-semibold text-[#3B2118]">₹{cartSubtotal}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-xs text-emerald-700 font-medium">
                <span>Coupon ({appliedCoupon?.code}):</span>
                <span>-₹{cartDiscount}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-[#3B2118]/70">
              <span>Express Logistics Fee:</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-[#3B2118] pt-2 border-t border-[#3B2118]/10">
              <span>Payable Amount:</span>
              <span className="font-serif text-2xl text-[#651C32] tabular-nums">₹{cartTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-[#651C32] hover:bg-[#521628] text-[#FFF8EC] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="animate-pulse">Processing Order Securely...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-[#C99A3D]" />
                <span>Place Order &amp; Confirm (₹{cartTotal})</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
