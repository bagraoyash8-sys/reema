import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Compass, CheckCircle2, MapPin, Calendar, Clock, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { Booking } from '../types';
import { formatDate } from '../utils/formatters';

interface BookingVoucherProps {
  booking: Booking;
}

export const BookingVoucher: React.FC<BookingVoucherProps> = ({ booking }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Official Travel Confirmation Voucher</span>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Voucher Card Container */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden print:border print:shadow-none print:m-0 print:p-0">
        {/* Voucher Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-brand-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center shadow-md">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight font-['Outfit']">
                  VOYARA TRAVELS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                  VOUCHER
                </span>
              </div>
              <p className="text-xs text-brand-200 mt-0.5">
                Official Hotel Booking Confirmation & Guest Voucher
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{booking.status === 'CANCELLED' ? 'CANCELLED' : 'CONFIRMED & GUARANTEED'}</span>
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Booking Ref: <span className="font-mono font-extrabold text-amber-400 text-sm sm:text-base">{booking.bookingNumber}</span>
            </div>
          </div>
        </div>

        {/* Voucher Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* 1. Hotel & QR Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-slate-200">
            <div className="md:col-span-8 flex flex-col sm:flex-row gap-5">
              <img
                src={booking.hotelImage}
                alt={booking.hotelName}
                className="w-full sm:w-44 h-32 rounded-2xl object-cover shadow-sm flex-shrink-0"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">{booking.hotelName}</h3>
                <div className="flex items-start gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>{booking.hotelAddress}, {booking.hotelCity}, {booking.hotelCountry}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>{booking.hotelPhone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-brand-600" />
                    <span>support@voyara.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code & Scan Pass */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 mb-2">
                <QRCodeSVG value={booking.qrData} size={110} level="M" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Hotel Front Desk Scan
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Present upon check-in</span>
            </div>
          </div>

          {/* 2. Stay Dates & Times Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-brand-50/60 rounded-2xl border border-brand-200/70">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 block">Check-in</span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">{formatDate(booking.checkIn)}</div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                <span>From 14:00 (2:00 PM)</span>
              </div>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-brand-200/70 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 block">Check-out</span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">{formatDate(booking.checkOut)}</div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                <span>Until 12:00 (12:00 PM)</span>
              </div>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-brand-200/70 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 block">Duration & Guests</span>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
              </div>
              <div className="text-xs text-slate-500">
                {booking.guestCount.adults + booking.guestCount.children} Guests • {booking.guestCount.rooms} Room
              </div>
            </div>
          </div>

          {/* 3. Room & Guest Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Info */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Room Reserved
              </span>
              <h4 className="font-extrabold text-base text-slate-900">{booking.roomName}</h4>
              <div className="text-xs text-slate-600 space-y-1">
                <div>Bed type: <span className="font-semibold text-slate-800">{booking.roomBedType}</span></div>
                <div>Quantity: <span className="font-semibold text-slate-800">{booking.roomQuantity} Unit(s)</span></div>
                <div className="text-emerald-700 font-bold">✓ Free Breakfast Included</div>
                <div className="text-teal-700 font-bold">✓ Free Wi-Fi Included</div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Lead Guest
              </span>
              <h4 className="font-extrabold text-base text-slate-900">
                {booking.guestDetails.firstName} {booking.guestDetails.lastName}
              </h4>
              <div className="text-xs text-slate-600 space-y-1">
                <div>Email: <span className="font-semibold text-slate-800">{booking.guestDetails.email}</span></div>
                <div>Phone: <span className="font-semibold text-slate-800">{booking.guestDetails.phone}</span></div>
                <div>Estimated Arrival: <span className="font-semibold text-slate-800">{booking.guestDetails.estimatedArrivalTime || '14:00 - 16:00'}</span></div>
              </div>
            </div>
          </div>

          {/* 4. Payment & Policy Summary */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                Payment Status
              </span>
              <div className="text-base font-extrabold text-slate-900">
                {booking.paymentStatus === 'PAID'
                  ? 'Paid in Full (Online via Card/UPI)'
                  : booking.paymentStatus === 'DEPOSIT_HELD'
                  ? 'Zero Deposit Held ($0 Charged Today)'
                  : 'Pay Directly at Property on Arrival'}
              </div>
              <div className="text-xs text-amber-800 mt-0.5">
                Free cancellation deadline: <strong>{formatDate(booking.cancellationDeadline)}</strong>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Amount</span>
              <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                ${booking.pricing.finalTotal.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-500">Taxes & fees included</span>
            </div>
          </div>

          {/* Important Hotel Notes */}
          <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
            <h5 className="font-bold text-slate-700">Important Check-in Information:</h5>
            <p>• Government-issued photo ID / passport matching the lead guest name is required upon check-in.</p>
            <p>• Special requests are subject to availability upon check-in and cannot be guaranteed.</p>
            <p>• For any date changes or inquiries, please contact Voyara Concierge 24/7 support at support@voyara.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
