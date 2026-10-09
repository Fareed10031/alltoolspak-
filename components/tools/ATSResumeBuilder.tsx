'use client';

import React, { useState, useMemo, useRef } from 'react';
import jsPDF from 'jspdf';

// TYPES
export type Exp = {
  id: string;
  company: string;
  role: string;
  dates: string;
  bullets: string;
};

export default function ATSResumeBuilder() {
  // --- STATES ---
  const [fullName, setFullName] = useState('Alex Morgan');
  const [jobTitle, setJobTitle] = useState('Senior Software Engineer');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [location, setLocation] = useState('New York, NY');
  const [summary, setSummary] = useState(
    'Results-driven professional with 5+ years of experience in scalable systems, leadership, and cross-functional project execution. Proven track record of improving throughput by 42%.'
  );
  const [skills, setSkills] = useState('TypeScript, React, Node.js, Python, AWS, CI/CD, Leadership, Microservices');
  const [education, setEducation] = useState('B.S. in Computer Science, Stanford University, 2018-2022 | GPA 3.9');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/alexmorgan');
  const [jd, setJd] = useState('');
  const [experiences, setExperiences] = useState<Exp[]>([
    {
      id: '1',
      company: 'TechCorp Inc.',
      role: 'Senior Software Engineer',
      dates: 'Jan 2022 - Present',
      bullets:
        '• Architected microservices, improving throughput by 42%.\n• Mentored team of 8 engineers and introduced automated CI/CD pipeline.\n• Reduced cloud costs by 28% via AWS optimization.',
    },
  ]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const resumeRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // --- ATS SCORE LOGIC (Rezi Style) ---
  const atsAnalysis = useMemo(() => {
    let score = 0;
    const issues: string[] = [];
    const keywords = ['TypeScript', 'React', 'Leadership', 'AWS', 'CI/CD', 'Python', 'Agile', 'Microservices'];
    const foundKeywords: string[] = [];
    const missingKeywords: string[] = [];

    if (fullName.trim().length > 2) score += 10;
    else issues.push('Add Full Name');

    if (email.includes('@')) score += 15;
    else issues.push('Add Valid Email');

    if (phone.trim().length > 7) score += 10;
    else issues.push('Add Phone');

    if (summary.trim().split(/\s+/).length >= 20) score += 15;
    else issues.push('Summary should be 30+ words');

    if (skills.split(',').filter((s) => s.trim().length > 0).length >= 5) score += 15;
    else issues.push('Add at least 5 skills');

    if (experiences.length > 0 && experiences.some((exp) => exp.bullets.includes('%'))) score += 20;
    else issues.push('Add % results in bullets (e.g. 42%)');

    if (education.trim().length > 5) score += 15;
    else issues.push('Add Education');

    // JD Matching
    if (jd.trim().length > 20) {
      const jdLower = jd.toLowerCase();
      keywords.forEach((k) => {
        if (jdLower.includes(k.toLowerCase())) {
          if (skills.toLowerCase().includes(k.toLowerCase()) || summary.toLowerCase().includes(k.toLowerCase())) {
            foundKeywords.push(k);
            score += 2;
          } else {
            missingKeywords.push(k);
          }
        }
      });
    }

    score = Math.min(99, score);
    return { score, issues, foundKeywords, missingKeywords };
  }, [fullName, email, phone, summary, skills, experiences, education, jd]);

  // --- PDF GENERATION (REAL TEXT PDF FOR ATS) ---
  const downloadPDF = () => {
    if (!fullName.trim() || !email.trim() || !jobTitle.trim()) {
      showToast('Please fill Full Name, Email, and Target Job Title');
      return;
    }
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 15;
    let y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(fullName.toUpperCase(), margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`${jobTitle} | ${email} | ${phone} | ${location} | ${linkedin}`, margin, y);
    y += 8;
    doc.line(margin, y, 210 - margin, y);
    y += 8;

    const addSection = (title: string, content: string) => {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(title.toUpperCase(), margin, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;
    };

    addSection('Professional Summary', summary);
    addSection('Core Skills', skills);
    const expText = experiences
      .map((e) => `${e.role} at ${e.company} (${e.dates})\n${e.bullets}`)
      .join('\n\n');
    addSection('Professional Experience', expText);
    addSection('Education & Certifications', education);

    const safeName = fullName.replace(/\s+/g, '_') || 'Resume';
    const safeTitle = jobTitle.replace(/\s+/g, '_') || 'Profile';
    doc.save(`${safeName}_${safeTitle}_Resume.pdf`);
    showToast(`Downloaded ATS Resume PDF: ${safeName}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-4">
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto p-3 md:p-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
            BUILDER • 100% FREE & CLIENT-SIDE • NO.1 ATS DESIGN
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-2 tracking-tight text-slate-900 dark:text-white">
            ATS Resume Builder - Pass Workday, Greenhouse & Lever
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Enhancv clean design + Rezi ATS score checker. Real text-based PDF, not image. 100% private.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                atsAnalysis.score >= 80
                  ? 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400'
                  : atsAnalysis.score >= 60
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
              }`}
            >
              ATS SCORE: {atsAnalysis.score}/99 {atsAnalysis.score >= 80 ? '✅' : '⚠️'}
            </div>
            <span className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
              🛡️ No Upload
            </span>
            <span className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
              ⚡ A4 Real PDF
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT FORM - 5 COLS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-white">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                PERSONAL INFO *
              </h2>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm mb-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Target Job Title"
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm mb-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm mb-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/..."
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm mt-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-6 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5+ years experience..."
              />

              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-6 mb-2">
                CORE SKILLS (Comma Separated)
              </h2>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="TypeScript, React, Python..."
              />

              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-6 mb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 mb-2 bg-gray-50 dark:bg-slate-950"
                >
                  <input
                    value={exp.role}
                    onChange={(e) => {
                      const n = [...experiences];
                      n[i].role = e.target.value;
                      setExperiences(n);
                    }}
                    placeholder="Role"
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-2 text-sm mb-1 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      value={exp.company}
                      onChange={(e) => {
                        const n = [...experiences];
                        n[i].company = e.target.value;
                        setExperiences(n);
                      }}
                      placeholder="Company"
                      className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-2 text-sm outline-none"
                    />
                    <input
                      value={exp.dates}
                      onChange={(e) => {
                        const n = [...experiences];
                        n[i].dates = e.target.value;
                        setExperiences(n);
                      }}
                      placeholder="Jan 2022 - Present"
                      className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-2 text-sm outline-none"
                    />
                  </div>
                  <textarea
                    value={exp.bullets}
                    onChange={(e) => {
                      const n = [...experiences];
                      n[i].bullets = e.target.value;
                      setExperiences(n);
                    }}
                    rows={3}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg p-2 text-sm mt-1 outline-none"
                    placeholder="• Improved throughput by 42%..."
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setExperiences([
                    ...experiences,
                    { id: Date.now().toString(), company: '', role: '', dates: '', bullets: '' },
                  ])
                }
                className="w-full border-dashed border-2 border-slate-300 dark:border-slate-700 rounded-xl py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                + Add Experience
              </button>

              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-6 mb-2">
                EDUCATION
              </h2>
              <textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                rows={2}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              <h2 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-6 mb-2">
                REZI STYLE - PASTE JOB DESCRIPTION (For ATS Matching)
              </h2>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={4}
                className="w-full border-2 border-blue-200 dark:border-blue-900/60 rounded-xl p-3 text-sm bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white outline-none"
                placeholder="Paste Job Description here to see missing keywords..."
              />
              {jd.length > 10 && (
                <div className="mt-2 text-xs space-y-1">
                  <p className="text-green-600 dark:text-green-400 font-bold">
                    Found: {atsAnalysis.foundKeywords.join(', ') || 'None'}
                  </p>
                  <p className="text-rose-600 dark:text-rose-400 font-bold">
                    Missing - Add these to skills:{' '}
                    {atsAnalysis.missingKeywords.join(', ') || 'Great! No missing'}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-900/60 rounded-xl p-3 text-xs text-yellow-900 dark:text-yellow-200">
                <p className="font-bold">⚠️ To Unlock Download:</p>
                <p className="mt-0.5">
                  {atsAnalysis.issues.length > 0
                    ? atsAnalysis.issues.join(', ')
                    : 'All good! Ready to download'}
                </p>
              </div>
              <button
                type="button"
                onClick={downloadPDF}
                disabled={atsAnalysis.score < 50}
                className={`w-full mt-3 py-4 rounded-xl font-black text-white text-sm transition-all cursor-pointer ${
                  atsAnalysis.score >= 50
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-md'
                    : 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-60'
                }`}
              >
                Download A4 ATS Resume PDF - {fullName ? fullName.split(' ')[0] : 'Your'}_Resume.pdf
              </button>
              <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 mt-2 font-medium">
                Real Text PDF • Parsable by Workday, Greenhouse, Lever • No Image
              </p>
            </div>
          </div>

          {/* RIGHT LIVE PREVIEW - 7 COLS - ENHANCv CLEAN DESIGN */}
          <div className="lg:col-span-7">
            <div className="sticky top-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  LIVE A4 PREVIEW (Enhancv Clean)
                </h3>
                <span className="text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full font-bold">
                  ATS {atsAnalysis.score}/99
                </span>
              </div>
              <div
                ref={resumeRef}
                className="bg-white rounded-xl shadow-lg border border-slate-300 p-8 md:p-10 min-h-[800px] text-black"
                style={{ fontFamily: 'Inter, Helvetica, Arial, sans-serif' }}
              >
                <div className="border-b-2 border-black pb-4 mb-6">
                  <h1 className="text-3xl font-black tracking-tight uppercase text-black">
                    {fullName || 'Your Name'}
                  </h1>
                  <p className="text-sm mt-1 text-gray-700 font-medium">
                    {jobTitle} | {email} | {phone} | {location} | {linkedin}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="font-black text-xs tracking-widest uppercase border-b border-gray-300 pb-1 mb-2 text-black">
                      Professional Summary
                    </h2>
                    <p className="text-[13px] leading-relaxed text-gray-800">{summary}</p>
                  </div>
                  <div>
                    <h2 className="font-black text-xs tracking-widest uppercase border-b border-gray-300 pb-1 mb-2 text-black">
                      Core Skills
                    </h2>
                    <p className="text-[13px] leading-relaxed text-gray-800">{skills}</p>
                  </div>
                  <div>
                    <h2 className="font-black text-xs tracking-widest uppercase border-b border-gray-300 pb-1 mb-2 text-black">
                      Professional Experience
                    </h2>
                    {experiences.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                          <p className="font-bold text-[13px] text-black">
                            {exp.role} at {exp.company}
                          </p>
                          <p className="text-[11px] text-gray-500">{exp.dates}</p>
                        </div>
                        <p className="text-[12px] whitespace-pre-line leading-relaxed mt-1 text-gray-800">
                          {exp.bullets}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2 className="font-black text-xs tracking-widest uppercase border-b border-gray-300 pb-1 mb-2 text-black">
                      Education & Certifications
                    </h2>
                    <p className="text-[12px] text-gray-800">{education}</p>
                  </div>
                </div>
              </div>

              {/* SEO CONTENT FOR ADS */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mt-4 text-slate-800 dark:text-slate-200">
                <h3 className="font-black text-slate-900 dark:text-white">
                  About ATS Resume Builder on AllToolsPK
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  This builder creates a 100% ATS-compliant resume using single-column, no tables, no text-boxes format
                  tested on Workday, Greenhouse and Lever. Unlike image-based builders, we generate real selectable text
                  PDF that ATS can parse. Features include live ATS score, Job Description keyword matcher (Rezi
                  style), and Enhancv-style clean design trusted by recruiters in 2026.
                </p>
                <div className="grid md:grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <b>Why 99% ATS Score?</b> Single column, standard headings, % achievements, keywords matching.
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <b>Is it free?</b> Yes 100% client-side. No server upload. Your data never leaves browser.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 dark:border-slate-200 animate-in fade-in slide-in-from-bottom-2">
          <span>{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="ml-2 font-black cursor-pointer text-slate-400 hover:text-white dark:hover:text-black"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
