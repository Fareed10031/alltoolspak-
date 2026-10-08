import React from 'react';
import Link from 'next/link';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <footer className="bg-[#33333b] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-sm uppercase">ILOVEPDF STYLE - LEGAL</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/security" onClick={(e) => handleLinkClick(e, 'security')} className="hover:text-white transition-colors">
                Security
              </Link>
            </li>
            <li>
              <Link href="/privacy" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-sm uppercase">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={(e) => handleLinkClick(e, 'blog')} className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 tracking-widest text-sm uppercase">PRODUCT</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/currency-gold-rates" onClick={(e) => handleLinkClick(e, 'currency-gold-rates')} className="hover:text-white transition-colors">
                Dollar Rate Today
              </Link>
            </li>
            <li>
              <Link href="/currency-gold-rates" onClick={(e) => handleLinkClick(e, 'currency-gold-rates')} className="hover:text-white transition-colors">
                Gold Price Pakistan
              </Link>
            </li>
            <li className="text-gray-400">14 Free Tools • 100% Client-Side</li>
          </ul>
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-2">
            <div className="grid grid-cols-2 gap-1 w-5 h-5 shrink-0 p-0.5 rounded bg-slate-800">
              <span className="rounded-xs bg-[#0055FF]" />
              <span className="rounded-xs bg-[#00C48C]" />
              <span className="rounded-xs bg-[#FF5A5F]" />
              <span className="rounded-xs bg-[#FFAA00]" />
            </div>
            <span className="font-extrabold text-white text-sm">alltoolspk.com</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            © 2026 alltoolspk.com - Built for privacy, speed, and productivity. No data uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
