'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function Page() {
  useEffect(() => {
    document.title = 'ImageX Pro V14 FINAL - Remove.bg Quality - RMBG-1.4 - Guaranteed | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V14 Final - Same model as Remove.bg (Bria RMBG-1.4). Full body, red dress, hair, and high heels preserved. 100% real transparent PNG.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
