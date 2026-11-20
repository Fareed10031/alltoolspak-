import type { Metadata } from 'next';
import './globals.css';
import { GlobalSEO } from './components/GlobalSEO';
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: 'AllToolsPK - 14 Free Private Online Tools (Finance, PDF, Visa & Utilities)',
  description: 'Use 14 free client-side tools on AllToolsPK: Car Accident Settlement Calculator, Mortgage USA, Paycheck 2026, Amazon EU VAT, OneVisa World, ATS Resume & PDF Suite.',
  alternates: {
    canonical: 'https://alltoolspk.com/',
  },
  verification: {
    google: 'n4DI-NIEzgWwTABe2MkNVUkqVC8569OB-wX2uJ1nIRg',
  },
  keywords: [
    'free online tools',
    'pdf merge online',
    'image compressor',
    'amazon eu vat calculator',
    'youtube thumbnail downloader',
    'qr code generator',
    'ats resume builder',
    'ai detector',
    'humanize ai text',
    'undetectable ai',
  ],
  authors: [{ name: 'Fareed Ullah', url: 'https://linkedin.com/in/fareed-ullah-dev' }],
  creator: 'Fareed Ullah',
  publisher: 'alltoolspk.com',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: 'AllToolsPK - 14 Free Private Online Tools (Finance, PDF, Visa & Utilities)',
    description: 'Use 14 free client-side tools on AllToolsPK: Car Accident Settlement Calculator, Mortgage USA, Paycheck 2026, Amazon EU VAT, OneVisa World, ATS Resume & PDF Suite.',
    url: 'https://alltoolspk.com/',
    siteName: 'AllToolsPK',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllToolsPK - 14 Free Private Online Tools',
    description: 'Fast, client-side, zero-paywall utility suite on AllToolsPK.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GlobalSEO />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7765776011144949"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
