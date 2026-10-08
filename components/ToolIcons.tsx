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
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M4 4h7v7H4z M14 4h6v3h-6z M14 8h6v3h-6z M4 14h7v6H4z M14 14h3v6h-3z M18 14h2v6h-2z"/></svg>
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
    bg: "bg-gradient-to-br from-[#4e54c8] to-[#8f94fb]",
    icon: <span className="text-white text-xl">🏠</span>
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
