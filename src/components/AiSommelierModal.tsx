import React, { useState } from 'react';
import { X, Sparkles, Wand2, ShoppingBag, Check, ArrowRight, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../types';

export const AiSommelierModal: React.FC = () => {
  const { isAiSommelierOpen, setIsAiSommelierOpen, products, addToCart, setIsCartOpen } = useShop();

  const [occasion, setOccasion] = useState<string>('Diwali & Festive Gathering');
  const [dietary, setDietary] = useState<string>('100% Pure Cow Ghee & Eggless');
  const [budget, setBudget] = useState<string>('Mid-Tier (₹1,200 – ₹2,500)');
  const [guestCount, setGuestCount] = useState<string>('6 to 10 Patrons');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sommelierRecommendation, setSommelierRecommendation] = useState<{
    headline: string;
    rationale: string;
    curatedProductIds: string[];
    servingTip: string;
  } | null>(null);

  if (!isAiSommelierOpen) return null;

  const occasions = [
    'Diwali & Festive Gathering',
    'Auspicious Wedding & Return Gifts',
    'Milestone Birthday Celebration',
    'Corporate Executive Hamper',
    'Family Housewarming (Grihapravesham)',
    'Traditional Evening Tea / Filter Coffee Gathering',
  ];

  const dietaryOptions = [
    '100% Pure Cow Ghee & Eggless',
    'Strictly Eggless Pastries & Cakes',
    'Nut & Cashew Rich Heritage',
    'Light Sugar & Digestive Savouries',
  ];

  const handleGenerateRecommendations = async () => {
    setIsLoading(true);

    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const catalogSummary = products.map(p => `${p.id}: ${p.name} (${p.category}, ₹${p.price})`).join('; ');
        
        const prompt = `You are the master confectioner and culinary sommelier at Mithra Sweets & Bakery.
Patron Requirements:
- Occasion: ${occasion}
- Dietary Preferences: ${dietary}
- Guest Count: ${guestCount}
- Budget: ${budget}

Available Delicacies Catalog:
${catalogSummary}

Select exactly 3 or 4 complimentary products that create an exquisite harmonious pairing (balancing pure ghee sweets, crunchy savouries, fresh patisserie, or traditional brews).

Respond ONLY with valid JSON with this exact structure:
{
  "headline": "A short poetic title for this collection",
  "rationale": "2-3 sentences explaining why these specific flavours and textures harmonize for this occasion",
  "curatedProductIds": ["id1", "id2", "id3"],
  "servingTip": "A 1-sentence tip on ideal serving temperature or beverage pairing"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setSommelierRecommendation(parsed);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Gemini API call failed, using artisan sommelier rules:', err);
      }
    }

    // Graceful, intelligent rule-based sommelier engine:
    setTimeout(() => {
      let chosenIds: string[] = [];
      let headline = '';
      let rationale = '';
      let servingTip = '';

      if (occasion.includes('Birthday')) {
        chosenIds = ['rasmalai-cake', 'fudge-brownie', 'kaju-katli', 'special-mixture'];
        headline = 'Celebration Sweetness & Spice Suite';
        rationale = 'Combines the centerpiece Rasmalai saffron celebration cake with warm Belgian fudge brownies, balanced with savory Madras mixture for guests who enjoy a spicy crunch.';
        servingTip = 'Chill the Rasmalai cake for 30 minutes before slicing, and serve brownies warm with vanilla cream.';
      } else if (occasion.includes('Wedding') || occasion.includes('Corporate')) {
        chosenIds = ['imperial-gift-box', 'kaju-katli', 'ghee-mysore-pak', 'banana-chips'];
        headline = 'Imperial Royal Heritage Selection';
        rationale = 'Designed for distinguished presentations with gold-foil packed cashew katli, rich cow ghee Mysore pak, and vacuum-sealed Malabar banana chips.';
        servingTip = 'Pair with warm cardamom-infused Chikmagalur degree filter coffee.';
      } else if (occasion.includes('Tea') || occasion.includes('Coffee')) {
        chosenIds = ['filter-coffee', 'french-croissant', 'mullu-murukku', 'motichoor-ladoo'];
        headline = 'Afternoon Ateliers Connoisseur Pairing';
        rationale = 'The buttery 27-layer flaky croissant and crispy butter murukku complement the dark roast Chikmagalur coffee, finishing with melt-in-mouth saffron ladoos.';
        servingTip = 'Froth the filter coffee vigorously in brass dabara sets to develop a golden micro-foam.';
      } else {
        // Festive Diwali / Pongal / Default
        chosenIds = ['kaju-katli', 'ghee-mysore-pak', 'special-mixture', 'kesar-badam-milk'];
        headline = 'Auspicious Festive Joy Assortment';
        rationale = 'Traditional trio of AAA Goan cashew katli and fragrant village ghee Mysore pak, accompanied by spicy royal mixture and slow-steeped saffron almond milk.';
        servingTip = 'Serve sweets at room temperature to preserve the delicate aroma of pure cow ghee.';
      }

      setSommelierRecommendation({
        headline,
        rationale,
        curatedProductIds: chosenIds,
        servingTip,
      });
      setIsLoading(false);
    }, 600);
  };

  const recommendedProducts = sommelierRecommendation
    ? products.filter(p => sommelierRecommendation.curatedProductIds.includes(p.id))
    : [];

  const bundleTotal = recommendedProducts.reduce((sum, p) => sum + (p.variants[0]?.price || p.price), 0);

  const handleAddBundleToCart = () => {
    recommendedProducts.forEach(p => {
      addToCart(p, p.variants[0]?.label, 1);
    });
    setIsAiSommelierOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full border border-[#3B2118]/15 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#651C32] via-[#521628] to-[#3B2118] text-[#FFF8EC] p-6 flex items-center justify-between border-b border-[#C99A3D]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#C99A3D]/20 border border-[#C99A3D]/40 flex items-center justify-center text-[#C99A3D]">
              <Sparkles className="w-5 h-5 text-[#C99A3D]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Mithra AI Sweet Sommelier</h3>
              <p className="text-xs text-[#FFF8EC]/70">Intelligent celebration curation &amp; culinary flavour pairings</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiSommelierOpen(false)}
            className="p-1 rounded-lg text-[#FFF8EC]/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wizard Form & Results */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Step 1: Occasion & Preferences */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#651C32] tracking-wider mb-2">
                1. What is the Occasion?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => {
                      setOccasion(occ);
                      setSommelierRecommendation(null);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      occasion === occ
                        ? 'bg-[#651C32] text-white border-[#651C32] font-semibold shadow-xs'
                        : 'bg-white text-[#3B2118] border-[#3B2118]/15 hover:border-[#C99A3D]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs uppercase font-bold text-[#651C32] tracking-wider mb-1.5">
                  2. Dietary Focus
                </label>
                <select
                  value={dietary}
                  onChange={(e) => {
                    setDietary(e.target.value);
                    setSommelierRecommendation(null);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                >
                  {dietaryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#651C32] tracking-wider mb-1.5">
                  3. Approximate Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => {
                    setGuestCount(e.target.value);
                    setSommelierRecommendation(null);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs bg-white focus:outline-none focus:border-[#651C32]"
                >
                  <option>3 to 5 Patrons (Family Intimate)</option>
                  <option>6 to 10 Patrons</option>
                  <option>12 to 20 Patrons (Party / Office)</option>
                  <option>25+ Patrons (Grand Event)</option>
                </select>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateRecommendations}
                disabled={isLoading}
                className="w-full py-3 bg-[#651C32] hover:bg-[#521628] disabled:opacity-60 text-[#FFF8EC] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Wand2 className="w-4 h-4 text-[#C99A3D] animate-spin-slow" />
                <span>{isLoading ? 'Consulting Master Confectioner...' : 'Generate Sommelier Pairing'}</span>
              </button>
            </div>
          </div>

          {/* Results Box */}
          {sommelierRecommendation && (
            <div className="p-5 rounded-2xl bg-[#FFF8EC] border-2 border-[#C99A3D]/50 shadow-md space-y-4 animate-in fade-in-50 duration-300">
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#651C32] block">
                  Curated Pairing
                </span>
                <h4 className="font-serif font-bold text-xl text-[#3B2118] mt-0.5">
                  {sommelierRecommendation.headline}
                </h4>
                <p className="text-xs text-[#3B2118]/80 mt-1 leading-relaxed italic">
                  "{sommelierRecommendation.rationale}"
                </p>
              </div>

              {/* Curated Delicacies List */}
              <div className="space-y-2 pt-2 border-t border-[#3B2118]/10">
                <span className="text-[11px] uppercase font-bold text-[#3B2118]/60 tracking-wider block">
                  Included In This Curation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2.5 rounded-xl bg-white border border-[#3B2118]/10 flex items-center gap-2.5 shadow-2xs"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-serif font-bold text-xs text-[#3B2118] block truncate">
                          {prod.name}
                        </span>
                        <span className="text-[11px] font-semibold text-[#651C32] block">
                          ₹{prod.variants[0]?.price || prod.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sommelier Serving Tip */}
              {sommelierRecommendation.servingTip && (
                <div className="p-3 bg-white/80 rounded-xl border border-[#3B2118]/10 text-xs text-[#3B2118]/80 flex items-start gap-2">
                  <span className="text-base">💡</span>
                  <p>
                    <strong className="text-[#651C32]">Sommelier Note:</strong> {sommelierRecommendation.servingTip}
                  </p>
                </div>
              )}

              {/* Add All To Bag */}
              <div className="pt-2 flex items-center justify-between border-t border-[#3B2118]/10">
                <div>
                  <span className="text-[10px] text-[#3B2118]/60 block uppercase font-bold">Bundle Total</span>
                  <span className="font-serif font-bold text-xl text-[#651C32]">
                    ₹{bundleTotal}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  className="px-5 py-2.5 bg-[#C99A3D] hover:bg-[#b8892f] text-[#3B2118] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#3B2118]" />
                  <span>Add Pairing to Bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
