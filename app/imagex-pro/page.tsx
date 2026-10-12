'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function ImageXProPage() {
  useEffect(() => {
    document.title = 'ImageX Pro V15 FINAL - Lightweight - Guaranteed 100% | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V15 FINAL - Lightweight ~2MB model, no black patches, zero blank output, guaranteed 100% real background removal, 4x upscaler & compressor.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
