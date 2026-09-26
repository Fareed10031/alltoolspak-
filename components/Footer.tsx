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
    <footer className="bg-slate-50 border-t mt-10 py-8 text-center text-sm text-slate-500">
      <p>© 2026 alltoolspk.com - All Rights Reserved.</p>
      <div className="mt-2 flex justify-center gap-4">
        <Link
          href="/privacy-policy"
          onClick={(e) => handleLinkClick(e, '/privacy-policy')}
          className="hover:underline hover:text-slate-700 transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          onClick={(e) => handleLinkClick(e, '/terms')}
          className="hover:underline hover:text-slate-700 transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/contact"
          onClick={(e) => handleLinkClick(e, '/contact')}
          className="hover:underline hover:text-slate-700 transition-colors"
        >
          Contact: contact@alltoolspk.com
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
