import fs from 'fs';
import path from 'path';

export default async function sitemap() {
  const baseUrl = 'https://alltoolspk.com';
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  let toolPages: any[] = [];
  try {
    const toolsDir = path.join(process.cwd(), 'app', 'tools');
    if (fs.existsSync(toolsDir)) {
      const folders = fs.readdirSync(toolsDir).filter((name) => {
        return fs.statSync(path.join(toolsDir, name)).isDirectory();
      });
      toolPages = folders.map((toolName) => ({
        url: `${baseUrl}/tools/${toolName}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
    }
  } catch (e) {}

  return [...staticPages, ...toolPages];
}
