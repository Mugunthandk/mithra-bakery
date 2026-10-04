import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 bg-[#651C32] text-[#FFF8EC] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#C99A3D_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8EC]/10 border border-[#C99A3D]/30 text-[#C99A3D] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
          <span>The Confectioner's Gazette</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Stay Connected With Sweetness
        </h2>

        <p className="text-sm sm:text-base text-[#FFF8EC]/80 mt-3 max-w-xl mx-auto leading-relaxed">
          Receive private festival launch previews, seasonal cake arrivals, and secret tasting club privileges directly in your inbox.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-[#FFF8EC]/10 rounded-2xl border border-[#C99A3D]/40 max-w-md mx-auto flex items-center justify-center gap-2 text-sm text-[#C99A3D] font-bold">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>Welcome to the Mithra Connoisseurs Circle! Check your email for ₹100 gift token.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#3B2118]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#3B2118] text-xs placeholder:text-[#3B2118]/50 focus:outline-none focus:ring-2 focus:ring-[#C99A3D]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#C99A3D] hover:bg-[#b8892f] text-[#3B2118] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#FFF8EC]/60 mt-3">
          We respect your privacy. No spam, only pure sweet updates. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
