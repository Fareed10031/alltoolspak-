import React from 'react';
import PDF3XProTool from '@/components/tools/PDF3XProTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free PDF 3X Pro Pakistan - PDF to Word, Merge & Compress",
  description: "Free PDF Tools Pakistan for office, legal, and academic work. High-accuracy PDF to Word, fast PDF compression, and merging without server uploads.",
  alternates: {
    canonical: "https://alltoolspk.com/pdf-3x-pro/",
  },
};

export default function Page() {
  return (
    <>
      <PDF3XProTool />
      <AllToolsSEO
        toolName="PDF 3X Pro Suite"
        slug="/pdf-3x-pro"
        keyword="Free PDF Tools Pakistan"
        desc="Convert PDF to Word, compress files by 60-80%, and merge documents with 100% browser-based security."
      />
    </>
  );
}
