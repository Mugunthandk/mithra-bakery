import React, { useState } from 'react';
import { Star, CheckCircle, Plus } from 'lucide-react';
import { REVIEWS_DATA } from '../data/stores';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(REVIEWS_DATA);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [product, setProduct] = useState<string>('Kaju Katli');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name,
      location: city || 'Tamil Nadu',
      rating,
      comment,
      productName: product,
      date: 'Just now',
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setShowModal(false);
    setName('');
    setComment('');
  };

  return (
    <section className="py-16 bg-[#FFF8EC]/20 border-b border-[#3B2118]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C99A3D] font-bold">Chronicles From Our Patrons</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2118] mt-1">
              Loved By Thousands ❤️
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-[#C99A3D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#3B2118]">4.9 out of 5</span>
              <span className="text-xs text-[#3B2118]/60">· Based on 2,500+ verified orders</span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl border border-[#651C32] text-[#651C32] hover:bg-[#651C32] hover:text-[#FFF8EC] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#3B2118]/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#C99A3D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#3B2118]/50">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#3B2118]/80 italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#3B2118]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#3B2118]">{rev.name}</h4>
                    <p className="text-[11px] text-[#3B2118]/60">{rev.location}</p>
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-[#C99A3D] font-medium mt-1 truncate">
                  Ordered: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#3B2118]/20">
              <h3 className="font-serif text-xl font-bold text-[#3B2118] mb-1">Share Your Experience</h3>
              <p className="text-xs text-[#3B2118]/70 mb-4">Your honest feedback helps us maintain authentic purity.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1.5 rounded-lg border text-sm ${
                          rating >= star ? 'bg-[#FFF8EC] border-[#C99A3D] text-[#C99A3D]' : 'border-gray-200 text-gray-400'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${rating >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya R."
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Coimbatore"
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Product Enjoyed</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g. Kaju Katli / Rasmalai Cake"
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2118] mb-1">Review</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the freshness, taste, and packaging..."
                    className="w-full px-3 py-2 rounded-xl border border-[#3B2118]/20 text-xs focus:outline-none focus:border-[#651C32]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#3B2118]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#651C32] text-[#FFF8EC] rounded-xl text-xs font-bold hover:bg-[#521628]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
