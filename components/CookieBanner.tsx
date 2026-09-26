import React, { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { safeStorage } from '@/lib/storage';

export function CookieBanner({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = safeStorage.getItem('alltoolspk_consent');
    if (stored !== null) {
      setHasConsent(stored === 'true');
    } else {
      setHasConsent(null);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    safeStorage.setItem('alltoolspk_consent', String(accepted));
    setHasConsent(accepted);
  };

  // If already decided, hide banner
  if (hasConsent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Cookie & Privacy Preference
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            alltoolspk.com processes all PDF, image, and VAT files client-side in RAM. We use minimal cookies strictly for site functionality and aggregated analytics in accordance with GDPR Art 17 and CCPA.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onNavigate ? onNavigate('/cookies') : window.location.assign('/cookies')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-block cursor-pointer"
            >
              Read Cookie Policy & Table &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChoice(false)}
          className="text-xs font-medium cursor-pointer"
        >
          <X className="w-3.5 h-3.5 mr-1" />
          Reject Optional
        </Button>
        <Button
          variant="emerald"
          size="sm"
          onClick={() => handleChoice(true)}
          className="text-xs font-semibold cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 mr-1" />
          Accept All
        </Button>
      </div>
    </div>
  );
}
