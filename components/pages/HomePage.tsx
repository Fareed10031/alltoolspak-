import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Youtube,
  Calculator,
  Wand2,
  FileEdit,
  ScanEye,
  FileBadge,
  Layers,
  ChevronRight,
  Star,
  ExternalLink,
} from 'lucide-react';
import { getAutoLogo } from '@/lib/autoLogoSystem';
import { AdSlot } from '@/components/AdSlot';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onSelectTool, onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const toolsList = [
    {
      id: 'pdf-tools',
      name: 'PDF Suite & Merger',
      category: 'PDF & Documents',
      badge: 'Client-Side',
      description:
        'Merge multiple PDF documents into one, compress PDF file size, and extract text without uploading to any remote servers.',
    },
    {
      id: 'image-compress',
      name: 'Image Compressor & Resizer',
      category: 'Images & Media',
      badge: 'Zero Uploads',
      description:
        'Compress JPG, PNG, and WebP images up to 85% with client-side canvas processing, custom dimensions, and before/after previews.',
    },
    {
      id: 'youtube-thumb',
      name: 'YouTube Thumbnail Grabber',
      category: 'Images & Media',
      badge: '1080p Ultra HD',
      description:
        'Download MaxRes (1080p), HQ, and SD video thumbnails directly from Google CDN with instant one-click downloading.',
    },
    {
      id: 'amazon-vat',
      name: 'Amazon EU VAT Calculator',
      category: 'E-Commerce & Finance',
      badge: 'EU OSS Ready',
      description:
        'Calculate destination EU VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon sellers.',
    },
    {
      id: 'bg-remover',
      name: 'AI Background Remover',
      category: 'AI & Creative',
      badge: 'Neural Vision',
      description:
        'Automatic background removal powered by client-side neural vision. Export crisp transparent cutouts with zero watermarks.',
    },
    {
      id: 'paraphraser',
      name: 'AI Text Paraphraser',
      category: 'AI & Writing',
      badge: 'Contextual AI',
      description:
        'Rewrite sentences, articles, and essays in Standard, Fluency, and Humanize modes with instant 1-click clipboard copying.',
    },
    {
      id: 'detector',
      name: 'AI Content Detector',
      category: 'AI & Writing',
      badge: 'Perplexity Gauge',
      description:
        'Inspect text for machine generation using perplexity analysis, sentence burstiness heatmaps, and statistical metrics.',
    },
    {
      id: 'resume-builder',
      name: 'ATS Resume Builder',
      category: 'Career & Productive',
      badge: '95+ ATS Score',
      description:
        'Single-column high-scoring ATS resume generator with Google XYZ formula action verbs and instant vector PDF export.',
    },
    {
      id: 'humanize-ai-text',
      name: 'Humanize AI Text',
      category: 'AI & Writing',
      badge: 'Undetectable',
      description:
        'Transform robotic AI content from ChatGPT and Claude into authentic, conversational human text that flows effortlessly.',
    },
  ];

  const categories = ['All', 'PDF & Documents', 'Images & Media', 'AI & Writing', 'E-Commerce & Finance', 'Career & Productive'];

  const filteredTools = useMemo(() => {
    return toolsList.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. HERO SECTION (Smallpdf style: "We make tools easy.") */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-[#0055FF] dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/60 mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Top 4 Online Productivity Suite • 100% Free Client-Side</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
          We make tools easy.
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          All the digital utilities you need to merge PDFs, compress images, generate ATS resumes,
          calculate EU VAT, and humanize AI writing—right in your browser with zero paywalls.
        </p>

        {/* 2 Buttons: Solid Blue + Outline */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => onSelectTool('pdf-tools')}
            className="h-13 px-8 rounded-2xl bg-[#0055FF] hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#tools-grid"
            className="h-13 px-8 rounded-2xl border-2 border-[#0055FF] text-[#0055FF] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <span>Explore All Tools</span>
          </a>
        </div>

        {/* Search Bar: Centered (TinyWow style) */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 9+ free tools..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-[#0055FF] text-sm sm:text-base text-slate-900 dark:text-white"
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

      {/* Ad Slot #1 */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <AdSlot label="Homepage Top Ad" />
      </div>

      {/* 2. CATEGORY PILLS FILTER */}
      <section id="tools-grid" className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 scroll-mt-24">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. TOOLS GRID (Top 4 websites card design with Auto Logo System) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => {
            const logo = getAutoLogo(tool.name, idx);
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Auto-Logo Gradient Circle and Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${logo.color.gradient} flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform`}
                    >
                      {tool.name[0]}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0055FF] transition-colors mb-2">
                    {tool.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0055FF] dark:text-blue-400">
                  <span>Use Tool Free</span>
                  <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-sm">No tools matched your search query "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#0055FF] text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. VALUE PROPOSITION BAR (Smallpdf + Canva style) */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-4 sm:px-6 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0055FF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Zero Cloud Uploads
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your documents, PDF files, and photos never touch an external server. Everything processes strictly in your local device memory.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Blazing Fast Wasm Speed
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Powered by WebAssembly, Web Workers, and HTML5 Canvas for instantaneous conversion without waiting queues or file limits.
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
                No credit cards, no watermarks, no hidden registration walls. Built for independent professionals, students, and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 350+ WORDS SEO ARTICLE: "Why AllToolsPK is Best for Productivity?" (Mandatory for AdSense approval) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20 text-slate-700 dark:text-slate-300">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0055FF]">
              Comprehensive Editorial Review &amp; Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Why AllToolsPK is Best for Productivity?
            </h2>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              In today's fast-paced digital work environment, professionals, freelancers, and students frequently require quick, reliable tools to manage daily document and media workflows. Whether you need to combine multi-page contracts into a unified PDF, compress massive high-resolution imagery before web publication, calculate complex destination EU VAT for Amazon e-commerce stores, or optimize an executive resume for Applicant Tracking Systems (ATS), existing online utilities often impose aggressive paywalls, restrictive daily quotas, or mandatory account registrations.
            </p>

            <p>
              <strong>AllToolsPK</strong> was architected from the ground up to solve these exact friction points by delivering a complete, modern utility suite inspired by the world's top digital platforms—including Smallpdf, iLovePDF, TinyWow, and Canva—while enforcing a strict <strong>100% client-side privacy paradigm</strong>. Unlike conventional services that demand you upload sensitive invoices, confidential business records, or personal portrait photographs to third-party cloud servers, every single algorithm on AllToolsPK executes entirely inside your browser's local sandbox memory via WebAssembly and HTML5 Canvas technologies.
            </p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
              Key Architectural Advantages:
            </h3>

            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Uncompromised Data Confidentiality:</strong> Under the European Union General Data Protection Regulation (GDPR Article 17) and the California Consumer Privacy Act (CCPA), data minimization is paramount. Because your files are parsed and compiled in local device RAM, your confidential information never transmits across public networks, eliminating data breach risks.
              </li>
              <li>
                <strong>Zero Bandwidth Bottlenecks:</strong> Traditional cloud converters require uploading 50MB files and waiting for server render queues. Client-side compilation eliminates upload and download transfer delays, giving you instant results even on constrained mobile connections.
              </li>
              <li>
                <strong>Standardized Quality &amp; Precision:</strong> From vector-crisp PDF font embedding to accurate destination EU OSS VAT tax tables and neural image background cutouts, every tool conforms to strict professional industry standards without adding watermarks or downgrading quality.
              </li>
              <li>
                <strong>Always Free &amp; Transparent:</strong> We believe essential productivity tools should remain accessible to everyone without deceptive free-trial countdowns, recurring subscription credit cards, or locked download buttons.
              </li>
            </ul>

            <p>
              By combining high-performance browser computing with an intuitive, clutter-free user interface, AllToolsPK sets a new benchmark for accessible web utilities. Bookmark AllToolsPK as your everyday digital workspace and enjoy seamless, private, and unlimited productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Slot #2 */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <AdSlot label="Homepage Bottom Ad" />
      </div>

      {/* 6. FOUNDER & E-E-A-T TRUST BADGE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-20">
        <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
              FU
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                Engineered by Fareed Ullah
              </p>
              <p className="text-[11px] text-slate-500">
                Senior Web Systems Architect &bull; Peshawar, Pakistan &bull; Dedicated to Open Web Utilities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('about')}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-blue-400 transition-colors cursor-pointer"
            >
              About Founder
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-3.5 py-1.5 rounded-lg bg-[#0055FF] text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
