'use client';

import React from 'react';
import { AboutPage } from '@/components/pages/AboutPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function Page() {
  const navigateTo = (page: string) => {
    if (page === 'home') {
      window.location.href = '/';
    } else if (
      [
        'pdf-tools',
        'image-compress',
        'youtube-thumb',
        'amazon-vat',
        'bg-remover',
        'paraphraser',
        'detector',
        'resume-builder',
      ].includes(page)
    ) {
      window.location.href = `/tools/${page}`;
    } else {
      window.location.href = `/${page}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool="about"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
