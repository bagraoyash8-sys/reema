import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { MOCK_HOTELS } from '../data/mockHotels';
import { HotelCard } from '../components/HotelCard';
import { Hotel } from '../types';

interface WishlistPageProps {
  onSelectHotel: (hotel: Hotel) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onSelectHotel, onNavigate }) => {
  const { wishlist } = useWishlist();

  const savedHotels = MOCK_HOTELS.filter((h) => wishlist.includes(h.id));

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit'] mt-1">
            My Wishlist ({savedHotels.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Hotels and luxury resorts you’ve saved for your future journeys.
          </p>
        </div>

        {savedHotels.length > 0 ? (
          <div className="space-y-6">
            {savedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onSelect={(h) => onSelectHotel(h)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Your wishlist is empty</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Tap the heart icon on any hotel or luxury villa to save it here for quick access later.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              Browse Luxury Stays
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
