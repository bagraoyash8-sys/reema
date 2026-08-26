import React, { createContext, useContext, useState } from 'react';
import { StorageService } from '../utils/storage';

interface WishlistContextType {
  wishlist: string[];
  isWishlisted: (hotelId: string) => boolean;
  toggleWishlist: (hotelId: string) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(() => StorageService.getWishlist());

  const toggleWishlist = (hotelId: string) => {
    const updated = StorageService.toggleWishlist(hotelId);
    setWishlist(updated);
  };

  const isWishlisted = (hotelId: string) => wishlist.includes(hotelId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
