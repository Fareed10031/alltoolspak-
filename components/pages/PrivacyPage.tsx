import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, FileCheck, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Privacy Policy (GDPR / CCPA)</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Statutory Privacy Disclosure &bull; Sept 2026 Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy &amp; Data Protection
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Last Updated: September 24, 2026 &bull; Asia/Karachi Standard Time &bull; Contact: fareedk1266@gmail.com
        </p>
      </div>

      <AdSlot label="Privacy Policy Top Ad" />

      {/* Main Legal Content (600+ words) */}
      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Core Guarantee */}
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
          <h2 className="text-base font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            100% Client-Side RAM Processing Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            alltoolspk.com operates under an uncompromising architectural guarantee: <strong>your PDF documents, confidential tax spreadsheets, uploaded images, and personal resumes are processed 100% locally inside your web browser&apos;s volatile Random Access Memory (RAM)</strong>. Under no circumstances are your uploaded media, documents, or data structures transmitted across an external internet connection to remote cloud servers.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. Scope and Regulatory Jurisdiction
          </h2>
          <p>
            This Privacy Policy governs your use of the web utilities offered by alltoolspk.com (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), founded and engineered by Fareed Ullah in Peshawar, Khyber Pakhtunkhwa, Pakistan. We designed our technical infrastructure to exceed the world&apos;s most stringent data privacy statutes, specifically the European Union General Data Protection Regulation (GDPR) Regulation (EU) 2016/679, the California Consumer Privacy Act (CCPA/CPRA), and the Pakistan Personal Data Protection guidelines.
          </p>
          <p>
            By accessing alltoolspk.com, you benefit from a platform engineered with &quot;Privacy by Design and by Default&quot; under GDPR Article 25. Because document data never reaches our backend hardware, the risk of data interception, unauthorized exposure, or accidental data breaches is mathematically eliminated at the architectural layer.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Compliance with GDPR Article 17 (Right to Erasure / &quot;Right to be Forgotten&quot;)
          </h2>
          <p>
            Under Article 17 of the General Data Protection Regulation (GDPR), individuals maintain the right to obtain from the controller the erasure of personal data concerning them without undue delay. alltoolspk.com fulfills and exceeds this mandate natively:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li><strong>RAM-Only Lifecycle:</strong> When you drag and drop a PDF file, Amazon VAT report, or image into any tool, the file is read into your browser&apos;s sandboxed JavaScript memory pool via the HTML5 File API and WebAssembly buffers.</li>
            <li><strong>Automated 5-Minute Memory Purge:</strong> All document references stored in temporary component state variables are automatically cleared within 5 minutes of inactivity or instantly upon navigating away from the page, refreshing the browser tab, or clicking the &quot;Clear&quot; button.</li>
            <li><strong>Zero Remote Footprint:</strong> Because our servers maintain no file storage buckets (e.g. AWS S3, Google Cloud Storage), no manual data deletion request is ever necessary—your files never existed on our servers in the first place.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. California Consumer Privacy Act (CCPA / CPRA) Protections: No Sale of Personal Data
          </h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents are guaranteed transparent disclosures regarding the collection, commercialization, and dissemination of personal consumer records:
          </p>
          <p>
            <strong>alltoolspk.com does NOT sell, rent, lease, trade, or monetize your personal information or document contents under any circumstances.</strong> We do not construct consumer behavioral dossiers, sell personal data to marketing brokers, or track individual users across unrelated digital domains.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Absolute Prohibition on Server Logs for User Files
          </h2>
          <p>
            Our web servers (managed via Firebase Studio and Google Cloud infrastructure) only record standard, anonymized HTTP routing telemetry necessary for operational security and Denial-of-Service (DDoS) mitigation. These server logs capture only:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>HTTP status code (e.g. 200 OK, 404 Not Found)</li>
            <li>Timestamp of request</li>
            <li>Truncated, anonymized client IP address for rate-limiting</li>
            <li>Generic user-agent header for responsive viewport rendering</li>
          </ul>
          <p>
            Our server logs <strong>never record or inspect the contents of files, invoice numbers, images, or paraphrased text</strong> submitted by users.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Cookie Usage Policy: No Cookies for Tools
          </h2>
          <p>
            You can utilize all 8 tools on alltoolspk.com without enabling cookies. Our core utilities do not require login authentication, session cookies, or user tracking cookies.
          </p>
          <p>
            We strictly limit cookie storage to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li><strong>Strictly Necessary:</strong> Local storage key <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">theme</code> (light/dark preference) and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">alltoolspk_consent</code> (recording your cookie preference).</li>
            <li><strong>Advertising &amp; Analytics:</strong> Google AdSense partner tags that display contextual advertisements to fund free hosting. Users retain full control to accept or reject non-essential cookies via our consent manager.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            6. Inquiries and Data Protection Officer Contact
          </h2>
          <p>
            For any statutory inquiries, audit requests, or clarification regarding this Privacy Policy, please contact our Data Protection Officer directly:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1 text-xs">
            <p className="font-bold text-slate-900 dark:text-white">alltoolspk.com Data Protection Officer (DPO)</p>
            <p>Fareed Ullah</p>
            <p>Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
            <p>
              Official Inquiries Email:{' '}
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

      <AdSlot label="Privacy Policy Bottom Ad" />
    </div>
  );
}
