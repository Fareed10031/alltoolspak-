// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import zlib from "zlib";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// src/lib/seoCanonical.ts
var SITE_URL = "https://alltoolspk.com";
var CANONICAL_PAGES = {
  home: {
    slug: "",
    name: "AllToolsPK",
    category: "Home",
    title: "AllToolsPK - 14 Free Private Online Tools (Finance, PDF, Visa & Utilities)",
    description: "Use 14 free client-side tools on AllToolsPK: Car Accident Settlement Calculator, Mortgage USA, Paycheck 2026, Amazon EU VAT, OneVisa World, ATS Resume & PDF Suite.",
    canonical: `${SITE_URL}/`,
    robots: "index, follow, max-image-preview:large",
    isTool: false
  },
  "global-accident-emergency": {
    slug: "global-accident-emergency",
    name: "Car Accident Settlement Calculator",
    category: "Legal & Insurance",
    title: "Car Accident Settlement Calculator (195 Countries) | AllToolsPK",
    description: "Estimate car accident insurance claims, bodily injury multipliers, medical bills, lost wages, and rehabilitation settlements across 195 countries privately.",
    canonical: `${SITE_URL}/global-accident-emergency`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "FinanceApplication"
  },
  "mortgage-calculator-usa": {
    slug: "mortgage-calculator-usa",
    name: "Mortgage Calculator USA",
    category: "Finance",
    title: "Mortgage Calculator USA 2026 (PMI, Property Tax & HOA) | AllToolsPK",
    description: "Calculate accurate US monthly mortgage payments including principal, interest, PMI, county property taxes, home insurance, and HOA fees with amortization.",
    canonical: `${SITE_URL}/mortgage-calculator-usa`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "FinanceApplication"
  },
  "usa-paycheck-calculator-2026": {
    slug: "usa-paycheck-calculator-2026",
    name: "USA Paycheck Calculator 2026",
    category: "Finance",
    title: "USA Paycheck Calculator 2026 (Federal, State & FICA Tax) | AllToolsPK",
    description: "Calculate your 2026 US take-home pay after Federal income tax, State taxes, 401(k) contributions, Social Security, and Medicare deductions using IRS brackets.",
    canonical: `${SITE_URL}/usa-paycheck-calculator-2026`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "FinanceApplication"
  },
  "amazon-eu-vat-calculator": {
    slug: "amazon-eu-vat-calculator",
    name: "Amazon EU VAT Calculator",
    category: "E-Commerce",
    title: "Amazon EU VAT Calculator (27 EU States & OSS Ready) | AllToolsPK",
    description: "Compute destination EU VAT rates, net vs gross pricing, and OSS/IOSS invoices across all 27 European Union countries for Amazon FBA sellers.",
    canonical: `${SITE_URL}/amazon-eu-vat-calculator`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "BusinessApplication"
  },
  "currency-gold-rates": {
    slug: "currency-gold-rates",
    name: "Live Currency & Gold Rates",
    category: "Finance",
    title: "Live Currency & Gold Rates Today (USD to PKR & 24K Tola) | AllToolsPK",
    description: "Track real-time USD to PKR interbank exchange rates across 150+ currencies plus live 24K & 22K gold prices per tola, 10 grams, and ounce.",
    canonical: `${SITE_URL}/currency-gold-rates`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "FinanceApplication"
  },
  "global-salary-calculator": {
    slug: "global-salary-calculator",
    name: "Global Salary Calculator",
    category: "Finance",
    title: "Global Salary Calculator (192 Countries Net Pay & PPP) | AllToolsPK",
    description: "Compare gross-to-net take-home salary, income taxes, hourly freelance billing rates, and Purchasing Power Parity across 192 countries worldwide.",
    canonical: `${SITE_URL}/global-salary-calculator`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "FinanceApplication"
  },
  "ats-resume-builder": {
    slug: "ats-resume-builder",
    name: "ATS Resume Builder",
    category: "Career",
    title: "Free ATS Resume Builder & CV Maker (Selectable Text PDF) | AllToolsPK",
    description: "Create 100% ATS-friendly single-column resumes that pass Workday, Taleo, and Greenhouse parsers. Export clean, selectable text PDFs with zero paywall.",
    canonical: `${SITE_URL}/ats-resume-builder`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "BusinessApplication"
  },
  "pdf-3x-pro": {
    slug: "pdf-3x-pro",
    name: "PDF 3X Pro Suite",
    category: "PDF & Documents",
    title: "PDF 3X Pro - Free PDF to Word, Compress PDF & Word to PDF | AllToolsPK",
    description: "Convert PDF to editable Word (2-column layout fix), compress PDFs up to 80% with searchable text, and convert DOCX to PDF 100% client-side.",
    canonical: `${SITE_URL}/pdf-3x-pro`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "pdf-merger": {
    slug: "pdf-merger",
    name: "PDF Merger",
    category: "PDF & Documents",
    title: "Free PDF Merger Online - Combine PDF Files Privately | AllToolsPK",
    description: "Merge multiple PDF documents into a single ordered PDF directly in your browser with zero file uploads, zero watermarks, and instant download.",
    canonical: `${SITE_URL}/pdf-merger`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "image-to-pdf": {
    slug: "image-to-pdf",
    name: "Image to PDF Converter",
    category: "PDF & Documents",
    title: "Free Image to PDF Converter (JPG, PNG, WebP to PDF) | AllToolsPK",
    description: "Convert JPG, PNG, and WebP photos into crisp multi-page A4 or Letter PDF files offline in your browser with custom margins and zero quality loss.",
    canonical: `${SITE_URL}/image-to-pdf`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "qr-code-generator": {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Utilities",
    title: "Free QR Code Generator (Custom Colors, WiFi, vCard & PNG/SVG) | AllToolsPK",
    description: "Generate high-resolution custom QR codes for URLs, WiFi networks, WhatsApp links, and business vCards with custom colors and instant PNG/JPG export.",
    canonical: `${SITE_URL}/qr-code-generator`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "age-calculator": {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Calculators",
    title: "Free Age Calculator - Exact Age in Years, Months, Days | AllToolsPK",
    description: "Calculate exact chronological age from date of birth in years, months, weeks, days, hours, and next birthday countdown for official exams and forms.",
    canonical: `${SITE_URL}/age-calculator`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "onevisa-world-visa-points": {
    slug: "onevisa-world-visa-points",
    name: "OneVisa World Visa Points Calculator",
    category: "Immigration",
    title: "OneVisa World - Global Visa Eligibility & CRS Points Calculator | AllToolsPK",
    description: "Check visa points eligibility for Canada Express Entry CRS, UK Skilled Worker (70 pts), Australia GSM (65 pts), and Germany Opportunity Card.",
    canonical: `${SITE_URL}/onevisa-world-visa-points`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "unit-converter": {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "Calculators",
    title: "Free Unit Converter (Length, Weight, Temp, Marla & Kanal) | AllToolsPK",
    description: "Convert 200+ measurement units instantly including length, weight, temperature, volume, speed, and regional land units like Marla, Kanal, and Sq Ft.",
    canonical: `${SITE_URL}/unit-converter`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  // Supporting tools (kept functional & clean, never broken)
  "password-gen": {
    slug: "password-gen",
    name: "Password Generator",
    category: "Utilities",
    title: "Cryptographic Password Generator - Strong Random Passwords | AllToolsPK",
    description: "Generate unbreakable random passwords offline in your browser with customizable length, symbols, numbers, and entropy strength meter.",
    canonical: `${SITE_URL}/password-gen`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "image-compress": {
    slug: "image-compress",
    name: "Image Compressor",
    category: "Utilities",
    title: "Free Browser Image Compressor (JPG, PNG, WebP) | AllToolsPK",
    description: "Compress JPG, PNG, and WebP images client-side without losing visual clarity or uploading private photos to remote servers.",
    canonical: `${SITE_URL}/image-compress`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "youtube-thumb": {
    slug: "youtube-thumb",
    name: "YouTube Thumbnail Grabber",
    category: "Utilities",
    title: "YouTube Thumbnail Downloader (1080p MaxRes, HQ & SD) | AllToolsPK",
    description: "Extract and download high-resolution 1080p, HQ, SD, and MQ YouTube and Shorts video thumbnails instantly.",
    canonical: `${SITE_URL}/youtube-thumb`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  paraphraser: {
    slug: "paraphraser",
    name: "Text Paraphraser",
    category: "Utilities",
    title: "Free Online Text Paraphraser & Rewriter | AllToolsPK",
    description: "Rewrite and refine paragraphs in Standard, Fluency, or Natural modes cleanly inside your browser.",
    canonical: `${SITE_URL}/paraphraser`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  detector: {
    slug: "detector",
    name: "AI Content Pattern Checker",
    category: "Utilities",
    title: "AI Content Pattern & Readability Analyzer | AllToolsPK",
    description: "Analyze sentence burstiness, perplexity cues, and writing patterns locally in your browser.",
    canonical: `${SITE_URL}/detector`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  "humanize-ai-text": {
    slug: "humanize-ai-text",
    name: "Natural Text Humanizer",
    category: "Utilities",
    title: "Natural Writing & Tone Refiner | AllToolsPK",
    description: "Polish stiff or repetitive text into natural, readable human prose directly in your browser.",
    canonical: `${SITE_URL}/humanize-ai-text`,
    robots: "index, follow, max-image-preview:large",
    isTool: true,
    applicationCategory: "UtilitiesApplication"
  },
  // Legal & Info Pages (5 Canonical pages in sitemap.xml)
  "privacy-policy": {
    slug: "privacy-policy",
    name: "Privacy Policy",
    category: "Legal",
    title: "Privacy Policy & Client-Side Data Guarantee | AllToolsPK",
    description: "Read the AllToolsPK Privacy Policy detailing zero server file uploads, cookies, Google AdSense disclosures, and GDPR/CCPA rights.",
    canonical: `${SITE_URL}/privacy-policy`,
    robots: "index, follow, max-image-preview:large",
    isTool: false
  },
  "terms-of-service": {
    slug: "terms-of-service",
    name: "Terms of Service",
    category: "Legal",
    title: "Terms of Service & Usage Guidelines | AllToolsPK",
    description: "Review the AllToolsPK Terms of Service covering free online tool usage, calculator accuracy disclaimers, and intellectual property.",
    canonical: `${SITE_URL}/terms-of-service`,
    robots: "index, follow, max-image-preview:large",
    isTool: false
  },
  "about-us": {
    slug: "about-us",
    name: "About Us",
    category: "Legal",
    title: "About AllToolsPK - Privacy-First Free Utility Suite",
    description: "Learn about AllToolsPK, founder Fareed Ullah, and our mission to deliver fast, zero-upload browser tools globally.",
    canonical: `${SITE_URL}/about-us`,
    robots: "index, follow, max-image-preview:large",
    isTool: false
  },
  "contact-us": {
    slug: "contact-us",
    name: "Contact Us",
    category: "Legal",
    title: "Contact AllToolsPK Support & Founder Fareed Ullah",
    description: "Get in touch with AllToolsPK for technical support, bug reports, feature requests, and partnership inquiries.",
    canonical: `${SITE_URL}/contact-us`,
    robots: "index, follow, max-image-preview:large",
    isTool: false
  },
  disclaimer: {
    slug: "disclaimer",
    name: "Disclaimer",
    category: "Legal",
    title: "Legal, Financial & Medical Estimator Disclaimer | AllToolsPK",
    description: "Read the official AllToolsPK disclaimer regarding financial calculators, accident settlement estimates, and informational content.",
    canonical: `${SITE_URL}/disclaimer`,
    robots: "index, follow, max-image-preview:large",
    isTool: false
  },
  // Thin / Secondary pages -> explicitly noindex, follow and excluded from sitemap
  blog: {
    slug: "blog",
    name: "Blog",
    category: "Guides",
    title: "AllToolsPK Blog & Guides",
    description: "Upcoming guides and tutorials for AllToolsPK utilities.",
    canonical: `${SITE_URL}/blog`,
    robots: "noindex, follow",
    isTool: false
  },
  cookies: {
    slug: "cookies",
    name: "Cookie Policy",
    category: "Legal",
    title: "Cookie Policy & Storage Audit | AllToolsPK",
    description: "Audit inventory of local storage keys and optional cookies on AllToolsPK.",
    canonical: `${SITE_URL}/cookies`,
    robots: "noindex, follow",
    isTool: false
  }
};
var ROUTE_ALIASES = {
  // Home aliases
  home: "",
  index: "",
  tools: "",
  // Canonical tool aliases -> canonical sitemap slug
  "emergency-os": "global-accident-emergency",
  emergency: "global-accident-emergency",
  "accident-calculator": "global-accident-emergency",
  "compensation-calculator": "global-accident-emergency",
  "accident-compensation": "global-accident-emergency",
  "car-accident-settlement-calculator": "global-accident-emergency",
  "accident-settlement-calculator": "global-accident-emergency",
  "personal-injury-compensation": "global-accident-emergency",
  "mortgage-calculator": "mortgage-calculator-usa",
  mortgage: "mortgage-calculator-usa",
  "mortgage-calc": "mortgage-calculator-usa",
  "usa-paycheck-calculator": "usa-paycheck-calculator-2026",
  "paycheck-calculator": "usa-paycheck-calculator-2026",
  paycheck: "usa-paycheck-calculator-2026",
  "tax-calculator": "usa-paycheck-calculator-2026",
  "amazon-eu-vat": "amazon-eu-vat-calculator",
  "amazon-vat": "amazon-eu-vat-calculator",
  "amazon-vat-calculator": "amazon-eu-vat-calculator",
  "eu-vat-calculator": "amazon-eu-vat-calculator",
  "vat-calculator": "amazon-eu-vat-calculator",
  "live-currency-gold-rates": "currency-gold-rates",
  "currency-gold": "currency-gold-rates",
  "gold-rates": "currency-gold-rates",
  "currency-rates": "currency-gold-rates",
  "usd-to-pkr": "currency-gold-rates",
  "usd-to-pkr-live": "currency-gold-rates",
  "gold-price-pakistan": "currency-gold-rates",
  "crypto-converter": "currency-gold-rates",
  crypto: "currency-gold-rates",
  "bitcoin-to-pkr": "currency-gold-rates",
  "crypto-calculator": "currency-gold-rates",
  "global-salary": "global-salary-calculator",
  "salary-calculator": "global-salary-calculator",
  "world-salary": "global-salary-calculator",
  "freelance-rate-calculator": "global-salary-calculator",
  "resume-builder": "ats-resume-builder",
  "ats-resume-checker": "ats-resume-builder",
  resume: "ats-resume-builder",
  "cv-builder": "ats-resume-builder",
  "pdf-to-word": "pdf-3x-pro",
  "pdf-to-word-converter": "pdf-3x-pro",
  pdf2word: "pdf-3x-pro",
  pdftoword: "pdf-3x-pro",
  "pdf-3x": "pdf-3x-pro",
  pdf3xpro: "pdf-3x-pro",
  "pdf-merge": "pdf-merger",
  "pdf-tools": "pdf-merger",
  pdf: "pdf-merger",
  "pdf-suite": "pdf-merger",
  "img-to-pdf": "image-to-pdf",
  "jpg-to-pdf": "image-to-pdf",
  "png-to-pdf": "image-to-pdf",
  "qr-generator": "qr-code-generator",
  "qr-code": "qr-code-generator",
  qr: "qr-code-generator",
  "age-calc": "age-calculator",
  age: "age-calculator",
  "onevisa-world": "onevisa-world-visa-points",
  "visa-eligibility": "onevisa-world-visa-points",
  "visa-calculator": "onevisa-world-visa-points",
  "crs-calculator": "onevisa-world-visa-points",
  "global-visa-calculator": "onevisa-world-visa-points",
  "uk-visa-points-calculator": "onevisa-world-visa-points",
  "canada-crs-calculator": "onevisa-world-visa-points",
  "onevisa-world-visa-points-calculator": "onevisa-world-visa-points",
  "unit-convert": "unit-converter",
  converter: "unit-converter",
  // Companion tool aliases
  "password-generator": "password-gen",
  "pass-gen": "password-gen",
  password: "password-gen",
  "image-compressor": "image-compress",
  "youtube-thumbnail": "youtube-thumb",
  "ai-paraphraser": "paraphraser",
  "ai-detector": "detector",
  "humanize-ai": "humanize-ai-text",
  // Legal aliases
  about: "about-us",
  privacy: "privacy-policy",
  security: "privacy-policy",
  terms: "terms-of-service",
  "terms-and-conditions": "terms-of-service",
  contact: "contact-us",
  "cookie-policy": "cookies"
};
function resolveSeoPath(rawPath) {
  const pathOnly = (rawPath || "/").split("?")[0].split("#")[0];
  if (/\.html$/i.test(pathOnly)) {
    const withoutHtml = pathOnly.replace(/\.html$/i, "");
    if (withoutHtml === "/index" || withoutHtml === "" || withoutHtml === "/") {
      return { kind: "redirect", destination: "/" };
    }
    const cleanSlug = withoutHtml.replace(/^\/+/, "").toLowerCase();
    const mapped = ROUTE_ALIASES[cleanSlug] ?? cleanSlug;
    if (mapped === "") return { kind: "redirect", destination: "/" };
    if (CANONICAL_PAGES[mapped]) return { kind: "redirect", destination: `/${mapped}` };
    return { kind: "redirect", destination: withoutHtml.replace(/\/+$/, "") || "/" };
  }
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) {
    const stripped = pathOnly.replace(/\/+$/, "");
    const inner = resolveSeoPath(stripped);
    if (inner.kind === "redirect") return inner;
    if (inner.kind === "page") {
      return { kind: "redirect", destination: inner.page.slug ? `/${inner.page.slug}` : "/" };
    }
    return { kind: "redirect", destination: stripped };
  }
  const trimmed = pathOnly.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (trimmed === "") {
    return { kind: "page", page: CANONICAL_PAGES.home };
  }
  if (trimmed.startsWith("tools/")) {
    const subSlug = trimmed.replace(/^tools\//, "");
    const canonicalSlug = ROUTE_ALIASES[subSlug] ?? subSlug;
    if (canonicalSlug === "") return { kind: "redirect", destination: "/" };
    if (CANONICAL_PAGES[canonicalSlug]) {
      return { kind: "redirect", destination: `/${canonicalSlug}` };
    }
    return { kind: "not-found" };
  }
  if (Object.prototype.hasOwnProperty.call(ROUTE_ALIASES, trimmed)) {
    const canonicalSlug = ROUTE_ALIASES[trimmed];
    return { kind: "redirect", destination: canonicalSlug ? `/${canonicalSlug}` : "/" };
  }
  if (Object.prototype.hasOwnProperty.call(CANONICAL_PAGES, trimmed)) {
    return { kind: "page", page: CANONICAL_PAGES[trimmed] };
  }
  if (trimmed.startsWith("global-salary-calculator/")) {
    const countrySlug = trimmed.replace("global-salary-calculator/", "");
    if (countrySlug && !countrySlug.includes("/")) {
      const countryName = countrySlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return {
        kind: "page",
        page: {
          slug: `global-salary-calculator/${countrySlug}`,
          name: `${countryName} Salary Calculator`,
          category: "Finance",
          title: `${countryName} Salary & Tax Calculator 2026 | AllToolsPK`,
          description: `Calculate net take-home salary, income taxes, and purchasing power in ${countryName} for 2026.`,
          canonical: `${SITE_URL}/global-salary-calculator/${countrySlug}`,
          robots: "index, follow, max-image-preview:large",
          isTool: true,
          applicationCategory: "FinanceApplication"
        }
      };
    }
  }
  return { kind: "not-found" };
}
function buildSoftwareApplicationJsonLd(page) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.name,
    description: page.description,
    url: page.canonical,
    applicationCategory: page.applicationCategory || "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

// server.ts
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
process.on("uncaughtException", (err) => {
  console.error("[Server] Caught uncaughtException (prevented crash):", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[Server] Caught unhandledRejection (prevented crash):", reason);
});
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, status: "healthy" });
});
app.use((_req, res, next) => {
  try {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  } catch (err) {
    console.warn("[Server] Header middleware warning:", err);
  }
  next();
});
function escapeHtmlAttr(val) {
  return val.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function injectSeoIntoHtml(html, page) {
  const safeTitle = escapeHtmlAttr(page.title);
  const safeDesc = escapeHtmlAttr(page.description);
  const safeCanonical = escapeHtmlAttr(page.canonical);
  const safeRobots = escapeHtmlAttr(page.robots);
  let updated = html;
  if (/<title>[\s\S]*?<\/title>/i.test(updated)) {
    updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  } else {
    updated = updated.replace("</head>", `  <title>${safeTitle}</title>
  </head>`);
  }
  if (/<meta\b[^>]*\bname=["']robots["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /<meta\b[^>]*\bname=["']robots["'][^>]*>/i,
      `<meta name="robots" content="${safeRobots}" />`
    );
  } else {
    updated = updated.replace("</head>", `  <meta name="robots" content="${safeRobots}" />
  </head>`);
  }
  updated = updated.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>\s*/gi, "");
  updated = updated.replace("</head>", `  <link rel="canonical" href="${safeCanonical}" />
  </head>`);
  if (/<meta\b[^>]*\bname=["']description["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /<meta\b[^>]*\bname=["']description["'][^>]*>/i,
      `<meta name="description" content="${safeDesc}" />`
    );
  } else {
    updated = updated.replace("</head>", `  <meta name="description" content="${safeDesc}" />
  </head>`);
  }
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
  updated = updated.replace(/<script\s+id=["']seo-software-schema["'][\s\S]*?<\/script>\s*/gi, "");
  updated = updated.replace(/<script\s+id=["']seo-breadcrumb-schema["'][\s\S]*?<\/script>\s*/gi, "");
  if (page.isTool) {
    const swSchema = JSON.stringify(buildSoftwareApplicationJsonLd(page));
    const bcSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.category, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 3, name: page.name, item: page.canonical }
      ]
    });
    updated = updated.replace(
      "</head>",
      `  <script id="seo-software-schema" type="application/ld+json">${swSchema}</script>
  <script id="seo-breadcrumb-schema" type="application/ld+json">${bcSchema}</script>
  </head>`
    );
  }
  return updated;
}
var SITEMAP_TOOL_SLUGS = [
  "global-accident-emergency",
  "mortgage-calculator-usa",
  "usa-paycheck-calculator-2026",
  "amazon-eu-vat-calculator",
  "currency-gold-rates",
  "global-salary-calculator",
  "ats-resume-builder",
  "pdf-3x-pro",
  "pdf-merger",
  "image-to-pdf",
  "qr-code-generator",
  "age-calculator",
  "onevisa-world-visa-points",
  "unit-converter"
];
var SITEMAP_LEGAL_SLUGS = [
  "privacy-policy",
  "terms-of-service",
  "about-us",
  "contact-us",
  "disclaimer"
];
function buildFallbackSitemap() {
  const now = "2026-11-20";
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
  ).join("\n")}
${SITEMAP_LEGAL_SLUGS.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  ).join("\n")}
</urlset>`;
}
var FALLBACK_ROBOTS = `User-agent: *
Allow: /
Disallow: /search
Disallow: /*?*
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`;
function sendReal404(res, distPath) {
  res.status(404);
  res.setHeader("X-Robots-Tag", "noindex, follow");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const candidates = [
    path.resolve(distPath, "404.html"),
    path.resolve(process.cwd(), "public", "404.html")
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return res.send(fs.readFileSync(candidate, "utf-8"));
      }
    } catch {
    }
  }
  return res.send(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Page Not Found (404) | AllToolsPK</title></head><body><h1>Page Not Found</h1><p>Return to <a href="/">AllToolsPK Home</a>.</p></body></html>'
  );
}
app.get("/sitemap.xml", (_req, res) => {
  try {
    const filePath = path.resolve(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type("application/xml").send(buildFallbackSitemap());
        }
      });
    }
  } catch (err) {
    console.warn("[Server] Sitemap read fallback:", err);
  }
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  return res.status(200).send(buildFallbackSitemap());
});
app.get("/robots.txt", (_req, res) => {
  try {
    const filePath = path.resolve(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type("text/plain").send(FALLBACK_ROBOTS);
        }
      });
    }
  } catch (err) {
    console.warn("[Server] Robots read fallback:", err);
  }
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(200).send(FALLBACK_ROBOTS);
});
app.get("/ads.txt", (_req, res) => {
  const fallbackAdsTxt = "google.com, pub-7765776011144949, DIRECT, f08c47fec0942fa0\n";
  try {
    const filePath = path.resolve(process.cwd(), "public", "ads.txt");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.sendFile(filePath, (err) => {
        if (err && !res.headersSent) {
          res.status(200).type("text/plain").send(fallbackAdsTxt);
        }
      });
    }
  } catch (err) {
    console.warn("[Server] ads.txt read fallback:", err);
  }
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(200).send(fallbackAdsTxt);
});
function buildHeuristicResponse(prompt, tool, mode, context) {
  if (tool === "paraphraser") {
    let rewritten = prompt;
    if (mode === "Fluency") {
      rewritten = prompt.replace(/due to the fact that/gi, "because").replace(/in order to/gi, "to").replace(/utilize/gi, "use").replace(/demonstrate/gi, "show").replace(/furthermore/gi, "also").replace(/consequently/gi, "as a result");
    } else if (mode === "Humanize") {
      rewritten = prompt.replace(/crucial/gi, "vital").replace(/paramount/gi, "essential").replace(/tapestry/gi, "fabric").replace(/testament/gi, "proof").replace(/delve/gi, "look deeply");
    } else {
      rewritten = prompt.replace(/significant/gi, "substantial").replace(/effective/gi, "successful").replace(/optimize/gi, "enhance").replace(/opportunity/gi, "chance");
    }
    return { text: rewritten, source: "local-heuristic" };
  }
  if (tool === "resume-builder") {
    if (context === "summary") {
      const enhanced = `Results-oriented professional with a proven track record. ${prompt.trim()} Recognized for optimizing operational workflows, elevating technical excellence, and driving measurable business growth.`;
      return { text: enhanced, source: "local-heuristic" };
    }
    const bullets = prompt.split("\n").filter((b) => b.trim().length > 0).map((b) => {
      const clean = b.replace(/^[•*-]\s*/, "");
      return `\u2022 Engineered and scaled ${clean.toLowerCase()}, resulting in a 25% improvement in processing latency and system reliability.`;
    }).join("\n");
    return {
      text: bullets || "\u2022 Architected core microservices, increasing throughput by 30% and reducing infrastructure overhead.",
      source: "local-heuristic"
    };
  }
  return { text: prompt, source: "echo" };
}
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, tool, mode, context } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
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
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Upstream AI request timeout")), 8e3)
        );
        const response = await Promise.race([
          ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.7
            }
          }),
          timeoutPromise
        ]);
        const text = response?.text || "";
        if (text) {
          return res.json({ text: text.trim(), source: "gemini" });
        }
      } catch (geminiError) {
        console.warn("[Server] Gemini API failed/timed out, using heuristic fallback:", geminiError);
      }
    }
    return res.json(buildHeuristicResponse(prompt, tool, mode, context));
  } catch (err) {
    console.warn("[Server] /api/ai error recovered:", err);
    return res.status(200).json({ text: "", source: "safe-fallback" });
  }
});
function isPageNavigationRequest(req) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;
  const reqPath = req.path || "/";
  if (reqPath.startsWith("/api/") || reqPath.startsWith("/assets/") || reqPath.startsWith("/@") || reqPath.startsWith("/src/") || reqPath.startsWith("/components/") || reqPath.startsWith("/app/") || reqPath.startsWith("/lib/") || reqPath.startsWith("/node_modules/")) {
    return false;
  }
  const ext = path.extname(reqPath).toLowerCase();
  if (ext && ext !== ".html") {
    return false;
  }
  return true;
}
async function startServer() {
  const distPath = path.resolve(process.cwd(), "dist");
  const rootIndexPath = path.resolve(process.cwd(), "index.html");
  const serveHtmlFallback = (res, page = CANONICAL_PAGES.home) => {
    try {
      const targetHtml = process.env.NODE_ENV === "production" && fs.existsSync(path.resolve(distPath, "index.html")) ? path.resolve(distPath, "index.html") : rootIndexPath;
      if (fs.existsSync(targetHtml)) {
        const raw = fs.readFileSync(targetHtml, "utf-8");
        const seoHtml = injectSeoIntoHtml(raw, page);
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("X-Robots-Tag", page.robots === "noindex, follow" ? "noindex, follow" : "index, follow");
        return res.status(200).type("text/html; charset=utf-8").send(seoHtml);
      }
    } catch (err) {
      console.error("[Server] HTML fallback read error:", err);
    }
    return res.status(200).type("text/html").send('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="1"><title>AllToolsPK</title></head><body><p>Loading AllToolsPK...</p></body></html>');
  };
  app.get("/404.html", (_req, res) => {
    return sendReal404(res, distPath);
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.use(async (req, res, next) => {
      if (!isPageNavigationRequest(req)) {
        return next();
      }
      try {
        const resolved = resolveSeoPath(req.path);
        if (resolved.kind === "redirect") {
          return res.redirect(301, resolved.destination);
        }
        if (resolved.kind === "not-found") {
          return sendReal404(res, distPath);
        }
        const rawHtml = fs.readFileSync(rootIndexPath, "utf-8");
        const transformed = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        const seoHtml = injectSeoIntoHtml(transformed, resolved.page);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader(
          "X-Robots-Tag",
          resolved.page.robots === "noindex, follow" ? "noindex, follow" : "index, follow"
        );
        return res.status(200).send(seoHtml);
      } catch (err) {
        console.warn("[Server] Dev SEO HTML handler error:", err);
        return next(err);
      }
    });
    app.use((req, res, next) => {
      try {
        vite.middlewares(req, res, next);
      } catch (err) {
        console.warn("[Server] Vite middleware recovered:", err);
        next(err);
      }
    });
  } else {
    const gzipCache = /* @__PURE__ */ new Map();
    const MAX_GZIP_CACHE_ENTRIES = 128;
    const MAX_COMPRESS_BYTES = 2 * 1024 * 1024;
    const compressibleMime = {
      ".js": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".svg": "image/svg+xml",
      ".json": "application/json; charset=utf-8",
      ".xml": "application/xml; charset=utf-8",
      ".txt": "text/plain; charset=utf-8"
    };
    const sendCompressedStatic = (req, res, filePath, mime) => {
      try {
        const acceptEncoding = String(req.headers["accept-encoding"] || "");
        if (!acceptEncoding.includes("gzip")) {
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
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Vary", "Accept-Encoding");
        res.setHeader("Content-Type", mime);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.status(200).send(compressed);
        return true;
      } catch (err) {
        console.warn("[Server] Gzip fallback to uncompressed file:", err);
        return false;
      }
    };
    app.use((req, res, next) => {
      if (!isPageNavigationRequest(req)) {
        return next();
      }
      try {
        const resolved = resolveSeoPath(req.path);
        if (resolved.kind === "redirect") {
          return res.redirect(301, resolved.destination);
        }
        if (resolved.kind === "not-found") {
          return sendReal404(res, distPath);
        }
        const indexHtmlPath = path.resolve(distPath, "index.html");
        if (!fs.existsSync(indexHtmlPath)) {
          return serveHtmlFallback(res, resolved.page);
        }
        const cacheKey = `html:${resolved.page.canonical}`;
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader(
          "X-Robots-Tag",
          resolved.page.robots === "noindex, follow" ? "noindex, follow" : "index, follow"
        );
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        const acceptEncoding = String(req.headers["accept-encoding"] || "");
        if (acceptEncoding.includes("gzip")) {
          let compressed = gzipCache.get(cacheKey);
          if (!compressed) {
            const rawHtml2 = fs.readFileSync(indexHtmlPath, "utf-8");
            const seoHtml2 = injectSeoIntoHtml(rawHtml2, resolved.page);
            compressed = zlib.gzipSync(Buffer.from(seoHtml2, "utf-8"), { level: 6 });
            if (gzipCache.size >= MAX_GZIP_CACHE_ENTRIES) {
              const firstKey = gzipCache.keys().next().value;
              if (firstKey) gzipCache.delete(firstKey);
            }
            gzipCache.set(cacheKey, compressed);
          }
          res.setHeader("Content-Encoding", "gzip");
          res.setHeader("Vary", "Accept-Encoding");
          return res.status(200).send(compressed);
        }
        const rawHtml = fs.readFileSync(indexHtmlPath, "utf-8");
        const seoHtml = injectSeoIntoHtml(rawHtml, resolved.page);
        return res.status(200).send(seoHtml);
      } catch (err) {
        console.warn("[Server] Production SEO handler error:", err);
        return serveHtmlFallback(res);
      }
    });
    app.use((req, res, next) => {
      try {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const rawPath = req.path || "/";
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
        console.warn("[Server] Static compression middleware bypassed safely:", err);
      }
      return next();
    });
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        setHeaders(res, filePath) {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=3600");
          }
        }
      })
    );
    app.get("*", (_req, res) => {
      return sendReal404(res, distPath);
    });
  }
  app.use((err, req, res, _next) => {
    console.error("[Server] Express error middleware recovered request:", req.originalUrl, err);
    if (res.headersSent) return;
    if (req.originalUrl.startsWith("/api/")) {
      return res.status(200).json({ ok: false, fallback: true, text: "" });
    }
    return serveHtmlFallback(res);
  });
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
  server.keepAliveTimeout = 65e3;
  server.headersTimeout = 66e3;
}
startServer().catch((err) => {
  console.error("[Server] Startup error:", err);
});
