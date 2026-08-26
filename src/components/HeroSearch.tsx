import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Users, MapPin, Building2, Palmtree, Home, Sparkles, ChevronDown, Plus, Minus } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { StorageService } from '../utils/storage';
import { formatDate, calculateNights } from '../utils/formatters';

interface HeroSearchProps {
  onSearch: (params: any) => void;
  compact?: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, compact = false }) => {
  const { searchParams, setSearchParams } = useBooking();

  const [destination, setDestination] = useState(searchParams.destination);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [adults, setAdults] = useState(searchParams.adults || 2);
  const [children, setChildren] = useState(searchParams.children || 0);
  const [rooms, setRooms] = useState(searchParams.rooms || 1);
  const [category, setCategory] = useState<'all' | 'hotel' | 'resort' | 'villa' | 'homestay'>('all');

  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const destRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(StorageService.getRecentSearches());
  }, []);

  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setIsDestinationOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nights = calculateNights(checkIn, checkOut);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalDest = destination.trim() || 'All Destinations';
    if (destination.trim()) {
      StorageService.addRecentSearch(destination.trim());
      setRecentSearches(StorageService.getRecentSearches());
    }

    const updated = {
      destination: finalDest === 'All Destinations' ? '' : finalDest,
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      rooms,
      category,
    };

    setSearchParams(updated);
    setIsDestinationOpen(false);
    setIsGuestsOpen(false);
    onSearch(updated);
  };

  const filteredDestinations = POPULAR_DESTINATIONS.filter(
    (d) =>
      d.city.toLowerCase().includes(destination.toLowerCase()) ||
      d.country.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className={`w-full ${compact ? 'max-w-7xl mx-auto' : 'max-w-5xl mx-auto'}`}>
      {/* Category Tabs */}
      {!compact && (
        <div className="flex items-center gap-2 mb-3 px-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              category === 'all'
                ? 'bg-white text-brand-700 shadow-md ring-2 ring-brand-500/30'
                : 'bg-white/70 hover:bg-white text-slate-700 backdrop-blur-sm'
            }`}
          >
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Hotels & Stays</span>
          </button>

          <button
            type="button"
            onClick={() => setCategory('homestay')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              category === 'homestay'
                ? 'bg-white text-brand-700 shadow-md ring-2 ring-brand-500/30'
                : 'bg-white/70 hover:bg-white text-slate-700 backdrop-blur-sm'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Boutique Homestays</span>
          </button>
        </div>
      )}

      {/* Main Search Container */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-100/80 ring-1 ring-slate-900/5">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-center">
          {/* 1. Destination Input */}
          <div ref={destRef} className="relative lg:col-span-4">
            <div
              onClick={() => setIsDestinationOpen(true)}
              className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 cursor-pointer transition-all focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20"
            >
              <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Destination or Property
                </span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setIsDestinationOpen(true);
                  }}
                  onFocus={() => setIsDestinationOpen(true)}
                  placeholder="Where are you dreaming to go?"
                  className="w-full bg-transparent text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none truncate"
                />
              </div>
            </div>

            {/* Destination Autocomplete Dropdown */}
            {isDestinationOpen && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-[420px] bg-white rounded-2xl shadow-modal border border-slate-100 p-4 z-50 animate-scaleUp">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Popular Destinations
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                  {filteredDestinations.length > 0 ? (
                    filteredDestinations.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setDestination(`${d.city}, ${d.country}`);
                          setIsDestinationOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-50/80 text-left transition-colors group"
                      >
                        <img
                          src={d.image}
                          alt={d.city}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-900 group-hover:text-brand-700">
                            {d.city}, {d.country}
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {d.propertyCount.toLocaleString()}+ properties from ${d.averagePrice}/night
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-slate-500 text-center">
                      No matching destinations found. Search for any worldwide city!
                    </div>
                  )}
                </div>

                {/* Recent Searches Tags */}
                {recentSearches.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-2">Recent Searches:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((rec, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setDestination(rec);
                            setIsDestinationOpen(false);
                          }}
                          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-brand-100 hover:text-brand-800 text-slate-700 text-xs font-medium transition-colors"
                        >
                          {rec}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Date Range Picker */}
          <div className="grid grid-cols-2 gap-2 lg:col-span-4">
            {/* Check In */}
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 cursor-pointer transition-all">
              <Calendar className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Check-in</span>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    const newCheckIn = e.target.value;
                    setCheckIn(newCheckIn);
                    if (newCheckIn >= checkOut) {
                      const nextDay = new Date(newCheckIn);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setCheckOut(nextDay.toISOString().split('T')[0]);
                    }
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 cursor-pointer transition-all">
              <Calendar className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Check-out</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded">
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. Guests & Rooms Selector */}
          <div ref={guestRef} className="relative lg:col-span-2">
            <div
              onClick={() => setIsGuestsOpen(!isGuestsOpen)}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 cursor-pointer transition-all"
            >
              <Users className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Guests & Rooms</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                  {adults + children} Guests, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Guests Popup Modal */}
            {isGuestsOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-modal border border-slate-100 p-5 z-50 space-y-4 animate-scaleUp">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Adults</div>
                    <div className="text-xs text-slate-500">Ages 18 or above</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center font-bold text-sm">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Children</div>
                    <div className="text-xs text-slate-500">Ages 0 to 17</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center font-bold text-sm">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Rooms</div>
                    <div className="text-xs text-slate-500">Number of rooms</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center font-bold text-sm">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestsOpen(false)}
                  className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* 4. Search Submit Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-teal-600 to-brand-700 hover:from-brand-700 hover:to-teal-800 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-brand-600/30 transition-all uppercase tracking-wider"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
