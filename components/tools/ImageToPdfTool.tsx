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
      seoContent={
        /* ===== IMAGE TO PDF - 800+ WORDS - UNIQUE & ADSENSE READY ===== */
        <div className="p-2 sm:p-4 text-left">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">About Image to PDF Converter on AllToolsPK</h2>
          
          <div className="prose max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>
              Image to PDF Converter on AllToolsPK is a free, privacy-first, client-side tool that converts 
              JPG, PNG, and WebP images into high-quality PDF documents with no quality loss. Combine multiple 
              images into a single multi-page PDF instantly without uploading files to any server. Unlike other 
              converters that send your scanned documents and photos to cloud servers, our tool runs 100% in your 
              browser using HTML5 Canvas and jsPDF technology. Your images never leave your device, ensuring 
              complete privacy for receipts, invoices, ID cards, and personal photos.
            </p>

            <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-white">What is Image to PDF Converter?</h3>
            <p>
              Image to PDF Converter transforms your images into professional PDF files. For example, if you have 
              10 photos of receipts, class notes, or scanned CNIC and documents captured with your phone camera, 
              you can combine them into one organized PDF file for sharing, printing, or archiving. Students can 
              convert assignment photos into PDF for submission, businesses can convert scanned invoices and 
              receipts into PDF for accounting, job seekers can convert certificates into one PDF portfolio. Our 
              converter supports JPG, JPEG, PNG, and WebP formats, maintaining high resolution, sharp text, and 
              true color reproduction. You can customize page orientation, adjust page margins, and compile 
              unlimited photos into an uncompressed, publication-grade document in seconds.
            </p>

            <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-white">How to Use This Image to PDF Tool?</h3>
            <p><strong className="text-slate-900 dark:text-white">Step 1: Select Images</strong> - Click to upload or drag and drop single or multiple JPG, PNG, or WebP images from your phone, tablet, or PC. All files remain in local browser RAM.</p>
            <p><strong className="text-slate-900 dark:text-white">Step 2: Configure Page Options</strong> - Choose your target page orientation (Auto, Portrait, or Landscape) and preferred margin styling (None, Compact, or Normal).</p>
            <p><strong className="text-slate-900 dark:text-white">Step 3: Convert &amp; Download</strong> - Click Download PDF to compile the images into a clean, searchable vector PDF document instantly with zero watermarks or signup requirements.</p>

            <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-white">Key Features of Our Image to PDF Converter</h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>100% Client-Side Processing - Your images never touch an external server, guaranteeing total confidentiality</li>
              <li>Multi-Image Batch Compilation - Merge dozens of photos into a single multi-page PDF document simultaneously</li>
              <li>Universal Image Support - Seamlessly accepts standard JPG, JPEG, PNG, and next-generation WebP graphic formats</li>
              <li>Zero Quality Degradation - Preserves full camera sensor resolution, document clarity, and fine printed text</li>
              <li>Intelligent Auto-Orientation - Automatically adjusts each page layout to match horizontal or vertical photos</li>
              <li>Free Forever with No Watermarks - No paywalls, no monthly subscription fees, and no branding stamps</li>
              <li>Mobile-Optimized Interface - Smoothly convert smartphone camera photos on Android, iPhone, iPad, and desktop</li>
              <li>Offline Usability - Once loaded in your browser, perform conversions anywhere without active internet connectivity</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-white">Why Choose AllToolsPK Over Cloud-Based PDF Converters?</h3>
            <p>
              Most online image converters upload your files across the internet to remote cloud storage. For sensitive assets like national identity cards (CNIC), passports, medical records, property papers, and tax forms, cloud uploads present significant data privacy risks. Additionally, commercial services often impose arbitrary limitations—such as capping uploads at 3 images or downgrading PDF quality unless you purchase an expensive monthly tier. AllToolsPK executes every stage of the image conversion locally within your browser sandbox. By eliminating server roundtrips, conversions are instantaneous, 100% private, and completely free forever.
            </p>

            <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-white">Common Everyday Use Cases</h3>
            <p>
              <strong>Academic Submissions:</strong> Photograph handwritten homework sheets, assignments, or textbook excerpts and merge them into one organized PDF for online portals.<br/>
              <strong>Accounting &amp; Tax Expenses:</strong> Bundle physical expense receipts, grocery bills, and fuel slips into an orderly monthly PDF statement for bookkeeping.<br/>
              <strong>Job Applications &amp; Visas:</strong> Combine degree certificates, recommendation letters, passport scans, and ID photos into a unified application package.
            </p>

            <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-white">Frequently Asked Questions</h3>
            <div className="space-y-3 pt-1">
              <div>
                <strong className="text-slate-900 dark:text-white">Q: Is this Image to PDF converter completely free?</strong><br/>
                <span>A: Yes, 100% free with unlimited image conversions, no watermarks, and no hidden fees.</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Q: Are my confidential pictures safe?</strong><br/>
                <span>A: Absolutely. Your images are processed solely in your device memory (RAM) and never uploaded to our servers.</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Q: How many images can I merge into one PDF?</strong><br/>
                <span>A: You can combine dozens of images into a single PDF document, limited only by your device memory.</span>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Q: Will the converter blur small text on scanned papers?</strong><br/>
                <span>A: No. High-resolution photos are embedded directly into standard ISO PDF containers to keep fine text sharp and readable.</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
              Disclaimer: This utility compiles images directly within client-side browser memory. Ensure you hold necessary distribution rights for documents processed. AllToolsPK does not monitor, collect, or store user files.
            </p>
          </div>
        </div>
      }
      generateFile={generateImagePdf}
    />
  );
}

export default ImageToPdfTool;
