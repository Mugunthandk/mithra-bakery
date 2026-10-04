import React, { useState } from 'react';
import { X, Sparkles, Check, Calendar, Clock, ShoppingBag, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomCakeBuilderModal: React.FC = () => {
  const { isCustomCakeOpen, setIsCustomCakeOpen, addCustomCakeToCart } = useShop();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [flavour, setFlavour] = useState<string>('Rasmalai Saffron Fusion');
  const [size, setSize] = useState<string>('1kg (Serves 8-10)');
  const [shape, setShape] = useState<string>('Round Classic');
  const [message, setMessage] = useState<string>('Happy Birthday!');
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('Evening (5:00 PM - 8:00 PM)');
  const [photoOption, setPhotoOption] = useState<boolean>(false);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  if (!isCustomCakeOpen) return null;

  // Pricing calculations
  const baseFlavourPrices: { [key: string]: number } = {
    'Rasmalai Saffron Fusion': 750,
    'Belgian Chocolate Truffle': 700,
    'Red Velvet Cream Cheese': 680,
    'Lotus Biscoff Speculoos': 790,
    'Dutch Dark Chocolate': 650,
    'Mango Alphonso Delight': 690,
    'Pistachio Rose Petal': 780,
    'Butterscotch Crunch': 580,
  };

  const sizeMultipliers: { [key: string]: number } = {
    '500g (Serves 4-5)': 1,
    '1kg (Serves 8-10)': 1.8,
    '1.5kg (Serves 12-15)': 2.6,
    '2kg (Serves 18-20)': 3.4,
    '3kg 2-Tier Grand': 5.0,
  };

  const basePrice = baseFlavourPrices[flavour] || 700;
  const multiplier = sizeMultipliers[size] || 1.8;
  const egglessSurcharge = isEggless ? 50 : 0;
  const photoSurcharge = photoOption ? 150 : 0;
  const totalPrice = Math.round(basePrice * multiplier + egglessSurcharge + photoSurcharge);

  const flavoursList = [
    { name: 'Rasmalai Saffron Fusion', desc: 'Saffron milk sponge, crushed rasmalai & pistachios', badge: 'Signature' },
    { name: 'Belgian Chocolate Truffle', desc: '64% dark chocolate ganache with crisp pearls', badge: 'Best Seller' },
    { name: 'Red Velvet Cream Cheese', desc: 'Moist crimson sponge with tangy vanilla cream cheese', badge: 'Popular' },
    { name: 'Lotus Biscoff Speculoos', desc: 'Spiced Belgian cookie butter with caramelized crunch', badge: 'Gourmet' },
    { name: 'Dutch Dark Chocolate', desc: 'Intense Dutch cocoa sponge with fudge ganache', badge: 'Classic' },
    { name: 'Mango Alphonso Delight', desc: 'Real Ratnagiri mango pulp cream and fresh chunks', badge: 'Seasonal' },
    { name: 'Pistachio Rose Petal', desc: 'Persian rose extract with toasted Iranian pistachio', badge: 'Royal' },
    { name: 'Butterscotch Crunch', desc: 'Brown butter caramel with golden praline crunch', badge: 'Traditional' },
  ];

  const sizesList = [
    { label: '500g (Serves 4-5)', desc: 'Intimate celebration' },
    { label: '1kg (Serves 8-10)', desc: 'Most popular family size' },
    { label: '1.5kg (Serves 12-15)', desc: 'Festive gathering' },
    { label: '2kg (Serves 18-20)', desc: 'Grand party' },
    { label: '3kg 2-Tier Grand', desc: 'Wedding / Milestone tiered structure' },
  ];

  const shapesList = [
    { id: 'Round Classic', name: 'Round Classic', desc: 'Timeless smooth frosted round silhouette' },
    { id: 'Heart Shaped', name: 'Heart Shaped', desc: 'Romantic hand-shaped anniversary / valentine design' },
    { id: 'Minimalist Textured', name: 'Minimalist Textured', desc: 'Clean Scandinavian aesthetic with palette knife strokes' },
    { id: 'Floral Cascading', name: 'Floral Cascading', desc: 'Dried edible botanicals and gold leaf accents' },
    { id: 'Drip Cake Glamour', name: 'Drip Cake Glamour', desc: 'Rich chocolate / caramel drips along edges' },
  ];

  const handleAddToCart = () => {
    addCustomCakeToCart({
      flavour,
      size,
      shape,
      message,
      eggless: isEggless,
      deliveryDate: `${deliveryDate} (${timeSlot})`,
      price: totalPrice,
    });
  };

  const handleWhatsAppOrder = () => {
    const text = `*New Custom Cake Inquiry - Mithra Sweets & Bakery*\n\n` +
      `🎂 *Flavour:* ${flavour}\n` +
      `⚖️ *Size:* ${size}\n` +
      `🎨 *Design:* ${shape}\n` +
      `✍️ *Message:* "${message}"\n` +
      `🌱 *Eggless:* ${isEggless ? 'Yes' : 'No'}\n` +
      `📸 *Photo Topper:* ${photoOption ? 'Yes (+₹150)' : 'No'}\n` +
      `📅 *Date:* ${deliveryDate} (${timeSlot})\n` +
      `💬 *Special Notes:* ${specialInstructions || 'None'}\n` +
      `💰 *Estimated Total:* ₹${totalPrice}\n\n` +
      `Please confirm slot availability!`;
    window.open(`https://wa.me/919443218900?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-2xl max-w-3xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#651C32] text-[#FFF8EC] p-5 flex items-center justify-between border-b border-[#C99A3D]/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C99A3D]" />
            <div>
              <h3 className="font-serif text-xl font-bold">Custom Cake Studio</h3>
              <p className="text-xs text-[#FFF8EC]/70">Tell us your vision. We bake it fresh from scratch.</p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomCakeOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wizard Step Progress */}
        <div className="bg-[#FFF8EC] px-6 py-3 border-b border-[#3B2118]/10 flex items-center justify-between text-xs font-medium text-[#3B2118]/70">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#651C32] font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-[#651C32] text-white' : 'bg-black/10'}`}>1</span>
            <span>Flavour</span>
          </button>
          <span>→</span>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#651C32] font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-[#651C32] text-white' : 'bg-black/10'}`}>2</span>
            <span>Size &amp; Shape</span>
          </button>
          <span>→</span>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#651C32] font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-[#651C32] text-white' : 'bg-black/10'}`}>3</span>
            <span>Personalization</span>
          </button>
          <span>→</span>
          <button
            onClick={() => setStep(4)}
            className={`flex items-center gap-1.5 ${step === 4 ? 'text-[#651C32] font-bold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-[#651C32] text-white' : 'bg-black/10'}`}>4</span>
            <span>Schedule &amp; Order</span>
          </button>
        </div>

        {/* Modal Step Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          
          {/* STEP 1: Flavour */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#3B2118]">1. Choose Your Signature Flavour</h4>
                <p className="text-xs text-[#3B2118]/70">All cakes are layered with freshly whipped fillings and premium natural ingredients.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flavoursList.map((item) => {
                  const isSelected = flavour === item.name;
                  return (
                    <div
                      key={item.name}
                      onClick={() => setFlavour(item.name)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]'
                          : 'bg-white border-[#3B2118]/10 hover:border-[#C99A3D]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm text-[#3B2118]">{item.name}</span>
                        <span className="text-[10px] uppercase font-bold text-[#C99A3D]">{item.badge}</span>
                      </div>
                      <p className="text-xs text-[#3B2118]/70 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Size & Shape */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#3B2118]">2. Choose Size &amp; Guest Count</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {sizesList.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => setSize(item.label)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        size === item.label
                          ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]'
                          : 'bg-white border-[#3B2118]/10 hover:border-[#C99A3D]'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-[#3B2118]">{item.label}</div>
                      <p className="text-xs text-[#3B2118]/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#3B2118]">Design &amp; Silhouette</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {shapesList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setShape(item.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        shape === item.id
                          ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]'
                          : 'bg-white border-[#3B2118]/10 hover:border-[#C99A3D]'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-[#3B2118]">{item.name}</div>
                      <p className="text-[11px] text-[#3B2118]/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Personalization & Inscription */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#3B2118]">3. Piping Inscription &amp; Add-ons</h4>
                <p className="text-xs text-[#3B2118]/70">We will hand-pipe your message with artisanal dark chocolate or golden buttercream.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">
                  Cake Inscription Message (Max 35 Characters)
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Happy 25th Anniversary Amma &amp; Appa"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B2118]/20 focus:outline-none focus:border-[#651C32] text-sm bg-white"
                />
              </div>

              {/* Eggless & Dietary */}
              <div className="p-4 bg-[#FFF8EC] rounded-xl border border-[#3B2118]/10 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-sm font-bold text-[#3B2118] block">🌱 100% Eggless Preparation</span>
                    <span className="text-xs text-[#3B2118]/70">Baked with organic yogurt, condensed milk &amp; butter (+₹50)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="w-5 h-5 accent-[#651C32]"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-[#3B2118]/10">
                  <div>
                    <span className="text-sm font-bold text-[#3B2118] block">📸 Edible Sugar Photo Topper (+₹150)</span>
                    <span className="text-xs text-[#3B2118]/70">We will contact you via WhatsApp to collect high-res portrait image</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={photoOption}
                    onChange={(e) => setPhotoOption(e.target.checked)}
                    className="w-5 h-5 accent-[#651C32]"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2118] mb-1">
                  Chef Instructions &amp; Theme Notes
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Less sweet, extra pistachio garnish, pastel pink cream palette..."
                  className="w-full px-4 py-2 rounded-xl border border-[#3B2118]/20 focus:outline-none focus:border-[#651C32] text-xs bg-white"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Date, Time & Review */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#3B2118]">4. Select Delivery Date &amp; Slot</h4>
                <p className="text-xs text-[#3B2118]/70">Custom cakes require a minimum 4-hour fresh baking window.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">
                    Celebration Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#3B2118]/20 focus:outline-none focus:border-[#651C32] text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#3B2118]/20 focus:outline-none focus:border-[#651C32] text-sm bg-white"
                  >
                    <option>Morning (9:00 AM - 12:00 PM)</option>
                    <option>Afternoon (1:00 PM - 4:00 PM)</option>
                    <option>Evening (5:00 PM - 8:00 PM)</option>
                    <option>Late Night Midnight Surprise (11:00 PM - 12:15 AM)</option>
                  </select>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-[#FFF8EC] rounded-xl border border-[#C99A3D]/40 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-sm text-[#3B2118] border-b border-[#3B2118]/10 pb-2">
                  <span>{flavour}</span>
                  <span className="font-serif text-[#651C32]">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[#3B2118]/70">
                  <span>Weight &amp; Shape:</span>
                  <span className="font-medium text-[#3B2118]">{size} · {shape}</span>
                </div>
                <div className="flex justify-between text-[#3B2118]/70">
                  <span>Piping Message:</span>
                  <span className="font-medium text-[#3B2118] italic">"{message}"</span>
                </div>
                <div className="flex justify-between text-[#3B2118]/70">
                  <span>Dietary Preference:</span>
                  <span className="font-medium text-[#3B2118]">{isEggless ? '100% Eggless' : 'Contains Egg'}</span>
                </div>
                <div className="flex justify-between text-[#3B2118]/70">
                  <span>Slot:</span>
                  <span className="font-medium text-[#3B2118]">{deliveryDate} · {timeSlot}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#FFF8EC] p-4 px-6 border-t border-[#3B2118]/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#3B2118]/60 block">Estimated Total</span>
            <span className="font-serif text-2xl font-bold text-[#651C32] tabular-nums">
              ₹{totalPrice}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-[#3B2118] hover:text-[#651C32] transition-colors"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-[#651C32] text-[#FFF8EC] hover:bg-[#521628] rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                Next Step
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2.5 bg-[#651C32] text-[#FFF8EC] hover:bg-[#521628] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C99A3D]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
