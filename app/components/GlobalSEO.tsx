import React from 'react';
import { getGlobalOrganizationSchema } from '@/app/lib/seoMaster14';

export function GlobalSEO() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getGlobalOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AllToolsPK',
            url: 'https://alltoolspk.com'
          })
        }}
      />
    </>
  );
}

export default GlobalSEO;
