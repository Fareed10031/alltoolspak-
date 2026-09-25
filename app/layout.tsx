import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'AllToolsPak.pk - 8-in-1 FREE Online Tools | 100% Client-Side Privacy',
  description:
    'Free production-grade web tools: PDF Suite, Image Compressor, YouTube Thumbnail Grabber, Amazon EU VAT Calculator, AI Background Remover, Paraphraser, Detector & ATS Resume Builder. Zero paywalls, RAM-only processing.',
  keywords: [
    'free online tools',
    'pdf merge online',
    'image compressor',
    'amazon eu vat calculator',
    'youtube thumbnail downloader',
    'ai background remover',
    'ats resume builder',
    'ai detector',
  ],
  authors: [{ name: 'Fareed Khan', url: 'https://linkedin.com/in/fareed-khan-dev' }],
  creator: 'Fareed Khan',
  publisher: 'AllToolsPak.pk',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'AllToolsPak.pk - 8-in-1 FREE Web Tools',
    description: '100% Free & Client-Side: PDF Tools, Image Compressor, Amazon VAT, AI Background Remover & ATS Resume Builder.',
    url: 'https://alltoolspak.pk',
    siteName: 'AllToolsPak.pk',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllToolsPak.pk - 8-in-1 Free Web Tools',
    description: 'Fast, client-side, zero-paywall utility suite built in Pakistan by Fareed Khan.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
