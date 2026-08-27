import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CustomTripPlannerPage } from './pages/CustomTripPlannerPage';
import { Hotel, Room, SearchParams, CustomTripPlan } from './types';
import { MOCK_HOTELS } from './data/mockHotels';

function MainApp() {
  const { setSearchParams, initiateBooking, setBookingDraft } = useBooking();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(MOCK_HOTELS[0]);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params?: any) => {
    if (params) {
      setSearchParams(params);
    }
    setCurrentPage(page);
  };

  const handleSearchSubmit = (params: SearchParams) => {
    setSearchParams(params);
    setCurrentPage('search');
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setCurrentPage('hotel-detail');
  };

  const handleBookRoom = (hotel: Hotel, room: Room, quantity: number) => {
    initiateBooking(hotel, room, quantity);
    setCurrentPage('checkout');
  };

  const handleBookCustomPackage = (hotel: Hotel, plan: CustomTripPlan) => {
    const activitiesCost = plan.selectedActivities.reduce(
      (sum, a) => sum + a.pricePerPerson * plan.travelersCount,
      0
    );
    const addonsCost = plan.selectedAddons.reduce(
      (sum, a) => sum + a.pricePerDay * plan.durationDays,
      0
    );
    const stayCost = plan.totalPriceUSD - activitiesCost - addonsCost;
    const subtotal = (plan.totalPriceUSD / 0.85);
    const bundleDiscount = Math.round(subtotal * 0.15);

    const defaultRoom = hotel.rooms[0] || {
      id: 'custom-package-room',
      hotelId: hotel.id,
      name: `${plan.durationDays}-Day Bespoke ${plan.travelStyle} Package`,
      bedType: '1 King Bed Suite',
      maxGuests: plan.travelersCount,
      roomSizeSqM: 60,
      pricePerNight: Math.round(plan.totalPriceUSD / plan.durationDays),
      hasBreakfast: true,
      freeCancellation: true,
      payAtHotel: true,
      availableRooms: 5,
      images: [hotel.coverImage],
      features: [
        `${plan.durationDays}-Day Custom Itinerary`,
        `${plan.selectedActivities.length} Excursions Included`,
        `${plan.selectedAddons.length} Concierge Perks Included`,
        'Daily Gourmet Breakfast',
      ],
    };

    const checkIn = plan.startDate;
    const checkOutDate = new Date(plan.startDate);
    checkOutDate.setDate(checkOutDate.getDate() + plan.durationDays);
    const checkOut = checkOutDate.toISOString().split('T')[0];

    setBookingDraft({
      hotel: {
        ...hotel,
        name: `${hotel.name} (${plan.travelStyle} Custom Package)`,
      },
      room: defaultRoom,
      quantity: 1,
      checkIn,
      checkOut,
      nights: plan.durationDays,
      adults: plan.travelersCount,
      children: 0,
      roomsCount: 1,
      includeBreakfast: true,
      includeAirportShuttle: true,
      customPackageBreakdown: {
        stayTotal: Math.round(subtotal - activitiesCost - addonsCost),
        activitiesTotal: activitiesCost,
        addonsTotal: addonsCost,
        bundleDiscount,
        netTotal: plan.totalPriceUSD,
        activityNames: plan.selectedActivities.map((a) => a.title),
        addonNames: plan.selectedAddons.map((a) => a.name),
      },
    });

    setCurrentPage('checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Global Brand Navbar */}
      <Navbar currentTab={currentPage} onNavigate={handleNavigate} />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onSearch={handleSearchSubmit}
            onSelectHotel={handleSelectHotel}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'search' && (
          <SearchResultsPage
            onSelectHotel={handleSelectHotel}
            onModifySearch={handleSearchSubmit}
          />
        )}

        {currentPage === 'hotel-detail' && (
          <HotelDetailPage
            hotel={selectedHotel}
            onBookRoom={handleBookRoom}
            onBackToSearch={() => setCurrentPage('search')}
          />
        )}

        {currentPage === 'custom-planner' && (
          <CustomTripPlannerPage
            onBookCustomPackage={handleBookCustomPackage}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onBookingSuccess={() => setCurrentPage('confirmation')}
            onBackToHotel={() => setCurrentPage('hotel-detail')}
          />
        )}

        {currentPage === 'confirmation' && (
          <ConfirmationPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'trips' && (
          <MyTripsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onSelectHotel={handleSelectHotel}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Travel Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <BookingProvider>
            <MainApp />
          </BookingProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
