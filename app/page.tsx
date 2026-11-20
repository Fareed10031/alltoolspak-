'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { HomePage } from '@/components/pages/HomePage';
import { Header } from '@/components/Header';
import BlackFooter from '@/components/BlackFooter';
import { TOOLS } from '@/lib/config';

const CookieBanner = dynamic<{ onNavigate?: (path: string) => void }>(
  () => import('@/components/CookieBanner').then((m) => m.CookieBanner),
  { ssr: false }
);

export default function Page() {
  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
      return;
    }
    const clean = page.replace(/^\/+|\/+$/g, '').replace(/^tools\//, '');
    window.location.href = `/${clean}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool="home"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1">
        <HomePage onSelectTool={navigateTo} onNavigate={navigateTo} />
      </main>
      <BlackFooter />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
