import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, Sparkles, Check, ArrowRight, User, Mail, Phone, Clock, Gift, Tag, Building2, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { PROMO_COUPONS } from '../data/coupons';
import { GuestDetails } from '../types';
import { formatDate } from '../utils/formatters';

interface CheckoutPageProps {
  onBookingSuccess: () => void;
  onBackToHotel: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBookingSuccess,
  onBackToHotel,
}) => {
  const { bookingDraft, confirmBooking } = useBooking();
  const { formatAmount } = useCurrency();

  const [step, setStep] = useState<1 | 2>(1);

  // Guest details form state
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    country: 'United States',
    specialRequests: 'High floor with a nice view, if available please.',
    estimatedArrivalTime: '14:00 - 15:00',
    isBookingForSomeoneElse: false,
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'pay_at_hotel' | 'zero_deposit'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Coupon state
  const [couponInput, setCouponInput] = useState('VOYARA20');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('VOYARA20');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!bookingDraft) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">No active reservation draft found</h2>
        <p className="text-sm text-slate-500">Please select a hotel and room to begin your booking.</p>
        <button
          onClick={onBackToHotel}
          className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm"
        >
          Return to Browse Stays
        </button>
      </div>
    );
  }

  const { hotel, room, quantity, nights, checkIn, checkOut, adults, children, customPackageBreakdown } = bookingDraft;

  // Price calculations
  const isCustomPackage = !!customPackageBreakdown;
  const baseRoomTotal = isCustomPackage ? customPackageBreakdown.stayTotal : (room.pricePerNight * nights * quantity);
  const taxAndFees = isCustomPackage ? 0 : Math.round(baseRoomTotal * 0.12); // 12% standard hotel tax/service
  const packageGrossTotal = isCustomPackage 
    ? (customPackageBreakdown.stayTotal + customPackageBreakdown.activitiesTotal + customPackageBreakdown.addonsTotal)
    : (baseRoomTotal + taxAndFees);
  
  // Calculate coupon discount
  let discountAmount = 0;
  if (appliedCoupon) {
    const coupon = PROMO_COUPONS.find((c) => c.code.toUpperCase() === appliedCoupon.toUpperCase());
    if (coupon) {
      discountAmount = Math.min(
        coupon.maxDiscount,
        Math.round((isCustomPackage ? customPackageBreakdown.netTotal : baseRoomTotal) * (coupon.discountPercentage / 100))
      );
    }
  }

  const finalTotal = isCustomPackage 
    ? Math.max(0, customPackageBreakdown.netTotal - discountAmount)
    : Math.max(0, baseRoomTotal + taxAndFees - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const found = PROMO_COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
    );
    if (found) {
      setAppliedCoupon(found.code);
    } else {
      setCouponError('Invalid promo code. Try VOYARA20 or INTERN10');
    }
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    confirmBooking(guestDetails, paymentMethod, {
      basePrice: room.pricePerNight,
      roomTotal: baseRoomTotal,
      taxAndFees,
      serviceFee: 0,
      discountAmount,
      couponApplied: appliedCoupon || undefined,
      finalTotal,
      currency: 'USD',
    });
    onBookingSuccess();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Stepper Indicator */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  step === 1 ? 'bg-brand-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-sm font-extrabold text-slate-900">Guest Information</span>
            </div>

            <div className="h-0.5 w-24 bg-slate-300 mx-2" />

            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  step === 2 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </div>
              <span className="text-sm font-extrabold text-slate-900">Payment & Voucher</span>
            </div>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (lg: col 8) */}
          <div className="lg:col-span-8 space-y-8">
            {step === 1 ? (
              /* STEP 1: Guest Information */
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-black text-slate-900">Lead Guest Details</h2>
                  <div className="flex items-center gap-1.5 text-xs text-brand-700 font-bold bg-brand-50 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    <span>Secure 256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">First Name (as on ID)</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Last Name (as on ID)</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address for Voucher</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimated Arrival */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Check-in Arrival Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={guestDetails.estimatedArrivalTime}
                      onChange={(e) => setGuestDetails({ ...guestDetails, estimatedArrivalTime: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                    >
                      <option value="14:00 - 15:00">14:00 - 15:00 (Standard check-in)</option>
                      <option value="15:00 - 18:00">15:00 - 18:00 (Late Afternoon)</option>
                      <option value="18:00 - 22:00">18:00 - 22:00 (Evening)</option>
                      <option value="After 22:00">After 22:00 (Late Night Arrival)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={guestDetails.specialRequests}
                    onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                    placeholder="e.g. Quiet room, high floor, honeymoon arrangement..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-brand-600/25 flex items-center gap-2 uppercase tracking-wider"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 2: Payment Methods */
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Select Payment Method</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose how you want to pay. Instant confirmation guaranteed.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    Edit Guest Info
                  </button>
                </div>

                {/* Payment Options Radio Grid */}
                <div className="space-y-3">
                  {/* 1. Credit / Debit Card */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">
                          Credit / Debit Card (Visa, Mastercard, Amex)
                        </span>
                        <CreditCard className="w-5 h-5 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Pay securely online with instant voucher delivery.
                      </p>

                      {paymentMethod === 'card' && (
                        <div className="mt-4 pt-4 border-t border-brand-200/60 grid grid-cols-2 gap-3 animate-fadeIn">
                          <div className="col-span-2">
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">CVC / CVV</label>
                            <input
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold bg-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* 2. Pay at Hotel */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'pay_at_hotel'
                        ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'pay_at_hotel'}
                      onChange={() => setPaymentMethod('pay_at_hotel')}
                      className="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">
                          Pay Directly at Hotel
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          $0 Charged Today
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Reserve with zero upfront charges. Pay during check-in with cash or card.
                      </p>
                    </div>
                  </label>

                  {/* 3. UPI / Digital QR Pay */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">
                          Instant UPI / QR Code Payment
                        </span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Fast & Zero Fee
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Pay via Google Pay, Apple Pay, PhonePe, Paytm, or BHIM UPI.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Voyara Trust & Flexibility Guarantee:</span>
                    <span>Free cancellation until 24 hours prior to check-in. Instant digital voucher generated upon submission.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Guest Info
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalBooking}
                    className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-extrabold text-sm shadow-xl shadow-brand-600/30 flex items-center gap-2 uppercase tracking-wider transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Generate Voucher (${finalTotal.toFixed(2)})</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Card (lg: col 4) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-5">
              {/* Hotel Header Snippet */}
              <div className="flex gap-3 pb-4 border-b border-slate-100">
                <img
                  src={hotel.coverImage}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-sm"
                />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{hotel.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{hotel.city}, {hotel.country}</div>
                  <div className="mt-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                    ★ {hotel.ratingScore.toFixed(1)} {hotel.ratingText}
                  </div>
                </div>
              </div>

              {/* Booking Dates Recap */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Check-in:</span>
                  <span className="font-bold text-slate-900">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Check-out:</span>
                  <span className="font-bold text-slate-900">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-900">{nights} Nights • {quantity} Room(s)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Room Type:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[170px]">{room.name}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-brand-600" />
                  <span>Promo Code / Coupon</span>
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. VOYARA20"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:outline-none focus:border-brand-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                {appliedCoupon && !couponError && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    ✓ Promo code {appliedCoupon} applied!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                {isCustomPackage ? (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Accommodation ({nights} nights):</span>
                      <span className="font-semibold text-slate-900">{formatAmount(customPackageBreakdown.stayTotal)}</span>
                    </div>
                    {customPackageBreakdown.activitiesTotal > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Excursions ({customPackageBreakdown.activityNames.length} items):</span>
                        <span className="font-semibold text-slate-900">{formatAmount(customPackageBreakdown.activitiesTotal)}</span>
                      </div>
                    )}
                    {customPackageBreakdown.addonsTotal > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Concierge Perks & Chauffeur:</span>
                        <span className="font-semibold text-slate-900">{formatAmount(customPackageBreakdown.addonsTotal)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Custom Bundle Savings (15%):</span>
                      <span>-{formatAmount(customPackageBreakdown.bundleDiscount)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Room rate ({nights} nights × {quantity}):</span>
                      <span className="font-semibold text-slate-900">{formatAmount(baseRoomTotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Taxes & Service fees (12%):</span>
                      <span className="font-semibold text-slate-900">{formatAmount(taxAndFees)}</span>
                    </div>
                  </>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promo Discount ({appliedCoupon}):</span>
                    <span>-{formatAmount(discountAmount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-slate-900">Total Payable:</span>
                  <span className="text-2xl font-black text-slate-900 font-['Outfit']">
                    {formatAmount(finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
