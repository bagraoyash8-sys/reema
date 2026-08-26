import React, { useState } from 'react';
import { Users, Bed, Maximize2, Coffee, ShieldCheck, Check, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { Hotel, Room } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface RoomMatrixProps {
  hotel: Hotel;
  nights: number;
  onSelectRoom: (room: Room, quantity: number) => void;
}

export const RoomMatrix: React.FC<RoomMatrixProps> = ({ hotel, nights, onSelectRoom }) => {
  const { formatAmount } = useCurrency();
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (roomId: string, qty: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [roomId]: qty,
    }));
  };

  return (
    <div id="rooms-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Available Rooms & Suites
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Rates shown for <span className="font-bold text-slate-800">{nights} {nights === 1 ? 'Night' : 'Nights'}</span> stay. All taxes and fees included.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Voyara Price Match Guarantee</span>
        </div>
      </div>

      {/* Room Matrix Cards */}
      <div className="space-y-6">
        {hotel.rooms.map((room) => {
          const qty = selectedQuantities[room.id] || 1;
          const totalRoomPrice = room.pricePerNight * nights * qty;
          const originalTotalPrice = (room.originalPricePerNight || room.pricePerNight * 1.3) * nights * qty;

          return (
            <div
              key={room.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-brand-400/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* 1. Room Image & Specs (lg: col 4) */}
                <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-50/60 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video sm:aspect-[4/3]">
                      <img
                        src={room.images[0] || hotel.coverImage}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      {room.availableRooms <= 3 && (
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Only {room.availableRooms} rooms left!</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2">
                      {room.name}
                    </h3>

                    {/* Room Meta Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span>{room.roomSizeSqM} m² / {Math.round(room.roomSizeSqM * 10.764)} sq.ft</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span className="truncate">{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span>Max {room.maxGuests} Guests</span>
                      </div>
                    </div>

                    {/* Room Amenities Highlights */}
                    <div className="space-y-1 text-xs text-slate-500">
                      {room.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-brand-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Inclusions & Benefits (lg: col 4) */}
                <div className="lg:col-span-4 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      Your Inclusions & Perks
                    </span>

                    <div className="space-y-3">
                      {room.hasBreakfast ? (
                        <div className="flex items-start gap-2.5 text-xs text-emerald-800 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/60">
                          <Coffee className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">Free Delicious Breakfast Included</span>
                            <span className="text-[11px] text-emerald-700">Buffet breakfast served daily at hotel restaurant</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>Room Only (Breakfast available at check-in)</span>
                        </div>
                      )}

                      {room.freeCancellation && (
                        <div className="flex items-start gap-2.5 text-xs text-teal-800 bg-teal-50/80 p-3 rounded-2xl border border-teal-200/60">
                          <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">Free Cancellation Guarantee</span>
                            <span className="text-[11px] text-teal-700">Cancel for free up to 24 hours prior to check-in</span>
                          </div>
                        </div>
                      )}

                      {room.payAtHotel && (
                        <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-brand-600" />
                          <span>No prepayment needed — Pay at property</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-brand-600" />
                        <span>Instant digital booking confirmation</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 italic">
                    ⚡ High demand: Book now to lock in this promotional rate
                  </div>
                </div>

                {/* 3. Pricing, Quantity & Book Action (lg: col 4) */}
                <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between bg-slate-50/30">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Total Pricing ({nights} {nights === 1 ? 'Night' : 'Nights'})
                    </span>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 line-through font-medium">
                          {formatAmount(originalTotalPrice)}
                        </span>
                        <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          SAVE {Math.round(((originalTotalPrice - totalRoomPrice) / originalTotalPrice) * 100)}%
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900 font-['Outfit']">
                          {formatAmount(totalRoomPrice)}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 font-medium">
                        {formatAmount(room.pricePerNight)} / night
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Includes all taxes, service fees & local charges
                      </span>
                    </div>

                    {/* Room Quantity Selector */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select Quantity
                      </label>
                      <select
                        value={qty}
                        onChange={(e) => handleQuantityChange(room.id, Number(e.target.value))}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                      >
                        {Array.from({ length: Math.min(5, room.availableRooms) }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i + 1 === 1 ? 'Room' : 'Rooms'} ({formatAmount(room.pricePerNight * (i + 1))} / night)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reserve Button */}
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => onSelectRoom(room, qty)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Reserve This Room</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-2">
                      Confirmation is immediate • No booking fee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
