'use client';

import React from 'react';
import Link from 'next/link';
import MegaMenu from '@/components/MegaMenu';

export interface HeaderProps {
  currentPath?: string;
  activeTool?: string;
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-[68px] items-center justify-between px-4 sm:px-6">
        {/* Left = AllToolsPK Logo (colorful 4 squares + text) */}
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

        {/* Right = ONE Explore Tools blue button + ONE MegaMenu component only */}
        <div className="flex items-center gap-3">
          <Link
            href="/#tools-grid"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            Explore Tools
          </Link>
          <MegaMenu />
        </div>
      </div>
    </header>
  );
}

export { Header };
