export interface Room {
  id: string;
  hotelId: string;
  name: string;
  bedType: string;
  maxGuests: number;
  roomSizeSqM: number;
  pricePerNight: number;
  originalPricePerNight?: number;
  hasBreakfast: boolean;
  freeCancellation: boolean;
  payAtHotel: boolean;
  availableRooms: number;
  images: string[];
  features: string[];
}

export interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  roomType: string;
  title: string;
  comment: string;
  positiveHighlight?: string;
  tripType: 'Couple' | 'Solo traveler' | 'Family' | 'Business' | 'Group';
}

export interface ReviewScoreBreakdown {
  cleanliness: number;
  comfort: number;
  location: number;
  services: number;
  valueForMoney: number;
  freeWifi: number;
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  category: 'hotel' | 'resort' | 'villa' | 'homestay';
  city: string;
  country: string;
  address: string;
  distanceFromCenterKm: number;
  landmark: string;
  starRating: number; // 1 - 5
  ratingScore: number; // e.g. 9.3
  ratingText: 'Exceptional' | 'Superb' | 'Fabulous' | 'Very Good' | 'Good';
  reviewCount: number;
  featuredBadge?: 'Special Deal' | 'Top Value' | 'Trending' | 'Rare Find' | 'Best Seller';
  coverImage: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  description: string;
  pricePerNight: number;
  originalPricePerNight: number;
  discountPercentage: number;
  freeCancellation: boolean;
  hasBreakfast: boolean;
  reviewScores: ReviewScoreBreakdown;
  rooms: Room[];
  reviews: Review[];
  locationCoords: {
    lat: number;
    lng: number;
  };
  nearbyAttractions: {
    name: string;
    distance: string;
  }[];
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  rooms: number;
  category: 'all' | 'hotel' | 'resort' | 'villa' | 'homestay';
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  starRatings: number[];
  minRatingScore: number;
  propertyTypes: string[];
  amenities: string[];
  freeCancellationOnly: boolean;
  breakfastIncludedOnly: boolean;
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'rating_high' | 'distance_low';
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
  estimatedArrivalTime: string;
  isBookingForSomeoneElse: boolean;
}

export interface BookingSelection {
  hotel: Hotel;
  room: Room;
  quantity: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  roomsCount: number;
  includeBreakfast: boolean;
  includeAirportShuttle: boolean;
  customPackageBreakdown?: {
    stayTotal: number;
    activitiesTotal: number;
    addonsTotal: number;
    bundleDiscount: number;
    netTotal: number;
    activityNames: string[];
    addonNames: string[];
  };
}

export interface Booking {
  id: string;
  bookingNumber: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelAddress: string;
  hotelCity: string;
  hotelCountry: string;
  hotelPhone: string;
  roomId: string;
  roomName: string;
  roomBedType: string;
  roomQuantity: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestCount: {
    adults: number;
    children: number;
    rooms: number;
  };
  guestDetails: GuestDetails;
  pricing: {
    basePrice: number;
    roomTotal: number;
    taxAndFees: number;
    serviceFee: number;
    discountAmount: number;
    couponApplied?: string;
    finalTotal: number;
    currency: string;
  };
  paymentMethod: 'card' | 'upi' | 'pay_at_hotel' | 'zero_deposit';
  paymentStatus: 'PAID' | 'PAY_AT_PROPERTY' | 'DEPOSIT_HELD';
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
  cancellationDeadline: string;
  qrData: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  propertyCount: number;
  averagePrice: number;
  tagline: string;
  popularFor: string[];
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minBookingValue: number;
  description: string;
}

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'SGD' | 'CAD';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstUSD: number; // 1 USD = X Currency
}

export interface CustomActivity {
  id: string;
  title: string;
  category: 'Adventure' | 'Cultural' | 'Relaxation' | 'Culinary' | 'Nightlife' | 'Sightseeing' | 'Romantic';
  durationHours: number;
  pricePerPerson: number;
  image: string;
  description: string;
  includedPerks: string[];
  destinationId: string;
}

export interface CustomAddon {
  id: string;
  name: string;
  pricePerDay: number;
  description: string;
  iconName: string;
  category: 'transport' | 'wellness' | 'service' | 'insurance';
}

export interface CustomItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  activities: CustomActivity[];
  mealsIncluded: string[];
}

export interface CustomTripPlan {
  destinationId: string;
  destinationName: string;
  travelStyle: 'Romantic Honeymoon' | 'Luxury Beach & Spa' | 'Adventure & Nature' | 'Culture & Heritage' | 'Family Fun' | 'Solo Explorer';
  startDate: string;
  durationDays: number;
  travelersCount: number;
  accommodationTier: 'luxury_resort' | 'private_villa' | 'boutique_hotel';
  selectedActivities: CustomActivity[];
  selectedAddons: CustomAddon[];
  totalPriceUSD: number;
}

