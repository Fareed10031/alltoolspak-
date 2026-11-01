import React from 'react';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
  [key: string]: any;
}

export default function Footer(_props?: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <nav aria-label="Footer">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            <div>
              <h3 className="text-lg font-bold mb-4">Finance Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/global-accident-emergency" className="text-gray-400 hover:text-white">Car Accident Settlement Calculator</a></li>
                <li><a href="/mortgage-calculator-usa" className="text-gray-400 hover:text-white">Mortgage Calculator USA</a></li>
                <li><a href="/usa-paycheck-calculator-2026" className="text-gray-400 hover:text-white">USA Paycheck Calculator 2026</a></li>
                <li><a href="/amazon-eu-vat-calculator" className="text-gray-400 hover:text-white">Amazon EU VAT Calculator</a></li>
                <li><a href="/currency-gold-rates" className="text-gray-400 hover:text-white">Live Currency &amp; Gold Rates</a></li>
                <li><a href="/global-salary-calculator" className="text-gray-400 hover:text-white">Global Salary Calculator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">PDF &amp; Document Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/pdf-3x-pro" className="text-gray-400 hover:text-white">PDF 3X Pro</a></li>
                <li><a href="/pdf-merger" className="text-gray-400 hover:text-white">PDF Merger</a></li>
                <li><a href="/image-to-pdf" className="text-gray-400 hover:text-white">Image to PDF</a></li>
                <li><a href="/qr-code-generator" className="text-gray-400 hover:text-white">QR Code Generator</a></li>
                <li><a href="/ats-resume-builder" className="text-gray-400 hover:text-white">ATS Resume Builder</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Everyday Tools</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/age-calculator" className="text-gray-400 hover:text-white">Age Calculator</a></li>
                <li><a href="/onevisa-world-visa-points" className="text-gray-400 hover:text-white">OneVisa World Visa Points</a></li>
                <li><a href="/unit-converter" className="text-gray-400 hover:text-white">Unit Converter</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="text-center mt-12 border-t border-slate-800 pt-8">
          <a href="/" className="text-2xl font-bold">AllTools<span className="text-blue-500">PK</span></a>
          <p className="text-gray-400 mt-3 text-sm">Free Online Tools for Finance, Documents, Salary, Visa and Daily Use. Fast, Free and Easy to Use for Everyone.</p>
          <p className="text-gray-500 text-sm mt-4">© 2026 AllToolsPK. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
