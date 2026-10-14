'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const UnitConverterTool = dynamic(
  () => import('@/components/tools/UnitConverterTool').then((m) => m.UnitConverterTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Unit Converter...</p> }
);
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function UnitConverterPage() {
  useEffect(() => {
    document.title = 'Unit Converter - Most Powerful 200+ Units Converter | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'The most powerful Unit Converter. Convert Length, Weight, Temperature, Area, Volume, Speed, Time, Data, Pressure, Energy, Power, Fuel instantly. 200+ units, NIST accurate, 100% free, offline.'
      );
    }
  }, []);
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
        activeTool="unit-converter"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <UnitConverterTool />
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
