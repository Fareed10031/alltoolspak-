'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function ImageXProPage() {
  useEffect(() => {
    document.title = 'ImageX Pro V6 GENIUS - Self Replacing - 100% Real | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V6 Genius Logic - 100% Real AI Background Remover + 4x HD Upscaler + Compressor. Self-replacing, no cache, 100% private.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
