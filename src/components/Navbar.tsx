import React, { useState } from 'react';
import { Compass, Heart, Luggage, Globe, User, Menu, X, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { CurrencyModal } from './CurrencyModal';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  currentTab: string;
  onNavigate: (page: string, params?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { currency } = useCurrency();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 block">
                    Bespoke Luxury Stays
                  </span>
                </div>
              </button>

              {/* Main Navigation Tabs */}
              <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
                <button
                  onClick={() => onNavigate('home')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentTab === 'home' || currentTab === 'search' || currentTab === 'hotel-detail'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  Hotels & Stays
                </button>
                <button
                  onClick={() => onNavigate('custom-planner')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentTab === 'custom-planner'
                      ? 'bg-gradient-to-r from-brand-600 to-teal-600 text-white shadow-md'
                      : 'text-brand-700 hover:bg-brand-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Custom Trip Planner</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-black">
                    15% OFF
                  </span>
                </button>
              </nav>
            </div>

            {/* Right Action Utilities */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Currency Selector */}
              <button
                onClick={() => setIsCurrencyModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80"
                title="Change Currency"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">{currency}</span>
              </button>

              {/* Saved / Wishlist */}
              <button
                onClick={() => onNavigate('wishlist')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors relative"
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
                <span>Saved</span>
                {wishlistCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-scaleUp">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* My Trips */}
              <button
                onClick={() => onNavigate('trips')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'trips'
                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Luggage className="w-4 h-4 text-slate-500" />
                <span>My Bookings</span>
              </button>

              {/* Sign In / User Profile */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100/80 text-teal-900 text-xs sm:text-sm font-bold border border-teal-200 transition-all shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span>{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-scaleUp">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
                          <CheckCircle2 className="w-3 h-3" /> Cross-Device Synced
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onNavigate('trips');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 mt-1"
                      >
                        <Luggage className="w-3.5 h-3.5" />
                        <span>My Bookings</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Sign In / Register</span>
                </button>
              )}
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
              <span>My Bookings</span>
            </button>

            <div className="pt-2">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-teal-50 rounded-xl">
                    <p className="text-xs font-bold text-teal-900">Logged in as {user.name}</p>
                    <p className="text-[11px] text-teal-700 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm text-center"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm text-center shadow-sm"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </header>

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
