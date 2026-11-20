import React from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/config';

export const metadata = {
  title: 'Page Not Found (404) | AllToolsPK',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-16 space-y-6">
      <div className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
        HTTP 404
      </div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        The requested page or tool does not exist. Return to the homepage or open one of our canonical tools below.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors shadow-md shadow-blue-600/20"
      >
        Return to Homepage (All Tools)
      </Link>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left pt-4">
        {TOOLS.slice(0, 8).map((tool) => (
          <Link
            key={tool.id}
            href={`/${tool.slug}`}
            className="px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
