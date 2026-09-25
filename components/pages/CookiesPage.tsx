import React from 'react';
import { Cookie, Shield, Check, Info } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';

export function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Cookie Policy</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
          <Cookie className="w-3.5 h-3.5" />
          <span>Transparency Audit &bull; Sept 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cookie Policy &amp; Audit Inventory
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Detailed transparency table detailing all active and optional cookie categories on AllToolsPak.pk.
        </p>
      </div>

      <AdSlot label="Cookies Top Ad" />

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          AllToolsPak.pk adheres to the principle of data minimization. We do not store session cookies or tracking cookies for your document processing tasks. All PDF, image, and VAT calculations run client-side in RAM. The only cookies and local storage tokens utilized on this website are documented in the audit table below.
        </p>

        {/* Audit Table */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 font-bold text-slate-800 dark:text-slate-200">
                  <th className="p-4">Category</th>
                  <th className="p-4">Cookie / Key Name</th>
                  <th className="p-4">Provider</th>
                  <th className="p-4">Functional Purpose</th>
                  <th className="p-4">Retention / Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Strictly Necessary
                  </td>
                  <td className="p-4 font-mono font-semibold">alltoolspak_consent</td>
                  <td className="p-4 text-slate-500">First-Party (Local)</td>
                  <td className="p-4">Stores whether user accepted or rejected non-essential cookie banners.</td>
                  <td className="p-4 text-slate-500">Persistent (Local Storage)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Strictly Necessary
                  </td>
                  <td className="p-4 font-mono font-semibold">theme</td>
                  <td className="p-4 text-slate-500">First-Party (Local)</td>
                  <td className="p-4">Remembers user preference for Light Mode or Dark Mode.</td>
                  <td className="p-4 text-slate-500">Persistent (Local Storage)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    Analytics / Ads
                  </td>
                  <td className="p-4 font-mono font-semibold">__gads, _ga, _gid</td>
                  <td className="p-4 text-slate-500">Google LLC (AdSense)</td>
                  <td className="p-4">Aggregates anonymous view metrics and serves non-intrusive banner advertisements.</td>
                  <td className="p-4 text-slate-500">Up to 13 Months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <section className="space-y-3 pt-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Control and Revoke Cookie Consent
          </h2>
          <p>
            You can modify your cookie choices at any time by clearing your browser storage for <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">alltoolspak.pk</code> or configuring your web browser to block third-party cookies by default. Our tools will remain 100% operational regardless of your cookie preferences.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            For questions regarding cookie governance or technical data handling, email Fareed Ullah at{' '}
            <a href="mailto:fareedk1266@gmail.com" className="text-emerald-600 underline font-semibold">
              fareedk1266@gmail.com
            </a>{' '}
            or WhatsApp{' '}
            <a href="https://wa.me/923404526741" className="text-emerald-600 underline font-semibold" target="_blank" rel="noreferrer noopener">
              +92 340 4526741
            </a>.
          </p>
        </section>
      </div>

      <AdSlot label="Cookies Bottom Ad" />
    </div>
  );
}
