import React, { useState, useEffect } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Youtube,
  Calculator,
  Wand2,
  FileEdit,
  ScanEye,
  FileBadge,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { safeStorage, safePrefersDark } from '@/lib/storage';

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
];

export interface HeaderProps {
  currentPath?: string;
  activeTool?: string;
  onNavigate: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function Header({
  currentPath,
  activeTool,
  onNavigate,
  onSelectTool,
  isDark: propIsDark,
  onToggleTheme: propToggleTheme,
}: HeaderProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const effectivePath = currentPath || (activeTool ? `/tools/${activeTool}` : '/');
  const handleSelectTool = onSelectTool || ((toolId: string) => onNavigate(`/tools/${toolId}`));

  useEffect(() => {
    // initialize theme
    const savedTheme = safeStorage.getItem('theme') as 'light' | 'dark' | null;
    const isDark = savedTheme === 'dark' || (!savedTheme && safePrefersDark());
    if (isDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (propToggleTheme) {
      propToggleTheme();
      return;
    }
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    safeStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLinkClick = (path: string) => {
    setToolsOpen(false);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  AllToolsPak<span className="text-emerald-600 dark:text-emerald-400">.pk</span>
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded">
                  100% FREE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden xs:block font-medium">
                8-in-1 Client-Side Utility Suite
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleLinkClick('/')}
            className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              currentPath === '/'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Home
          </button>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                effectivePath.startsWith('/tools')
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 grid gap-1">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    All 8 Free Tools
                  </div>
                  {TOOLS_CONFIG.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.slug}
                        onClick={() => handleLinkClick(`/tools/${t.slug}`)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-left cursor-pointer transition-all ${
                          effectivePath === `/tools/${t.slug}`
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${t.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold truncate">{t.title}</span>
                            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {t.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{t.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('/about')}
            className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              effectivePath === '/about'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            About & E-E-A-T
          </button>

          <button
            onClick={() => handleLinkClick('/privacy')}
            className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              effectivePath === '/privacy'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Privacy
          </button>

          <button
            onClick={() => handleLinkClick('/contact')}
            className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
              effectivePath === '/contact'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Client-Side Privacy Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>RAM-Only / No Uploads</span>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer text-slate-700 dark:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Home
            </button>
            <div className="px-3 pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              8 Free Online Tools
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
              {TOOLS_CONFIG.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.slug}
                    onClick={() => handleLinkClick(`/tools/${t.slug}`)}
                    className="flex items-center gap-2.5 p-2 rounded-lg text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 flex flex-col gap-1">
              <button
                onClick={() => handleLinkClick('/about')}
                className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                About & E-E-A-T
              </button>
              <button
                onClick={() => handleLinkClick('/privacy')}
                className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Privacy Policy (GDPR / CCPA)
              </button>
              <button
                onClick={() => handleLinkClick('/terms')}
                className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleLinkClick('/disclaimer')}
                className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Disclaimer
              </button>
              <button
                onClick={() => handleLinkClick('/cookies')}
                className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => handleLinkClick('/contact')}
                className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
