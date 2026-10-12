'use client';

import React, { useEffect } from 'react';
import ATSResumeBuilder from '@/components/tools/ATSResumeBuilder';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function ResumeBuilderPage() {
  useEffect(() => {
    document.title = 'ATS Resume Builder - Pass Workday, Greenhouse & Lever - 99/99 ATS Score | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "World's #1 Free ATS Resume Builder - 100% Free & Client-Side. Enhancv clean design + Rezi ATS score checker. Real text-based PDF, not image. Pass Workday, Greenhouse, Lever. No upload, 100% private."
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
        activeTool="resume-builder"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <ATSResumeBuilder />
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
