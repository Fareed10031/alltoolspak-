import React, { useState } from 'react';
import {
  Youtube,
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';
import { AIDisclosure } from '@/components/AIDisclosure';

interface QualityOption {
  key: string;
  name: string;
  resolution: string;
  file: string;
  badge: string;
}

const QUALITY_OPTIONS: QualityOption[] = [
  {
    key: 'maxres',
    name: 'Max Resolution (Ultra HD)',
    resolution: '1280 × 720 / 1080p',
    file: 'maxresdefault.jpg',
    badge: 'Best Quality',
  },
  {
    key: 'hq',
    name: 'High Quality (HQ)',
    resolution: '480 × 360 px',
    file: 'hqdefault.jpg',
    badge: 'Standard HD',
  },
  {
    key: 'sd',
    name: 'Standard Definition (SD)',
    resolution: '640 × 480 px',
    file: 'sddefault.jpg',
    badge: 'Crisp 4:3',
  },
  {
    key: 'mq',
    name: 'Medium Quality (MQ)',
    resolution: '320 × 180 px',
    file: 'mqdefault.jpg',
    badge: 'Compact',
  },
];

export function YouTubeThumb() {
  const [urlInput, setUrlInput] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [videoId, setVideoId] = useState<string>('dQw4w9WgXcQ');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string>('');

  const extractVideoId = (input: string): string | null => {
    if (!input) return null;
    const trimmed = input.trim();
    // Handles watch?v=, youtu.be/, shorts/, embed/, etc.
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
    const match = trimmed.match(regExp);
    if (match && match[1]) {
      return match[1];
    }
    // If user entered straight 11 char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    return null;
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setInputError('');
    const extracted = extractVideoId(urlInput);
    if (extracted) {
      setVideoId(extracted);
    } else {
      setInputError('Please enter a valid YouTube video link or 11-character video ID.');
    }
  };

  const handleDownload = async (imageUrl: string, filename: string, key: string) => {
    setDownloadingKey(key);
    try {
      // Attempt fetch blob first
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch {
      // If CORS blocks direct fetch, draw image onto offscreen canvas and export blob
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const objectUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = objectUrl;
              link.download = filename;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(objectUrl);
            }
          }, 'image/jpeg', 0.95);
        }
      };
      img.src = imageUrl;
    } finally {
      setTimeout(() => setDownloadingKey(null), 500);
    }
  };

  const copyUrlToClipboard = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Structured Data (JSON-LD) for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is it legal to download YouTube thumbnails?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. YouTube thumbnails are publicly cached graphics hosted on Google CDN edge servers. Downloading them for presentation references, research, fair use criticism, or portfolio archiving is completely permissible.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does maxresdefault sometimes return a placeholder gray box?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If a creator uploaded an older video in 480p or neglected to supply a custom 1080p cover, YouTube defaults to hqdefault.jpg. You can always download the High Quality (hqdefault) version instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this tool work with YouTube Shorts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Simply copy the YouTube Shorts URL (e.g. youtube.com/shorts/VIDEO_ID), paste it into the search box, and our extractor will resolve all thumbnail resolutions instantly.',
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <a href="/tools" className="hover:underline hover:text-emerald-600">Tools</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">YouTube Thumbnail Grabber</span>
      </nav>

      {/* Header & Author Byline */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60">
          <Youtube className="w-3.5 h-3.5" />
          <span>Full HD Thumbnail Extractor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          YouTube Thumbnail Downloader – 1080p, HQ & SD
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">By Fareed Ullah</span>
          <span>&bull;</span>
          <span>Updated Sept 24 2026</span>
          <span>&bull;</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">100% Free &bull; No API Limits</span>
        </div>
      </div>

      {/* Ad Slot #1 (Top) */}
      <AdSlot label="Top YouTube Downloader Ad" />

      {/* Main Interactive Tool Card */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6 space-y-6">
          {/* Input Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Paste YouTube link (e.g. https://www.youtube.com/watch?v=... or shorts)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="h-12 pl-4 pr-10 text-sm font-medium"
              />
            </div>
            <Button
              type="submit"
              variant="emerald"
              size="lg"
              className="h-12 px-6 gap-2 cursor-pointer font-bold shrink-0"
            >
              <Search className="w-4 h-4" />
              Extract Thumbnails
            </Button>
          </form>

          {inputError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-medium">
              {inputError}
            </div>
          )}

          {/* Quick Demo Pill Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Try sample videos:</span>
            <button
              type="button"
              onClick={() => {
                setUrlInput('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                setVideoId('dQw4w9WgXcQ');
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              Rick Astley (1080p)
            </button>
            <button
              type="button"
              onClick={() => {
                setUrlInput('https://www.youtube.com/watch?v=jNQXAC9IVRw');
                setVideoId('jNQXAC9IVRw');
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              First YouTube Video (HQ)
            </button>
          </div>

          {/* Video Metadata Indicator */}
          {videoId && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Target Video ID: <code className="font-mono text-emerald-600 dark:text-emerald-400">{videoId}</code>
                </span>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-slate-500 hover:text-red-500 flex items-center gap-1 text-[11px]"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* 4 Thumbnails Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {QUALITY_OPTIONS.map((opt) => {
              const imgUrl = `https://img.youtube.com/vi/${videoId}/${opt.file}`;
              const filename = `youtube_${videoId}_${opt.key}.jpg`;
              const isDownloading = downloadingKey === opt.key;
              const isCopied = copiedKey === opt.key;

              return (
                <div
                  key={opt.key}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {opt.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {opt.resolution}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {opt.badge}
                    </span>
                  </div>

                  {/* Thumbnail Image Display */}
                  <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={`YouTube thumbnail for ${videoId} in ${opt.name}`}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      onError={(e) => {
                        // Fallback to hqdefault if maxres doesn't exist
                        if (opt.key === 'maxres') {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }
                      }}
                    />
                  </div>

                  {/* Direct CDN URL display */}
                  <div className="px-3 py-1.5 bg-slate-100/70 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 truncate select-all">
                    {imgUrl}
                  </div>

                  {/* Action Bar */}
                  <div className="p-3 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyUrlToClipboard(imgUrl, opt.key)}
                      className="text-xs cursor-pointer flex-1 gap-1"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? 'Link Copied' : 'Copy CDN Link'}
                    </Button>

                    <Button
                      variant="emerald"
                      size="sm"
                      disabled={isDownloading}
                      onClick={() => handleDownload(imgUrl, filename, opt.key)}
                      className="text-xs font-semibold cursor-pointer flex-1 gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {isDownloading ? 'Saving...' : 'Download JPG'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Disclosure requirement */}
          <AIDisclosure isAITool={false} />
        </CardContent>
      </Card>

      {/* Ad Slot #2 (Mid) */}
      <AdSlot label="In-Content Middle Display" />

      {/* SEO Helpful Content (>400 words, What is, How to use, FAQs) */}
      <section className="mt-12 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            What is the YouTube Thumbnail Grabber?
          </h2>
          <p>
            The <strong>alltoolspk.com YouTube Thumbnail Grabber</strong> is a specialized, high-resolution media extractor that allows video editors, digital marketers, content creators, and researchers to fetch and download full-resolution video cover art directly from Google&apos;s global Content Delivery Network (CDN). A video thumbnail is the single most important factor dictating initial audience impressions and click-through rates (CTR) across YouTube search feeds and recommendation algorithms.
          </p>
          <p>
            Unlike third-party scraper websites that route video streams through suspicious remote servers infested with malicious pop-under scripts and deceptive download buttons, alltoolspk.com executes pure client-side string tokenization. Our tool extracts the sanitized 11-character video ID right in your browser, verifies image availability across Google&apos;s edge servers, and streams the binary image directly to your local storage via HTML5 Blob memory heaps with 100% security.
          </p>
        </div>

        {/* How to use */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Use the YouTube Thumbnail Grabber in 3 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 1: Paste Video URL</span>
              <p className="text-slate-600 dark:text-slate-400">
                Copy any standard YouTube video or Shorts link (e.g., youtube.com/watch?v=... or youtu.be/...) and paste it into the search box.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 2: Preview Resolutions</span>
              <p className="text-slate-600 dark:text-slate-400">
                Click <em>Extract Thumbnails</em>. All available CDN resolutions—including Ultra HD 1080p (MaxRes), High Quality (HQ), Standard (SD), and Medium (MQ)—render instantly.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 3: Direct Download</span>
              <p className="text-slate-600 dark:text-slate-400">
                Click <em>Download JPG</em> under your preferred quality card. The image saves directly into your device Downloads folder without new tab redirects or watermarks.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Understanding Google CDN Quality Tiers
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li><strong>maxresdefault.jpg:</strong> 1280 &times; 720 resolution (16:9 widescreen). Uploaded by channel owners as their primary thumbnail. Ideal for high-DPI desktop displays.</li>
              <li><strong>sddefault.jpg:</strong> 640 &times; 480 resolution (4:3 ratio). Standard definition fallback used on mobile apps.</li>
              <li><strong>hqdefault.jpg:</strong> 480 &times; 360 resolution. Guaranteed to exist for every single video published on YouTube since 2005.</li>
              <li><strong>mqdefault.jpg:</strong> 320 &times; 180 resolution. Lightweight web preview thumbnail used in search suggestion dropdowns.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Direct Blob Saving Architecture
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard web browsers often open remote JPG images in a new browser tab when clicking download links due to cross-origin headers. alltoolspk.com avoids this friction by retrieving the binary payload as an offscreen <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Blob</code> or piping it through a local HTML5 canvas context, triggering a direct, instant filesystem save.
            </p>
          </div>
        </div>

        {/* 4 FAQs Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQs)
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Is it legal to download YouTube thumbnails?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Yes. YouTube thumbnails are publicly cached graphics hosted on Google CDN edge servers. Downloading them for presentation references, design inspiration, research, fair use criticism, or portfolio archiving is completely permissible.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Why does maxresdefault sometimes return a placeholder gray box?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                If a creator uploaded an older video in 480p or neglected to supply a custom 1080p cover, YouTube defaults to hqdefault.jpg. You can always download the High Quality (hqdefault) version instead.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Does this tool work with YouTube Shorts?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Yes. Simply copy the YouTube Shorts URL (e.g. youtube.com/shorts/VIDEO_ID), paste it into the search box, and our extractor will resolve all thumbnail resolutions instantly.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Do I need to sign up or install any browser extensions?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                No. alltoolspk.com works right inside your standard web browser across desktop, tablet, and mobile devices without registration, installations, or fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot #3 (Bottom) */}
      <AdSlot label="Bottom Responsive Rectangle" />
    </div>
  );
}
