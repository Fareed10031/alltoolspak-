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
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 text-center text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Brand identity */}
        <div className="flex items-center justify-center gap-2">
          <div className="grid grid-cols-2 gap-1 w-5 h-5 shrink-0 p-0.5 rounded bg-slate-100 dark:bg-slate-800">
            <span className="rounded-xs bg-[#0055FF]" />
            <span className="rounded-xs bg-[#00C48C]" />
            <span className="rounded-xs bg-[#FF5A5F]" />
            <span className="rounded-xs bg-[#FFAA00]" />
          </div>
          <span className="font-extrabold text-base text-slate-900 dark:text-white">
            alltools<span className="text-[#0055FF]">pk.com</span>
          </span>
        </div>

        {/* 4 Mandatory Google AdSense Compliance Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link
            href="/privacy"
            onClick={(e) => handleLinkClick(e, 'privacy')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <span>&bull;</span>
          <Link
            href="/terms"
            onClick={(e) => handleLinkClick(e, 'terms')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
          <span>&bull;</span>
          <Link
            href="/about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            About Us
          </Link>
          <span>&bull;</span>
          <Link
            href="/contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hover:text-[#0055FF] dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
          <span>&bull;</span>
          <Link
            href="/currency-gold-rates"
            onClick={(e) => handleLinkClick(e, 'currency-gold-rates')}
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-colors"
          >
            Dollar Rate Today | Gold Price Pakistan
          </Link>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="space-y-1 text-xs text-slate-400 dark:text-slate-500">
          <p>
            Client-side browser computing suite. No confidential data, documents, or photographs are ever uploaded or stored on our servers.
          </p>
          <p>© 2026 alltoolspk.com. All Rights Reserved. Built for privacy, speed, and productivity.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
