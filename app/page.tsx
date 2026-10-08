'use client';

import React from 'react';
import { HomePage } from '@/components/pages/HomePage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import BlackFooter from '@/components/BlackFooter';
import { CookieBanner } from '@/components/CookieBanner';
import { TOOLS } from '@/lib/config';

export default function Page() {
  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
      return;
    }
    const allSlugs = [
      ...TOOLS.map((t) => t.slug),
      'pdf-tools',
      'image-compress',
      'image-compressor',
      'youtube-thumb',
      'youtube-thumbnail',
      'amazon-vat',
      'bg-remover',
      'paraphraser',
      'detector',
      'ai-detector',
      'ats-resume-builder',
      'humanize-ai-text',
    ];
    if (allSlugs.includes(page)) {
      window.location.href = `/tools/${page}`;
    } else {
      window.location.href = `/${page}`;
    }
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
