import React, { useState } from 'react';
import { Luggage, Calendar, MapPin, CheckCircle2, AlertTriangle, X, Eye, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { BookingVoucher } from '../components/BookingVoucher';
import { Booking } from '../types';
import { formatDate } from '../utils/formatters';

interface MyTripsPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const MyTripsPage: React.FC<MyTripsPageProps> = ({ onNavigate }) => {
  const { confirmedBookings, cancelBooking } = useBooking();
  const { formatAmount } = useCurrency();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedVoucher, setSelectedVoucher] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  const upcomingBookings = confirmedBookings.filter((b) => b.status === 'CONFIRMED');
  const cancelledBookings = confirmedBookings.filter((b) => b.status === 'CANCELLED');
  const completedBookings = confirmedBookings.filter((b) => b.status === 'COMPLETED');

  const displayList =
    activeTab === 'upcoming'
      ? upcomingBookings
      : activeTab === 'cancelled'
      ? cancelledBookings
      : completedBookings;

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      cancelBooking(cancelModalBooking.id);
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
              <Luggage className="w-4 h-4" />
              <span>Traveler Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Outfit'] mt-1">
              My Trips & Bookings
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your confirmed hotel reservations, access digital vouchers, or make free changes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Book a New Stay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Upcoming Stays ({upcomingBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'cancelled'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Cancelled ({cancelledBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Past Trips ({completedBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        {displayList.length > 0 ? (
          <div className="space-y-6">
            {displayList.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6 items-start"
              >
                <div className="flex flex-col sm:flex-row gap-5 flex-1">
                  <img
                    src={booking.hotelImage}
                    alt={booking.hotelName}
                    className="w-full sm:w-48 h-36 rounded-2xl object-cover shadow-sm flex-shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                        {booking.bookingNumber}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-900">{booking.hotelName}</h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      <span>{booking.hotelCity}, {booking.hotelCountry}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold pt-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      <span>
                        {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)} ({booking.nights} Nights)
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">
                      Room: <strong>{booking.roomName}</strong> ({booking.roomQuantity} Unit) • Lead Guest: <strong>{booking.guestDetails.firstName} {booking.guestDetails.lastName}</strong>
                    </div>
                  </div>
                </div>

                {/* Right Actions & Pricing */}
                <div className="flex flex-col sm:items-end justify-between self-stretch border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 gap-4">
                  <div className="sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Total Paid
                    </span>
                    <span className="text-2xl font-black text-slate-900 font-['Outfit']">
                      {formatAmount(booking.pricing.finalTotal)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {booking.paymentStatus === 'PAID' ? 'Paid in Full' : 'Pay at Hotel'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedVoucher(booking)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Voucher</span>
                    </button>

                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => setCancelModalBooking(booking)}
                        className="px-4 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Luggage className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">No {activeTab} bookings</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming trips yet. Start exploring dream destinations today!"
                : `You don't have any ${activeTab} reservations.`}
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              Search Hotels & Resorts
            </button>
          </div>
        )}
      </div>

      {/* Voucher Lightbox Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl my-8">
            <button
              onClick={() => setSelectedVoucher(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <BookingVoucher booking={selectedVoucher} />
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-modal space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Cancel this booking?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel your reservation for <strong>{cancelModalBooking.hotelName}</strong> ({cancelModalBooking.bookingNumber})?
            </p>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-medium">
              ✓ Free Cancellation policy applies. Any processed payments will be refunded in full.
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Yes, Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
