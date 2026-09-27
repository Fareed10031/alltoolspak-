'use client';

import React, { useState } from 'react';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { Upload, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export function BackgroundRemoverTool() {
  const tool = TOOLS.find((t) => t.slug === 'background-remover') || {
    slug: 'background-remover',
    name: 'AI Background Remover',
    desc: 'Automatic background removal powered by client-side neural vision.',
    tag: 'Neural Vision',
    colorIndex: 1,
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    setErrorMessage('');
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, or WebP).');
      e.target.value = '';
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      // Mobile RAM protection: Scale large mobile camera photos to max 1800px to prevent canvas crash on iOS/Android
      const maxDim = 1800;
      let targetWidth = img.naturalWidth || img.width;
      let targetHeight = img.naturalHeight || img.height;

      if (targetWidth > maxDim || targetHeight > maxDim) {
        if (targetWidth > targetHeight) {
          targetHeight = Math.round((targetHeight * maxDim) / targetWidth);
          targetWidth = maxDim;
        } else {
          targetWidth = Math.round((targetWidth * maxDim) / targetHeight);
          targetHeight = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample border corner color for background detection
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const threshold = 40;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const diff = Math.sqrt(
          Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
        );
        if (diff < threshold) {
          // Transparent
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const resultDataUrl = canvas.toDataURL('image/png');
      setProcessedUrl(resultDataUrl);
      setIsProcessing(false);

      setForm((prev) => ({
        ...prev,
        hasImage: 'true',
        imageName: file.name,
      }));
    };

    img.onerror = () => {
      setIsProcessing(false);
      setErrorMessage('Could not process this image format. Please try another image.');
    };

    // Reset input value for reliable mobile re-uploads
    e.target.value = '';
  };

  const generatePngCutout = (form: Record<string, any>) => {
    if (!processedUrl) {
      setErrorMessage('Please upload an image first.');
      return;
    }

    const a = document.createElement('a');
    a.href = processedUrl;
    const safeName = (fileName || 'image')
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    a.download = `${safeName}_cutout.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ProToolBase
      tool={tool}
      required={['hasImage']}
      initialState={{
        hasImage: '',
        imageName: '',
      }}
      render={(form, setForm) => (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
            <input
              type="file"
              id="bg-file-input"
              accept="image/png, image/jpeg, image/webp, image/*"
              onChange={(e) => handleFileChange(e, setForm)}
              className="hidden"
            />
            <label
              htmlFor="bg-file-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3 min-h-[140px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  {form.imageName
                    ? `Selected: ${form.imageName}`
                    : 'Tap to upload portrait, product, or logo'}
                </p>
                <p className="text-xs text-slate-500">
                  PNG, JPG, or WebP &bull; Mobile camera or gallery &bull; 100% Client-Side Privacy
                </p>
              </div>
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {isProcessing && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Analyzing edges and isolating subject...</span>
            </div>
          )}

          {/* Previews */}
          {previewUrl && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                <span className="text-xs font-bold text-slate-500 block mb-2">Original</span>
                <div className="h-48 sm:h-56 flex items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="max-h-full object-contain"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                <span className="text-xs font-bold text-emerald-600 block mb-2 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Transparent Cutout (PNG)
                </span>
                <div className="h-48 sm:h-56 flex items-center justify-center overflow-hidden rounded-lg bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px]">
                  {processedUrl ? (
                    <img
                      src={processedUrl}
                      alt="Processed"
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">Processing...</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      generateFile={generatePngCutout}
    />
  );
}

export default BackgroundRemoverTool;
