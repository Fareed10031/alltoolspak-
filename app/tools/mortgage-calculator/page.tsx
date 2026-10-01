'use client';

import React from 'react';
import MortgageCalculator from '@/components/tools/MortgageCalculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function MortgageCalculatorPage() {
  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
    } else if (page.startsWith('/tools/') || page.startsWith('/')) {
      window.location.href = page;
    } else {
      window.location.href = `/tools/${page}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool="mortgage-calculator"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />

      <main className="flex-1 py-10 px-4 sm:px-6">
        <MortgageCalculator />
      </main>

      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
