'use client';

import React from 'react';
import { PDF3XProOCR } from '@/components/tools/PDF3XProOCR';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Pdf3XProPage() {
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
        activeTool="pdf-to-word"
        onSelectTool={navigateTo}
        onNavigate={navigateTo}
        isDark={false}
        onToggleTheme={() => {
          document.documentElement.classList.toggle('dark');
        }}
      />
      <main className="flex-1 py-4">
        <PDF3XProOCR />
      </main>
      <Footer onNavigate={navigateTo} onSelectTool={navigateTo} />
    </div>
  );
}
