import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const renderLoading = (name: string) => () =>
  React.createElement(
    'p',
    { className: 'text-center py-8 text-slate-500 animate-pulse' },
    `Loading ${name}...`
  );

// 14 High-Earning Core Pro Tools - Dynamically Loaded for 95+ PageSpeed Performance
const EmergencyOSTool = dynamic(
  () => import('@/components/tools/EmergencyOSTool').then((m) => m.EmergencyOSTool),
  { ssr: false, loading: renderLoading('Emergency OS') }
);
const MortgageCalculator = dynamic(
  () => import('@/components/tools/MortgageCalculator'),
  { ssr: false, loading: renderLoading('Mortgage Calculator') }
);
const USAPaycheckCalculator2026 = dynamic(
  () => import('@/components/tools/USAPaycheckCalculator2026').then((m) => m.USAPaycheckCalculator2026),
  { ssr: false, loading: renderLoading('Paycheck Calculator') }
);
const AmazonEuVatTool = dynamic(
  () => import('@/components/tools/AmazonEuVatTool').then((m) => m.AmazonEuVatTool),
  { ssr: false, loading: renderLoading('Amazon VAT') }
);
const OneVisaWorldTool = dynamic(
  () => import('@/components/tools/OneVisaWorldTool').then((m) => m.OneVisaWorldTool),
  { ssr: false, loading: renderLoading('OneVisa World') }
);
const GlobalSalaryCalculator = dynamic(
  () => import('@/components/tools/GlobalSalaryCalculator'),
  { ssr: false, loading: renderLoading('Salary Calculator') }
);
const ResumeBuilderSimpleTool = dynamic(
  () => import('@/components/tools/ResumeBuilderSimpleTool').then((m) => m.ResumeBuilderSimpleTool),
  { ssr: false, loading: renderLoading('Resume Builder') }
);
const PdfToWordTool = dynamic(
  () => import('@/components/tools/PdfToWordTool').then((m) => m.PdfToWordTool),
  { ssr: false, loading: renderLoading('PDF Suite') }
);
const CurrencyGoldRates = dynamic(
  () => import('@/components/tools/CurrencyGoldRates').then((m) => m.CurrencyGoldRates),
  { ssr: false, loading: renderLoading('Currency & Gold') }
);
const PdfMergerTool = dynamic(
  () => import('@/components/tools/PdfMergerTool').then((m) => m.PdfMergerTool),
  { ssr: false, loading: renderLoading('PDF Merger') }
);
const ImageToPdfTool = dynamic(
  () => import('@/components/tools/ImageToPdfTool').then((m) => m.ImageToPdfTool),
  { ssr: false, loading: renderLoading('Image to PDF') }
);
const QrGeneratorTool = dynamic(
  () => import('@/components/tools/QrGeneratorTool').then((m) => m.QrGeneratorTool),
  { ssr: false, loading: renderLoading('QR Generator') }
);
const AgeCalculatorTool = dynamic(
  () => import('@/components/tools/AgeCalculatorTool').then((m) => m.AgeCalculatorTool),
  { ssr: false, loading: renderLoading('Age Calculator') }
);
const UnitConverterTool = dynamic(
  () => import('@/components/tools/UnitConverterTool').then((m) => m.UnitConverterTool),
  { ssr: false, loading: renderLoading('Unit Converter') }
);

// Supporting Tools
const ReziClonePro = dynamic(
  () => import('@/components/tools/ReziClonePro').then((m) => m.ReziClonePro),
  { ssr: false, loading: renderLoading('Resume Tool') }
);
const AmazonVat = dynamic(
  () => import('@/components/tools/AmazonVat').then((m) => m.AmazonVat),
  { ssr: false, loading: renderLoading('Amazon VAT') }
);
const ImageCompressor = dynamic(
  () => import('@/components/tools/ImageCompressor').then((m) => m.ImageCompressor),
  { ssr: false, loading: renderLoading('Image Compressor') }
);
const YouTubeThumb = dynamic(
  () => import('@/components/tools/YouTubeThumb').then((m) => m.YouTubeThumb),
  { ssr: false, loading: renderLoading('YouTube Thumb') }
);
const Paraphraser = dynamic(
  () => import('@/components/tools/Paraphraser').then((m) => m.Paraphraser),
  { ssr: false, loading: renderLoading('Paraphraser') }
);
const Detector = dynamic(
  () => import('@/components/tools/Detector').then((m) => m.Detector),
  { ssr: false, loading: renderLoading('Detector') }
);
const HumanizeAI = dynamic(
  () => import('@/components/tools/HumanizeAI').then((m) => m.HumanizeAI),
  { ssr: false, loading: renderLoading('Humanize AI') }
);

export interface ToolItem {
  id: string | number;
  name: string;
  description: string;
  component: ComponentType<any>;
  category: string;
  badge: string;
  slug?: string;
  icon?: string;
  path?: string;
  href?: string;
  color?: string;
  fullTitle?: string;
  shortDesc?: string;
  tag?: string;
  isNew?: boolean;
  isPopular?: boolean;
  features?: string[];
  url?: string;
  gradient?: string;
}

// 14 High-Earning Core Suite in CPC Order
export const tools: ToolItem[] = [
  // Tool #14: Car Accident Settlement Calculator ($1000 CPC)
  {
    id: 'car-accident-settlement-calculator',
    slug: 'car-accident-settlement-calculator',
    name: 'Car Accident Settlement Calculator',
    description: '195 Countries supported - Estimate insurance claim settlement, lost wages, rehab cost, and court awards.',
    component: EmergencyOSTool,
    category: 'Legal & Insurance',
    badge: '195 Countries',
    path: '/tools/car-accident-settlement-calculator',
    color: 'from-red-600 via-rose-600 to-amber-600',
    tag: 'Legal & Claims',
    isNew: true,
    isPopular: true,
  },

  // 1 - $10 CPC
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator USA',
    description: 'Calculate true monthly payment with PMI, Property Tax, Insurance & HOA - USA 2026',
    component: MortgageCalculator,
    category: 'Finance',
    badge: 'PMI & Tax Ready',
    path: '/tools/mortgage-calculator',
  },

  // 2 - $8 CPC
  {
    id: 'usa-paycheck-calculator',
    slug: 'usa-paycheck-calculator',
    name: 'USA Paycheck Calculator 2026',
    description: 'Calculate take-home pay after Federal, State, 401(k), and FICA taxes based on verified 2026 IRS standard deductions and tax brackets.',
    component: USAPaycheckCalculator2026,
    category: 'Finance & Calculators',
    badge: '2026 IRS Brackets',
    path: '/tools/usa-paycheck-calculator',
  },

  // 3 - $6 CPC
  {
    id: 'amazon-eu-vat',
    slug: 'amazon-eu-vat',
    name: 'Amazon EU VAT Calculator',
    description: 'Calculate destination EU VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon sellers.',
    component: AmazonEuVatTool,
    category: 'E-Commerce & Finance',
    badge: 'EU OSS Ready',
    path: '/tools/amazon-eu-vat',
  },

  // 4 - $5 CPC
  {
    id: 'onevisa-world',
    slug: 'onevisa-world',
    name: 'OneVisa World - Visa Points Calculator',
    description: 'Free Global Visa Eligibility & Points Calculator 2026. Check Canada CRS, UK Points, Australia 65, Germany Opportunity Card.',
    component: OneVisaWorldTool,
    category: 'Immigration & Relocation',
    badge: 'Visa & CRS',
    path: '/tools/onevisa-world',
  },

  // 5 - $4 CPC
  {
    id: 'global-salary-calculator',
    slug: 'global-salary-calculator',
    name: 'Global Salary Calculator',
    description: 'Calculate take-home pay, tax deductions, hourly & monthly wages across 192 countries for 2026.',
    component: GlobalSalaryCalculator,
    category: 'Finance',
    badge: '192 Countries',
    path: '/global-salary-calculator/united-states',
  },

  // 6 - $5 CPC
  {
    id: 'resume-builder',
    slug: 'resume-builder',
    name: 'ATS Resume Builder',
    description: 'Build ATS-friendly resume that passes Applicant Tracking System. 100% compliant format, download as real selectable text PDF.',
    component: ResumeBuilderSimpleTool,
    category: 'Career & Productive',
    badge: 'ATS • 100% Pass',
    path: '/tools/resume-builder',
  },

  // 7 - BILLION TRAFFIC
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    name: 'PDF 3X Pro (3-in-1)',
    fullTitle: 'PDF 3X Pro - Convert | Compress | Create',
    description: 'PDF to Word, Compress PDF, Word to PDF - 3 Pro Tools in 1 Suite. 100% Private, Browser-Based, No Upload.',
    component: PdfToWordTool,
    category: 'PDF Tools',
    badge: 'NEW • 3-in-1 Suite',
    path: '/tools/pdf-to-word',
  },

  // 8 - DAILY TRAFFIC
  {
    id: 'currency-gold-rates',
    slug: 'currency-gold-rates',
    name: 'Live Currency & Gold Rates - 150+ Countries',
    description: 'USD to PKR Today + Gold Per Tola - Live 100% correct rates across 150+ countries with 60s auto-refresh.',
    component: CurrencyGoldRates,
    category: 'Finance & Markets',
    badge: 'LIVE 100% CORRECT',
    path: '/currency-gold-rates',
  },

  // 9 - PDF Merger
  {
    id: 'pdf-merge',
    slug: 'pdf-merge',
    name: 'PDF Merger',
    description: 'Merge multiple PDFs into one single file in seconds, 100% offline.',
    component: PdfMergerTool,
    category: 'Document Utilities',
    badge: 'PDF Tool',
    path: '/tools/pdf-merge',
  },

  // 10 - Image to PDF
  {
    id: 'image-to-pdf',
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG/PNG images to high quality PDF, no quality loss.',
    component: ImageToPdfTool,
    category: 'Convert',
    badge: 'Convert',
    path: '/tools/image-to-pdf',
  },

  // 11 - QR Code Generator
  {
    id: 'qr-generator',
    slug: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for links, text, or contact info instantly.',
    component: QrGeneratorTool,
    category: 'Generator',
    badge: 'Generator',
    path: '/tools/qr-generator',
  },

  // 12 - Age Calculator
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from date of birth in years, months, days.',
    component: AgeCalculatorTool,
    category: 'Calculators',
    badge: 'Calc',
    path: '/tools/age-calculator',
  },

  // 13 - Unit Converter
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature & more instantly.',
    component: UnitConverterTool,
    category: 'Calculators',
    badge: 'Convert',
    path: '/tools/unit-converter',
  },

  // Supporting / Legacy Companion Tools
  {
    id: 'amazon-vat',
    name: 'Amazon VAT Calculator',
    description: 'Calculate VAT rates for 195 countries including Pakistan 18% GST, UK 20%, Germany 19% + custom rate.',
    component: AmazonVat,
    category: 'E-Commerce & Finance',
    badge: '195 Countries',
  },
  {
    id: 'paraphraser',
    name: 'AI Text Paraphraser',
    description: 'Rewrite sentences, articles, and essays in Standard, Fluency, and Humanize modes.',
    component: Paraphraser,
    category: 'AI & Creative',
    badge: '3 Modes',
  },
  {
    id: 'detector',
    name: 'AI Content Detector',
    description: 'Analyze text for AI-generated patterns and get an instant Human vs AI probability score.',
    component: Detector,
    category: 'AI & Creative',
    badge: 'Probability %',
  },
  {
    id: 'humanize-ai-text',
    name: 'Humanize AI Text',
    description: 'Convert robotic AI text into natural, bypass-ready human writing with zero robotic markers.',
    component: HumanizeAI,
    category: 'AI & Creative',
    badge: 'Bypass AI',
  },
  {
    id: 'image-compress',
    name: 'Bulk Image Compressor',
    description: 'Compress PNG, JPEG, and WebP images up to 80% directly in your browser without quality loss.',
    component: ImageCompressor,
    category: 'Media & Imaging',
    badge: 'Client-Side',
  },
  {
    id: 'youtube-thumb',
    name: 'YouTube Thumbnail Downloader',
    description: 'Extract and save full-resolution HD (1080p, 4K) thumbnails from any YouTube video instantly.',
    component: YouTubeThumb,
    category: 'Media & Imaging',
    badge: 'HD Extract',
  },
];
