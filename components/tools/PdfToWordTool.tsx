'use client';

import React from 'react';
import Page from '@/app/pdf-3x-pro/page';

export function PdfToWordTool() {
  return (
    <div className="w-full">
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can PDF 3X Pro convert 2000+ words PDF to Word?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, optimized for multi-page documents up to 50MB with full selectable text extraction and OCR recognition.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is my data safe with PDF 3X Pro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '100% client-side in your browser. Files never leave your device.',
                },
              },
            ],
          }),
        }}
      />
      <Page />
    </div>
  );
}

export default PdfToWordTool;
