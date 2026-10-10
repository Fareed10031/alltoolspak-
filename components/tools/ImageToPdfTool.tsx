'use client';

import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Upload, Trash2, ArrowUp, ArrowDown, FileText, CheckCircle2, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export type ImageItem = {
  id: string;
  file: File;
  dataUrl: string;
  width: number;
  height: number;
  format: 'JPEG' | 'PNG';
};

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
    img.onerror = () => res({ width: 800, height: 600 });
    img.src = dataUrl;
  });
}

export function ImageToPDFPro() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [title, setTitle] = useState('AllToolsPK_HD_Document');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileList = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileList.length === 0) {
      showToast('Please select valid JPG, PNG, or WebP image files.');
      return;
    }

    setIsProcessing(true);
    const newImages: ImageItem[] = [];

    for (const file of fileList) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const dims = await getImageDimensions(dataUrl);
        // Preserve original format for max quality
        const isPng = file.type.includes('png') || file.type.includes('webp');
        newImages.push({
          id: Math.random().toString(36).substring(7) + '-' + Date.now(),
          file,
          dataUrl,
          width: dims.width,
          height: dims.height,
          format: isPng ? 'PNG' : 'JPEG',
        });
      } catch (err) {
        console.error('Failed to read image:', err);
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    setIsProcessing(false);
    showToast(`Added ${newImages.length} image${newImages.length > 1 ? 's' : ''} with 100% quality preserved!`);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === images.length - 1) return;

    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  const generatePDF = () => {
    if (images.length === 0) {
      showToast('Please upload at least one image to convert to PDF.');
      return;
    }

    try {
      // First page size = first image size - PRO feature for 100% quality
      const first = images[0];
      const pdf = new jsPDF({
        unit: 'px',
        format: [first.width, first.height],
        orientation: first.width > first.height ? 'landscape' : 'portrait',
        compress: false, // Important: No PDF compression
      });

      images.forEach((img, index) => {
        if (index > 0) {
          // Each page size = its image size - 100% correct result, no cropping
          pdf.addPage([img.width, img.height], img.width > img.height ? 'l' : 'p');
        }
        // QUALITY 100% - NO COMPRESSION, ORIGINAL SIZE
        // 'NONE' = No compression, best quality. iLovePDF uses 'FAST'
        pdf.addImage(
          img.dataUrl,
          img.format,
          0,
          0,
          img.width,
          img.height,
          undefined,
          'NONE' // Key for HD quality
        );
      });

      const safeTitle = (title || 'AllToolsPK_HD').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`${safeTitle}.pdf`);
      showToast('HD PDF generated and downloaded successfully!');
    } catch (err: any) {
      console.error(err);
      showToast(`Error generating PDF: ${err?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 transition-colors">
      {/* Tool Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              HD PRO BUILD
            </span>
            <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full">
              ✓ 100% Uncompressed
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            100% Private &bull; In-Browser
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Image to PDF - HD Pro (Better than iLovePDF)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          100% Client-Side &bull; No Quality Loss &bull; Original Size &bull; Multi-Page JPG, PNG &amp; WebP
        </p>

        {/* Drag & Drop Upload Box */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="mt-6 border-2 border-dashed border-blue-400 dark:border-blue-700 hover:border-blue-600 dark:hover:border-blue-500 rounded-2xl p-8 sm:p-12 text-center bg-blue-50/30 dark:bg-slate-800/40 cursor-pointer transition-all shadow-xs"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md mb-3">
            <Upload className="w-7 h-7" />
          </div>
          <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
            {images.length > 0 ? `Add More Photos (${images.length} Selected)` : 'Tap to select or Drag & Drop Images'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supports JPG, PNG, WebP &bull; Multi Page &bull; Zero Server Uploads &bull; Max 1:1 Pixel Clarity
          </p>
          {isProcessing && (
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-3 animate-pulse">
              Processing image dimensions &amp; colors...
            </p>
          )}
        </div>

        {/* Preview + Reorder Grid */}
        {images.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                Pages ({images.length}) &bull; Reorder or Delete
              </span>
              <button
                type="button"
                onClick={() => setImages([])}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-bold cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 relative flex flex-col shadow-xs"
                >
                  <div className="w-full h-32 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center relative mb-2">
                    <img
                      src={img.dataUrl}
                      alt={`Page ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Page {i + 1}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 font-medium px-0.5">
                    <span className="font-bold">{img.width}×{img.height}</span>
                    <span className="bg-slate-200 dark:bg-slate-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                      {img.format}
                    </span>
                  </div>

                  {/* Reorder Up/Down + Delete Buttons */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(i, 'up');
                        }}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-slate-600 dark:text-slate-300"
                        title="Move Page Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={i === images.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(i, 'down');
                        }}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-slate-600 dark:text-slate-300"
                        title="Move Page Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImages(images.filter((x) => x.id !== img.id));
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-0.5 rounded font-black cursor-pointer shadow-xs transition-colors"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Output Title */}
        <div className="mt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Output PDF Title (Optional)
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Receipts or Scanned_Notes"
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 rounded-xl mt-1.5 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Download Action Button */}
        <button
          onClick={generatePDF}
          disabled={images.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl mt-4 font-black text-sm sm:text-base shadow-md transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer"
        >
          {images.length === 0
            ? 'Upload Images to Generate PDF'
            : `Download HD PDF - ${images.length} Page${images.length > 1 ? 's' : ''} - 100% Quality`}
        </button>

        {/* Pro Feature Callouts */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 grid sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Original Quality:</strong> Zero recompression, pixel data copied 1:1 without blurring fine text.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Native Page Size:</strong> Page adapts to each photo size (not forced to A4) — no cropping or borders.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Total Privacy:</strong> 100% client-side memory execution — no pictures uploaded to any server.</span>
          </div>
        </div>
      </div>

      {/* SEO & Educational Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mt-6 shadow-sm leading-relaxed text-sm text-slate-700 dark:text-slate-300">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
          About Image to PDF HD Pro Converter
        </h2>
        <p className="mb-4">
          AllToolsPK Image to PDF HD Pro is an uncompromising, privacy-first converter engineered for professionals, students, and businesses who demand exact image clarity. Traditional cloud-based converters like iLovePDF recompress photos with aggressive lossy compression algorithms, degrading fine handwriting, small receipt numbers, and official stamps. Our HD engine uses uncompressed pixel transport (`compress: false` &amp; `NONE` sampling) so that every pixel captured by your camera sensor is preserved at 100% fidelity.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2">
          Why HD Pro Quality is Superior
        </h3>
        <ul className="list-disc pl-5 space-y-1.5 mb-4">
          <li><strong>No Arbitrary A4 Cropping:</strong> Each PDF page dynamically matches the exact width and height of each image, ensuring receipts, panoramic captures, and square scans are never forced into awkward letter ratios.</li>
          <li><strong>Zero Compression Artifacts:</strong> JPEG and PNG streams are injected directly into standard ISO PDF containers without JPEG re-encoding generational loss.</li>
          <li><strong>Completely Free &amp; Offline Capable:</strong> No watermark stamps, no 3-image limits, and no subscriptions. Everything executes in your device RAM.</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2">
          How to Convert Images to PDF in 3 Steps
        </h3>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li><strong>Select or Drop Images:</strong> Add single or multiple JPG, PNG, or WebP files from your phone, tablet, or computer.</li>
          <li><strong>Arrange Pages:</strong> Reorder pages using the arrow controls or delete unwanted scans with a single tap.</li>
          <li><strong>Download HD PDF:</strong> Enter a custom document title and click Download HD PDF for an instant download.</li>
        </ol>
      </div>

      {/* Toast Notification */}
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

export { ImageToPDFPro as ImageToPdfTool };
export default ImageToPDFPro;
