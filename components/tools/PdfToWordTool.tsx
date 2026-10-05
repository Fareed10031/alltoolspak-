'use client';

import React, { useEffect, useState, useRef } from 'react';

export function PdfToWordTool() {
  const [ready, setReady] = useState(false);
  const [fillPercent, setFillPercent] = useState(0);
  const [txtStatus, setTxtStatus] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [outFileName, setOutFileName] = useState('');
  const [isHoveredDrop, setIsHoveredDrop] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if already loaded
    if ((window as any).docx && (window as any).pdfjsLib) {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      setReady(true);
      return;
    }

    // Step 1: Load PDF.js
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

      const pdfScript = document.createElement('script');
      pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      pdfScript.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        loadDocx();
      };
      document.head.appendChild(pdfScript);
    };

    // Step 2: Load tested working DOCX CDN: unpkg.com/docx@7.8.2/build/index.js
    const loadDocx = () => {
      if ((window as any).docx) {
        setReady(true);
        return;
      }
      const existingDocx = document.querySelector('script[src*="docx@7.8.2"]');
      if (existingDocx) {
        existingDocx.addEventListener('load', () => setReady(true));
        return;
      }

      const docxScript = document.createElement('script');
      docxScript.src = 'https://unpkg.com/docx@7.8.2/build/index.js';
      docxScript.onload = () => {
        setReady(true);
      };
      document.head.appendChild(docxScript);
    };

    loadPdfJs();
  }, []);

  const start = async (file: File) => {
    if (!ready) {
      alert('Please wait 3 sec, engine is loading...');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert('Max 50MB');
      return;
    }

    setIsDone(false);
    setFillPercent(10);
    setTxtStatus('Reading...10%');

    try {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      let all = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const c = await page.getTextContent();
        all += c.items.map((s: any) => s.str).join(' ') + '\n\n';
        const p = 10 + Math.round((i / pdf.numPages) * 70);
        setFillPercent(p);
        setTxtStatus(`Page ${i}/${pdf.numPages} - ${p}%`);
      }

      if (all.trim().length < 5) {
        throw new Error('Scanned PDF - no text found');
      }

      setTxtStatus('Creating Word...90%');
      setFillPercent(90);

      const docx = (window as any).docx;
      const chunks = all.match(/(.{1,2000})/gs) || [all];

      const doc = new docx.Document({
        sections: [
          {
            children: chunks.map((t: string) => new docx.Paragraph(t)),
          },
        ],
      });

      const blob = await docx.Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const fileName = file.name.replace(/\.pdf$/i, '.docx');

      setDownloadUrl(url);
      setOutFileName(fileName);
      setFillPercent(100);
      setTxtStatus('100% Done!');
      setIsDone(true);
    } catch (err: any) {
      alert('Error: ' + err.message);
      setFillPercent(0);
      setTxtStatus('');
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui,sans-serif', maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800 }}>
        PDF to Word Converter - Free, Fast & Secure
      </h1>

      <p
        id="engineStatus"
        style={{
          textAlign: 'center',
          color: ready ? '#10B981' : '#2563EB',
          fontWeight: 'bold',
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {ready ? '✅ Engine Ready - Select PDF Now' : '⏳ Loading Engine... Please wait 3 sec'}
      </p>

      <div
        id="drop"
        onDragOver={(e) => {
          e.preventDefault();
          setIsHoveredDrop(true);
        }}
        onDragLeave={() => setIsHoveredDrop(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsHoveredDrop(false);
          if (e.dataTransfer.files[0]) start(e.dataTransfer.files[0]);
        }}
        onClick={() => {
          if (ready && fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        style={{
          border: '3px dashed #2563EB',
          borderRadius: 16,
          padding: 40,
          textAlign: 'center',
          background: isHoveredDrop ? '#EFF4FF' : '#F8FAFF',
          cursor: ready ? 'pointer' : 'default',
        }}
      >
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          accept="application/pdf"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              start(e.target.files[0]);
            }
          }}
        />
        <div style={{ fontSize: 50 }}>📄 → 📝</div>
        <h3 style={{ marginTop: 10 }}>Drag & Drop PDF Here</h3>
        <button
          className="btn"
          id="pickBtn"
          type="button"
          disabled={!ready}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          style={{
            background: ready ? '#2563EB' : '#9CA3AF',
            color: '#fff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: ready ? 'pointer' : 'not-allowed',
            marginTop: 12,
          }}
        >
          {ready ? 'Select PDF File' : 'Loading Engine...'}
        </button>
        <p style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
          Max 50MB • 100% Private • No Watermark
        </p>

        {fillPercent > 0 && (
          <div
            style={{
              height: 10,
              background: '#eee',
              borderRadius: 10,
              overflow: 'hidden',
              marginTop: 15,
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
        )}

        <p id="txt" style={{ textAlign: 'center', marginTop: 8, fontWeight: 500, color: '#374151' }}>
          {txtStatus}
        </p>
      </div>

      {isDone && (
        <div
          id="done"
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
          <h3 style={{ color: '#065F46' }}>✅ Done!</h3>
          <a
            id="dl"
            href={downloadUrl}
            download={outFileName || 'converted.docx'}
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
            Download Word File
          </a>
        </div>
      )}

      {/* SEO & Guide Section */}
      <div style={{ marginTop: 40, lineHeight: 1.8, color: '#374151' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
          How to Convert PDF to Word - Ultimate Guide 2026
        </h2>
        <p>
          Our PDF to Word converter runs completely inside your browser memory using client-side Web
          APIs. Unlike traditional tools that upload your documents to external servers, your files
          never leave your computer or phone. This guarantees complete confidentiality for legal
          contracts, financial records, resumes, and study materials.
        </p>
        <p style={{ marginTop: 10 }}>
          <strong>Key Advantages:</strong>
        </p>
        <ul style={{ paddingLeft: 20, marginTop: 6 }}>
          <li>
            <strong>100% Client-Side Privacy:</strong> Zero cloud uploads, safe for sensitive personal
            and business documents.
          </li>
          <li>
            <strong>Free Forever:</strong> No paywalls, no email signups, and absolutely no watermarks.
          </li>
          <li>
            <strong>Fast & Responsive:</strong> Converts multi-page documents in just seconds without
            server queue delays.
          </li>
          <li>
            <strong>Broad Compatibility:</strong> Generated .docx files can be opened and edited
            seamlessly in Microsoft Word, Google Docs, Apple Pages, and LibreOffice.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PdfToWordTool;
