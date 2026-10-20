import React from 'react';
import dynamic from 'next/dynamic';

const CurrencyGoldRates = dynamic(
  () => import('@/components/tools/CurrencyGoldRates'),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Live Currency & Gold Rates...</p> }
);

export const metadata = {
  title: "Live Currency & Gold Rates - USD to PKR & Gold Price | AllToolsPK",
  description: "Live USD to PKR and Gold Rate per tola, 10 gram, and 1 gram in Pakistan. Auto-refreshes every 60 seconds with real-time interbank data."
};

export default function LiveCurrencyGoldRatesPage() {
  return <CurrencyGoldRates />;
}
