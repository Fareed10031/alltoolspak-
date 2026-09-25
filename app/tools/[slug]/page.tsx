'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

// Tools
import { PdfTools } from '@/components/tools/PdfTools';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import { YouTubeThumb } from '@/components/tools/YouTubeThumb';
import { AmazonVat } from '@/components/tools/AmazonVat';
import { BgRemover } from '@/components/tools/BgRemover';
import { Paraphraser } from '@/components/tools/Paraphraser';
import { Detector } from '@/components/tools/Detector';
import { ResumeBuilder } from '@/components/tools/ResumeBuilder';

export default function ToolPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const navigateTo = (page: string) => {
    if (page === 'home') {
      window.location.href = '/';
    } else if (
      [
        'pdf-tools',
        'image-compress',
        'youtube-thumb',
        'amazon-vat',
        'bg-remover',
        'paraphraser',
        'detector',
        'resume-builder',
      ].includes(page)
    ) {
      window.location.href = `/tools/${page}`;
    } else {
      window.location.href = `/${page}`;
    }
  };

  const renderTool = () => {
    switch (slug) {
      case 'pdf-tools':
        return <PdfTools />;
      case 'image-compress':
        return <ImageCompressor />;
      case 'youtube-thumb':
        return <YouTubeThumb />;
      case 'amazon-vat':
        return <AmazonVat />;
      case 'bg-remover':
        return <BgRemover />;
      case 'paraphraser':
        return <Paraphraser />;
      case 'detector':
        return <Detector />;
      case 'resume-builder':
        return <ResumeBuilder />;
      default:
        return (
          <div className="max-w-xl mx-auto py-24 text-center space-y-4 px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Tool Not Found</h2>
            <p className="text-sm text-slate-500">
              The tool &quot;{slug}&quot; is not recognized. Please choose from our 8 verified tools.
            </p>
            <a href="/" className="inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
              Return to All Tools
            </a>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool={slug}
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1">
        {renderTool()}
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
