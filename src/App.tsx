import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { Analytics } from '@vercel/analytics/react';
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
import { HumanizeAI } from '@/components/tools/HumanizeAI';

import { safeStorage, safePrefersDark, safePushState } from '@/lib/storage';

export function normalizeRoute(raw: string): string {
  if (!raw) return 'home';
  let clean = raw.toLowerCase().trim();
  // Strip protocol and origin if full URL passed
  clean = clean.replace(/^https?:\/\/[^/]+/i, '');
  // Strip query params and hashes
  clean = clean.split('?')[0].split('#')[0];
  // Strip leading and trailing slashes
  clean = clean.replace(/^\/+|\/+$/g, '');

  if (!clean || clean === '' || clean === 'home') {
    return 'home';
  }

  if (clean.startsWith('tools/')) {
    clean = clean.replace(/^tools\//, '');
  }

  // Canonical mapping & aliases
  switch (clean) {
    case 'pdf-tools':
    case 'pdf':
    case 'pdf-suite':
    case 'pdf-merger':
    case 'pdf-to-word':
      return 'pdf-tools';

    case 'image-compress':
    case 'image-compressor':
    case 'compress-image':
    case 'image-resize':
      return 'image-compress';

    case 'youtube-thumb':
    case 'youtube-thumbnail':
    case 'youtube-thumbnail-downloader':
    case 'youtube-thumbnail-grabber':
    case 'yt-thumb':
      return 'youtube-thumb';

    case 'amazon-vat':
    case 'amazon-vat-calculator':
    case 'eu-vat-calculator':
    case 'vat-calculator':
      return 'amazon-vat';

    case 'bg-remover':
    case 'background-remover':
    case 'ai-background-remover':
    case 'remove-bg':
      return 'bg-remover';

    case 'paraphraser':
    case 'ai-paraphraser':
    case 'paraphrase':
    case 'text-rewriter':
      return 'paraphraser';

    case 'detector':
    case 'ai-detector':
    case 'ai-content-detector':
    case 'gpt-detector':
      return 'detector';

    case 'resume-builder':
    case 'ats-resume-builder':
    case 'resume':
    case 'cv-builder':
      return 'resume-builder';

    case 'humanize-ai-text':
    case 'humanize-ai':
    case 'ai-humanizer':
    case 'humanize':
      return 'humanize-ai-text';

    case 'tools':
      return 'tools';

    case 'about':
    case 'about-us':
      return 'about';

    case 'privacy':
    case 'privacy-policy':
      return 'privacy';

    case 'terms':
    case 'terms-of-service':
      return 'terms';

    case 'disclaimer':
      return 'disclaimer';

    case 'cookies':
    case 'cookie-policy':
      return 'cookies';

    case 'contact':
    case 'contact-us':
      return 'contact';

    default:
      return clean;
  }
}

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
      const resolved = normalizeRoute(pathname);
      setCurrentPage(resolved);
    } catch {
      setCurrentPage('home');
    }

    // Browser back/forward event listener
    const handlePopState = () => {
      try {
        const resolved = normalizeRoute(window.location.pathname);
        setCurrentPage(resolved);
      } catch {
        setCurrentPage('home');
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const navigateTo = (page: string) => {
    const resolved = normalizeRoute(page);
    setCurrentPage(resolved);

    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // ignore
    }

    let newPath = '/';
    if (resolved === 'home') {
      newPath = '/';
    } else if (resolved === 'tools') {
      newPath = '/tools';
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
        'humanize-ai-text',
      ].includes(resolved)
    ) {
      newPath = `/tools/${resolved}`;
    } else {
      newPath = `/${resolved}`;
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
      case 'tools':
        return <HomePage onSelectTool={navigateTo} onNavigate={navigateTo} />;

      // 8 Core Tools & Aliases
      case 'pdf-tools':
        return <PdfTools />;
      case 'image-compress':
      case 'image-compressor':
        return <ImageCompressor />;
      case 'youtube-thumb':
      case 'youtube-thumbnail':
        return <YouTubeThumb />;
      case 'amazon-vat':
        return <AmazonVat />;
      case 'bg-remover':
      case 'background-remover':
        return <BgRemover />;
      case 'paraphraser':
        return <Paraphraser />;
      case 'detector':
      case 'ai-detector':
        return <Detector />;
      case 'resume-builder':
      case 'ats-resume-builder':
        return <ResumeBuilder />;
      case 'humanize-ai-text':
      case 'humanize-ai':
      case 'ai-humanizer':
        return <HumanizeAI />;

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
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold cursor-pointer shadow-md shadow-emerald-600/20"
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
      <Analytics />
    </div>
  );
}
