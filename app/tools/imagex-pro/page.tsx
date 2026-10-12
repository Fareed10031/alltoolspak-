'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function Page() {
  useEffect(() => {
    document.title = 'ImageX Pro V19 - Background Remover | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V19 - ISNet Full Body Model background remover. Free, client-side, zero black patches, 100% transparent PNG with HD quality.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
