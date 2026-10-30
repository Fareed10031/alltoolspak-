import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400 py-14 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* FINANCE TOOLS - 100% Match with Homepage Cards */}
        <div>
          <h3 className="text-white font-black tracking-widest text-sm mb-6">FINANCE TOOLS</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/global-accident-emergency" className="hover:text-white transition">Car Accident Settlement Calculator</Link></li>
            <li><Link href="/mortgage-calculator-usa" className="hover:text-white transition">Mortgage Calculator USA</Link></li>
            <li><Link href="/tools/usa-paycheck-calculator-2026" className="hover:text-white transition">USA Paycheck Calculator 2026</Link></li>
            <li><Link href="/amazon-eu-vat-calculator" className="hover:text-white transition">Amazon EU VAT Calculator</Link></li>
            <li><Link href="/currency-gold-rates/" className="hover:text-white transition">Live Currency & Gold Rates - USD to PKR & Gold Price</Link></li>
            <li><Link href="/global-salary-calculator" className="hover:text-white transition">Global Salary Calculator - 192 Countries</Link></li>
          </ul>
        </div>

        {/* DOCUMENT TOOLS - 100% Match with Homepage Cards */}
        <div>
          <h3 className="text-white font-black tracking-widest text-sm mb-6">DOCUMENT TOOLS</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/pdf-3x-pro" className="hover:text-white transition">PDF 3X Pro (3-in-1) Suite</Link></li>
            <li><Link href="/image-to-pdf" className="hover:text-white transition">Image to PDF Converter</Link></li>
            <li><Link href="/tools/pdf-merger" className="hover:text-white transition">Merge PDF Files</Link></li>
            <li><Link href="/tools/qr-code-generator" className="hover:text-white transition">QR Code Generator</Link></li>
            <li><Link href="/ats-resume-builder" className="hover:text-white transition">ATS Resume Builder - 100% Pass</Link></li>
            <li><Link href="/age-calculator" className="hover:text-white transition">Age Calculator</Link></li>
          </ul>
        </div>

        {/* LEGAL & VISA - 100% Match with OneVisa World */}
        <div>
          <h3 className="text-white font-black tracking-widest text-sm mb-6">LEGAL & VISA</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/onevisa-world-visa-points" className="hover:text-white transition">OneVisa World - Visa Points Calculator (UK, Canada, Australia, Germany)</Link></li>
            <li><Link href="/tools/freelance-rate-calculator" className="hover:text-white transition">Freelance Rate Calculator</Link></li>
            <li><Link href="/tools/unit-converter" className="hover:text-white transition">Unit Converter</Link></li>
          </ul>

          <h3 className="text-white font-black tracking-widest text-sm mb-6 mt-10">COMPANY</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/about" className="hover:text-white transition">About Us - Fareed Ullah</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
          </ul>
        </div>

        {/* LEGAL - AdSense Required */}
        <div>
          <h3 className="text-white font-black tracking-widest text-sm mb-6">LEGAL</h3>
          <ul className="space-y-3 text-[15px]">
            <li><Link href="/privacy-policy" className="hover:text-white transition font-bold text-gray-300">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white transition font-bold text-gray-300">Terms and Conditions</Link></li>
            <li><Link href="/security" className="hover:text-white transition">Security - Client-Side Architecture</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
          </ul>

          <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400">Owned by</p>
            <p className="text-white font-bold">Fareed Ullah</p>
            <p className="text-xs mt-1">Peshawar, KPK, Pakistan<br/>contact@alltoolspk.com<br/>+92 340 4526741</p>
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="max-w-7xl mx-auto px-6 mt-14 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛠️</span>
            <div>
              <p className="text-white font-black text-lg leading-none">AllToolsPK</p>
              <p className="text-xs text-gray-400 mt-1">14 Free Tools • 100% Client-Side • No Data Uploaded</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">© 2026 alltoolspk.com - Built for privacy, speed, productivity.</p>
            <p className="text-sm text-gray-400 mt-1">Made with ❤️ for 195 Countries by Fareed Ullah</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
