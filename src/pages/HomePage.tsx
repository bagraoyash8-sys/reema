import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, HeartHandshake, Award, Compass, ArrowRight, Star, Tag, Gift, ChevronRight } from 'lucide-react';
import { HeroSearch } from '../components/HeroSearch';
import { HotelCard } from '../components/HotelCard';
import { MOCK_HOTELS } from '../data/mockHotels';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { Hotel, Destination } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface HomePageProps {
  onSearch: (params: any) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onNavigate: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearch, onSelectHotel, onNavigate }) => {
  const { formatAmount } = useCurrency();

  const handleDestinationClick = (dest: Destination) => {
    onSearch({
      destination: `${dest.city}, ${dest.country}`,
    });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Stage with Agoda-style Background */}
      <div className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Deep Teal/Slate Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Tropical travel background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold animate-fadeIn">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Over 2,000,000+ Verified Hotels & Stays Worldwide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['Outfit'] leading-tight">
            Find your sanctuary, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-300 to-teal-200">
              anywhere in the world.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Lock in guaranteed lowest rates on top-rated hotels, boutique stays, and custom trips with instant digital vouchers.
          </p>

          {/* Search Box Engine */}
          <div className="pt-4">
            <HeroSearch onSearch={onSearch} />
          </div>
        </div>
      </div>

      {/* 2. Flash Promo Coupon Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-3xl p-4 sm:p-5 shadow-xl text-slate-950 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-sm sm:text-base font-black tracking-tight uppercase">
                  Member Special Flash Offer
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-white font-bold">
                  20% OFF
                </span>
              </div>
              <p className="text-xs text-slate-900 font-medium mt-0.5">
                Use promo code <span className="font-mono font-extrabold bg-white/80 px-2 py-0.5 rounded text-slate-950">VOYARA20</span> at checkout for an instant discount up to $150!
              </p>
            </div>
          </div>

          <button
            onClick={() => onSearch({ destination: '' })}
            className="px-6 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 flex-shrink-0"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Popular Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Worldwide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Top Travel Destinations
            </h2>
          </div>
          <button
            onClick={() => onSearch({ destination: '' })}
            className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All ({POPULAR_DESTINATIONS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleDestinationClick(dest)}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-300 aspect-[4/5] bg-slate-900"
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {dest.country}
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    From {formatAmount(dest.averagePrice)}/nt
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {dest.city}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-medium">
                    {dest.tagline}
                  </p>
                  <div className="text-[11px] text-brand-300 font-bold mt-2">
                    {dest.propertyCount.toLocaleString()} properties available →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Custom Trip Planner Feature Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-brand-700/50 shadow-2xl relative overflow-hidden">
          {/* Background Decorative Shapes */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Feature • Custom Itinerary Builder</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] tracking-tight">
                Want to build your own custom travel plan?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Hand-pick your destination, vibe (Romantic, Beach Luxury, Adventure), select 5-star ocean suites or private pool villas, add curated excursions, and get an instant day-by-day itinerary with 15% custom bundle savings!
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('custom-planner')}
                  className="px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-400/20 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Customizing Your Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-amber-400 font-extrabold text-lg">1. Choose Vibe</div>
                <div className="text-xs text-slate-300">Romantic, Luxury, Trekking or Culture</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-amber-400 font-extrabold text-lg">2. Pick Stay</div>
                <div className="text-xs text-slate-300">5-Star Suites or Private Villas</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-amber-400 font-extrabold text-lg">3. Excursions</div>
                <div className="text-xs text-slate-300">Cruises, Volcano Hikes & Helipad</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-amber-400 font-extrabold text-lg">4. Instant Pass</div>
                <div className="text-xs text-slate-300">Digital Voucher + QR Code</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Featured Top-Rated Hotels & Stays */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Hand-Picked Stays</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Popular Stays
            </h2>
          </div>
          <button
            onClick={() => onSearch({ destination: '' })}
            className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>See All Hotels</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {MOCK_HOTELS.slice(0, 4).map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={(h) => onSelectHotel(h)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
