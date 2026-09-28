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
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';

export function ReziClonePro() {
  const [jd, setJd] = useState('');
  const [data, setData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: '',
    summary: '',
    exp: '',
    edu: '',
    skills: '',
  });

  // FEATURE 1: Job Description Keyword Extraction (Rezi / Jobscan Logic)
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
  const resumeText = (data.skills + ' ' + data.summary + ' ' + data.exp).toLowerCase();
  const matched = keywords.filter((k) => resumeText.includes(k.toLowerCase()));
  const missing = keywords.filter((k) => !resumeText.includes(k.toLowerCase()));

  // FEATURE 2: Real DOCX / DOC Download Engine
  const downloadDocx = () => {
    const content = `
${data.fullName || 'YOUR NAME'}
${data.jobTitle || 'TARGET JOB TITLE'} | ${data.phone || 'PHONE'} | ${data.email || 'EMAIL'} | ${data.city || 'LOCATION'}

PROFESSIONAL SUMMARY
${data.summary || 'Summary statement...'}

WORK EXPERIENCE
${data.exp || 'Work history and achievements...'}

EDUCATION
${data.edu || 'Degree, University, Graduation Year...'}

SKILLS & CORE COMPETENCIES
${data.skills || 'Technical skills and core keywords...'}
    `.trim();

    const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = data.fullName.trim()
      ? `${data.fullName.trim().replace(/\s+/g, '_')}_ATS_Resume.doc`
      : 'Resume_ATS.doc';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // FEATURE 3: Real Vector ATS-Engine PDF Download (jspdf with zero font corruption)
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const name = (data.fullName || 'YOUR NAME').toUpperCase();
    const title = data.jobTitle || 'Target Position';
    const contactParts = [data.phone, data.email, data.city].filter(Boolean);
    const contactLine = [title, ...contactParts].join('  •  ');

    let y = 48;

    // Header Name
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(name, 40, y);
    y += 18;

    // Contact line
    if (contactLine) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text(contactLine, 40, y);
      y += 12;
    }

    // Horizontal Rule
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.line(40, y, 555, y);
    y += 20;

    const renderSection = (sectionTitle: string, textContent: string) => {
      if (!textContent.trim()) return;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(sectionTitle.toUpperCase(), 40, y);
      y += 4;

      doc.setDrawColor(37, 99, 235); // blue-600 accent
      doc.setLineWidth(1.5);
      doc.line(40, y, 555, y);
      y += 14;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      const lines = doc.splitTextToSize(textContent.trim(), 515);
      doc.text(lines, 40, y);
      y += lines.length * 13 + 16;
    };

    renderSection('Professional Summary', data.summary);
    renderSection('Work Experience', data.exp);
    renderSection('Education & Credentials', data.edu);
    renderSection('Technical Skills & Competencies', data.skills);

    const filename = data.fullName.trim()
      ? `${data.fullName.trim().replace(/\s+/g, '_')}_ATS_Resume.pdf`
      : 'Resume_ATS.pdf';

    doc.save(filename);
  };

  // ATS Score Calculation
  const atsScore = Math.min(
    100,
    (data.fullName ? 10 : 0) +
      (data.email ? 10 : 0) +
      (data.phone ? 10 : 0) +
      (data.summary.length > 30 ? 15 : 0) +
      (data.exp.length > 80 ? 25 : 0) +
      (data.skills ? 20 : 0) +
      matched.length * 2
  );

  const loadSampleData = () => {
    setJd(
      'Senior Amazon VA & PPC Specialist needed for high-growth e-commerce brand. Must have demonstrated expertise in Amazon PPC campaigns, Product Hunting with Helium 10, Listing Optimization, Keyword Research, Inventory Forecasting, and A/B split testing.'
    );
    setData({
      fullName: 'Muhammad Ahmad',
      jobTitle: 'Amazon FBA & PPC Specialist',
      email: 'ahmad.fba@example.com',
      phone: '+92 300 1234567',
      city: 'Lahore, Pakistan',
      summary:
        'Results-oriented Amazon FBA Specialist with 4+ years managing multi-million dollar e-commerce storefronts. Expert in PPC campaigns, Helium 10 product hunting, listing optimization, and supplier negotiation to drive 35%+ YoY revenue growth.',
      exp:
        'Senior Amazon Specialist at Global Commerce Ltd (2022 - Present)\n• Managed $85k/month advertising budget with average TACOS kept under 12% across 4 private label brands.\n• Implemented listing optimization strategies improving organic keyword ranking from page 4 to top 3.\n• Spearheaded product hunting and launched 6 successful SKUs generating $1.2M in annual gross sales.',
      edu: 'B.S. in Computer Science & Information Systems • FAST NUCES (2021)',
      skills:
        'Amazon PPC, Helium 10, Product Hunting, Listing Optimization, Keyword Research, Inventory Management, A/B Testing, Seller Central, Data Analysis',
    });
  };

  const handleAddKeywordToSkills = (kw: string) => {
    if (!data.skills.toLowerCase().includes(kw.toLowerCase())) {
      setData((prev) => ({
        ...prev,
        skills: prev.skills ? `${prev.skills}, ${kw}` : kw,
      }));
    }
  };

  // Structured Data Schema
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ATS Resume Builder & Jobscan Optimizer',
    description:
      'Rezi-style ATS resume builder with real-time job description keyword matcher, ATS score gauge, and DOCX/PDF export.',
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

      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rezi &amp; Jobscan Pro Logic • 100% Client-Side Privacy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Rezi Clone Pro – ATS Resume Builder &amp; Keyword Matcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Extract high-value keywords from target job descriptions, optimize ATS scoring, and export clean DOCX &amp; PDF files.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadSampleData}
            className="text-xs font-bold rounded-xl cursor-pointer shrink-0"
          >
            Load Sample Data
          </Button>
        </div>

        {/* FEATURE 1: JOB DESCRIPTION INPUT - REZI FEATURE */}
        <div className="mt-6 p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Step 1: Paste Job Description (Rezi Keyword Scanner)
            </h3>
            {keywords.length > 0 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-200/60 dark:bg-blue-900 text-blue-900 dark:text-blue-200">
                {keywords.length} Target Keywords
              </span>
            )}
          </div>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste target Job Description here... e.g. Looking for PPC, Product Hunting, Listing Optimization, Helium 10, Inventory Management..."
            className="w-full h-24 p-3 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          {jd.trim() && (
            <div className="space-y-2 pt-2 border-t border-blue-200/60 dark:border-blue-900/60 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Target Keywords ({keywords.length}):
                </span>
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Matched in Resume ({matched.length}):
                </span>
                {matched.length > 0 ? (
                  matched.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold rounded text-[11px]"
                    >
                      ✓ {m}
                    </span>
                  ))
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-semibold text-[11px]">
                    No keyword matched yet. Click missing keywords below to add to Skills!
                  </span>
                )}
              </div>

              {missing.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Missing (Click to add to skills):
                  </span>
                  {missing.map((ms) => (
                    <button
                      key={ms}
                      onClick={() => handleAddKeywordToSkills(ms)}
                      className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 rounded text-[11px] font-medium cursor-pointer transition-colors"
                      title="Click to insert into Skills"
                    >
                      + {ms}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ATS Score Meter */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="text-slate-800 dark:text-slate-200">
              ATS Compliance Score:{' '}
              <span
                className={
                  atsScore >= 80
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }
              >
                {atsScore}%
              </span>
            </span>
            <span
              className={
                atsScore >= 80
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }
            >
              {atsScore >= 80 ? '✅ JOBSCAN PASS' : '⚠️ Add Experience & Keywords'}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                atsScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${atsScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Formula: Contact (30%) + Summary length (15%) + Quantifiable Experience (25%) + Skills (20%) + Target Keyword Matches (up to 32%).
          </p>
        </div>
      </div>

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Editor Column */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Resume Content Fields
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Full Name (e.g. Alex Morgan)"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Target Job Title *
              </label>
              <input
                type="text"
                placeholder="Target Job Title (e.g. Amazon PPC Specialist)"
                value={data.jobTitle}
                onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
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
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Phone *
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
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
                placeholder="City, Country (e.g. New York, USA or Lahore, Pakistan)"
                value={data.city}
                onChange={(e) => setData({ ...data, city: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Professional Summary
              </label>
              <textarea
                rows={3}
                placeholder="Professional Summary (Highlight years of experience & core domain)..."
                value={data.summary}
                onChange={(e) => setData({ ...data, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Work Experience (Use Numbers &amp; Metrics)
              </label>
              <textarea
                rows={4}
                placeholder="Work Experience with numbers (e.g. Increased sales by 30%, Managed $50k ad budget)..."
                value={data.exp}
                onChange={(e) => setData({ ...data, exp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Education
              </label>
              <textarea
                rows={2}
                placeholder="Degree, Major, Institution, Graduation Year"
                value={data.edu}
                onChange={(e) => setData({ ...data, edu: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Skills &amp; Keywords (Comma separated)
              </label>
              <textarea
                rows={2}
                placeholder="Skills (comma separated, e.g. PPC, Listing Optimization, Helium 10)..."
                value={data.skills}
                onChange={(e) => setData({ ...data, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Live ATS Preview Column */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Live Single-Column ATS Preview
              </h3>
              <span className="text-[11px] text-slate-400">100% Machine Readable</span>
            </div>

            {/* A4 Document Canvas Preview */}
            <div className="mt-4 p-6 sm:p-8 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl shadow-sm min-h-[460px] font-sans">
              <h2 className="text-xl sm:text-2xl font-black text-center tracking-tight text-slate-950 uppercase">
                {data.fullName || 'YOUR FULL NAME'}
              </h2>
              <p className="text-center text-xs text-slate-600 mt-1 font-medium">
                {[data.jobTitle || 'TARGET TITLE', data.email || 'email@example.com', data.phone || '+1 555-0192', data.city || 'Location']
                  .filter(Boolean)
                  .join(' | ')}
              </p>

              {/* Summary */}
              {data.summary && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-0.5 text-slate-950">
                    PROFESSIONAL SUMMARY
                  </h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    {data.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {data.exp && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-0.5 text-slate-950">
                    WORK EXPERIENCE
                  </h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed whitespace-pre-line">
                    {data.exp}
                  </p>
                </div>
              )}

              {/* Education */}
              {data.edu && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-0.5 text-slate-950">
                    EDUCATION
                  </h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    {data.edu}
                  </p>
                </div>
              )}

              {/* Skills */}
              {data.skills && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-0.5 text-slate-950">
                    SKILLS &amp; CORE COMPETENCIES
                  </h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    {data.skills}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
              <Button
                onClick={downloadDocx}
                className="h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download DOCX (100% ATS)
              </Button>
              <Button
                onClick={downloadPdf}
                className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Download Vector PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="h-11 font-bold text-xs rounded-xl cursor-pointer gap-2 border-slate-300 dark:border-slate-700"
              >
                <Printer className="w-4 h-4" />
                Print Resume
              </Button>
            </div>
          </div>

          {/* AdSense SEO & Quality Guide */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-xs text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Why ATS Systems Reject Graphic Resumes
            </h4>
            <p>
              Applicant Tracking Systems (such as Workday, Greenhouse, Taleo, and Lever) strip away styling and convert incoming files into linear text strings. Two-column layouts, graphics, text boxes, and tables cause headers and body text to concatenate out of order.
            </p>
            <p>
              <strong>The Rezi Formula:</strong> Single-column hierarchy, standard section headers (Summary, Experience, Education, Skills), quantifiable XYZ bullet points (&quot;Achieved [X] as measured by [Y] by doing [Z]&quot;), and exact keyword density extracted from the job posting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReziClonePro;
