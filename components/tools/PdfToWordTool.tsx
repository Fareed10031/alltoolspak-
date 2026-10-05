'use client';

import React, { useEffect, useState, useRef } from 'react';

export function PdfToWordTool() {
  const [docxReady, setDocxReady] = useState(false);
  const [fillPercent, setFillPercent] = useState(0);
  const [txText, setTxText] = useState('');
  const [isOk, setIsOk] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFileName, setDownloadFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If libraries already exist
    if ((window as any).docx && (window as any).pdfjsLib) {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      setDocxReady(true);
      return;
    }

    const loadPdfJs = () => {
      if ((window as any).pdfjsLib) {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        loadDocx();
        return;
      }
      const existingPdf = document.querySelector('script[src*="pdf.min.js"]');
      if (existingPdf) {
        existingPdf.addEventListener('load', () => {
          (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          loadDocx();
        });
        return;
      }

      const sPdf = document.createElement('script');
      sPdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      sPdf.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        loadDocx();
      };
      document.head.appendChild(sPdf);
    };

    const loadDocx = () => {
      if ((window as any).docx) {
        setDocxReady(true);
        return;
      }
      const existingDocx = document.querySelector('script[src*="docx@7.8.2"]');
      if (existingDocx) {
        existingDocx.addEventListener('load', () => setDocxReady(true));
        return;
      }

      const s = document.createElement('script');
      s.src = 'https://unpkg.com/docx@7.8.2/build/index.js';
      s.onload = () => {
        setDocxReady(true);
      };
      document.head.appendChild(s);
    };

    loadPdfJs();
  }, []);

  const go = async (f: File) => {
    if (!docxReady) {
      alert('Wait 2 sec engine loading');
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      alert('Max 50MB');
      return;
    }

    setIsOk(false);
    setFillPercent(10);
    setTxText('Reading...');

    try {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      let paragraphs: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let line = '';
        content.items.forEach((item: any) => {
          line += item.str + ' ';
          if (item.hasEOL) {
            paragraphs.push(line);
            line = '';
          }
        });
        if (line) paragraphs.push(line);
        paragraphs.push(''); // page break
        setFillPercent(10 + Math.round((i / pdf.numPages) * 80));
        setTxText(`Reading page ${i}/${pdf.numPages}`);
      }

      // Remove empty start
      paragraphs = paragraphs.filter((p) => p.trim() !== '');
      if (paragraphs.length === 0) {
        throw new Error('This CV is image/scan PDF. No text found to extract.');
      }

      const docx = (window as any).docx;
      const doc = new docx.Document({
        sections: [
          {
            children: paragraphs.map(
              (t: string) =>
                new docx.Paragraph({
                  children: [new docx.TextRun({ text: t, size: 22 })],
                  spacing: { after: 100 },
                })
            ),
          },
        ],
      });

      const blob = await docx.Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadFileName(f.name.replace(/\.pdf$/i, '.docx'));
      setIsOk(true);
      setFillPercent(100);
      setTxText(`Done 100% - All ${paragraphs.length} lines extracted`);
    } catch (e: any) {
      alert('Error: ' + e.message);
      setFillPercent(0);
      setTxText('');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700 }}>
        PDF to Word - Fixed for CV / Resume
      </h2>
      <p
        id="st"
        style={{
          textAlign: 'center',
          color: docxReady ? '#10B981' : '#2563EB',
          fontWeight: 'bold',
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {docxReady ? '✅ Ready - Now Select PDF' : '⏳ Loading Engine... 3 sec'}
      </p>

      <div
        className="box"
        id="drop"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files[0]) go(e.dataTransfer.files[0]);
        }}
        style={{
          border: '3px dashed #2563EB',
          borderRadius: 16,
          padding: 40,
          textAlign: 'center',
          background: isDragOver ? '#EFF4FF' : '#F8FAFF',
        }}
      >
        <input
          type="file"
          id="f"
          ref={fileInputRef}
          accept="application/pdf"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              go(e.target.files[0]);
            }
          }}
        />
        <div style={{ fontSize: 40 }}>📄 → 📝</div>
        <h3 style={{ marginTop: 10 }}>Select Your CV / Resume PDF</h3>
        <button
          className="btn"
          id="btn"
          type="button"
          disabled={!docxReady}
          onClick={() => fileInputRef.current?.click()}
          style={{
            background: docxReady ? '#2563EB' : '#9CA3AF',
            color: '#fff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: docxReady ? 'pointer' : 'not-allowed',
            marginTop: 12,
          }}
        >
          {docxReady ? 'Select PDF' : 'Loading...'}
        </button>

        <div
          className="bar"
          style={{
            height: 10,
            background: '#eee',
            borderRadius: 10,
            marginTop: 15,
            overflow: 'hidden',
          }}
        >
          <div
            id="fill"
            style={{
              height: '100%',
              width: `${fillPercent}%`,
              background: '#2563EB',
              transition: '0.3s',
            }}
          />
        </div>
        <p id="tx" style={{ marginTop: 10, fontSize: 14, color: '#374151', fontWeight: 500 }}>
          {txText}
        </p>
      </div>

      {isOk && (
        <div
          id="ok"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 20,
            background: '#ECFDF5',
            padding: 20,
            borderRadius: 12,
            border: '1px solid #A7F3D0',
          }}
        >
          <h3 style={{ color: '#065F46' }}>✅ CV Converted!</h3>
          <a
            id="dl"
            download={downloadFileName || 'converted.docx'}
            href={downloadUrl}
            style={{
              display: 'inline-block',
              marginTop: 10,
              background: '#2563EB',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Download Word
          </a>
          <p style={{ fontSize: 11, color: '#666', marginTop: 10 }}>
            If some design missing, your PDF is image-based. We extract all readable text.
          </p>
        </div>
      )}
    </div>
  );
}

export default PdfToWordTool;
