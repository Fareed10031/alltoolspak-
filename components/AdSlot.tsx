import React from 'react';

export function AdSlot({ label = 'Responsive Top / Inline Banner' }: { label?: string }) {
  return (
    <div className="ad-container my-6 p-2 border border-dashed border-gray-200 dark:border-slate-800 text-center rounded-lg bg-gray-50/50 dark:bg-slate-900/40">
      <p className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 font-medium">
        Advertisement
      </p>
      <div className="h-[90px] md:h-[120px] bg-gray-100 dark:bg-slate-800/80 rounded flex flex-col items-center justify-center text-xs text-gray-400 dark:text-slate-500 border border-slate-200/50 dark:border-slate-700/50">
        <span className="font-mono text-[11px] tracking-wide text-gray-400 dark:text-slate-400">AdSense Slot - Responsive</span>
        <span className="text-[10px] text-gray-400/80 dark:text-slate-500 mt-0.5">{label}</span>
      </div>
    </div>
  );
}
