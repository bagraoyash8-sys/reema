import React from 'react';
import { Star, ThumbsUp, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { Hotel, Review } from '../types';
import { getRatingBadgeColor } from '../utils/formatters';

interface ReviewSectionProps {
  hotel: Hotel;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ hotel }) => {
  const scores = hotel.reviewScores;

  const scoreBars = [
    { label: 'Cleanliness', score: scores.cleanliness },
    { label: 'Comfort & Facilities', score: scores.comfort },
    { label: 'Location & Proximity', score: scores.location },
    { label: 'Staff & Concierge', score: scores.services },
    { label: 'Value for Money', score: scores.valueForMoney },
    { label: 'Free Wi-Fi Quality', score: scores.freeWifi },
  ];

  return (
    <div id="reviews-section" className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          Verified Guest Reviews
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          From {hotel.reviewCount.toLocaleString()} verified Voyara travelers who stayed at this property.
        </p>
      </div>

      {/* Aggregate Score Card */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Big Score (col 4) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left justify-center lg:border-r border-slate-200/80 lg:pr-8">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-md mb-3 ${getRatingBadgeColor(
              hotel.ratingScore
            )}`}
          >
            {hotel.ratingScore.toFixed(1)}
          </div>
          <span className="text-xl font-extrabold text-slate-900">{hotel.ratingText}</span>
          <span className="text-xs text-slate-500 mt-1">
            Based on {hotel.reviewCount.toLocaleString()} verified reviews
          </span>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-3 bg-emerald-100/70 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Real Travelers</span>
          </div>
        </div>

        {/* Right Category Bars (col 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {scoreBars.map((bar, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>{bar.label}</span>
                <span className="font-extrabold text-slate-900">{bar.score.toFixed(1)}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{ width: `${(bar.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Reviews List */}
      <div className="space-y-4">
        {hotel.reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{rev.author}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{rev.country}</span>
                    <span>•</span>
                    <span className="text-brand-700 font-medium">{rev.tripType}</span>
                    <span>•</span>
                    <span>Stayed in {rev.roomType}</span>
                  </div>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-xl text-xs font-black text-white ${getRatingBadgeColor(
                  rev.rating
                )}`}
              >
                {rev.rating.toFixed(1)}
              </div>
            </div>

            <div>
              <h5 className="font-extrabold text-slate-900 text-sm mb-1.5">{rev.title}</h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{rev.comment}</p>
            </div>

            {rev.positiveHighlight && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200/50 w-fit">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Highlight:</strong> {rev.positiveHighlight}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
