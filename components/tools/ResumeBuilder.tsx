import React, { useState, useEffect, useRef } from 'react';
import {
  FileBadge,
  Sparkles,
  Download,
  Eye,
  Edit3,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdSlot } from '@/components/AdSlot';
import { AIDisclosure } from '@/components/AIDisclosure';

// Modular Resume Components
import { ResumeData, INITIAL_RESUME_DATA } from './resume/types';
import { ATSScoreCard } from './resume/ATSScoreCard';
import { TemplateToolbar } from './resume/TemplateToolbar';
import { ResumeEditorSections } from './resume/ResumeEditorSections';
import { ResumePreview } from './resume/ResumePreview';
import { exportResumeToPDF } from './resume/ResumePdfExporter';
import { safeStorage } from '@/lib/storage';
import { validateRequiredFields, guardDownload } from '@/lib/toolValidation';
import ToolGuard from '@/components/ToolGuard';
import BaseTool from '@/components/BaseTool';

const STORAGE_KEY = 'alltoolspk_resume_data_2026';
const REQUIRED_RESUME_FIELDS = ['fullName', 'email', 'jobTitle'];

export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.contact && parsed.contact.fullName) {
          // If the cached draft is old default "Fareed Ullah", discard it immediately
          if (parsed.contact.fullName === 'Fareed Ullah' || parsed.contact.fullName.includes('Fareed')) {
            safeStorage.removeItem(STORAGE_KEY);
            setData(INITIAL_RESUME_DATA);
          } else {
            setData(parsed);
            setLastSaved('Restored from Local Storage');
          }
        }
      }
    } catch {
      // fallback to initial
    }
  }, []);

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      const now = new Date();
      setLastSaved(`Saved ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    } catch {
      // ignore
    }
  }, [data]);

  const updateData = (updated: Partial<ResumeData>) => {
    setData((prev) => ({ ...prev, ...updated }));
  };

  // Add missing keyword from JD scanner to skills
  const handleAddKeywordToSkills = (skillName: string) => {
    if (!skillName) return;
    setData((prev) => {
      const categories = [...prev.skillCategories];
      if (categories.length > 0) {
        // Check if already in category
        const exists = categories.some((c) =>
          c.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())
        );
        if (!exists) {
          categories[0] = {
            ...categories[0],
            skills: [...categories[0].skills, { name: skillName, level: 5 }],
          };
        }
      } else {
        categories.push({
          id: `cat-${Date.now()}`,
          category: 'Key Competencies',
          skills: [{ name: skillName, level: 5 }],
        });
      }
      return { ...prev, skillCategories: categories };
    });
  };

  // Export PDF Handler
  const handleExportPDF = async () => {
    const validation = validateRequiredFields(data.contact, REQUIRED_RESUME_FIELDS);
    if (!guardDownload(validation)) return;

    setIsExporting(true);
    try {
      await exportResumeToPDF(data);
    } catch (err) {
      console.error('PDF Export Error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Save / Download Handler -> Generates PDF
  const handleSaveDraft = () => {
    handleExportPDF();
  };

  // Load JSON Draft
  const handleLoadDraftClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.contact && parsed.contact.fullName) {
          setData(parsed);
          setLastSaved('Imported from JSON');
        }
      } catch {
        // error handling
      }
    };
    reader.readAsText(file);
  };

  // Reset to initial sample
  const handleReset = () => {
    if (window.confirm('Reset all fields? You can also load our executive sample template.')) {
      setData({
        ...INITIAL_RESUME_DATA,
        contact: {
          ...INITIAL_RESUME_DATA.contact,
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: '',
          linkedIn: '',
          github: '',
          portfolio: '',
          photoUrl: '',
          includePhoto: false,
        },
        summary: '',
        experiences: [],
        educations: [],
        skillCategories: [],
        projects: [],
        certifications: [],
        awards: [],
        volunteer: [],
        languages: [],
        customSections: [],
      });
      safeStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleLoadSample = () => {
    setData(INITIAL_RESUME_DATA);
    setLastSaved('Loaded Executive Sample');
  };

  // Structured Data (JSON-LD) for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a resume ATS-compliant in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Applicant Tracking Systems (ATS) like Workday, Taleo, and Greenhouse parse resumes as plain sequential text. Two-column tables, text boxes, and complex graphics frequently cause parsing failure. A standard single-column format with standard headings, quantifiable Google XYZ metrics, and strong action verbs guarantees 100% readability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I include a photo on my ATS resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For US, UK, and Canadian corporate positions, photos must be excluded to prevent hiring bias violations and ATS parsing rejections. For European (DACH, France) and Middle East/Gulf CVs, professional photos are commonly expected. alltoolspk.com includes a one-click toggle to easily support both formats.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the AI Bullet Optimizer improve my resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The optimizer converts passive duties (e.g. "responsible for coding") into quantifiable business achievements led by executive action verbs (e.g. "Architected distributed systems, improving latency by 28%").',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the exported PDF searchable and parseable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our PDF engine generates pure selectable vector glyphs and compliant Helvetica font mappings rather than raster images, ensuring complete optical character transparency for hiring scanners.',
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hidden file input for importing JSON */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJson}
        accept=".json"
        className="hidden"
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <a href="/tools" className="hover:underline hover:text-emerald-600">Tools</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">ATS Resume Builder</span>
      </nav>

      {/* Header & Author Byline */}
      <div className="mb-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
            <FileBadge className="w-3.5 h-3.5" />
            <span>2026 Modern ATS Engine &bull; Selectable Vector PDF</span>
          </div>

          {lastSaved && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <HardDrive className="w-3 h-3 text-emerald-600" />
              <span>{lastSaved}</span>
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          2026 Premium ATS Resume Builder &bull; AI Optimizer &amp; Real Score
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">By Fareed Ullah</span>
          <span>&bull;</span>
          <span>Peshawar, Pakistan</span>
          <span>&bull;</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            3 Modern Templates &bull; Photo &amp; QR Toggles &bull; Zero Paywalls
          </span>
        </div>
      </div>

      {/* Ad Slot #1 (Top) */}
      <AdSlot label="Top Resume Builder Ad" />

      {/* Real ATS Score Indicator & Job Description Keyword Scanner */}
      <div className="mb-6">
        <ATSScoreCard data={data} onAddSkill={handleAddKeywordToSkills} />
      </div>

      {/* Template & Styling Toolbar */}
      <div className="mb-6">
        <TemplateToolbar
          data={data}
          onChange={updateData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onExportPDF={handleExportPDF}
          onSaveDraft={handleSaveDraft}
          onLoadDraft={handleLoadDraftClick}
          onReset={handleReset}
          onLoadSample={handleLoadSample}
          isExporting={isExporting}
        />
      </div>

      {/* Action Required ToolGuard for Export Compliance */}
      <ToolGuard
        isValid={validateRequiredFields(data.contact, REQUIRED_RESUME_FIELDS).isValid}
        missing={validateRequiredFields(data.contact, REQUIRED_RESUME_FIELDS).missing}
      >
        {null}
      </ToolGuard>

      {/* Main Workspace (Editor or Live A4 Preview) */}
      <div className="mb-8">
        {activeTab === 'editor' ? (
          <ResumeEditorSections data={data} onChange={updateData} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              <ResumePreview data={data} />
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('editor')}
                className="cursor-pointer gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>Return to Editor</span>
              </Button>
              <Button
                variant="emerald"
                size="lg"
                disabled={isExporting}
                onClick={handleExportPDF}
                className="font-bold gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Compiling PDF...' : 'Download Clean ATS PDF'}</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Unified BaseTool Export Guard & Button */}
      <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Download Your ATS-Compliant PDF Resume
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Once your Full Name, Email Address, and Target Job Title are filled, click below to generate and download your clean vector PDF instantly.
        </p>
        <BaseTool
          toolName="Resume (PDF)"
          requiredFields={['fullName', 'email', 'jobTitle']}
          initialData={data.contact}
          onGenerate={() => handleExportPDF()}
        >
          {() => null}
        </BaseTool>
      </div>

      {/* AI Disclosure requirement */}
      <AIDisclosure isAITool={true} />

      {/* Ad Slot #2 (Mid) */}
      <AdSlot label="In-Content Middle Display" />

      {/* SEO Helpful Content (>400 words, What is, How to use, FAQs) */}
      <section className="mt-12 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            What is the ATS Resume Builder?
          </h2>
          <p>
            The <strong>alltoolspk.com ATS Resume Builder</strong> is a career advancement and CV optimization platform engineered to help job applicants create single-column, machine-readable resumes that achieve 95%+ parsing scores across modern Applicant Tracking Systems (ATS) including Workday, Greenhouse, Lever, Taleo, and iCIMS. Industry statistics show that over 75% of qualified applicants are automatically filtered out by hiring bots before a human recruiter ever sees their document due to multi-column tables, text boxes, non-standard section headers, or unindexed raster fonts.
          </p>
          <p>
            alltoolspk.com solves this bottleneck by implementing the strict single-column typographical layout recommended by Fortune 500 recruiters. Equipped with an AI Bullet Optimizer that rewrites passive task descriptions into quantified achievements following Google&apos;s celebrated <em>XYZ Formula</em>, our builder compiles clean vector PDFs using <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">jsPDF</code> right in your browser without tracking or storage fees.
          </p>
        </div>

        {/* How to use */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Use the ATS Resume Builder in 3 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 1: Fill Profile &amp; History</span>
              <p className="text-slate-600 dark:text-slate-400">
                Enter your contact info, summary, core skills, work history, and education, or click <em>Sample Data</em> to start with prefilled professional data.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 2: AI Bullet &amp; Keyword Optimization</span>
              <p className="text-slate-600 dark:text-slate-400">
                Click <em>AI XYZ Rewrite</em> on any job role. Paste your target Job Description in our scanner to find and add missing keywords with one click.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 3: Export Clean Vector PDF</span>
              <p className="text-slate-600 dark:text-slate-400">
                Switch to <em>Live A4 Preview</em> to inspect typography, templates, and margins. Click <em>Export ATS PDF</em> for an instant, selectable vector document ready to submit.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Why the Google XYZ Bullet Formula Wins Interviews
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our AI bullet rewrite tool automatically restructures candidate work history around the renowned Google hiring formula: <em>&quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;</em>. Replacing passive responsibilities with active power verbs and quantifiable business impact metrics dramatically increases callback rates for competitive software engineering, finance, and marketing openings.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Vector PDF Stream Generation via jsPDF
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike generic resume generators that take screenshot canvas snapshots (raster images) and wrap them inside a PDF container—making text unselectable and unsearchable—alltoolspk.com constructs native PostScript-compatible text operators. This guarantees optical character transparency and instant optical parsing.
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
                What makes a resume ATS-compliant in 2026?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Applicant Tracking Systems (ATS) like Workday, Taleo, and Greenhouse parse resumes as plain sequential text. Two-column tables, text boxes, and complex graphics frequently cause parsing failure. A standard single-column format with standard headings and strong action verbs guarantees 100% readability.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Should I include a photo on my ATS resume?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                For US, UK, and Canadian corporate positions, photos must be excluded to prevent hiring bias violations and ATS parsing rejections. For European (DACH, France) and Middle East/Gulf CVs, professional photos are commonly expected. alltoolspk.com includes a one-click toggle to easily support both formats.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                How does the AI Bullet Optimizer improve my resume?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                The optimizer converts passive duties (e.g. &quot;responsible for coding&quot;) into quantifiable business achievements led by executive action verbs (e.g. &quot;Architected distributed systems, improving latency by 28%&quot;).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Is the exported PDF searchable and parseable?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Yes. Our PDF engine generates pure selectable vector glyphs and compliant Helvetica font mappings rather than raster images, ensuring complete optical character transparency for hiring scanners.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Is my personal employment history saved on your servers?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                No. All draft data is stored exclusively in your local browser sandbox or device memory. We never sell, store, or monetize your contact or career records.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
