import React, { useState } from 'react';
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, Check, Sparkles, ShieldCheck, Coffee } from 'lucide-react';
import { Hotel } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { getRatingBadgeColor } from '../utils/formatters';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  const { formatAmount } = useCurrency();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const favorited = isWishlisted(hotel.id);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  return (
    <div
      onClick={() => onSelect(hotel)}
      className="group bg-white rounded-3xl border border-slate-200/90 hover:border-brand-500/50 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row"
    >
      {/* 1. Left: Image Gallery Carousel */}
      <div className="relative w-full md:w-80 lg:w-96 h-64 md:h-auto flex-shrink-0 overflow-hidden bg-slate-900">
        <img
          src={hotel.images[currentImageIndex] || hotel.coverImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(hotel.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center shadow-md transition-transform active:scale-90 z-10"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              favorited ? 'text-rose-500 fill-rose-500' : 'text-slate-700 hover:text-rose-500'
            }`}
          />
        </button>

        {/* Featured Badge */}
        {hotel.featuredBadge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hotel.featuredBadge}</span>
          </div>
        )}

        {/* Image Nav Arrows */}
        {hotel.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={prevImage}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {hotel.images.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentImageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Middle & Right Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header Row: Stars, Category & Review Score */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                  {hotel.category}
                </span>
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1">
                {hotel.name}
              </h3>
            </div>

            {/* Agoda-style Review Badge */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-slate-900">{hotel.ratingText}</span>
                <span className="block text-[10px] text-slate-500">{hotel.reviewCount.toLocaleString()} reviews</span>
              </div>
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${getRatingBadgeColor(
                  hotel.ratingScore
                )}`}
              >
                {hotel.ratingScore.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Location & Landmark */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
            <span className="font-medium text-slate-700">{hotel.city}, {hotel.country}</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">{hotel.landmark}</span>
          </div>

          {/* Key Perks Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.hasBreakfast && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <Coffee className="w-3 h-3 text-emerald-600" />
                <span>Free Breakfast Included</span>
              </span>
            )}
            {hotel.freeCancellation && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                <ShieldCheck className="w-3 h-3 text-teal-600" />
                <span>Free Cancellation</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Check className="w-3 h-3 text-slate-500" />
              <span>Free Wi-Fi</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mb-4">
            {hotel.description}
          </p>
        </div>

        {/* Bottom Row: Pricing and CTA */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 line-through font-medium">
                {formatAmount(hotel.originalPricePerNight)}
              </span>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                SAVE {hotel.discountPercentage}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">
                {formatAmount(hotel.pricePerNight)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ night</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Includes taxes & service fees • No hidden charges
            </span>
          </div>

          <button
            type="button"
            className="py-3 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 group-hover:scale-105 transition-all text-center"
          >
            View Available Rooms
          </button>
        </div>
      </div>
    </div>
  );
};
