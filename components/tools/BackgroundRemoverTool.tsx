'use client';

import React from 'react';
import { AI_BG_Remover_PRO } from './AI_BG_Remover_PRO';

export function BackgroundRemoverTool() {
  return (
    <div className="w-full">
      {/* Schema.org SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AI Background Remover PRO',
            operatingSystem: 'Any',
            applicationCategory: 'MultimediaApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <AI_BG_Remover_PRO />
    </div>
  );
}

export default BackgroundRemoverTool;
