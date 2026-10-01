"use client";
import React, { useState, useMemo } from 'react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(7.2);
  const [term, setTerm] = useState(30);
  const [tax, setTax] = useState(3500);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(150);
  const [pmiRate, setPmiRate] = useState(0.5);

  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyRate = rate / 100 / 12;
  const totalMonths = term * 12;

  const result = useMemo(() => {
    let pi = 0;
    if (loanAmount <= 0) {
      pi = 0;
    } else if (monthlyRate > 0) {
      pi =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      pi = loanAmount / totalMonths;
    }

    const pmiNeeded = homePrice > 0 ? (downPayment / homePrice) * 100 < 20 : false;
    const pmiM = pmiNeeded ? (loanAmount * (pmiRate / 100)) / 12 : 0;
    const taxM = Math.max(0, tax) / 12;
    const insM = Math.max(0, insurance) / 12;
    const hoaM = Math.max(0, hoa);
    const total = pi + pmiM + taxM + insM + hoaM;

    // Conic gradient percentage calculations for pie chart
    const safeTotal = total > 0 ? total : 1;
    const piPct = (pi / safeTotal) * 100;
    const taxPct = (taxM / safeTotal) * 100;
    const insPct = (insM / safeTotal) * 100;
    const hoaPct = (hoaM / safeTotal) * 100;
    const pmiPct = (pmiM / safeTotal) * 100;

    const stop1 = piPct;
    const stop2 = stop1 + taxPct;
    const stop3 = stop2 + insPct;
    const stop4 = stop3 + hoaPct;

    // conic-gradient style using CSS (no external charting library)
    const conicGradient = `conic-gradient(
      #2563eb 0% ${stop1.toFixed(2)}%,
      #10b981 ${stop1.toFixed(2)}% ${stop2.toFixed(2)}%,
      #f59e0b ${stop2.toFixed(2)}% ${stop3.toFixed(2)}%,
      #8b5cf6 ${stop3.toFixed(2)}% ${stop4.toFixed(2)}%,
      #ec4899 ${stop4.toFixed(2)}% 100%
    )`;

    return {
      pi,
      pmiM,
      taxM,
      insM,
      hoa: hoaM,
      total,
      pmiNeeded,
      conicGradient,
      piPct,
      taxPct,
      insPct,
      hoaPct,
      pmiPct,
    };
  }, [loanAmount, monthlyRate, totalMonths, downPayment, homePrice, pmiRate, tax, insurance, hoa]);

  const formatMoney = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
            🇺🇸 USA 2026 EDITION
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Mortgage Calculator USA with PMI, Taxes &amp; HOA
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The most accurate mortgage calculator for US home buyers. Discover your true, all-in monthly payment—not just principal &amp; interest.
          </p>
        </div>

        {/* CALCULATOR MAIN GRID */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {/* LEFT COLUMN: CONTROLS & INPUTS (3 COLS) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="font-extrabold text-lg sm:text-xl flex items-center gap-2 text-slate-900 dark:text-white">
                🏠 Loan &amp; Property Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">Adjust property price, down payment, and mortgage term.</p>
            </div>

            {/* Home Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700 dark:text-slate-300">Home Price</label>
                <span className="font-black text-blue-600 dark:text-blue-400 text-base">
                  {formatMoney(homePrice)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="5000"
                value={homePrice}
                onChange={(e) => {
                  const v = Math.max(0, Number(e.target.value));
                  setHomePrice(v);
                  setDownPayment(Math.round((v * downPercent) / 100));
                }}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>$50,000</span>
                <span>$750,000</span>
                <span>$1,500,000</span>
              </div>
              <div className="pt-1">
                <input
                  type="number"
                  min="0"
                  value={homePrice}
                  onChange={(e) => {
                    const v = Math.max(0, Number(e.target.value));
                    setHomePrice(v);
                    setDownPayment(Math.round((v * downPercent) / 100));
                  }}
                  className="w-full sm:w-48 p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Down Payment Dual Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  Down Payment ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={downPayment}
                  onChange={(e) => {
                    const v = Math.max(0, Number(e.target.value));
                    setDownPayment(v);
                    setDownPercent(homePrice > 0 ? (v / homePrice) * 100 : 0);
                  }}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  Down Payment (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={Number(downPercent.toFixed(1))}
                    onChange={(e) => {
                      const p = Math.max(0, Math.min(100, Number(e.target.value)));
                      setDownPercent(p);
                      setDownPayment(Math.round((homePrice * p) / 100));
                    }}
                    className="w-full p-2.5 pr-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-slate-400 font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  Interest Rate %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="20"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full p-2.5 pr-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-slate-400 font-bold">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  Loan Term
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTerm(15)}
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      term === 15
                        ? 'bg-slate-900 dark:bg-blue-600 text-white border-transparent shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    15 Years
                  </button>
                  <button
                    type="button"
                    onClick={() => setTerm(30)}
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      term === 30
                        ? 'bg-slate-900 dark:bg-blue-600 text-white border-transparent shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    30 Years
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Mandatory US Costs */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  🏛️ Additional Costs (PMI, Taxes, Insurance &amp; HOA)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Customizable estimates based on US county &amp; property type.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                    Property Tax / Year ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={tax}
                    onChange={(e) => setTax(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="text-[11px] text-slate-400">~{formatMoney(tax / 12)}/mo</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                    Homeowners Insurance / Year ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={insurance}
                    onChange={(e) => setInsurance(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="text-[11px] text-slate-400">~{formatMoney(insurance / 12)}/mo</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                    HOA Dues / Month ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={hoa}
                    onChange={(e) => setHoa(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="text-[11px] text-slate-400">Condos &amp; planned subdivisions</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                    PMI Rate % (if &lt;20% down)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={pmiRate}
                    onChange={(e) => setPmiRate(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="text-[11px] text-slate-400">Usually 0.3% - 1.5% annually</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY RESULTS + CSS PIE CHART (2 COLS) */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-6">
            <div className="bg-slate-900 text-white rounded-[24px] p-6 sm:p-7 shadow-2xl border border-slate-800 space-y-6">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-extrabold">
                  Total Monthly Payment
                </p>
                <div className="text-4xl sm:text-5xl font-black mt-2 tracking-tight text-white flex items-baseline gap-1">
                  {formatMoney(result.total)}
                  <span className="text-base font-normal text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Loan Amount: <strong className="text-slate-200">{formatMoney(loanAmount)}</strong>
                </p>
              </div>

              {/* PURE CSS CONIC-GRADIENT PIE CHART (NO EXTERNAL LIBRARIES) */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col sm:flex-row items-center gap-5">
                <div
                  className="w-28 h-28 rounded-full shrink-0 relative flex items-center justify-center shadow-inner"
                  style={{ background: result.conicGradient }}
                  aria-label="Payment Breakdown Pie Chart"
                  role="img"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-1 shadow-md">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">True Cost</span>
                    <span className="text-[11px] font-black text-white">100%</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                      P &amp; I
                    </span>
                    <span className="font-bold text-white">{result.piPct.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      Property Tax
                    </span>
                    <span className="font-bold text-white">{result.taxPct.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      Insurance
                    </span>
                    <span className="font-bold text-white">{result.insPct.toFixed(0)}%</span>
                  </div>
                  {result.hoa > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                        HOA Dues
                      </span>
                      <span className="font-bold text-white">{result.hoaPct.toFixed(0)}%</span>
                    </div>
                  )}
                  {result.pmiM > 0 && (
                    <div className="flex items-center justify-between text-pink-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shrink-0" />
                        PMI
                      </span>
                      <span className="font-bold">{result.pmiPct.toFixed(0)}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ITEM BY ITEM BREAKDOWN */}
              <div className="space-y-3 text-xs sm:text-sm border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Principal &amp; Interest
                  </span>
                  <span className="font-bold text-white">{formatMoney(result.pi)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Property Taxes
                  </span>
                  <span className="font-bold text-white">{formatMoney(result.taxM)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Homeowners Insurance
                  </span>
                  <span className="font-bold text-white">{formatMoney(result.insM)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    HOA Fees
                  </span>
                  <span className="font-bold text-white">{formatMoney(result.hoa)}</span>
                </div>

                {result.pmiM > 0 && (
                  <div className="flex justify-between items-center text-pink-400 font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      PMI Insurance
                    </span>
                    <span className="font-bold">{formatMoney(result.pmiM)}</span>
                  </div>
                )}
              </div>

              {/* PMI BADGE STATUS */}
              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                  result.pmiNeeded
                    ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                    : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                }`}
              >
                {result.pmiNeeded ? (
                  <div>
                    <span className="font-bold block mb-1">⚠️ Private Mortgage Insurance (PMI) Active</span>
                    Down payment is {downPercent.toFixed(1)}% (under 20%). Lenders mandate PMI until loan-to-value (LTV) reaches 80%.
                  </div>
                ) : (
                  <div>
                    <span className="font-bold block mb-1">✅ No PMI Required</span>
                    Down payment is {downPercent.toFixed(1)}% (20% or more). You save approximately {formatMoney(((loanAmount * 0.007) / 12))} every month!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 800+ WORDS COMPREHENSIVE SEO & ADSENSE READY CONTENT */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 text-slate-700 dark:text-slate-300 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            About Mortgage Calculator USA (2026 Edition) with PMI, Taxes &amp; HOA
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Navigating the home buying journey in the United States requires far more than calculating simple principal and interest. According to Federal Reserve housing reports and US census data, roughly 90% of first-time homebuyers experience &quot;sticker shock&quot; at the closing table when discovering that their actual escrow mortgage check is several hundred—or even thousands—of dollars higher than advertised headline mortgage rates. The <strong>Mortgage Calculator USA on AllToolsPK</strong> is engineered specifically to eliminate these costly surprises by synthesizing every component of American homeownership into a unified, transparent monthly projection.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              The Real Cost of Homeownership: Understanding PITI + HOA
            </h3>
            <p>
              In banking and mortgage underwriting across all 50 states, monthly housing obligations are abbreviated as <strong>PITI</strong> (Principal, Interest, Taxes, and Insurance), supplemented by applicable <strong>HOA dues</strong> and <strong>PMI</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Principal &amp; Interest (P&amp;I):</strong> The core repayment of your borrowed loan amount amortized over 15 or 30 years using the standard standard bank formula: <code>M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1 ]</code>. With prevailing 2026 average conventional 30-year fixed rates hovering between 6.8% and 7.4%, the compounding interest makes up the vast majority of payments during the first 10 years of amortization.
              </li>
              <li>
                <strong>Property Taxes:</strong> Real estate property taxes are assessed annually by local counties, municipalities, and school districts to fund local infrastructure. Effective tax rates vary wildly across the country—from under 0.6% in states like Hawaii and Colorado, to over 2.0% in states like New Jersey, Illinois, Texas, and New York. On a $400,000 home, property taxes can easily add between $300 and $900 each month to your payment.
              </li>
              <li>
                <strong>Homeowners Hazard Insurance:</strong> Lenders mandate comprehensive hazard and property insurance to protect the mortgaged collateral against fire, storm damage, and liability. Premiums have risen significantly across Florida, California, Louisiana, and Texas, frequently ranging from $1,200 to over $4,500 annually.
              </li>
              <li>
                <strong>Homeowners Association (HOA) Fees:</strong> If you purchase a condominium, townhouse, or single-family residence inside a managed master-planned subdivision, monthly HOA or condo dues are mandatory. They cover communal grounds maintenance, roofing reserves, pools, and security gates, and must be included in your debt-to-income (DTI) ratio.
              </li>
              <li>
                <strong>Private Mortgage Insurance (PMI):</strong> Under Fannie Mae and Freddie Mac conventional lending guidelines, any buyer placing less than a 20% down payment must pay PMI. This protects the lender if the borrower defaults. PMI rates typically range between 0.3% and 1.5% of the original loan balance annually until your principal balance amortizes down to 78% to 80% loan-to-value (LTV).
              </li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              How to Use This Mortgage Calculator
            </h3>
            <p>
              Our calculator has been optimized for clean, instant client-side execution with real-time feedback:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base">
              <li><strong>Step 1: Set Your Home Price:</strong> Slide the interactive price scale or type the purchase price of the home you plan to acquire.</li>
              <li><strong>Step 2: Enter Down Payment:</strong> Input your available down payment either in dollar value or percentage. The paired inputs sync automatically.</li>
              <li><strong>Step 3: Select Interest Rate &amp; Term:</strong> Enter your lender&apos;s quoted APR and toggle between 15-year fixed (lower total interest, higher monthly payment) and 30-year fixed (lower monthly payment, standard for US families).</li>
              <li><strong>Step 4: Input Escrow Estimates:</strong> Enter your anticipated yearly property taxes, yearly insurance, monthly HOA, and PMI rate.</li>
              <li><strong>Step 5: Analyze the Breakdown:</strong> Review the live pure CSS conic-gradient pie chart to visually assess how much of your hard-earned money goes toward building equity versus non-equity escrow costs (taxes, insurance, and interest).</li>
            </ol>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              15-Year vs. 30-Year Fixed Mortgages: Which Should You Choose?
            </h3>
            <p>
              The 30-year fixed-rate mortgage remains the gold standard in the US real estate ecosystem because it offers the lowest baseline monthly obligation, providing a safety cushion during unexpected economic downturns or periods of career transition. However, a 15-year fixed mortgage usually offers an interest rate discount of 0.5% to 0.75% and amortizes debt more than twice as fast. If your household budget and monthly cash flow comfortably support the higher monthly commitment, a 15-year mortgage can save you over $150,000 to $280,000 in lifetime compound interest on a median-priced American home.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              How to Eliminate or Avoid Private Mortgage Insurance (PMI)
            </h3>
            <p>
              Under the federal <em>Homeowners Protection Act of 1998</em>, borrowers have the statutory right to request written cancellation of private mortgage insurance once their mortgage principal reaches 80% of the home&apos;s original value, and servicers must automatically terminate PMI when the loan hits 78% LTV. If property values in your neighborhood appreciate significantly, you can also order a certified new appraisal after two years of timely payments to demonstrate 20% equity and petition your mortgage servicer to remove PMI early, instantly freeing up $100 to $300 in monthly cash flow.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  What is the standard 28/36 rule for mortgage qualification?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  US mortgage underwriters typically require that your total housing payment (PITI + HOA) does not exceed 28% of your gross monthly income (front-end ratio), and your total debt obligations (housing + car loans + student debt + credit cards) do not exceed 36% to 43% of gross income (back-end ratio).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Are my calculations sent or stored on remote servers?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  No. All calculations run strictly client-side inside your web browser. AllToolsPK does not collect, record, transmit, or monetize your financial inputs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Does this mortgage calculation include closing costs?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  This tool calculates ongoing monthly recurring payments. Upfront closing costs (typically 2% to 5% of purchase price for loan origination, title insurance, appraisal, and prepaid escrow deposits) are paid at settlement and are separate from recurring monthly housing costs.
                </p>
              </div>
            </div>

            {/* MANDATORY ADSENSE FINANCIAL DISCLAIMER */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>Important Legal &amp; Financial Disclaimer:</strong> This mortgage calculator is developed strictly for educational, illustrative, and informational purposes. It does not constitute a commitment to lend, loan approval, mortgage pre-qualification, or individualized legal, tax, or financial advice. Actual loan terms, APR, closing costs, property tax assessments, homeowners hazard insurance premiums, and PMI eligibility vary based on borrower credit score (FICO), debt-to-income ratio, property appraisal, county millage rates, and specific institutional lender guidelines. Always consult a licensed mortgage loan originator (NMLS), certified financial planner (CFP), or tax professional prior to executing binding purchase contracts or mortgage agreements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
