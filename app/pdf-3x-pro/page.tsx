'use client';

import React, { useEffect } from 'react';
import { PDF3XProTool } from '@/components/tools/PDF3XProTool';

export default function PDF3xProPage() {
  useEffect(() => {
    document.title = 'PDF 3X Pro (3-in-1) - PDF to Word, Compress PDF, Word to PDF | 100% Private | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "World's #1 PDF 3X Pro Suite - PDF to Word with 2-column fix, Compress PDF 60-80% save text searchable, Word to PDF high fidelity. 100% Private Browser-Based, No Upload, Offline. Beat ilovepdf & smallpdf."
      );
    }
  }, []);

  return <PDF3XProTool />;
}
