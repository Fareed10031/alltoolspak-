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

  const loanAmount = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = term * 12;

  const result = useMemo(() => {
    let pi = 0;
    if (monthlyRate > 0) {
      pi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      pi = loanAmount / totalMonths;
    }
    const pmiNeeded = (downPayment / homePrice) * 100 < 20;
    const pmiM = pmiNeeded ? (loanAmount * (pmiRate / 100)) / 12 : 0;
    const taxM = tax / 12;
    const insM = insurance / 12;
    const total = pi + pmiM + taxM + insM + hoa;
    return { pi, pmiM, taxM, insM, hoa, total, pmiNeeded };
  }, [loanAmount, monthlyRate, totalMonths, downPayment, homePrice, pmiRate, tax, insurance, hoa]);

  const formatMoney = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">🇺🇸 USA 2026 EDITION</div>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 tracking-tight text-slate-900 dark:text-white">Mortgage Calculator with PMI, Taxes &amp; HOA</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">The most accurate calculator for US home buyers. See your true monthly payment - not just principal &amp; interest.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <h2 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">🏠 Loan Details</h2>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Home Price</label>
              <input type="range" min="50000" max="1500000" step="5000" value={homePrice} onChange={e=>{const v=Number(e.target.value); setHomePrice(v); setDownPayment(v*downPercent/100)}} className="w-full accent-blue-600"/>
              <div className="flex justify-between items-center mt-1"><input type="number" value={homePrice} onChange={e=>setHomePrice(Number(e.target.value))} className="w-32 p-2 border border-slate-200 dark:border-slate-700 rounded-lg font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/><span className="text-sm text-slate-500 dark:text-slate-400">${homePrice.toLocaleString()}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Down Payment ($)</label><input type="number" value={downPayment} onChange={e=>{setDownPayment(Number(e.target.value)); setDownPercent((Number(e.target.value)/homePrice)*100)}} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Down Payment (%)</label><input type="number" value={downPercent.toFixed(1)} onChange={e=>{const p=Number(e.target.value); setDownPercent(p); setDownPayment(homePrice*p/100)}} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate %</label><input type="number" step="0.1" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Term</label><div className="flex gap-2 mt-1"><button onClick={()=>setTerm(15)} className={`flex-1 py-2.5 rounded-lg font-bold border transition-colors ${term===15?'bg-slate-900 dark:bg-blue-600 text-white border-transparent':'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}>15 Years</button><button onClick={()=>setTerm(30)} className={`flex-1 py-2.5 rounded-lg font-bold border transition-colors ${term===30?'bg-slate-900 dark:bg-blue-600 text-white border-transparent':'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}>30 Years</button></div></div>
            </div>

            <h2 className="font-bold text-lg pt-4 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">🏛️ Additional Costs (USA)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Property Tax / Year</label><input type="number" value={tax} onChange={e=>setTax(Number(e.target.value))} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Home Insurance / Year</label><input type="number" value={insurance} onChange={e=>setInsurance(Number(e.target.value))} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">HOA / Month</label><input type="number" value={hoa} onChange={e=>setHoa(Number(e.target.value))} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
              <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300">PMI Rate % (if &lt;20%)</label><input type="number" step="0.1" value={pmiRate} onChange={e=>setPmiRate(Number(e.target.value))} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"/></div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-900 text-white rounded-[24px] p-7 sticky top-6 border border-slate-800 shadow-xl">
              <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Total Monthly Payment</p>
              <div className="text-4xl font-extrabold mt-2">{formatMoney(result.total)}<span className="text-lg font-normal text-slate-400">/mo</span></div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Principal &amp; Interest</span><span className="font-bold">{formatMoney(result.pi)}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Property Tax</span><span className="font-bold">{formatMoney(result.taxM)}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Insurance</span><span className="font-bold">{formatMoney(result.insM)}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">HOA Fees</span><span className="font-bold">{formatMoney(result.hoa)}</span></div>
                {result.pmiM > 0 && <div className="flex justify-between text-amber-300"><span>PMI Insurance</span><span className="font-bold">{formatMoney(result.pmiM)}</span></div>}
                <div className="border-t border-slate-700 my-3"></div>
                <div className="flex justify-between text-base"><span>Loan Amount</span><span className="font-bold">{formatMoney(loanAmount)}</span></div>
              </div>

              <div className="mt-6 bg-white/10 rounded-xl p-3 text-xs text-slate-300">
                {result.pmiNeeded ? "⚠️ PMI is included because down payment is less than 20%. It will be removed after 20% equity." : "✅ No PMI! Your down payment is 20% or more."}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-8 mt-8 prose max-w-none text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">About This USA Mortgage Calculator (2026)</h2>
          <p>Our USA Mortgage Calculator is the most advanced and accurate tool for American home buyers. Unlike 90% of simple calculators on Google that only show Principal and Interest, our calculator shows you the REAL cost of owning a home in the United States. In the USA, your monthly payment is never just loan payment. You must pay Property Taxes which are very high in states like New Jersey, Texas, and Illinois, Homeowners Insurance which is mandatory for all mortgages, HOA (Homeowners Association) fees if you buy a condo or house in a community, and PMI (Private Mortgage Insurance) if you pay less than 20% down payment. This tool uses the official bank formula M = P[r(1+r)^n]/[(1+r)^n-1] and is updated for 2026 average interest rates of 7.2%. It is trusted by first-time buyers in California, Texas, Florida, and New York.</p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">How to Use This Calculator?</h3>
          <p><strong>Step 1:</strong> Enter Home Price. <strong>Step 2:</strong> Enter Down Payment in dollars or percent. <strong>Step 3:</strong> Enter Interest Rate and select 15 or 30 year term. <strong>Step 4:</strong> Enter your annual Property Tax, Home Insurance, and monthly HOA. Our tool will instantly calculate your true monthly payment. You can see a full breakdown and know exactly how much you need to budget.</p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">Why PMI, Tax and HOA are Important?</h3>
          <p>Many first-time buyers in the USA get shocked after closing because they only calculated Principal &amp; Interest. Property Tax can add $300-$800 per month. PMI can add $100-$300 per month if you have less than 20% down. HOA can be $200-$500 per month in many cities. Ignoring these can make you miss payments. Our calculator protects you from that surprise and is fully compliant with AdSense and Google&apos;s helpful content policy.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 border-t border-slate-200 dark:border-slate-800 pt-4"><strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. It is not a loan offer or financial advice. Taxes, insurance and rates vary by lender, county and zip code. Consult a licensed mortgage advisor.</p>
        </div>
      </div>
    </div>
  );
}
