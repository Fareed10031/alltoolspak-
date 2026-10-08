'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Grid } from 'lucide-react';
import { TOOLS, SITE_NAME } from '@/lib/config';
import MegaMenu from '@/components/MegaMenu';

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
        {/* 1. BRAND - 4-color squares + AllToolsPK */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="AllToolsPK - Home"
        >
          <div className="grid grid-cols-2 gap-1 w-7 h-7 shrink-0 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
            <span className="rounded-xs bg-blue-600" />
            <span className="rounded-xs bg-emerald-500" />
            <span className="rounded-xs bg-rose-500" />
            <span className="rounded-xs bg-amber-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            AllTools<span className="text-blue-600">PK</span>
          </span>
        </Link>

        {/* 2. NAVIGATION - Required Pages for Google AdSense Policy */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            onClick={(e) => handleLinkClick(e, 'privacy')}
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            onClick={(e) => handleLinkClick(e, 'terms')}
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hover:text-blue-600 dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* 3. RIGHT SIDE: 9-Dot MegaMenu + Tools Grid Icon + CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* iLovePDF Style 9-dot MegaMenu */}
          <MegaMenu />

          {/* Tools Grid Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer bg-slate-50 dark:bg-slate-800/60"
              title="Browse all tools"
            >
              <Grid className="w-4 h-4 text-blue-600" />
              <span>Tools ({TOOLS.length})</span>
            </button>

            {/* Tools Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Productivity Suite ({TOOLS.length} Tools)
                </div>
                <div className="py-1 max-h-80 overflow-y-auto">
                  {TOOLS.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      onClick={(e) => handleToolClick(e, t.slug)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-bold flex items-center justify-center text-xs shrink-0">
                        {t.name[0]}
                      </div>
                      <div className="flex-1 truncate">
                        <p className="truncate font-bold">{t.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{t.tag}</p>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            Explore Tools
          </Link>

          {/* MegaMenu Trigger */}
          <div className="md:hidden">
            <MegaMenu />
          </div>
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
