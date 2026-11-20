import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  CANONICAL_PAGES,
  SITE_URL,
  resolveSeoPath,
  buildSoftwareApplicationJsonLd,
  type CanonicalPageMeta,
} from './src/lib/seoCanonical';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on('uncaughtException', (err) => {
  console.error('[Server] Caught uncaughtException (prevented crash):', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Server] Caught unhandledRejection (prevented crash):', reason);
});

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, status: 'healthy' });
});

// Enable Cross-Origin Isolation headers safely for WebAssembly / ONNX Runtime Web
app.use((_req, res, next) => {
  try {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  } catch (err) {
    console.warn('[Server] Header middleware warning:', err);
  }
  next();
});

function escapeHtmlAttr(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectSeoIntoHtml(html: string, page: CanonicalPageMeta): string {
  const safeTitle = escapeHtmlAttr(page.title);
  const safeDesc = escapeHtmlAttr(page.description);
  const safeCanonical = escapeHtmlAttr(page.canonical);
  const safeRobots = escapeHtmlAttr(page.robots);

  let updated = html;

  // Replace <title>
  if (/<title>[\s\S]*?<\/title>/i.test(updated)) {
    updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  } else {
    updated = updated.replace('</head>', `  <title>${safeTitle}</title>\n  </head>`);
  }

  // Replace or add <meta name="robots">
  if (/<meta\b[^>]*\bname=["']robots["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /<meta\b[^>]*\bname=["']robots["'][^>]*>/i,
      `<meta name="robots" content="${safeRobots}" />`
    );
  } else {
    updated = updated.replace('</head>', `  <meta name="robots" content="${safeRobots}" />\n  </head>`);
  }

  // Replace or add single <link rel="canonical">
  updated = updated.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>\s*/gi, '');
  updated = updated.replace('</head>', `  <link rel="canonical" href="${safeCanonical}" />\n  </head>`);

  // Replace or add <meta name="description">
  if (/<meta\b[^>]*\bname=["']description["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /<meta\b[^>]*\bname=["']description["'][^>]*>/i,
      `<meta name="description" content="${safeDesc}" />`
    );
  } else {
    updated = updated.replace('</head>', `  <meta name="description" content="${safeDesc}" />\n  </head>`);
  }

  // Replace Open Graph and Twitter tags
  updated = updated.replace(
    /<meta\b[^>]*\bproperty=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  updated = updated.replace(
    /<meta\b[^>]*\bproperty=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  updated = updated.replace(
    /<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${safeCanonical}" />`
  );
  updated = updated.replace(
    /<meta\b[^>]*\bname=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  updated = updated.replace(
    /<meta\b[^>]*\bname=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  // Inject SoftwareApplication + BreadcrumbList schema on tool pages
  updated = updated.replace(/<script\s+id=["']seo-software-schema["'][\s\S]*?<\/script>\s*/gi, '');
  updated = updated.replace(/<script\s+id=["']seo-breadcrumb-schema["'][\s\S]*?<\/script>\s*/gi, '');

  if (page.isTool) {
    const swSchema = JSON.stringify(buildSoftwareApplicationJsonLd(page));
    const bcSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.category, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 3, name: page.name, item: page.canonical },
      ],
    });
    updated = updated.replace(
      '</head>',
      `  <script id="seo-software-schema" type="application/ld+json">${swSchema}</script>\n  <script id="seo-breadcrumb-schema" type="application/ld+json">${bcSchema}</script>\n  </head>`
    );
  }

  return updated;
}

const SITEMAP_TOOL_SLUGS = [
  'global-accident-emergency',
  'mortgage-calculator-usa',
  'usa-paycheck-calculator-2026',
  'amazon-eu-vat-calculator',
  'currency-gold-rates',
  'global-salary-calculator',
  'ats-resume-builder',
  'pdf-3x-pro',
  'pdf-merger',
  'image-to-pdf',
  'qr-code-generator',
  'age-calculator',
  'onevisa-world-visa-points',
  'unit-converter',
];

const SITEMAP_LEGAL_SLUGS = [
  'privacy-policy',
  'terms-of-service',
  'about-us',
  'contact-us',
  'disclaimer',
];

function buildFallbackSitemap(): string {
  const now = '2026-11-20';
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${SITEMAP_TOOL_SLUGS.map(
  (slug) => `  <url>
    <loc>${SITE_URL}/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
).join('\n')}
${SITEMAP_LEGAL_SLUGS.map(
  (slug) => `  <url>
    <loc>${SITE_URL}/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
).join('\n')}
</urlset>`;
}

const FALLBACK_ROBOTS = `User-agent: *
Allow: /
Disallow: /search
Disallow: /*?*
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;

// Explicit 404.html route must return HTTP 404 with noindex header (never Soft 404 200 OK)
function sendReal404(res: Response, distPath: string) {
  res.status(404);
  res.setHeader('X-Robots-Tag', 'noindex, follow');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const candidates = [
    path.resolve(distPath, '404.html'),
    path.resolve(process.cwd(), 'public', '404.html'),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return res.send(fs.readFileSync(candidate, 'utf-8'));
      }
    } catch {
      // try next candidate
    }
  }
  return res.send(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Page Not Found (404) | AllToolsPK</title></head><body><h1>Page Not Found</h1><p>Return to <a href="/">AllToolsPK Home</a>.</p></body></html>'
  );
}

// Sitemap endpoint
app.get('/sitemap.xml', (_req, res) => {
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type('application/xml').send(buildFallbackSitemap());
        }
      });
    }
  } catch (err) {
    console.warn('[Server] Sitemap read fallback:', err);
  }
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  return res.status(200).send(buildFallbackSitemap());
});

// Robots endpoint
app.get('/robots.txt', (_req, res) => {
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type('text/plain').send(FALLBACK_ROBOTS);
        }
      });
    }
  } catch (err) {
    console.warn('[Server] Robots read fallback:', err);
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send(FALLBACK_ROBOTS);
});

// Ads.txt endpoint
app.get('/ads.txt', (_req, res) => {
  const fallbackAdsTxt = 'google.com, pub-7765776011144949, DIRECT, f08c47fec0942fa0\n';
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'ads.txt');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type('text/plain').send(fallbackAdsTxt);
        }
      });
    }
  } catch (err) {
    console.warn('[Server] ads.txt read fallback:', err);
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send(fallbackAdsTxt);
});

function buildHeuristicResponse(prompt: string, tool?: string, mode?: string, context?: string) {
  if (tool === 'paraphraser') {
    let rewritten = prompt;
    if (mode === 'Fluency') {
      rewritten = prompt
        .replace(/due to the fact that/gi, 'because')
        .replace(/in order to/gi, 'to')
        .replace(/utilize/gi, 'use')
        .replace(/demonstrate/gi, 'show')
        .replace(/furthermore/gi, 'also')
        .replace(/consequently/gi, 'as a result');
    } else if (mode === 'Humanize') {
      rewritten = prompt
        .replace(/crucial/gi, 'vital')
        .replace(/paramount/gi, 'essential')
        .replace(/tapestry/gi, 'fabric')
        .replace(/testament/gi, 'proof')
        .replace(/delve/gi, 'look deeply');
    } else {
      rewritten = prompt
        .replace(/significant/gi, 'substantial')
        .replace(/effective/gi, 'successful')
        .replace(/optimize/gi, 'enhance')
        .replace(/opportunity/gi, 'chance');
    }
    return { text: rewritten, source: 'local-heuristic' };
  }

  if (tool === 'resume-builder') {
    if (context === 'summary') {
      const enhanced = `Results-oriented professional with a proven track record. ${prompt.trim()} Recognized for optimizing operational workflows, elevating technical excellence, and driving measurable business growth.`;
      return { text: enhanced, source: 'local-heuristic' };
    }

    const bullets = prompt
      .split('\n')
      .filter((b: string) => b.trim().length > 0)
      .map((b: string) => {
        const clean = b.replace(/^[•*-]\s*/, '');
        return `• Engineered and scaled ${clean.toLowerCase()}, resulting in a 25% improvement in processing latency and system reliability.`;
      })
      .join('\n');

    return {
      text: bullets || '• Architected core microservices, increasing throughput by 30% and reducing infrastructure overhead.',
      source: 'local-heuristic',
    };
  }

  return { text: prompt, source: 'echo' };
}

// API AI endpoint
app.post('/api/ai', async (req: Request, res: Response) => {
  try {
    const { prompt, tool, mode, context } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        let systemInstruction = 'You are an expert copywriter and editor for alltoolspk.com.';

        if (tool === 'paraphraser') {
          systemInstruction = `You are an expert AI text paraphraser. Mode: ${mode || 'Standard'}. Rewrite the provided text naturally, preserving all key meanings, while matching the specified tone. Return ONLY the rewritten text without commentary or quotes.`;
        } else if (tool === 'resume-builder') {
          systemInstruction = `You are a Fortune 500 ATS Resume Optimizer. Rewrite the candidate's achievements using the Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]. Use strong action verbs, quantify impact where possible, and return ONLY 2-3 clean bullet points without markdown headers or conversational filler.`;
        }

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Upstream AI request timeout')), 8000)
        );

        const response = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          }),
          timeoutPromise,
        ]);

        const text = response?.text || '';
        if (text) {
          return res.json({ text: text.trim(), source: 'gemini' });
        }
      } catch (geminiError) {
        console.warn('[Server] Gemini API failed/timed out, using heuristic fallback:', geminiError);
      }
    }

    return res.json(buildHeuristicResponse(prompt, tool, mode, context));
  } catch (err: any) {
    console.warn('[Server] /api/ai error recovered:', err);
    return res.status(200).json({ text: '', source: 'safe-fallback' });
  }
});

function isPageNavigationRequest(req: Request): boolean {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;
  const reqPath = req.path || '/';
  if (
    reqPath.startsWith('/api/') ||
    reqPath.startsWith('/assets/') ||
    reqPath.startsWith('/@') ||
    reqPath.startsWith('/src/') ||
    reqPath.startsWith('/components/') ||
    reqPath.startsWith('/app/') ||
    reqPath.startsWith('/lib/') ||
    reqPath.startsWith('/node_modules/')
  ) {
    return false;
  }
  const ext = path.extname(reqPath).toLowerCase();
  if (ext && ext !== '.html') {
    return false;
  }
  return true;
}

function hasDuplicateQueryParams(req: Request): string | null {
  const query = req.query as Record<string, unknown> | undefined;
  if (!query || Object.keys(query).length === 0) return null;

  const duplicateKeys = ['fbclid', 'gclid', 'msclkid', 'page', 'mc_cid', 'mc_eid', 'ref'];
  const keys = Object.keys(query);
  const foundDuplicate = keys.some(
    (k) => k.toLowerCase().startsWith('utm_') || duplicateKeys.includes(k.toLowerCase())
  );
  if (!foundDuplicate) return null;

  const cleanParams = new URLSearchParams();
  for (const k of keys) {
    const lk = k.toLowerCase();
    if (lk.startsWith('utm_') || duplicateKeys.includes(lk)) continue;
    const val = query[k];
    if (typeof val === 'string') cleanParams.set(k, val);
  }
  const resolved = resolveSeoPath(req.path);
  const baseDest =
    resolved.kind === 'redirect'
      ? resolved.destination
      : resolved.kind === 'page'
        ? resolved.page.slug
          ? `/${resolved.page.slug}`
          : '/'
        : null;
  if (!baseDest) return null;
  const qs = cleanParams.toString();
  return qs ? `${baseDest}?${qs}` : baseDest;
}

async function startServer() {
  const distPath = path.resolve(process.cwd(), 'dist');
  const rootIndexPath = path.resolve(process.cwd(), 'index.html');

  const serveHtmlFallback = (res: Response, page: CanonicalPageMeta = CANONICAL_PAGES.home) => {
    try {
      const targetHtml =
        process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(distPath, 'index.html'))
          ? path.resolve(distPath, 'index.html')
          : rootIndexPath;

      if (fs.existsSync(targetHtml)) {
        const raw = fs.readFileSync(targetHtml, 'utf-8');
        const seoHtml = injectSeoIntoHtml(raw, page);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('X-Robots-Tag', page.robots === 'noindex, follow' ? 'noindex, follow' : 'index, follow');
        return res.status(200).type('text/html; charset=utf-8').send(seoHtml);
      }
    } catch (err) {
      console.error('[Server] HTML fallback read error:', err);
    }
    return res
      .status(200)
      .type('text/html')
      .send('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="1"><title>AllToolsPK</title></head><body><p>Loading AllToolsPK...</p></body></html>');
  };

  // Explicit 404.html route (never 200 OK)
  app.get('/404.html', (_req, res) => {
    return sendReal404(res, distPath);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    // SEO routing guard (301 redirects, real 404s, per-route canonical injection) BEFORE Vite
    app.use(async (req, res, next) => {
      if (!isPageNavigationRequest(req)) {
        return next();
      }
      try {
        const dupRedirect = hasDuplicateQueryParams(req);
        if (dupRedirect) {
          return res.redirect(301, dupRedirect);
        }
        const resolved = resolveSeoPath(req.path);
        if (resolved.kind === 'redirect') {
          return res.redirect(301, resolved.destination);
        }
        if (resolved.kind === 'not-found') {
          return sendReal404(res, distPath);
        }

        const rawHtml = fs.readFileSync(rootIndexPath, 'utf-8');
        const transformed = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        const seoHtml = injectSeoIntoHtml(transformed, resolved.page);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader(
          'X-Robots-Tag',
          resolved.page.robots === 'noindex, follow' ? 'noindex, follow' : 'index, follow'
        );
        return res.status(200).send(seoHtml);
      } catch (err) {
        console.warn('[Server] Dev SEO HTML handler error:', err);
        return next(err);
      }
    });

    app.use((req, res, next) => {
      try {
        vite.middlewares(req, res, next);
      } catch (err) {
        console.warn('[Server] Vite middleware recovered:', err);
        next(err);
      }
    });
  } else {
    const gzipCache = new Map<string, Buffer>();
    const MAX_GZIP_CACHE_ENTRIES = 128;
    const MAX_COMPRESS_BYTES = 2 * 1024 * 1024;
    const compressibleMime: Record<string, string> = {
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.json': 'application/json; charset=utf-8',
      '.xml': 'application/xml; charset=utf-8',
      '.txt': 'text/plain; charset=utf-8',
    };

    const sendCompressedStatic = (req: Request, res: Response, filePath: string, mime: string) => {
      try {
        const acceptEncoding = String(req.headers['accept-encoding'] || '');
        if (!acceptEncoding.includes('gzip')) {
          return false;
        }
        const stat = fs.statSync(filePath);
        if (!stat.isFile() || stat.size > MAX_COMPRESS_BYTES) {
          return false;
        }

        let compressed = gzipCache.get(filePath);
        if (!compressed) {
          compressed = zlib.gzipSync(fs.readFileSync(filePath), { level: 6 });
          if (gzipCache.size >= MAX_GZIP_CACHE_ENTRIES) {
            const firstKey = gzipCache.keys().next().value;
            if (firstKey) gzipCache.delete(firstKey);
          }
          gzipCache.set(filePath, compressed);
        }

        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Vary', 'Accept-Encoding');
        res.setHeader('Content-Type', mime);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.status(200).send(compressed);
        return true;
      } catch (err) {
        console.warn('[Server] Gzip fallback to uncompressed file:', err);
        return false;
      }
    };

    // Handle all page navigations FIRST (301 redirects, real 404, per-route canonical HTML)
    app.use((req, res, next) => {
      if (!isPageNavigationRequest(req)) {
        return next();
      }
      try {
        const dupRedirect = hasDuplicateQueryParams(req);
        if (dupRedirect) {
          return res.redirect(301, dupRedirect);
        }
        const resolved = resolveSeoPath(req.path);
        if (resolved.kind === 'redirect') {
          return res.redirect(301, resolved.destination);
        }
        if (resolved.kind === 'not-found') {
          return sendReal404(res, distPath);
        }

        const indexHtmlPath = path.resolve(distPath, 'index.html');
        if (!fs.existsSync(indexHtmlPath)) {
          return serveHtmlFallback(res, resolved.page);
        }

        const cacheKey = `html:${resolved.page.canonical}`;
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader(
          'X-Robots-Tag',
          resolved.page.robots === 'noindex, follow' ? 'noindex, follow' : 'index, follow'
        );
        res.setHeader('Content-Type', 'text/html; charset=utf-8');

        const acceptEncoding = String(req.headers['accept-encoding'] || '');
        if (acceptEncoding.includes('gzip')) {
          let compressed = gzipCache.get(cacheKey);
          if (!compressed) {
            const rawHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
            const seoHtml = injectSeoIntoHtml(rawHtml, resolved.page);
            compressed = zlib.gzipSync(Buffer.from(seoHtml, 'utf-8'), { level: 6 });
            if (gzipCache.size >= MAX_GZIP_CACHE_ENTRIES) {
              const firstKey = gzipCache.keys().next().value;
              if (firstKey) gzipCache.delete(firstKey);
            }
            gzipCache.set(cacheKey, compressed);
          }
          res.setHeader('Content-Encoding', 'gzip');
          res.setHeader('Vary', 'Accept-Encoding');
          return res.status(200).send(compressed);
        }

        const rawHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
        const seoHtml = injectSeoIntoHtml(rawHtml, resolved.page);
        return res.status(200).send(seoHtml);
      } catch (err) {
        console.warn('[Server] Production SEO handler error:', err);
        return serveHtmlFallback(res);
      }
    });

    // Compress non-HTML static assets
    app.use((req, res, next) => {
      try {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next();
        const rawPath = req.path || '/';
        let decodedPath = rawPath;
        try {
          decodedPath = decodeURIComponent(rawPath);
        } catch {
          return next();
        }
        const ext = path.extname(decodedPath);
        const mime = compressibleMime[ext];
        if (!mime) return next();

        const resolvedFile = path.resolve(distPath, `.${decodedPath}`);
        if (!resolvedFile.startsWith(distPath) || !fs.existsSync(resolvedFile)) {
          return next();
        }

        if (sendCompressedStatic(req, res, resolvedFile, mime)) {
          return;
        }
      } catch (err) {
        console.warn('[Server] Static compression middleware bypassed safely:', err);
      }
      return next();
    });

    app.use(
      express.static(distPath, {
        maxAge: '1y',
        immutable: true,
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600');
          }
        },
      })
    );

    // Anything left over is a real 404 (never return 200 OK Soft 404)
    app.get('*', (_req, res) => {
      return sendReal404(res, distPath);
    });
  }

  // Global error-handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error('[Server] Express error middleware recovered request:', req.originalUrl, err);
    if (res.headersSent) return;

    if (req.originalUrl.startsWith('/api/')) {
      return res.status(200).json({ ok: false, fallback: true, text: '' });
    }
    return serveHtmlFallback(res);
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });

  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

startServer().catch((err) => {
  console.error('[Server] Startup error:', err);
});
