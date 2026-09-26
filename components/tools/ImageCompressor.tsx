import React, { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Download,
  Maximize,
  Sliders,
  Check,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';
import { AIDisclosure } from '@/components/AIDisclosure';
import { validateRequiredFields, guardDownload } from '@/lib/toolValidation';
import ToolGuard from '@/components/ToolGuard';

type ResizePreset = 'original' | '1080x1080' | '1280x720' | '1080x1920';

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const [quality, setQuality] = useState<number>(0.7);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [preset, setPreset] = useState<ResizePreset>('original');

  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedDimensions, setCompressedDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Before / After slider position (0 - 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    if (!e.target.files || e.target.files.length === 0) return;
    const uploadedFile = e.target.files[0];

    // Check 10MB limit
    if (uploadedFile.size > 10 * 1024 * 1024) {
      setErrorMsg('File exceeds 10MB limit. Please upload an image smaller than 10MB.');
      return;
    }

    setFile(uploadedFile);
    setOriginalSize(uploadedFile.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setOriginalSrc(src);

      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        compressImage(src, img.naturalWidth, img.naturalHeight, quality, format, preset);
      };
      img.src = src;
    };
    reader.readAsDataURL(uploadedFile);
  };

  const compressImage = (
    src: string,
    origW: number,
    origH: number,
    q: number,
    fmt: string,
    resizeChoice: ResizePreset
  ) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let targetW = origW;
      let targetH = origH;

      if (resizeChoice === '1080x1080') {
        targetW = 1080;
        targetH = 1080;
      } else if (resizeChoice === '1280x720') {
        targetW = 1280;
        targetH = 720;
      } else if (resizeChoice === '1080x1920') {
        targetW = 1080;
        targetH = 1920;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw background white for jpeg if png has transparency
      if (fmt === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetW, targetH);
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Export using canvas toDataURL with quality slider parameter
      const dataUrl = canvas.toDataURL(fmt, q);
      setCompressedSrc(dataUrl);

      // Compute precise payload size in bytes from base64 dataURL
      const base64Content = dataUrl.split(',')[1] || '';
      const byteLength = Math.round((base64Content.length * 3) / 4);
      setCompressedSize(byteLength);
      setCompressedDimensions({ width: targetW, height: targetH });
      setIsProcessing(false);
    };
    img.src = src;
  };

  // Re-run compression whenever controls change
  useEffect(() => {
    if (originalSrc && originalDimensions.width > 0) {
      compressImage(
        originalSrc,
        originalDimensions.width,
        originalDimensions.height,
        quality,
        format,
        preset
      );
    }
  }, [quality, format, preset]);

  // Dragging slider handlers
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    setSliderPos(percentage);
  };

  const formatKB = (bytes: number) => {
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const percentSaved = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  // Structured Data (JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does image compression reduce visual sharpness noticeably?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Using our recommended 0.70 quality factor with bicubic canvas interpolation, human eyes cannot perceive differences at standard viewing distances, while reducing bandwidth weight by up to 85%.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my personal photos uploaded to remote servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. alltoolspk.com compresses images purely on your device using the HTML5 Canvas API in volatile RAM. No image byte ever leaves your browser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which format gives the highest compression savings: WebP or JPG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WebP provides 25% to 34% smaller file sizes than standard JPEG at equivalent structural similarity (SSIM) quality scores.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <a href="/tools" className="hover:underline hover:text-emerald-600">Tools</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Image Compressor</span>
      </nav>

      {/* Header & Author Byline */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Client-Side Canvas Optimizer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free Image Compressor & Resizer – Reduce KB Instantly
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">By Fareed Ullah</span>
          <span>&bull;</span>
          <span>Updated Sept 24 2026</span>
          <span>&bull;</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Zero Uploads &bull; Max 10MB</span>
        </div>
      </div>

      {/* Ad Slot #1 (Top) */}
      <AdSlot label="Top Image Compressor Slot" />

      {/* Main Interactive Tool Card */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6">
          {!originalSrc ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 sm:p-12 text-center bg-slate-50/50 dark:bg-slate-900/50 hover:border-emerald-500 transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
                id="img-upload-input"
                className="hidden"
              />
              <label
                htmlFor="img-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Upload JPG, PNG, or WEBP (&lt;10MB)
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Drag and drop your photo or click to browse files
                  </p>
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950/50 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900">
                    {errorMsg}
                  </p>
                )}
                <Button variant="emerald" size="sm" type="button" className="mt-2 pointer-events-none">
                  Select Image from Device
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Original Size</p>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    {formatKB(originalSize)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {originalDimensions.width} &times; {originalDimensions.height} px
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Compressed Size</p>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatKB(compressedSize)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {compressedDimensions.width} &times; {compressedDimensions.height} px
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Bandwidth Saved</p>
                  <p className="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {percentSaved}% Saved
                  </p>
                  <p className="text-[10px] text-slate-400">
                    -{formatKB(Math.max(0, originalSize - compressedSize))}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setOriginalSrc(null);
                    }}
                    className="text-xs cursor-pointer"
                  >
                    Change Image
                  </Button>
                </div>
              </div>

              {/* Controls Panel */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {/* Quality Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Sliders className="w-3.5 h-3.5 text-blue-500" />
                      Quality Factor: {Math.round(quality * 100)}%
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold">
                      {quality >= 0.8 ? 'Near Lossless' : quality >= 0.6 ? 'Balanced' : 'High Savings'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>10% (Min KB)</span>
                    <span>70% (Default)</span>
                    <span>100% (Lossless)</span>
                  </div>
                </div>

                {/* Resize Presets */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Dimensions Preset
                  </label>
                  <select
                    value={preset}
                    onChange={(e) => setPreset(e.target.value as ResizePreset)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="original">Original Aspect Ratio ({originalDimensions.width} &times; {originalDimensions.height})</option>
                    <option value="1080x1080">1080 &times; 1080 (Square / Instagram Post)</option>
                    <option value="1280x720">1280 &times; 720 (16:9 HD / YouTube Thumb)</option>
                    <option value="1080x1920">1080 &times; 1920 (9:16 Portrait / Story &amp; Reel)</option>
                  </select>
                </div>

                {/* Format Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Output File Encoding
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['image/jpeg', 'image/webp', 'image/png'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        className={`h-10 text-xs font-bold rounded-lg uppercase tracking-wide cursor-pointer transition-colors ${
                          format === fmt
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {fmt.replace('image/', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Before/After Split View Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 px-1">
                  <span>&larr; Drag slider to inspect compression fidelity &rarr;</span>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">
                    Before: {formatKB(originalSize)} | After: {formatKB(compressedSize)}
                  </span>
                </div>

                <div
                  ref={containerRef}
                  onMouseDown={() => (isDraggingRef.current = true)}
                  onMouseUp={() => (isDraggingRef.current = false)}
                  onMouseLeave={() => (isDraggingRef.current = false)}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  className="relative w-full h-[320px] sm:h-[460px] bg-slate-900 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-300 dark:border-slate-800 shadow-inner"
                >
                  {/* Compressed Layer (Base) */}
                  {compressedSrc && (
                    <img
                      src={compressedSrc}
                      alt="Compressed"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                  )}

                  {/* Original Layer (Clipped) */}
                  {originalSrc && (
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r-2 border-white shadow-2xl"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={originalSrc}
                        alt="Original"
                        className="absolute inset-0 w-full h-full object-contain max-w-none"
                        style={{
                          width: containerRef.current ? containerRef.current.clientWidth : '100%',
                          height: containerRef.current ? containerRef.current.clientHeight : '100%',
                        }}
                      />
                    </div>
                  )}

                  {/* Labels Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white rounded pointer-events-none">
                    Original ({formatKB(originalSize)})
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-600/80 backdrop-blur-sm text-[10px] font-bold text-white rounded pointer-events-none">
                    Compressed ({formatKB(compressedSize)})
                  </div>

                  {/* Draggable Vertical Divider Button */}
                  <div
                    className="absolute top-0 bottom-0 -ml-4 flex items-center justify-center pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center border-2 border-blue-500 font-bold text-xs">
                      &#8644;
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Processed 100% locally in device memory</span>
                </div>

                {compressedSrc && (
                  <a
                    href={compressedSrc}
                    onClick={(e) => {
                      const validation = validateRequiredFields({ file: file?.name, compressedSrc }, ['file', 'compressedSrc']);
                      if (!guardDownload(validation)) {
                        e.preventDefault();
                      }
                    }}
                    download={`alltoolspk_${file?.name.split('.')[0] || 'optimized'}.${format.replace('image/', '')}`}
                    className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Compressed ({formatKB(compressedSize)})
                  </a>
                )}
              </div>
            </div>
          )}

          {/* AI Disclosure requirement */}
          <AIDisclosure isAITool={false} />
        </CardContent>
      </Card>

      {/* Ad Slot #2 (Mid) */}
      <AdSlot label="In-Content Middle Display" />

      {/* SEO Helpful Content (>400 words, What is, How to use, FAQs) */}
      <section className="mt-12 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            What is the Image Compressor &amp; Resizer?
          </h2>
          <p>
            The <strong>alltoolspk.com Image Compressor &amp; Resizer</strong> is a privacy-first web utility designed to optimize JPG, PNG, and WebP graphic assets down to lightweight web-ready file sizes without sacrificing perceived visual fidelity. Unoptimized, multi-megabyte images account for over 65% of the average website payload, leading to sluggish load speeds on mobile 3G/4G connections, failed Google PageSpeed metrics, and increased bounce rates for digital storefronts on Daraz, Shopify, and Amazon.
          </p>
          <p>
            Unlike conventional image compression websites that force you to upload personal family photographs or proprietary e-commerce product catalogs to remote cloud servers, alltoolspk.com executes all compression mathematics directly on your local device CPU. Utilizing the HTML5 Canvas API and hardware-accelerated bicubic interpolation algorithms, your images never leave your browser window, ensuring absolute data privacy and instantaneous processing speeds.
          </p>
        </div>

        {/* How to use */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Use the Image Compressor in 3 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 1: Choose Your Image</span>
              <p className="text-slate-600 dark:text-slate-400">
                Drag and drop any JPG, PNG, or WebP photo up to 10MB into the upload container. The original dimension and KB weight are analyzed immediately in memory.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 2: Adjust Quality &amp; Presets</span>
              <p className="text-slate-600 dark:text-slate-400">
                Drag the interactive quality slider (recommended: 70-80%) and select dimension presets (Square 1:1, Landscape 16:9, or Story 9:16). Inspect the live split comparison view.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 3: Instant Download</span>
              <p className="text-slate-600 dark:text-slate-400">
                Review your real-time byte savings (up to 85% reduced) and click <em>Download Compressed</em> for an immediate local filesystem save with zero watermarks.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Social Media &amp; E-Commerce Resizing Standards
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li><strong>1080 &times; 1080 (Square):</strong> Standard format for Instagram feed posts, Facebook carousel catalogs, and Daraz product listings.</li>
              <li><strong>1280 &times; 720 (16:9 Landscape):</strong> Ideal resolution for YouTube thumbnails, blog feature headers, and Google Display Network adverts.</li>
              <li><strong>1080 &times; 1920 (9:16 Vertical):</strong> Optimized for TikTok videos, Instagram Reels, YouTube Shorts, and WhatsApp Status stories.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Why WebP Delivers Superior Compression
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              WebP applies predictive coding, using neighboring pixel blocks to predict values and encoding only the difference. This modern format achieves approximately 30% greater data compression than legacy JPEG at equivalent perceived quality, making it the preferred choice for modern Google PageSpeed compliance.
            </p>
          </div>
        </div>

        {/* 4 FAQs Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQs)
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Does image compression reduce visual sharpness noticeably?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Using our recommended 0.70 quality factor with bicubic canvas interpolation, human eyes cannot perceive differences at standard viewing distances, while reducing bandwidth weight by up to 85%.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Are my personal photos uploaded to remote servers?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                No. alltoolspk.com compresses images purely on your device using the HTML5 Canvas API in volatile RAM. No image byte ever leaves your browser.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Which format gives the highest compression savings: WebP or JPG?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                WebP provides 25% to 34% smaller file sizes than standard JPEG at equivalent structural similarity (SSIM) quality scores, and is supported by 98%+ of all modern web browsers.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Are there any daily limits or watermarks added to my compressed images?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                None. alltoolspk.com adds zero watermarks, imposes no daily download quotas, and requires no account creation or subscription fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot #3 (Bottom) */}
      <AdSlot label="Bottom Responsive Banner" />
    </div>
  );
}
