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

// 9 New Core Pro Tools
import { AmazonEuVatTool } from '@/components/tools/AmazonEuVatTool';
import { BackgroundRemoverTool } from '@/components/tools/BackgroundRemoverTool';
import { PdfMergerTool } from '@/components/tools/PdfMergerTool';
import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool';
import { QrGeneratorTool } from '@/components/tools/QrGeneratorTool';
import { PasswordGenTool } from '@/components/tools/PasswordGenTool';
import { ResumeBuilderSimpleTool } from '@/components/tools/ResumeBuilderSimpleTool';
import { AgeCalculatorTool } from '@/components/tools/AgeCalculatorTool';
import { UnitConverterTool } from '@/components/tools/UnitConverterTool';
import { USAPaycheckCalculator2026 } from '@/components/tools/USAPaycheckCalculator2026';
import MortgageCalculator from '@/components/tools/MortgageCalculator';
import GlobalSalaryCalculator from '@/components/tools/GlobalSalaryCalculator';
import { PdfToWordTool } from '@/components/tools/PdfToWordTool';
import { ArticleReader } from '@/components/tools/ArticleReader';
import { CurrencyGoldRates } from '@/components/tools/CurrencyGoldRates';

// Companion / Legacy Tools
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import { YouTubeThumb } from '@/components/tools/YouTubeThumb';
import { Paraphraser } from '@/components/tools/Paraphraser';
import { Detector } from '@/components/tools/Detector';
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
    case 'amazon-eu-vat':
    case 'amazon-vat':
    case 'amazon-vat-calculator':
    case 'eu-vat-calculator':
    case 'vat-calculator':
      return 'amazon-eu-vat';

    case 'background-remover':
    case 'bg-remover':
    case 'ai-background-remover':
    case 'remove-bg':
      return 'background-remover';

    case 'pdf-merge':
    case 'pdf-merger':
    case 'pdf-tools':
    case 'pdf':
    case 'pdf-suite':
      return 'pdf-merge';

    case 'image-to-pdf':
    case 'img-to-pdf':
    case 'jpg-to-pdf':
    case 'png-to-pdf':
      return 'image-to-pdf';

    case 'qr-generator':
    case 'qr-code':
    case 'qr-code-generator':
    case 'qr':
      return 'qr-generator';

    case 'password-gen':
    case 'password-generator':
    case 'pass-gen':
    case 'password':
      return 'password-gen';

    case 'resume-builder':
    case 'ats-resume-builder':
    case 'resume':
    case 'cv-builder':
      return 'resume-builder';

    case 'age-calculator':
    case 'age-calc':
    case 'age':
      return 'age-calculator';

    case 'unit-converter':
    case 'unit-convert':
    case 'converter':
      return 'unit-converter';

    case 'usa-paycheck-calculator':
    case 'paycheck-calculator':
    case 'paycheck':
    case 'tax-calculator':
      return 'usa-paycheck-calculator';

    case 'mortgage-calculator':
    case 'mortgage-calculator-usa':
    case 'mortgage':
    case 'mortgage-calc':
      return 'mortgage-calculator';

    case 'global-salary-calculator':
    case 'global-salary':
    case 'salary-calculator':
    case 'world-salary':
      return 'global-salary-calculator';

    case 'pdf-to-word':
    case 'pdf-to-word-converter':
    case 'pdf2word':
    case 'pdftoword':
      return 'pdf-to-word';

    case 'currency-gold-rates':
    case 'currency-gold':
    case 'gold-rates':
    case 'currency-rates':
    case 'usd-to-pkr':
      return 'currency-gold-rates';

    // Supporting utilities
    case 'image-compress':
    case 'image-compressor':
      return 'image-compress';

    case 'youtube-thumb':
    case 'youtube-thumbnail':
      return 'youtube-thumb';

    case 'paraphraser':
    case 'ai-paraphraser':
      return 'paraphraser';

    case 'detector':
    case 'ai-detector':
      return 'detector';

    case 'humanize-ai-text':
    case 'humanize-ai':
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
    } else if (resolved === 'currency-gold-rates') {
      newPath = '/currency-gold-rates';
    } else if (
      [
        'amazon-eu-vat',
        'background-remover',
        'pdf-merge',
        'image-to-pdf',
        'qr-generator',
        'password-gen',
        'resume-builder',
        'age-calculator',
        'unit-converter',
        'usa-paycheck-calculator',
        'mortgage-calculator',
        'global-salary-calculator',
        'pdf-to-word',
        'article-reader',
        'image-compress',
        'youtube-thumb',
        'paraphraser',
        'detector',
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

      // 9 Core Pro Tools
      case 'amazon-eu-vat':
        return <AmazonEuVatTool />;
      case 'background-remover':
        return <BackgroundRemoverTool />;
      case 'pdf-merge':
        return <PdfMergerTool />;
      case 'image-to-pdf':
        return <ImageToPdfTool />;
      case 'qr-generator':
        return <QrGeneratorTool />;
      case 'password-gen':
        return <PasswordGenTool />;
      case 'resume-builder':
        return <ResumeBuilderSimpleTool />;
      case 'age-calculator':
        return <AgeCalculatorTool />;
      case 'unit-converter':
        return <UnitConverterTool />;
      case 'usa-paycheck-calculator':
        return <USAPaycheckCalculator2026 />;
      case 'mortgage-calculator':
        return <MortgageCalculator />;
      case 'global-salary-calculator':
        return <GlobalSalaryCalculator />;
      case 'pdf-to-word':
        return <PdfToWordTool />;
      case 'article-reader':
        return <ArticleReader />;
      case 'currency-gold-rates':
        return <CurrencyGoldRates />;

      // Supporting Tools
      case 'image-compress':
        return <ImageCompressor />;
      case 'youtube-thumb':
        return <YouTubeThumb />;
      case 'paraphraser':
        return <Paraphraser />;
      case 'detector':
        return <Detector />;
      case 'humanize-ai-text':
        return <HumanizeAI />;

      // Legal & Mandatory Pages (300+ words each)
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
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer shadow-md shadow-blue-600/20"
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
