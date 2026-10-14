// File: app/tools/emergency-os/page.tsx
// Tool #14: Global Accident & Emergency Compensation Calculator OS
// Modern 2026 Stack: Next.js 14, TypeScript, Tailwind CSS, Lucide Icons
// 195 Countries Supported, AdSense Safe, 100% Accurate Estimator
// No Competitor - Past & Future Evergreen

'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const EmergencyOSTool = dynamic(
  () => import('@/components/tools/EmergencyOSTool').then((m) => m.EmergencyOSTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Emergency OS...</p> }
);
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function EmergencyOSPage() {
  useEffect(() => {
    document.title =
      'Global Accident & Emergency Compensation Calculator OS (195 Countries) | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free 2026 Global Accident & Emergency Compensation Calculator OS for 195 countries. Estimate insurance settlement, lost wages, pain and suffering, and rehab costs.'
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header
        activeTool="emergency-os"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <EmergencyOSTool />
      </main>

      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
