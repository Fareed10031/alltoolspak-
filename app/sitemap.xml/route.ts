import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://alltoolspk.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static site and core legal/policy pages
  const staticPages = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '/tools', changefreq: 'daily', priority: '0.95' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.8' },
    { path: '/privacy', changefreq: 'monthly', priority: '0.8' },
    { path: '/terms', changefreq: 'monthly', priority: '0.8' },
    { path: '/disclaimer', changefreq: 'monthly', priority: '0.8' },
    { path: '/cookies', changefreq: 'monthly', priority: '0.8' },
  ];

  // Auto-detect tool directories inside app/tools that have a valid page.tsx
  const detectedToolPaths: string[] = [];
  try {
    const toolsDir = path.join(process.cwd(), 'app', 'tools');
    if (fs.existsSync(toolsDir)) {
      const entries = fs.readdirSync(toolsDir, { withFileTypes: true });

      // Sort alphabetically for clean, consistent XML output
      entries
        .filter((entry) => entry.isDirectory())
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((entry) => {
          const folderName = entry.name;

          // Skip Next.js routing internals and non-tool folders
          if (
            folderName.startsWith('(') ||
            folderName.startsWith('_') ||
            folderName.startsWith('[') ||
            folderName.startsWith('.')
          ) {
            return;
          }

          // Strict validation: folder must contain page.tsx or page.js to prevent 404s
          const pagePathTsx = path.join(toolsDir, folderName, 'page.tsx');
          const pagePathJsx = path.join(toolsDir, folderName, 'page.jsx');
          const pagePathJs = path.join(toolsDir, folderName, 'page.js');

          if (
            fs.existsSync(pagePathTsx) ||
            fs.existsSync(pagePathJsx) ||
            fs.existsSync(pagePathJs)
          ) {
            detectedToolPaths.push(`/tools/${folderName}`);
          }
        });
    }
  } catch (error) {
    console.error('Error scanning app/tools directory for sitemap:', error);
  }

  // Construct standard valid XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
${detectedToolPaths
  .map(
    (toolPath) => `  <url>
    <loc>${baseUrl}${toolPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
