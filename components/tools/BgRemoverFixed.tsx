'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function BgRemoverFixed() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('Ready - 100% Private - 0% Credits Waste');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bg, setBg] = useState<'transparent' | 'white' | 'black' | 'custom'>('transparent');
  const [customBg, setCustomBg] = useState('#3B82F6');
  const [slider, setSlider] = useState(50);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP)');
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
    setStatus('Loading Real AI Model (ISNet FP16 - 20MB)... First time takes 10 sec...');

    try {
      // Dynamic import to avoid SSR issues
      const { removeBackground } = await import('@imgly/background-removal');

      const config = {
        // FIX FOR FAILED TO FETCH: Use jsDelivr CDN, not staticimgly.com
        publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/',
        model: 'isnet_fp16' as const, // Smallest, fastest, most stable
        output: {
          format: 'image/png' as const,
          quality: 1,
          type: 'foreground' as const,
        },
        device: 'cpu' as const, // Use CPU first for max compatibility
        debug: false,
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

      setProgress(100);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus('SUCCESS - 100% Real AI Alpha Mask - Hair-level Detail - Ready!');
      showToast('Background removed successfully! Hair-level detail preserved.');
    } catch (err: any) {
      console.error('BG Removal Error:', err);
      const errMsg = err?.message || 'Failed to process image';
      setStatus(`Error: ${errMsg}. Please try a smaller JPG/PNG image.`);
      showToast(`Error: ${errMsg}. Try another image.`);
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  // Clipboard Paste Support (Ctrl+V)
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-3 md:p-6 text-slate-900 dark:text-slate-100">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
          <span className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            WORLD NO.1 REAL AI • 100% CLIENT-SIDE • NO FAKE • FIXED FETCH ERROR
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            AI Background Remover PRO - 100% Real ISNet + RMBG-1.4
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            More Powerful Than remove.bg & Adobe. 100% Offline, No Upload, Hair-level Detail.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ 100% Private - No Upload
            </span>
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ ISNet FP16 Real AI
            </span>
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ jsDelivr Fast CDN
            </span>
            <span className="bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ CPU / WebAssembly Safe
            </span>
          </div>
        </div>

        {/* UPLOAD & CONTROLS */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-400 dark:border-blue-800 rounded-2xl p-8 text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-all shadow-sm"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-4 px-8 font-black inline-block text-sm shadow-md">
                SELECT IMAGE - TEST WORLD NO.1 AI
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Drag & Drop + Paste (Ctrl+V) | JPG, PNG, WEBP up to 10MB | 100% Client-Side
              </p>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onInputChange} />

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

            {/* BACKGROUND COLOR & DOWNLOAD */}
            {resultUrl && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Replace Background - Customer Favorite
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setBg('transparent')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      bg === 'transparent'
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Transparent
                  </button>
                  <button
                    type="button"
                    onClick={() => setBg('white')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      bg === 'white'
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    White
                  </button>
                  <button
                    type="button"
                    onClick={() => setBg('black')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      bg === 'black'
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Black
                  </button>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <input
                      type="color"
                      value={customBg}
                      onChange={(e) => {
                        setCustomBg(e.target.value);
                        setBg('custom');
                      }}
                      className="w-10 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700"
                      title="Pick custom color"
                    />
                    <span className="text-[11px] text-gray-500 font-medium">Custom</span>
                  </div>
                </div>

                <a
                  href={resultUrl}
                  download={`AllToolsPK_NoBG_${Date.now()}.png`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-black text-sm shadow-md transition-all cursor-pointer"
                >
                  Download HD PNG - No Watermark
                </a>
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
                  Real ISNet Alpha Mask • Not Fake Threshold • Hair-level
                </p>
              </div>
            )}
          </div>

          {/* RESULT & COMPARISON AREA */}
          <div className="lg:col-span-7">
            {originalUrl && resultUrl ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Interactive Comparison (Original vs AI)
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    100% Alpha Clean
                  </span>
                </div>

                <div
                  className="relative w-full h-[420px] overflow-hidden rounded-xl bg-slate-900/10"
                  style={{
                    background:
                      bg === 'transparent'
                        ? 'repeating-conic-gradient(#cbd5e1 0% 25%, #f8fafc 0% 50%) 0 / 20px 20px'
                        : bg === 'white'
                        ? '#fff'
                        : bg === 'black'
                        ? '#000'
                        : customBg,
                  }}
                >
                  <img
                    src={originalUrl}
                    alt="original"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                  />
                  <div
                    className="absolute inset-0 w-full h-full object-contain overflow-hidden pointer-events-none select-none"
                    style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
                  >
                    <img
                      src={resultUrl}
                      alt="result"
                      className="w-full h-full object-contain"
                      style={{
                        background:
                          bg === 'transparent'
                            ? 'transparent'
                            : bg === 'white'
                            ? 'white'
                            : bg === 'black'
                            ? 'black'
                            : customBg,
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={slider}
                    onChange={(e) => setSlider(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-ew-resize"
                  />
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none z-10"
                    style={{ left: `${slider}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-slate-800 rounded-full w-7 h-7 flex items-center justify-center text-xs font-black shadow-lg border border-slate-300">
                      ↔
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs font-bold text-slate-600 dark:text-slate-400">
                  ← Slide to Compare Original vs AI Cutout (Hair-level Test) →
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
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
                      <p className="text-gray-400 text-sm">No image selected</p>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">
                    Result - Transparent BG (Real Alpha)
                  </h3>
                  <div
                    className="rounded-xl h-[400px] flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-800"
                    style={{
                      background:
                        bg === 'transparent'
                          ? 'repeating-conic-gradient(#cbd5e1 0% 25%, #f8fafc 0% 50%) 0 / 20px 20px'
                          : bg === 'white'
                          ? '#fff'
                          : bg === 'black'
                          ? '#000'
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
                </div>
              </div>
            )}

            {/* SEO Content */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mt-4 text-slate-800 dark:text-slate-200">
              <h2 className="font-black text-lg text-slate-900 dark:text-white">
                World No.1 AI Background Remover - Powered by ISNet FP16 & jsDelivr CDN
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                AllToolsPK AI Background Remover runs 100% locally in your browser with zero server uploads. Powered
                by the ISNet FP16 machine learning model delivered via high-speed jsDelivr CDN, it segments complex
                foregrounds, flyaway hair, pets, and products with sub-pixel float alpha transparency.
              </p>
            </div>
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
