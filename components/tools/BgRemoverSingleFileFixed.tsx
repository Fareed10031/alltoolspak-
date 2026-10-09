'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function BgRemoverSingleFileFixed() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('Ready - 100% Private - 0% Credits Waste');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bg, setBg] = useState<'transparent' | 'white' | 'black' | 'custom'>('transparent');
  const [customBg, setCustomBg] = useState('#3B82F6');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('Max 10MB allowed');
      setStatus('❌ File exceeds 10MB limit');
      return;
    }

    const original = URL.createObjectURL(file);
    setOriginalUrl(original);
    setResultUrl(null);
    setLoading(true);
    setProgress(10);
    setStatus('Loading Real AI Model (medium - 30MB)... First time takes 10-15 sec...');

    try {
      const { removeBackground } = await import('@imgly/background-removal');

      const config = {
        publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.6.0/dist/',
        model: 'medium' as const, // FIXED: was isnet_fp16, now medium (high quality)
        output: {
          format: 'image/png' as const,
          quality: 1,
          type: 'foreground' as const,
        },
        device: 'cpu' as const,
        progress: (key: string, current: number, total: number) => {
          if (total) {
            const pct = Math.round((current / total) * 100);
            setProgress(pct);
            setStatus(`${key}: ${pct}% - 100% Private - No Upload`);
          } else {
            setStatus(`${key} - Processing locally...`);
          }
        },
      };

      setProgress(30);
      const blob = await removeBackground(file, config as any);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus('SUCCESS - 100% Real AI - Hair-level - DONE!');
      setProgress(100);
      showToast('Background removed successfully! Real AI Alpha Mask ready.');
    } catch (err: any) {
      console.error('BG Removal Error:', err);
      const errMsg = err?.message || 'Failed to remove background';
      setStatus(`Error: ${errMsg}`);
      showToast(`Error: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Clipboard paste support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-4 text-slate-900 dark:text-slate-100">
      <div className="max-w-[1100px] mx-auto">
        {/* HEADER */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
          <span className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            FIXED: model medium - 100% WORKING
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            AI Background Remover PRO - Fixed
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Running 100% client-side with ISNet medium model via high-speed jsDelivr CDN. Zero upload, hair-level details.
          </p>
        </div>

        {/* UPLOAD ZONE */}
        <div
          onClick={() => fileRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-400 dark:border-blue-800 rounded-2xl p-8 sm:p-10 text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-all shadow-sm"
        >
          <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 px-8 font-black inline-block text-sm shadow-md transition-colors">
            SELECT IMAGE - TEST WORLD NO.1 AI
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Drag & Drop + Paste (Ctrl+V) | JPG, PNG, WEBP up to 10MB | 100% Client-Side
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2.5 mt-4 max-w-md mx-auto overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs font-bold mt-2 text-slate-700 dark:text-slate-300">{status}</p>
          {loading && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 animate-pulse font-medium">
              AI is processing - Please wait - Don't close...
            </p>
          )}
        </div>

        {/* RESULT AREA */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">Original</h3>
            <div className="bg-gray-100 dark:bg-slate-800 rounded-xl h-[400px] flex items-center justify-center overflow-hidden">
              {originalUrl ? (
                <img
                  src={originalUrl}
                  alt="original"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-gray-400 text-sm">No image</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Result</h3>
              {resultUrl && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBg('transparent')}
                    className={`px-2 py-1 rounded text-[11px] font-bold border cursor-pointer ${
                      bg === 'transparent' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-slate-800'
                    }`}
                  >
                    Trans
                  </button>
                  <button
                    type="button"
                    onClick={() => setBg('white')}
                    className={`px-2 py-1 rounded text-[11px] font-bold border cursor-pointer ${
                      bg === 'white' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-slate-800'
                    }`}
                  >
                    White
                  </button>
                  <button
                    type="button"
                    onClick={() => setBg('black')}
                    className={`px-2 py-1 rounded text-[11px] font-bold border cursor-pointer ${
                      bg === 'black' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-slate-800'
                    }`}
                  >
                    Black
                  </button>
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => {
                      setCustomBg(e.target.value);
                      setBg('custom');
                    }}
                    className="w-7 h-6 rounded cursor-pointer border"
                    title="Custom color"
                  />
                </div>
              )}
            </div>

            <div
              className="rounded-xl h-[400px] flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800 flex-1"
              style={{
                background:
                  bg === 'transparent'
                    ? 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 / 20px 20px'
                    : bg === 'white'
                    ? '#ffffff'
                    : bg === 'black'
                    ? '#000000'
                    : customBg,
              }}
            >
              {resultUrl ? (
                <img
                  src={resultUrl}
                  alt="result"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <p className="text-gray-500 text-sm text-center px-4">
                  Upload an image to see World No.1 Result
                  <br />
                  Hair-level test - Real ISNet AI
                </p>
              )}
            </div>

            {resultUrl && (
              <a
                href={resultUrl}
                download={`AllToolsPK_NoBG_${Date.now()}.png`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3.5 rounded-xl font-black mt-3 shadow-md transition-colors cursor-pointer text-sm"
              >
                Download HD PNG
              </a>
            )}
          </div>
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
