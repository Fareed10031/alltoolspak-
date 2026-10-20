import React from 'react';
import dynamic from 'next/dynamic';

const CurrencyGoldRates = dynamic(
  () => import('@/components/tools/CurrencyGoldRates'),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading USD to PKR Live...</p> }
);

export const metadata = {
  title: "USD to PKR Live Rate Today - Dollar Rate in Pakistan | AllToolsPK",
  description: "Live USD to PKR today rate, 500 USD to PKR conversion, Interbank and Sarafa gold prices in Pakistan. Auto-refreshes every 60 seconds."
};

export default function UsdToPkrPage() {
  return <CurrencyGoldRates />;
}
