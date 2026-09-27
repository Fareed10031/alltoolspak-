import React from 'react';
import { AlertTriangle, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-blue-600">Home</a>
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
          Last Updated: September 2026 &bull; alltoolspk.com
        </p>
      </div>

      {/* Critical Red Callout Box */}
      <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/80 mb-8 space-y-3">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-base">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Not Tax, Accounting, or Legal Advice</span>
        </div>
        <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed font-medium">
          The information, formulas, calculations, and software tools provided on alltoolspk.com (including but not limited to the Amazon EU VAT Calculator) are intended strictly for educational, informational, and computational convenience purposes. <strong>They do not constitute formal tax, legal, or accounting advice.</strong>
        </p>
        <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
          Cross-border e-commerce tax regulations in the European Union (One-Stop Shop OSS) and third-party countries are subject to periodic legislative amendments and administrative interpretations. Always consult with a certified tax consultant, chartered accountant, or legal counsel before submitting statutory VAT returns.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. No Professional-Client Relationship
          </h2>
          <p>
            Your access to or transmission of information through alltoolspk.com does not establish an attorney-client, accountant-client, or fiduciary relationship between you and alltoolspk.com or its operators.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Heuristic and Probabilistic Processing
          </h2>
          <p>
            Our utilities utilize deterministic and probabilistic heuristics. Output files, calculations, and conversions represent mathematical processing based on input data; they should be reviewed and verified by qualified professionals before formal submission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall alltoolspk.com, its founder Fareed Ullah, or its affiliates be held liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from the use or inability to use our tools, including financial losses, tax penalties, audit adjustments, or missed employment opportunities.
          </p>
        </section>
      </div>
    </div>
  );
}

export default DisclaimerPage;
