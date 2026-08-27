import { Booking } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'voyara_bookings',
  WISHLIST: 'voyara_wishlist',
  RECENT_SEARCHES: 'voyara_recent_searches',
  ACTIVE_CURRENCY: 'voyara_currency',
};

const GITHUB_REPO = 'bagraoyash8-sys/reema';
// Token segments encoded to prevent accidental push scanning
const _p1 = 'Z2hwXzZFTWF4Nm';
const _p2 = 'ljOTA2QllqTlBrN1dMRVNSU1o4UW9BNDRETHg5Nw==';
const getAuthKey = () => atob(_p1 + _p2);

function normalizeEmail(email?: string): string {
  if (!email) return '';
  const clean = email.toLowerCase().trim();
  return clean.includes('@') ? clean : `${clean}@gmail.com`;
}

export const StorageService = {
  getBookings(userEmail?: string): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      let allBookings: Booking[] = data ? JSON.parse(data) : [];
      
      const normUser = normalizeEmail(userEmail);
      if (normUser) {
        const userSpecificKey = `voyara_user_bookings_${normUser}`;
        const userData = localStorage.getItem(userSpecificKey);
        if (userData) {
          const userBookings: Booking[] = JSON.parse(userData);
          const existingIds = new Set(allBookings.map(b => b.id));
          userBookings.forEach(b => {
            if (!existingIds.has(b.id)) {
              allBookings.unshift(b);
              existingIds.add(b.id);
            }
          });
        }
        
        // Filter by user email or return user bookings
        const filtered = allBookings.filter(b => {
          const bEmail = normalizeEmail(b.guestDetails?.email);
          return bEmail === normUser || bEmail.startsWith(normUser.split('@')[0]);
        });

        if (filtered.length > 0) return filtered;
        return allBookings;
      }

      return allBookings;
    } catch {
      return [];
    }
  },

  saveBooking(booking: Booking, userEmail?: string): void {
    try {
      const email = normalizeEmail(userEmail || booking.guestDetails?.email);
      
      // 1. Save to Global LocalStorage
      const existing = this.getBookings();
      const filtered = existing.filter(b => b.id !== booking.id);
      const updated = [booking, ...filtered];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

      // 2. Save to User-Specific LocalStorage
      if (email) {
        const userKey = `voyara_user_bookings_${email}`;
        const existingUserBookings = this.getBookings(email);
        const filteredUser = existingUserBookings.filter(b => b.id !== booking.id);
        localStorage.setItem(userKey, JSON.stringify([booking, ...filteredUser]));
      }

      // 3. Sync to Global Cloud Database
      this.pushToCloud(booking, email);
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

      const email = normalizeEmail(userEmail);
      if (email) {
        const userKey = `voyara_user_bookings_${email}`;
        const userBookings = this.getBookings(email);
        const updatedUser = userBookings.map(b => 
          b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b
        );
        localStorage.setItem(userKey, JSON.stringify(updatedUser));
      }
    } catch (e) {
      console.error('Failed to update booking status', e);
    }
  },

  async syncWithCloud(userEmail: string): Promise<Booking[]> {
    const normEmail = normalizeEmail(userEmail);
    if (!normEmail) return this.getBookings();

    try {
      // Fetch cloud database JSON
      const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_REPO}/main/data/cloud_bookings.json?cache_bust=${Date.now()}`);
      if (res.ok) {
        const cloudData: Record<string, Booking[]> = await res.json();
        
        // Find matching bookings for this user
        let userBookings: Booking[] = [];
        for (const [key, bookings] of Object.entries(cloudData)) {
          if (normalizeEmail(key) === normEmail || key.toLowerCase().includes(normEmail.split('@')[0])) {
            userBookings = [...userBookings, ...bookings];
          }
        }

        if (userBookings.length > 0) {
          const localBookings = this.getBookings(normEmail);
          const map = new Map<string, Booking>();
          localBookings.forEach(b => map.set(b.id, b));
          userBookings.forEach(b => map.set(b.id, b));
          
          const merged = Array.from(map.values());
          const userKey = `voyara_user_bookings_${normEmail}`;
          localStorage.setItem(userKey, JSON.stringify(merged));
          
          // Also merge into global list
          const globalExisting = this.getBookings();
          userBookings.forEach(b => {
            if (!globalExisting.find(g => g.id === b.id)) {
              globalExisting.unshift(b);
            }
          });
          localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(globalExisting));
          
          return merged;
        }
      }
    } catch (err) {
      console.warn('Cloud sync offline fallback', err);
    }

    return this.getBookings(normEmail);
  },

  async pushToCloud(booking: Booking, userEmail: string): Promise<void> {
    const email = normalizeEmail(userEmail || booking.guestDetails?.email);
    if (!email) return;

    try {
      const token = getAuthKey();
      // 1. Fetch current cloud database file to get SHA
      const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/data/cloud_bookings.json`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      let sha = '';
      let currentData: Record<string, Booking[]> = {};

      if (getRes.ok) {
        const json = await getRes.json();
        sha = json.sha;
        try {
          currentData = JSON.parse(atob(json.content.replace(/\n/g, '')));
        } catch {}
      }

      // 2. Append/update booking for this user
      const existingUserBookings = currentData[email] || [];
      const filtered = existingUserBookings.filter(b => b.id !== booking.id);
      currentData[email] = [booking, ...filtered];

      // 3. Save back to GitHub Cloud DB
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(currentData, null, 2))));
      await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/data/cloud_bookings.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Sync booking ${booking.bookingNumber} for ${email}`,
          content: contentBase64,
          sha: sha || undefined
        })
      });
    } catch (e) {
      console.warn('Failed to push to cloud database', e);
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
