import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { STORES_DATA } from '../data/stores';

export const StoreLocator: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState(STORES_DATA[0]);

  return (
    <section id="stores-section" className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C99A3D] font-bold">Heritage Ateliers</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118] mt-1">
            Visit Our Stores 📍
          </h2>
          <p className="text-sm text-[#3B2118]/70 mt-2">
            Step into our boutique retail ateliers for live sweet tasting counters, warm filter coffee, and custom box curation.
          </p>
        </div>

        {/* Store Tabs and Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Store Location Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {STORES_DATA.map((store) => {
              const isSelected = selectedStore.id === store.id;
              return (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#651C32] text-[#FFF8EC] border-[#651C32] shadow-md'
                      : 'bg-white text-[#3B2118] border-[#3B2118]/10 hover:border-[#C99A3D]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif font-bold text-lg">{store.city}</span>
                    {store.isFlagship && (
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-[#C99A3D] text-[#3B2118]' : 'bg-[#651C32]/10 text-[#651C32]'
                      }`}>
                        Flagship Kitchen
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-sm font-semibold mb-1 opacity-90">{store.name}</h4>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? 'text-[#FFF8EC]/80' : 'text-[#3B2118]/70'}`}>
                    {store.address}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Store Showcase & Interactive Map Mockup */}
          <div className="lg:col-span-7 bg-[#FFF8EC]/50 rounded-3xl p-6 sm:p-8 border border-[#3B2118]/10">
            <div className="flex items-center justify-between border-b border-[#3B2118]/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C99A3D] font-bold block">
                  {selectedStore.city} Location
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3B2118]">
                  {selectedStore.name}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#651C32]/10 flex items-center justify-center text-[#651C32]">
                <MapPin className="w-5 h-5 text-[#651C32]" />
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C99A3D] shrink-0 mt-0.5" />
                <span className="text-[#3B2118]/80 leading-relaxed">{selectedStore.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C99A3D] shrink-0" />
                <span className="text-[#3B2118]/80 font-medium">{selectedStore.timing}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C99A3D] shrink-0" />
                <a href={`tel:${selectedStore.phone}`} className="text-[#651C32] font-semibold hover:underline">
                  {selectedStore.phone}
                </a>
              </div>
            </div>

            {/* Stylized Map View Visual */}
            <div className="rounded-2xl overflow-hidden border border-[#3B2118]/15 bg-white relative h-48 flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(#3B2118_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex p-3 rounded-full bg-[#651C32] text-white shadow-md">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm text-[#3B2118]">{selectedStore.name}</p>
                  <p className="text-xs text-[#3B2118]/60 mt-0.5">Live Google Maps Navigation &amp; Storefront Parking</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.name + ' ' + selectedStore.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#651C32] text-[#FFF8EC] hover:bg-[#521628] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C99A3D]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>

              <a
                href={`https://wa.me/919443218900?text=${encodeURIComponent(`Hi Mithra Team, I would like to inquire about stock at your ${selectedStore.city} store (${selectedStore.name}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white border border-[#3B2118]/20 hover:border-[#651C32] text-[#3B2118] text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <span>WhatsApp Store Manager</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
