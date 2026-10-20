import React from 'react';
import dynamic from 'next/dynamic';

const CurrencyGoldRates = dynamic(
  () => import('@/components/tools/CurrencyGoldRates'),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Gold Price Pakistan...</p> }
);

export const metadata = {
  title: "Gold Price Pakistan Live Today - 24K Per Tola & 10 Gram Rate | AllToolsPK",
  description: "Live 24K Gold rate per tola, 10 gram, and 1 gram today in Pakistan. Auto-calculated with Sarafa market benchmarks. Auto-refreshes every 60 seconds."
};

export default function GoldPricePakistanPage() {
  return <CurrencyGoldRates />;
}
