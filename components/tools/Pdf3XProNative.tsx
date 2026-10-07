"use client";

import React, { useState, useEffect } from "react";

export function Pdf3XProNative() {
  const [currentMode, setCurrentMode] = useState<"pdf2word" | "compress" | "word2pdf">("pdf2word");
  const [status, setStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).pdfjsLib) {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
  }, []);

  const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus(`Processing ${file.name}... Please wait`);

    try {
      if (currentMode === "pdf2word") {
        // Extract FULL text from all pages
        const arrayBuffer = await file.arrayBuffer();
        const pdfjs = (window as any).pdfjsLib;
        if (!pdfjs) throw new Error("PDF engine not initialized yet");

        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          setStatus(`Extracting page ${i} of ${pdf.numPages}...`);
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }

        if (!fullText.trim()) {
          setStatus("❌ No text found in PDF (scanned image).");
          setIsProcessing(false);
          return;
        }

        const docxLib = (window as any).docx;
        if (!docxLib) throw new Error("Word generation library not initialized");

        const doc = new docxLib.Document({
          sections: [
            {
              properties: {},
              children: fullText
                .split("\n")
                .map((line: string) => new docxLib.Paragraph({ children: [new docxLib.TextRun(line)] })),
            },
          ],
        });

        const blob = await docxLib.Packer.toBlob(doc);
        const fileName = file.name.replace(/\.pdf$/i, "") + ".docx";
        downloadBlob(blob, fileName);
        setStatus(`✅ Converted 100% - Downloaded: ${fileName}`);
      } else if (currentMode === "compress") {
        const arrayBuffer = await file.arrayBuffer();
        const PDFLib = (window as any).PDFLib;
        if (!PDFLib) throw new Error("PDFLib not initialized yet");

        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
        const blob = new Blob([compressedBytes], { type: "application/pdf" });
        downloadBlob(blob, "compressed-" + file.name);
        setStatus(
          `✅ Compressed - Original: ${(arrayBuffer.byteLength / 1024).toFixed(1)}KB, New: ${(
            compressedBytes.length / 1024
          ).toFixed(1)}KB`
        );
      } else if (currentMode === "word2pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const mammoth = (window as any).mammoth;
        if (!mammoth) throw new Error("Mammoth library not ready");

        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;

        const jspdfModule = (window as any).jspdf;
        if (!jspdfModule?.jsPDF) throw new Error("jsPDF library not ready");

        const doc = new jspdfModule.jsPDF();
        const lines = doc.splitTextToSize(text, 180);
        doc.text(lines, 10, 10);
        const outName = file.name.replace(/\.docx$/i, "").replace(/\.doc$/i, "") + ".pdf";
        doc.save(outName);
        setStatus("✅ Word to PDF 100% Converted and Downloaded");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err.message || "Failed to process file"));
    } finally {
      setIsProcessing(false);
      // Reset input value so same file can be converted again
      e.target.value = "";
    }
  };

  return (
    <div className="bg-[#f8fafc] py-6 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-[800px] mx-auto shadow-sm border border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-center text-slate-900">
          PDF 3X Pro - Convert | Compress | Create
        </h1>
        <p className="text-center text-slate-500 text-sm mt-1 mb-6">
          100% Private, No Upload - All processing in your browser
        </p>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setCurrentMode("pdf2word");
              setStatus("");
            }}
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
            onClick={() => {
              setCurrentMode("compress");
              setStatus("");
            }}
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
            onClick={() => {
              setCurrentMode("word2pdf");
              setStatus("");
            }}
            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              currentMode === "word2pdf"
                ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            Word to PDF
          </button>
        </div>

        {/* Drop zone */}
        <div className="border-2 border-dashed border-[#2563eb] rounded-xl p-8 sm:p-10 text-center bg-[#f8faff]">
          <input
            type="file"
            id="pdf3xNativeInput"
            className="hidden"
            accept={currentMode === "word2pdf" ? ".docx,.doc" : ".pdf"}
            onChange={handleFile}
          />
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => document.getElementById("pdf3xNativeInput")?.click()}
            className="w-full sm:w-auto min-w-[200px] bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Select File"}
          </button>
          {status && (
            <p className="mt-4 text-[#2563eb] font-semibold text-sm">
              {status}
            </p>
          )}
          <p className="mt-3 text-xs text-slate-400">
            🔒 Files stay 100% on your device. Client-side browser execution.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pdf3XProNative;
