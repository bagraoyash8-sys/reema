import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingSelection, SearchParams, Hotel, Room, GuestDetails } from '../types';
import { StorageService } from '../utils/storage';
import { calculateNights, generateBookingNumber } from '../utils/formatters';

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
}

const defaultSearchParams: SearchParams = {
  destination: '',
  checkIn: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days from now
  checkOut: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // 7 days from now
  nights: 4,
  adults: 2,
  children: 0,
  rooms: 1,
  category: 'all',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParamsState] = useState<SearchParams>(defaultSearchParams);
  const [bookingDraft, setBookingDraft] = useState<BookingSelection | null>(() => {
    const savedDraft = sessionStorage.getItem('voyara_booking_draft');
    return savedDraft ? JSON.parse(savedDraft) : null;
  });
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>(() => StorageService.getBookings());
  const [currentConfirmedBooking, setCurrentConfirmedBooking] = useState<Booking | null>(null);

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
      guestDetails,
      pricing,
      paymentMethod,
      paymentStatus: paymentMethod === 'pay_at_hotel' ? 'PAY_AT_PROPERTY' : paymentMethod === 'zero_deposit' ? 'DEPOSIT_HELD' : 'PAID',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      cancellationDeadline: deadlineDate.toISOString().split('T')[0],
      qrData: `VOYARA-VERIFIED-VOUCHER:${bookingNum}|${bookingDraft.hotel.name}|${guestDetails.firstName} ${guestDetails.lastName}|${bookingDraft.checkIn}`,
    };

    StorageService.saveBooking(newBooking);
    setConfirmedBookings(StorageService.getBookings());
    setCurrentConfirmedBooking(newBooking);
    setBookingDraft(null);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    StorageService.cancelBooking(bookingId);
    setConfirmedBookings(StorageService.getBookings());
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
