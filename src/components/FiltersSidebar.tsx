import React from 'react';
import { Filter, RotateCcw, Star, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface FiltersSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalMatches,
}) => {
  const { formatAmount } = useCurrency();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      maxPrice: Number(e.target.value),
    });
  };

  const toggleStar = (star: number) => {
    const exists = filters.starRatings.includes(star);
    const updated = exists
      ? filters.starRatings.filter((s) => s !== star)
      : [...filters.starRatings, star];
    onFilterChange({ ...filters, starRatings: updated });
  };

  const togglePropertyType = (type: string) => {
    const exists = filters.propertyTypes.includes(type);
    const updated = exists
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type];
    onFilterChange({ ...filters, propertyTypes: updated });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: updated });
  };

  const propertyTypeOptions = [
    { label: 'Hotels', value: 'hotel' },
    { label: 'Luxury Resorts', value: 'resort' },
    { label: 'Private Villas', value: 'villa' },
    { label: 'Boutique Homestays', value: 'homestay' },
  ];

  const amenityOptions = [
    'Private Beach',
    'Swimming Pool',
    'Free High-Speed Wi-Fi',
    'Luxury Spa',
    'Fitness Center',
    'Free Airport Shuttle',
    'Pet Friendly',
    'Rooftop Sky Pool',
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-6">
      {/* Top Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-brand-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Filter Stays</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Max Nightly Rate</span>
          <span className="text-sm font-black text-brand-700 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200">
            Up to {formatAmount(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="600"
          step="10"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>{formatAmount(50)}</span>
          <span>{formatAmount(600)}+</span>
        </div>
      </div>

      {/* 2. Star Rating Filter */}
      <div className="pt-2 border-t border-slate-100">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Hotel Star Rating
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const isSelected = filters.starRatings.includes(star);
            return (
              <button
                key={star}
                type="button"
                onClick={() => toggleStar(star)}
                className={`py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-amber-300 text-slate-600'
                }`}
              >
                <span>{star}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Review Score */}
      <div className="pt-2 border-t border-slate-100">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Guest Review Score
        </span>
        <div className="space-y-1.5">
          {[
            { label: '9+ Exceptional', min: 9.0 },
            { label: '8+ Fabulous', min: 8.0 },
            { label: '7+ Very Good', min: 7.0 },
            { label: 'All Review Scores', min: 0 },
          ].map((item) => {
            const isSelected = filters.minRatingScore === item.min;
            return (
              <button
                key={item.min}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRatingScore: item.min })}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                  isSelected
                    ? 'bg-brand-50 text-brand-800 font-bold border border-brand-200'
                    : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {isSelected && <Check className="w-4 h-4 text-brand-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Property Types */}
      <div className="pt-2 border-t border-slate-100">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Property Type
        </span>
        <div className="space-y-2">
          {propertyTypeOptions.map((opt) => {
            const isChecked = filters.propertyTypes.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => togglePropertyType(opt.value)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Amenities Checkboxes */}
      <div className="pt-2 border-t border-slate-100">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Popular Facilities
        </span>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {amenityOptions.map((amenity) => {
            const isChecked = filters.amenities.some((a) =>
              amenity.toLowerCase().includes(a.toLowerCase())
            );
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 6. Special Policies */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Booking Policies
        </span>
        <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.freeCancellationOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, freeCancellationOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md"
          />
          <span className="font-semibold text-slate-900">Free Cancellation Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.breakfastIncludedOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, breakfastIncludedOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded-md"
          />
          <span className="font-semibold text-slate-900">Breakfast Included</span>
        </label>
      </div>

      {/* Active Count Banner */}
      <div className="p-3 bg-brand-50 rounded-2xl border border-brand-200 text-center">
        <span className="text-xs font-bold text-brand-900">
          Showing {totalMatches} properties match your filters
        </span>
      </div>
    </div>
  );
};
