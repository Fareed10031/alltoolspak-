import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      <p className="text-xs font-semibold text-slate-500 tracking-wide">
        Loading alltoolspk.com Workspace...
      </p>
    </div>
  );
}
