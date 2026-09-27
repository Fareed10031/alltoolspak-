'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { FileText, Plus, Trash2, ArrowUpDown } from 'lucide-react';

export function PdfMergerTool() {
  const tool = TOOLS.find((t) => t.slug === 'pdf-merge') || {
    slug: 'pdf-merge',
    name: 'PDF Merger',
    desc: 'Merge multiple PDFs into one single file in seconds, 100% offline.',
    tag: 'PDF Tool',
    colorIndex: 2,
  };

  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleFilesAdded = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    const updated = [...pdfFiles, ...selected];
    setPdfFiles(updated);

    setForm((prev) => ({
      ...prev,
      hasFiles: updated.length >= 2 ? 'true' : '',
      fileCount: updated.length,
    }));
  };

  const removeFile = (
    index: number,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => {
    const updated = pdfFiles.filter((_, i) => i !== index);
    setPdfFiles(updated);
    setForm((prev) => ({
      ...prev,
      hasFiles: updated.length >= 2 ? 'true' : '',
      fileCount: updated.length,
    }));
  };

  const generateMergedPdf = async (form: Record<string, any>) => {
    if (pdfFiles.length < 2) {
      alert('Please upload at least 2 PDF files to merge.');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes as unknown as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = pdfFiles[0]?.name.replace(/\.[^/.]+$/, '') || 'document';
    a.download = `${baseName}_Merged.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
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
              className="cursor-pointer flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shadow-xs">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Click to add PDF documents
                </p>
                <p className="text-xs text-slate-500">
                  Select 2 or more PDF files • Unlimited file size • 100% Client-Side
                </p>
              </div>
            </label>
          </div>

          {/* List of Added Files */}
          {pdfFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Selected PDFs ({pdfFiles.length})</span>
                <span className={pdfFiles.length >= 2 ? 'text-emerald-600' : 'text-amber-500'}>
                  {pdfFiles.length >= 2
                    ? '✓ Ready to merge'
                    : 'Add at least 1 more file to unlock merge'}
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {pdfFiles.map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {idx + 1}
                      </span>
                      <span className="truncate text-slate-800 dark:text-slate-200 font-semibold">
                        {file.name}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx, setForm)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
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
