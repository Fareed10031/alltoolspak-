'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const OneVisaWorldTool = dynamic(
  () => import('@/components/tools/OneVisaWorldTool').then((m) => m.OneVisaWorldTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading OneVisa World...</p> }
);
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function OneVisaWorldPage() {
  useEffect(() => {
    document.title = 'OneVisa World - Global Visa Eligibility & Points Calculator 2026 | Free CRS Checker';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free Global Visa Eligibility Checker for 200+ Countries. Check Canada CRS, UK Points, Australia 65, Germany Opportunity Card. 100% Official Tables. Instant Result.'
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
        activeTool="onevisa-world"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <OneVisaWorldTool />
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
