'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
    } else if (page.startsWith('/tools/') || page.startsWith('/')) {
      window.location.href = page;
    } else {
      window.location.href = `/tools/${page}`;
    }
  };

  const articles = [
    {
      title: "How to Estimate Your Car Accident Settlement in 2026",
      desc: "Complete guide to computing medical costs, lost wages, and pain & suffering multipliers across 195 sovereign jurisdictions.",
      url: "/tools/car-accident-settlement-calculator",
      date: "Oct 2026",
      readTime: "5 min read",
    },
    {
      title: "US Mortgage Calculations: True Costs of PMI, Taxes & HOA",
      desc: "Understand how down payments, property taxes, and amortization schedules affect your real monthly mortgage payment.",
      url: "/tools/mortgage-calculator-usa",
      date: "Oct 2026",
      readTime: "6 min read",
    },
    {
      title: "Amazon EU VAT & One-Stop-Shop (OSS) Rules Explained",
      desc: "Navigating cross-border European VAT rates, OSS thresholds, and distance selling compliance for online merchants.",
      url: "/tools/amazon-eu-vat-calculator",
      date: "Oct 2026",
      readTime: "4 min read",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool="blog"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides &amp; Financial Utilities</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            AllToolsPK Productivity &amp; Legal Blog
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Actionable guides, actuarial benchmarks, and financial tutorials to help you maximize your claims, rates, and calculations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {art.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {art.desc}
                </p>
              </div>
              <a
                href={art.url}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <span>Read &amp; Calculate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
