// components/GlobalToolFooter.tsx - AUTO FOR ALL 9 TOOLS + FUTURE TOOLS
// GOOGLE ADSENSE SEPTEMBER 2026 COMPLIANT - DO NOT DELETE
import React from 'react';

export default function GlobalToolFooter({ toolName }: { toolName: string }) {
  return (
    <div className="w-full mt-10 space-y-6 px-1">

      {/* HOW TO USE THIS TOOL - REQUIRED FOR EVERY TOOL */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 md:p-7">
        <h2 className="text-[16px] font-black tracking-wider text-slate-900 dark:text-white mb-4">HOW TO USE THIS TOOL</h2>
        <div className="grid gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
            <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 1: Enter Data</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">
              Enter your required details in the form above for {toolName}. All processing runs 100% in your browser. No data is uploaded.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
            <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 2: Instant Preview</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">
              Verify all fields and check the live preview before generating the final output.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
            <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 3: Download File</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">
              Click download to get your file instantly as TXT or PDF. Client-side only, secure and private.
            </p>
          </div>
        </div>
      </div>

      {/* ABOUT THIS TOOL - E-E-A-T */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 md:p-7">
        <h2 className="text-[22px] font-black text-slate-900 dark:text-white mb-3">About {toolName} on AllToolsPK</h2>
        <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
          In modern digital environments, access to fast, reliable, and privacy-first web utilities is crucial. <strong>{toolName}</strong> on <strong>AllToolsPK</strong> is engineered to execute 100% on the client side using advanced browser technologies. This ensures your documents, data, and confidential information never leave your device. Whether you are managing Amazon EU VAT compliance under Directive 2006/112/EC, building an ATS-optimized resume, or converting files, our suite is built for privacy, speed, and productivity. No server upload, no tracking, full GDPR compliance.
        </p>
      </div>

    </div>
  );
}
