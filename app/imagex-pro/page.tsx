'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function ImageXProPage() {
  useEffect(() => {
    document.title = 'ImageX Pro V20 Single - 100% Real Guarantee | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V20 Single - 100% Real Guarantee. ISNet FP16 model loads directly in browser. No API needed, no black patches, full body detection, HD transparent PNG.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
