'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { Upload, Image as ImageIcon, Trash2, Plus, FileText, CheckCircle2 } from 'lucide-react';

interface UploadedImageItem {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  width: number;
  height: number;
}

export function ImageToPdfTool() {
  const tool = TOOLS.find((t) => t.slug === 'image-to-pdf') || {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    desc: 'Convert JPG/PNG images to high quality PDF, no quality loss.',
    tag: 'Convert',
    colorIndex: 3,
  };

  const [images, setImages] = useState<UploadedImageItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImagesUploaded = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    setErrorMessage('');
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter only image files
    const validImageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validImageFiles.length === 0) {
      setErrorMessage('Please select valid image files (JPG, PNG, WebP).');
      e.target.value = '';
      return;
    }

    const newItems: UploadedImageItem[] = [];
    let processedCount = 0;

    validImageFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          file,
          name: file.name.replace(/\.[^/.]+$/, ''),
          size: file.size,
          previewUrl: url,
          width: img.naturalWidth || img.width || 800,
          height: img.naturalHeight || img.height || 600,
        });

        processedCount += 1;
        if (processedCount === validImageFiles.length) {
          setImages((prev) => {
            const updated = [...prev, ...newItems];
            setForm((formPrev) => ({
              ...formPrev,
              hasImage: updated.length > 0 ? 'true' : '',
              imageCount: updated.length,
              documentTitle:
                formPrev.documentTitle || updated[0]?.name || 'Converted_Document',
            }));
            return updated;
          });
        }
      };
      img.onerror = () => {
        processedCount += 1;
        if (processedCount === validImageFiles.length && newItems.length > 0) {
          setImages((prev) => {
            const updated = [...prev, ...newItems];
            setForm((formPrev) => ({
              ...formPrev,
              hasImage: updated.length > 0 ? 'true' : '',
              imageCount: updated.length,
              documentTitle:
                formPrev.documentTitle || updated[0]?.name || 'Converted_Document',
            }));
            return updated;
          });
        }
      };
    });

    // Reset input value so user can re-select same file or add more on mobile
    e.target.value = '';
  };

  const removeImage = (
    id: string,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      const updated = prev.filter((item) => item.id !== id);
      setForm((formPrev) => ({
        ...formPrev,
        hasImage: updated.length > 0 ? 'true' : '',
        imageCount: updated.length,
      }));
      return updated;
    });
  };

  const generateImagePdf = (form: Record<string, any>) => {
    if (images.length === 0) {
      setErrorMessage('Please upload at least one image to convert to PDF.');
      return;
    }

    const firstImg = images[0];
    const initialOrientation =
      firstImg.width > firstImg.height ? 'landscape' : 'portrait';

    const doc = new jsPDF({
      orientation: initialOrientation,
      unit: 'pt',
      format: 'a4',
    });

    images.forEach((imgItem, index) => {
      if (index > 0) {
        const orientation =
          imgItem.width > imgItem.height ? 'landscape' : 'portrait';
        doc.addPage('a4', orientation);
      }

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const padding = 28;
      const maxWidth = pageWidth - padding * 2;
      const maxHeight = pageHeight - padding * 2;

      const imgRatio = imgItem.width / imgItem.height;
      let renderWidth = maxWidth;
      let renderHeight = renderWidth / imgRatio;

      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = renderHeight * imgRatio;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      // Add image to current PDF page
      doc.addImage(imgItem.previewUrl, 'JPEG', x, y, renderWidth, renderHeight);
    });

    const safeTitle = (
      form.documentTitle ||
      images[0]?.name ||
      'Converted_Document'
    )
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    doc.save(`${safeTitle}.pdf`);
  };

  return (
    <ProToolBase
      tool={tool}
      required={['hasImage', 'documentTitle']}
      initialState={{
        hasImage: '',
        documentTitle: '',
        imageCount: 0,
      }}
      render={(form, setForm) => (
        <div className="space-y-6">
          {/* File Upload Box - Mobile Optimized */}
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
            <input
              type="file"
              id="image-to-pdf-input"
              accept="image/png, image/jpeg, image/webp, image/*"
              multiple
              onChange={(e) => handleImagesUploaded(e, setForm)}
              className="hidden"
            />
            <label
              htmlFor="image-to-pdf-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3 min-h-[140px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  {images.length > 0
                    ? `Tap to add more photos (${images.length} selected)`
                    : 'Tap to select photos or scans'}
                </p>
                <p className="text-xs text-slate-500">
                  Supports multiple JPG, PNG, or WebP &bull; Combines into multi-page PDF &bull; 100% Client-Side
                </p>
              </div>
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Output PDF Document Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Scanned_Receipts or Meeting_Notes"
              value={form.documentTitle || ''}
              onChange={(e) => setForm({ ...form, documentTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Uploaded Images List with Preview Cards */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Selected Images ({images.length} pages)</span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready to compile into PDF
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={img.previewUrl}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        Page {idx + 1}: {img.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {img.width}×{img.height}px &bull; {(img.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id, setForm)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      generateFile={generateImagePdf}
    />
  );
}

export default ImageToPdfTool;
