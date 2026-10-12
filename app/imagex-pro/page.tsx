'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function ImageXProPage() {
  useEffect(() => {
    document.title = 'ImageX Pro HERO - AI Background Remover + Upscaler + Compressor - 100% Private - AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Remove background 100% real AI, upscale 4x HD, compress 90%, convert JPG PNG WebP - 100% private browser AI, no upload, no server - Free - 150M+ searches - Hero tool'
      );
    }
  }, []);

  return <ImageXProTool />;
}
