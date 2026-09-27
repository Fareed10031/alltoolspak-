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
  Grid,
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

export default function Header({ onNavigate, onSelectTool }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
      setToolsDropdownOpen(false);
    }
  };

  const handleToolClick = (e: React.MouseEvent, slug: string) => {
    if (onSelectTool) {
      e.preventDefault();
      onSelectTool(slug);
      setMobileMenuOpen(false);
      setToolsDropdownOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-[68px] items-center justify-between px-4 sm:px-6">
        {/* 1. BRAND - 4-color logo + AllToolsPK */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="AllToolsPK - Home"
        >
          <div className="grid grid-cols-2 gap-1 w-7 h-7 shrink-0 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
            <span className="rounded-xs bg-[#0055FF]" />
            <span className="rounded-xs bg-[#00C48C]" />
            <span className="rounded-xs bg-[#FF5A5F]" />
            <span className="rounded-xs bg-[#FFAA00]" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            AllTools<span className="text-[#0055FF]">PK</span>
          </span>
        </Link>

        {/* 2. NAVIGATION - Required Pages for Google AdSense Policy */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            onClick={(e) => handleLinkClick(e, 'privacy')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            onClick={(e) => handleLinkClick(e, 'terms')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* 3. RIGHT SIDE: Tools Grid Icon + CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Tools Grid Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer bg-slate-50 dark:bg-slate-800/60"
              title="Browse all 9 tools"
            >
              <Grid className="w-4 h-4 text-[#0055FF]" />
              <span>Tools</span>
            </button>

            {/* Tools Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Productivity Suite (9 Tools)
                </div>
                <div className="py-1 max-h-80 overflow-y-auto">
                  {TOOLS_CONFIG.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      onClick={(e) => handleToolClick(e, t.slug)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <t.icon className="w-4 h-4 text-[#0055FF]" />
                      <div className="flex-1 truncate">
                        <p className="truncate font-bold">{t.title}</p>
                        <p className="text-[10px] text-slate-400 truncate">{t.subtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#tools-grid"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="bg-[#0055FF] hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            Explore Tools
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={(e) => handleLinkClick(e, 'about')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              onClick={(e) => handleLinkClick(e, 'privacy')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              onClick={(e) => handleLinkClick(e, 'terms')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export { Header };
