'use client';

import React from 'react';
import { tools } from '@/data/tools';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { getAutoLogo } from '@/lib/autoLogoSystem';

export default function ToolPage({ params }: { params: { slug: string } }) {
  const currentSlug = params?.slug ? params.slug.toLowerCase().trim() : '';
  const toolIndex = tools.findIndex((t) => t.id.toLowerCase().trim() === currentSlug);
  const tool = toolIndex >= 0 ? tools[toolIndex] : null;

  if (!tool) {
    return notFound();
  }

  const ToolComponent = tool.component;
  const logo = getAutoLogo(tool.name, toolIndex);

  const navigateTo = (page: string) => {
    if (page === 'home' || page === '/') {
      window.location.href = '/';
    } else if (page.startsWith('/tools/') || page.startsWith('/')) {
      window.location.href = page;
    } else if (
      [
        'pdf-tools',
        'image-compress',
        'image-compressor',
        'youtube-thumb',
        'youtube-thumbnail',
        'amazon-vat',
        'bg-remover',
        'background-remover',
        'paraphraser',
        'detector',
        'ai-detector',
        'resume-builder',
        'ats-resume-builder',
        'humanize-ai-text',
        'mortgage-calculator',
        'mortgage-calculator-usa',
      ].includes(page)
    ) {
      window.location.href = `/tools/${page}`;
    } else {
      window.location.href = `/${page}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header
        activeTool={tool.id}
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb & Auto Logo indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <button onClick={() => navigateTo('home')} className="hover:underline cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('tools')} className="hover:underline cursor-pointer">
              Tools
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">{tool.name}</span>
          </div>

          <ToolComponent />
        </div>
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
      <CookieBanner onNavigate={navigateTo} />
    </div>
  );
}
