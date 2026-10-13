import { MetadataRoute } from 'next';
import { ALL_14_TOOLS, SITE_URL } from './lib/seoMaster14';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 }
  ];

  ALL_14_TOOLS.forEach((tool) => {
    urls.push({
      url: SITE_URL + '/tools/' + tool.slug,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1
    });
  });

  return urls;
}
