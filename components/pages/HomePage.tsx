import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Youtube,
  Calculator,
  Wand2,
  FileEdit,
  ScanEye,
  FileBadge,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onSelectTool, onNavigate }: HomePageProps) {
  const tools = [
    {
      id: 'pdf-tools',
      title: 'PDF Suite',
      badge: 'Client-Side',
      badgeColor: 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-900',
      icon: FileText,
      iconColor: 'text-red-500 bg-red-50 dark:bg-red-950/40',
      description: 'Merge multiple PDF files, compress file size with visual quality slider, or extract plain text instantly.',
    },
    {
      id: 'image-compress',
      title: 'Image Compressor & Resizer',
      badge: 'Zero Uploads',
      badgeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
      icon: ImageIcon,
      iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
      description: 'Compress JPG, PNG & WEBP under 10MB using HTML5 Canvas. Includes Before/After split slider & standard dimension presets.',
    },
    {
      id: 'youtube-thumb',
      title: 'YouTube Thumbnail Grabber',
      badge: '1080p Ultra HD',
      badgeColor: 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-900',
      icon: Youtube,
      iconColor: 'text-red-600 bg-red-50 dark:bg-red-950/40',
      description: 'Extract MaxRes (1080p), HQ, SD, and MQ thumbnails directly from Google CDN with 1-click Blob downloading.',
    },
    {
      id: 'amazon-vat',
      title: 'Amazon EU VAT Calculator',
      badge: 'OSS Ready',
      badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
      icon: Calculator,
      iconColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
      description: 'Calculate net amounts and destination VAT from CSV order data. Export single invoices, bulk ZIP archives, and Excel sheets.',
    },
    {
      id: 'bg-remover',
      title: 'AI Background Remover',
      badge: 'Neural Vision',
      badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
      icon: Wand2,
      iconColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40',
      description: 'Remove photo backgrounds locally with sub-pixel alpha matting. Download transparent PNGs or apply custom studio colors.',
    },
    {
      id: 'paraphraser',
      title: 'AI Text Paraphraser',
      badge: 'Semantic Rewrite',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
      icon: FileEdit,
      iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
      description: 'Rewrite paragraphs across Standard, Fluency, and Humanize modes with a 50-5,000 character counter and 1-click copy.',
    },
    {
      id: 'detector',
      title: 'AI Content Detector',
      badge: 'Perplexity Gauge',
      badgeColor: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900',
      icon: ScanEye,
      iconColor: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40',
      description: 'Evaluate perplexity and burstiness. Highlights robotic sentences in red and displays an interactive circular AI probability gauge.',
    },
    {
      id: 'resume-builder',
      title: 'ATS Resume Builder',
      badge: '95+ ATS Score',
      badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900',
      icon: FileBadge,
      iconColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40',
      description: 'Single-column professional resume layout with AI action verb optimizer and vector PDF generation via jsPDF.',
    },
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>8-in-1 FREE Web Tools &bull; 100% Client-Side Privacy</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Empower Your Workflow with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent">
            Private, Production-Grade
          </span>{' '}
          Tools
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          High-performance utility software for creators, e-commerce sellers, students, and engineers. Zero paywalls, no mandatory sign-ups, and RAM-only document processing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="emerald"
            size="lg"
            onClick={() => {
              const el = document.getElementById('tools-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-bold text-sm h-12 px-7 cursor-pointer shadow-lg shadow-emerald-600/20 gap-2"
          >
            <span>Explore All 8 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('about')}
            className="text-sm h-12 px-6 cursor-pointer border-slate-300 dark:border-slate-700"
          >
            Meet the Author (Fareed Ullah)
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>RAM-Only Storage</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Instant WebAssembly</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>GDPR Art. 17 Compliant</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>100% Free Forever</span>
          </div>
        </div>
      </section>

      {/* Ad Slot (Top) */}
      <AdSlot label="Homepage Premium Leaderboard" />

      {/* 8-in-1 Tools Grid */}
      <section id="tools-grid" className="space-y-6 scroll-mt-20">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Complete Suite of Web Utilities
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click any tool below to launch its client-side workspace immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.badgeColor}`}>
                      {t.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {t.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ad Slot (Mid) */}
      <AdSlot label="In-Feed Responsive Display" />

      {/* How It Works Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Privacy By Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How Client-Side Computing Protects You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Unlike legacy software that uploads private files to third-party cloud servers, AllToolsPak executes operations inside your local sandbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant Local Load
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you drop a file or paste text, your browser reads the data using HTML5 FileReader and WebAssembly memory heaps without network transmission.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Deterministic Processing
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculations, compression, and AI syntheses execute with hardware acceleration directly on your CPU/GPU, ensuring zero bandwidth delay.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Immediate Memory Purge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upon downloading your finished PDF, ZIP, or PNG, memory buffers are garbage-collected and auto-deleted within 5 minutes under GDPR Art. 17.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Trusted by Creators &amp; Professionals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Empowering Pakistani and international businesses with free, dependable web utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;The Amazon EU VAT calculator saved our Lahore e-commerce agency dozens of manual reconciliation hours. Generating ZIP archives of all EU invoices in one click is pure genius.&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Zeeshan Malik</p>
              <p className="text-[11px] text-slate-400">Amazon FBA Seller, Lahore</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;I use the YouTube Thumbnail extractor daily for design research. It resolves full 1080p graphics instantly and downloads directly without shady redirect pop-ups.&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Ayesha Rehman</p>
              <p className="text-[11px] text-slate-400">Digital Content Creator, Islamabad</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;The ATS Resume Builder created an immaculate single-column vector PDF that passed every corporate hiring portal without glitching. Got interview calls within a week!&quot;
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Bilal Tariq</p>
              <p className="text-[11px] text-slate-400">Software Engineer, Karachi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Byline / E-E-A-T Callout */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-emerald-900/10 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Engineered by Fareed Ullah &bull; Peshawar, Pakistan
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Committed to building accessible, ethical digital utilities for creators worldwide.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('about')}
          className="text-xs cursor-pointer shrink-0"
        >
          Read Publisher E-E-A-T Statement
        </Button>
      </section>

      {/* Ad Slot (Bottom) */}
      <AdSlot label="Homepage Bottom Sticky Anchor" />
    </div>
  );
}
