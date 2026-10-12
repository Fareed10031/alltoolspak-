import { ComponentType } from 'react';

// 13 High-Earning Core Pro Tools
import MortgageCalculator from '@/components/tools/MortgageCalculator';
import { USAPaycheckCalculator2026 } from '@/components/tools/USAPaycheckCalculator2026';
import { AmazonEuVatTool } from '@/components/tools/AmazonEuVatTool';
import { OneVisaWorldTool } from '@/components/tools/OneVisaWorldTool';
import GlobalSalaryCalculator from '@/components/tools/GlobalSalaryCalculator';
import { ResumeBuilderSimpleTool } from '@/components/tools/ResumeBuilderSimpleTool';
import { PdfToWordTool } from '@/components/tools/PdfToWordTool';
import { CurrencyGoldRates } from '@/components/tools/CurrencyGoldRates';
import { PdfMergerTool } from '@/components/tools/PdfMergerTool';
import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool';
import { QrGeneratorTool } from '@/components/tools/QrGeneratorTool';
import { AgeCalculatorTool } from '@/components/tools/AgeCalculatorTool';
import { UnitConverterTool } from '@/components/tools/UnitConverterTool';

// Supporting Tools
import { ReziClonePro } from '@/components/tools/ReziClonePro';
import { AmazonVat } from '@/components/tools/AmazonVat';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import { YouTubeThumb } from '@/components/tools/YouTubeThumb';
import { Paraphraser } from '@/components/tools/Paraphraser';
import { Detector } from '@/components/tools/Detector';
import { HumanizeAI } from '@/components/tools/HumanizeAI';

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

// 13 High-Earning Core Suite in CPC Order (Password Generator Removed)
export const tools: ToolItem[] = [
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
