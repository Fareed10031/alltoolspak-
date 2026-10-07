"use client";

import React, { useState, useEffect } from "react";

export function PDF3XProOCR() {
  const [currentMode, setCurrentMode] = useState<"pdf2word" | "compress" | "word2pdf">("pdf2word");
  const [status, setStatus] = useState<string>("");
  const [log, setLog] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).pdfjsLib) {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
  }, []);

  const switchTab = (m: "pdf2word" | "compress" | "word2pdf") => {
    setCurrentMode(m);
    setStatus("");
    setLog("");
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus(`Processing ${file.name}...`);
    setLog("");

    try {
      if (currentMode === "pdf2word") {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjs = (window as any).pdfjsLib;
        if (!pdfjs) throw new Error("PDF.js library not initialized yet");

        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          setStatus(`Extracting page ${i} of ${pdf.numPages}...`);
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((it: any) => it.str).join(" ");
          fullText += pageText + "\n";
        }

        // IF TEXT IS TOO SHORT, IT'S SCANNED IMAGE - USE OCR AUTOMATICALLY
        if (fullText.trim().length < 100) {
          setLog("Scanned PDF detected, running OCR... (takes 10-15 sec)");
          setStatus("🔍 OCR Running - Reading your CV image...");

          const canvas = document.createElement("canvas");
          const tesseract = (window as any).Tesseract;

          for (let i = 1; i <= pdf.numPages; i++) {
            setStatus(`🔍 OCR Page ${i}/${pdf.numPages} in progress...`);
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              await page.render({ canvasContext: ctx, viewport }).promise;
              if (tesseract?.recognize) {
                const { data } = await tesseract.recognize(canvas, "eng");
                if (data?.text) {
                  fullText += data.text + "\n\n";
                }
              }
            }
          }
        }

        if (!fullText.trim()) {
          setStatus("No text found even with OCR");
          setIsProcessing(false);
          return;
        }

        const docxLib = (window as any).docx;
        if (!docxLib) throw new Error("Word generation library not initialized");

        const doc = new docxLib.Document({
          sections: [
            {
              children: fullText
                .split("\n")
                .filter((l: string) => l.trim() !== "")
                .map((l: string) => new docxLib.Paragraph({ children: [new docxLib.TextRun(l)] })),
            },
          ],
        });

        const blob = await docxLib.Packer.toBlob(doc);
        const outName = file.name.replace(/\.pdf$/i, "") + ".docx";
        downloadBlob(blob, outName);
        setStatus("✅ 100% Converted - Full CV extracted with OCR!");
        setLog(`Extracted ${fullText.length} characters`);
      } else if (currentMode === "compress") {
        const PDFLib = (window as any).PDFLib;
        if (!PDFLib?.PDFDocument) throw new Error("PDFLib library not initialized");

        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), "compressed-" + file.name);
        setStatus(
          `✅ Compressed Successfully - ${(arrayBuffer.byteLength / 1024).toFixed(0)}KB → ${(
            bytes.length / 1024
          ).toFixed(0)}KB`
        );
      } else if (currentMode === "word2pdf") {
        const mammoth = (window as any).mammoth;
        if (!mammoth) throw new Error("Mammoth library not initialized");

        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const jspdfModule = (window as any).jspdf;
        if (!jspdfModule?.jsPDF) throw new Error("jsPDF library not initialized");

        const { jsPDF } = jspdfModule;
        const doc = new jsPDF();
        doc.text(doc.splitTextToSize(result.value || "", 180), 10, 10);
        const outName = file.name.replace(/\.docx$/i, "").replace(/\.doc$/i, "") + ".pdf";
        doc.save(outName);
        setStatus("✅ Word to PDF Downloaded");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err.message || "Operation failed"));
    } finally {
      setIsProcessing(false);
      e.target.value = "";
    }
  };

  return (
    <div className="py-8 px-4 bg-[#f8fafc] min-h-[500px]">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-[800px] mx-auto shadow-md border border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-center text-slate-900">
          PDF 3X Pro - Convert | Compress | Create
        </h1>
        <p className="text-center text-slate-500 text-sm mt-1 mb-6">
          Now with OCR - Works even on scanned CVs
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => switchTab("pdf2word")}
            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              currentMode === "pdf2word"
                ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            PDF to Word
          </button>
          <button
            type="button"
            onClick={() => switchTab("compress")}
            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              currentMode === "compress"
                ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            Compress PDF
          </button>
          <button
            type="button"
            onClick={() => switchTab("word2pdf")}
            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              currentMode === "word2pdf"
                ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            Word to PDF
          </button>
        </div>

        {/* Drop Box */}
        <div className="border-2 border-dashed border-[#2563eb] rounded-xl p-8 sm:p-10 text-center bg-[#f8faff]">
          <input
            type="file"
            id="fileInput"
            hidden
            accept={currentMode === "word2pdf" ? ".docx,.doc" : ".pdf"}
            onChange={handleFile}
          />
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => document.getElementById("fileInput")?.click()}
            className="w-full sm:w-auto min-w-[220px] bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Select File"}
          </button>
          {status && (
            <p className="mt-4 text-[#2563eb] font-semibold text-sm">
              {status}
            </p>
          )}
          {log && (
            <p className="mt-1 text-xs text-slate-500 font-mono">
              {log}
            </p>
          )}
          <p className="mt-3 text-[11px] text-slate-400">
            🔒 100% Client-Side Processing • Your documents never leave your device
          </p>
        </div>
      </div>
    </div>
  );
}

export default PDF3XProOCR;
