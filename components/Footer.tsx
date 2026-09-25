import React from 'react';
import {
  Sparkles,
  Shield,
  Mail,
  MapPin,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Phone,
} from 'lucide-react';
import { TOOLS_CONFIG } from './Header';

export function Footer({
  onNavigate,
  onSelectTool,
}: {
  onNavigate: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
}) {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & E-E-A-T */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                AllToolsPak<span className="text-emerald-600 dark:text-emerald-400">.pk</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pakistan&apos;s premier high-performance web utility platform. Built with strict client-side sandboxing so your PDFs, images, and tax files are processed purely in device RAM.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero server upload &bull; No cookies for tools</span>
            </div>
            {/* Social Placeholder */}
            <div className="flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500">
              <a
                href="https://linkedin.com/in/fareed-ullah-dev"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Fareed Ullah LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/fareed-ullah-dev"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/alltoolspak"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: 8 Free Online Tools */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              8 Free Tools
            </h3>
            <ul className="space-y-2 text-xs">
              {TOOLS_CONFIG.map((t) => (
                <li key={t.slug}>
                  <button
                    onClick={() => onNavigate(`/tools/${t.slug}`)}
                    className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors text-left cursor-pointer"
                  >
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Trust Center */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Legal & Compliance
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  Privacy Policy (GDPR / CCPA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/disclaimer')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  Disclaimer & Tax Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/cookies')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  Cookie Policy & Audit Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors cursor-pointer"
                >
                  About Fareed Ullah (E-E-A-T)
                </button>
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/taxation_customs/vies/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 inline-flex items-center gap-1"
                >
                  <span>EU VIES Tax Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact & Headquarters
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Peshawar, Khyber Pakhtunkhwa, Pakistan</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <a
                href="mailto:fareedk1266@gmail.com"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline font-medium"
              >
                fareedk1266@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <a
                href="https://wa.me/923404526741"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1.5 font-medium"
                title="Chat with Fareed Ullah on WhatsApp"
              >
                <span>+92 340 4526741</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <svg className="w-3 h-3 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
                  </svg>
                  WhatsApp
                </span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
              Managed by Fareed Ullah. Dedicated to providing ad-supported, privacy-respecting online utilities accessible globally without subscriptions.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; 2026 AllToolsPak.pk. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:underline cursor-pointer"
            >
              Privacy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:underline cursor-pointer"
            >
              Terms
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate('/disclaimer')}
              className="hover:underline cursor-pointer"
            >
              Disclaimer
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate('/cookies')}
              className="hover:underline cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
