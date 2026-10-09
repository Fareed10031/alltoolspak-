// TOP 1 AI BACKGROUND REMOVER - V10 FINAL - HIGH QUALITY - SEO READY
// Build: 2026-10-09-V10-PRO-MAX-QUALITY

'use client';

import React, { useState, useRef } from 'react';

export const dynamic = 'force-dynamic';

export default function AIProBackgroundRemover() {
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Ready for Pro Quality');
  const [fileName, setFileName] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    try {
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(msg);
      }
    } catch {
      // In some sandboxed iframes, window.alert is blocked
    }
    setTimeout(() => setToastMsg(null), 5000);
  };

  const handleImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('Please select image file');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showNotification('Max 15MB allowed');
      return;
    }

    setFileName(file.name);
    setOriginal(URL.createObjectURL(file));
    setResult(null);
    setLoading(true);
    setProgress(10);
    setStatus('Loading Pro AI Model (42MB - One Time)...');

    try {
      const { removeBackground } = await import('@imgly/background-removal');

      const blob = await removeBackground(file, {
        // STABLE CDN - V10 - This has isnet_fp16 file - 100% exists
        publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/',
        model: 'isnet_fp16', // BEST QUALITY - Hair Details Pro
        output: {
          format: 'image/png',
          quality: 1,
        },
        progress: (key: string, current: number, total: number) => {
          if (total) {
            const p = Math.round((current / total) * 100);
            setProgress(p);
            if (key.includes('fetch')) setStatus(`Downloading AI: ${p}%`);
            else if (key.includes('compute')) setStatus(`Processing Hair Details: ${p}%`);
            else setStatus(`${key}: ${p}%`);
          } else {
            setStatus(`${key}...`);
          }
        },
      } as any);

      const url = URL.createObjectURL(blob);
      setResult(url);
      setStatus('SUCCESS - Pro Quality Done!');
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setStatus('Failed: ' + err.message);
      // Fallback to small model if fp16 fails on slow net
      try {
        setStatus('Retrying with Fast Model...');
        const { removeBackground } = await import('@imgly/background-removal');
        const blob2 = await removeBackground(file, {
          publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/',
          model: 'isnet_quint8',
        } as any);
        setResult(URL.createObjectURL(blob2));
        setStatus('Success with Fast Model!');
        setProgress(100);
      } catch (e2: any) {
        showNotification('Error: ' + e2.message + ' - Try small JPG image');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2 sm:p-4 transition-colors">
      {/* SEO HEADER */}
      <div className="max-w-[1100px] mx-auto p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h1 className="text-[28px] font-black leading-tight text-slate-900 dark:text-white">
            AI Background Remover - 100% Free, HD Quality
          </h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mt-2">
            Professional AI like Remove.bg - No Upload to Server, 100% Private in Your Browser. Best for Hair, Fur, People, Products. V10 Pro Build.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 text-[11px] font-bold px-3 py-1 rounded-full">
              ✓ No Watermark
            </span>
            <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold px-3 py-1 rounded-full">
              ✓ HD Quality (isnet_fp16)
            </span>
            <span className="bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-bold px-3 py-1 rounded-full">
              ✓ 100% Private
            </span>
            <span className="bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[11px] font-bold px-3 py-1 rounded-full">
              ✓ V10 No Cache Error
            </span>
          </div>
        </div>

        {/* UPLOAD BOX */}
        <div
          onClick={() => !loading && fileInput.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) handleImage(f);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="mt-4 bg-white dark:bg-slate-900 border-2 border-dashed border-blue-400 dark:border-blue-700 rounded-[20px] p-8 text-center cursor-pointer hover:border-blue-600 dark:hover:border-blue-500 transition-all shadow-sm"
        >
          <input
            ref={fileInput}
            type="file"
            hidden
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
          />
          <div className="bg-blue-600 hover:bg-blue-700 text-white inline-block px-8 py-4 rounded-xl font-black text-[16px] shadow-md transition-colors">
            {loading ? 'PROCESSING...' : 'SELECT IMAGE - PRO QUALITY'}
          </div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-3">
            Drag &amp; Drop or Click - Supports JPG, PNG, WEBP (Max 15MB) - File: {fileName || 'None'}
          </p>
          <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="h-2 bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[12px] font-bold mt-2 text-blue-700 dark:text-blue-400">{status}</p>
        </div>

        {/* RESULTS */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm">
            <p className="font-bold text-[13px] mb-2 text-slate-800 dark:text-slate-200">Original</p>
            <div className="h-[450px] bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
              {original ? (
                <img src={original} alt="original" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-gray-400 text-sm">Upload image to start</span>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm">
            <p className="font-bold text-[13px] mb-2 text-slate-800 dark:text-slate-200">Result - Transparent PNG (HD)</p>
            <div
              className="h-[450px] rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800"
              style={{ background: 'repeating-conic-gradient(#E5E7EB 0% 25%, #FFF 0% 50%) 0 / 24px 24px' }}
            >
              {result ? (
                <img src={result} alt="result" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-gray-400 text-sm">HD result will appear here</span>
              )}
            </div>
            {result && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={result}
                  download={`AllToolsPK_PRO_HD_${Date.now()}.png`}
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-black text-[14px] no-underline shadow-md transition-colors"
                >
                  DOWNLOAD HD PNG
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOriginal(null);
                    setResult(null);
                    setProgress(0);
                    setStatus('Ready');
                  }}
                  className="bg-gray-900 hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600 text-white py-3 rounded-xl font-bold text-[14px] shadow-md transition-colors cursor-pointer"
                >
                  NEW IMAGE
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SEO CONTENT FOR RANKING */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mt-4 shadow-sm">
          <h2 className="font-black text-[18px] text-slate-900 dark:text-white">Why Our AI is Top 1?</h2>
          <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            We use ISNet FP16 model (42MB) - Same as remove.bg backend. It gives perfect hair cut, fur details, and product edges. 100% client-side, your image never goes to server. Private, Fast, Free. Best for E-commerce, ID Photos, Posters, YouTube Thumbnails.
          </p>
          <h3 className="font-bold text-[14px] mt-4 text-slate-900 dark:text-white">How to Use?</h3>
          <ul className="text-[13px] text-gray-600 dark:text-gray-400 mt-1 list-disc pl-5 space-y-1">
            <li>Select JPG/PNG under 15MB</li>
            <li>Wait 5-10 sec for AI to cut background (first time 42MB download)</li>
            <li>Download Transparent HD PNG</li>
          </ul>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 dark:border-slate-200 animate-in fade-in slide-in-from-bottom-2">
          <span>{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="ml-2 font-black cursor-pointer text-slate-400 hover:text-white dark:hover:text-black"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export { AIProBackgroundRemover as BgRemover };
