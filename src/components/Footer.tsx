import React from 'react';
import { Compass, ShieldCheck, Headphones, Award, CreditCard, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center flex-shrink-0 text-brand-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Best Price Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">
                Find a lower price anywhere? We'll match it and give you an extra 10% credit.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center flex-shrink-0 text-brand-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Instant Confirmation</h4>
              <p className="text-xs text-slate-400 mt-1">
                Zero waiting. Digital booking vouchers with scannable QR verification code.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center flex-shrink-0 text-brand-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Flexible Pay Options</h4>
              <p className="text-xs text-slate-400 mt-1">
                Pay online or hold your room with zero deposit and pay at the property upon check-in.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-700/50 flex items-center justify-center flex-shrink-0 text-brand-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">24/7 Global Support</h4>
              <p className="text-xs text-slate-400 mt-1">
                Multi-lingual concierge ready to assist before, during, and after your trip.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-['Outfit']">
                VOYARA TRAVELS
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Discover and book over 2,000,000+ luxury hotels, boutique resorts, private beachfront villas, and curated homestays worldwide.
            </p>
            
            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscribe & get code VOYARA20 for 20% OFF</span>
              </div>
              <div className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border border-slate-700 text-sm px-4 py-2.5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 flex-1"
                />
                <button className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm transition-colors flex items-center gap-1">
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 1: Top Destinations */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Top Destinations</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Bali' })} className="hover:text-brand-400 transition-colors">
                  Hotels in Bali
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Tokyo' })} className="hover:text-brand-400 transition-colors">
                  Hotels in Tokyo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Paris' })} className="hover:text-brand-400 transition-colors">
                  Hotels in Paris
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Goa' })} className="hover:text-brand-400 transition-colors">
                  Hotels in Goa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Dubai' })} className="hover:text-brand-400 transition-colors">
                  Hotels in Dubai
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Santorini' })} className="hover:text-brand-400 transition-colors">
                  Hotels in Santorini
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Accommodation */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Property Types</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('search', { category: 'hotel' })} className="hover:text-brand-400 transition-colors">
                  5-Star City Hotels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { category: 'resort' })} className="hover:text-brand-400 transition-colors">
                  Beachfront Luxury Resorts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { category: 'villa' })} className="hover:text-brand-400 transition-colors">
                  Private Pool Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { category: 'homestay' })} className="hover:text-brand-400 transition-colors">
                  Boutique Homestays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search', { destination: 'Maldives' })} className="hover:text-brand-400 transition-colors">
                  Overwater Bungalows
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Policies */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support & Trust</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#help" className="hover:text-brand-400 transition-colors">Help Center / FAQ</a></li>
              <li><button onClick={() => onNavigate('trips')} className="hover:text-brand-400 transition-colors">Manage My Booking</button></li>
              <li><a href="#terms" className="hover:text-brand-400 transition-colors">Cancellation Policies</a></li>
              <li><a href="#privacy" className="hover:text-brand-400 transition-colors">Privacy Statement</a></li>
              <li><a href="#security" className="hover:text-brand-400 transition-colors">Security & Trust</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Voyara Travels Inc. All rights reserved. Built with pride for Internship Showcase.
        </div>
        <div className="flex items-center gap-6">
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
          <span>Sitemap</span>
          <span className="text-amber-400 font-medium">Internship Edition v1.0</span>
        </div>
      </div>
    </footer>
  );
};
