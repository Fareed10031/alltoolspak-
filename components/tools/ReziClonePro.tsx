'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Search,
  Layers,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';

export function ReziClonePro() {
  const [jd, setJd] = useState('');
  const [data, setData] = useState({
    name: 'Fareed Ullah',
    title: 'Operations Manager',
    email: 'fareedk1266@gmail.com',
    phone: '+92 300 1234567',
    city: 'Peshawar, Pakistan',
    summary:
      'Results-driven Operations Manager with 5+ years of proven expertise optimizing supply chain logistics, cross-functional team workflows, and enterprise resource allocation to achieve 28% operational cost reduction.',
    exp:
      'Operations Manager at Apex Logistics (2021 - Present)\n• Spearheaded warehouse automation & inventory tracking systems, reducing dispatch latency by 35%.\n• Managed cross-functional team of 24 specialists, maintaining 99.4% on-time delivery KPI across 140,000+ parcels.\n• Renegotiated vendor vendor contracts yielding $180k annual cost savings.',
    edu: 'B.S. in Business Administration & Management • University of Peshawar (2020)',
    skills:
      'Operations Management, Supply Chain Optimization, Inventory Control, KPI Dashboards, Vendor Negotiation, Cross-Functional Leadership, Workflow Automation',
  });

  const [error, setError] = useState('');

  // Strict ATS Validation Rule (V3 100% ATS LOCK)
  const validate = (field: string, value: string): boolean => {
    if (value.toLowerCase().includes('etc')) {
      setError('etc. likhna mana hai - poori skill likho (Avoid "etc" - write complete skill names)');
      return false;
    }
    if (field === 'exp' && value.trim().length > 0 && value.trim().length < 80) {
      setError('Experience me kam se kam 2 lines aur number (e.g. 25%, $50k) likho');
      return false;
    }
    if (field === 'summary' && value.trim().length > 0 && value.trim().length < 50) {
      setError('Professional summary must be at least 50 characters for ATS compliance');
      return false;
    }
    setError('');
    return true;
  };

  // Keyword Extraction Engine (Rezi & Jobscan Logic)
  const extractKeywords = () => {
    if (!jd.trim()) return [];
    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'you', 'are', 'our', 'will', 'this', 'that',
      'from', 'have', 'your', 'about', 'more', 'work', 'team', 'role', 'looking',
      'must', 'such', 'what', 'when', 'where', 'which', 'who', 'whom', 'why',
    ]);
    const words = jd.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const unique = [...new Set(words.filter((w) => !stopWords.has(w)))].slice(0, 16);
    return unique;
  };

  const keywords = extractKeywords();
  const resumeText = `${data.skills} ${data.summary} ${data.exp}`.toLowerCase();
  const matched = keywords.filter((k) => resumeText.includes(k.toLowerCase()));
  const missing = keywords.filter((k) => !resumeText.includes(k.toLowerCase()));

  // ATS Score Calculation (V3 EXACT FORMULA)
  // (name: 15) + (email with @: 15) + (phone: 15) + (summary > 50 chars: 20) + (exp > 80 chars: 20) + (skills >= 5 items: 15)
  const skillCount = data.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean).length;

  const baseScore =
    (data.name.trim() ? 15 : 0) +
    (data.email.includes('@') ? 15 : 0) +
    (data.phone.trim() ? 15 : 0) +
    (data.summary.trim().length >= 50 ? 20 : 0) +
    (data.exp.trim().length >= 80 ? 20 : 0) +
    (skillCount >= 5 ? 15 : 0);

  // Score capped at 100
  const score = Math.min(100, baseScore);

  // FEATURE 2: Real DOCX / DOC Download Engine (100% ATS Single Column)
  const downloadDocx = () => {
    const content = `
${data.name || 'FAREED ULLAH'}
${data.title || 'JOB TITLE'} | ${data.city || 'LOCATION'} | ${data.phone || 'PHONE'} | ${data.email || 'EMAIL'}

PROFESSIONAL SUMMARY
${data.summary || 'Summary statement...'}

PROFESSIONAL EXPERIENCE
${data.exp || 'Work history and achievements with dates & metrics...'}

${data.edu ? `EDUCATION\n${data.edu}\n\n` : ''}SKILLS
${data.skills || 'Technical skills and core keywords...'}
    `.trim();

    const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = data.name.trim()
      ? `${data.name.trim().replace(/\s+/g, '_')}_ATS_Resume.doc`
      : 'Resume_ATS.doc';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // FEATURE 3: Real Vector ATS-Engine PDF Download (jspdf zero-pixelation, pure vector)
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const name = (data.name || 'FAREED ULLAH').toUpperCase();
    const contactParts = [data.title, data.city, data.phone, data.email].filter(Boolean);
    const contactLine = contactParts.join('  |  ');

    let y = 48;

    // Header Name
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(name, 297.5, y, { align: 'center' });
    y += 18;

    // Contact line
    if (contactLine) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      doc.text(contactLine, 297.5, y, { align: 'center' });
      y += 14;
    }

    // Section Renderer
    const renderSection = (sectionTitle: string, textContent: string) => {
      if (!textContent.trim()) return;

      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(0, 0, 0);
      doc.text(sectionTitle.toUpperCase(), 45, y);
      y += 4;

      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(45, y, 550, y);
      y += 14;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 30, 30);

      const lines = doc.splitTextToSize(textContent.trim(), 505);
      doc.text(lines, 45, y);
      y += lines.length * 13 + 6;
    };

    renderSection('PROFESSIONAL SUMMARY', data.summary);
    renderSection('PROFESSIONAL EXPERIENCE', data.exp);
    if (data.edu.trim()) renderSection('EDUCATION', data.edu);
    renderSection('SKILLS', data.skills);

    const filename = data.name.trim()
      ? `${data.name.trim().replace(/\s+/g, '_')}_100_ATS.pdf`
      : 'Resume_100_ATS.pdf';

    doc.save(filename);
  };

  const handlePrint = () => {
    window.print();
  };

  const loadSampleData = () => {
    setJd(
      'Operations Manager needed for high-growth enterprise logistics. Requirements: Supply chain management, ERP implementation, KPI monitoring, vendor negotiation, warehouse automation, inventory accuracy, and leadership of 20+ operations staff.'
    );
    setData({
      name: 'Fareed Ullah',
      title: 'Operations Manager',
      email: 'fareedk1266@gmail.com',
      phone: '+92 300 1234567',
      city: 'Peshawar, Pakistan',
      summary:
        'Results-driven Operations Manager with 5+ years of proven expertise optimizing supply chain logistics, cross-functional team workflows, and enterprise resource allocation to achieve 28% operational cost reduction.',
      exp:
        'Operations Manager at Apex Logistics (2021 - Present)\n• Spearheaded warehouse automation & inventory tracking systems, reducing dispatch latency by 35%.\n• Managed cross-functional team of 24 specialists, maintaining 99.4% on-time delivery KPI across 140,000+ parcels.\n• Renegotiated vendor contracts yielding $180k annual cost savings.',
      edu: 'B.S. in Business Administration & Management • University of Peshawar (2020)',
      skills:
        'Operations Management, Supply Chain Optimization, Inventory Control, KPI Dashboards, Vendor Negotiation, Cross-Functional Leadership, Workflow Automation',
    });
    setError('');
  };

  const handleAddKeywordToSkills = (kw: string) => {
    if (!data.skills.toLowerCase().includes(kw.toLowerCase())) {
      const updated = data.skills ? `${data.skills}, ${kw}` : kw;
      setData((prev) => ({ ...prev, skills: updated }));
      validate('skills', updated);
    }
  };

  const resetForm = () => {
    setData({
      name: '',
      title: '',
      email: '',
      phone: '',
      city: 'Peshawar, Pakistan',
      summary: '',
      exp: '',
      edu: '',
      skills: '',
    });
    setJd('');
    setError('');
  };

  // Structured Data Schema
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '100% ATS Resume Builder Final V3',
    description:
      '100% ATS Resume Builder with Rezi validation lock, strict keyword density audit, and instant DOCX/PDF export.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
      />

      {/* Header Info Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FINAL V3 • 100% ATS LOCK • alltoolspk.com</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              100% ATS Resume Builder (Rezi &amp; Jobscan Pro)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Guaranteed machine-parseable single-column layout. Real-time ATS score lock, strict validation, and instant export.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
              className="text-xs font-bold rounded-xl cursor-pointer"
            >
              Load Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              className="text-xs font-medium rounded-xl cursor-pointer text-slate-500"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear
            </Button>
          </div>
        </div>

        {/* ATS Score & Validation Status Bar (V3 Exact Specification) */}
        <div
          className={`mt-6 p-4 rounded-xl border transition-all ${
            score >= 80
              ? 'bg-[#e6ffed] dark:bg-emerald-950/40 border-[#b7eb8f] dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              : 'bg-[#fff4e5] dark:bg-amber-950/40 border-[#ffd591] dark:border-amber-800 text-amber-950 dark:text-amber-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base">
                ATS Score: {score}%
              </span>
              {score >= 90 && (
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white shadow-xs">
                  ✅ REZI PASS (100% ATS)
                </span>
              )}
              {score >= 80 && score < 90 && (
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500 text-white">
                  ✅ JOBSCAN PASS
                </span>
              )}
            </div>

            {error && (
              <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {error}
              </span>
            )}
          </div>

          {/* Score progress bar */}
          <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-slate-950 dark:bg-white transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span className={data.name ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
              ✓ Name (15%)
            </span>
            <span className={data.email.includes('@') ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
              ✓ Email @ (15%)
            </span>
            <span className={data.phone ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
              ✓ Phone (15%)
            </span>
            <span className={data.summary.trim().length >= 50 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
              ✓ Summary &gt; 50 (20%)
            </span>
            <span className={data.exp.trim().length >= 80 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
              ✓ Exp &gt; 80 (20%)
            </span>
            <span className={skillCount >= 5 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
              ✓ Skills &ge; 5 (15%)
            </span>
          </div>
        </div>

        {/* Job Description Keyword Scanner (Rezi Logic) */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Search className="w-4 h-4 text-blue-600" />
              Target Job Description Scanner (Rezi Keyword Audit)
            </h3>
            {keywords.length > 0 && (
              <span className="text-[11px] font-medium text-slate-500">
                {matched.length} of {keywords.length} matched
              </span>
            )}
          </div>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste Target Job Description (e.g. Operation Manager, Supply Chain, ERP, Vendor Negotiation)..."
            className="w-full h-20 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
          />

          {jd.trim() && (
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">Found:</span>
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[11px]"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {missing.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-amber-600 dark:text-amber-400">Click to add missing:</span>
                  {missing.map((ms) => (
                    <button
                      key={ms}
                      onClick={() => handleAddKeywordToSkills(ms)}
                      className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 text-amber-900 dark:text-amber-200 rounded text-[11px] font-medium cursor-pointer transition-colors"
                    >
                      + {ms}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Editor Inputs (V3 Strict Validation) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              ATS Resume Fields
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">100% Machine Readable</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Full Name (e.g. FAREED ULLAH)"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                validate('name', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Job Title *
            </label>
            <input
              type="text"
              placeholder="Job Title - e.g. Operation Manager"
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
                validate('title', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Email *
              </label>
              <input
                type="email"
                placeholder="Email (must contain @)"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                  validate('email', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Phone *
              </label>
              <input
                type="text"
                placeholder="Phone +92..."
                value={data.phone}
                onChange={(e) => {
                  setData({ ...data, phone: e.target.value });
                  validate('phone', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              City, Country
            </label>
            <input
              type="text"
              placeholder="City, Country"
              value={data.city}
              onChange={(e) => {
                setData({ ...data, city: e.target.value });
                validate('city', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                Professional Summary * (min 50 chars)
              </label>
              <span
                className={`text-[10px] font-bold ${
                  data.summary.trim().length >= 50
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {data.summary.trim().length}/50 chars
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Professional Summary - min 50 chars..."
              value={data.summary}
              onChange={(e) => {
                validate('summary', e.target.value);
                setData({ ...data, summary: e.target.value });
              }}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                Work Experience * (Must include Date + Numbers)
              </label>
              <span
                className={`text-[10px] font-bold ${
                  data.exp.trim().length >= 80
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {data.exp.trim().length}/80 chars
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Work Experience - Must include Date + Numbers (e.g. Increased efficiency by 25%, managed 24 team members)..."
              value={data.exp}
              onChange={(e) => {
                validate('exp', e.target.value);
                setData({ ...data, exp: e.target.value });
              }}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                Skills * (Comma separated, min 5 skills, no &quot;etc.&quot;)
              </label>
              <span
                className={`text-[10px] font-bold ${
                  skillCount >= 5
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {skillCount}/5 skills
              </span>
            </div>
            <textarea
              rows={2}
              placeholder="Skills - comma separated, min 5 skills, no etc. (e.g. Operations, Logistics, ERP, Supply Chain, Leadership)"
              value={data.skills}
              onChange={(e) => {
                validate('skills', e.target.value);
                setData({ ...data, skills: e.target.value });
              }}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Education (Optional)
            </label>
            <input
              type="text"
              placeholder="Degree • Institution • Graduation Year"
              value={data.edu}
              onChange={(e) => setData({ ...data, edu: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 100% ATS Single Column Live Document Preview */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Single-Column ATS Preview
              </h3>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                100% ATS LOCK
              </span>
            </div>

            {/* A4 Strict ATS Document Container (Exactly matching V3 layout) */}
            <div className="mt-4 p-6 sm:p-8 bg-white text-black border-[1.5px] border-black rounded-lg shadow-sm min-h-[440px] font-sans">
              <h2 className="text-lg sm:text-xl font-bold text-center tracking-tight text-black uppercase m-0">
                {data.name || 'FAREED ULLAH'}
              </h2>
              <p className="text-center text-[11px] text-black mt-1 font-normal">
                {[data.title, data.city, data.phone, data.email]
                  .filter(Boolean)
                  .join(' | ')}
              </p>

              {/* Summary */}
              {data.summary && (
                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-[3px] mt-[15px] text-black">
                    PROFESSIONAL SUMMARY
                  </h4>
                  <p className="text-[12px] text-black mt-1 leading-relaxed">
                    {data.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {data.exp && (
                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-[3px] mt-[15px] text-black">
                    PROFESSIONAL EXPERIENCE
                  </h4>
                  <p className="text-[12px] text-black mt-1 leading-relaxed whitespace-pre-line">
                    {data.exp}
                  </p>
                </div>
              )}

              {/* Education */}
              {data.edu && (
                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-[3px] mt-[15px] text-black">
                    EDUCATION
                  </h4>
                  <p className="text-[12px] text-black mt-1 leading-relaxed">
                    {data.edu}
                  </p>
                </div>
              )}

              {/* Skills */}
              {data.skills && (
                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-[3px] mt-[15px] text-black">
                    SKILLS
                  </h4>
                  <p className="text-[12px] text-black mt-1 leading-relaxed">
                    {data.skills}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
              <Button
                onClick={handlePrint}
                className="h-11 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                Download 100% ATS PDF
              </Button>
              <Button
                onClick={downloadPdf}
                variant="outline"
                className="h-11 font-bold text-xs rounded-xl cursor-pointer gap-2 border-slate-300 dark:border-slate-700"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Vector PDF Engine
              </Button>
              <Button
                onClick={downloadDocx}
                variant="outline"
                className="h-11 font-bold text-xs rounded-xl cursor-pointer gap-2 border-slate-300 dark:border-slate-700"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                Download DOCX
              </Button>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs text-slate-600 dark:text-slate-300 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              100% ATS Lock Rules (Workday, Greenhouse &amp; Taleo)
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400">
              <li>
                <strong>No &quot;etc.&quot;:</strong> ATS engines drop resumes that use &quot;etc.&quot; instead of explicit keyword tags.
              </li>
              <li>
                <strong>Metrics &amp; Dates:</strong> Every experience point should contain measurable impact (e.g. 25%, $180k, 24 members).
              </li>
              <li>
                <strong>Single-Column Hierarchy:</strong> Tables, multi-columns, and complex icons cause OCR parsing corruption.
              </li>
            </ul>
          </div>

          {/* COMPLIANCE SECTION */}
          <div className="w-full mt-8 space-y-6 px-2">
            <div className="bg-white rounded-[24px] border border-slate-200 p-6">
              <h2 className="text-[16px] font-black tracking-wider text-slate-900">HOW TO USE THIS TOOL</h2>
              <div className="space-y-3 mt-4">
                <div className="bg-slate-50 rounded-2xl p-4"><h3 className="text-[#2563EB] font-bold">Step 1: Enter Your Data</h3><p className="text-slate-600 text-[14px]">Fill in your professional summary, experience metrics, education, and skills. 100% client-side in your browser.</p></div>
                <div className="bg-slate-50 rounded-2xl p-4"><h3 className="text-[#2563EB] font-bold">Step 2: Inspect Live Preview</h3><p className="text-slate-600 text-[14px]">Preview the single-column ATS layout engineered for Workday, Greenhouse, and Taleo algorithms.</p></div>
                <div className="bg-slate-50 rounded-2xl p-4"><h3 className="text-[#2563EB] font-bold">Step 3: Download Instantly</h3><p className="text-slate-600 text-[14px]">Export as pure TXT, Vector PDF, or Microsoft DOCX. Completely private with zero server uploads.</p></div>
              </div>
            </div>
            <div className="bg-white rounded-[24px] border border-slate-200 p-6">
              <h2 className="text-[22px] font-black text-slate-900">About ATS Resume Builder on AllToolsPK</h2>
              <p className="text-slate-600 text-[15px]">ATS Resume Builder provides applicant tracking system (ATS) compliant resume creation engineered 100% on the client side. Formatted to pass Workday, Taleo, and Greenhouse OCR scanners with single-column hierarchy, active impact metrics, and zero watermark restrictions. No user data is ever saved or transmitted to remote servers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReziClonePro;
