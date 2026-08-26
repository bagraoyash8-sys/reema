import { Coupon } from '../types';

export const PROMO_COUPONS: Coupon[] = [
  {
    code: 'VOYARA20',
    discountPercentage: 20,
    maxDiscount: 150,
    minBookingValue: 100,
    description: 'Get 20% OFF on your first booking with Voyara (Up to $150)'
  },
  {
    code: 'INTERN10',
    discountPercentage: 10,
    maxDiscount: 75,
    minBookingValue: 50,
    description: 'Special 10% Internship Project Showcase Discount'
  },
  {
    code: 'EARLYBIRD',
    discountPercentage: 15,
    maxDiscount: 100,
    minBookingValue: 120,
    description: 'Early Bird Special: 15% OFF for advance reservations'
  },
  {
    code: 'LUXURY50',
    discountPercentage: 25,
    maxDiscount: 250,
    minBookingValue: 300,
    description: 'Exclusive 25% discount for 5-star Luxury & Resort stays'
  }
];
