import React from 'react';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Terms of Service</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement &bull; Effective Sept 24, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Please review the binding conditions governing your access to AllToolsPak.pk utilities.
        </p>
      </div>

      <AdSlot label="Terms Top Ad" />

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By using or browsing AllToolsPak.pk, you explicitly agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must discontinue your use of our utilities immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Permitted &amp; Acceptable Use</h2>
          <p>
            AllToolsPak.pk grants you a revocable, non-exclusive, non-transferable, free license to use our 8 online tools for personal, educational, research, and legitimate commercial business purposes. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>Attempt to reverse engineer, disassemble, or interfere with security sandboxes.</li>
            <li>Launch automated scraping bots, volumetric DDoS attacks, or programmatic denial-of-service loops.</li>
            <li>Use the tools to process unlawful, defamatory, infringing, or malicious content.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Intellectual Property</h2>
          <p>
            You retain 100% full ownership, copyright, and intellectual property rights in and to all PDF documents, images, text, and financial spreadsheets that you process using our platform. AllToolsPak.pk claims no ownership or license over your personal or enterprise documents.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Disclaimer of Warranties</h2>
          <p>
            AllToolsPak.pk is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without representations or warranties of any kind, whether express, statutory, or implied. While our algorithms are tested extensively, we do not warrant that tools will be uninterrupted, error-free, or entirely accurate.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Peshawar, Pakistan.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Contact Information</h2>
          <p>
            For questions, legal notices, or inquiries regarding these Terms of Service, please contact:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1 text-xs">
            <p className="font-bold text-slate-900 dark:text-white">AllToolsPak.pk</p>
            <p>Fareed Ullah</p>
            <p>Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
            <p>
              Email:{' '}
              <a href="mailto:fareedk1266@gmail.com" className="text-emerald-600 underline font-semibold">
                fareedk1266@gmail.com
              </a>
            </p>
            <p>
              Phone / WhatsApp:{' '}
              <a href="https://wa.me/923404526741" className="text-emerald-600 underline font-semibold" target="_blank" rel="noreferrer noopener">
                +92 340 4526741
              </a>
            </p>
          </div>
        </section>
      </div>

      <AdSlot label="Terms Bottom Ad" />
    </div>
  );
}
