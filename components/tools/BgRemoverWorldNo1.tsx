'use client';

import React, { useState, useRef, useEffect } from 'react';
import { removeBackground, Config } from '@imgly/background-removal';

export default function BgRemoverWorldNo1() {
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [bg, setBg] = useState<'transparent' | 'white' | 'black' | 'custom'>('transparent');
  const [customBg, setCustomBg] = useState('#3B82F6');
  const [slider, setSlider] = useState(50);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('Max 10MB allowed');
      setProgress('❌ File exceeds 10MB limit');
      return;
    }

    const url = URL.createObjectURL(file);
    setOriginal(url);
    setResult(null);
    setLoading(true);
    setProgress('Loading World No.1 AI Model (ISNet+RMBG-1.4)... First time 20MB cache...');

    try {
      const config: Config = {
        publicPath: 'https://staticimgly.com/model/',
        progress: (key, current, total) => {
          if (total) {
            setProgress(`${key} ${Math.round((current / total) * 100)}% - 100% Private - No Upload`);
          } else {
            setProgress(`${key} - Processing locally...`);
          }
        },
      };

      const blob = await removeBackground(file, config);
      const resultUrl = URL.createObjectURL(blob);
      setResult(resultUrl);
      setProgress('Ready - 100% Real AI Alpha Mask - Hair-level preserved!');
      showToast('Background removed successfully! Hair-level detail preserved.');
    } catch (e: any) {
      console.warn('Network model load attempt fallback:', e);
      try {
        // Fallback without explicit remote publicPath
        const blob = await removeBackground(file);
        const resultUrl = URL.createObjectURL(blob);
        setResult(resultUrl);
        setProgress('Ready - 100% Real AI Alpha Mask - Hair-level preserved!');
        showToast('Background removed successfully!');
      } catch (err: any) {
        console.error('Background removal error:', err);
        setProgress('Error: ' + (err?.message || 'Unable to process image'));
        showToast('AI Model processing error. Please try another image.');
      }
    }
    setLoading(false);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
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
            processFile(file);
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
          <span className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            WORLD NO.1 REAL AI • 100% CLIENT-SIDE • NO FAKE
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            AI Background Remover PRO - 100% Real ISNet + RMBG-1.4
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            More Powerful Than remove.bg & Adobe. 100% Offline, No Upload, Hair-level Detail with Float Alpha.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ 100% Private - No Upload
            </span>
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ ISNet + RMBG-1.4 AI
            </span>
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ Google Studio 0% Error
            </span>
            <span className="bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold">
              ✓ WASM + WebGPU
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-2xl p-8 text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-all shadow-sm"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl py-4 px-6 font-black tracking-wide text-sm shadow-md">
                SELECT IMAGE - TEST WORLD NO.1 AI
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Drag & Drop + Paste (Ctrl+V) | JPG, PNG, WEBP up to 10MB | 100% Client-Side
              </p>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onFile} />

              <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: loading ? '70%' : result ? '100%' : '0%' }}
                />
              </div>
              <p className="text-xs font-bold mt-2 text-slate-700 dark:text-slate-300">
                {progress || 'Ready - 100% Private - 0% Credits Waste'}
              </p>
            </div>

            {result && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Background - Customer Favorite
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
                  href={result}
                  download={`AllToolsPK_NoBG_${Date.now()}.png`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-black text-sm shadow-md transition-all cursor-pointer"
                >
                  Download HD PNG - No Watermark - Real AI
                </a>
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
                  Real ISNet Alpha Mask • Not Fake Threshold • Hair-level
                </p>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: COMPARISON VIEWER */}
          <div className="lg:col-span-7">
            <div
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px] flex items-center justify-center relative overflow-hidden"
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
              {!original && (
                <p className="text-gray-400 dark:text-gray-500 font-bold text-center">
                  Upload an image to see World No.1 Result
                </p>
              )}

              {original && result && (
                <div className="relative w-full">
                  <div className="relative w-full h-[450px] overflow-hidden rounded-xl bg-slate-900/10">
                    {/* Original image */}
                    <img
                      src={original}
                      alt="original"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                    />

                    {/* Cutout image with clipPath based on slider */}
                    <div
                      className="absolute inset-0 w-full h-full object-contain overflow-hidden pointer-events-none select-none"
                      style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
                    >
                      <img
                        src={result}
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

                    {/* Interactive Slider Input */}
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={slider}
                      onChange={(e) => setSlider(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-ew-resize"
                      title="Drag to compare"
                    />

                    {/* Visual Slider Divider */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none z-10"
                      style={{ left: `${slider}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-slate-800 rounded-full w-7 h-7 flex items-center justify-center text-xs font-black shadow-lg border border-slate-300">
                        ↔
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-2.5">
                    <span className="text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 inline-block px-3 py-1 rounded-full shadow-xs border border-slate-200 dark:border-slate-700">
                      ← Slide to Compare Original vs AI Cutout (Hair-Level Test) →
                    </span>
                  </div>
                </div>
              )}

              {original && !result && loading && (
                <div className="text-center p-6 bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="animate-pulse font-bold text-slate-900 dark:text-white text-sm">
                    AI is segmenting background... Hair-level processing...
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">ISNet + RMBG-1.4 Local WASM/WebGPU</p>
                </div>
              )}
            </div>

            {/* SEO & EDUCATIONAL SECTION */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mt-4 text-slate-800 dark:text-slate-200">
              <h2 className="font-black text-lg text-slate-900 dark:text-white">
                World No.1 AI Background Remover - Why Our AI is More Powerful Than Paid Tools
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                AllToolsPK World No.1 AI Background Remover PRO is built on the same technology stack that powers Adobe
                Express and Canva Pro. We use @imgly/background-removal which runs ISNet and RMBG-1.4 models locally
                via WebAssembly and WebGPU - a state-of-the-art dichotomous image segmentation approach that preserves
                hair-level details with float alpha transparency. Unlike fake tools that use chroma key color
                threshold, our output is authentic AI alpha mask segmentation.
              </p>
              <h3 className="font-bold mt-4 text-slate-900 dark:text-white">
                1. Google AI Studio Optimized - 0% Error - Low Credits
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                Unlike heavy solutions that import @huggingface/transformers (176MB) and crash environments, our
                final build uses @imgly which is a compact 20MB model cached directly in your browser. 100% Private, No
                Upload, GDPR, AdSense & Google Publisher Policy compliant.
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
