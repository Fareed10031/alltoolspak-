import React from 'react';
import {
  UserCheck,
  Shield,
  Linkedin,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Award,
  Terminal,
  Mail,
  Phone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">About Fareed Ullah &amp; E-E-A-T</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
          <Award className="w-3.5 h-3.5" />
          <span>E-E-A-T Verified Publisher &bull; Sept 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About Fareed Ullah &amp; AllToolsPak.pk
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Engineered in Peshawar, Pakistan with an uncompromising commitment to client-side data privacy and zero paywalls.
        </p>
      </div>

      <AdSlot label="About Top Ad" />

      {/* Author Card */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-800 mb-10 overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Photo Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-1 shadow-xl">
                <div className="w-full h-full rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <Terminal className="w-10 h-10 text-emerald-400 mb-1" />
                  <span className="text-[10px] font-mono tracking-widest text-emerald-300">FU_DEV</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-600 text-white shadow-md">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Author Profile Information */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Fareed Ullah
                </h2>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Owner &amp; Lead Systems Engineer of AllToolsPak.pk
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Peshawar, Khyber Pakhtunkhwa, Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>3+ Years Building Production Web Utilities</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                Fareed Ullah is a software engineer and web systems architect based in Peshawar, Pakistan. Motivated by the frustrating paywalls, upload queues, and privacy violations common across online tool websites, Fareed engineered <strong>AllToolsPak.pk</strong> with a clear purpose: to deliver an uncompromising suite of 8 essential digital utilities—including PDF merge/compression, image optimization, YouTube thumbnail extraction, EU Amazon VAT calculation, AI background removal, text paraphrasing, AI content detection, and ATS resume building—that operate <strong>100% on the client side</strong>.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <p className="font-bold text-slate-900 dark:text-white">
                  The Purpose of AllToolsPak.pk:
                </p>
                <p className="leading-relaxed">
                  Our mission is to democratize high-grade digital utilities for students, remote freelancers, accountants, and e-commerce entrepreneurs in Pakistan and worldwide. Files and documents never leave your device RAM, guaranteeing zero data harvesting, no mandatory user accounts, and zero subscription fees.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <a
                  href="mailto:contact@alltoolspak.pk"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>contact@alltoolspak.pk</span>
                </a>

                <a
                  href="mailto:fareedk1266@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>fareedk1266@gmail.com</span>
                </a>

                <a
                  href="https://wa.me/923404526741"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Direct WhatsApp with Fareed Ullah"
                >
                  <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
                  </svg>
                  <span>+92 340 4526741 (WhatsApp)</span>
                </a>

                <a
                  href="https://linkedin.com/in/fareed-ullah-dev"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formal E-E-A-T Statement */}
      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            Official Google Search E-E-A-T Quality Commitment
          </h2>
          <p>
            At AllToolsPak.pk, our operational philosophy strictly adheres to Google Search Quality Evaluator Guidelines for <strong>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">1. Direct Practical Experience</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Every utility on AllToolsPak is developed and maintained by active practitioners who solve real-world e-commerce, tax filing, and multimedia compression workflows on a daily basis.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">2. Engineering Expertise</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Instead of wrapping vulnerable third-party APIs, our algorithms compile directly to WebAssembly and Canvas byte arrays, ensuring deterministically accurate calculations and zero memory leaks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">3. Verified Authoritativeness</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                All tax formulas, VAT thresholds, and ATS formatting standards cite statutory documentation from the European Commission (ec.europa.eu) and enterprise ATS vendor specifications.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">4. Absolute Trustworthiness</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your data is never monetized, saved to remote databases, or shared with data brokers. Processing executes inside your local browser memory space under full client control.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdSlot label="About Bottom Ad" />
    </div>
  );
}
