'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

type FileItem = {
  id: string;
  file: File;
  name: string;
  size: string;
  pages: number;
};

export default function PDFMergerPro() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [merging, setMerging] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const formatSize = (b: number) =>
    b > 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`;

  const handleFiles = async (fileList: FileList | File[]) => {
    const newItems: FileItem[] = [];
    const list = Array.from(fileList);
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) continue;
      try {
        const buf = await f.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        newItems.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          file: f,
          name: f.name,
          size: formatSize(f.size),
          pages: doc.getPageCount(),
        });
      } catch {
        newItems.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          file: f,
          name: f.name,
          size: formatSize(f.size),
          pages: 1,
        });
      }
    }
    if (newItems.length === 0 && list.length > 0) {
      showToast('Please select valid PDF files.');
      return;
    }
    setFiles((prev) => [...prev, ...newItems]);
    showToast(`Added ${newItems.length} PDF file${newItems.length > 1 ? 's' : ''}`);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragOverFile = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragId && dragId !== id) {
      const dragIndex = files.findIndex((x) => x.id === dragId);
      const dropIndex = files.findIndex((x) => x.id === id);
      if (dragIndex === -1 || dropIndex === -1) return;
      const copy = [...files];
      const [moved] = copy.splice(dragIndex, 1);
      copy.splice(dropIndex, 0, moved);
      setFiles(copy);
    }
  };

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const mergePDFs = async () => {
    if (files.length < 2) {
      showToast('Select at least 2 PDFs to merge');
      return;
    }
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const item of files) {
        const buf = await item.file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AllToolsPK_Merged_${files.length}_Files.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Merged ${files.length} PDFs successfully!`);
    } catch (e) {
      console.error('Merge error:', e);
      showToast('Merge failed - PDF might be password-protected or encrypted');
    }
    setMerging(false);
  };

  const totalPages = files.reduce((s, f) => s + f.pages, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-3 md:p-6 text-slate-900 dark:text-slate-100">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            PDF TOOL • 100% FREE & CLIENT-SIDE • NO.1 PRO
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-2 text-slate-900 dark:text-white tracking-tight">
            PDF Merger - Merge PDF 100% Offline (Better than iLovePDF)
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Merge up to 50+ PDFs, reorder by drag-drop, keep 100% quality. No upload to server. 100% private in browser.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
              🛡️ 100% Client-Side
            </span>
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
              ⚡ Instant Processing
            </span>
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-bold">
              🔒 No Files Uploaded
            </span>
            <span className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
              {totalPages} Total Pages • {files.length} Files
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => inputRef.current?.click()}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-2xl p-8 text-center cursor-pointer hover:bg-blue-50/60 dark:hover:bg-slate-800/50 transition-all shadow-sm"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                📄
              </div>
              <p className="font-black mt-3 text-slate-900 dark:text-white">
                Tap to select or Drag & Drop PDFs
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select 2 or more PDFs • Unlimited size • 100% Client-Side • No limits
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="application/pdf"
                hidden
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </div>

            {files.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Selected Files ({files.length}) - Drag to Reorder
                  </h3>
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="text-xs text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-auto pr-1">
                  {files.map((f, idx) => (
                    <div
                      key={f.id}
                      draggable
                      onDragStart={() => setDragId(f.id)}
                      onDragOver={(e) => onDragOverFile(e, f.id)}
                      className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 bg-gray-50 dark:bg-slate-950 cursor-move hover:bg-white dark:hover:bg-slate-900 transition-colors"
                    >
                      <span className="font-bold text-xs bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate text-slate-900 dark:text-white">
                          {f.name}
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                          {f.size} • {f.pages} Pages
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(f.id);
                        }}
                        className="text-red-500 hover:text-red-700 font-bold px-2 py-1 text-xs cursor-pointer"
                        title="Remove file"
                      >
                        ✕
                      </button>
                      <span className="text-gray-400 dark:text-gray-600 text-sm select-none">
                        ≡
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={mergePDFs}
                  disabled={files.length < 2 || merging}
                  className={`w-full mt-4 py-4 rounded-xl font-black text-white text-sm transition-all cursor-pointer ${
                    files.length >= 2 && !merging
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-md'
                      : 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-60'
                  }`}
                >
                  {merging
                    ? 'Merging... Please Wait'
                    : `Merge ${files.length} PDFs & Download • ${totalPages} Pages`}
                </button>
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 mt-2">
                  Real merged PDF • No watermark • No quality loss • Opens in any reader
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200">
              <h2 className="font-black text-lg text-slate-900 dark:text-white">
                About PDF Merger on AllToolsPK
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                PDF Merger on AllToolsPK is a free, privacy-first, client-side tool that merges multiple PDFs into a
                single PDF instantly without uploading files to any server. Unlike iLovePDF that sends your confidential
                documents to cloud servers, our tool runs 100% in your browser using WebAssembly and pdf-lib
                technology. Your PDFs never leave your device, ensuring complete privacy for contracts, resumes, bank
                statements.
              </p>

              <h3 className="font-bold mt-6 text-slate-900 dark:text-white">What is PDF Merger?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                PDF Merger combines 2 or more PDFs into one single PDF. For example, 5 separate PDFs - resume, cover
                letter, certificates, portfolio - merge into one professional document for job applications. Supports
                files up to 100MB per file and can merge 50+ PDFs at once with zero quality loss. Ideal for
                professionals in Pakistan and worldwide who need to combine documents quickly without installing Adobe
                Acrobat. Our version is faster than iLovePDF because no upload/download wait.
              </p>

              <h3 className="font-bold mt-6 text-slate-900 dark:text-white">How to Use?</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-2 list-disc pl-5">
                <li>
                  <b>Step 1: Select PDFs</b> - Click or drag-drop PDFs. All files loaded in browser memory only.
                </li>
                <li>
                  <b>Step 2: Arrange Order</b> - Drag to reorder PDFs as you want in final file. Preview page count.
                </li>
                <li>
                  <b>Step 3: Merge & Download</b> - Click Merge. Merges client-side and downloads final PDF. No
                  watermark, no signup.
                </li>
              </ul>

              <h3 className="font-bold mt-6 text-slate-900 dark:text-white">Key Features</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-disc pl-5">
                <li>100% Client-Side - No file uploaded to server</li>
                <li>Free Forever - No paywall, no limits, no watermark</li>
                <li>Unlimited Merging - Merge 2 to 50+ files at once</li>
                <li>Drag-Drop Reorder - Like iLovePDF pro version</li>
                <li>Preserves Quality - Text, images, formatting same as original</li>
              </ul>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs border border-slate-100 dark:border-slate-700/60">
                  <b>Why Better than iLovePDF?</b> No upload wait, 100% private, no 2-file limit.
                </div>
                <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs border border-slate-100 dark:border-slate-700/60">
                  <b>Is it safe?</b> Yes 100% offline. Files never leave your phone/computer.
                </div>
              </div>
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
