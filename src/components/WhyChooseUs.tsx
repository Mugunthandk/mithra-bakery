import React from 'react';
import { Milk, Sparkles, ChefHat, PackageCheck, Truck, Heart } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Milk className="w-6 h-6 text-[#C99A3D]" />,
      title: 'Premium Ingredients',
      desc: 'Pure farm cow ghee, AAA Goan cashews, Californian almonds, and Belgian chocolate.',
    },
    {
      icon: <ChefHat className="w-6 h-6 text-[#C99A3D]" />,
      title: 'Generational Recipes',
      desc: 'Heritage culinary techniques preserved and refined over three decades of mastery.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#C99A3D]" />,
      title: 'Freshly Prepared Daily',
      desc: 'Prepared in limited artisan morning batches. Never frozen, never preserved.',
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-[#C99A3D]" />,
      title: 'Hygienic Packaging',
      desc: 'Food-grade tin caskets, aroma seals, and tamper-proof insulated outer boxes.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#C99A3D]" />,
      title: 'Same-Day Delivery',
      desc: 'Prompt doorstep dispatch across Karur, Coimbatore, Chennai, and Tiruppur.',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#C99A3D]" />,
      title: 'Crafted With Care',
      desc: 'Honest ingredients made with devotion to bring authentic happiness to your home.',
    },
  ];

  return (
    <section className="py-16 bg-[#FFFDF9] border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C99A3D] font-bold">The Mithra Standard</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118] mt-1">
            Why Our Patrons Choose Us
          </h2>
          <p className="text-sm text-[#3B2118]/70 mt-2">
            Every sweet, cake, and savory that leaves our kitchen carries our commitment to uncompromising purity.
          </p>
        </div>

        {/* 6 Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FFF8EC]/40 border border-[#3B2118]/10 hover:border-[#C99A3D] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center mb-4 border border-[#3B2118]/5">
                {pillar.icon}
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B2118]">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#3B2118]/70 mt-2 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
