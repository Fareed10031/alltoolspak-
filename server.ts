import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { ALL_14_TOOLS, SITE_URL } from './app/lib/seoMaster14';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prevent process crashes from unexpected async rejections or uncaught exceptions
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

// Health check endpoint for uptime & load balancers
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

// Sitemap endpoint with guaranteed fallback
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

function buildFallbackSitemap(): string {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${ALL_14_TOOLS.map((t) => `  <url>
    <loc>${SITE_URL}/${t.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;
}

// 301 Redirect for duplicate live-currency-gold-rates to currency-gold-rates
app.get(['/live-currency-gold-rates', '/live-currency-gold-rates/*'], (_req, res) => {
  return res.redirect(301, '/currency-gold-rates/');
});

// 301 Redirects for emergency-os to car-accident-settlement-calculator
app.get([
  '/tools/emergency-os',
  '/emergency-os',
  '/tools/accident-calculator',
  '/accident-calculator',
], (_req, res) => {
  return res.redirect(301, '/global-accident-emergency');
});

// Robots endpoint with guaranteed fallback
app.get('/robots.txt', (_req, res) => {
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
        }
      });
    }
  } catch (err) {
    console.warn('[Server] Robots read fallback:', err);
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

// Ads.txt endpoint with guaranteed fallback
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

// API AI endpoint with timeout protection so slow upstream APIs never overload server
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

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  const distPath = path.resolve(process.cwd(), 'dist');
  const rootIndexPath = path.resolve(process.cwd(), 'index.html');

  const serveHtmlFallback = (res: Response) => {
    try {
      const targetHtml =
        process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(distPath, 'index.html'))
          ? path.resolve(distPath, 'index.html')
          : rootIndexPath;

      if (fs.existsSync(targetHtml)) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        return res.status(200).sendFile(targetHtml);
      }
    } catch (err) {
      console.error('[Server] HTML fallback read error:', err);
    }
    return res
      .status(200)
      .type('text/html')
      .send('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="1"><title>AllToolsPK</title></head><body><p>Loading AllToolsPK...</p></body></html>');
  };

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
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
    const MAX_GZIP_CACHE_ENTRIES = 100;
    const MAX_COMPRESS_BYTES = 2 * 1024 * 1024;
    const compressibleMime: Record<string, string> = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.json': 'application/json; charset=utf-8',
      '.xml': 'application/xml; charset=utf-8',
      '.txt': 'text/plain; charset=utf-8',
    };

    const sendCompressedFile = (req: Request, res: Response, filePath: string, mime: string, isHtml: boolean) => {
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
        res.setHeader(
          'Cache-Control',
          isHtml ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000, immutable'
        );
        res.status(200).send(compressed);
        return true;
      } catch (err) {
        console.warn('[Server] Gzip fallback to uncompressed file:', err);
        return false;
      }
    };

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

        const cleanUrl = decodedPath === '/' ? '/index.html' : decodedPath;
        const ext = path.extname(cleanUrl);
        const mime = compressibleMime[ext];
        if (!mime) return next();

        const resolvedFile = path.resolve(distPath, `.${cleanUrl}`);
        if (!resolvedFile.startsWith(distPath) || !fs.existsSync(resolvedFile)) {
          return next();
        }

        if (sendCompressedFile(req, res, resolvedFile, mime, ext === '.html')) {
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
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          }
        },
      })
    );

    app.get('*', (req, res) => {
      try {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        const indexHtmlPath = path.resolve(distPath, 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
          if (sendCompressedFile(req, res, indexHtmlPath, 'text/html; charset=utf-8', true)) {
            return;
          }
          return res.sendFile(indexHtmlPath, (err) => {
            if (err && !res.headersSent) {
              serveHtmlFallback(res);
            }
          });
        }
      } catch (err) {
        console.warn('[Server] Catch-all route fallback triggered:', err);
      }
      return serveHtmlFallback(res);
    });
  }

  // Global error-handling middleware: NEVER expose a raw 500 "Page is unavailable" page
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

  // Tune timeouts so slow mobile connections don't drop or hang worker threads
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

startServer().catch((err) => {
  console.error('[Server] Startup error:', err);
});

