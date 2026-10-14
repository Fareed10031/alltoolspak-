import React from 'react';

interface BlackFooterProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
}

export default function BlackFooter({ onNavigate, onSelectTool }: BlackFooterProps = {}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onSelectTool || onNavigate) {
      e.preventDefault();
      const cleanPath = href.replace('/tools/', '').replace('/', '');
      if (onSelectTool) {
        onSelectTool(cleanPath);
      } else if (onNavigate) {
        onNavigate(href);
      }
    }
  };

  return (
    <footer className="w-full bg-[#111827] text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* COLUMN 1 - FINANCE & FOREX - High CPC */}
        <div>
          <h4 className="font-bold text-white mb-4 tracking-widest text-sm">FINANCE TOOLS</h4>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <a href="/tools/car-accident-settlement-calculator" onClick={(e) => handleClick(e, '/tools/car-accident-settlement-calculator')} className="hover:text-white transition">Car Accident Settlement Calculator - 195 Countries</a>
            <a href="/tools/mortgage-calculator-usa" onClick={(e) => handleClick(e, '/tools/mortgage-calculator-usa')} className="hover:text-white transition">Mortgage Calculator USA - PMI & Tax Ready</a>
            <a href="/tools/usa-paycheck-calculator" onClick={(e) => handleClick(e, '/tools/usa-paycheck-calculator')} className="hover:text-white transition">USA Paycheck Calculator 2026 - IRS Brackets</a>
            <a href="/tools/amazon-eu-vat-calculator" onClick={(e) => handleClick(e, '/tools/amazon-eu-vat-calculator')} className="hover:text-white transition">Amazon EU VAT Calculator - OSS Ready</a>
            <a href="/tools/usd-to-pkr-live" onClick={(e) => handleClick(e, '/tools/usd-to-pkr-live')} className="hover:text-white transition">USD to PKR Live Today - Dollar Rate</a>
            <a href="/tools/gold-price-pakistan" onClick={(e) => handleClick(e, '/tools/gold-price-pakistan')} className="hover:text-white transition">Gold Price Pakistan Live Today</a>
          </div>
        </div>

        {/* COLUMN 2 - DOCUMENTS & PDF */}
        <div>
          <h4 className="font-bold text-white mb-4 tracking-widest text-sm">DOCUMENT TOOLS</h4>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <a href="/tools/image-to-pdf" onClick={(e) => handleClick(e, '/tools/image-to-pdf')} className="hover:text-white transition">Image to PDF Converter - Free</a>
            <a href="/tools/pdf-merge" onClick={(e) => handleClick(e, '/tools/pdf-merge')} className="hover:text-white transition">Merge PDF Files Online</a>
            <a href="/tools/qr-code-generator" onClick={(e) => handleClick(e, '/tools/qr-code-generator')} className="hover:text-white transition">QR Code Generator - Free</a>
            <a href="/tools/ats-resume-checker" onClick={(e) => handleClick(e, '/tools/ats-resume-checker')} className="hover:text-white transition">ATS Resume Checker - Free</a>
            <a href="/tools/freelance-rate-calculator" onClick={(e) => handleClick(e, '/tools/freelance-rate-calculator')} className="hover:text-white transition">Freelance Rate Calculator</a>
          </div>
        </div>

        {/* COLUMN 3 - LEGAL & VISA */}
        <div>
          <h4 className="font-bold text-white mb-4 tracking-widest text-sm">LEGAL & VISA</h4>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <a href="/tools/uk-visa-points-calculator" onClick={(e) => handleClick(e, '/tools/uk-visa-points-calculator')} className="hover:text-white transition">UK Skilled Worker Visa Points Calculator</a>
            <a href="/tools/canada-crs-calculator" onClick={(e) => handleClick(e, '/tools/canada-crs-calculator')} className="hover:text-white transition">Canada CRS Points Calculator</a>
            <a href="/tools/personal-injury-compensation" onClick={(e) => handleClick(e, '/tools/personal-injury-compensation')} className="hover:text-white transition">Personal Injury Compensation Estimator</a>
          </div>
          
          <div className="mt-8 text-xs text-gray-500">
            <p>© 2026 alltoolspk.com - Built for privacy, speed, productivity. No data uploaded.</p>
            <p className="mt-2">14 Free Tools • 100% Client-Side</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export { BlackFooter };
