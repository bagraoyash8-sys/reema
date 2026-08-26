import React, { useState } from 'react';
import { Compass, Heart, Luggage, Globe, User, Menu, X, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { CurrencyModal } from './CurrencyModal';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  currentTab: string;
  onNavigate: (page: string, params?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { currency, availableCurrencies } = useCurrency();
  const { wishlistCount } = useWishlist();
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-teal-500 flex items-center justify-center shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black tracking-tight text-slate-900 font-['Outfit']">
                      VOYARA
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                      TRAVELS
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-700 tracking-wider block uppercase">
                    Hotels & Custom Travel
                  </span>
                </div>
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => onNavigate('home')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    currentTab === 'home'
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Hotels & Stays
                </button>
                <button
                  onClick={() => onNavigate('custom-planner')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    currentTab === 'custom-planner'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-brand-700 bg-brand-50 hover:bg-brand-100/80'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Custom Trip Planner</span>
                </button>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Currency Selector Button */}
              <button
                onClick={() => setIsCurrencyModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                title="Change Currency"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="font-semibold">{currency}</span>
                <span className="text-xs text-slate-500 font-mono">
                  ({availableCurrencies[currency]?.symbol})
                </span>
              </button>

              {/* Wishlist Link */}
              <button
                onClick={() => onNavigate('wishlist')}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  currentTab === 'wishlist'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
                <span>Saved</span>
                {wishlistCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* My Trips */}
              <button
                onClick={() => onNavigate('trips')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  currentTab === 'trips'
                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Luggage className="w-4 h-4 text-slate-500" />
                <span>My Bookings</span>
              </button>

              {/* Sign In / Profile */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Sign In / Register</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsCurrencyModalOpen(true)}
                className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <span className="text-xs font-bold font-mono">{currency}</span>
              </button>
              <button
                onClick={() => onNavigate('wishlist')}
                className="p-2 text-slate-700 relative rounded-lg hover:bg-slate-100"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50"
            >
              Hotels & Stays
            </button>
            <button
              onClick={() => {
                onNavigate('custom-planner');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-bold text-brand-700 bg-brand-50 hover:bg-brand-100/80 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Custom Trip Planner Studio</span>
            </button>
            <button
              onClick={() => {
                onNavigate('trips');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
            >
              <Luggage className="w-4 h-4 text-slate-500" />
              <span>My Bookings & Vouchers</span>
            </button>
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-brand-600 text-white font-bold text-center text-sm"
            >
              Sign In / Register
            </button>
          </div>
        )}
      </header>

      {/* Modals */}
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
