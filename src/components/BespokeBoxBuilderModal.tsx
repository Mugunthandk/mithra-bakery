import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BespokeBoxBuilderModal: React.FC = () => {
  const { isBespokeBoxOpen, setIsBespokeBoxOpen, addCustomBoxToCart } = useShop();

  const boxOptions = [
    { id: 'atelier-4', name: 'Atelier Royal 4-Tier Casket', slots: 4, basePrice: 650, desc: 'Velvet bound compact keepsake with gold inlay' },
    { id: 'heritage-6', name: 'Heritage Grand 6-Tier Casket', slots: 6, basePrice: 980, desc: 'Dual-tier gold-embossed box with magnetic closure' },
    { id: 'imperial-9', name: 'Imperial 9-Tier Keepsake Chest', slots: 9, basePrice: 1450, desc: 'Luxury handcrafted wooden trunk with velvet lining' },
  ];

  const confectionOptions = [
    'Kaju Katli (AAA Goan Cashew)',
    'Ghee Mysore Pak (Cow Ghee)',
    'Motichoor Ladoo (Kashmiri Kesar)',
    'Artisan Badam Halwa',
    'Kaju Pista Roll',
    'Tirunelveli Wheat Halwa',
    'Kesari Malai Peda',
    'Kolkata Sponge Rasgulla',
    'Triple Chocolate Fudgy Brownie',
    'Mullu Butter Murukku',
  ];

  const ribbonOptions = ['Imperial Gold', 'Royal Burgundy', 'Emerald Green', 'Blush Rose'];

  const [selectedBox, setSelectedBox] = useState(boxOptions[1]);
  const [selectedSweets, setSelectedSweets] = useState<string[]>([
    'Kaju Katli (AAA Goan Cashew)',
    'Ghee Mysore Pak (Cow Ghee)',
    'Motichoor Ladoo (Kashmiri Kesar)',
    'Artisan Badam Halwa',
    'Kaju Pista Roll',
    'Kesari Malai Peda',
  ]);
  const [ribbon, setRibbon] = useState<string>('Imperial Gold');
  const [giftNote, setGiftNote] = useState<string>('With warmest wishes and sweet blessings.');

  if (!isBespokeBoxOpen) return null;

  const toggleSweet = (sweet: string) => {
    if (selectedSweets.includes(sweet)) {
      setSelectedSweets(selectedSweets.filter(s => s !== sweet));
    } else {
      if (selectedSweets.length < selectedBox.slots) {
        setSelectedSweets([...selectedSweets, sweet]);
      }
    }
  };

  const handleBoxChange = (box: typeof boxOptions[0]) => {
    setSelectedBox(box);
    setSelectedSweets(confectionOptions.slice(0, box.slots));
  };

  const handleAddToCart = () => {
    addCustomBoxToCart({
      boxName: selectedBox.name,
      selectedSweets,
      ribbonColor: ribbon,
      giftNote,
      price: selectedBox.basePrice,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-2xl max-w-2xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#3B2118] text-[#FFF8EC] p-5 flex items-center justify-between border-b border-[#C99A3D]/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C99A3D]" />
            <div>
              <h3 className="font-serif text-xl font-bold">The Bespoke Box Pairing</h3>
              <p className="text-xs text-[#FFF8EC]/70">Curate an atelier tasting box filled with your favorite delicacies.</p>
            </div>
          </div>
          <button
            onClick={() => setIsBespokeBoxOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Step 1: Select Box Style */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#651C32] mb-2">
              1. Choose Casket Style &amp; Capacity
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {boxOptions.map((box) => (
                <div
                  key={box.id}
                  onClick={() => handleBoxChange(box)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedBox.id === box.id
                      ? 'bg-[#651C32]/5 border-[#651C32] ring-1 ring-[#651C32]'
                      : 'bg-white border-[#3B2118]/10 hover:border-[#C99A3D]'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-[#3B2118]">{box.name}</div>
                  <div className="text-xs font-semibold text-[#651C32] mt-0.5">₹{box.basePrice}</div>
                  <p className="text-[11px] text-[#3B2118]/70 mt-1">{box.slots} Confection Slots</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Confection Slots */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#651C32]">
                2. Select Exactly {selectedBox.slots} Confections
              </label>
              <span className="text-xs font-semibold text-[#3B2118]">
                {selectedSweets.length} / {selectedBox.slots} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {confectionOptions.map((sweet) => {
                const isSelected = selectedSweets.includes(sweet);
                return (
                  <button
                    key={sweet}
                    type="button"
                    onClick={() => toggleSweet(sweet)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-[#651C32] text-white border-[#651C32]'
                        : 'bg-white text-[#3B2118] border-[#3B2118]/10 hover:border-[#C99A3D]'
                    }`}
                  >
                    <span className="font-medium line-clamp-1">{sweet}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#C99A3D]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Ribbon & Calligraphy Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#651C32] mb-1.5">
                3. Satin Ribbon Finish
              </label>
              <select
                value={ribbon}
                onChange={(e) => setRibbon(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
              >
                {ribbonOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#651C32] mb-1.5">
                4. Calligraphy Inscription Note
              </label>
              <input
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="e.g. Wishing you prosperity and joy"
                className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FFF8EC] p-4 px-6 border-t border-[#3B2118]/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#3B2118]/60 block">Bespoke Box Total</span>
            <span className="font-serif text-2xl font-bold text-[#651C32] tabular-nums">
              ₹{selectedBox.basePrice}
            </span>
          </div>

          <button
            disabled={selectedSweets.length !== selectedBox.slots}
            onClick={handleAddToCart}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
              selectedSweets.length === selectedBox.slots
                ? 'bg-[#651C32] text-[#FFF8EC] hover:bg-[#521628]'
                : 'bg-[#3B2118]/20 text-[#3B2118]/40 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C99A3D]" />
            <span>Add Curated Box to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};
