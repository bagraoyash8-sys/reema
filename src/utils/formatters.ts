import { CurrencyCode } from '../types';

export const CURRENCIES: Record<CurrencyCode, { symbol: string; name: string; rate: number }> = {
  USD: { symbol: '$', name: 'US Dollar', rate: 1.0 },
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.79 },
  JPY: { symbol: '¥', name: 'Japanese Yen', rate: 155.0 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', rate: 1.35 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.37 },
};

export function formatPrice(priceInUSD: number, currency: CurrencyCode = 'USD'): string {
  const info = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = priceInUSD * info.rate;
  
  if (currency === 'INR' || currency === 'JPY') {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function convertAmount(amountInUSD: number, currency: CurrencyCode): number {
  const info = CURRENCIES[currency] || CURRENCIES.USD;
  return Math.round(amountInUSD * info.rate * 100) / 100;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function getRatingBadgeColor(score: number): string {
  if (score >= 9.0) return 'bg-brand-600 text-white';
  if (score >= 8.0) return 'bg-teal-700 text-white';
  if (score >= 7.0) return 'bg-emerald-600 text-white';
  return 'bg-amber-600 text-white';
}

export function generateBookingNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'VY-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
