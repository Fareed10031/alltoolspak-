import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
        The requested page or tool does not exist. Please return to the homepage.
      </p>
      <Link href="/" className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors shadow-md shadow-emerald-600/20">
        Return to All Tools
      </Link>
    </div>
  );
}
