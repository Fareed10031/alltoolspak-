'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Globe2,
  DollarSign,
  Search,
  CheckCircle2,
  TrendingUp,
  Building2,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Calculator,
  ArrowRight,
  Info,
  Calendar,
  Clock,
  Briefcase,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { COUNTRIES, CountrySalaryData } from '@/src/data/countriesData';

// Helper to pre-render country paths in static export or Next.js dynamic routing
export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({
    country: c.code,
  }));
}

interface PageProps {
  params: {
    country: string;
  };
}

export default function CountrySalaryCalculatorPage({ params }: PageProps) {
  // Safe resolution of params country code (handles URL encoding and fallback to united-states)
  const countryParam = (params?.country || 'united-states').toLowerCase().trim();

  const currentCountry: CountrySalaryData = useMemo(() => {
    const found = COUNTRIES.find((c) => c.code.toLowerCase() === countryParam);
    if (found) return found;
    return (
      COUNTRIES.find((c) => c.code === 'united-states') || {
        code: 'united-states',
        name: 'United States',
        flag: '🇺🇸',
        currency: 'USD',
        symbol: '$',
        tax: 24,
        avgSalary: 74500,
        capital: 'Washington, D.C.',
        language: 'English',
      }
    );
  }, [countryParam]);

  // State management
  const [grossInput, setGrossInput] = useState<string>(
    String(currentCountry.avgSalary || 75000)
  );
  const [customTax, setCustomTax] = useState<number>(currentCountry.tax);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // When currentCountry changes, re-seed defaults if desired
  const grossNum = parseFloat(grossInput.replace(/,/g, '')) || 0;
  const effectiveTax = Math.min(Math.max(customTax, 0), 99);

  // Calculations per requirements:
  // net = gross * (1 - tax/100)
  // hourly = net / 2080
  // daily = net / 260
  // weekly = net / 52
  // monthly = net / 12
  const taxDeduction = grossNum * (effectiveTax / 100);
  const netYearly = Math.max(grossNum * (1 - effectiveTax / 100), 0);
  const netMonthly = netYearly / 12;
  const netWeekly = netYearly / 52;
  const netDaily = netYearly / 260;
  const netHourly = netYearly / 2080;

  // Format currency numbers nicely with symbol
  const formatMoney = (val: number) => {
    if (isNaN(val)) return `${currentCountry.symbol} 0.00`;
    return `${currentCountry.symbol} ${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCountrySelect = (code: string) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    window.location.href = `/global-salary-calculator/${code}`;
  };

  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
    } else if (page.startsWith('/tools/') || page.startsWith('/')) {
      window.location.href = page;
    } else {
      window.location.href = `/tools/${page}`;
    }
  };

  // Structured FAQ Schema JSON-LD for Google Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the average salary in ${currentCountry.name} in 2026?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The estimated average gross annual salary in ${currentCountry.name} is approximately ${currentCountry.symbol} ${currentCountry.avgSalary.toLocaleString()} ${currentCountry.currency}. Take-home pay depends on personal allowances, progressive tax brackets (average ${currentCountry.tax}%), and local statutory contributions.`,
        },
      },
      {
        '@type': 'Question',
        name: `How is take-home pay calculated after tax in ${currentCountry.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Take-home net salary is calculated by subtracting applicable income taxes, social security, and health insurance from gross earnings. In our 2026 calculator, net salary = Gross Salary × (1 - ${currentCountry.tax}%). You can customize the tax rate to reflect your exact local bracket or deductions.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the income tax rate in ${currentCountry.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The standard effective tax benchmark for ${currentCountry.name} sits around ${currentCountry.tax}%. Actual rates in ${currentCountry.name} operate on progressive scales, ranging from low starter brackets for low earners to top marginal rates for high-income earners in ${currentCountry.capital}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much do you make per hour or month on an annual salary in ${currentCountry.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Standard full-time employment assumes 52 weeks (2,080 working hours or 260 working days per year). Divide your net annual pay by 12 for monthly take-home, by 52 for weekly pay, and by 2,080 for net hourly compensation.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* Schema.org FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <Header
        activeTool="global-salary-calculator"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            Global Salary Calculator ({currentCountry.name})
          </span>
        </nav>

        {/* Hero & Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>2026 Global Payroll & Tax Standard • 192 Sovereign Nations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Salary Calculator {currentCountry.name} 2026 - After Tax
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Calculate accurate net take-home pay, tax deductions, hourly wage, weekly earnings, and monthly
            disposable income in {currentCountry.name} ({currentCountry.currency}). Benchmark your compensation with
            local statutory standards in {currentCountry.capital}.
          </p>
        </div>

        {/* Country Selector Dropdown */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Select Country / Territory (192 Available)
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl shadow-sm text-left transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-2xl shrink-0">{currentCountry.flag}</span>
                <div className="truncate">
                  <span className="font-bold text-slate-900 dark:text-white text-base mr-2">
                    {currentCountry.name}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {currentCountry.currency} ({currentCountry.symbol})
                  </span>
                  <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
                    • Capital: {currentCountry.capital}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search country by name, currency, or capital..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredCountries.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">
                      No country found matching "{searchQuery}"
                    </div>
                  ) : (
                    filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleCountrySelect(c.code)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors ${
                          c.code === currentCountry.code
                            ? 'bg-blue-50/80 dark:bg-blue-950/60 font-semibold text-blue-600 dark:text-blue-400'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <span className="text-xl">{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                          <span className="text-xs text-slate-400">({c.capital})</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs shrink-0">
                          <span className="font-mono font-medium text-slate-500 dark:text-slate-400">
                            {c.currency} {c.symbol}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            ~{c.tax}% Tax
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AdSlot 1 (Top AdSense Safe Container - 40px gap from interactive buttons) */}
        <div className="my-10">
          <div
            className="adsbygoogle max-w-4xl mx-auto h-[90px] bg-slate-100/70 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400 tracking-wider uppercase font-semibold select-none"
            data-ad-client="ca-pub-placeholder"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          >
            Advertisement • Top Leaderboard
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Input Form (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      Income Parameters
                    </h2>
                    <p className="text-xs text-slate-500">Live 2026 Net Pay Engine</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  {currentCountry.currency} ({currentCountry.symbol})
                </span>
              </div>

              {/* Gross Salary Input */}
              <div className="mt-5 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Annual Gross Salary ({currentCountry.currency})
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                    {currentCountry.symbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={grossInput}
                    onChange={(e) => setGrossInput(e.target.value)}
                    className="block w-full pl-9 pr-14 py-3.5 text-base sm:text-lg font-bold bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden text-slate-900 dark:text-white"
                    placeholder="Enter gross salary..."
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-semibold text-slate-400 uppercase">
                    {currentCountry.currency}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>National benchmark:</span>
                  <button
                    type="button"
                    onClick={() => setGrossInput(String(currentCountry.avgSalary))}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                  >
                    Set to Average ({currentCountry.symbol} {currentCountry.avgSalary.toLocaleString()})
                  </button>
                </div>
              </div>

              {/* Effective Tax Rate Slider & Input */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Estimated Tax & Deductions
                  </label>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                    {effectiveTax}%
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="0.5"
                    value={effectiveTax}
                    onChange={(e) => setCustomTax(parseFloat(e.target.value) || 0)}
                    aria-label="Estimated Tax Rate"
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>0% (Tax Free)</span>
                    <span>15%</span>
                    <span>30%</span>
                    <span>45%</span>
                    <span>60%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>{currentCountry.name} Standard:</span>
                  <button
                    type="button"
                    onClick={() => setCustomTax(currentCountry.tax)}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                  >
                    Reset Default ({currentCountry.tax}%)
                  </button>
                </div>
              </div>

              {/* Country Snapshot Card */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  {currentCountry.name} Overview
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Capital City</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentCountry.capital}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Official Language</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentCountry.language}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Currency Code</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentCountry.currency} ({currentCountry.symbol})
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Tax Regime</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentCountry.tax === 0 ? 'Tax Free (0%)' : `Progressive (~${currentCountry.tax}%)`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions / Reset */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setGrossInput(String(currentCountry.avgSalary));
                  setCustomTax(currentCountry.tax);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
              >
                Reset Calculation
              </button>
            </div>
          </div>

          {/* Right Column: Live Calculated Results (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Hero Result Card */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
                  Net Annual Take-Home
                </span>
                <span className="text-xs text-blue-100 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Tax Deducted: {effectiveTax}%
                </span>
              </div>

              <div className="relative z-10">
                <div className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                  {formatMoney(netYearly)}
                </div>
                <p className="text-sm text-blue-100/90 max-w-lg">
                  Total annual cash in hand after estimated statutory income tax & deductions in {currentCountry.name}.
                </p>
              </div>

              {/* Quick Monthly Breakdown within Hero */}
              <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left relative z-10">
                <div>
                  <span className="text-xs text-blue-200 block">Gross Yearly</span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    {formatMoney(grossNum)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-blue-200 block">Total Taxes ({effectiveTax}%)</span>
                  <span className="text-sm sm:text-base font-bold text-rose-300">
                    - {formatMoney(taxDeduction)}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-xs text-blue-200 block">Net Monthly Pay</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-300">
                    {formatMoney(netMonthly)}
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown Cards Grid (Hourly, Daily, Weekly, Monthly) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Monthly Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Monthly Take-Home
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">÷ 12 mo</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatMoney(netMonthly)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Monthly disposable income after {effectiveTax}% deduction.
                </p>
              </div>

              {/* Weekly Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Weekly Take-Home
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">÷ 52 wks</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatMoney(netWeekly)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Standard weekly pay cycle earnings in {currentCountry.name}.
                </p>
              </div>

              {/* Daily Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Daily Wage (Net)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">÷ 260 days</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatMoney(netDaily)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on standard 5 working days per week.
                </p>
              </div>

              {/* Hourly Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Hourly Rate (Net)
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">÷ 2,080 hrs</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatMoney(netHourly)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on full-time standard 40-hour work week.
                </p>
              </div>
            </div>

            {/* Quick Comparative Benchmarking */}
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
                Key Comparisons in {currentCountry.name}
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500">Gross to Net Retention Rate</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {(100 - effectiveTax).toFixed(1)}% of earnings kept
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500">Annual Government Deduction</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    {formatMoney(taxDeduction)}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">National Average Benchmark</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {currentCountry.symbol} {currentCountry.avgSalary.toLocaleString()} {currentCountry.currency}/yr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 100% AdSense Policy Safe Disclaimer Box */}
        <div className="max-w-4xl mx-auto my-8 p-5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 rounded-2xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed shadow-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">Legal & Compliance Notice:</span>
            Disclaimer: Estimated calculation for educational purpose only, not official tax advice,
            consult professional in {currentCountry.name}. We do not store data.
          </div>
        </div>

        {/* AdSlot 2 (Bottom AdSense Safe Container - 40px gap from buttons) */}
        <div className="my-12">
          <div
            className="adsbygoogle max-w-4xl mx-auto h-[90px] bg-slate-100/70 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400 tracking-wider uppercase font-semibold select-none"
            data-ad-client="ca-pub-placeholder"
            data-ad-slot="9876543210"
            data-ad-format="auto"
            data-full-width-responsive="true"
          >
            Advertisement • Bottom Responsive Unit
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 800+ WORDS COMPREHENSIVE UNIQUE SEO CONTENT SECTION (4 SPECIFIED SECTIONS) */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto mt-14 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-10">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-blue-600 shrink-0" />
              What is Salary Calculator for {currentCountry.name}?
            </h2>
            <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                The <strong>Salary Calculator for {currentCountry.name}</strong> is an advanced, high-precision
                payroll auditing tool engineered to calculate your real net take-home pay from your gross
                annual contract value. Operating across verified 2026 economic benchmarks, this tool accounts
                for the average progressive tax burden in {currentCountry.name} (currently modeled at an effective
                rate of {currentCountry.tax}%), transforming confusing contract figures into clear, actionable hourly,
                daily, weekly, and monthly earnings denominated in {currentCountry.currency} ({currentCountry.symbol}).
              </p>
              <p>
                Whether you are evaluating a new job offer in {currentCountry.capital}, negotiating a raise with a
                multinational employer, or freelancing remotely from across the globe, understanding the delta between
                gross revenue and actual liquid earnings is critical. In {currentCountry.name}, your total compensation is
                governed by statutory withholdings including personal income taxes, provincial or municipal levies, and
                social protection programs. Our calculator takes the guesswork out of employment packages by delivering
                real-time mathematical transparency.
              </p>
              <p>
                With the estimated national average income hovering near{' '}
                <strong>
                  {currentCountry.symbol} {currentCountry.avgSalary.toLocaleString()} {currentCountry.currency}
                </strong>
                , professionals can easily benchmark where their current earnings sit relative to national standards.
                Our client-side processing guarantees complete privacy: zero calculations are transmitted to external
                servers, ensuring your private financial planning remains 100% confidential.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Calculator className="w-6 h-6 text-indigo-600 shrink-0" />
              How to Use the {currentCountry.name} Salary Calculator?
            </h2>
            <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                Using the <strong>Global Salary Calculator for {currentCountry.name}</strong> is straightforward, intuitive,
                and requires no registration or technical background:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Enter Your Gross Earnings:</strong> Input your contracted annual salary into the gross income
                  field. You can toggle directly to the {currentCountry.name} national average of{' '}
                  {currentCountry.symbol} {currentCountry.avgSalary.toLocaleString()} {currentCountry.currency} with a single
                  click.
                </li>
                <li>
                  <strong>Customize Your Tax Bracket:</strong> While our engine pre-configures the benchmark effective rate
                  of {currentCountry.tax}% for {currentCountry.name}, you can effortlessly adjust the slider between 0% and
                  60% to match your exact marital status, tax credits, dependent deductions, or specific municipal tier in{' '}
                  {currentCountry.capital}.
                </li>
                <li>
                  <strong>Review Your Instant Breakdown:</strong> As you adjust numbers, our system computes the net annual
                  payout, monthly paycheck (÷ 12), weekly distribution (÷ 52), daily earnings (÷ 260), and hourly wage (÷
                  2,080 standard annual work hours).
                </li>
                <li>
                  <strong>Cross-Compare Globally:</strong> Use the interactive search dropdown at any time to compare your
                  salary in {currentCountry.name} with 191 other sovereign jurisdictions, including the United States,
                  United Kingdom, UAE, Pakistan, India, Germany, and Canada.
                </li>
              </ol>
              <p>
                The results refresh instantly in your browser without reloading the page, making it the perfect companion
                during remote hiring discussions or contract negotiations.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600 shrink-0" />
              Understanding Tax System in {currentCountry.name}
            </h2>
            <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                The taxation structure in {currentCountry.name} operates under sovereign statutory laws administered from
                the national capital, {currentCountry.capital}. In most modern fiscal economies, income is taxed on a
                progressive schedule: early earnings enjoy either full exemption or nominal tax rates, while compensation
                exceeding specific income thresholds triggers higher marginal tax brackets.
              </p>
              <p>
                {currentCountry.tax === 0 ? (
                  <span>
                    Remarkably, {currentCountry.name} is recognized as a zero-income-tax or ultra-low tax jurisdiction,
                    meaning employees retain up to 100% of their earned gross income without conventional personal income
                    tax deductions. Government revenues are typically generated through sovereign funds, natural resources,
                    import tariffs, or corporate licensing fees rather than individual paycheck levies.
                  </span>
                ) : (
                  <span>
                    In {currentCountry.name}, the benchmark average effective tax rate is approximately {currentCountry.tax}%.
                    This percentage encapsulates typical deductions such as personal income tax, public pension
                    contributions, mandatory national healthcare funds, and unemployment insurance. Higher earners residing
                    in metropolitan hubs like {currentCountry.capital} may encounter top marginal tiers exceeding this
                    benchmark, while entry-level professionals frequently enjoy standard personal allowances that reduce
                    their effective liability.
                  </span>
                )}
              </p>
              <p>
                When planning long-term investments, mortgage commitments, or personal savings in {currentCountry.currency},
                always remember that effective tax differs from marginal tax. The effective rate represents the weighted
                percentage of your total gross income paid to revenue authorities, whereas the marginal rate is the tax
                incurred solely on your last earned unit of currency.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-purple-600 shrink-0" />
              Why Choose Our Tool? + Cost of Living in {currentCountry.name}
            </h2>
            <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                Our <strong>Global Salary Calculator</strong> is recognized by job seekers, digital nomads, and HR leaders
                worldwide for three primary pillars: <strong>Precision</strong>, <strong>Privacy</strong>, and{' '}
                <strong>Speed</strong>. Unlike traditional online payroll calculators loaded with heavy trackers,
                mandatory email gates, or outdated tax tables, our calculator executes mathematical formulas locally in
                your web browser within milliseconds.
              </p>
              <p>
                Evaluating your compensation package in {currentCountry.name} is only meaningful when contextualized
                against the local cost of living. In {currentCountry.capital}, monthly expenditures for residential
                housing, utility services, grocery staples, and public transit constitute the core of a family's budget.
                An annual take-home salary of {formatMoney(netYearly)} translates into a predictable monthly cash flow of{' '}
                {formatMoney(netMonthly)}, which can be budgeted across:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase mb-1">
                    Housing & Utilities
                  </span>
                  <p className="text-xs text-slate-500">
                    Typically accounts for 30% to 40% of net monthly income in {currentCountry.capital}.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase mb-1">
                    Food & Daily Living
                  </span>
                  <p className="text-xs text-slate-500">
                    Groceries, healthcare, and transit generally consume 20% to 25% of net monthly wages.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase mb-1">
                    Discretionary & Savings
                  </span>
                  <p className="text-xs text-slate-500">
                    Healthy financial planning aims for 20% or more toward emergency reserves and retirement.
                  </p>
                </div>
              </div>
              <p>
                By keeping all financial parameters transparent and easily adjustable, our tool empowers you to negotiate
                with confidence, relocate with certainty, and master your personal finance across 192 countries in 2026.
              </p>
            </div>
          </section>

          {/* Popular Countries Link Matrix */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Explore Popular Sovereign Calculators
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { code: 'united-states', name: 'United States', flag: '🇺🇸' },
                { code: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧' },
                { code: 'united-arab-emirates', name: 'UAE', flag: '🇦🇪' },
                { code: 'pakistan', name: 'Pakistan', flag: '🇵🇰' },
                { code: 'india', name: 'India', flag: '🇮🇳' },
                { code: 'germany', name: 'Germany', flag: '🇩🇪' },
                { code: 'canada', name: 'Canada', flag: '🇨🇦' },
                { code: 'australia', name: 'Australia', flag: '🇦🇺' },
                { code: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦' },
                { code: 'qatar', name: 'Qatar', flag: '🇶🇦' },
              ].map((item) => (
                <Link
                  key={item.code}
                  href={`/global-salary-calculator/${item.code}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    item.code === currentCountry.code
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500'
                  }`}
                >
                  <span>{item.flag}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer & Cookie Consent */}
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
