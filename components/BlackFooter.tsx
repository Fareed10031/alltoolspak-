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
      if (onSelectTool && href.startsWith('/tools/')) {
        onSelectTool(cleanPath);
      } else if (onNavigate) {
        onNavigate(href);
      }
    }
  };

  return (
    <footer className="w-full bg-[#111827] text-white pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ROW 1 - 4 Columns like ILovePDF */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* COL 1 - FINANCE TOOLS */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest">FINANCE TOOLS</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="/tools/car-accident-settlement-calculator" onClick={(e) => handleClick(e, '/tools/car-accident-settlement-calculator')} className="hover:text-white">Car Accident Settlement Calculator</a></li>
              <li><a href="/tools/mortgage-calculator-usa" onClick={(e) => handleClick(e, '/tools/mortgage-calculator-usa')} className="hover:text-white">Mortgage Calculator USA</a></li>
              <li><a href="/tools/usa-paycheck-calculator" onClick={(e) => handleClick(e, '/tools/usa-paycheck-calculator')} className="hover:text-white">USA Paycheck Calculator 2026</a></li>
              <li><a href="/tools/amazon-eu-vat-calculator" onClick={(e) => handleClick(e, '/tools/amazon-eu-vat-calculator')} className="hover:text-white">Amazon EU VAT Calculator</a></li>
              <li><a href="/tools/usd-to-pkr-live" onClick={(e) => handleClick(e, '/tools/usd-to-pkr-live')} className="hover:text-white">USD to PKR Live Today</a></li>
              <li><a href="/tools/gold-price-pakistan" onClick={(e) => handleClick(e, '/tools/gold-price-pakistan')} className="hover:text-white">Gold Price Pakistan</a></li>
            </ul>
          </div>

          {/* COL 2 - DOCUMENT TOOLS */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest">DOCUMENT TOOLS</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="/tools/image-to-pdf" onClick={(e) => handleClick(e, '/tools/image-to-pdf')} className="hover:text-white">Image to PDF Converter</a></li>
              <li><a href="/tools/pdf-merge" onClick={(e) => handleClick(e, '/tools/pdf-merge')} className="hover:text-white">Merge PDF Files</a></li>
              <li><a href="/tools/qr-code-generator" onClick={(e) => handleClick(e, '/tools/qr-code-generator')} className="hover:text-white">QR Code Generator</a></li>
              <li><a href="/tools/ats-resume-checker" onClick={(e) => handleClick(e, '/tools/ats-resume-checker')} className="hover:text-white">ATS Resume Checker</a></li>
              <li><a href="/tools/freelance-rate-calculator" onClick={(e) => handleClick(e, '/tools/freelance-rate-calculator')} className="hover:text-white">Freelance Rate Calculator</a></li>
            </ul>
          </div>

          {/* COL 3 - LEGAL & VISA */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest">LEGAL & VISA</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="/tools/uk-visa-points-calculator" onClick={(e) => handleClick(e, '/tools/uk-visa-points-calculator')} className="hover:text-white">UK Visa Points Calculator</a></li>
              <li><a href="/tools/canada-crs-calculator" onClick={(e) => handleClick(e, '/tools/canada-crs-calculator')} className="hover:text-white">Canada CRS Calculator</a></li>
              <li><a href="/tools/personal-injury-compensation" onClick={(e) => handleClick(e, '/tools/personal-injury-compensation')} className="hover:text-white">Personal Injury Compensation</a></li>
            </ul>
          </div>

          {/* COL 4 - COMPANY & LEGAL - AdSense ke liye IMPORTANT */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest">COMPANY</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 mb-8">
              <li><a href="/about" onClick={(e) => handleClick(e, '/about')} className="hover:text-white">About Us</a></li>
              <li><a href="/contact" onClick={(e) => handleClick(e, '/contact')} className="hover:text-white">Contact Us</a></li>
              <li><a href="/blog" onClick={(e) => handleClick(e, '/blog')} className="hover:text-white">Blog</a></li>
            </ul>

            <h4 className="font-bold text-white mb-4 text-sm tracking-widest">LEGAL</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="/privacy-policy" onClick={(e) => handleClick(e, '/privacy-policy')} className="hover:text-white font-semibold">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" onClick={(e) => handleClick(e, '/terms-and-conditions')} className="hover:text-white font-semibold">Terms and Conditions</a></li>
              <li><a href="/security" onClick={(e) => handleClick(e, '/security')} className="hover:text-white">Security</a></li>
              <li><a href="/disclaimer" onClick={(e) => handleClick(e, '/disclaimer')} className="hover:text-white">Disclaimer</a></li>
            </ul>
          </div>

        </div>

        {/* ROW 2 - Bottom Bar like ILovePDF */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛠️</span>
            <div>
              <p className="font-bold text-white">AllToolsPK</p>
              <p className="text-xs text-gray-500">14 Free Tools • 100% Client-Side • No Data Uploaded</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>© 2026 alltoolspk.com - Built for privacy, speed, productivity.</p>
            <p className="mt-1">Made with ❤️ for 195 Countries</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export { BlackFooter };
