import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

export function AIDisclosure({ isAITool = true }: { isAITool?: boolean }) {
  return (
    <div className="mt-8 pt-4 pb-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          AI-generated content may contain inaccuracies. Please verify critical information. Not professional advice.
        </span>
      </div>
      {isAITool && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shrink-0 self-start sm:self-auto">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          AI Powered
        </span>
      )}
    </div>
  );
}
