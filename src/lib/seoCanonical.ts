export const SITE_URL = 'https://alltoolspk.com';

export interface CanonicalPageMeta {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  canonical: string;
  robots: 'index, follow, max-image-preview:large' | 'noindex, follow';
  isTool: boolean;
  applicationCategory?: string;
}

export const CANONICAL_PAGES: Record<string, CanonicalPageMeta> = {
  home: {
    slug: '',
    name: 'AllToolsPK',
    category: 'Home',
    title: 'AllToolsPK - 14 Free Private Online Tools (Finance, PDF, Visa & Utilities)',
    description:
      'Use 14 free client-side tools on AllToolsPK: Car Accident Settlement Calculator, Mortgage USA, Paycheck 2026, Amazon EU VAT, OneVisa World, ATS Resume & PDF Suite.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow, max-image-preview:large',
    isTool: false,
  },
  'global-accident-emergency': {
    slug: 'global-accident-emergency',
    name: 'Car Accident Settlement Calculator',
    category: 'Legal & Insurance',
    title: 'Car Accident Settlement Calculator (195 Countries) | AllToolsPK',
    description:
      'Estimate car accident insurance claims, bodily injury multipliers, medical bills, lost wages, and rehabilitation settlements across 195 countries privately.',
    canonical: `${SITE_URL}/global-accident-emergency`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'FinanceApplication',
  },
  'mortgage-calculator-usa': {
    slug: 'mortgage-calculator-usa',
    name: 'Mortgage Calculator USA',
    category: 'Finance',
    title: 'Mortgage Calculator USA 2026 (PMI, Property Tax & HOA) | AllToolsPK',
    description:
      'Calculate accurate US monthly mortgage payments including principal, interest, PMI, county property taxes, home insurance, and HOA fees with amortization.',
    canonical: `${SITE_URL}/mortgage-calculator-usa`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'FinanceApplication',
  },
  'usa-paycheck-calculator-2026': {
    slug: 'usa-paycheck-calculator-2026',
    name: 'USA Paycheck Calculator 2026',
    category: 'Finance',
    title: 'USA Paycheck Calculator 2026 (Federal, State & FICA Tax) | AllToolsPK',
    description:
      'Calculate your 2026 US take-home pay after Federal income tax, State taxes, 401(k) contributions, Social Security, and Medicare deductions using IRS brackets.',
    canonical: `${SITE_URL}/usa-paycheck-calculator-2026`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'FinanceApplication',
  },
  'amazon-eu-vat-calculator': {
    slug: 'amazon-eu-vat-calculator',
    name: 'Amazon EU VAT Calculator',
    category: 'E-Commerce',
    title: 'Amazon EU VAT Calculator (27 EU States & OSS Ready) | AllToolsPK',
    description:
      'Compute destination EU VAT rates, net vs gross pricing, and OSS/IOSS invoices across all 27 European Union countries for Amazon FBA sellers.',
    canonical: `${SITE_URL}/amazon-eu-vat-calculator`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'BusinessApplication',
  },
  'currency-gold-rates': {
    slug: 'currency-gold-rates',
    name: 'Live Currency & Gold Rates',
    category: 'Finance',
    title: 'Live Currency & Gold Rates Today (USD to PKR & 24K Tola) | AllToolsPK',
    description:
      'Track real-time USD to PKR interbank exchange rates across 150+ currencies plus live 24K & 22K gold prices per tola, 10 grams, and ounce.',
    canonical: `${SITE_URL}/currency-gold-rates`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'FinanceApplication',
  },
  'global-salary-calculator': {
    slug: 'global-salary-calculator',
    name: 'Global Salary Calculator',
    category: 'Finance',
    title: 'Global Salary Calculator (192 Countries Net Pay & PPP) | AllToolsPK',
    description:
      'Compare gross-to-net take-home salary, income taxes, hourly freelance billing rates, and Purchasing Power Parity across 192 countries worldwide.',
    canonical: `${SITE_URL}/global-salary-calculator`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'FinanceApplication',
  },
  'ats-resume-builder': {
    slug: 'ats-resume-builder',
    name: 'ATS Resume Builder',
    category: 'Career',
    title: 'Free ATS Resume Builder & CV Maker (Selectable Text PDF) | AllToolsPK',
    description:
      'Create 100% ATS-friendly single-column resumes that pass Workday, Taleo, and Greenhouse parsers. Export clean, selectable text PDFs with zero paywall.',
    canonical: `${SITE_URL}/ats-resume-builder`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'BusinessApplication',
  },
  'pdf-3x-pro': {
    slug: 'pdf-3x-pro',
    name: 'PDF 3X Pro Suite',
    category: 'PDF & Documents',
    title: 'PDF 3X Pro - Free PDF to Word, Compress PDF & Word to PDF | AllToolsPK',
    description:
      'Convert PDF to editable Word (2-column layout fix), compress PDFs up to 80% with searchable text, and convert DOCX to PDF 100% client-side.',
    canonical: `${SITE_URL}/pdf-3x-pro`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'pdf-merger': {
    slug: 'pdf-merger',
    name: 'PDF Merger',
    category: 'PDF & Documents',
    title: 'Free PDF Merger Online - Combine PDF Files Privately | AllToolsPK',
    description:
      'Merge multiple PDF documents into a single ordered PDF directly in your browser with zero file uploads, zero watermarks, and instant download.',
    canonical: `${SITE_URL}/pdf-merger`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'image-to-pdf': {
    slug: 'image-to-pdf',
    name: 'Image to PDF Converter',
    category: 'PDF & Documents',
    title: 'Free Image to PDF Converter (JPG, PNG, WebP to PDF) | AllToolsPK',
    description:
      'Convert JPG, PNG, and WebP photos into crisp multi-page A4 or Letter PDF files offline in your browser with custom margins and zero quality loss.',
    canonical: `${SITE_URL}/image-to-pdf`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'qr-code-generator': {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'Utilities',
    title: 'Free QR Code Generator (Custom Colors, WiFi, vCard & PNG/SVG) | AllToolsPK',
    description:
      'Generate high-resolution custom QR codes for URLs, WiFi networks, WhatsApp links, and business vCards with custom colors and instant PNG/JPG export.',
    canonical: `${SITE_URL}/qr-code-generator`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'age-calculator': {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'Calculators',
    title: 'Free Age Calculator - Exact Age in Years, Months, Days | AllToolsPK',
    description:
      'Calculate exact chronological age from date of birth in years, months, weeks, days, hours, and next birthday countdown for official exams and forms.',
    canonical: `${SITE_URL}/age-calculator`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'onevisa-world-visa-points': {
    slug: 'onevisa-world-visa-points',
    name: 'OneVisa World Visa Points Calculator',
    category: 'Immigration',
    title: 'OneVisa World - Global Visa Eligibility & CRS Points Calculator | AllToolsPK',
    description:
      'Check visa points eligibility for Canada Express Entry CRS, UK Skilled Worker (70 pts), Australia GSM (65 pts), and Germany Opportunity Card.',
    canonical: `${SITE_URL}/onevisa-world-visa-points`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'unit-converter': {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'Calculators',
    title: 'Free Unit Converter (Length, Weight, Temp, Marla & Kanal) | AllToolsPK',
    description:
      'Convert 200+ measurement units instantly including length, weight, temperature, volume, speed, and regional land units like Marla, Kanal, and Sq Ft.',
    canonical: `${SITE_URL}/unit-converter`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  // Supporting tools (kept functional & clean, never broken)
  'password-gen': {
    slug: 'password-gen',
    name: 'Password Generator',
    category: 'Utilities',
    title: 'Cryptographic Password Generator - Strong Random Passwords | AllToolsPK',
    description:
      'Generate unbreakable random passwords offline in your browser with customizable length, symbols, numbers, and entropy strength meter.',
    canonical: `${SITE_URL}/password-gen`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'image-compress': {
    slug: 'image-compress',
    name: 'Image Compressor',
    category: 'Utilities',
    title: 'Free Browser Image Compressor (JPG, PNG, WebP) | AllToolsPK',
    description:
      'Compress JPG, PNG, and WebP images client-side without losing visual clarity or uploading private photos to remote servers.',
    canonical: `${SITE_URL}/image-compress`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'youtube-thumb': {
    slug: 'youtube-thumb',
    name: 'YouTube Thumbnail Grabber',
    category: 'Utilities',
    title: 'YouTube Thumbnail Downloader (1080p MaxRes, HQ & SD) | AllToolsPK',
    description:
      'Extract and download high-resolution 1080p, HQ, SD, and MQ YouTube and Shorts video thumbnails instantly.',
    canonical: `${SITE_URL}/youtube-thumb`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  paraphraser: {
    slug: 'paraphraser',
    name: 'Text Paraphraser',
    category: 'Utilities',
    title: 'Free Online Text Paraphraser & Rewriter | AllToolsPK',
    description:
      'Rewrite and refine paragraphs in Standard, Fluency, or Natural modes cleanly inside your browser.',
    canonical: `${SITE_URL}/paraphraser`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  detector: {
    slug: 'detector',
    name: 'AI Content Pattern Checker',
    category: 'Utilities',
    title: 'AI Content Pattern & Readability Analyzer | AllToolsPK',
    description:
      'Analyze sentence burstiness, perplexity cues, and writing patterns locally in your browser.',
    canonical: `${SITE_URL}/detector`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  'humanize-ai-text': {
    slug: 'humanize-ai-text',
    name: 'Natural Text Humanizer',
    category: 'Utilities',
    title: 'Natural Writing & Tone Refiner | AllToolsPK',
    description:
      'Polish stiff or repetitive text into natural, readable human prose directly in your browser.',
    canonical: `${SITE_URL}/humanize-ai-text`,
    robots: 'index, follow, max-image-preview:large',
    isTool: true,
    applicationCategory: 'UtilitiesApplication',
  },
  // Legal & Info Pages (5 Canonical pages in sitemap.xml)
  'privacy-policy': {
    slug: 'privacy-policy',
    name: 'Privacy Policy',
    category: 'Legal',
    title: 'Privacy Policy & Client-Side Data Guarantee | AllToolsPK',
    description:
      'Read the AllToolsPK Privacy Policy detailing zero server file uploads, cookies, Google AdSense disclosures, and GDPR/CCPA rights.',
    canonical: `${SITE_URL}/privacy-policy`,
    robots: 'index, follow, max-image-preview:large',
    isTool: false,
  },
  'terms-of-service': {
    slug: 'terms-of-service',
    name: 'Terms of Service',
    category: 'Legal',
    title: 'Terms of Service & Usage Guidelines | AllToolsPK',
    description:
      'Review the AllToolsPK Terms of Service covering free online tool usage, calculator accuracy disclaimers, and intellectual property.',
    canonical: `${SITE_URL}/terms-of-service`,
    robots: 'index, follow, max-image-preview:large',
    isTool: false,
  },
  'about-us': {
    slug: 'about-us',
    name: 'About Us',
    category: 'Legal',
    title: 'About AllToolsPK - Privacy-First Free Utility Suite',
    description:
      'Learn about AllToolsPK, founder Fareed Ullah, and our mission to deliver fast, zero-upload browser tools globally.',
    canonical: `${SITE_URL}/about-us`,
    robots: 'index, follow, max-image-preview:large',
    isTool: false,
  },
  'contact-us': {
    slug: 'contact-us',
    name: 'Contact Us',
    category: 'Legal',
    title: 'Contact AllToolsPK Support & Founder Fareed Ullah',
    description:
      'Get in touch with AllToolsPK for technical support, bug reports, feature requests, and partnership inquiries.',
    canonical: `${SITE_URL}/contact-us`,
    robots: 'index, follow, max-image-preview:large',
    isTool: false,
  },
  disclaimer: {
    slug: 'disclaimer',
    name: 'Disclaimer',
    category: 'Legal',
    title: 'Legal, Financial & Medical Estimator Disclaimer | AllToolsPK',
    description:
      'Read the official AllToolsPK disclaimer regarding financial calculators, accident settlement estimates, and informational content.',
    canonical: `${SITE_URL}/disclaimer`,
    robots: 'index, follow, max-image-preview:large',
    isTool: false,
  },
  // Thin / Secondary pages -> explicitly noindex, follow and excluded from sitemap
  blog: {
    slug: 'blog',
    name: 'Blog',
    category: 'Guides',
    title: 'AllToolsPK Blog & Guides',
    description: 'Upcoming guides and tutorials for AllToolsPK utilities.',
    canonical: `${SITE_URL}/blog`,
    robots: 'noindex, follow',
    isTool: false,
  },
  cookies: {
    slug: 'cookies',
    name: 'Cookie Policy',
    category: 'Legal',
    title: 'Cookie Policy & Storage Audit | AllToolsPK',
    description: 'Audit inventory of local storage keys and optional cookies on AllToolsPK.',
    canonical: `${SITE_URL}/cookies`,
    robots: 'noindex, follow',
    isTool: false,
  },
};

export const ROUTE_ALIASES: Record<string, string> = {
  // Home aliases
  home: '',
  index: '',
  tools: '',

  // Canonical tool aliases -> canonical sitemap slug
  'emergency-os': 'global-accident-emergency',
  emergency: 'global-accident-emergency',
  'accident-calculator': 'global-accident-emergency',
  'compensation-calculator': 'global-accident-emergency',
  'accident-compensation': 'global-accident-emergency',
  'car-accident-settlement-calculator': 'global-accident-emergency',
  'accident-settlement-calculator': 'global-accident-emergency',
  'personal-injury-compensation': 'global-accident-emergency',

  'mortgage-calculator': 'mortgage-calculator-usa',
  mortgage: 'mortgage-calculator-usa',
  'mortgage-calc': 'mortgage-calculator-usa',

  'usa-paycheck-calculator': 'usa-paycheck-calculator-2026',
  'paycheck-calculator': 'usa-paycheck-calculator-2026',
  paycheck: 'usa-paycheck-calculator-2026',
  'tax-calculator': 'usa-paycheck-calculator-2026',

  'amazon-eu-vat': 'amazon-eu-vat-calculator',
  'amazon-vat': 'amazon-eu-vat-calculator',
  'amazon-vat-calculator': 'amazon-eu-vat-calculator',
  'eu-vat-calculator': 'amazon-eu-vat-calculator',
  'vat-calculator': 'amazon-eu-vat-calculator',

  'live-currency-gold-rates': 'currency-gold-rates',
  'currency-gold': 'currency-gold-rates',
  'gold-rates': 'currency-gold-rates',
  'currency-rates': 'currency-gold-rates',
  'usd-to-pkr': 'currency-gold-rates',
  'usd-to-pkr-live': 'currency-gold-rates',
  'gold-price-pakistan': 'currency-gold-rates',
  'crypto-converter': 'currency-gold-rates',
  crypto: 'currency-gold-rates',
  'bitcoin-to-pkr': 'currency-gold-rates',
  'crypto-calculator': 'currency-gold-rates',

  'global-salary': 'global-salary-calculator',
  'salary-calculator': 'global-salary-calculator',
  'world-salary': 'global-salary-calculator',
  'freelance-rate-calculator': 'global-salary-calculator',

  'resume-builder': 'ats-resume-builder',
  'ats-resume-checker': 'ats-resume-builder',
  resume: 'ats-resume-builder',
  'cv-builder': 'ats-resume-builder',

  'pdf-to-word': 'pdf-3x-pro',
  'pdf-to-word-converter': 'pdf-3x-pro',
  pdf2word: 'pdf-3x-pro',
  pdftoword: 'pdf-3x-pro',
  'pdf-3x': 'pdf-3x-pro',
  pdf3xpro: 'pdf-3x-pro',

  'pdf-merge': 'pdf-merger',
  'pdf-tools': 'pdf-merger',
  pdf: 'pdf-merger',
  'pdf-suite': 'pdf-merger',

  'img-to-pdf': 'image-to-pdf',
  'jpg-to-pdf': 'image-to-pdf',
  'png-to-pdf': 'image-to-pdf',

  'qr-generator': 'qr-code-generator',
  'qr-code': 'qr-code-generator',
  qr: 'qr-code-generator',

  'age-calc': 'age-calculator',
  age: 'age-calculator',

  'onevisa-world': 'onevisa-world-visa-points',
  'visa-eligibility': 'onevisa-world-visa-points',
  'visa-calculator': 'onevisa-world-visa-points',
  'crs-calculator': 'onevisa-world-visa-points',
  'global-visa-calculator': 'onevisa-world-visa-points',
  'uk-visa-points-calculator': 'onevisa-world-visa-points',
  'canada-crs-calculator': 'onevisa-world-visa-points',
  'onevisa-world-visa-points-calculator': 'onevisa-world-visa-points',

  'unit-convert': 'unit-converter',
  converter: 'unit-converter',

  // Companion tool aliases
  'password-generator': 'password-gen',
  'pass-gen': 'password-gen',
  password: 'password-gen',
  'image-compressor': 'image-compress',
  'youtube-thumbnail': 'youtube-thumb',
  'ai-paraphraser': 'paraphraser',
  'ai-detector': 'detector',
  'humanize-ai': 'humanize-ai-text',

  // Legal aliases
  about: 'about-us',
  privacy: 'privacy-policy',
  security: 'privacy-policy',
  terms: 'terms-of-service',
  'terms-and-conditions': 'terms-of-service',
  contact: 'contact-us',
  'cookie-policy': 'cookies',
};

export type SeoResolution =
  | { kind: 'redirect'; destination: string }
  | { kind: 'page'; page: CanonicalPageMeta }
  | { kind: 'not-found' };

export function resolveSeoPath(rawPath: string): SeoResolution {
  const pathOnly = (rawPath || '/').split('?')[0].split('#')[0];

  // Redirect /index.html, /index, /tool/index.html, /tool/index -> clean canonical path
  if (/\/index(\.html)?$/i.test(pathOnly)) {
    const strippedIndex = pathOnly.replace(/\/index(\.html)?$/i, '') || '/';
    const inner = strippedIndex === '/' ? { kind: 'page' as const, page: CANONICAL_PAGES.home } : resolveSeoPath(strippedIndex);
    if (inner.kind === 'redirect') return inner;
    if (inner.kind === 'page') {
      return { kind: 'redirect', destination: inner.page.slug ? `/${inner.page.slug}` : '/' };
    }
    return { kind: 'not-found' };
  }

  // Redirect .html extension -> clean path (return 404 if underlying route does not exist)
  if (/\.html$/i.test(pathOnly)) {
    const withoutHtml = pathOnly.replace(/\.html$/i, '') || '/';
    const inner = resolveSeoPath(withoutHtml);
    if (inner.kind === 'redirect') return inner;
    if (inner.kind === 'page') {
      return { kind: 'redirect', destination: inner.page.slug ? `/${inner.page.slug}` : '/' };
    }
    return { kind: 'not-found' };
  }

  // Redirect trailing slash -> non-trailing slash (except root '/')
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) {
    const stripped = pathOnly.replace(/\/+$/, '');
    const inner = resolveSeoPath(stripped);
    if (inner.kind === 'redirect') return inner;
    if (inner.kind === 'page') {
      return { kind: 'redirect', destination: inner.page.slug ? `/${inner.page.slug}` : '/' };
    }
    return { kind: 'not-found' };
  }

  const trimmed = pathOnly.replace(/^\/+|\/+$/g, '').toLowerCase();

  if (trimmed === '') {
    return { kind: 'page', page: CANONICAL_PAGES.home };
  }

  // Redirect /tools/* -> clean canonical slug
  if (trimmed.startsWith('tools/')) {
    const subSlug = trimmed.replace(/^tools\//, '');
    const canonicalSlug = ROUTE_ALIASES[subSlug] ?? subSlug;
    if (canonicalSlug === '') return { kind: 'redirect', destination: '/' };
    if (CANONICAL_PAGES[canonicalSlug]) {
      return { kind: 'redirect', destination: `/${canonicalSlug}` };
    }
    return { kind: 'not-found' };
  }

  // Redirect duplicate alias -> canonical slug
  if (Object.prototype.hasOwnProperty.call(ROUTE_ALIASES, trimmed)) {
    const canonicalSlug = ROUTE_ALIASES[trimmed];
    return { kind: 'redirect', destination: canonicalSlug ? `/${canonicalSlug}` : '/' };
  }

  // Direct match to canonical page
  if (Object.prototype.hasOwnProperty.call(CANONICAL_PAGES, trimmed)) {
    return { kind: 'page', page: CANONICAL_PAGES[trimmed] };
  }

  // Support /global-salary-calculator/<country> dynamically
  if (trimmed.startsWith('global-salary-calculator/')) {
    const countrySlug = trimmed.replace('global-salary-calculator/', '');
    if (countrySlug && !countrySlug.includes('/')) {
      const countryName = countrySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return {
        kind: 'page',
        page: {
          slug: `global-salary-calculator/${countrySlug}`,
          name: `${countryName} Salary Calculator`,
          category: 'Finance',
          title: `${countryName} Salary & Tax Calculator 2026 | AllToolsPK`,
          description: `Calculate net take-home salary, income taxes, and purchasing power in ${countryName} for 2026.`,
          canonical: `${SITE_URL}/global-salary-calculator/${countrySlug}`,
          robots: 'index, follow, max-image-preview:large',
          isTool: true,
          applicationCategory: 'FinanceApplication',
        },
      };
    }
  }

  return { kind: 'not-found' };
}

export function buildSoftwareApplicationJsonLd(page: CanonicalPageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: page.name,
    description: page.description,
    url: page.canonical,
    applicationCategory: page.applicationCategory || 'UtilitiesApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}
