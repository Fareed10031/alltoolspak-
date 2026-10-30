import React from 'react';
import CurrencyGoldRates from '@/components/tools/CurrencyGoldRates';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Currency & Gold Rates Pakistan - USD to PKR & Sarafa Gold",
  description: "Free Currency & Gold Rates Pakistan with live USD to PKR interbank rates and 24K Sarafa gold rates per tola and 10 grams in Pakistan.",
  alternates: {
    canonical: "https://alltoolspk.com/currency-gold-rates/",
  },
};

export default function Page() {
  return (
    <>
      <CurrencyGoldRates />
      <AllToolsSEO
        toolName="Currency & Gold Rates"
        slug="/currency-gold-rates"
        keyword="Free Currency Gold Rate Pakistan"
        desc="Real-time interbank USD to PKR exchange rates and authentic 24K Sarafa gold prices per tola, 10 grams, and 1 gram in Pakistan."
      />
    </>
  );
}
