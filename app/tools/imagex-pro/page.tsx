'use client';

import React, { useEffect } from 'react';
import { ImageXProTool } from '@/components/tools/ImageXProTool';

export default function Page() {
  useEffect(() => {
    document.title = 'ImageX Pro V9 PAK FIX - 2 Engines - 100% Real | AllToolsPK';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ImageX Pro V9 Pakistan Fix - Mobile Data + WiFi Both 100% Real. 2 Engines: @imgly 1.4.5 + Google MediaPipe. Auto switch, no black patch.'
      );
    }
  }, []);

  return <ImageXProTool />;
}
