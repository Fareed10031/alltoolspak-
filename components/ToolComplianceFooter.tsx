// components/ToolComplianceFooter.tsx
// GOOGLE ADSENSE & SEO COMPLIANCE - SEPTEMBER 2026 - DO NOT DELETE
// This component is isolated from icon logic. Icon changes will never affect this.

import React from 'react';

interface Props {
  toolName: string;
}

export default function ToolComplianceFooter({ toolName }: Props) {
  return (
    <div className="w-full mt-10 space-y-6">

      {/* HOW TO USE THIS TOOL - REQUIRED BY GOOGLE */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 md:p-7">
        <h2 className="text-[16px] font-black tracking-wider text-slate-900 dark:text-white mb-4">
          HOW TO USE THIS TOOL
        </h2>
        <div className="grid gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
            <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 1: Enter Data</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">
              Input your details into the form fields above. All processing happens in local browser memory. No data is uploaded to any server.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
            <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 2: Instant Preview</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">
              Inspect your input parameters and verify all required information is correctly provided before download.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
            <h3 className="text-[#2563EB] dark:text-blue-400 font-bold text-[15px]">Step 3: Download File</h3>
            <p className="text-slate-600 dark:text-slate-300 text-[14px] mt-1 leading-relaxed">
              Click download to compile and receive a real, production-ready file directly onto your device. Client-side only.
            </p>
          </div>
        </div>
      </div>

      {/* ABOUT THIS TOOL - E-E-A-T FOR GOOGLE */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 md:p-7">
        <h2 className="text-[22px] font-black text-slate-900 dark:text-white leading-tight mb-3">
          About {toolName} on AllToolsPK
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
          In modern digital environments, access to fast, reliable, and privacy-first web utilities is crucial for professionals, students, and businesses alike. <strong>AllToolsPK</strong> provides an industry-leading implementation of {toolName} engineered to execute 100% on the client side using cutting-edge browser technologies. This ensures your documents, data, and confidential information never leave your device. Built for privacy, speed, and full compliance with applicable regulations including EU Directive 2006/112/EC where relevant.
        </p>
      </div>

      {/* COMPLIANCE & FOOTER LINKS - ADSENSE POLICY */}
      <div className="text-center py-2">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[14px] font-semibold text-slate-700 dark:text-slate-300">
          <a href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
          <span className="text-slate-400">•</span>
          <a href="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
          <span className="text-slate-400">•</span>
          <a href="/about-us" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a>
          <span className="text-slate-400">•</span>
          <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
        </div>
        <p className="text-[12.5px] text-slate-400 dark:text-slate-400 max-w-3xl mx-auto mt-4 leading-relaxed">
          Client-side browser computing suite. No confidential data, documents, or photographs are ever uploaded or stored on our servers.
          <br />
          © 2026 alltoolspk.com. All Rights Reserved. Built for privacy, speed, and productivity.
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 max-w-3xl mx-auto">
          Disclaimer: This tool is provided for informational purposes only and does not constitute professional tax, legal, or financial advice. Please consult a qualified professional.
        </p>
      </div>
    </div>
  );
}
