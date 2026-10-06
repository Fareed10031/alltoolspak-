import React, { useState, useMemo } from 'react';
import { Search, Sparkles, ShieldCheck, Zap, Lock, ArrowRight } from 'lucide-react';
import { TOOLS, COLORS, SITE_NAME } from '@/lib/config';
import { ToolCard } from '@/components/ToolCard';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onSelectTool, onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'Finance', 'PDF Tool', 'Neural Vision', 'Convert', 'Generator', 'Security', 'Builder', 'Calc', 'EU OSS Ready'];

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === 'All' || tool.tag === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* HERO SECTION */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/60 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>14-in-1 Free Client-Side Productivity Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-5">
          14-in-1 Free Tools - Live Currency & Gold
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Fast, private, and zero-paywall utilities for documents, images, security, and finances.
          Everything processes 100% offline in your browser.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href="#tools-grid"
            className="h-12 sm:h-13 px-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <span>Explore All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => onSelectTool('pdf-merge')}
            className="h-12 sm:h-13 px-7 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Try PDF Merger
          </button>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search free tools (e.g. Paycheck, PDF, VAT, QR, Resume)..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base text-slate-900 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FILTER TAGS */}
      <section id="tools-grid" className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 scroll-mt-24">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTag === tag
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* TOOLS GRID */}
      <section key={`tools-grid-${TOOLS.length}`} className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <div key={`tools-count-${TOOLS.length}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <ToolCard
                key={tool.slug}
                tool={tool}
                color={color}
                onClick={() => onSelectTool(tool.slug)}
              />
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-sm">No tools found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTag('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-bold cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* VALUE HIGHLIGHTS */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-4 sm:px-6 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Zero Cloud Uploads
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your documents, files, and personal data never leave your computer or phone. Processing occurs entirely in your browser sandbox.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Real Instant Files
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Download genuine vector PDFs, high-resolution PNG images, and clean TXT documents generated dynamically with zero server lag.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                100% Free Forever
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No credit cards, no login walls, and no hidden subscriptions. High-utility software designed for creators and students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 400+ WORDS SEO EDITORIAL ARTICLE (Mandatory for AdSense Approval) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20 text-slate-700 dark:text-slate-300">
        <div className="p-8 sm:p-12 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Comprehensive Architectural Review
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Why AllToolsPK is Built for Modern Productivity
            </h2>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              In contemporary digital workplaces, users perform countless micro-tasks every day: merging contract PDFs, converting high-resolution photo archives into compact documents, producing clean QR codes for marketing campaigns, generating cryptographically random passwords, calculating European Union OSS VAT for Amazon sales, and preparing ATS-optimized resumes. Traditionally, users are forced to juggle multiple disjointed websites that bombard them with intrusive interstitial advertisements, compulsory account registrations, or restrictive daily file quotas.
            </p>

            <p>
              <strong>{SITE_NAME} (alltoolspk.com)</strong> was engineered to establish a new gold standard in digital utility platforms. Inspired by the world&apos;s most respected workflow applications—including Smallpdf, iLovePDF, TinyWow, and Canva—AllToolsPK unifies these essential operations within a single, beautifully organized, and 100% free web portal. Most importantly, AllToolsPK enforces an uncompromising <strong>client-side architecture</strong>.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
              The Architecture of Client-Side Web Utilities
            </h3>

            <p>
              Unlike legacy online utility services that require you to transmit sensitive personal identification, corporate tax spreadsheets, or private photographs to remote cloud servers for conversion, every tool on AllToolsPK functions locally. Leveraging modern web technologies such as HTML5 Canvas, WebAssembly (Wasm), Web Workers, and client-side vector synthesis (jsPDF), your device executes the entire computation inside its private browser sandbox.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Strict GDPR &amp; CCPA Compliance:</strong> Under Article 17 of the General Data Protection Regulation (GDPR), data minimization is essential. Because AllToolsPK never receives, ingests, or stores your files on our infrastructure, data breaches and unauthorized cloud indexing are technically impossible.
              </li>
              <li>
                <strong>Instantaneous Execution Speed:</strong> Cloud converters suffer from file upload delays, remote processing queues, and download waits. By processing everything locally in device RAM, AllToolsPK compiles PDFs and renders images instantly.
              </li>
              <li>
                <strong>Zero Watermarks &amp; High-Fidelity Output:</strong> Every file generated—whether a multi-page PDF invoice, a transparent PNG background cutout, or an ATS resume—is output in full fidelity without degrading quality or applying promotional stamps.
              </li>
              <li>
                <strong>Future-Proof Modular Design:</strong> The platform is designed to scale dynamically. New document, security, and calculation modules integrate seamlessly with automatic logo generation, consistent responsive layouts, and universal accessibility.
              </li>
            </ul>

            <p>
              Whether you are an independent e-commerce merchant auditing Amazon VAT rates, a jobseeker crafting an ATS-compliant resume, or a developer generating QR codes, AllToolsPK provides the privacy, speed, and reliability you need to accomplish your work effortlessly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
