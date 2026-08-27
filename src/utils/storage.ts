import { Booking, Hotel } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'voyara_bookings',
  WISHLIST: 'voyara_wishlist',
  RECENT_SEARCHES: 'voyara_recent_searches',
  ACTIVE_CURRENCY: 'voyara_currency',
};

// API base URL for cloud synchronization (points to local or remote backend)
const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

export const StorageService = {
  getBookings(userEmail?: string): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      let allBookings: Booking[] = data ? JSON.parse(data) : [];
      
      // Also check user-specific key if email is provided
      if (userEmail && userEmail.trim()) {
        const userSpecificKey = `voyara_user_bookings_${userEmail.toLowerCase().trim()}`;
        const userData = localStorage.getItem(userSpecificKey);
        if (userData) {
          const userBookings: Booking[] = JSON.parse(userData);
          // Merge avoiding duplicates by ID
          const existingIds = new Set(allBookings.map(b => b.id));
          userBookings.forEach(b => {
            if (!existingIds.has(b.id)) {
              allBookings.unshift(b);
              existingIds.add(b.id);
            }
          });
        }
        
        // Filter strictly by the logged-in user's email
        return allBookings.filter(
          b => b.guestDetails?.email?.toLowerCase().trim() === userEmail.toLowerCase().trim()
        );
      }

      return allBookings;
    } catch {
      return [];
    }
  },

  saveBooking(booking: Booking, userEmail?: string): void {
    try {
      const email = userEmail || booking.guestDetails?.email;
      
      // 1. Save to Global LocalStorage
      const existing = this.getBookings();
      const filtered = existing.filter(b => b.id !== booking.id);
      const updated = [booking, ...filtered];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

      // 2. Save to User-Specific LocalStorage for cross-session access
      if (email && email.trim()) {
        const userKey = `voyara_user_bookings_${email.toLowerCase().trim()}`;
        const existingUserBookings = this.getBookings(email);
        const filteredUser = existingUserBookings.filter(b => b.id !== booking.id);
        localStorage.setItem(userKey, JSON.stringify([booking, ...filteredUser]));
      }

      // 3. Asynchronously sync to Cloud Backend Database (if connected)
      this.pushToCloud(booking);
    } catch (e) {
      console.error('Failed to save booking to storage', e);
    }
  },

  cancelBooking(bookingId: string, userEmail?: string): void {
    try {
      const existing = this.getBookings();
      const updated = existing.map(b => 
        b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b
      );
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

      if (userEmail && userEmail.trim()) {
        const userKey = `voyara_user_bookings_${userEmail.toLowerCase().trim()}`;
        const userBookings = this.getBookings(userEmail);
        const updatedUser = userBookings.map(b => 
          b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b
        );
        localStorage.setItem(userKey, JSON.stringify(updatedUser));
      }

      // Sync cancellation to cloud
      fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, { method: 'PUT' }).catch(() => {});
    } catch (e) {
      console.error('Failed to update booking status', e);
    }
  },

  async syncWithCloud(userEmail: string): Promise<Booking[]> {
    if (!userEmail || !userEmail.trim()) return this.getBookings();

    try {
      const response = await fetch(`${API_BASE_URL}/bookings?email=${encodeURIComponent(userEmail.toLowerCase().trim())}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          const cloudBookings: Booking[] = json.data;
          
          // Merge cloud bookings into local storage
          const localBookings = this.getBookings(userEmail);
          const map = new Map<string, Booking>();
          localBookings.forEach(b => map.set(b.id, b));
          cloudBookings.forEach(b => map.set(b.id, b));
          
          const merged = Array.from(map.values());
          const userKey = `voyara_user_bookings_${userEmail.toLowerCase().trim()}`;
          localStorage.setItem(userKey, JSON.stringify(merged));
          
          // Also merge into global list
          const globalExisting = this.getBookings();
          cloudBookings.forEach(b => {
            if (!globalExisting.find(g => g.id === b.id)) {
              globalExisting.unshift(b);
            }
          });
          localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(globalExisting));
          
          return merged;
        }
      }
    } catch {
      // Offline fallback: returns local user bookings
    }

    return this.getBookings(userEmail);
  },

  async pushToCloud(booking: Booking): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel: { id: booking.hotelId, name: booking.hotelName, coverImage: booking.hotelImage, address: booking.hotelAddress, city: booking.hotelCity, country: booking.hotelCountry },
          room: { id: booking.roomId, name: booking.roomName, bedType: booking.roomBedType, quantity: booking.roomQuantity },
          guest: booking.guestDetails,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          nights: booking.nights,
          pricing: booking.pricing,
          paymentMethod: booking.paymentMethod,
          bookingNumber: booking.bookingNumber,
        }),
      });
    } catch {
      // Ignored: Offline resilient
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
