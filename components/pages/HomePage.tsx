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
  Users,
  Terminal,
  Cpu,
  Globe,
  Award,
  Sparkles,
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    {
      id: 'humanize-ai-text',
      title: 'Humanize AI Text - Undetectable AI Rewriter Free',
      badge: 'NEW VIRAL',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: Sparkles,
      iconColor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
      description: 'Convert robotic AI writing into natural, fluent, human-like content. Improve readability and flow. 100% Free, Unlimited, No Login Required.',
    },
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>9-in-1 FREE Web Tools &bull; 100% Client-Side Privacy</span>
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
            <span>Explore All 9 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const el = document.getElementById('founder-box');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm h-12 px-6 cursor-pointer border-slate-300 dark:border-slate-700"
          >
            Meet Founder (Fareed Ullah)
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
            const toolSlug = t.id.toLowerCase();
            return (
              <a
                key={t.id}
                href={`/tools/${toolSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTool(toolSlug);
                }}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between block no-underline"
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
              </a>
            );
          })}
        </div>
      </section>

      {/* Ad Slot (Mid) */}
      <AdSlot label="In-Feed Responsive Display" />

      {/* NEW: Why Choose Us Section */}
      <section className="space-y-8 py-6">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
            <Award className="w-3.5 h-3.5" />
            <span>The AllToolsPak Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Why Choose AllToolsPak.pk?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Most online utility websites trick users with free trials, require invasive logins, or secretly harvest private tax spreadsheets and photos on cloud servers. Here is how AllToolsPak is fundamentally different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your PDFs, photos, and sales CSVs are processed solely in your computer&apos;s volatile RAM memory using WebAssembly. Not a single byte is uploaded to our servers or saved anywhere.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Zero Paywalls, Forever Free
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No credit card forms, no artificial daily conversion limits, and no &quot;upgrade to premium&quot; traps. Every single feature is completely unrestricted for all users worldwide.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Local Hardware Acceleration
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculations and image compressions run directly on your browser using HTML5 Canvas, Web Workers, and SIMD instructions, delivering instant results without internet lag.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tailored for Global Commerce
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered specifically for Pakistani freelancers, Amazon EU FBA sellers, and global digital creators needing compliant invoice archiving and ATS-vetted resume formats.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Strict GDPR &amp; CCPA Compliance
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We uphold GDPR Article 17 (Right to Erasure) standards. Because all data remains local, you have full custody of your digital footprint from start to finish.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Deceptive Pop-Ups
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Downloads save directly to your filesystem as authentic Blobs and vector PDFs without redirect loops, spammy extension installers, or bait-and-switch countdown clocks.
            </p>
          </div>
        </div>
      </section>

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

      {/* NEW: Dedicated Founder Fareed Ullah Box */}
      <section id="founder-box" className="scroll-mt-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-emerald-500/30">
                  FU
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold" title="Verified Founder">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Fareed Ullah
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Founder &amp; Principal Engineer
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Peshawar, Khyber Pakhtunkhwa, Pakistan</span>
                </div>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  contact@alltoolspak.pk &bull; fareedk1266@gmail.com
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="mailto:contact@alltoolspak.pk"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Founder</span>
              </a>
              <a
                href="https://wa.me/923404526741"
                target="_blank"
                rel="noreferrer noopener"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+92 340 4526741</span>
              </a>
              <a
                href="https://linkedin.com/in/fareed-ullah-dev"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                aria-label="Fareed Ullah LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/fareed-ullah-dev"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                aria-label="Fareed Ullah GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-2 md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Founder&apos;s Mission Statement
              </h4>
              <p>
                &quot;I created <strong>AllToolsPak.pk</strong> with a straightforward conviction: digital utilities essential for everyday work—like merging legal PDFs, calculating Amazon VAT, extracting YouTube graphics, compressing images, and building resumes—should be <strong>100% free, private, and accessible to everyone without paywalls or subscriptions</strong>.
              </p>
              <p>
                Operating out of Peshawar, Pakistan, I watched students, Upwork freelancers, and Amazon FBA sellers waste hard-earned income on deceptive software tools that lock basic export buttons behind expensive recurring paywalls. AllToolsPak eliminates that exploitation by moving all compute workloads directly to your device browser. No data ever leaves your device, and no payment will ever be demanded.&quot;
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                E-E-A-T Publisher Credentials
              </h5>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full-Stack Web &amp; Systems Engineer</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WebAssembly &amp; Client-Side Security</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>GDPR Art. 17 Compliant Architect</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Based in Peshawar, Khyber Pakhtunkhwa</span>
                </li>
              </ul>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('about')}
                className="w-full text-[11px] h-8 mt-1 border-slate-700 text-slate-300 hover:text-white"
              >
                Read Complete E-E-A-T Bio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Users Across Pakistan (Compliant - No Fake Reviews) */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Trusted by Users Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Join thousands of freelancers, students, and sellers using AllToolsPak.pk tools daily. All processing is done 100% in your browser for privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              100% Private - No Uploads
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your files, spreadsheets, and images are processed strictly in your local device RAM. Zero data is ever sent to or stored on external servers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Free &amp; Fast - No Login
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero subscriptions, no credit card forms, and no sign-up gates. Instant WebAssembly compute powered directly by your browser engine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Made for Pakistan
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tailored specifically for Pakistani creators, students, remote workers, and Amazon sellers needing dependable, unrestricted utility software.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Slot (Bottom) */}
      <AdSlot label="Homepage Bottom Sticky Anchor" />
    </div>
  );
}
