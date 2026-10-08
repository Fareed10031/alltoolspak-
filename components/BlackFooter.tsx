import React from 'react';

export default function BlackFooter() {
  return (
    <footer className="bg-[#33333b] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-sm">ILOVEPDF STYLE - LEGAL</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
            <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms and Conditions</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-sm">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-sm">PRODUCT</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/currency" className="hover:text-white transition-colors">Dollar Rate Today</a></li>
            <li><a href="/gold-rate" className="hover:text-white transition-colors">Gold Price Pakistan</a></li>
            <li>14 Free Tools • 100% Client-Side</li>
          </ul>
        </div>
        <div className="flex items-end">
          <p className="text-xs text-gray-400 leading-relaxed">
            © 2026 alltoolspk.com - Built for privacy, speed, and productivity. No data uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { BlackFooter };
