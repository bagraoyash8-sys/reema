import { Hotel } from '../types';

export const MOCK_HOTELS: Hotel[] = [
  // 1. Bali - AYANA Resort and Spa
  {
    id: 'h-bali-ayana',
    name: 'AYANA Resort Bali & Rock Bar',
    tagline: 'Clifftop sanctuary overlooking Jimbaran Bay with iconic sunset rock bar',
    category: 'resort',
    city: 'Bali',
    country: 'Indonesia',
    address: 'Jl. Karang Mas Sejahtera, Jimbaran, South Kuta, Bali',
    distanceFromCenterKm: 1.2,
    landmark: '500m to Jimbaran Beach',
    starRating: 5,
    ratingScore: 9.4,
    ratingText: 'Exceptional',
    reviewCount: 3420,
    featuredBadge: 'Special Deal',
    coverImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Private Beach', '12 Swimming Pools', 'Rock Bar Access', 'Luxury Spa', 'Free High-Speed Wi-Fi', 'Free Airport Shuttle', 'Fitness Center', 'Kid’s Club'],
    highlights: ['World-Famous Sunset Bar', 'Private White Sand Beach', 'Hydrotherapy Seawater Pool', 'Exceptional Breakfast Buffet'],
    description: 'Perched high above Jimbaran Bay on a limestone cliff, AYANA Resort Bali features 90 hectares of tropical gardens, 12 stunning swimming pools including the famous clifftop infinity pool, world-class dining, and exclusive priority access to the renowned Rock Bar Bali.',
    pricePerNight: 185,
    originalPricePerNight: 260,
    discountPercentage: 29,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.6,
      comfort: 9.5,
      location: 9.7,
      services: 9.4,
      valueForMoney: 9.1,
      freeWifi: 9.3,
    },
    locationCoords: { lat: -8.7845, lng: 115.1523 },
    nearbyAttractions: [
      { name: 'Rock Bar Bali', distance: '100 m' },
      { name: 'Jimbaran Seafood Beach', distance: '1.4 km' },
      { name: 'Uluwatu Temple', distance: '11.2 km' },
      { name: 'Ngurah Rai International Airport', distance: '9.8 km' },
    ],
    rooms: [
      {
        id: 'r-ayana-1',
        hotelId: 'h-bali-ayana',
        name: 'Deluxe Ocean View King Room',
        bedType: '1 King Bed',
        maxGuests: 2,
        roomSizeSqM: 48,
        pricePerNight: 185,
        originalPricePerNight: 260,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 4,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        features: ['Private Balcony with Sea View', 'Marble Bathroom & Deep Soaking Tub', 'Complimentary Minibar', 'Espresso Machine']
      },
      {
        id: 'r-ayana-2',
        hotelId: 'h-bali-ayana',
        name: 'Cliffside Ocean Villa with Private Plunge Pool',
        bedType: '1 Super King Bed',
        maxGuests: 3,
        roomSizeSqM: 110,
        pricePerNight: 390,
        originalPricePerNight: 550,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 2,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        features: ['Private Infinity Plunge Pool', '24-hour Butler Service', 'Direct Ocean Sunset Horizon', 'VIP Rock Bar Reservations']
      },
      {
        id: 'r-ayana-3',
        hotelId: 'h-bali-ayana',
        name: 'Resort View Twin Room',
        bedType: '2 Double Beds',
        maxGuests: 4,
        roomSizeSqM: 52,
        pricePerNight: 160,
        originalPricePerNight: 215,
        hasBreakfast: false,
        freeCancellation: true,
        payAtHotel: false,
        availableRooms: 6,
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'],
        features: ['Lush Botanical Garden View', 'Rain Shower', 'Smart TV with Streaming', 'Soundproof Rooms']
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena Rostova',
        country: 'United Kingdom',
        rating: 9.8,
        date: '2026-07-14',
        roomType: 'Cliffside Ocean Villa with Private Plunge Pool',
        title: 'Unbelievable cliff views and rock bar experience!',
        comment: 'Staying at AYANA was the absolute highlight of our Bali trip. The sunset from our villa plunge pool was breathtaking and the priority access to Rock Bar saved us hours in queue.',
        positiveHighlight: 'Sunset view from the private villa',
        tripType: 'Couple'
      },
      {
        id: 'rev-2',
        author: 'Marcus Vance',
        country: 'Australia',
        rating: 9.2,
        date: '2026-06-28',
        roomType: 'Deluxe Ocean View King Room',
        title: 'Outstanding breakfast and pool variety',
        comment: 'With 12 pools we never felt crowded. Breakfast at To\'Ge was sensational with dishes from around the world. Staff went above and beyond for our anniversary.',
        positiveHighlight: 'Breakfast selection and ocean view pool',
        tripType: 'Family'
      }
    ]
  },

  // 2. Tokyo - Cerulean Tower Tokyu Hotel Shibuya
  {
    id: 'h-tokyo-shibuya',
    name: 'Cerulean Tower Tokyu Hotel Shibuya',
    tagline: 'High-rise luxury overlooking Shibuya Crossing & Mount Fuji',
    category: 'hotel',
    city: 'Tokyo',
    country: 'Japan',
    address: '26-1 Sakuragaokacho, Shibuya-ku, Tokyo',
    distanceFromCenterKm: 0.4,
    landmark: '350m from Shibuya Scramble Crossing',
    starRating: 5,
    ratingScore: 9.2,
    ratingText: 'Exceptional',
    reviewCount: 2890,
    featuredBadge: 'Best Seller',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Shibuya Sky View', 'Indoor Heated Pool', 'Fitness Club & Sauna', '6 Michelin-grade Restaurants', 'Free High-Speed Wi-Fi', 'Direct Airport Limousine Bus'],
    highlights: ['Panoramic Shibuya Crossing & Mt. Fuji views', '5-minute walk to Shibuya JR Station', 'Spacious rooms for central Tokyo', 'Traditional Noh Theater inside hotel'],
    description: 'Located in the beating heart of Shibuya, Cerulean Tower Tokyu Hotel occupies the 19th through 37th floors of a landmark skyscraper. Experience serene Japanese hospitality with unmatched panoramic vistas across the Tokyo skyline.',
    pricePerNight: 195,
    originalPricePerNight: 280,
    discountPercentage: 30,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.7,
      comfort: 9.4,
      location: 9.8,
      services: 9.5,
      valueForMoney: 8.9,
      freeWifi: 9.6,
    },
    locationCoords: { lat: 35.6562, lng: 139.7005 },
    nearbyAttractions: [
      { name: 'Shibuya Scramble Crossing', distance: '350 m' },
      { name: 'Hachiko Memorial Statue', distance: '400 m' },
      { name: 'Shinjuku Gyoen National Garden', distance: '3.1 km' },
      { name: 'Meiji Jingu Shrine', distance: '1.9 km' }
    ],
    rooms: [
      {
        id: 'r-tokyo-1',
        hotelId: 'h-tokyo-shibuya',
        name: 'Tower Superior King Room (High Floor)',
        bedType: '1 King Bed',
        maxGuests: 2,
        roomSizeSqM: 38,
        pricePerNight: 195,
        originalPricePerNight: 280,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 5,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        features: ['Floor 28-35 Skyline View', 'Deep Japanese Soak Tub', 'High-speed Wi-Fi 6', 'Yukata robes & slippers']
      },
      {
        id: 'r-tokyo-2',
        hotelId: 'h-tokyo-shibuya',
        name: 'Executive Corner Suite with Mount Fuji View',
        bedType: '1 Super King Bed',
        maxGuests: 2,
        roomSizeSqM: 68,
        pricePerNight: 360,
        originalPricePerNight: 480,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 1,
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'],
        features: ['Panoramic Corner Windows', 'Executive Club Lounge Access', 'Complimentary Evening Cocktails', 'Nespresso Coffee Bar']
      }
    ],
    reviews: [
      {
        id: 'rev-tok-1',
        author: 'Kenji Sato',
        country: 'United States',
        rating: 9.6,
        date: '2026-07-20',
        roomType: 'Tower Superior King Room (High Floor)',
        title: 'Perfect location right next to Shibuya station',
        comment: 'Very quiet rooms considering how lively Shibuya is right downstairs. Being able to see Mount Fuji on a clear morning from our bed was unforgettable.',
        positiveHighlight: 'Views of Mt. Fuji and Shibuya station proximity',
        tripType: 'Solo traveler'
      }
    ]
  },

  // 3. Paris - Hôtel Plaza Athénée
  {
    id: 'h-paris-plaza',
    name: 'Hôtel Plaza Athénée Paris',
    tagline: 'Haute couture elegance on Avenue Montaigne with Eiffel Tower views',
    category: 'hotel',
    city: 'Paris',
    country: 'France',
    address: '25 Avenue Montaigne, 8th arr., Paris',
    distanceFromCenterKm: 1.8,
    landmark: '800m to Eiffel Tower & Champs-Élysées',
    starRating: 5,
    ratingScore: 9.6,
    ratingText: 'Exceptional',
    reviewCount: 1950,
    featuredBadge: 'Rare Find',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Eiffel Tower Balcony Views', 'Dior Spa', 'Courtyard Garden Restaurant', 'Concierge Clefs d’Or', 'Pet Friendly', 'Free High-Speed Wi-Fi', 'Valet Parking'],
    highlights: ['Iconic Red Geranium Facade', 'Steps from Haute Couture Boutiques', 'Signature Alain Ducasse Cuisine', 'Dior Luxury Wellness Spa'],
    description: 'The epitome of Parisian luxury since 1913, Hôtel Plaza Athénée stands proudly on the prestigious Avenue Montaigne. Offering signature red geranium draped balconies, Parisian haute couture decor, and peerless vistas of the Eiffel Tower.',
    pricePerNight: 340,
    originalPricePerNight: 460,
    discountPercentage: 26,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.9,
      comfort: 9.8,
      location: 9.9,
      services: 9.8,
      valueForMoney: 8.8,
      freeWifi: 9.4,
    },
    locationCoords: { lat: 48.8661, lng: 2.3047 },
    nearbyAttractions: [
      { name: 'Champs-Élysées', distance: '400 m' },
      { name: 'Eiffel Tower', distance: '850 m' },
      { name: 'Arc de Triomphe', distance: '1.2 km' },
      { name: 'Louvre Museum', distance: '2.5 km' }
    ],
    rooms: [
      {
        id: 'r-paris-1',
        hotelId: 'h-paris-plaza',
        name: 'Prestige Room with Parisian Courtyard View',
        bedType: '1 Queen Bed',
        maxGuests: 2,
        roomSizeSqM: 42,
        pricePerNight: 340,
        originalPricePerNight: 460,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 3,
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'],
        features: ['Louis XVI Antique Decor', 'Italian Marble Bathroom', 'Dior Beauty Amenities', 'Pillow Menu']
      },
      {
        id: 'r-paris-2',
        hotelId: 'h-paris-plaza',
        name: 'Signature Eiffel Tower View Balcony Suite',
        bedType: '1 King Bed',
        maxGuests: 3,
        roomSizeSqM: 80,
        pricePerNight: 650,
        originalPricePerNight: 890,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 2,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        features: ['Direct Eiffel Tower Balcony', 'Separate Salon & Dining Room', 'Champagne Welcome Basket', 'Chauffeured Airport Transfer']
      }
    ],
    reviews: [
      {
        id: 'rev-par-1',
        author: 'Sophie Dubois',
        country: 'Switzerland',
        rating: 10.0,
        date: '2026-08-05',
        roomType: 'Signature Eiffel Tower View Balcony Suite',
        title: 'Pure magic in the heart of Paris',
        comment: 'Having morning croissants on the balcony watching the Eiffel Tower sparkle was a dream come true. The Dior spa treatments were sublime.',
        positiveHighlight: 'Balcony breakfast with Eiffel Tower view',
        tripType: 'Couple'
      }
    ]
  },

  // 4. Goa - The Leela Palace Beach Resort Goa
  {
    id: 'h-goa-leela',
    name: 'The Leela Palace Beach Resort Goa',
    tagline: '75-acre riverside luxury estate with private Mobor beach access',
    category: 'resort',
    city: 'Goa',
    country: 'India',
    address: 'Mobor Beach, Cavelossim, South Goa',
    distanceFromCenterKm: 0.1,
    landmark: 'Direct Beachfront on Mobor Beach',
    starRating: 5,
    ratingScore: 9.3,
    ratingText: 'Exceptional',
    reviewCount: 3100,
    featuredBadge: 'Special Deal',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Private Beach', '12-Hole Golf Course', 'Lagoon Pool', 'Ayurvedic Wellness Spa', '4 Fine Dining Restaurants', 'Free Wi-Fi', 'Water Sports'],
    highlights: ['Portuguese-Vijayanagara Royal Architecture', '75 Acres of Lush Tropical Lagoons', 'Romantic Sunset River Cruises', 'Private Beach Shacks'],
    description: 'Set between the Arabian Sea and the serene Sal River, The Leela Goa offers opulent royal palace architecture, lush lotus ponds, world-class golf, and idyllic private beach tranquility.',
    pricePerNight: 95,
    originalPricePerNight: 140,
    discountPercentage: 32,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.5,
      comfort: 9.4,
      location: 9.7,
      services: 9.3,
      valueForMoney: 9.2,
      freeWifi: 9.0,
    },
    locationCoords: { lat: 15.1583, lng: 73.9472 },
    nearbyAttractions: [
      { name: 'Mobor Beach', distance: '50 m' },
      { name: 'Sal River Boat Cruise', distance: '300 m' },
      { name: 'Cavelossim Market', distance: '2.1 km' },
      { name: 'Goa International Airport (Dabolim)', distance: '38 km' }
    ],
    rooms: [
      {
        id: 'r-goa-1',
        hotelId: 'h-goa-leela',
        name: 'Lagoon View Deluxe Suite',
        bedType: '1 King Bed',
        maxGuests: 3,
        roomSizeSqM: 54,
        pricePerNight: 95,
        originalPricePerNight: 140,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 6,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        features: ['Lotus Lagoon Balcony', 'Deep Soaking Tub', 'Daily High Tea Inclusions', 'Complimentary Yoga Sessions']
      },
      {
        id: 'r-goa-2',
        hotelId: 'h-goa-leela',
        name: 'Royal Beachfront Villa with Private Jacuzzi',
        bedType: '1 Super King Bed',
        maxGuests: 4,
        roomSizeSqM: 120,
        pricePerNight: 230,
        originalPricePerNight: 320,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 2,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        features: ['Direct Walkout to Mobor Beach', 'Private Garden & Jacuzzi', 'Dedicated Butler Service', 'Free Airport Luxury Transfer']
      }
    ],
    reviews: [
      {
        id: 'rev-goa-1',
        author: 'Aarav Sharma',
        country: 'India',
        rating: 9.5,
        date: '2026-08-10',
        roomType: 'Royal Beachfront Villa with Private Jacuzzi',
        title: 'Unmatched hospitality and pristine beach',
        comment: 'South Goa at its absolute finest. The private beach is exceptionally clean compared to North Goa, and the seafood buffet at Susegado was world-class.',
        positiveHighlight: 'Cleanliness of the private beach',
        tripType: 'Family'
      }
    ]
  },

  // 5. Dubai - Atlantis The Royal & Palm Jumeirah
  {
    id: 'h-dubai-atlantis',
    name: 'Atlantis The Royal Resort & Residences',
    tagline: 'Ultra-luxury architectural masterpiece on Palm Jumeirah with sky pools',
    category: 'resort',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Crescent Rd, Palm Jumeirah, Dubai',
    distanceFromCenterKm: 4.5,
    landmark: 'On Palm Jumeirah Island',
    starRating: 5,
    ratingScore: 9.7,
    ratingText: 'Exceptional',
    reviewCount: 4200,
    featuredBadge: 'Trending',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Cloud 22 Rooftop Sky Pool', 'Aquaventure Waterpark Access', '17 Celebrity Chef Restaurants', 'Private Beach Club', 'Awaken Spa', 'Free Wi-Fi', 'Helipad'],
    highlights: ['Cloud 22 90m Skypool', 'Unlimited Access to World’s Largest Waterpark', 'Nobu by the Beach & Dinner by Heston', 'Dancing Fire & Water Fountains'],
    description: 'Crafted by the world’s leading designers and artists, Atlantis The Royal completely redefines modern ultra-luxury. Featuring soaring sky gardens, Michelin-starred culinary dining, and unforgettable views of the Arabian Gulf and Dubai skyline.',
    pricePerNight: 280,
    originalPricePerNight: 390,
    discountPercentage: 28,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.8,
      comfort: 9.7,
      location: 9.6,
      services: 9.7,
      valueForMoney: 9.0,
      freeWifi: 9.8,
    },
    locationCoords: { lat: 25.1378, lng: 55.1281 },
    nearbyAttractions: [
      { name: 'Aquaventure Waterpark', distance: '200 m' },
      { name: 'The Lost Chambers Aquarium', distance: '400 m' },
      { name: 'Dubai Marina Walk', distance: '9.2 km' },
      { name: 'Burj Khalifa & Dubai Mall', distance: '22 km' }
    ],
    rooms: [
      {
        id: 'r-dubai-1',
        hotelId: 'h-dubai-atlantis',
        name: 'Royal Seascape King Room',
        bedType: '1 King Bed',
        maxGuests: 2,
        roomSizeSqM: 55,
        pricePerNight: 280,
        originalPricePerNight: 390,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 7,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        features: ['Arabian Sea Sunset Balcony', 'Walk-in Dressing Room', 'Hermès Luxury Toiletries', 'Complimentary Waterpark Tickets']
      },
      {
        id: 'r-dubai-2',
        hotelId: 'h-dubai-atlantis',
        name: 'Sky Pool Villa with Private Infinity Plunge',
        bedType: '1 Super King Bed',
        maxGuests: 3,
        roomSizeSqM: 118,
        pricePerNight: 580,
        originalPricePerNight: 780,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 1,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        features: ['Elevated Sky Infinity Pool', 'Dining Terrace overlooking Dubai Skyline', 'VIP Cloud 22 Cabana Included', 'Private Butler']
      }
    ],
    reviews: [
      {
        id: 'rev-dxb-1',
        author: 'Tariq Al-Mansoor',
        country: 'Qatar',
        rating: 9.8,
        date: '2026-07-29',
        roomType: 'Sky Pool Villa with Private Infinity Plunge',
        title: 'The ultimate luxury experience in the Middle East',
        comment: 'Every single touch point is extraordinary. Cloud 22 infinity pool is like something out of a futuristic movie. The breakfast buffet was unmatched.',
        positiveHighlight: 'Cloud 22 skypool and dining options',
        tripType: 'Couple'
      }
    ]
  },

  // 6. Santorini - Grace Hotel Auberge Resorts
  {
    id: 'h-santorini-grace',
    name: 'Grace Hotel, Auberge Resorts Collection',
    tagline: 'Cliffside Caldera sanctuary in Imerovigli with iconic infinity pool',
    category: 'villa',
    city: 'Santorini',
    country: 'Greece',
    address: 'Imerovigli, Santorini',
    distanceFromCenterKm: 0.2,
    landmark: 'Top of Caldera in Imerovigli',
    starRating: 5,
    ratingScore: 9.8,
    ratingText: 'Exceptional',
    reviewCount: 1650,
    featuredBadge: 'Rare Find',
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Caldera Infinity Pool', 'Santoro Mediterranean Fine Dining', 'Champagne Breakfast Included', 'Private Sunset Terraces', 'Free Wi-Fi', 'Bespoke Island Tours'],
    highlights: ['Voted World’s Best Sunset Hotel', 'Cliff-edge Infinity Pool overlooking Skaros Rock', 'Cave Suites with Heated Outdoor Jacuzzis', '5-Course Champagne Breakfast'],
    description: 'Carved into the rugged volcanic cliffs of Imerovigli, Grace Hotel offers uninterrupted panoramas across the Aegean Caldera. Enjoy tranquil cliffside suites, legendary sunsets, and Michelin-caliber Mediterranean gastronomy.',
    pricePerNight: 240,
    originalPricePerNight: 340,
    discountPercentage: 29,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.9,
      comfort: 9.8,
      location: 10.0,
      services: 9.9,
      valueForMoney: 9.3,
      freeWifi: 9.6,
    },
    locationCoords: { lat: 36.4328, lng: 25.4221 },
    nearbyAttractions: [
      { name: 'Skaros Rock Trail', distance: '300 m' },
      { name: 'Fira Capital Town', distance: '1.8 km' },
      { name: 'Oia Sunset Point', distance: '8.4 km' },
      { name: 'Santorini Airport (JTR)', distance: '7.8 km' }
    ],
    rooms: [
      {
        id: 'r-sant-1',
        hotelId: 'h-santorini-grace',
        name: 'Deluxe Caldera View Suite with Outdoor Plunge Pool',
        bedType: '1 King Bed',
        maxGuests: 2,
        roomSizeSqM: 45,
        pricePerNight: 240,
        originalPricePerNight: 340,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 3,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        features: ['Heated Outdoor Caldera Plunge Pool', 'Private Sunset Sun Deck', 'Apivita Greek Organic Toiletries', 'Daily Champagne Breakfast']
      }
    ],
    reviews: [
      {
        id: 'rev-sant-1',
        author: 'Chloe Dupont',
        country: 'France',
        rating: 10.0,
        date: '2026-08-01',
        roomType: 'Deluxe Caldera View Suite with Outdoor Plunge Pool',
        title: 'The best hotel experience of my life',
        comment: 'Sitting in our heated plunge pool watching the sunset sink into the Aegean was pure poetry. The champagne breakfast delivered to our balcony was sensational.',
        positiveHighlight: 'Sunset views and heated plunge pool',
        tripType: 'Couple'
      }
    ]
  },

  // 7. Maldives - Soneva Jani Overwater Resort
  {
    id: 'h-maldives-soneva',
    name: 'Soneva Jani Luxury Overwater Resort',
    tagline: 'Water villas with private slides directly into turquoise crystal lagoon',
    category: 'resort',
    city: 'Maldives',
    country: 'Maldives',
    address: 'Medhufaru Island, Noonu Atoll, Maldives',
    distanceFromCenterKm: 0.1,
    landmark: 'Private Island in Noonu Atoll',
    starRating: 5,
    ratingScore: 9.9,
    ratingText: 'Exceptional',
    reviewCount: 980,
    featuredBadge: 'Special Deal',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Overwater Water Slide', 'Retractable Stargazing Roof', 'Private Lagoon Pool', 'Barefoot Butler (Mr./Ms. Friday)', 'Overwater Silent Cinema', 'Free Wi-Fi', 'House Reef Snorkeling'],
    highlights: ['Direct Lagoon Slide from Villa', 'Retractable Roof to Stargaze from Master Bed', 'Cinema Paradiso Overwater Movie Screen', 'Complimentary Chocolate & Ice Cream Rooms'],
    description: 'Encompassed by 5.6 kilometers of pristine turquoise lagoon, Soneva Jani is one of the lowest density resorts in the world. Each lavish overwater villa features its own private pool, waterslides, and retractable master bedroom roofs.',
    pricePerNight: 450,
    originalPricePerNight: 650,
    discountPercentage: 30,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 10.0,
      comfort: 10.0,
      location: 10.0,
      services: 9.9,
      valueForMoney: 9.5,
      freeWifi: 9.7,
    },
    locationCoords: { lat: 5.7725, lng: 73.3082 },
    nearbyAttractions: [
      { name: 'Noonu Atoll Coral Reef', distance: '50 m' },
      { name: 'Dolphin Safari Bay', distance: '1.2 km' },
      { name: 'Cinema Paradiso Overwater', distance: '200 m' }
    ],
    rooms: [
      {
        id: 'r-mald-1',
        hotelId: 'h-maldives-soneva',
        name: '1-Bedroom Water Retreat with Slide & Private Pool',
        bedType: '1 Super King Bed',
        maxGuests: 3,
        roomSizeSqM: 411,
        pricePerNight: 450,
        originalPricePerNight: 650,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 2,
        images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'],
        features: ['Curved Waterslide into Lagoon', 'Retractable Master Bedroom Roof', '13-meter Private Freshwater Pool', 'Sunken Outdoor Living Seating']
      }
    ],
    reviews: [
      {
        id: 'rev-mald-1',
        author: 'Alexander Wright',
        country: 'Canada',
        rating: 10.0,
        date: '2026-08-15',
        roomType: '1-Bedroom Water Retreat with Slide & Private Pool',
        title: 'Heaven on earth - worth every single penny',
        comment: 'Sliding straight into the crystal clear ocean every morning and opening the bedroom roof to sleep under the stars was an experience we will cherish forever.',
        positiveHighlight: 'Water slide into the lagoon and stargazing roof',
        tripType: 'Couple'
      }
    ]
  },

  // 8. Singapore - Marina Bay Sands Iconic Hotel
  {
    id: 'h-sg-mbs',
    name: 'Marina Bay Sands Landmark Hotel',
    tagline: 'World-famous infinity pool spanning three soaring towers over the bay',
    category: 'hotel',
    city: 'Singapore',
    country: 'Singapore',
    address: '10 Bayfront Avenue, Marina Bay, Singapore',
    distanceFromCenterKm: 0.5,
    landmark: 'Direct on Marina Bay Waterfront',
    starRating: 5,
    ratingScore: 9.3,
    ratingText: 'Exceptional',
    reviewCount: 5600,
    featuredBadge: 'Top Value',
    coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['57th Floor Infinity SkyPool', 'Sands SkyPark Observation Deck', 'Direct Mall & Casino Access', 'Banyan Tree Spa', 'Award-Winning Celebrity Dining', 'Free Wi-Fi'],
    highlights: ['Access to World’s Largest Rooftop Infinity Pool', 'Spectacular Bay & Gardens by the Bay views', 'Connected to The Shoppes & ArtScience Museum', 'MTR Bayfront Station beneath hotel'],
    description: 'Crown jewel of Singapore’s skyline, Marina Bay Sands offers the ultimate luxury stay with exclusive access to the legendary rooftop infinity pool 57 stories above the sparkling city.',
    pricePerNight: 230,
    originalPricePerNight: 320,
    discountPercentage: 28,
    freeCancellation: true,
    hasBreakfast: true,
    reviewScores: {
      cleanliness: 9.6,
      comfort: 9.5,
      location: 9.8,
      services: 9.2,
      valueForMoney: 9.0,
      freeWifi: 9.5,
    },
    locationCoords: { lat: 1.2834, lng: 103.8607 },
    nearbyAttractions: [
      { name: 'Gardens by the Bay', distance: '250 m' },
      { name: 'ArtScience Museum', distance: '150 m' },
      { name: 'Merlion Park', distance: '900 m' },
      { name: 'Changi International Airport', distance: '18 km' }
    ],
    rooms: [
      {
        id: 'r-sg-1',
        hotelId: 'h-sg-mbs',
        name: 'Sands Premier King Room (Gardens View)',
        bedType: '1 King Bed',
        maxGuests: 2,
        roomSizeSqM: 45,
        pricePerNight: 230,
        originalPricePerNight: 320,
        hasBreakfast: true,
        freeCancellation: true,
        payAtHotel: true,
        availableRooms: 5,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        features: ['Rooftop Infinity Pool Access Card', 'Views of Supertree Grove & Sea', 'Soaking Bathtub', 'TWG Luxury Teas']
      }
    ],
    reviews: [
      {
        id: 'rev-sg-1',
        author: 'Daniel Craig',
        country: 'United Kingdom',
        rating: 9.4,
        date: '2026-08-11',
        roomType: 'Sands Premier King Room (Gardens View)',
        title: 'The infinity pool alone is worth the trip',
        comment: 'Swimming along the edge on the 57th floor at night watching the lights of Singapore is unbeatable. Direct access to Gardens by the Bay was super convenient.',
        positiveHighlight: '57th floor infinity skypool',
        tripType: 'Couple'
      }
    ]
  }
];
