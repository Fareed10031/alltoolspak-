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

import dynamic from 'next/dynamic';

// 14 Core Pro Tools - Dynamically Loaded for 95+ PageSpeed
const AmazonEuVatTool = dynamic(
  () => import('@/components/tools/AmazonEuVatTool').then((m) => m.AmazonEuVatTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Amazon VAT...</p> }
);
const PdfMergerTool = dynamic(
  () => import('@/components/tools/PdfMergerTool').then((m) => m.PdfMergerTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading PDF Merger...</p> }
);
const ImageToPdfTool = dynamic(
  () => import('@/components/tools/ImageToPdfTool').then((m) => m.ImageToPdfTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Image to PDF...</p> }
);
const QrGeneratorTool = dynamic(
  () => import('@/components/tools/QrGeneratorTool').then((m) => m.QrGeneratorTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading QR Generator...</p> }
);
const PasswordGenTool = dynamic(
  () => import('@/components/tools/PasswordGenTool').then((m) => m.PasswordGenTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Password Generator...</p> }
);
const ResumeBuilderSimpleTool = dynamic(
  () => import('@/components/tools/ResumeBuilderSimpleTool').then((m) => m.ResumeBuilderSimpleTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Resume Builder...</p> }
);
const AgeCalculatorTool = dynamic(
  () => import('@/components/tools/AgeCalculatorTool').then((m) => m.AgeCalculatorTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Age Calculator...</p> }
);
const UnitConverterTool = dynamic(
  () => import('@/components/tools/UnitConverterTool').then((m) => m.UnitConverterTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Unit Converter...</p> }
);
const USAPaycheckCalculator2026 = dynamic(
  () => import('@/components/tools/USAPaycheckCalculator2026').then((m) => m.USAPaycheckCalculator2026),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Paycheck Calculator...</p> }
);
const MortgageCalculator = dynamic(
  () => import('@/components/tools/MortgageCalculator'),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Mortgage Calculator...</p> }
);
const GlobalSalaryCalculator = dynamic(
  () => import('@/components/tools/GlobalSalaryCalculator'),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Salary Calculator...</p> }
);
const PdfToWordTool = dynamic(
  () => import('@/components/tools/PdfToWordTool').then((m) => m.PdfToWordTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading PDF Suite...</p> }
);
const Pdf3XProPage = dynamic(
  () => import('@/app/pdf-3x-pro/page'),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading PDF 3X Pro...</p> }
);
const CurrencyGoldRates = dynamic(
  () => import('@/components/tools/CurrencyGoldRates').then((m) => m.CurrencyGoldRates),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Currency & Gold...</p> }
);
const OneVisaWorldTool = dynamic(
  () => import('@/components/tools/OneVisaWorldTool').then((m) => m.OneVisaWorldTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading OneVisa World...</p> }
);
const EmergencyOSTool = dynamic(
  () => import('@/components/tools/EmergencyOSTool').then((m) => m.EmergencyOSTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Emergency OS...</p> }
);

// Companion / Legacy Tools
const ImageCompressor = dynamic(
  () => import('@/components/tools/ImageCompressor').then((m) => m.ImageCompressor),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Image Compressor...</p> }
);
const YouTubeThumb = dynamic(
  () => import('@/components/tools/YouTubeThumb').then((m) => m.YouTubeThumb),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading YouTube Thumb...</p> }
);
const Paraphraser = dynamic(
  () => import('@/components/tools/Paraphraser').then((m) => m.Paraphraser),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Paraphraser...</p> }
);
const Detector = dynamic(
  () => import('@/components/tools/Detector').then((m) => m.Detector),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Detector...</p> }
);
const HumanizeAI = dynamic(
  () => import('@/components/tools/HumanizeAI').then((m) => m.HumanizeAI),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading Humanize AI...</p> }
);

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
    case 'amazon-eu-vat-calculator':
    case 'eu-vat-calculator':
    case 'vat-calculator':
      return 'amazon-eu-vat';

    case 'onevisa-world':
    case 'onevisa-world-visa-points':
    case 'visa-eligibility':
    case 'visa-calculator':
    case 'crs-calculator':
    case 'global-visa-calculator':
    case 'uk-visa-points-calculator':
    case 'canada-crs-calculator':
      return 'onevisa-world';

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
    case 'ats-resume-checker':
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
    case 'usa-paycheck-calculator-2026':
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
    case 'freelance-rate-calculator':
      return 'global-salary-calculator';

    case 'pdf-to-word':
    case 'pdf-to-word-converter':
    case 'pdf2word':
    case 'pdftoword':
      return 'pdf-to-word';

    case 'pdf-3x-pro':
    case 'pdf3xpro':
    case 'pdf-3x':
      return 'pdf-3x-pro';

    case 'currency-gold-rates':
    case 'live-currency-gold-rates':
    case 'currency-gold':
    case 'gold-rates':
    case 'currency-rates':
    case 'usd-to-pkr':
    case 'usd-to-pkr-live':
    case 'gold-price-pakistan':
    case 'crypto-converter':
    case 'crypto':
    case 'bitcoin-to-pkr':
    case 'crypto-calculator':
      return 'currency-gold-rates';

    case 'emergency-os':
    case 'emergency':
    case 'accident-calculator':
    case 'compensation-calculator':
    case 'accident-compensation':
    case 'global-accident-emergency':
    case 'car-accident-settlement-calculator':
    case 'accident-settlement-calculator':
    case 'personal-injury-compensation':
      return 'emergency-os';

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
    case 'security':
      return 'privacy';

    case 'terms':
    case 'terms-of-service':
    case 'terms-and-conditions':
      return 'terms';

    case 'disclaimer':
      return 'disclaimer';

    case 'cookies':
    case 'cookie-policy':
      return 'cookies';

    case 'contact':
    case 'contact-us':
      return 'contact';

    case 'blog':
      return 'blog';

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
        'onevisa-world',
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
        'emergency-os',
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

      // Core Pro Tools
      case 'amazon-eu-vat':
        return <AmazonEuVatTool />;
      case 'onevisa-world':
        return <OneVisaWorldTool />;
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
      case 'pdf-3x-pro':
        return <Pdf3XProPage />;
      case 'currency-gold-rates':
        return <CurrencyGoldRates />;
      case 'emergency-os':
        return <EmergencyOSTool />;

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
