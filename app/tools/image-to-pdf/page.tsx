'use client';

import React, { useEffect } from 'react';
import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export default function ImageToPdfPage() {
  useEffect(() => {
    document.title = 'Image to PDF - HD Pro (100% Quality, Original Size, No Compression) | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Convert JPG, PNG, and WebP images to high-definition PDF with zero quality loss. Native 1:1 image dimensions, uncompressed pages, 100% client-side privacy.'
      );
    }
  }, []);
  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
    } else if (page.startsWith('/tools/') || page.startsWith('/')) {
      window.location.href = page;
    } else {
      window.location.href = `/tools/${page}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool="image-to-pdf"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ImageToPdfTool />
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
