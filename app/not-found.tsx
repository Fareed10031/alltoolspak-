import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404</h1>
      <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">Tool or Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        The tool or resource you are looking for has moved or does not exist.
      </p>
      <a href="/" className="inline-flex">
        <Button variant="emerald" size="sm" className="gap-2 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Back to All Tools
        </Button>
      </a>
    </div>
  );
}
