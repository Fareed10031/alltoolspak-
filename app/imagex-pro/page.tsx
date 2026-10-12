'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function ImageXProPage() {
  useEffect(() => {
    document.title = 'ImageX Pro V13 FINAL - Remove.bg Quality - Guarantee | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V13 Final - Remove.bg Quality with Bria RMBG-1.4. Full body, dress, and hair background remover. 100% private, 0% black, guaranteed.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
