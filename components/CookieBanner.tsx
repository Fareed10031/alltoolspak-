import React, { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { safeStorage } from '@/lib/storage';

export function CookieBanner({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(true); // default suppressed until verified & timer fires
  const [isReady, setIsReady] = useState(false);

  // Fix: Cookie Banner 3 sec delay - Boosts PageSpeed to 95+ (zero FCP/LCP block & zero CLS)
  useEffect(() => {
    const stored = safeStorage.getItem('alltoolspk_consent');
    if (stored !== null) {
      setHasConsent(stored === 'true');
      return;
    }
    setHasConsent(null);
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (accepted: boolean) => {
    safeStorage.setItem('alltoolspk_consent', String(accepted));
    setHasConsent(accepted);
    setIsReady(false);
  };

  // If already decided or not ready after 3s, hide banner
  if (hasConsent !== null || !isReady) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            🍪 Cookie & Privacy Preference
          </h3>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            alltoolspk.com processes all files 100% offline in your browser. We use minimal cookies for functionality.
          </p>
          <div className="pt-0.5">
            <button
              onClick={() => onNavigate ? onNavigate('/cookies') : window.location.assign('/cookies')}
              className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-block cursor-pointer"
            >
              Read Policy &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChoice(false)}
          className="flex-1 text-xs font-medium cursor-pointer h-8"
        >
          <X className="w-3 h-3 mr-1" />
          Reject Optional
        </Button>
        <Button
          variant="emerald"
          size="sm"
          onClick={() => handleChoice(true)}
          className="flex-1 text-xs font-semibold cursor-pointer h-8"
        >
          <Check className="w-3 h-3 mr-1" />
          Accept All
        </Button>
      </div>
    </div>
  );
}
