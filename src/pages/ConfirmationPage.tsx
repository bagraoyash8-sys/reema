import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Luggage, Home } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BookingVoucher } from '../components/BookingVoucher';

interface ConfirmationPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onNavigate }) => {
  const { currentConfirmedBooking, confirmedBookings } = useBooking();

  const activeBooking = currentConfirmedBooking || confirmedBookings[0];

  useEffect(() => {
    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#f59e0b', '#10b981', '#6366f1'],
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  if (!activeBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">No recent booking found</h2>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm"
        >
          Explore Stays
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Success Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-1">
                Booking Guaranteed & Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-['Outfit']">
                Pack your bags, {activeBooking.guestDetails.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                We've sent your official voucher and confirmation receipt to <strong>{activeBooking.guestDetails.email}</strong>.
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => onNavigate('trips')}
              className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Luggage className="w-4 h-4 text-brand-600" />
              <span>Go to My Bookings</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 rounded-2xl bg-emerald-800/60 hover:bg-emerald-800 text-white font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Book Another Stay</span>
            </button>
          </div>
        </div>

        {/* Printable Digital Voucher */}
        <BookingVoucher booking={activeBooking} />
      </div>
    </div>
  );
};
