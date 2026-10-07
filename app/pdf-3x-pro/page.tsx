"use client";
import React, { useState } from 'react';

export default function Page() {
  const [mode, setMode] = useState<'pdf2word' | 'compress' | 'word2pdf'>('pdf2word');
  const [log, setLog] = useState('');

  const down = (b: any, n: string) => {
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = u;
    a.download = n;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  };

  const run = async (e: any) => {
    const f = e.target.files[0];
    if (!f) return;
    setLog('Processing ' + f.name + '...');

    try {
      if (mode === 'pdf2word') {
        const pdfjs = (window as any).pdfjsLib;
        if (!pdfjs) throw new Error('PDF.js engine initializing, please retry.');

        const docxLib = (window as any).docx;
        if (!docxLib) throw new Error('Word generation engine initializing, please retry.');

        const { Document, Packer, Paragraph, TextRun } = docxLib;
        const data = await f.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data }).promise;
        let all = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          setLog('Reading page ' + i + '/' + pdf.numPages);
          const page = await pdf.getPage(i);
          const txt = await page.getTextContent();
          const str = txt.items.map((it: any) => it.str).join(' ');
          all += str + '\n';
        }

        // IF SCANNED CV THEN OCR
        if (all.trim().length < 150) {
          setLog('Scanned CV found, High-Quality OCR running (15 sec)...');
          const T = (window as any).Tesseract;
          let ocr = '';

          for (let i = 1; i <= pdf.numPages; i++) {
            setLog('OCR scanning page ' + i + '/' + pdf.numPages + '...');
            const page = await pdf.getPage(i);
            const vp = page.getViewport({ scale: 2.5 });
            const c = document.createElement('canvas');
            c.width = vp.width;
            c.height = vp.height;
            const ctx = c.getContext('2d');
            if (ctx) {
              await page.render({ canvasContext: ctx, viewport: vp }).promise;
              if (T?.recognize) {
                const r = await T.recognize(c, 'eng');
                ocr += (r?.data?.text || '') + '\n';
              }
            }
          }
          if (ocr.trim()) {
            all = ocr;
          }
        }

        if (!all.trim()) throw new Error('No text found in document');

        const paras = all
          .split('\n')
          .filter((l: string) => l.trim())
          .map((l: string) => new Paragraph({ children: [new TextRun({ text: l, size: 24 })], spacing: { after: 120 } }));

        const doc = new Document({ sections: [{ children: paras }] });
        const blob = await Packer.toBlob(doc);
        down(blob, f.name.replace(/\.pdf$/i, '') + '.docx');
        setLog('✅ 100% Done - ' + all.length + ' chars extracted - Downloaded!');
      }

      if (mode === 'compress') {
        const PDFLib = (window as any).PDFLib;
        if (!PDFLib?.PDFDocument) throw new Error('PDFLib engine initializing, please retry.');

        const d = await PDFLib.PDFDocument.load(await f.arrayBuffer());
        const out = await d.save({ useObjectStreams: true, addDefaultPage: false, objectsPerTick: 50 });
        down(new Blob([out as unknown as BlobPart], { type: 'application/pdf' }), 'compressed-' + f.name);
        setLog(`✅ Compressed! ${(f.size / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`);
      }

      if (mode === 'word2pdf') {
        const mammoth = (window as any).mammoth;
        if (!mammoth) throw new Error('Mammoth engine initializing, please retry.');

        const jspdfModule = (window as any).jspdf;
        if (!jspdfModule?.jsPDF) throw new Error('jsPDF engine initializing, please retry.');

        const r = await mammoth.extractRawText({ arrayBuffer: await f.arrayBuffer() });
        const doc = new jspdfModule.jsPDF();
        doc.text(doc.splitTextToSize(r.value || '', 180), 10, 10);
        doc.save(f.name.replace(/\.docx?$/i, '') + '.pdf');
        setLog('✅ Word to PDF Done!');
      }
    } catch (er: any) {
      setLog('Error: ' + er.message);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-4 text-slate-900">
      <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
        <h1 className="text-2xl font-black text-center text-slate-900">PDF 3X Pro - Convert | Compress | Create</h1>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <button
            type="button"
            onClick={() => {
              setMode('pdf2word');
              setLog('');
            }}
            className={`p-3 rounded-xl border font-bold transition-all cursor-pointer ${
              mode === 'pdf2word' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            PDF to Word
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('compress');
              setLog('');
            }}
            className={`p-3 rounded-xl border font-bold transition-all cursor-pointer ${
              mode === 'compress' ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            Compress PDF
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('word2pdf');
              setLog('');
            }}
            className={`p-3 rounded-xl border font-bold transition-all cursor-pointer ${
              mode === 'word2pdf' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            Word to PDF
          </button>
        </div>
        <div className="border-2 border-dashed border-blue-500 rounded-xl p-6 mt-4 text-center bg-blue-50/40">
          <input
            type="file"
            id="ff"
            hidden
            accept={mode === 'word2pdf' ? '.docx,.doc' : '.pdf'}
            onChange={run}
          />
          <button
            type="button"
            onClick={() => document.getElementById('ff')?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-xl font-bold cursor-pointer transition-all shadow-md active:scale-[0.99]"
          >
            Select File
          </button>
          {log && <p className="mt-3 font-bold text-blue-700 text-sm">{log}</p>}
          <p className="text-xs text-slate-400 mt-2">
            🔒 100% Client-Side Processing • Your files never leave your device
          </p>
        </div>
      </div>
    </div>
  );
}
