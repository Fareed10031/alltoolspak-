"use client";
import React, { useState } from 'react';

const allTools = [
  { name: "PDF Merger", href: "/pdf-merger", icon: "📄", bg: "bg-red-50" },
  { name: "Image to PDF", href: "/image-to-pdf", icon: "🖼️", bg: "bg-blue-50" },
  { name: "QR Code Generator", href: "/qr-generator", icon: "🔳", bg: "bg-green-50" },
  { name: "Password Generator", href: "/password-generator", icon: "🔒", bg: "bg-yellow-50" },
  { name: "ATS Resume Builder", href: "/ats-resume-builder", icon: "📝", bg: "bg-purple-50" },
  { name: "Age Calculator", href: "/age-calculator", icon: "📅", bg: "bg-orange-50" },
  { name: "Unit Converter", href: "/unit-converter", icon: "⚖️", bg: "bg-gray-100" },
  { name: "USA Paycheck 2026", href: "/usa-paycheck-calculator", icon: "💵", bg: "bg-green-100" },
  { name: "Mortgage Calculator", href: "/mortgage-calculator", icon: "🏠", bg: "bg-blue-100" },
  { name: "Global Salary Calculator", href: "/global-salary-calculator", icon: "🌍", bg: "bg-indigo-50" },
  { name: "PDF 3X Pro", href: "/pdf-3x-pro", icon: "📚", bg: "bg-red-100" },
  { name: "Live Currency & Gold", href: "/currency-gold-rates", icon: "💰", bg: "bg-yellow-100" },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        aria-label="All Tools Menu"
      >
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
          ))}
        </div>
      </button>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Tools</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-xl cursor-pointer hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {allTools.map((t) => (
              <a
                key={t.name}
                href={t.href}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all bg-white"
              >
                <div
                  className={`w-12 h-12 ${t.bg} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {t.icon}
                </div>
                <span className="font-semibold text-sm text-gray-800">{t.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export { MegaMenu };
