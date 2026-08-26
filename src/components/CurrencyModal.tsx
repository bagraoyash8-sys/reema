import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../types';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({ isOpen, onClose }) => {
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  if (!isOpen) return null;

  const currencyList = Object.entries(availableCurrencies) as [CurrencyCode, { symbol: string; name: string; rate: number }][];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
            <Globe className="w-5 h-5 text-brand-600" />
            <span>Select Display Currency</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency Grid */}
        <div className="p-6 grid grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {currencyList.map(([code, info]) => {
            const isSelected = currency === code;
            return (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  onClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-medium ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{code}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium">
                      {info.symbol}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 truncate">{info.name}</div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-brand-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
          Prices are converted based on live global travel reference rates.
        </div>
      </div>
    </div>
  );
};
