import { Booking, Hotel } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'voyara_bookings',
  WISHLIST: 'voyara_wishlist',
  RECENT_SEARCHES: 'voyara_recent_searches',
  ACTIVE_CURRENCY: 'voyara_currency',
};

export const StorageService = {
  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveBooking(booking: Booking): void {
    try {
      const existing = this.getBookings();
      const updated = [booking, ...existing];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save booking to localStorage', e);
    }
  },

  cancelBooking(bookingId: string): void {
    try {
      const existing = this.getBookings();
      const updated = existing.map(b => 
        b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b
      );
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update booking status', e);
    }
  },

  getWishlist(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleWishlist(hotelId: string): string[] {
    try {
      const existing = this.getWishlist();
      const isFavorited = existing.includes(hotelId);
      const updated = isFavorited
        ? existing.filter(id => id !== hotelId)
        : [...existing, hotelId];
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  getRecentSearches(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      return data ? JSON.parse(data) : ['Bali, Indonesia', 'Tokyo, Japan', 'Goa, India', 'Dubai, UAE'];
    } catch {
      return ['Bali, Indonesia', 'Tokyo, Japan', 'Goa, India', 'Dubai, UAE'];
    }
  },

  addRecentSearch(destination: string): void {
    try {
      if (!destination.trim()) return;
      const existing = this.getRecentSearches();
      const filtered = existing.filter(d => d.toLowerCase() !== destination.toLowerCase());
      const updated = [destination, ...filtered].slice(0, 6);
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save recent search', e);
    }
  }
};
