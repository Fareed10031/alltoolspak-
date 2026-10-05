'use client';

import React, { useState } from 'react';
import { BookOpen, Copy, Check, ExternalLink, RefreshCw, ZoomIn, ZoomOut, Type } from 'lucide-react';

export function ArticleReader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(17);
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');

  const handleRead = async () => {
    if (!url) {
      alert('Please enter URL');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      alert('URL must start with https:// or http://');
      return;
    }

    setLoading(true);
    setContent('');
    setTitle('');
    try {
      const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxy);
      const data = await res.json();
      const html = data.contents;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const pageTitle = doc.querySelector('title')?.innerText || 'Article';
      setTitle(pageTitle);

      // Extract readable paragraphs from main article containers
      let articleText = '';
      const paras = doc.querySelectorAll('article p, main p, .post-content p, .entry-content p, p');
      const seen = new Set<string>();

      paras.forEach((p: any) => {
        const txt = p.innerText?.trim();
        if (txt && txt.length > 40 && !seen.has(txt)) {
          seen.add(txt);
          articleText += txt + '\n\n';
        }
      });

      if (!articleText.trim()) {
        articleText =
          'Could not extract clean text. The site might be using client-side rendering or blocking reader mode. Try another article URL.';
      }
      setContent(articleText);
    } catch (err) {
      setContent('Error loading article. Please check the URL and try again.');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6 border border-gray-100">
          <div className="flex justify-center mb-3">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <BookOpen className="w-8 h-8" />
            </span>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900">Article Reader Mode</h1>
          <p className="text-center text-gray-500 mt-2 text-[15px]">
            Paste any article link to read in clean, distraction-free mode.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/blog/article"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRead();
              }}
            />
            <button
              onClick={handleRead}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-7 py-3 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Reading...
                </>
              ) : (
                'Read Article'
              )}
            </button>
          </div>

          <div className="mt-4 bg-blue-50 text-blue-900 p-3 rounded-xl text-xs leading-relaxed">
            <b>Accessibility Notice:</b> This tool provides a distraction-free reader mode for clean,
            accessible viewing. Please respect original publishers and support journalism.
          </div>

          {content && (
            <div className="mt-8 border-t pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-bold text-xl text-gray-900 flex-1 leading-snug">{title}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontFamily((prev) => (prev === 'sans' ? 'serif' : 'sans'))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-xs font-medium flex items-center gap-1"
                    title="Toggle serif / sans-serif"
                  >
                    <Type className="w-3.5 h-3.5" />
                    {fontFamily === 'sans' ? 'Serif' : 'Sans'}
                  </button>
                  <button
                    onClick={() => setFontSize((prev) => Math.max(14, prev - 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100"
                    title="Decrease font size"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-xs text-gray-500 font-mono">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize((prev) => Math.min(24, prev + 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100"
                    title="Increase font size"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div
                className={`bg-[#fcfcfc] border border-gray-200 rounded-xl p-6 whitespace-pre-wrap text-gray-800 ${
                  fontFamily === 'serif' ? 'font-serif' : 'font-sans'
                }`}
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
              >
                {content}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Original Source
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleReader;
