import React from 'react';

export const ToolIconsConfig: Record<string, { bg: string; icon: React.ReactNode }> = {
  "amazon-eu-vat-calculator": {
    bg: "bg-gradient-to-br from-[#0052D4] to-[#4364F7]",
    icon: <span className="text-white font-black text-xl">VAT</span>
  },
  "amazon-eu-vat": {
    bg: "bg-gradient-to-br from-[#0052D4] to-[#4364F7]",
    icon: <span className="text-white font-black text-xl">VAT</span>
  },
  "amazon-vat": {
    bg: "bg-gradient-to-br from-[#0052D4] to-[#4364F7]",
    icon: <span className="text-white font-black text-xl">VAT</span>
  },
  "pdf-merger": {
    bg: "bg-gradient-to-br from-[#FF416C] to-[#FF4B2B]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  },
  "pdf-merge": {
    bg: "bg-gradient-to-br from-[#FF416C] to-[#FF4B2B]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  },
  "image-to-pdf": {
    bg: "bg-gradient-to-br from-[#00B09B] to-[#96C93D]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M4 4h7v7H4z M14 4h6v3h-6z M14 8h6v3h-6z M4 14h7v6H4z M14 14h3v6h-3z M18 14h2v6h-2z"/></svg>
  },
  "qr-generator": {
    bg: "bg-gradient-to-br from-[#000000] to-[#434343]",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="2" height="2"/></svg>
  },
  "password-generator": {
    bg: "bg-gradient-to-br from-[#141E30] to-[#243B55]",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="white"/></svg>
  },
  "password-gen": {
    bg: "bg-gradient-to-br from-[#141E30] to-[#243B55]",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="white"/></svg>
  },
  "ats-resume-builder": {
    bg: "bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]",
    icon: <span className="text-white font-bold text-lg">CV</span>
  },
  "resume-builder": {
    bg: "bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]",
    icon: <span className="text-white font-bold text-lg">CV</span>
  },
  "age-calculator": {
    bg: "bg-gradient-to-br from-[#ee0979] to-[#ff6a00]",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  },
  "unit-converter": {
    bg: "bg-gradient-to-br from-[#7F00FF] to-[#E100FF]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 3v18M3 7h3M18 7h3M3 17h3M18 17h3"/><circle cx="6" cy="7" r="2" fill="white"/><circle cx="18" cy="17" r="2" fill="white"/></svg>
  },
  "usa-paycheck": {
    bg: "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    icon: <span className="text-white font-black text-lg">$</span>
  },
  "usa-paycheck-calculator": {
    bg: "bg-gradient-to-br from-[#11998e] to-[#38ef7d]",
    icon: <span className="text-white font-black text-lg">$</span>
  },
  "mortgage-calculator": {
    bg: "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="white" strokeWidth="1.5"/><text x="12" y="16" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">$</text></svg>
  },
  "global-salary": {
    bg: "bg-gradient-to-br from-[#00c6ff] to-[#0072ff]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
  },
  "global-salary-calculator": {
    bg: "bg-gradient-to-br from-[#00c6ff] to-[#0072ff]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
  },
  "currency-gold": {
    bg: "bg-gradient-to-br from-[#F7971E] to-[#FFD200]",
    icon: <span className="text-white text-xl font-bold">👑$</span>
  },
  "currency-gold-rates": {
    bg: "bg-gradient-to-br from-[#F7971E] to-[#FFD200]",
    icon: <span className="text-white text-xl font-bold">👑$</span>
  },
};

export function ToolIconBox({ toolKey }: { toolKey: string }) {
  const config = ToolIconsConfig[toolKey] || ToolIconsConfig[toolKey.replace(/-tool$/, '')] || ToolIconsConfig[toolKey.replace(/-calculator$/, '')];
  if (!config) {
    return (
      <div className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0 text-white font-bold text-xl">
        {toolKey.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <div className={`w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shadow-lg ${config.bg} shrink-0`}>
      {config.icon}
    </div>
  );
}

export default ToolIconBox;
