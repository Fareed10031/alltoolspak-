import React from 'react';
import dynamic from 'next/dynamic';

const CurrencyGoldRates = dynamic(
  () => import('@/components/tools/CurrencyGoldRates'),
  { ssr: false, loading: () => (
    <div id="live-rates-container" style={{ fontFamily: 'Inter, sans-serif', maxWidth: '700px', margin: 'auto' }} className="py-8">
      <div id="live-gold-pkr-box" style={{ border: '1.5px solid #e5e7eb', padding: '20px', borderRadius: '16px', background: '#ffffff', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ color: '#6b7280' }}>Loading Live Market Data...</p>
      </div>
    </div>
  ) }
);

export const metadata = {
  title:
    'USD to PKR Today | Live Dollar Rate Pakistan + Gold Price Per Tola | AllToolsPK',
  description:
    'Live USD to PKR today rate, 500 USD to PKR conversion, Gold per tola and 10 gram Sarafa rates in Pakistan. Updates every 60 seconds.',
  keywords:
    'usd to pkr, dollar to pkr, 1 dollar in pkr, 500 usd to pkr, gold rate today pakistan, gold per tola, sone ka rate, dollar rate today',
};

export default function CurrencyGoldRatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CurrencyConversionService",
            "name": "USD to PKR Live Rate",
            "description": "Live USD to PKR and Gold Rate in Pakistan"
          })
        }}
      />
      <CurrencyGoldRates />
    </>
  );
}
