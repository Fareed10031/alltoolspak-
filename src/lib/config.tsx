import React from 'react';
import {
  Files,
  FileCheck,
  ImageIcon,
  ArrowRight,
  FileText,
  QrCode,
  Calendar,
  Cake,
  Clock,
  Ruler,
  Scale,
  ArrowLeftRight,
  Home,
  Globe,
  Coins,
  DollarSign,
  Crown,
} from 'lucide-react';

export const SITE_NAME = "AllToolsPK";

export interface ToolItem {
  id?: string | number;
  slug: string;
  name: string;
  desc: string;
  tag: string;
  colorIndex?: number;
  color?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  shortName?: string;
  fullTitle?: string;
  shortDesc?: string;
  seoTitle?: string;
  path?: string;
  url?: string;
  category?: string;
  description?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  features?: string[];
  gradient?: string;
}

// EXACT HIGH-EARNING TOOLS IN CPC & REVENUE PRIORITY ORDER
export const TOOLS: ToolItem[] = [
  // 1 - $10 CPC - HIGHEST EARNING
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator USA",
    shortName: "Mortgage USA",
    desc: "Calculate true monthly payment with PMI, Property Tax, Insurance & HOA - USA 2026",
    description: "Calculate true monthly payment with PMI, Property Tax, Insurance & HOA - USA 2026",
    badge: "PMI & Tax Ready",
    badgeColor: "bg-purple-50 text-purple-700 border border-purple-200",
    tag: "PMI & Tax Ready",
    category: "Finance",
    colorIndex: 0,
    color: "bg-gradient-to-br from-purple-600 to-indigo-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="Mortgage Calculator USA Icon">
        🏠
      </div>
    ),
    path: "/tools/mortgage-calculator",
    url: "/mortgage-calculator",
    isFeatured: true,
    isPopular: true,
  },

  // 2 - $8 CPC
  {
    slug: "usa-paycheck-calculator",
    name: "USA Paycheck Calculator 2026",
    shortName: "USA Paycheck",
    desc: "Calculate take-home pay after Federal, State, 401(k), and FICA taxes based on verified 2026 IRS standard deductions and tax brackets.",
    description: "Calculate take-home pay after Federal, State, 401(k), and FICA taxes based on verified 2026 IRS standard deductions and tax brackets.",
    badge: "2026 IRS Brackets",
    badgeColor: "bg-green-50 text-green-700 border border-green-200",
    tag: "2026 IRS Brackets",
    category: "Finance",
    colorIndex: 1,
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white font-black text-2xl" aria-label="USA Paycheck Calculator Icon">
        $
      </div>
    ),
    path: "/tools/usa-paycheck-calculator",
    url: "/usa-paycheck-calculator",
    isFeatured: true,
    isPopular: true,
  },

  // 3 - $6 CPC
  {
    slug: "amazon-eu-vat",
    name: "Amazon EU VAT Calculator",
    shortName: "Amazon VAT",
    desc: "Calculate destination EU VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon sellers.",
    description: "Calculate destination EU VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon sellers.",
    badge: "EU OSS Ready",
    badgeColor: "bg-blue-50 text-blue-700 border border-blue-200",
    tag: "EU OSS Ready",
    category: "E-Commerce",
    colorIndex: 2,
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white font-black text-xl" aria-label="Amazon EU VAT Calculator Icon">
        VAT
      </div>
    ),
    path: "/tools/amazon-eu-vat",
    url: "/amazon-eu-vat",
  },

  // 4 - $5 CPC
  {
    slug: "onevisa-world",
    name: "OneVisa World - Visa Points Calculator",
    shortName: "OneVisa World",
    desc: "Free Global Visa Eligibility & Points Calculator 2026. Check Canada CRS, UK Points, Australia 65, Germany Opportunity Card.",
    description: "Free Global Visa Eligibility & Points Calculator 2026. Check Canada CRS, UK Points, Australia 65, Germany Opportunity Card.",
    badge: "Visa & CRS",
    badgeColor: "bg-blue-50 text-blue-700 border border-blue-200",
    tag: "Visa & CRS",
    category: "Immigration",
    colorIndex: 3,
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="OneVisa World Icon">
        🌐
      </div>
    ),
    path: "/tools/onevisa-world",
    url: "/onevisa-world",
    isNew: true,
  },

  // 5 - $4 CPC
  {
    slug: "global-salary-calculator",
    name: "Global Salary Calculator",
    shortName: "Global Salary",
    desc: "Calculate take-home pay, tax deductions, hourly & monthly wages across 192 countries for 2026.",
    description: "Calculate take-home pay, tax deductions, hourly & monthly wages across 192 countries for 2026.",
    badge: "192 Countries",
    badgeColor: "bg-sky-50 text-sky-700 border border-sky-200",
    tag: "192 Countries",
    category: "Finance",
    colorIndex: 4,
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="Global Salary Calculator Icon">
        🌍
      </div>
    ),
    path: "/tools/global-salary-calculator",
    url: "/global-salary-calculator",
  },

  // 6 - $5 CPC
  {
    slug: "resume-builder",
    name: "ATS Resume Builder",
    shortName: "ATS Resume",
    desc: "Build ATS-friendly resume that passes Applicant Tracking System. 100% compliant format, download as real selectable text PDF.",
    description: "Build ATS-friendly resume that passes Applicant Tracking System. 100% compliant format, download as real selectable text PDF.",
    badge: "ATS • 100% Pass",
    badgeColor: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    tag: "ATS • 100% Pass",
    category: "Career",
    colorIndex: 5,
    color: "bg-gradient-to-br from-cyan-500 to-sky-500",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white font-black text-xl" aria-label="ATS Resume Builder Icon">
        CV
      </div>
    ),
    path: "/tools/resume-builder",
    url: "/resume-builder",
    isPopular: true,
  },

  // 7 - BILLION TRAFFIC
  {
    slug: "pdf-to-word",
    name: "PDF 3X Pro (3-in-1)",
    shortName: "PDF 3X Pro",
    desc: "PDF to Word, Compress PDF, Word to PDF - 3 Pro Tools in 1 Suite. 100% Private, Browser-Based, No Server Upload.",
    description: "PDF to Word, Compress PDF, Word to PDF - 3 Pro Tools in 1 Suite. 100% Private, Browser-Based, No Server Upload.",
    badge: "NEW • 3-in-1 Suite",
    badgeColor: "bg-purple-50 text-purple-700 border border-purple-200",
    tag: "NEW • 3-in-1 Suite",
    category: "PDF Tools",
    colorIndex: 6,
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="PDF 3X Pro Icon">
        📄
      </div>
    ),
    path: "/tools/pdf-to-word",
    url: "/pdf-to-word",
    isNew: true,
    isPopular: true,
  },

  // 8 - DAILY TRAFFIC
  {
    slug: "currency-gold-rates",
    name: "Live Currency & Gold Rates - 150+ Countries",
    shortName: "Currency & Gold",
    desc: "USD to PKR Today + Gold Per Tola - Live 100% correct rates across 150+ countries with 60s auto-refresh.",
    description: "USD to PKR Today + Gold Per Tola - Live 100% correct rates across 150+ countries with 60s auto-refresh.",
    badge: "LIVE 100% CORRECT",
    badgeColor: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    tag: "LIVE 100% CORRECT",
    category: "Finance",
    colorIndex: 7,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-xl font-black" aria-label="Live Currency and Gold Rates Icon">
        👑$
      </div>
    ),
    path: "/tools/currency-gold-rates",
    url: "/currency-gold-rates",
    isFeatured: true,
  },

  // 9 - PDF Merger
  {
    slug: "pdf-merge",
    name: "PDF Merger",
    shortName: "PDF Merger",
    desc: "Merge multiple PDFs into one single file in seconds, 100% offline.",
    description: "Merge multiple PDFs into one single file in seconds, 100% offline.",
    badge: "PDF Tool",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    tag: "PDF Tool",
    category: "PDF Tools",
    colorIndex: 8,
    color: "bg-gradient-to-br from-red-400 to-red-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="PDF Merger Icon">
        📑
      </div>
    ),
    path: "/tools/pdf-merge",
    url: "/pdf-merge",
  },

  // 10 - Image to PDF
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    shortName: "Image to PDF",
    desc: "Convert JPG/PNG images to high quality PDF, no quality loss.",
    description: "Convert JPG/PNG images to high quality PDF, no quality loss.",
    badge: "Convert",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    tag: "Convert",
    category: "Convert",
    colorIndex: 9,
    color: "bg-gradient-to-br from-green-400 to-lime-500",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="Image to PDF Icon">
        🖼️
      </div>
    ),
    path: "/tools/image-to-pdf",
    url: "/image-to-pdf",
  },

  // 11 - QR Code Generator
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    shortName: "QR Code",
    desc: "Create QR codes for links, text, or contact info instantly.",
    description: "Create QR codes for links, text, or contact info instantly.",
    badge: "Generator",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    tag: "Generator",
    category: "Utilities",
    colorIndex: 10,
    color: "bg-black",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="QR Code Generator Icon">
        ⚏
      </div>
    ),
    path: "/tools/qr-generator",
    url: "/qr-generator",
  },

  // 12 - Age Calculator
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortName: "Age Calc",
    desc: "Calculate exact age from date of birth in years, months, days.",
    description: "Calculate exact age from date of birth in years, months, days.",
    badge: "Calc",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    tag: "Calc",
    category: "Calculators",
    colorIndex: 11,
    color: "bg-gradient-to-br from-pink-500 to-orange-400",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="Age Calculator Icon">
        📅
      </div>
    ),
    path: "/tools/age-calculator",
    url: "/age-calculator",
  },

  // 13 - Unit Converter
  {
    slug: "unit-converter",
    name: "Unit Converter",
    shortName: "Unit Converter",
    desc: "Convert length, weight, temperature & more instantly.",
    description: "Convert length, weight, temperature & more instantly.",
    badge: "Convert",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    tag: "Convert",
    category: "Calculators",
    colorIndex: 12,
    color: "bg-gradient-to-br from-purple-600 to-fuchsia-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-black" aria-label="Unit Converter Icon">
        %
      </div>
    ),
    path: "/tools/unit-converter",
    url: "/unit-converter",
  },

  // 14 - Tool #14: Global Accident & Emergency Compensation Calculator OS
  {
    slug: "emergency-os",
    name: "Global Accident & Emergency Compensation Calculator OS",
    shortName: "Emergency OS",
    desc: "195 Countries supported - Estimate insurance claim settlement, lost wages, rehab cost, and court awards.",
    description: "195 Countries supported - Estimate insurance claim settlement, lost wages, rehab cost, and court awards.",
    badge: "195 Countries",
    badgeColor: "bg-red-50 text-red-700 border border-red-200",
    tag: "Calc",
    category: "Legal & Insurance",
    colorIndex: 8,
    color: "bg-gradient-to-br from-red-600 via-rose-600 to-amber-600",
    icon: (
      <div className="w-full h-full flex items-center justify-center text-white text-2xl" aria-label="Emergency OS Calculator Icon">
        🚑
      </div>
    ),
    path: "/tools/emergency-os",
    url: "/emergency-os",
    isFeatured: true,
    isNew: true,
  },
];

export const COLORS = [
  { bg: "bg-purple-600", light: "bg-purple-50", border: "border-purple-100", text: "text-purple-600" },
  { bg: "bg-green-600", light: "bg-green-50", border: "border-green-100", text: "text-green-600" },
  { bg: "bg-blue-600", light: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
  { bg: "bg-indigo-600", light: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600" },
  { bg: "bg-sky-600", light: "bg-sky-50", border: "border-sky-100", text: "text-sky-600" },
  { bg: "bg-cyan-600", light: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600" },
  { bg: "bg-violet-600", light: "bg-violet-50", border: "border-violet-100", text: "text-violet-600" },
  { bg: "bg-amber-600", light: "bg-amber-50", border: "border-amber-100", text: "text-amber-600" },
  { bg: "bg-red-600", light: "bg-red-50", border: "border-red-100", text: "text-red-600" },
  { bg: "bg-emerald-600", light: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600" },
  { bg: "bg-slate-900", light: "bg-slate-100", border: "border-slate-200", text: "text-slate-900" },
  { bg: "bg-pink-600", light: "bg-pink-50", border: "border-pink-100", text: "text-pink-600" },
  { bg: "bg-fuchsia-600", light: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-600" },
];
