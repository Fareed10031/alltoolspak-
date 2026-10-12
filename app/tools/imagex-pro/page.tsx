'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function Page() {
  useEffect(() => {
    document.title = 'ImageX Pro V20.1 Cache Cleaner + 100% Real | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V20.1 Cache Cleaner + 100% Real. Automatic cache purge of old models while keeping 13 tools safe. ISNet FP16 full body model, 100% real transparent PNG.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
