import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Booking, BookingSelection, SearchParams, Hotel, Room, GuestDetails } from '../types';
import { StorageService } from '../utils/storage';
import { calculateNights, generateBookingNumber } from '../utils/formatters';
import { useAuth } from './AuthContext';

interface BookingContextType {
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;
  bookingDraft: BookingSelection | null;
  setBookingDraft: (draft: BookingSelection | null) => void;
  initiateBooking: (hotel: Hotel, room: Room, quantity?: number) => void;
  confirmBooking: (
    guestDetails: GuestDetails,
    paymentMethod: Booking['paymentMethod'],
    pricing: Booking['pricing']
  ) => Booking;
  confirmedBookings: Booking[];
  currentConfirmedBooking: Booking | null;
  cancelBooking: (bookingId: string) => void;
  refreshBookings: () => Promise<void>;
}

const defaultSearchParams: SearchParams = {
  destination: '',
  checkIn: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
  checkOut: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
  nights: 4,
  adults: 2,
  children: 0,
  rooms: 1,
  category: 'all',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [searchParams, setSearchParamsState] = useState<SearchParams>(defaultSearchParams);
  const [bookingDraft, setBookingDraft] = useState<BookingSelection | null>(() => {
    try {
      const savedDraft = sessionStorage.getItem('voyara_booking_draft');
      return savedDraft ? JSON.parse(savedDraft) : null;
    } catch {
      return null;
    }
  });
  
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>(() => 
    StorageService.getBookings(user?.email)
  );
  const [currentConfirmedBooking, setCurrentConfirmedBooking] = useState<Booking | null>(null);

  // Sync user bookings whenever user logs in or logs out
  const refreshBookings = useCallback(async () => {
    if (user?.email) {
      // 1. Load from local cache immediately
      setConfirmedBookings(StorageService.getBookings(user.email));
      // 2. Sync from cloud asynchronously and update state
      const synced = await StorageService.syncWithCloud(user.email);
      setConfirmedBookings(synced);
    } else {
      setConfirmedBookings(StorageService.getBookings());
    }
  }, [user?.email]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  // Sync draft to session storage
  useEffect(() => {
    if (bookingDraft) {
      sessionStorage.setItem('voyara_booking_draft', JSON.stringify(bookingDraft));
    } else {
      sessionStorage.removeItem('voyara_booking_draft');
    }
  }, [bookingDraft]);

  const setSearchParams = (params: Partial<SearchParams>) => {
    setSearchParamsState(prev => {
      const updated = { ...prev, ...params };
      if (params.checkIn || params.checkOut) {
        updated.nights = calculateNights(updated.checkIn, updated.checkOut);
      }
      return updated;
    });
  };

  const initiateBooking = (hotel: Hotel, room: Room, quantity: number = 1) => {
    const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);
    const draft: BookingSelection = {
      hotel,
      room,
      quantity,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      nights,
      adults: searchParams.adults,
      children: searchParams.children,
      roomsCount: searchParams.rooms,
      includeBreakfast: room.hasBreakfast,
      includeAirportShuttle: false,
    };
    setBookingDraft(draft);
  };

  const confirmBooking = (
    guestDetails: GuestDetails,
    paymentMethod: Booking['paymentMethod'],
    pricing: Booking['pricing']
  ): Booking => {
    if (!bookingDraft) {
      throw new Error('No active booking draft to confirm.');
    }

    const bookingNum = generateBookingNumber();
    const deadlineDate = new Date(bookingDraft.checkIn);
    deadlineDate.setDate(deadlineDate.getDate() - 1);

    // If user is logged in, ensure booking is bound to user email for cross-device sync
    const effectiveEmail = user?.email || guestDetails.email;
    const finalGuestDetails: GuestDetails = {
      ...guestDetails,
      email: effectiveEmail,
    };

    const newBooking: Booking = {
      id: 'bk_' + Date.now(),
      bookingNumber: bookingNum,
      hotelId: bookingDraft.hotel.id,
      hotelName: bookingDraft.hotel.name,
      hotelImage: bookingDraft.hotel.coverImage,
      hotelAddress: bookingDraft.hotel.address,
      hotelCity: bookingDraft.hotel.city,
      hotelCountry: bookingDraft.hotel.country,
      hotelPhone: '+1 (800) 869-2721',
      roomId: bookingDraft.room.id,
      roomName: bookingDraft.room.name,
      roomBedType: bookingDraft.room.bedType,
      roomQuantity: bookingDraft.quantity,
      checkIn: bookingDraft.checkIn,
      checkOut: bookingDraft.checkOut,
      nights: bookingDraft.nights,
      guestCount: {
        adults: bookingDraft.adults,
        children: bookingDraft.children,
        rooms: bookingDraft.roomsCount,
      },
      guestDetails: finalGuestDetails,
      pricing,
      paymentMethod,
      paymentStatus: paymentMethod === 'pay_at_hotel' ? 'PAY_AT_PROPERTY' : paymentMethod === 'zero_deposit' ? 'DEPOSIT_HELD' : 'PAID',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      cancellationDeadline: deadlineDate.toISOString().split('T')[0],
      qrData: `VOYARA-VERIFIED-VOUCHER:${bookingNum}|${bookingDraft.hotel.name}|${finalGuestDetails.firstName} ${finalGuestDetails.lastName}|${bookingDraft.checkIn}`,
    };

    StorageService.saveBooking(newBooking, effectiveEmail);
    setConfirmedBookings(StorageService.getBookings(effectiveEmail));
    setCurrentConfirmedBooking(newBooking);
    setBookingDraft(null);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    StorageService.cancelBooking(bookingId, user?.email);
    setConfirmedBookings(StorageService.getBookings(user?.email));
    if (currentConfirmedBooking?.id === bookingId) {
      setCurrentConfirmedBooking(prev => prev ? { ...prev, status: 'CANCELLED' } : null);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,
        bookingDraft,
        setBookingDraft,
        initiateBooking,
        confirmBooking,
        confirmedBookings,
        currentConfirmedBooking,
        cancelBooking,
        refreshBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
