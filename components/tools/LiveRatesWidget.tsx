'use client';

import React, { useState, useEffect } from 'react';

export function LiveRatesWidget() {
  const [data, setData] = useState<{
    usdToPkr: number;
    goldPerOunceUSD: number;
    perTolaPKR: number;
    per10GramPKR: number;
    perGramPKR: number;
    sarafaTola: number;
    formattedDate: string;
    formattedTime: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateLiveRates = async () => {
    try {
      // Fetch in parallel for speed
      const [usdRes, goldRes] = await Promise.all([
        fetch('https://api.exchangerate-api.com/v4/latest/USD'),
        fetch('https://api.gold-api.com/price/XAU')
      ]);

      if (!usdRes.ok || !goldRes.ok) throw new Error('API failed');

      const usdData = await usdRes.json();
      const goldData = await goldRes.json();

      const usdToPkr = usdData.rates.PKR;
      const goldPerOunceUSD = goldData.price;

      // Calculations
      // 1 Ounce = 31.1035 grams, 1 Tola = 11.664 grams
      const perTolaPKR = (goldPerOunceUSD * usdToPkr / 31.1035) * 11.664;
      const per10GramPKR = (perTolaPKR / 11.664) * 10;
      const perGramPKR = perTolaPKR / 11.664;

      // Sarafa market premium (local market adjustment ~ 2.5%)
      const sarafaTola = perTolaPKR * 1.025;

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' });
      const formattedTime = now.toLocaleString('en-PK', { timeZone: 'Asia/Karachi', hour: '2-digit', minute:'2-digit', hour12: true });

      setData({
        usdToPkr,
        goldPerOunceUSD,
        perTolaPKR,
        per10GramPKR,
        perGramPKR,
        sarafaTola,
        formattedDate,
        formattedTime,
      });
      setError(null);

      // Dynamic SEO Title - Fixes Indexing Issue
      const newTitle = `USD to PKR Today ${usdToPkr.toFixed(2)} - 500 USD = ${Math.round(usdToPkr*500).toLocaleString('en-US')} PKR | Gold Per Tola Rs.${Math.round(sarafaTola).toLocaleString('en-US')} - ${formattedDate}`;
      document.title = newTitle;

      // Update Meta Description dynamically
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Live USD to PKR today ${usdToPkr.toFixed(2)}, 500 USD = ${Math.round(usdToPkr*500).toLocaleString('en-US')} PKR. Gold per tola Rs.${Math.round(sarafaTola).toLocaleString('en-US')}, 10 gram Rs.${Math.round(per10GramPKR).toLocaleString('en-US')}. Updated ${formattedDate}.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Market data is refreshing';
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateLiveRates();
    const interval = setInterval(updateLiveRates, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* SEO Schema for Google */}
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

      <div id="live-rates-container" style={{ fontFamily: 'Inter, sans-serif', maxWidth: '700px', margin: 'auto' }} className="w-full mb-8">
        <div
          id="live-gold-pkr-box"
          style={{
            border: '1.5px solid #e5e7eb',
            padding: '20px',
            borderRadius: '16px',
            background: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
          className="dark:bg-slate-900 dark:border-slate-800"
        >
          {loading && !data ? (
            <p style={{ color: '#6b7280' }} className="animate-pulse py-4 font-medium">Loading Live Market Data...</p>
          ) : error && !data ? (
            <p style={{ color: '#ef4444', fontSize: '14px' }}>Market data is refreshing. Please wait 10 seconds. Error: {error}</p>
          ) : data ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ background: '#dcfce7', color: '#166534', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>● LIVE</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{data.formattedDate} - {data.formattedTime} PKT</span>
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gold Rate Per Tola (24K)</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: '6px 0' }} className="dark:text-white">
                Rs. {Math.round(data.sarafaTola).toLocaleString('en-US')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px', textAlign: 'left' }}>
                <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '10px' }} className="dark:bg-slate-800">
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>10 Gram</div>
                  <div style={{ fontWeight: 600 }} className="dark:text-white">Rs. {Math.round(data.per10GramPKR * 1.025).toLocaleString('en-US')}</div>
                </div>
                <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '10px' }} className="dark:bg-slate-800">
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>1 Gram</div>
                  <div style={{ fontWeight: 600 }} className="dark:text-white">Rs. {Math.round(data.perGramPKR * 1.025).toLocaleString('en-US')}</div>
                </div>
                <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '10px' }} className="dark:bg-slate-800">
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>USD to PKR</div>
                  <div style={{ fontWeight: 600 }} className="dark:text-white">{data.usdToPkr.toFixed(2)} PKR</div>
                </div>
                <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '10px' }} className="dark:bg-slate-800">
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Gold / Ounce</div>
                  <div style={{ fontWeight: 600 }} className="dark:text-white">${Math.round(data.goldPerOunceUSD).toLocaleString('en-US')}</div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '12px' }}>
                Auto-refreshes every 60 seconds. Source: International Market + Interbank
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default LiveRatesWidget;
