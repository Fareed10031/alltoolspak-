'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Image as ImageIcon,
  Youtube,
  Calculator,
  Wand2,
  FileEdit,
  ScanEye,
  FileBadge,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

export const TOOLS_CONFIG = [
  {
    slug: 'pdf-tools',
    title: 'PDF Tools',
    subtitle: 'Merge, Compress & Extract Text',
    icon: FileText,
    badge: 'Popular',
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40',
  },
  {
    slug: 'image-compress',
    title: 'Image Compressor',
    subtitle: 'Reduce KB, Resize & Preview',
    icon: ImageIcon,
    badge: 'Fast',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
  },
  {
    slug: 'youtube-thumb',
    title: 'YouTube Thumbnail',
    subtitle: 'Download 1080p, HQ & SD',
    icon: Youtube,
    badge: 'Free',
    color: 'text-red-500 bg-red-50 dark:bg-red-950/40',
  },
  {
    slug: 'amazon-vat',
    title: 'Amazon EU VAT Calculator',
    subtitle: 'CSV Parsing, PDF & Zip Export',
    icon: Calculator,
    badge: 'EU OSS',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
  },
  {
    slug: 'bg-remover',
    title: 'AI Background Remover',
    subtitle: 'HD Cutout & Transparent PNG',
    icon: Wand2,
    badge: 'AI Powered',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40',
  },
  {
    slug: 'paraphraser',
    title: 'AI Paraphraser',
    subtitle: 'Standard, Fluency & Humanize',
    icon: FileEdit,
    badge: 'AI Powered',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    slug: 'detector',
    title: 'AI Content Detector',
    subtitle: 'Sentence Scoring & Perplexity',
    icon: ScanEye,
    badge: 'AI Powered',
    color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40',
  },
  {
    slug: 'resume-builder',
    title: 'ATS Resume Builder',
    subtitle: 'AI Bullet Optimizer & PDF Export',
    icon: FileBadge,
    badge: 'Career',
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40',
  },
  {
    slug: 'humanize-ai-text',
    title: 'Humanize AI Text',
    subtitle: 'Undetectable Human Rewriter',
    icon: Sparkles,
    badge: 'NEW VIRAL',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
  },
];

export interface HeaderProps {
  currentPath?: string;
  activeTool?: string;
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function Header(_props?: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex h-[64px] items-center justify-between px-4 sm:px-6">

        {/* 1. BRAND - Exact Match with Domain for AdSense */}
        <Link href="/" aria-label="alltoolspk.com - Home">
          <span className="text-[22px] font-extrabold tracking-tight text-slate-900 lowercase">
            alltools<span className="text-emerald-600">pk.com</span>
          </span>
        </Link>

        {/* 2. NAVIGATION - Required Pages for Google Policy */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-slate-700">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </nav>

        {/* 3. CTA - Clean & No Deceptive Click */}
        <div className="flex items-center gap-3">
          <Link
            href="/#tools"
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-emerald-700 transition-all"
          >
            All Tools
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1 text-[14px] font-medium text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-emerald-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-emerald-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-emerald-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-emerald-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}

      {/* 4. ADSENSE SAFE - No popups, no sticky ads here */}
    </header>
  );
}

export { Header };
