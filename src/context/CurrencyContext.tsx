import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode } from '../types';
import { CURRENCIES, formatPrice, convertAmount } from '../utils/formatters';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatAmount: (usdAmount: number) => string;
  getConvertedAmount: (usdAmount: number) => number;
  availableCurrencies: typeof CURRENCIES;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('voyara_currency');
    return (saved as CurrencyCode) || 'USD';
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('voyara_currency', code);
  };

  const formatAmount = (usdAmount: number) => {
    return formatPrice(usdAmount, currency);
  };

  const getConvertedAmount = (usdAmount: number) => {
    return convertAmount(usdAmount, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatAmount,
        getConvertedAmount,
        availableCurrencies: CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
