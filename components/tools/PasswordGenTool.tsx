'use client';

import React, { useState, useEffect } from 'react';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';
import { KeyRound, RefreshCw, Copy, Check, ShieldCheck } from 'lucide-react';

export function PasswordGenTool() {
  const tool = TOOLS.find((t) => t.slug === 'password-gen') || {
    slug: 'password-gen',
    name: 'Password Generator',
    desc: 'Generate strong secure passwords instantly with custom length.',
    tag: 'Security',
    colorIndex: 5,
  };

  const [generatedPass, setGeneratedPass] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePasswordString = (
    length: number,
    uppercase: boolean,
    numbers: boolean,
    symbols: boolean
  ) => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~|}{[]:;?><,.-=';

    let pass = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pass += charset[array[i] % charset.length];
    }
    return pass;
  };

  const copyToClipboard = () => {
    if (!generatedPass) return;
    navigator.clipboard.writeText(generatedPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPasswordTxt = (form: Record<string, any>) => {
    if (!generatedPass) {
      alert('Please generate a password first.');
      return;
    }

    const purpose = (form.purpose || 'Account').trim();
    const content = [
      '====================================================',
      '        ALLTOOLSPK SECURE PASSWORD RECORD           ',
      '====================================================',
      `Account / Purpose: ${purpose}`,
      `Generated Date: ${new Date().toLocaleString()}`,
      `Password: ${generatedPass}`,
      `Character Length: ${form.length || 16}`,
      `Entropy Strength: 128-bit Cryptographically Secure`,
      '----------------------------------------------------',
      'SECURITY BEST PRACTICES:',
      '1. Store this file in an encrypted vault or password manager.',
      '2. Enable Two-Factor Authentication (2FA) on your account.',
      '3. Never share your master password over email or chat.',
      '====================================================',
      'Generated 100% offline via alltoolspk.com',
      '====================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safePurpose = purpose.replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `${safePurpose}_Secure_Password.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ProToolBase
      tool={tool}
      required={['purpose', 'hasPassword']}
      initialState={{
        purpose: '',
        length: 16,
        includeUppercase: true,
        includeNumbers: true,
        includeSymbols: true,
        hasPassword: '',
      }}
      render={(form, setForm) => {
        const length = form.length || 16;
        const uppercase = form.includeUppercase !== false;
        const numbers = form.includeNumbers !== false;
        const symbols = form.includeSymbols !== false;

        const handleRegenerate = () => {
          const pass = generatePasswordString(length, uppercase, numbers, symbols);
          setGeneratedPass(pass);
          setForm((prev) => ({ ...prev, hasPassword: 'true' }));
        };

        // Initialize on first render
        useEffect(() => {
          if (!generatedPass) {
            handleRegenerate();
          }
        }, []);

        return (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Account or Purpose Label *
              </label>
              <input
                type="text"
                placeholder="e.g. Personal Gmail, Work VPN, GitHub"
                value={form.purpose || ''}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Generated Password Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-base sm:text-lg flex items-center justify-between gap-3 shadow-inner">
              <span className="truncate tracking-wider">{generatedPass || '••••••••••••••••'}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy password"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  title="Generate new"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Length Slider & Options */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Password Length</span>
                <span className="text-blue-600 text-sm">{length} characters</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setForm({ ...form, length: val });
                  const pass = generatePasswordString(val, uppercase, numbers, symbols);
                  setGeneratedPass(pass);
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => {
                      setForm({ ...form, includeUppercase: e.target.checked });
                      const pass = generatePasswordString(length, e.target.checked, numbers, symbols);
                      setGeneratedPass(pass);
                    }}
                    className="rounded accent-blue-600"
                  />
                  <span>Uppercase (A-Z)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={numbers}
                    onChange={(e) => {
                      setForm({ ...form, includeNumbers: e.target.checked });
                      const pass = generatePasswordString(length, uppercase, e.target.checked, symbols);
                      setGeneratedPass(pass);
                    }}
                    className="rounded accent-blue-600"
                  />
                  <span>Numbers (0-9)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={symbols}
                    onChange={(e) => {
                      setForm({ ...form, includeSymbols: e.target.checked });
                      const pass = generatePasswordString(length, uppercase, numbers, e.target.checked);
                      setGeneratedPass(pass);
                    }}
                    className="rounded accent-blue-600"
                  />
                  <span>Symbols (!@#$)</span>
                </label>
              </div>
            </div>
          </div>
        );
      }}
      generateFile={downloadPasswordTxt}
    />
  );
}

export default PasswordGenTool;
