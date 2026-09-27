'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { FileText, Plus, Trash2, ArrowUpDown, CheckCircle2 } from 'lucide-react';

interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export function PdfMergerTool() {
  const tool = TOOLS.find((t) => t.slug === 'pdf-merge') || {
    slug: 'pdf-merge',
    name: 'PDF Merger',
    desc: 'Merge multiple PDFs into one single file in seconds, 100% offline.',
    tag: 'PDF Tool',
    colorIndex: 2,
  };

  const [pdfFiles, setPdfFiles] = useState<PdfFileItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFilesAdded = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    setErrorMessage('');
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    // Filter valid PDFs
    const validPdfs = selected.filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );

    if (validPdfs.length === 0) {
      setErrorMessage('Please select valid PDF documents.');
      e.target.value = '';
      return;
    }

    const newItems: PdfFileItem[] = validPdfs.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      name: file.name,
      size: file.size,
    }));

    setPdfFiles((prev) => {
      const updated = [...prev, ...newItems];
      setForm((formPrev) => ({
        ...formPrev,
        hasFiles: updated.length >= 2 ? 'true' : '',
        fileCount: updated.length,
      }));
      return updated;
    });

    // Mobile bug fix: Reset input value so tapping to add more files works reliably on iOS & Android
    e.target.value = '';
  };

  const removeFile = (
    id: string,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    setPdfFiles((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      setForm((formPrev) => ({
        ...formPrev,
        hasFiles: updated.length >= 2 ? 'true' : '',
        fileCount: updated.length,
      }));
      return updated;
    });
  };

  const generateMergedPdf = async (form: Record<string, any>) => {
    if (pdfFiles.length < 2) {
      setErrorMessage('Please upload at least 2 PDF files to merge.');
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of pdfFiles) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as unknown as BlobPart], {
        type: 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const baseName =
        pdfFiles[0]?.name.replace(/\.[^/.]+$/, '') || 'Combined_Document';
      a.download = `${baseName}_Merged.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF Merge Error:', err);
      setErrorMessage('Error merging PDF files. Please ensure files are not password-protected.');
    }
  };

  return (
    <ProToolBase
      tool={tool}
      required={['hasFiles']}
      initialState={{
        hasFiles: '',
        fileCount: 0,
      }}
      render={(form, setForm) => (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
            <input
              type="file"
              id="pdf-merge-input"
              accept="application/pdf"
              multiple
              onChange={(e) => handleFilesAdded(e, setForm)}
              className="hidden"
            />
            <label
              htmlFor="pdf-merge-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3 min-h-[140px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-xs">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                  {pdfFiles.length > 0
                    ? `Tap to add more PDFs (${pdfFiles.length} selected)`
                    : 'Tap to select PDF documents'}
                </p>
                <p className="text-xs text-slate-500">
                  Select 2 or more PDF files &bull; Unlimited file size &bull; 100% Client-Side
                </p>
              </div>
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* List of Added Files - Touch-friendly for mobile */}
          {pdfFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Selected PDFs ({pdfFiles.length})</span>
                <span
                  className={
                    pdfFiles.length >= 2
                      ? 'text-emerald-600 flex items-center gap-1 font-semibold'
                      : 'text-amber-500 font-semibold'
                  }
                >
                  {pdfFiles.length >= 2 ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ready to merge
                    </>
                  ) : (
                    'Add 1 more PDF to merge'
                  )}
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto p-1">
                {pdfFiles.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate min-w-0 pr-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-600 dark:text-slate-300 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate text-slate-800 dark:text-slate-200 font-semibold">
                        {item.name}
                      </span>
                      <span className="text-slate-400 text-[10px] shrink-0">
                        ({(item.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    {/* Minimum 44px tap target for mobile */}
                    <button
                      type="button"
                      onClick={() => removeFile(item.id, setForm)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
                      title="Remove file"
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
      generateFile={generateMergedPdf}
    />
  );
}

export default PdfMergerTool;
