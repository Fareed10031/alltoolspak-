import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { PrivacyPage } from '@/components/pages/PrivacyPage';
import { TermsPage } from '@/components/pages/TermsPage';
import { DisclaimerPage } from '@/components/pages/DisclaimerPage';
import { CookiesPage } from '@/components/pages/CookiesPage';
import { ContactPage } from '@/components/pages/ContactPage';

// Tools
import { PdfTools } from '@/components/tools/PdfTools';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import { YouTubeThumb } from '@/components/tools/YouTubeThumb';
import { AmazonVat } from '@/components/tools/AmazonVat';
import { BgRemover } from '@/components/tools/BgRemover';
import { Paraphraser } from '@/components/tools/Paraphraser';
import { Detector } from '@/components/tools/Detector';
import { ResumeBuilder } from '@/components/tools/ResumeBuilder';

import { safeStorage, safePrefersDark, safePushState } from '@/lib/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme and handle path from URL
  useEffect(() => {
    // Theme initialization
    const storedTheme = safeStorage.getItem('theme');
    const systemPrefersDark = safePrefersDark();
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Path initialization
    try {
      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
      resolveRoute(pathname);
    } catch {
      resolveRoute('/');
    }

    // Browser back/forward event listener
    const handlePopState = () => {
      try {
        resolveRoute(window.location.pathname);
      } catch {
        resolveRoute('/');
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const resolveRoute = (path: string) => {
    const clean = path.replace(/^\/|\/$/g, '');
    if (!clean || clean === '') {
      setCurrentPage('home');
    } else if (clean.startsWith('tools/')) {
      const toolId = clean.replace('tools/', '');
      setCurrentPage(toolId);
    } else {
      setCurrentPage(clean);
    }
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // ignore
    }

    let newPath = '/';
    if (page === 'home') {
      newPath = '/';
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
      newPath = `/tools/${page}`;
    } else {
      newPath = `/${page}`;
    }

    safePushState(newPath);
  };

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      safeStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      safeStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectTool={navigateTo} onNavigate={navigateTo} />;

      // 8 Tools
      case 'pdf-tools':
        return <PdfTools />;
      case 'image-compress':
        return <ImageCompressor />;
      case 'youtube-thumb':
        return <YouTubeThumb />;
      case 'amazon-vat':
        return <AmazonVat />;
      case 'bg-remover':
        return <BgRemover />;
      case 'paraphraser':
        return <Paraphraser />;
      case 'detector':
        return <Detector />;
      case 'resume-builder':
        return <ResumeBuilder />;

      // Legal & Informational Pages
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'cookies':
        return <CookiesPage />;
      case 'contact':
        return <ContactPage />;

      default:
        return (
          <div className="max-w-xl mx-auto py-24 text-center space-y-4 px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h2>
            <p className="text-sm text-slate-500">
              The requested page or tool does not exist. Please return to the homepage.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
            >
              Return to All Tools
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        activeTool={currentPage}
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
