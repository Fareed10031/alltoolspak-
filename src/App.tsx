import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/pages/HomePage';
import dynamic from 'next/dynamic';
import { safeStorage, safePrefersDark, safePushState } from '@/lib/storage';
import { TOOLS } from '@/lib/config';
import {
  CANONICAL_PAGES,
  resolveSeoPath,
  buildSoftwareApplicationJsonLd,
  SITE_URL,
  type CanonicalPageMeta,
} from '@/src/lib/seoCanonical';

const CookieBanner = dynamic<{ onNavigate?: (path: string) => void }>(
  () => import('@/components/CookieBanner').then((m) => m.CookieBanner),
  { ssr: false, loading: () => null }
);
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => m.Analytics),
  { ssr: false, loading: () => null }
);
const AboutPage = dynamic(
  () => import('@/components/pages/AboutPage').then((m) => m.AboutPage),
  { ssr: false }
);
const PrivacyPage = dynamic(
  () => import('@/components/pages/PrivacyPage').then((m) => m.PrivacyPage),
  { ssr: false }
);
const TermsPage = dynamic(
  () => import('@/components/pages/TermsPage').then((m) => m.TermsPage),
  { ssr: false }
);
const DisclaimerPage = dynamic(
  () => import('@/components/pages/DisclaimerPage').then((m) => m.DisclaimerPage),
  { ssr: false }
);
const CookiesPage = dynamic(
  () => import('@/components/pages/CookiesPage').then((m) => m.CookiesPage),
  { ssr: false }
);
const ContactPage = dynamic(
  () => import('@/components/pages/ContactPage').then((m) => m.ContactPage),
  { ssr: false }
);
const BlogPage = dynamic(
  () => import('@/components/pages/BlogPage').then((m) => m.BlogPage),
  { ssr: false }
);

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

// Companion Tools
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

export function normalizeRoute(raw: string): string {
  if (!raw) return 'home';
  let clean = raw.trim();
  clean = clean.replace(/^https?:\/\/[^/]+/i, '');
  const pathCandidate = clean.startsWith('/') ? clean : `/${clean}`;
  const resolved = resolveSeoPath(pathCandidate);

  if (resolved.kind === 'redirect') {
    const targetSlug = resolved.destination.replace(/^\/+|\/+$/g, '').toLowerCase();
    return targetSlug === '' ? 'home' : targetSlug;
  }
  if (resolved.kind === 'page') {
    return resolved.page.slug === '' ? 'home' : resolved.page.slug;
  }
  return 'not-found';
}

function getInitialRoute(): string {
  if (typeof window === 'undefined') return 'home';
  try {
    return normalizeRoute(window.location.pathname);
  } catch {
    return 'home';
  }
}

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  const existing = Array.from(document.querySelectorAll('link[rel="canonical"]')) as HTMLLinkElement[];
  if (existing.length > 1) {
    existing.slice(1).forEach((el) => el.remove());
  }
  let link = existing[0];
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  let script = existing as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function getPageMetaForRoute(route: string): CanonicalPageMeta | null {
  if (route === 'home') return CANONICAL_PAGES.home;
  if (route === 'not-found') return null;
  if (CANONICAL_PAGES[route]) return CANONICAL_PAGES[route];
  const resolved = resolveSeoPath(`/${route}`);
  if (resolved.kind === 'page') return resolved.page;
  if (resolved.kind === 'redirect') {
    const target = resolved.destination.replace(/^\/+/, '');
    return CANONICAL_PAGES[target || 'home'] ?? null;
  }
  return null;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(getInitialRoute);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [deferredReady, setDeferredReady] = useState<boolean>(false);
  const [notFoundSearch, setNotFoundSearch] = useState<string>('');

  const activeMeta = useMemo(() => getPageMetaForRoute(currentPage), [currentPage]);

  // Defer non-critical scripts (Analytics & CookieBanner) until idle or user interaction on mobile
  useEffect(() => {
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setDeferredReady(true);
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const timer = setTimeout(activate, isMobile ? 2500 : 800);

    const events = ['scroll', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach((evt) => window.addEventListener(evt, activate, { passive: true, once: true }));

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, activate));
    };
  }, []);

  // Initialize theme and sync URL/popstate
  useEffect(() => {
    const storedTheme = safeStorage.getItem('theme');
    const systemPrefersDark = safePrefersDark();
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const syncFromLocation = () => {
      try {
        const pathname = window.location.pathname || '/';
        const resolved = resolveSeoPath(pathname);
        if (resolved.kind === 'redirect') {
          safePushState(resolved.destination);
          const nextSlug = resolved.destination.replace(/^\/+|\/+$/g, '').toLowerCase();
          setCurrentPage(nextSlug || 'home');
        } else if (resolved.kind === 'page') {
          setCurrentPage(resolved.page.slug || 'home');
        } else {
          setCurrentPage('not-found');
        }
      } catch {
        setCurrentPage('home');
      }
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  // Dynamically sync <head> metadata, canonical URL, robots directives, and SoftwareApplication JSON-LD
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!activeMeta) {
      document.title = 'Page Not Found (404) | AllToolsPK';
      upsertMetaTag(
        'name',
        'description',
        'The page you requested could not be found on AllToolsPK. Search or browse our 14 free online tools.'
      );
      upsertMetaTag('name', 'robots', 'noindex, follow');
      const canonicalExisting = document.querySelector('link[rel="canonical"]');
      canonicalExisting?.remove();
      upsertJsonLd('seo-software-schema', null);
      upsertJsonLd('seo-breadcrumb-schema', null);
      return;
    }

    document.title = activeMeta.title;
    upsertMetaTag('name', 'description', activeMeta.description);
    upsertMetaTag('name', 'robots', activeMeta.robots);
    upsertCanonicalLink(activeMeta.canonical);
    upsertMetaTag('property', 'og:title', activeMeta.title);
    upsertMetaTag('property', 'og:description', activeMeta.description);
    upsertMetaTag('property', 'og:url', activeMeta.canonical);
    upsertMetaTag('name', 'twitter:title', activeMeta.title);
    upsertMetaTag('name', 'twitter:description', activeMeta.description);

    if (activeMeta.isTool) {
      upsertJsonLd('seo-software-schema', buildSoftwareApplicationJsonLd(activeMeta));
      upsertJsonLd('seo-breadcrumb-schema', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: activeMeta.category, item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 3, name: activeMeta.name, item: activeMeta.canonical },
        ],
      });
    } else {
      upsertJsonLd('seo-software-schema', null);
      upsertJsonLd('seo-breadcrumb-schema', null);
    }
  }, [activeMeta]);

  const navigateTo = (page: string) => {
    const resolved = normalizeRoute(page);
    setCurrentPage(resolved);
    setNotFoundSearch('');

    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // ignore
    }

    const newPath = resolved === 'home' ? '/' : resolved === 'not-found' ? '/404' : `/${resolved}`;
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

  const filteredNotFoundTools = useMemo(() => {
    const q = notFoundSearch.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.description ?? '').toLowerCase().includes(q) ||
        (t.category ?? '').toLowerCase().includes(q)
    );
  }, [notFoundSearch]);

  const renderContent = () => {
    if (currentPage.startsWith('global-salary-calculator/')) {
      return <GlobalSalaryCalculator />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onSelectTool={navigateTo} onNavigate={navigateTo} />;

      // Core 14 Canonical Tools
      case 'global-accident-emergency':
        return <EmergencyOSTool />;
      case 'mortgage-calculator-usa':
        return <MortgageCalculator />;
      case 'usa-paycheck-calculator-2026':
        return <USAPaycheckCalculator2026 />;
      case 'amazon-eu-vat-calculator':
        return <AmazonEuVatTool />;
      case 'currency-gold-rates':
        return <CurrencyGoldRates />;
      case 'global-salary-calculator':
        return <GlobalSalaryCalculator />;
      case 'ats-resume-builder':
        return <ResumeBuilderSimpleTool />;
      case 'pdf-3x-pro':
        return <Pdf3XProPage />;
      case 'pdf-merger':
        return <PdfMergerTool />;
      case 'image-to-pdf':
        return <ImageToPdfTool />;
      case 'qr-code-generator':
        return <QrGeneratorTool />;
      case 'age-calculator':
        return <AgeCalculatorTool />;
      case 'onevisa-world-visa-points':
        return <OneVisaWorldTool />;
      case 'unit-converter':
        return <UnitConverterTool />;

      // Companion Tools
      case 'password-gen':
        return <PasswordGenTool />;
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

      // Legal & Info Pages
      case 'about-us':
        return <AboutPage />;
      case 'privacy-policy':
        return <PrivacyPage />;
      case 'terms-of-service':
        return <TermsPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'cookies':
        return <CookiesPage />;
      case 'contact-us':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;

      case 'not-found':
      default:
        return (
          <section className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
              HTTP 404
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              The URL you requested does not exist or has moved to a clean canonical address. Search our free tools below or jump to a popular tool.
            </p>

            <div className="max-w-md mx-auto">
              <label htmlFor="not-found-tool-search" className="sr-only">
                Search tools
              </label>
              <input
                id="not-found-tool-search"
                type="search"
                value={notFoundSearch}
                onChange={(e) => setNotFoundSearch(e.target.value)}
                placeholder="Search tools (e.g. Age Calculator, Mortgage, PDF)..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex justify-center">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('home');
                }}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20"
              >
                Go to Homepage (All Tools)
              </a>
            </div>

            <div className="pt-4 text-left">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-center">
                Top Free Tools on AllToolsPK
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredNotFoundTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={`/${tool.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(tool.slug);
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <span>{tool.name}</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400">{tool.category} &rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
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
        {activeMeta?.isTool && (
          <div className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/70 dark:border-slate-800/70">
            <nav
              aria-label="Breadcrumb"
              className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap"
            >
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('home');
                }}
                className="font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-slate-600 dark:text-slate-300">{activeMeta.category}</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{activeMeta.name}</span>
            </nav>
          </div>
        )}
        {renderContent()}
      </main>

      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      {deferredReady && (
        <>
          <CookieBanner onNavigate={navigateTo} />
          <Analytics />
        </>
      )}
    </div>
  );
}
