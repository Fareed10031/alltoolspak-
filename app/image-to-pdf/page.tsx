import React from 'react';
import ImageToPdfTool from '@/components/tools/ImageToPdfTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Image to PDF Converter Pakistan - JPG to PDF No Upload",
  description: "Free Image to PDF Converter Pakistan for CNIC, academic degrees, and job forms. Fast client-side JPG, PNG, and WebP to PDF conversion with zero server uploads.",
  alternates: {
    canonical: "https://alltoolspk.com/image-to-pdf/",
  },
};

export default function Page() {
  return (
    <>
      <ImageToPdfTool />
      <AllToolsSEO
        toolName="Image to PDF Converter"
        slug="/image-to-pdf"
        keyword="Free Image to PDF Converter Pakistan"
        desc="Convert photos, scanned CNIC cards, and documents into high-resolution PDF files entirely in your browser."
      />
    </>
  );
}
