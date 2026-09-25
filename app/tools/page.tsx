import React from 'react';
import Link from 'next/link';
import { tools } from '@/data/tools';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ToolsIndexPage() {
  // Filter unique tools by component/primary id
  const primaryTools = [
    { id: 'pdf-tools', name: 'PDF Suite & Merger', desc: 'Merge, compress, and extract plain text from multiple PDF documents 100% locally.' },
    { id: 'image-compressor', name: 'Image Compressor & Resizer', desc: 'Compress JPG, PNG, and WebP images up to 85% with client-side canvas processing.' },
    { id: 'youtube-thumb', name: 'YouTube Thumbnail Grabber', desc: 'Extract MaxRes 1080p, HQ, and SD video thumbnails directly from Google CDN.' },
    { id: 'amazon-vat', name: 'Amazon EU VAT Calculator', desc: 'Calculate destination VAT rates, net amounts, and generate bulk invoices for EU sellers.' },
    { id: 'bg-remover', name: 'AI Background Remover', desc: 'Instant neural network background cutout with transparent PNG export.' },
    { id: 'paraphraser', name: 'AI Text Paraphraser', desc: 'Contextual semantic text rewriter with Standard, Fluency, and Humanize modes.' },
    { id: 'detector', name: 'AI Content Detector', desc: 'Detect machine-generated content with perplexity, burstiness, and sentence heatmaps.' },
    { id: 'resume-builder', name: 'ATS Resume Builder', desc: 'Single-column high-scoring ATS resume generator with Google XYZ formula optimizer.' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>8 Production-Grade Utilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          All Free Online Tools
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Explore our suite of 100% free, client-side web tools. Zero file uploads, no account required, completely private.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {primaryTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id.toLowerCase()}`}
            className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                {tool.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {tool.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Open Tool</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
