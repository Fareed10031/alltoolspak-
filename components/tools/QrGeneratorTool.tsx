'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { QrCode, Download, Link2, Sparkles } from 'lucide-react';

export function QrGeneratorTool() {
  const tool = TOOLS.find((t) => t.slug === 'qr-generator') || {
    slug: 'qr-generator',
    name: 'QR Code Generator',
    desc: 'Create QR codes for links, text, or contact info instantly.',
    tag: 'Generator',
    colorIndex: 4,
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const updateQrCanvas = async (text: string, color: string, bg: string) => {
    if (!text || text.trim() === '') {
      setDataUrl(null);
      return;
    }
    try {
      const url = await QRCode.toDataURL(text.trim(), {
        width: 1024,
        margin: 2,
        color: {
          dark: color || '#000000',
          light: bg || '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });
      setDataUrl(url);
    } catch (err) {
      console.error('QR generation error:', err);
    }
  };

  const downloadQrCode = (form: Record<string, any>) => {
    if (!dataUrl) {
      alert('Please enter a link or text to generate a QR code.');
      return;
    }

    const a = document.createElement('a');
    a.href = dataUrl;
    const snippet = (form.text || 'qrcode')
      .trim()
      .replace(/https?:\/\//i, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .slice(0, 20);
    a.download = `QRCode_${snippet}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ProToolBase
      tool={tool}
      required={['text']}
      initialState={{
        text: '',
        color: '#000000',
        bg: '#ffffff',
      }}
      render={(form, setForm) => {
        const handleTextChange = (txt: string) => {
          setForm({ ...form, text: txt });
          updateQrCanvas(txt, form.color || '#000000', form.bg || '#ffffff');
        };

        const handleColorChange = (c: string) => {
          setForm({ ...form, color: c });
          updateQrCanvas(form.text || '', c, form.bg || '#ffffff');
        };

        return (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Target URL or Text Message *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://yourwebsite.com or Wi-Fi code"
                  value={form.text || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.color || '#000000'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200"
                  />
                  <span className="text-xs text-slate-500 font-mono">
                    {form.color || '#000000'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.bg || '#ffffff'}
                    onChange={(e) => {
                      setForm({ ...form, bg: e.target.value });
                      updateQrCanvas(form.text || '', form.color || '#000000', e.target.value);
                    }}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200"
                  />
                  <span className="text-xs text-slate-500 font-mono">
                    {form.bg || '#ffffff'}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Preview */}
            {dataUrl && (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center space-y-3">
                <span className="text-xs font-bold text-slate-500">Live QR Preview (1024×1024 Ultra HD)</span>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80">
                  <img src={dataUrl} alt="Generated QR" className="w-48 h-48 rounded-lg" />
                </div>
                <p className="text-[11px] text-slate-400">
                  High Error Correction (Level H - 30% recovery) • Scannable on all iOS &amp; Android cameras
                </p>
              </div>
            )}
          </div>
        );
      }}
      generateFile={downloadQrCode}
    />
  );
}

export default QrGeneratorTool;
