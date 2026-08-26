import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, MapPin, Calendar, Users, Search, RotateCcw } from 'lucide-react';
import { HotelCard } from '../components/HotelCard';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { HeroSearch } from '../components/HeroSearch';
import { MOCK_HOTELS } from '../data/mockHotels';
import { Hotel, FilterState, SearchParams } from '../types';
import { useBooking } from '../context/BookingContext';
import { formatDate } from '../utils/formatters';

interface SearchResultsPageProps {
  onSelectHotel: (hotel: Hotel) => void;
  onModifySearch: (params: SearchParams) => void;
}

const initialFilters: FilterState = {
  minPrice: 0,
  maxPrice: 600,
  starRatings: [],
  minRatingScore: 0,
  propertyTypes: [],
  amenities: [],
  freeCancellationOnly: false,
  breakfastIncludedOnly: false,
  sortBy: 'recommended',
};

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  onSelectHotel,
  onModifySearch,
}) => {
  const { searchParams } = useBooking();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isModifySearchOpen, setIsModifySearchOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter((hotel) => {
      // 1. Destination / Query filter
      if (searchParams.destination && searchParams.destination.trim() !== '') {
        const query = searchParams.destination.toLowerCase();
        const matchesCity = hotel.city.toLowerCase().includes(query);
        const matchesCountry = hotel.country.toLowerCase().includes(query);
        const matchesName = hotel.name.toLowerCase().includes(query);
        if (!matchesCity && !matchesCountry && !matchesName) {
          // If query contains comma e.g. "Bali, Indonesia"
          const parts = query.split(',').map((p) => p.trim());
          const matchParts = parts.some(
            (p) => hotel.city.toLowerCase().includes(p) || hotel.country.toLowerCase().includes(p)
          );
          if (!matchParts) return false;
        }
      }

      // 2. Category filter
      if (searchParams.category && searchParams.category !== 'all') {
        if (hotel.category !== searchParams.category) return false;
      }

      // 3. Price filter
      if (hotel.pricePerNight > filters.maxPrice) return false;

      // 4. Star Rating filter
      if (filters.starRatings.length > 0 && !filters.starRatings.includes(hotel.starRating)) {
        return false;
      }

      // 5. Min Review Score
      if (filters.minRatingScore > 0 && hotel.ratingScore < filters.minRatingScore) {
        return false;
      }

      // 6. Property Types
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(hotel.category)) {
        return false;
      }

      // 7. Amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) =>
          hotel.amenities.some((ha) => ha.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      // 8. Policies
      if (filters.freeCancellationOnly && !hotel.freeCancellation) return false;
      if (filters.breakfastIncludedOnly && !hotel.hasBreakfast) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_low') return a.pricePerNight - b.pricePerNight;
      if (filters.sortBy === 'price_high') return b.pricePerNight - a.pricePerNight;
      if (filters.sortBy === 'rating_high') return b.ratingScore - a.ratingScore;
      if (filters.sortBy === 'distance_low') return a.distanceFromCenterKm - b.distanceFromCenterKm;
      return 0; // 'recommended' uses default priority
    });
  }, [searchParams, filters]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Top Search Recap Bar */}
      <div className="bg-slate-900 text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-800 sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-extrabold text-amber-400">
              <MapPin className="w-4 h-4" />
              <span>{searchParams.destination || 'All Destinations'}</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              <span>
                {formatDate(searchParams.checkIn)} — {formatDate(searchParams.checkOut)} ({searchParams.nights} Nights)
              </span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Users className="w-3.5 h-3.5 text-brand-400" />
              <span>{searchParams.adults + searchParams.children} Guests, {searchParams.rooms} Room</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModifySearchOpen(!isModifySearchOpen)}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isModifySearchOpen ? 'Hide Search Form' : 'Change Search'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Form Drawer */}
        {isModifySearchOpen && (
          <div className="mt-4 pt-4 border-t border-slate-800 max-w-7xl mx-auto animate-fadeIn">
            <HeroSearch
              compact
              onSearch={(params) => {
                onModifySearch(params);
                setIsModifySearchOpen(false);
              }}
            />
          </div>
        )}
      </div>

      {/* 2. Main Results Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Filters Sidebar (lg: col 4) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-40">
            <FiltersSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalMatches={filteredHotels.length}
            />
          </div>

          {/* Right Column: Results & Sort (lg: col 8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Sort & Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {searchParams.destination ? `Stays in ${searchParams.destination}` : 'All Available Stays'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong className="text-slate-800">{filteredHotels.length} properties</strong> match your criteria
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-500">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                    }
                    className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="recommended">Best Match / Recommended</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating_high">Highest Guest Rating (9+)</option>
                    <option value="distance_low">Closest to City Center</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hotel Cards List */}
            {filteredHotels.length > 0 ? (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onSelect={(h) => onSelectHotel(h)}
                  />
                ))}
              </div>
            ) : (
              /* No Results State */
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">No matching hotels found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  We couldn't find any stays matching all of your selected filters. Try broadening your price range or clearing some filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-6 overflow-y-auto animate-fadeIn lg:hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <h3 className="text-lg font-black text-slate-900">Filters</h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-xs font-bold text-slate-500"
            >
              Close
            </button>
          </div>
          <FiltersSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalMatches={filteredHotels.length}
          />
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full py-3.5 bg-brand-600 text-white font-extrabold text-sm rounded-2xl mt-6 shadow-lg shadow-brand-600/25"
          >
            Show {filteredHotels.length} Results
          </button>
        </div>
      )}
    </div>
  );
};
