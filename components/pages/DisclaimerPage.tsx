import React from 'react';
import { AlertTriangle, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';

export function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Disclaimer &amp; Tax Notice</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Statutory Tax &amp; AI Advisory Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Disclaimer &amp; Financial Notice
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: September 24, 2026 &bull; AllToolsPak.pk
        </p>
      </div>

      <AdSlot label="Disclaimer Top Ad" />

      {/* Critical Red Callout Box */}
      <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/80 mb-8 space-y-3">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-base">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Not Tax, Accounting, or Legal Advice</span>
        </div>
        <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed font-medium">
          The information, formulas, calculations, and software tools provided on AllToolsPak.pk (including but not limited to the Amazon EU VAT Calculator) are intended strictly for educational, informational, and computational convenience purposes. <strong>They do not constitute formal tax, legal, or accounting advice.</strong>
        </p>
        <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
          European Union cross-border Value Added Tax (VAT) regulations, distance selling thresholds, and One-Stop Shop (OSS) filings must be officially verified at{' '}
          <a
            href="https://ec.europa.eu/taxation_customs/vies/"
            target="_blank"
            rel="noreferrer noopener"
            className="underline font-bold inline-flex items-center gap-1 hover:text-red-900 dark:hover:text-white"
          >
            <span>ec.europa.eu/taxation</span>
            <ExternalLink className="w-3 h-3" />
          </a>{' '}
          or through a certified European chartered tax advisor.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Amazon EU VAT Calculations &amp; Currency Conversion
          </h2>
          <p>
            While our engine applies standard statutory VAT rates across destination EU member states (e.g. Germany 19%, France 20%, Italy 22%, Spain 21%), specific product categories may qualify for reduced or super-reduced rates (such as books, children&apos;s apparel, or medical devices). AllToolsPak.pk assumes standard rates unless customized. You remain exclusively responsible for the legal accuracy of your tax returns submitted to fiscal authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Artificial Intelligence (AI) Content &amp; Detection Output
          </h2>
          <p>
            Our AI Paraphraser, AI Content Detector, and ATS Resume Builder utilize probabilistic language modeling heuristics. AI-generated text may contain inaccuracies, hallucinations, or stylistic nuances that require human review. Detection probability percentages represent mathematical likelihood based on perplexity and burstiness; they should never be treated as definitive or legal proof of authorship.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall AllToolsPak.pk, its founder Fareed Ullah, or its affiliates be held liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from the use or inability to use our tools, including financial losses, tax penalties, audit adjustments, or missed employment opportunities.
          </p>
        </section>
      </div>

      <AdSlot label="Disclaimer Bottom Ad" />
    </div>
  );
}
