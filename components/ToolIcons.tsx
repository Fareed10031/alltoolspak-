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
  "ai-background-remover": {
    bg: "bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2L13.5 8.5H20L14.75 12.5L16.25 19L12 14.75L7.75 19L9.25 12.5L4 8.5H10.5L12 2Z"/></svg>
  },
  "bg-remover": {
    bg: "bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2L13.5 8.5H20L14.75 12.5L16.25 19L12 14.75L7.75 19L9.25 12.5L4 8.5H10.5L12 2Z"/></svg>
  },
  "background-remover": {
    bg: "bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0]",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2L13.5 8.5H20L14.75 12.5L16.25 19L12 14.75L7.75 19L9.25 12.5L4 8.5H10.5L12 2Z"/></svg>
  },
  "pdf-merger": {
    bg: "bg-gradient-to-br from-[#FF416C] to-[#FF4B2B]",
    icon: <span className="text-white text-2xl">📑</span>
  },
  "pdf-merge": {
    bg: "bg-gradient-to-br from-[#FF416C] to-[#FF4B2B]",
    icon: <span className="text-white text-2xl">📑</span>
  },
  "image-to-pdf": {
    bg: "bg-gradient-to-br from-[#00B09B] to-[#96C93D]",
    icon: <span className="text-white text-2xl">🖼️➡️📄</span>
  },
  "qr-generator": {
    bg: "bg-gradient-to-br from-[#000000] to-[#434343]",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="2" height="2"/></svg>
  },
  "password-generator": {
    bg: "bg-gradient-to-br from-[#0F0C29] to-[#302B63]",
    icon: <span className="text-xl">🔐</span>
  },
  "password-gen": {
    bg: "bg-gradient-to-br from-[#0F0C29] to-[#302B63]",
    icon: <span className="text-xl">🔐</span>
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
    icon: <span className="text-white text-xl">📅</span>
  },
  "unit-converter": {
    bg: "bg-gradient-to-br from-[#7F00FF] to-[#E100FF]",
    icon: <span className="text-white text-xl">⚖️</span>
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
    bg: "bg-gradient-to-br from-[#4e54c8] to-[#8f94fb]",
    icon: <span className="text-white text-xl">🏠</span>
  },
  "global-salary": {
    bg: "bg-gradient-to-br from-[#00c6ff] to-[#0072ff]",
    icon: <span className="text-white text-xl">🌍💵</span>
  },
  "global-salary-calculator": {
    bg: "bg-gradient-to-br from-[#00c6ff] to-[#0072ff]",
    icon: <span className="text-white text-xl">🌍💵</span>
  },
  "currency-gold": {
    bg: "bg-gradient-to-br from-[#F7971E] to-[#FFD200]",
    icon: <span className="text-white text-xl">👑$</span>
  },
  "currency-gold-rates": {
    bg: "bg-gradient-to-br from-[#F7971E] to-[#FFD200]",
    icon: <span className="text-white text-xl">👑$</span>
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
