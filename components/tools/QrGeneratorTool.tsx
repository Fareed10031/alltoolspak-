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

  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const PRESET_COLORS = [
    { label: 'Black', hex: '#000000' },
    { label: 'Blue', hex: '#2563eb' },
    { label: 'Emerald', hex: '#059669' },
    { label: 'Purple', hex: '#7c3aed' },
    { label: 'Crimson', hex: '#dc2626' },
  ];

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
      setErrorMessage('Please enter a target link or text message to generate a QR code.');
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
          setErrorMessage('');
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
                  placeholder="https://yourwebsite.com or Wi-Fi network"
                  value={form.text || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Color controls with mobile-friendly touch chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Foreground Color
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_COLORS.map((pc) => (
                    <button
                      key={pc.hex}
                      type="button"
                      onClick={() => handleColorChange(pc.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        form.color === pc.hex
                          ? 'scale-110 border-blue-600 ring-2 ring-blue-400/40'
                          : 'border-white dark:border-slate-800'
                      }`}
                      style={{ backgroundColor: pc.hex }}
                      title={pc.label}
                    />
                  ))}
                  <input
                    type="color"
                    value={form.color || '#000000'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent p-0"
                    title="Custom color"
                  />
                  <span className="text-xs text-slate-500 font-mono ml-1">
                    {form.color || '#000000'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
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
                    className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-xs text-slate-500 font-mono">
                    {form.bg || '#ffffff'} (White / Light recommended)
                  </span>
                </div>
              </div>
            </div>

            {/* QR Preview */}
            {dataUrl && (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center space-y-3">
                <span className="text-xs font-bold text-slate-500">Live QR Preview (1024×1024 Ultra HD)</span>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80">
                  <img src={dataUrl} alt="Generated QR" className="w-44 h-44 sm:w-48 sm:h-48 rounded-lg" />
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  High Error Correction (Level H &bull; 30% recovery) &bull; Scannable on all iOS &amp; Android devices
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
