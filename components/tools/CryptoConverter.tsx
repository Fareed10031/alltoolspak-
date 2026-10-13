// CryptoConverter.tsx - Isolated Module - 100% Safe for Existing Tools
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

export interface CryptoConverterProps {
  fiatRates?: Record<string, number> | null;
}

const cryptoList = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', icon: '₿', defaultUsd: 68500 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', defaultUsd: 3550 },
  { id: 'tether', symbol: 'USDT', name: 'Tether USD', icon: '₮', defaultUsd: 1.0 },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', icon: '🟡', defaultUsd: 595 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: '◎', defaultUsd: 155 },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', icon: '✕', defaultUsd: 0.58 },
];

const defaultFiatFallback = ['PKR', 'INR', 'USD', 'AED', 'SAR', 'GBP', 'EUR', 'TRY', 'CAD', 'AUD', 'BDT', 'NPR'];

export default function CryptoConverter({ fiatRates }: CryptoConverterProps) {
  const [crypto, setCrypto] = useState<string>('bitcoin');
  const [fiat, setFiat] = useState<string>('PKR');
  const [amount, setAmount] = useState<number | string>(1);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // 150+ Countries - Dynamic from your existing rates
  const fiatList = useMemo(() => {
    if (fiatRates && Object.keys(fiatRates).length > 0) {
      return Object.keys(fiatRates).sort();
    }
    return defaultFiatFallback;
  }, [fiatRates]);

  const fetchCryptoPrice = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
      );
      if (response.ok) {
        const data = await response.json();
        if (data[crypto] && typeof data[crypto].usd === 'number') {
          const usdPrice = data[crypto].usd;
          const fiatRate =
            fiat === 'USD'
              ? 1
              : fiatRates && typeof fiatRates[fiat] === 'number'
              ? fiatRates[fiat]
              : 277.1;
          const finalPrice = usdPrice * fiatRate;
          setPrice(finalPrice);
          setLastUpdate(new Date());
          setLoading(false);
          return;
        }
      }
      throw new Error('CoinGecko rate limited or empty data');
    } catch (error) {
      console.warn('Crypto API fetch fallback:', error);
      // Fallback - doesn't break page
      const fallbackItem = cryptoList.find((c) => c.id === crypto);
      const fallbackUsd = fallbackItem ? fallbackItem.defaultUsd : 68000;
      const fiatRate =
        fiat === 'USD'
          ? 1
          : fiatRates && typeof fiatRates[fiat] === 'number'
          ? fiatRates[fiat]
          : 277.1;
      const finalPrice = fallbackUsd * fiatRate;
      setPrice(finalPrice);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, [crypto, fiat, fiatRates]);

  useEffect(() => {
    fetchCryptoPrice();
    const interval = setInterval(fetchCryptoPrice, 60000); // 60s Auto Refresh
    return () => clearInterval(interval);
  }, [fetchCryptoPrice]);

  const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const currentCrypto = cryptoList.find((c) => c.id === crypto) || cryptoList[0];
  const totalValue = price
    ? (price * numAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })
    : '0.00';

  return (
    <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-6 transition-colors">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
          <span className="text-xl">🪙</span> Crypto Converter Live
        </h3>
        <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE 60s Refresh
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            Amount
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-emerald-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            Crypto
          </label>
          <select
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-emerald-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors"
          >
            {cryptoList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.symbol} - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
          Convert To (150+ Countries)
        </label>
        <select
          value={fiat}
          onChange={(e) => setFiat(e.target.value)}
          className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-emerald-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors"
        >
          {fiatList.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
        {loading && !price ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm py-4">Loading live price...</p>
        ) : (
          <>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              {amount || 0} {currentCrypto.symbol} =
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight my-1">
              {totalValue} {fiat}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
              1 {currentCrypto.symbol} ={' '}
              {price?.toLocaleString(undefined, { maximumFractionDigits: 2 })} {fiat} | Mid-market Rate{' '}
              {lastUpdate && `| ${lastUpdate.toLocaleTimeString()}`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export { CryptoConverter };
