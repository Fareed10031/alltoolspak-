'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { Upload, Image as ImageIcon, FileCheck } from 'lucide-react';

export function ImageToPdfTool() {
  const tool = TOOLS.find((t) => t.slug === 'image-to-pdf') || {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    desc: 'Convert JPG/PNG images to high quality PDF, no quality loss.',
    tag: 'Convert',
    colorIndex: 3,
  };

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; name: string } | null>(
    null
  );

  const handleImageUploaded = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageSrc(url);
      setImageMeta({
        width: img.width,
        height: img.height,
        name: file.name.replace(/\.[^/.]+$/, ''),
      });
      setForm((prev) => ({
        ...prev,
        hasImage: 'true',
        documentTitle: prev.documentTitle || file.name.replace(/\.[^/.]+$/, ''),
      }));
    };
  };

  const generateImagePdf = (form: Record<string, any>) => {
    if (!imageSrc || !imageMeta) {
      alert('Please upload an image first.');
      return;
    }

    const orientation = imageMeta.width > imageMeta.height ? 'landscape' : 'portrait';
    const doc = new jsPDF({
      orientation,
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Scale image while preserving aspect ratio with padding
    const padding = 36;
    const maxWidth = pageWidth - padding * 2;
    const maxHeight = pageHeight - padding * 2;

    const imgRatio = imageMeta.width / imageMeta.height;
    let renderWidth = maxWidth;
    let renderHeight = renderWidth / imgRatio;

    if (renderHeight > maxHeight) {
      renderHeight = maxHeight;
      renderWidth = renderHeight * imgRatio;
    }

    const x = (pageWidth - renderWidth) / 2;
    const y = (pageHeight - renderHeight) / 2;

    doc.addImage(imageSrc, 'JPEG', x, y, renderWidth, renderHeight);

    const safeTitle = (form.documentTitle || imageMeta.name || 'Converted_Image')
      .trim()
      .replace(/\s+/g, '_');
    doc.save(`${safeTitle}.pdf`);
  };

  return (
    <ProToolBase
      tool={tool}
      required={['hasImage', 'documentTitle']}
      initialState={{
        hasImage: '',
        documentTitle: '',
      }}
      render={(form, setForm) => (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
            <input
              type="file"
              id="image-to-pdf-input"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => handleImageUploaded(e, setForm)}
              className="hidden"
            />
            <label
              htmlFor="image-to-pdf-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {imageMeta ? imageMeta.name : 'Click to select JPG, PNG, or WebP'}
                </p>
                <p className="text-xs text-slate-500">
                  High-resolution photo, scan, or graphic • 100% Client-Side
                </p>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Output PDF Document Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Scanned_Receipt or Portfolio_Cover"
              value={form.documentTitle || ''}
              onChange={(e) => setForm({ ...form, documentTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {imageSrc && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span className="text-xs font-bold text-slate-500 block mb-2">Image Preview</span>
              <div className="h-56 flex items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                <img src={imageSrc} alt="Preview" className="max-h-full object-contain" />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Dimensions: {imageMeta?.width}px × {imageMeta?.height}px • Auto-scaled to standard A4 page
              </p>
            </div>
          )}
        </div>
      )}
      generateFile={generateImagePdf}
    />
  );
}

export default ImageToPdfTool;
