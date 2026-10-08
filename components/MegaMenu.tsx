'use client';

import React, { useState } from 'react';

const TOOLS_CATEGORIES = {
  "ORGANIZE PDF": [
    { name: "PDF Merger", icon: "📄", href: "/pdf-merger" },
    { name: "PDF 3X Pro", icon: "📚", href: "/pdf-3x-pro" },
  ],
  "CONVERT": [
    { name: "Image to PDF", icon: "🖼️→📄", href: "/image-to-pdf" },
    { name: "PDF to Word", icon: "📄→📝", href: "/pdf-to-word" },
  ],
  "FINANCE": [
    { name: "Amazon EU VAT", icon: "💶", href: "/amazon-vat" },
    { name: "Live Currency Rates", icon: "💵", href: "/currency" },
    { name: "Gold Price PK", icon: "💰", href: "/gold-rate" },
  ],
  "AI & SECURITY": [
    { name: "AI Background Remover", icon: "🤖", href: "/bg-remover" },
    { name: "QR Generator", icon: "🔳", href: "/qr-generator" },
  ]
};

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex flex-col justify-center items-center gap-1 cursor-pointer rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle Mega Menu"
      >
        <span className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 bg-slate-700 dark:bg-slate-300 rounded-full"></span>
          ))}
        </span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[999] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-y-auto p-6 md:p-10 shadow-2xl transition-all">
          <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="font-extrabold text-2xl tracking-tight">All Tools</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-3xl text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close Menu"
            >
              ×
            </button>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {Object.entries(TOOLS_CATEGORIES).map(([cat, tools]) => (
              <div key={cat}>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-3 tracking-widest uppercase">
                  {cat}
                </h3>
                <div className="space-y-2">
                  {tools.map((t) => (
                    <a
                      key={t.name}
                      href={t.href}
                      className="flex items-center gap-3 p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium text-slate-800 dark:text-slate-200"
                    >
                      <span className="text-xl">{t.icon}</span>
                      <span className="text-sm font-semibold">{t.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Legal Bottom inside menu like iLovePDF */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-6 text-sm text-slate-500 dark:text-slate-400 max-w-5xl mx-auto">
            <a href="/security" className="hover:text-blue-600 transition-colors">Security</a>
            <a href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms</a>
          </div>
        </div>
      )}
    </>
  );
}

export { MegaMenu };
