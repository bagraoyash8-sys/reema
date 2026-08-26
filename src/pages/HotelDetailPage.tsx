import React, { useState } from 'react';
import { Star, MapPin, Heart, Share2, ShieldCheck, Sparkles, Coffee, Wifi, Dumbbell, Waves, UtensilsCrossed, Car, Image, ChevronRight, Check } from 'lucide-react';
import { Hotel, Room } from '../types';
import { useBooking } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { RoomMatrix } from '../components/RoomMatrix';
import { ReviewSection } from '../components/ReviewSection';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal';
import { getRatingBadgeColor } from '../utils/formatters';

interface HotelDetailPageProps {
  hotel: Hotel;
  onBookRoom: (hotel: Hotel, room: Room, quantity: number) => void;
  onBackToSearch: () => void;
}

export const HotelDetailPage: React.FC<HotelDetailPageProps> = ({
  hotel,
  onBookRoom,
  onBackToSearch,
}) => {
  const { searchParams } = useBooking();
  const { formatAmount } = useCurrency();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  const favorited = isWishlisted(hotel.id);

  const openGalleryAt = (idx: number) => {
    setGalleryInitialIndex(idx);
    setIsGalleryOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <button onClick={onBackToSearch} className="hover:text-brand-600 font-semibold">
              Search Results
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{hotel.country}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{hotel.city}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-slate-900 truncate">{hotel.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(hotel.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorited ? 'Saved to Wishlist' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Hotel Title & Review Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-lg border border-brand-200">
                {hotel.category}
              </span>
              <div className="flex items-center text-amber-500">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              {hotel.featuredBadge && (
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{hotel.featuredBadge}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              {hotel.name}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{hotel.tagline}</p>

            <div className="flex items-center gap-2 text-xs text-slate-600 mt-3">
              <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
              <span className="text-slate-300">•</span>
              <span className="text-brand-700 font-bold">{hotel.landmark}</span>
            </div>
          </div>

          {/* Big Score Pill */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
            <div className="text-right">
              <span className="block text-sm font-black text-slate-900">{hotel.ratingText}</span>
              <span className="block text-xs text-slate-500">
                {hotel.reviewCount.toLocaleString()} verified reviews
              </span>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-sm ${getRatingBadgeColor(
                hotel.ratingScore
              )}`}
            >
              {hotel.ratingScore.toFixed(1)}
            </div>
          </div>
        </div>

        {/* 2. Agoda-style Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-card mb-8">
          {/* Main Large Hero Image (col 2) */}
          <div
            onClick={() => openGalleryAt(0)}
            className="md:col-span-2 relative h-72 sm:h-96 cursor-pointer group overflow-hidden bg-slate-900"
          >
            <img
              src={hotel.images[0] || hotel.coverImage}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* 4 Smaller Grid Thumbnails (col 2) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3">
            {hotel.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => openGalleryAt(idx + 1)}
                className="relative h-44 sm:h-[186px] cursor-pointer group overflow-hidden rounded-xl bg-slate-900"
              >
                <img
                  src={img}
                  alt={`${hotel.name} photo ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {idx === 3 && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-2 group-hover:bg-slate-950/80 transition-colors">
                    <Image className="w-6 h-6 mb-1 text-amber-400" />
                    <span className="font-extrabold text-sm">View All Photos</span>
                    <span className="text-[10px] text-slate-300">({hotel.images.length} HD photos)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Sticky Subnav & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content (lg: col 8) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Highlights Section */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900">Property Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hotel.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100 text-slate-800 text-xs font-bold"
                  >
                    <div className="w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  About this Property
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{hotel.description}</p>
              </div>

              {/* All Amenities Pills */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Facilities & Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
                    >
                      <Check className="w-3.5 h-3.5 text-brand-600" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Matrix Comparison Table */}
            <RoomMatrix
              hotel={hotel}
              nights={searchParams.nights}
              onSelectRoom={(room, qty) => onBookRoom(hotel, room, qty)}
            />

            {/* Verified Reviews Section */}
            <ReviewSection hotel={hotel} />
          </div>

          {/* Right Sticky Card (lg: col 4) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Starting nightly price
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900 font-['Outfit']">
                    {formatAmount(hotel.pricePerNight)}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/ night</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Includes all taxes & fees • Free cancellation available
                </span>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-900 font-extrabold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Special Flash Discount Available</span>
                </div>
                <p className="text-amber-800">
                  Use coupon code <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded">VOYARA20</span> at checkout for 20% off!
                </p>
              </div>

              <a
                href="#rooms-section"
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 text-center block uppercase tracking-wider transition-all active:scale-98"
              >
                Select Room & View Rates
              </a>

              {/* Nearby Attractions */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Nearby Attractions
                </h4>
                <div className="space-y-2">
                  {hotel.nearbyAttractions.map((att, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-slate-600">
                      <span className="truncate">{att.name}</span>
                      <span className="font-bold text-slate-900">{att.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={hotel.images}
        hotelName={hotel.name}
        initialIndex={galleryInitialIndex}
      />
    </div>
  );
};
