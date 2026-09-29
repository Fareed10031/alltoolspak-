// app/tools/layout.tsx - AUTO FOOTER FOR ALL 9 TOOLS + ALL FUTURE TOOLS
// GOOGLE ADSENSE SEPTEMBER 2026 COMPLIANT - DO NOT DELETE THIS FILE
import React from 'react';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      {/* === AUTO COMPLIANCE FOOTER - APPLIES TO EVERY TOOL AUTOMATICALLY === */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-12 space-y-6 pb-10">

        {/* HOW TO USE THIS TOOL - MANDATORY FOR ADSENSE */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 md:p-7 shadow-sm">
          <h2 className="text-[16px] font-black tracking-wider text-slate-900 dark:text-white mb-4">HOW TO USE THIS TOOL</h2>
          <div className="grid gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 1: Enter Your Data</h3>
              <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">Enter required details in the form above. All processing runs 100% in your browser. No data is ever uploaded to our servers.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 2: Verify and Preview</h3>
              <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">Check live preview, validate fields, and ensure all information is correct before generating output.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
              <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 3: Download Instantly</h3>
              <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">Click Download as TXT or Print as PDF. Client-side only, secure, private, and GDPR compliant.</p>
            </div>
          </div>
        </div>

        {/* ABOUT THIS TOOL - E-E-A-T FOR GOOGLE */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 md:p-7 shadow-sm">
          <h2 className="text-[22px] font-black text-slate-900 dark:text-white mb-3">About This Tool on AllToolsPK</h2>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
            In modern digital workflows, access to fast, reliable, and privacy-first utilities is essential. AllToolsPK tools including Amazon EU VAT Calculator for EU OSS Scheme under Directive 2006/112/EC and Article 146, ATS Resume Builder for ATS-compliant resumes, and other productivity tools are engineered to execute 100% on client-side using advanced browser technologies. This ensures your confidential data, invoices, resumes, and documents never leave your device. No server upload, no tracking, no storage. Built for privacy, speed, accuracy, and full compliance with Google Helpful Content and AdSense Policies September 2026.
          </p>
        </div>

      </div>
    </>
  );
}
