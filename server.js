// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import zlib from "zlib";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// app/lib/seoMaster14.ts
var SITE_URL = "https://alltoolspk.com";
var ALL_14_TOOLS = [
  { slug: "global-accident-emergency", name: "Global Accident Emergency", keyword: "car accident settlement calculator", countries: 195 },
  { slug: "mortgage-calculator-usa", name: "Mortgage Calculator USA", keyword: "mortgage calculator usa", countries: 1 },
  { slug: "usa-paycheck-calculator-2026", name: "USA Paycheck Calculator 2026", keyword: "usa paycheck calculator 2026", countries: 1 },
  { slug: "amazon-eu-vat-calculator", name: "Amazon EU VAT Calculator", keyword: "amazon eu vat calculator", countries: 27 },
  { slug: "currency-gold-rates", name: "Currency & Gold Rates", keyword: "usd to pkr today", countries: 150 },
  { slug: "global-salary-calculator", name: "Global Salary Calculator", keyword: "global salary calculator", countries: 192 },
  { slug: "ats-resume-builder", name: "ATS Resume Builder", keyword: "ats resume builder", countries: 195 },
  { slug: "pdf-3x-pro", name: "PDF 3X Pro", keyword: "pdf to word suite", countries: 195 },
  { slug: "pdf-merger", name: "PDF Merger", keyword: "merge pdf", countries: 195 },
  { slug: "image-to-pdf", name: "Image to PDF", keyword: "jpg to pdf", countries: 195 },
  { slug: "qr-code-generator", name: "QR Code Generator", keyword: "qr code generator", countries: 195 },
  { slug: "age-calculator", name: "Age Calculator", keyword: "age calculator", countries: 195 },
  { slug: "onevisa-world-visa-points", name: "OneVisa World Visa Points", keyword: "canada crs points calculator", countries: 10 },
  { slug: "unit-converter", name: "Unit Converter", keyword: "unit converter", countries: 195 }
];

// server.ts
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.get("/sitemap.xml", (_req, res) => {
  const filePath = path.resolve(process.cwd(), "public", "sitemap.xml");
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/xml");
    return res.sendFile(filePath);
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${ALL_14_TOOLS.map((t) => `  <url>
    <loc>${SITE_URL}/${t.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});
app.get(["/live-currency-gold-rates", "/live-currency-gold-rates/*"], (_req, res) => {
  return res.redirect(301, "/currency-gold-rates/");
});
app.get([
  "/tools/emergency-os",
  "/emergency-os",
  "/tools/accident-calculator",
  "/accident-calculator"
], (_req, res) => {
  return res.redirect(301, "/global-accident-emergency");
});
app.get("/robots.txt", (_req, res) => {
  const filePath = path.resolve(process.cwd(), "public", "robots.txt");
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "text/plain");
    return res.sendFile(filePath);
  }
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`);
});
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, tool, mode } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        let systemInstruction = "You are an expert copywriter and editor for alltoolspk.com.";
        if (tool === "paraphraser") {
          systemInstruction = `You are an expert AI text paraphraser. Mode: ${mode || "Standard"}. Rewrite the provided text naturally, preserving all key meanings, while matching the specified tone. Return ONLY the rewritten text without commentary or quotes.`;
        } else if (tool === "resume-builder") {
          systemInstruction = `You are a Fortune 500 ATS Resume Optimizer. Rewrite the candidate's achievements using the Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]. Use strong action verbs, quantify impact where possible, and return ONLY 2-3 clean bullet points without markdown headers or conversational filler.`;
        }
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7
          }
        });
        const text = response.text || "";
        if (text) {
          return res.json({ text: text.trim(), source: "gemini" });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to local model:", geminiError);
      }
    }
    if (tool === "paraphraser") {
      let rewritten = prompt;
      if (mode === "Fluency") {
        rewritten = prompt.replace(/due to the fact that/gi, "because").replace(/in order to/gi, "to").replace(/utilize/gi, "use").replace(/demonstrate/gi, "show").replace(/furthermore/gi, "also").replace(/consequently/gi, "as a result");
      } else if (mode === "Humanize") {
        rewritten = prompt.replace(/crucial/gi, "vital").replace(/paramount/gi, "essential").replace(/tapestry/gi, "fabric").replace(/testament/gi, "proof").replace(/delve/gi, "look deeply");
      } else {
        rewritten = prompt.replace(/significant/gi, "substantial").replace(/effective/gi, "successful").replace(/optimize/gi, "enhance").replace(/opportunity/gi, "chance");
      }
      return res.json({ text: rewritten, source: "local-heuristic" });
    }
    if (tool === "resume-builder") {
      const { context } = req.body;
      if (context === "summary") {
        const enhanced = `Results-oriented professional with a proven track record. ${prompt.trim()} Recognized for optimizing operational workflows, elevating technical excellence, and driving measurable business growth.`;
        return res.json({ text: enhanced, source: "local-heuristic" });
      }
      const bullets = prompt.split("\n").filter((b) => b.trim().length > 0).map((b) => {
        const clean = b.replace(/^[•*-]\s*/, "");
        return `\u2022 Engineered and scaled ${clean.toLowerCase()}, resulting in a 25% improvement in processing latency and system reliability.`;
      }).join("\n");
      return res.json({
        text: bullets || "\u2022 Architected core microservices, increasing throughput by 30% and reducing infrastructure overhead.",
        source: "local-heuristic"
      });
    }
    return res.json({ text: prompt, source: "echo" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    const gzipCache = /* @__PURE__ */ new Map();
    const compressibleMime = {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".svg": "image/svg+xml",
      ".json": "application/json; charset=utf-8",
      ".xml": "application/xml; charset=utf-8",
      ".txt": "text/plain; charset=utf-8"
    };
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      const acceptEncoding = String(req.headers["accept-encoding"] || "");
      if (!acceptEncoding.includes("gzip")) return next();
      const cleanUrl = req.path === "/" ? "/index.html" : req.path;
      const ext = path.extname(cleanUrl);
      const mime = compressibleMime[ext];
      if (!mime) return next();
      const resolvedFile = path.resolve(distPath, `.${cleanUrl}`);
      if (!resolvedFile.startsWith(distPath) || !fs.existsSync(resolvedFile) || fs.statSync(resolvedFile).isDirectory()) {
        return next();
      }
      let compressed = gzipCache.get(resolvedFile);
      if (!compressed) {
        compressed = zlib.gzipSync(fs.readFileSync(resolvedFile), { level: 6 });
        gzipCache.set(resolvedFile, compressed);
      }
      res.setHeader("Content-Encoding", "gzip");
      res.setHeader("Vary", "Accept-Encoding");
      res.setHeader("Content-Type", mime);
      if (ext === ".html") {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
      return res.send(compressed);
    });
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        setHeaders(res, filePath) {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          }
        }
      })
    );
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      const indexHtmlPath = path.resolve(distPath, "index.html");
      const acceptEncoding = String(req.headers["accept-encoding"] || "");
      if (acceptEncoding.includes("gzip") && fs.existsSync(indexHtmlPath)) {
        let compressed = gzipCache.get(indexHtmlPath);
        if (!compressed) {
          compressed = zlib.gzipSync(fs.readFileSync(indexHtmlPath), { level: 6 });
          gzipCache.set(indexHtmlPath, compressed);
        }
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Vary", "Accept-Encoding");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(compressed);
      }
      res.sendFile(indexHtmlPath);
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
