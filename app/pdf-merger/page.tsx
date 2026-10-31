import React from 'react';
import PDFMergerPro from '@/components/tools/PDFMergerPro';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Merge PDF Files - 100% Client-Side PDF Merger Pakistan",
  description: "Merge PDF files free online. Combine multiple PDF documents into one single file without file size limits or cloud uploads.",
  alternates: {
    canonical: "https://alltoolspk.com/pdf-merger",
  },
};

export default function Page() {
  return (
    <>
      <div className="py-6 px-4 max-w-5xl mx-auto">
        <PDFMergerPro />
      </div>
      <AllToolsSEO
        toolName="Merge PDF Files"
        slug="/pdf-merger"
        keyword="Free PDF Merger Pakistan"
        desc="Combine PDF files into a single document with zero uploads and 100% browser-based security."
      />
    </>
  );
}
