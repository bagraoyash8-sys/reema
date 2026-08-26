import React, { useState, useMemo } from 'react';
import { 
  Compass, Sparkles, MapPin, Calendar, Users, Clock, Check, Plus, 
  Minus, Heart, Mountain, Palmtree, UtensilsCrossed, ShieldCheck, 
  Car, Camera, CheckCircle2, ArrowRight, Printer, Share2, DollarSign, 
  HelpCircle, ChevronRight, Layers, Tag, Building2
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { TRAVEL_STYLES, ACCOMMODATION_TIERS, CUSTOM_ACTIVITIES, CUSTOM_ADDONS } from '../data/customTripData';
import { MOCK_HOTELS } from '../data/mockHotels';
import { CustomActivity, CustomTripPlan, Destination, Hotel } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useBooking } from '../context/BookingContext';
import { formatDate } from '../utils/formatters';

interface CustomTripPlannerPageProps {
  onBookCustomPackage: (hotel: Hotel, plan: CustomTripPlan) => void;
  onNavigate: (page: string) => void;
}

export const CustomTripPlannerPage: React.FC<CustomTripPlannerPageProps> = ({
  onBookCustomPackage,
  onNavigate,
}) => {
  const { formatAmount } = useCurrency();
  const { initiateBooking } = useBooking();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedDestination, setSelectedDestination] = useState<Destination>(POPULAR_DESTINATIONS[0]);
  const [selectedStyle, setSelectedStyle] = useState(TRAVEL_STYLES[0].title);
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );
  const [selectedTier, setSelectedTier] = useState(ACCOMMODATION_TIERS[0].id);

  // Activities selection (default to top activities for selected destination)
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>(() => {
    const destActs = CUSTOM_ACTIVITIES.filter((a) => a.destinationId === 'bali').map((a) => a.id);
    return destActs.slice(0, 2);
  });

  // Addons selection
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon-transfer', 'addon-spa']);

  // Handle destination change
  const handleDestinationChange = (dest: Destination) => {
    setSelectedDestination(dest);
    const destActs = CUSTOM_ACTIVITIES.filter(
      (a) => a.destinationId === dest.id || a.destinationId === dest.city.toLowerCase()
    ).map((a) => a.id);
    setSelectedActivityIds(destActs.slice(0, 2));
  };

  const toggleActivity = (actId: string) => {
    setSelectedActivityIds((prev) =>
      prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    );
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Destination-specific activities
  const destinationActivities = useMemo(() => {
    const directMatches = CUSTOM_ACTIVITIES.filter(
      (a) =>
        a.destinationId === selectedDestination.id ||
        a.destinationId === selectedDestination.city.toLowerCase()
    );
    return directMatches.length > 0 ? directMatches : CUSTOM_ACTIVITIES.slice(0, 4);
  }, [selectedDestination]);

  // Selected tier info
  const tierInfo = ACCOMMODATION_TIERS.find((t) => t.id === selectedTier) || ACCOMMODATION_TIERS[0];

  // Pricing calculations
  const totalStayCost = tierInfo.pricePerNight * durationDays;
  const selectedActivitiesList = CUSTOM_ACTIVITIES.filter((a) => selectedActivityIds.includes(a.id));
  const totalActivitiesCost = selectedActivitiesList.reduce(
    (sum, a) => sum + a.pricePerPerson * travelersCount,
    0
  );
  const selectedAddonsList = CUSTOM_ADDONS.filter((ad) => selectedAddonIds.includes(ad.id));
  const totalAddonsCost = selectedAddonsList.reduce(
    (sum, ad) => sum + ad.pricePerDay * durationDays,
    0
  );
  const subtotalCost = totalStayCost + totalActivitiesCost + totalAddonsCost;
  const customPackageDiscount = Math.round(subtotalCost * 0.15); // 15% bespoke bundle discount
  const finalPackagePrice = subtotalCost - customPackageDiscount;

  // Build Day-by-Day timeline
  const itineraryDays = useMemo(() => {
    const days = [];
    for (let i = 1; i <= durationDays; i++) {
      let dayTitle = `Day ${i}: Relax & Discover ${selectedDestination.city}`;
      let dayDesc = `Enjoy leisure time at your ${tierInfo.title.toLowerCase()}, tropical breakfast, and sunset views.`;
      const dayActivities: CustomActivity[] = [];

      if (i === 1) {
        dayTitle = `Day 1: VIP Arrival in ${selectedDestination.city} & Welcome Drinks`;
        dayDesc = `Private airport chauffeur transfer to your accommodation. Evening welcome dinner with ocean views.`;
      } else if (i === durationDays) {
        dayTitle = `Day ${i}: Farewell Breakfast & Departure`;
        dayDesc = `Relaxing morning spa session, souvenir shopping, and private chauffeur transfer back to the airport.`;
      } else {
        const actIndex = (i - 2) % selectedActivitiesList.length;
        if (selectedActivitiesList[actIndex]) {
          dayActivities.push(selectedActivitiesList[actIndex]);
          dayTitle = `Day ${i}: ${selectedActivitiesList[actIndex].title}`;
          dayDesc = selectedActivitiesList[actIndex].description;
        }
      }

      days.push({
        dayNumber: i,
        title: dayTitle,
        description: dayDesc,
        activities: dayActivities,
        mealsIncluded: ['Gourmet Breakfast', i === 1 ? 'Welcome Dinner' : 'Afternoon Refreshments'],
      });
    }
    return days;
  }, [durationDays, selectedDestination, tierInfo, selectedActivitiesList]);

  // Handle Book Custom Package
  const handleProceedToBooking = () => {
    // Find matching hotel or fallback
    const matchingHotel =
      MOCK_HOTELS.find((h) => h.city.toLowerCase() === selectedDestination.city.toLowerCase()) ||
      MOCK_HOTELS[0];

    const plan: CustomTripPlan = {
      destinationId: selectedDestination.id,
      destinationName: `${selectedDestination.city}, ${selectedDestination.country}`,
      travelStyle: selectedStyle as any,
      startDate,
      durationDays,
      travelersCount,
      accommodationTier: selectedTier as any,
      selectedActivities: selectedActivitiesList,
      selectedAddons: selectedAddonsList,
      totalPriceUSD: finalPackagePrice,
    };

    onBookCustomPackage(matchingHotel, plan);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Voyara Custom Trip Studio</span>
            </div>
            <h1 className="text-2xl sm:text-5xl font-black font-['Outfit'] tracking-tight">
              Design Your Dream Travel Plan
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Customize every detail of your journey: choose your travel vibe, hand-pick 5-star suites or private pool villas, add curated excursions, and enjoy 15% bundle savings.
            </p>
          </div>
        </div>

        {/* 5-Step Interactive Wizard Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
          {[
            { num: 1, title: '1. Destination & Vibe' },
            { num: 2, title: '2. Stay & Hotel Tier' },
            { num: 3, title: '3. Experiences & Activities' },
            { num: 4, title: '4. Add-ons & Perks' },
            { num: 5, title: '5. Generated Itinerary' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex-shrink-0 transition-all ${
                activeStep === s.num
                  ? 'bg-brand-600 text-white shadow-md'
                  : activeStep > s.num
                  ? 'bg-brand-50 text-brand-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Main 2-Column Grid: Step Content (col 8) + Live Budget Card (col 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Step Form Screens (lg: col 8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* STEP 1: Destination & Travel Vibe */}
            {activeStep === 1 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Step 1: Choose Destination & Travel Style
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select where you want to go and the vibe of your bespoke getaway.
                  </p>
                </div>

                {/* Destination Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Select Destination
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {POPULAR_DESTINATIONS.map((dest) => {
                      const isSelected = selectedDestination.id === dest.id;
                      return (
                        <div
                          key={dest.id}
                          onClick={() => handleDestinationChange(dest)}
                          className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                            isSelected
                              ? 'border-brand-600 ring-2 ring-brand-500/30 scale-[1.02]'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={dest.image}
                            alt={dest.city}
                            className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="p-2.5 bg-white">
                            <div className="font-extrabold text-xs text-slate-900">{dest.city}</div>
                            <div className="text-[10px] text-slate-500">{dest.country}</div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Travel Style / Vibe */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Select Your Travel Vibe
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRAVEL_STYLES.map((style) => {
                      const isSelected = selectedStyle === style.title;
                      return (
                        <div
                          key={style.id}
                          onClick={() => setSelectedStyle(style.title)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-slate-900">{style.title}</h4>
                              {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{style.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Duration & Travelers Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                    />
                  </div>

                  {/* Duration Days */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Trip Duration</label>
                    <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        disabled={durationDays <= 3}
                        onClick={() => setDurationDays(Math.max(3, durationDays - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-xs text-slate-900">
                        {durationDays} Days / {durationDays - 1} Nts
                      </span>
                      <button
                        type="button"
                        onClick={() => setDurationDays(durationDays + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Travelers Count */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Travelers</label>
                    <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        disabled={travelersCount <= 1}
                        onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-xs text-slate-900">
                        {travelersCount} {travelersCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelersCount(travelersCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-600/25"
                  >
                    <span>Next: Select Accommodation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Stay & Accommodation Tier */}
            {activeStep === 2 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Step 2: Choose Accommodation Tier
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your preferred style of stay in {selectedDestination.city}.
                  </p>
                </div>

                <div className="space-y-4">
                  {ACCOMMODATION_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`rounded-3xl border-2 overflow-hidden cursor-pointer transition-all flex flex-col sm:flex-row ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/40 ring-2 ring-brand-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img
                          src={tier.image}
                          alt={tier.title}
                          className="w-full sm:w-48 h-40 object-cover flex-shrink-0"
                        />
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                {tier.badge}
                              </span>
                              <div className="text-right">
                                <span className="text-lg font-black text-slate-900">
                                  {formatAmount(tier.pricePerNight)}
                                </span>
                                <span className="text-xs text-slate-500 font-medium"> / night</span>
                              </div>
                            </div>

                            <h3 className="text-base font-extrabold text-slate-900 mt-2">{tier.title}</h3>
                            <p className="text-xs text-slate-600 mt-1">{tier.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3 text-xs text-slate-500">
                            <span>Includes daily gourmet breakfast & spa credits</span>
                            {isSelected ? (
                              <span className="font-bold text-brand-700 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Selected
                              </span>
                            ) : (
                              <span className="font-semibold text-slate-400">Click to Select</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Destination
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-600/25"
                  >
                    <span>Next: Select Experiences</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Curated Custom Activities */}
            {activeStep === 3 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Step 3: Hand-Pick Daily Excursions
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select the bespoke activities you’d like woven into your {selectedDestination.city} itinerary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinationActivities.map((act) => {
                    const isSelected = selectedActivityIds.includes(act.id);
                    return (
                      <div
                        key={act.id}
                        onClick={() => toggleActivity(act.id)}
                        className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="relative h-40">
                          <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-white font-bold text-[10px] uppercase">
                            {act.category}
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                            {formatAmount(act.pricePerPerson)} / person
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{act.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{act.description}</p>
                          </div>

                          <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                            {act.includedPerks.map((p, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-brand-600 flex-shrink-0" />
                                <span>{p}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                                isSelected
                                  ? 'bg-brand-600 text-white'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isSelected ? '✓ Added to Custom Plan' : '+ Add to Itinerary'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Stay
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-600/25"
                  >
                    <span>Next: Add Travel Perks</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Add-ons & Concierge Perks */}
            {activeStep === 4 && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Step 4: Concierge & Travel Perks
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Elevate your trip with comfortable private transport, daily wellness, and dedicated local guides.
                  </p>
                </div>

                <div className="space-y-3">
                  {CUSTOM_ADDONS.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">{addon.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{addon.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-right">
                            <span className="text-sm font-black text-slate-900">
                              {formatAmount(addon.pricePerDay)}
                            </span>
                            <span className="text-[10px] text-slate-400 block">/ day</span>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-brand-600 text-white' : 'border border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Experiences
                  </button>
                  <button
                    onClick={() => setActiveStep(5)}
                    className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-600/25"
                  >
                    <span>Generate Custom Itinerary</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Generated Day-by-Day Itinerary Preview */}
            {activeStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Bespoke Itinerary Generated</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                        {durationDays}-Day {selectedStyle} in {selectedDestination.city}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Starting {formatDate(startDate)} for {travelersCount} {travelersCount === 1 ? 'Guest' : 'Guests'} • {tierInfo.title}
                      </p>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 self-start"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Itinerary</span>
                    </button>
                  </div>

                  {/* Timeline Days List */}
                  <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-brand-200">
                    {itineraryDays.map((day) => (
                      <div key={day.dayNumber} className="relative pl-12">
                        {/* Circle bullet */}
                        <div className="absolute left-2.5 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                          {day.dayNumber}
                        </div>

                        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-3">
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900">{day.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>

                          {/* Day Activities Badges */}
                          {day.activities.length > 0 && (
                            <div className="pt-2 border-t border-slate-200/60">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                                Included Highlights:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {day.activities.map((act) => (
                                  <div
                                    key={act.id}
                                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold"
                                  >
                                    <img src={act.image} alt={act.title} className="w-8 h-8 rounded-lg object-cover" />
                                    <span>{act.title}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
                            <span>Included: {day.mealsIncluded.join(' • ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Real-time Custom Package Breakdown Table */}
                  <div className="bg-white rounded-2xl border-2 border-brand-500/20 p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                          Real-Time Price Itemization
                        </span>
                        <h4 className="text-lg font-black text-slate-900 mt-1">Package Budget Summary</h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        15% Bundle Discount Applied
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Stay */}
                      <div className="flex justify-between items-center text-slate-700">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-brand-600" />
                          <span>
                            <strong>{tierInfo.title}</strong> ({durationDays} nights × {formatAmount(tierInfo.pricePerNight)}/nt)
                          </span>
                        </div>
                        <span className="font-bold text-slate-900">{formatAmount(totalStayCost)}</span>
                      </div>

                      {/* Excursions */}
                      {selectedActivitiesList.length > 0 && (
                        <div className="space-y-1.5 pl-6 border-l-2 border-brand-100">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Selected Excursions ({selectedActivitiesList.length} items for {travelersCount} {travelersCount === 1 ? 'traveler' : 'travelers'}):
                          </span>
                          {selectedActivitiesList.map((act) => (
                            <div key={act.id} className="flex justify-between text-slate-600 text-[11px]">
                              <span>• {act.title} ({formatAmount(act.pricePerPerson)} × {travelersCount})</span>
                              <span className="font-semibold">{formatAmount(act.pricePerPerson * travelersCount)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add-ons */}
                      {selectedAddonsList.length > 0 && (
                        <div className="space-y-1.5 pl-6 border-l-2 border-brand-100">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Concierge Perks ({selectedAddonsList.length} items for {durationDays} days):
                          </span>
                          {selectedAddonsList.map((addon) => (
                            <div key={addon.id} className="flex justify-between text-slate-600 text-[11px]">
                              <span>• {addon.name} ({formatAmount(addon.pricePerDay)}/day × {durationDays} days)</span>
                              <span className="font-semibold">{formatAmount(addon.pricePerDay * durationDays)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Subtotal & Discount */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <div className="flex justify-between text-slate-500">
                          <span>Standard Subtotal:</span>
                          <span className="font-semibold">{formatAmount(subtotalCost)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Voyara Custom Bundle Savings (15%):</span>
                          <span>-{formatAmount(customPackageDiscount)}</span>
                        </div>
                      </div>

                      {/* Final Net Total */}
                      <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                        <div>
                          <span className="text-sm font-black text-slate-900 block">Total Net Package Price:</span>
                          <span className="text-[11px] text-slate-500 font-medium">Includes all taxes, accommodation, excursions & perks</span>
                        </div>
                        <span className="text-3xl font-black text-brand-700 font-['Outfit']">
                          {formatAmount(finalPackagePrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      ← Modify Plan Parameters
                    </button>

                    <button
                      onClick={handleProceedToBooking}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-extrabold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
                    >
                      <span>Book Complete Custom Package ({formatAmount(finalPackagePrice)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Live Dynamic Budget & Cost Card (lg: col 4) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Custom Trip Estimate</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
                  {selectedDestination.city} Bespoke Plan
                </h3>
                <span className="text-xs text-slate-500">
                  {durationDays} Days • {travelersCount} {travelersCount === 1 ? 'Guest' : 'Guests'} • {selectedStyle}
                </span>
              </div>

              {/* Cost Itemization */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                {/* Stay */}
                <div className="flex justify-between items-center text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800 block">Accommodation:</span>
                    <span className="text-[11px] text-slate-400">{tierInfo.title} ({durationDays} nights)</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatAmount(totalStayCost)}</span>
                </div>

                {/* Activities */}
                <div className="flex justify-between items-center text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800 block">Excursions ({selectedActivitiesList.length}):</span>
                    <span className="text-[11px] text-slate-400">For {travelersCount} travelers</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatAmount(totalActivitiesCost)}</span>
                </div>

                {/* VIP Addons */}
                <div className="flex justify-between items-center text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800 block">VIP Perks ({selectedAddonsList.length}):</span>
                    <span className="text-[11px] text-slate-400">Transfers, Spa, Concierge</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatAmount(totalAddonsCost)}</span>
                </div>

                {/* Bundle Savings */}
                <div className="flex justify-between items-center text-emerald-700 font-bold pt-2 border-t border-slate-100">
                  <span>Custom Bundle Savings (15%):</span>
                  <span>-{formatAmount(customPackageDiscount)}</span>
                </div>

                {/* Final Total */}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-slate-900">Total Package:</span>
                  <span className="text-3xl font-black text-slate-900 font-['Outfit']">
                    {formatAmount(finalPackagePrice)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {activeStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((activeStep + 1) as any)}
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
                >
                  <span>Continue to Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleProceedToBooking}
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
                >
                  <span>Book Custom Plan Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="text-[11px] text-slate-400 text-center space-y-1">
                <p>✓ Free 24h Cancellation Guarantee</p>
                <p>✓ Instant QR Travel Pass Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
