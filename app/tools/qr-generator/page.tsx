'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const QrGeneratorTool = dynamic(
  () => import('@/components/tools/QrGeneratorTool').then((m) => m.QrGeneratorTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading QR Generator...</p> }
);
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function QrGeneratorPage() {
  useEffect(() => {
    document.title = 'Free QR Code Generator with Logo - WiFi, vCard, URL - SVG, PNG, PDF - 100% Client-Side';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Create QR codes for URL, WiFi, vCard, Email, SMS, WhatsApp, Location, Bitcoin. Add logo, colors, error correction H. Download PNG, SVG, PDF. 100% free, client-side, no tracking, never expires.'
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
        activeTool="qr-generator"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <QrGeneratorTool />
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
